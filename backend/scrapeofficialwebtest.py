import os
import re
import time
import logging
from urllib.parse import urljoin
import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient
from dotenv import load_dotenv

# Setup logging
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# Load environment
load_dotenv()
MONGO_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/")
DB_NAME = "govtJobScraperDB"
COLLECTION_NAME = "officialscraping"

# Define Categories and their keywords
CATEGORIES = {
    "jobs": ["job", "recruitment", "vacancy", "career", "apply", "notification"],
    "results": ["result", "score", "merit", "selected", "shortlisted"],
    "admitcard": ["admit card", "call letter", "hall ticket", "admitcard"],
    "answerkey": ["answer key", "key", "answer-key"],
    "syllabus": ["syllabus", "exam pattern", "scheme"],
    "admissions": ["admission", "counseling", "allotment"],
    "notices": ["notice", "important", "circular", "update"],
    "certificate": ["certificate", "document"],
    "outsourcing": ["outsourcing", "offline"]
}

def extract_urls(filepath):
    urls = []
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            # Simple regex to find URLs
            urls = re.findall(r'https?://[^\s<>"]+|www\.[^\s<>"]+', content)
    except Exception as e:
        logger.error(f"Error reading file {filepath}: {e}")
    return list(set(urls))

def categorize_link(text, href):
    combined_text = f"{text} {href}".lower()
    for cat, keywords in CATEGORIES.items():
        if any(kw in combined_text for kw in keywords):
            return cat
    return None

def scrape_url(url, collection):
    logger.info(f"Scraping {url} ...")
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
        }
        # Timeout to prevent hanging, verify=False for poorly configured govt SSL certs
        response = requests.get(url, headers=headers, timeout=15, verify=False)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        links = soup.find_all('a', href=True)
        
        extracted_data = {cat: [] for cat in CATEGORIES.keys()}
        
        for link in links:
            href = link['href'].strip()
            text = link.get_text(strip=True)
            
            # Skip empty or javascript links
            if not href or href.startswith(('javascript:', '#', 'mailto:', 'tel:')):
                continue
                
            # Categorize
            category = categorize_link(text, href)
            if not category:
                continue
                
            # Cap at 3 per category
            if len(extracted_data[category]) >= 3:
                continue
                
            # Make absolute URL
            absolute_url = urljoin(url, href)
            is_pdf = absolute_url.lower().endswith('.pdf')
            
            # Skip very short useless text unless it's explicitly a PDF link
            if len(text) < 3 and not is_pdf:
                continue
            
            import hashlib
            record_id = "off_" + hashlib.md5(absolute_url.encode()).hexdigest()[:12]
            
            # Create record conforming to the requested schema
            record = {
                "recordId": record_id,
                "title": text if text else "Document/Link",
                "source_url": url,
                "category": category, # e.g. "jobs", "results", etc.
                "importantLinks": {
                    "direct_link": absolute_url,
                    "is_pdf": "true" if is_pdf else "false"
                },
                "adsMeta": {},
                "ageLimit": {"_raw": []},
                "applicationFee": {"_raw": []},
                "examName": "",
                "howToApply": [],
                "importantDates": {"_raw": []},
                "scrapedAt": time.strftime('%Y-%m-%dT%H:%M:%SZ', time.gmtime()),
                "shortDescription": "",
                "vacancyDetails": []
            }
            
            # Avoid exact duplicates within the same run for the same category
            if not any(r['importantLinks']['direct_link'] == absolute_url for r in extracted_data[category]):
                extracted_data[category].append(record)
                
        # Insert to MongoDB
        total_inserted = 0
        for cat, items in extracted_data.items():
            if items:
                try:
                    collection.insert_many(items, ordered=False)
                    total_inserted += len(items)
                except Exception as db_err:
                    logger.error(f"DB Insert error for {url}: {db_err}")
                    
        logger.info(f"Successfully inserted {total_inserted} items from {url}")

    except requests.exceptions.RequestException as e:
        logger.error(f"Failed to fetch {url}: {e}")
    except Exception as e:
        logger.error(f"Unexpected error processing {url}: {e}")

def main():
    # Disable insecure request warnings since we use verify=False
    import urllib3
    urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
    
    # 1. Connect to MongoDB
    try:
        client = MongoClient(MONGO_URI)
        db = client[DB_NAME]
        collection = db[COLLECTION_NAME]
        # Optional: create index on source_url
        collection.create_index("source_url")
        logger.info("Connected to MongoDB successfully.")
    except Exception as e:
        logger.error(f"Failed to connect to MongoDB: {e}")
        return

    # 2. Extract URLs
    filepath = "temp1.txt"
    urls = extract_urls(filepath)
    logger.info(f"Found {len(urls)} unique URLs in {filepath}")
    
    # 3. Scrape each URL
    for url in urls:
        scrape_url(url, collection)
        # Small delay to be polite
        time.sleep(1)
        
    logger.info("Scraping completed.")

if __name__ == "__main__":
    main()
