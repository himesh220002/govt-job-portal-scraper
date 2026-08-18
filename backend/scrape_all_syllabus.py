import os
import time
import random
import logging
from datetime import datetime, timezone
from bs4 import BeautifulSoup
from pymongo import MongoClient, UpdateOne
from dotenv import load_dotenv
import requests
from urllib.parse import urlparse

load_dotenv()

MONGO_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/")
DB_NAME = "govtJobScraperDB"
COLLECTION_NAME = "scraper"
BASE_URL = "https://www.sarkariresult.com"

logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

def validate_public_url(url: str) -> str:
    parsed = urlparse(url)
    if parsed.scheme not in {'http', 'https'}:
        raise ValueError('Only HTTP(S) URLs are allowed')
    if parsed.username or parsed.password or not parsed.hostname:
        raise ValueError('Credentials and missing hosts are not allowed')
    return url

def fetch_page(url):
    delay = random.uniform(0.5, 1.5)
    time.sleep(delay)
    try:
        url = validate_public_url(url)
        headers = {'User-Agent': 'Mozilla/5.0'}
        response = requests.get(url, headers=headers, timeout=15)
        if response.status_code in {401, 403, 429}:
            return None
        return response.text
    except:
        return None

def extract_job_links(homepage_html):
    soup = BeautifulSoup(homepage_html, "html.parser")
    job_links = []
    for a_tag in soup.select('div#page a, div#post a'):
        href = a_tag.get('href')
        text = a_tag.get_text(strip=True)
        if href and len(text) > 5:
            if not href.startswith('http'):
                href = BASE_URL + href if href.startswith('/') else BASE_URL + '/' + href
            if href.startswith(BASE_URL) and href not in (BASE_URL, BASE_URL + '/'):
                job_links.append({"url": href, "title": text})
    return list({v['url']:v for v in job_links}.values())

def parse_job_detail_page(url):
    html = fetch_page(url)
    if not html: return None
    soup = BeautifulSoup(html, "html.parser")
    slug = url.strip('/').split('/')[-1]
    if not slug:
        slug = url.strip('/').split('/')[-2] if len(url.strip('/').split('/')) > 1 else "unknown_job"
        
    job_data = {
        "recordId": slug,
        "category": "Syllabus",
        "title": "",
        "organization": "",
        "examName": "",
        "shortDescription": "",
        "importantDates": {"_raw": []},
        "applicationFee": {"_raw": []},
        "ageLimit": {},
        "vacancyDetails": [],
        "howToApply": [],
        "importantLinks": {},
        "adsMeta": {},
        "scrapedAt": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
        "source_url": url
    }
    
    post_name_elem = soup.find('h1') or soup.find('div', class_='name-of-post')
    if post_name_elem:
        job_data['title'] = post_name_elem.get_text(strip=True)
        
    tables = soup.find_all('table')
    if tables:
        top_table = tables[0]
        for row in top_table.find_all('tr'):
            cells = row.find_all(['td', 'th'])
            if len(cells) == 2 and "Short Information" in cells[0].get_text():
                job_data["shortDescription"] = cells[1].get_text(strip=True)

    for table in tables:
        rows = table.find_all('tr')
        if len(rows) < 2: continue
        
        for i, row in enumerate(rows):
            cells = row.find_all(['td', 'th'])
            header_texts = [c.get_text(strip=True).lower() for c in cells]
            is_vacancy_table = any(h in header_texts for h in ["total post", "post name", "post", "vacancy", "total vacancy"]) or ("total" in header_texts and len(header_texts) > 3)
            
            if is_vacancy_table and len(header_texts) > 1:
                headers = [c.get_text(strip=True) for c in cells]
                if not any(headers): continue
                for data_row in rows[i+1:]:
                    data_cells = data_row.find_all(['td', 'th'])
                    data_texts = [c.get_text(strip=True) for c in data_cells]
                    if len(data_texts) == len(headers) and data_texts[0] not in headers:
                        job_data["vacancyDetails"].append(dict(zip(headers, data_texts)))
                break
                
        for row in rows:
            links = row.find_all('a', href=True)
            for link in links:
                link_text = link.get_text(strip=True)
                href = link['href']
                if href and link_text:
                    key = link_text.lower().replace(" ", "_").replace(".", "")
                    job_data["importantLinks"][key] = href
                    
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

def init_db():
    client = MongoClient(MONGO_URI)
    db = client[DB_NAME]
    collection = db[COLLECTION_NAME]
    collection.create_index("recordId", unique=True)
    return collection

def run_pipeline():
    logger.info("Starting MASSIVE Syllabus Discovery Phase...")
    syllabus_page = f"{BASE_URL}/syllabus/"
    html = fetch_page(syllabus_page)
    if not html:
        logger.error("Failed to load syllabus page.")
        return
        
    links = extract_job_links(html)
    logger.info(f"Discovered {len(links)} syllabus links (NO YEAR LIMIT).")
    
    extracted_jobs = []
    for idx, link_obj in enumerate(links):
        url = link_obj["url"]
        logger.info(f"[{idx+1}/{len(links)}] Scraping Syllabus: {url}")
        
        job_data = parse_job_detail_page(url)
        if job_data:
            if not job_data['title']:
                job_data['title'] = link_obj["title"]
            extracted_jobs.append(job_data)
            
    collection = init_db()
    if extracted_jobs:
        operations = [UpdateOne({"recordId": d["recordId"]}, {"$set": d}, upsert=True) for d in extracted_jobs]
        result = collection.bulk_write(operations, ordered=False)
        logger.info(f"Syllabus Upsert Complete: {result.upserted_count} new inserts, {result.modified_count} updates.")

if __name__ == "__main__":
    run_pipeline()
