import os
import logging
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

MONGO_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/")
DB_NAME = "govtJobScraperDB"
COLLECTION_NAME = "scraper"

# Logging setup
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

def get_db_collection():
    try:
        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
        client.admin.command('ping')
        db = client[DB_NAME]
        return db[COLLECTION_NAME]
    except ConnectionFailure:
        logger.error("Could not connect to MongoDB.")
        return None
    except Exception as e:
        logger.error(f"Database error: {e}")
        return None

def fetch_jobs(query: dict, fields: list = None):
    """
    Fetches jobs based on a query filter and a list of fields (projection schema).
    
    :param query: dict representing MongoDB filter, e.g. {"category": "Result"}
    :param fields: list of strings for fields to return, e.g. ["title", "examName"]
    :return: list of documents
    """
    collection = get_db_collection()
    if collection is None:
        return []
        
    projection = {"_id": 0} # Exclude MongoDB ObjectID by default
    if fields:
        for field in fields:
            projection[field] = 1
            
    # Execute query
    cursor = collection.find(query, projection)
    
    results = list(cursor)
    logger.info(f"Fetched {len(results)} records matching query: {query}")
    return results

if __name__ == "__main__":
    logger.info("Testing Data Retrieval Schema...")
    
    # Example: Fetch Exam Name + Admit Card Date + Title
    sample_query = {}
    requested_fields = ["title", "examName", "importantDates", "recordId"]
    
    logger.info(f"Executing Query: {sample_query} | Projection: {requested_fields}")
    data = fetch_jobs(query=sample_query, fields=requested_fields)
    
    if data:
        print("\n--- SAMPLE RETRIEVED DATA ---")
        for i, record in enumerate(data[:3]): # Print up to 3 records
            print(f"[{i+1}] {record}")
        print("-----------------------------\n")
    else:
        logger.info("No data found or connection failed.")
