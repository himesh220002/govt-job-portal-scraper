import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv()
MONGO_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/")
DB_NAME = "govtJobScraperDB"
COLLECTION_NAME = "scraper"
client = MongoClient(MONGO_URI)
db = client[DB_NAME]
collection = db[COLLECTION_NAME]
result = collection.update_many({}, {"$rename": {"scrapedAt": "updatedAt"}})
print(f"Renamed {result.modified_count} documents.")
