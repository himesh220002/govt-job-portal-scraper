import os
import time
import random
import logging
from datetime import datetime, timezone
from bs4 import BeautifulSoup
from pymongo import MongoClient, UpdateOne
from pymongo.errors import ConnectionFailure, BulkWriteError
from dotenv import load_dotenv
from playwright.sync_api import sync_playwright, TimeoutError as PlaywrightTimeoutError
from urllib.parse import urlparse

def categorize_job(title, record_id):
    slug = (record_id or "").lower()
    title = (title or "").lower()
    
    def match(word):
        return word in slug or word in title
        
    if match('result'): return 'Result'
    elif match('admit card') or match('admitcard'): return 'Admit Card'
    elif match('answer key') or match('answerkey'): return 'Answer Key'
    elif match('syllabus'): return 'Syllabus'
    elif match('admission'): return 'Admission'
    elif match('certificate'): return 'Certificate'
    elif match('offline') or match('outsourcing'): return 'Outsourcing/Offline Job'
    elif match('important') or match('scholarship'): return 'Important'
    else: return 'Latest Job'

# Load environment variables from .env file
load_dotenv()

# --- Configuration ---
MONGO_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/")
DB_NAME = "govtJobScraperDB"
COLLECTION_NAME = "scraper"
BASE_URL = "https://www.sarkariresult.com"

# Logging setup
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

# --- Scraping Logic (Playwright) ---
def validate_public_url(url: str) -> str:
    """Security boundary check before fetching URLs."""
    parsed = urlparse(url)
    if parsed.scheme not in {'http', 'https'}:
        raise ValueError('Only HTTP(S) URLs are allowed')
    if parsed.username or parsed.password or not parsed.hostname:
        raise ValueError('Credentials and missing hosts are not allowed')
    return url

import requests

def fetch_page(url):
    """Fetches a URL using requests."""
    delay = random.uniform(0.5, 1.5)
    time.sleep(delay)
    
    try:
        url = validate_public_url(url)
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
        }
        logger.info(f"Navigating to {url}...")
        response = requests.get(url, headers=headers, timeout=15)
        
        if response.status_code in {401, 403, 429}:
            logger.error(f"Access Denied (Bot Protection) at {url}. Status: {response.status_code}")
            return None
            
        return response.text
            
    except requests.exceptions.RequestException as e:
        logger.error(f"Failed to fetch {url}: {e}")
        return None

def extract_job_links(homepage_html):
    """Extracts job links from the main aggregator page."""
    soup = BeautifulSoup(homepage_html, "html.parser")
    job_links = []
    
    # In SarkariResult, main layout is div#page and category pages use div#post
    for a_tag in soup.select('div#page a, div#post a'):
        href = a_tag.get('href')
        text = a_tag.get_text(strip=True)
        if href and len(text) > 5:
            # Normalize URLs
            if not href.startswith('http'):
                href = BASE_URL + href if href.startswith('/') else BASE_URL + '/' + href
                
            # Filter for internal links and exclude the homepage
            if href.startswith(BASE_URL) and href not in (BASE_URL, BASE_URL + '/'):
                job_links.append({"url": href, "title": text})
            
    return list({v['url']:v for v in job_links}.values()) # Deduplicate

def parse_job_detail_page(url):
    """Parses individual job pages, handling inconsistent tables and nested structures."""
    html = fetch_page(url)
    if not html:
        return None
        
    soup = BeautifulSoup(html, "html.parser")
    
    # Generate a reliable primary key (job_id) from the URL slug
    slug = url.strip('/').split('/')[-1]
    if not slug:
        slug = url.strip('/').split('/')[-2] if len(url.strip('/').split('/')) > 1 else "unknown_job"
    job_id = slug
    
    # Initialize the structured document based on the new JSON schema
    job_data = {
        "recordId": job_id,
        "category": "",
        "title": "",
        "organization": "",
        "examName": "",
        "shortDescription": "",
        "lastOfficialUpdate": "",
        "importantDates": {"_raw": []},
        "applicationFee": {"_raw": []},
        "ageLimit": {},
        "vacancyDetails": [],
        "howToApply": [],
        "importantLinks": {},
        "adsMeta": {},
        "updatedAt": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "source_url": url  # Keeping this for traceability
    }
    
    # 1. Extract Post Name and Short Information
    post_name_elem = soup.find('h1') or soup.find('div', class_='name-of-post')
    if post_name_elem:
        job_data['title'] = post_name_elem.get_text(strip=True)
        
    tables = soup.find_all('table')
    
    # Extract Short Information and Post Update Date (usually in the first table)
    if tables:
        top_table = tables[0]
        for row in top_table.find_all('tr'):
            cells = row.find_all(['td', 'th'])
            if len(cells) >= 2:
                label = cells[0].get_text(strip=True).lower()
                value = cells[1].get_text(strip=True)
                if "short information" in label:
                    job_data["shortDescription"] = value
                elif "post date" in label or "post update" in label:
                    job_data["lastOfficialUpdate"] = value

    # 2. Extract Data from Nested Tables
    for table in tables:
        rows = table.find_all('tr')
        if len(rows) < 2: continue
        
        # Identify and extract vacancy tables
        for i, row in enumerate(rows):
            cells = row.find_all(['td', 'th'])
            header_texts = [c.get_text(strip=True).lower() for c in cells]
            
            is_vacancy_table = any(h in header_texts for h in ["total post", "post name", "post", "vacancy", "total vacancy"]) or ("total" in header_texts and len(header_texts) > 3)
            
            if is_vacancy_table and len(header_texts) > 1:
                headers = [c.get_text(strip=True) for c in cells]
                # Filter out empty headers to avoid misalignment
                if not any(headers): continue
                
                for data_row in rows[i+1:]:
                    data_cells = data_row.find_all(['td', 'th'])
                    data_texts = [c.get_text(strip=True) for c in data_cells]
                    # Check if it's a valid data row (not a sub-header or repeated header)
                    if len(data_texts) == len(headers) and data_texts[0] not in headers:
                        job_data["vacancyDetails"].append(dict(zip(headers, data_texts)))
                break # Move to next table after finding a vacancy section
                
        # Heuristic Text Classification for Age Limit, Dates, Fees, Links
        for row in rows:
            # First handle Links inside this row
            links = row.find_all('a', href=True)
            for link in links:
                link_text = link.get_text(strip=True)
                href = link['href']
                if href and link_text:
                    key = link_text.lower().replace(" ", "_").replace(".", "")
                    job_data["importantLinks"][key] = href
                    
            # Next handle text content classification
            for cell in row.find_all(['td', 'th'], recursive=False):
                text = cell.get_text(separator='\n', strip=True)
                lower_text = text.lower()
                
                if "age limit" in lower_text:
                    if "minimum age" in lower_text or "maximum age" in lower_text:
                        job_data["ageLimit"].setdefault("_raw", []).append({"raw_text": text})
                elif "important dates" in lower_text:
                    if "application begin" in lower_text:
                        job_data["importantDates"]["_raw"].append({"raw_text": text})
                elif "application fee" in lower_text:
                    if "obc" in lower_text or "general" in lower_text or "sc" in lower_text:
                        job_data["applicationFee"]["_raw"].append({"raw_text": text})
                elif "how to fill" in lower_text:
                    if "read the notification" in lower_text:
                        job_data["howToApply"].append({"raw_text": text})
                    
    return job_data

# --- Database Strategy (Upsert) ---
def init_db():
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    collection = db[COLLECTION_NAME]
    
    # Ensure indexes exist for rapid deduplication and querying
    collection.create_index("recordId", unique=True)
    collection.create_index("category")
    collection.create_index([("updatedAt", -1)])
        
    return collection

def batch_upsert_jobs(collection, jobs_data):
    """Neutralizes database explosion via strict Upsert commands and tracks real updates."""
    if not jobs_data:
        return
        
    # Fetch existing records to compare
    record_ids = [d["recordId"] for d in jobs_data]
    existing_cursor = collection.find({"recordId": {"$in": record_ids}})
    existing_jobs = {job["recordId"]: job for job in existing_cursor}
        
    operations = []
    for data in jobs_data:
        # Compare core fields to see if there's a real update
        record_id = data["recordId"]
        is_updated = True
        if record_id in existing_jobs:
            old_data = existing_jobs[record_id]
            # Compare key fields that indicate a real change
            fields_to_compare = [
                "title", "shortDescription", "importantDates", 
                "applicationFee", "ageLimit", "vacancyDetails", 
                "importantLinks", "howToApply"
            ]
            
            changes_found = False
            for field in fields_to_compare:
                if data.get(field) != old_data.get(field):
                    changes_found = True
                    break
                    
            if not changes_found:
                is_updated = False
                # Restore the old updatedAt so it doesn't change
                if "updatedAt" in old_data:
                    data["updatedAt"] = old_data["updatedAt"]
                elif "scrapedAt" in old_data: # Fallback for old data
                    data["updatedAt"] = old_data["scrapedAt"]

        operations.append(
            UpdateOne(
                {"recordId": record_id},
                {"$set": data},
                upsert=True
            )
        )
        
    try:
        result = collection.bulk_write(operations, ordered=False)
        logger.info(f"Upsert Complete: {result.upserted_count} new inserts, {result.modified_count} updates.")
    except Exception as e:
        logger.error(f"Bulk write failed: {e}")

# --- Main Pipeline ---
def run_pipeline():
    logger.info("Starting Discovery Phase...")
    
    category_pages = [
        BASE_URL,
        f"{BASE_URL}/latestjob/",
        f"{BASE_URL}/admitcard/",
        f"{BASE_URL}/result/",
        f"{BASE_URL}/answerkey/",
        f"{BASE_URL}/syllabus/",
        f"{BASE_URL}/admission/",
        f"{BASE_URL}/important/",
        f"{BASE_URL}/certificate/"
    ]
    
    all_links = {}
    for page_url in category_pages:
        logger.info(f"Discovering links from: {page_url}")
        html = fetch_page(page_url)
        if html:
            links = extract_job_links(html)
            for link in links:
                url_lower = link['url'].lower()
                
                is_bypass_year_filter = (
                    'certificate' in page_url or 'important' in page_url or 
                    'certificate' in url_lower or 'important' in url_lower or 
                    
                    'offline' in page_url or 'outsourcing' in page_url or
                    'offline' in url_lower or 'outsourcing' in url_lower
                )
                
                if is_bypass_year_filter:
                    # Allow all links for certificate, important, offline, and outsourcing categories
                    all_links[link['url']] = link
                else:
                    current_year = datetime.now(timezone.utc).year
                    allowed_years = [str(y) for y in range(current_year - 1, current_year + 6)]
                    
                    # Filter by dynamic allowed years
                    if any(year in url_lower for year in allowed_years):
                        all_links[link['url']] = link
                    
    final_links = list(all_links.values())
    logger.info(f"Discovered {len(final_links)} unique job links for the targeted year range across all categories.")
    
    extracted_jobs = []
    logger.info("Starting Extraction & Processing Phase...")
    for idx, link_obj in enumerate(final_links):
        url = link_obj["url"]
        logger.info(f"[{idx+1}/{len(final_links)}] Scraping: {url}")
        
        job_data = parse_job_detail_page(url)
        if job_data:
            # Exclude jobs that have no importantLinks
            if not job_data.get('importantLinks'):
                logger.info(f"Skipping {url} as it has no importantLinks (empty page)")
                continue

            # Fallback title if h1 is missing
            if 'title' not in job_data or not job_data['title']:
                job_data['title'] = link_obj["title"]
            job_data['category'] = categorize_job(job_data['title'], job_data.get('recordId', ''))
            
            extracted_jobs.append(job_data)
            
    logger.info("Connecting to MongoDB for Database Strategy Phase...")
    try:
        collection = init_db()
        # Verify connection by forcing a ping
        collection.database.client.admin.command('ping')
        batch_upsert_jobs(collection, extracted_jobs)
        logger.info("Data Pipeline executed successfully.")
    except ConnectionFailure:
        logger.error("Could not connect to MongoDB. Is the IP address whitelisted in MongoDB Atlas?")
    except Exception as e:
        logger.error(f"Database error: {e}")

if __name__ == "__main__":
    run_pipeline()
