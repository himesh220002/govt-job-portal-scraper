from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()
MONGO_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/")
client = MongoClient(MONGO_URI)
db = client["govtJobScraperDB"]
collection = db["scraper"]

result = collection.delete_many({"importantLinks": {}})
print(f"Deleted {result.deleted_count} empty records from the database.")
