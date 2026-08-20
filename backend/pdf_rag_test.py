import os
import json
import requests
import io
import warnings
from pypdf import PdfReader
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
from openai import OpenAI
from dotenv import load_dotenv

# Suppress warnings for clean output
warnings.filterwarnings('ignore')

# Load environment
load_dotenv()

# We need the user to set this in .env
NVIDIA_API_KEY = os.getenv("NVIDIA_API_KEY")
if not NVIDIA_API_KEY:
    print("WARNING: NVIDIA_API_KEY not found in .env. LLM extraction will fail unless provided.")
else:
    openai_client = OpenAI(base_url="https://integrate.api.nvidia.com/v1", api_key=NVIDIA_API_KEY)

# 1. Download & Extract PDF Text
def extract_text_from_pdf(url):
    print(f"Downloading PDF from {url}...")
    headers = {'User-Agent': 'Mozilla/5.0'}
    response = requests.get(url, headers=headers, verify=False, timeout=20)
    response.raise_for_status()
    
    print("Extracting text...")
    reader = PdfReader(io.BytesIO(response.content))
    text = ""
    for page in reader.pages:
        extracted = page.extract_text()
        if extracted:
            text += extracted + "\n\n"
    return text

# 2. Chunking
def chunk_text(text, chunk_size=300, overlap=50):
    words = text.split()
    chunks = []
    for i in range(0, len(words), chunk_size - overlap):
        chunk = " ".join(words[i:i + chunk_size])
        chunks.append(chunk)
    print(f"Created {len(chunks)} text chunks.")
    return chunks

# 3. Embedding and Retrieval
def setup_vector_store(chunks):
    print("Loading embedding model (this may take a moment on first run)...")
    # Using a fast, lightweight local embedding model
    model = SentenceTransformer('all-MiniLM-L6-v2')
    
    print("Embedding chunks locally...")
    embeddings = model.encode(chunks)
    
    print("Building FAISS index...")
    dimension = embeddings.shape[1]
    index = faiss.IndexFlatL2(dimension)
    index.add(np.array(embeddings))
    
    return model, index

def retrieve_relevant_chunks(queries, model, index, chunks, k=3):
    print("Retrieving relevant context from vector store...")
    relevant_chunks = set()
    for query in queries:
        query_vector = model.encode([query])
        distances, indices = index.search(np.array(query_vector), k)
        for idx in indices[0]:
            if idx < len(chunks):
                relevant_chunks.add(chunks[idx])
    return list(relevant_chunks)

# 4. LLM Generation
def extract_json_with_llm(context_text):
    print("Calling NVIDIA Llama 3.1 70B via NIM API to extract JSON structure...")
    if not NVIDIA_API_KEY:
        return '{"error": "NVIDIA_API_KEY missing. Cannot extract JSON."}'
        
    prompt = f"""
    You are an expert data extractor for government job notifications. 
    Analyze the following text chunks extracted from an official PDF notification.
    
    Extract the required information and strictly format the output as a valid JSON object matching the following schema:
    {{
        "ageLimit": {{
            "_raw": [ {{"raw_text": "text describing age limit" }} ]
        }},
        "vacancyDetails": [
            {{
                "Post Name": "string",
                "Total Post": "string",
                "Eligibility": "string"
            }}
        ],
        "applicationFee": {{
            "_raw": [ {{"raw_text": "text describing fee" }} ]
        }},
        "importantDates": {{
            "_raw": [ {{"raw_text": "text describing dates like application start and end" }} ]
        }}
    }}
    
    If any information is not present in the text, leave the array or object empty. Output ONLY valid JSON, without any markdown code blocks or surrounding text.

    CONTEXT FROM PDF:
    {context_text}
    """
    
    completion = openai_client.chat.completions.create(
        model="meta/llama-3.1-70b-instruct",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.2,
        max_tokens=2048,
    )
    
    # Clean up output in case it includes markdown
    result = completion.choices[0].message.content.strip()
    if result.startswith("```json"):
        result = result[7:]
    if result.startswith("```"):
        result = result[3:]
    if result.endswith("```"):
        result = result[:-3]
        
    return result.strip()

def main():
    # Example PDF url from ONGC
    sample_url = "https://ongcindia.com/documents/77751/2660534/CSR-Policy-2025.pdf" 
    
    try:
        text = extract_text_from_pdf(sample_url)
        if not text.strip():
            print("Failed to extract text from PDF.")
            return
            
        chunks = chunk_text(text)
        model, index = setup_vector_store(chunks)
        
        # We query the vector DB for exactly what we need for the schema
        queries = [
            "What is the age limit, age criteria, or minimum maximum age?",
            "What are the vacancy details, total posts, number of vacancies, or post names?",
            "What is the application fee, payment details, or fee exemption?",
            "What are the important dates, deadline, last date to apply, or exam date?"
        ]
        
        top_chunks = retrieve_relevant_chunks(queries, model, index, chunks)
        context = "\n\n--- CHUNK ---\n\n".join(top_chunks)
        
        print("\n--- RETRIEVED CONTEXT SUMMARY ---")
        preview = context[:500].replace('\n', ' ') + "..."
        print(f"Total relevant chunks found: {len(top_chunks)}. Sending {len(context)} characters to LLM.")
        print(f"Preview: {preview}\n")
        
        json_result = extract_json_with_llm(context)
        
        print("\n--- FINAL EXTRACTED JSON ---")
        print(json_result)
        print("----------------------------\n")
        print("Success! RAG Pipeline is operational.")
        
    except Exception as e:
        print(f"\nAn error occurred during execution: {e}")

if __name__ == "__main__":
    main()
