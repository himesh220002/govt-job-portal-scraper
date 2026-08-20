import os
import json
import io
import warnings
import requests
from pypdf import PdfReader
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np
from openai import OpenAI
from pymongo import MongoClient
from dotenv import load_dotenv

# Suppress warnings
warnings.filterwarnings('ignore')

# Load environment
load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
NVIDIA_API_KEY = os.getenv("NVIDIA_API_KEY")

if not MONGODB_URI:
    raise ValueError("MONGODB_URI not found in .env file.")

openai_client = None
if not NVIDIA_API_KEY:
    print("WARNING: NVIDIA_API_KEY not found. Extraction will be skipped.")
else:
    openai_client = OpenAI(base_url="https://integrate.api.nvidia.com/v1", api_key=NVIDIA_API_KEY)

# 1. Download & Extract PDF Text
def extract_text_from_pdf(url):
    print(f"Downloading PDF from {url}...")
    headers = {'User-Agent': 'Mozilla/5.0'}
    try:
        response = requests.get(url, headers=headers, verify=False, timeout=20)
        response.raise_for_status()
        
        reader = PdfReader(io.BytesIO(response.content))
        text = ""
        for page in reader.pages:
            extracted = page.extract_text()
            if extracted:
                text += extracted + "\n\n"
        return text
    except Exception as e:
        print(f"Failed to fetch or parse PDF: {e}")
        return ""

# 2. Chunking
def chunk_text(text, chunk_size=300, overlap=50):
    words = text.split()
    chunks = []
    for i in range(0, len(words), max(1, chunk_size - overlap)):
        chunk = " ".join(words[i:i + chunk_size])
        chunks.append(chunk)
    return chunks

# 3. Embedding and Retrieval
def setup_vector_store(chunks, model):
    embeddings = model.encode(chunks)
    dimension = embeddings.shape[1]
    index = faiss.IndexFlatL2(dimension)
    index.add(np.array(embeddings))
    return index

def retrieve_relevant_chunks(queries, model, index, chunks, k=3):
    relevant_chunks = set()
    for query in queries:
        query_vector = model.encode([query])
        distances, indices = index.search(np.array(query_vector), k)
        for idx in indices[0]:
            if idx < len(chunks):
                relevant_chunks.add(chunks[idx])
    return list(relevant_chunks)

# 4. LLM Extraction
def extract_json_with_llm(context_text):
    if not openai_client:
        return None
        
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
    
    try:
        completion = openai_client.chat.completions.create(
            model="meta/llama-3.1-70b-instruct",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.2,
            max_tokens=2048,
        )
        
        # Clean up markdown
        result = completion.choices[0].message.content.strip()
        if result.startswith("```json"):
            result = result[7:]
        if result.startswith("```"):
            result = result[3:]
        if result.endswith("```"):
            result = result[:-3]
            
        return json.loads(result.strip())
    except Exception as e:
        print(f"LLM extraction failed: {e}")
        return None

def main():
    print("Connecting to MongoDB...")
    client = MongoClient(MONGODB_URI)
    db = client['govtJobScraperDB']
    collection = db['officialscraping']
    
    # Find all unprocessed PDFs
    query = {
        "importantLinks.is_pdf": "true",
        "rag_processed": {"$ne": True}
    }
    
    unprocessed_docs = list(collection.find(query))
    print(f"Found {len(unprocessed_docs)} unprocessed PDF(s).")
    
    if not unprocessed_docs:
        print("Nothing to do.")
        return
        
    print("Loading embedding model...")
    model = SentenceTransformer('all-MiniLM-L6-v2')
    
    for doc in unprocessed_docs:
        doc_id = doc['_id']
        url = doc['importantLinks'].get('direct_link')
        
        print(f"\nProcessing Document ID: {doc_id}")
        print(f"URL: {url}")
        
        if not url:
            print("No direct link found. Skipping.")
            collection.update_one({"_id": doc_id}, {"$set": {"rag_processed": True, "rag_error": "No direct link"}})
            continue
            
        text = extract_text_from_pdf(url)
        if not text.strip():
            print("Failed to extract text. Marking as processed with error.")
            collection.update_one({"_id": doc_id}, {"$set": {"rag_processed": True, "rag_error": "No text extracted"}})
            continue
            
        chunks = chunk_text(text)
        print(f"Created {len(chunks)} text chunks.")
        
        index = setup_vector_store(chunks, model)
        
        queries = [
            "What is the age limit, age criteria, or minimum maximum age?",
            "What are the vacancy details, total posts, number of vacancies, or post names?",
            "What is the application fee, payment details, or fee exemption?",
            "What are the important dates, deadline, last date to apply, or exam date?"
        ]
        
        top_chunks = retrieve_relevant_chunks(queries, model, index, chunks)
        context = "\n\n--- CHUNK ---\n\n".join(top_chunks)
        
        print("Extracting structured data using NVIDIA Llama 3.1 70B...")
        extracted_data = extract_json_with_llm(context)
        
        if extracted_data:
            print("Successfully extracted data. Updating MongoDB...")
            
            # Update the document with the extracted fields
            update_data = {
                "rag_processed": True
            }
            
            # Safely merge fields if they exist
            if "vacancyDetails" in extracted_data:
                update_data["vacancyDetails"] = extracted_data["vacancyDetails"]
            if "ageLimit" in extracted_data:
                update_data["ageLimit"] = extracted_data["ageLimit"]
            if "applicationFee" in extracted_data:
                update_data["applicationFee"] = extracted_data["applicationFee"]
            if "importantDates" in extracted_data:
                update_data["importantDates"] = extracted_data["importantDates"]
                
            collection.update_one({"_id": doc_id}, {"$set": update_data})
            print("Update complete.")
        else:
            print("Extraction returned None. Marking as processed with error.")
            collection.update_one({"_id": doc_id}, {"$set": {"rag_processed": True, "rag_error": "LLM failed to return JSON"}})
            
    print("\nAll done!")

if __name__ == "__main__":
    main()
