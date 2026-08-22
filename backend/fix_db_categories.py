import os
from pymongo import MongoClient

# Use the same MongoDB URI as the scraper
MONGO_URI = os.getenv("MONGODB_URI", "mongodb+srv://satyamhimesh:06452220002Hq@cluster0.ckkeqng.mongodb.net/govtJobScraperDB?retryWrites=true&w=majority")

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

def fix_database():
    print("Connecting to MongoDB...")
    client = MongoClient(MONGO_URI)
    db = client['govtJobScraperDB']
    collection = db['scraper']
    
    jobs = collection.find({})
    count = 0
    updates = 0
    
    for job in jobs:
        count += 1
        new_category = categorize_job(job.get('title', ''), job.get('recordId', ''))
        
        # Update if it's currently "Latest Job" or different from what it should be
        if job.get('category') != new_category:
            collection.update_one({'_id': job['_id']}, {'$set': {'category': new_category}})
            updates += 1
            
    print(f"Scanned {count} jobs. Updated {updates} jobs to their correct categories.")

if __name__ == "__main__":
    fix_database()
