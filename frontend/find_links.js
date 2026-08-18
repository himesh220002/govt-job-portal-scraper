const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function run() {
  const client = new MongoClient(process.env.MONGODB_URI || "mongodb://localhost:27017");
  await client.connect();
  const db = client.db('govtJobScraperDB');
  const collection = db.collection('scraper');
  
  const jobs = await collection.find({}, { projection: { recordId: 1, title: 1 } }).toArray();
  
  const queries = [
    "UPSC Civil Services",
    "SSC CGL",
    "SBI PO",
    "RRB NTPC",
    "NDA",
    "IAS",
    "IBPS PO",
    "IIT Bombay",
    "IIT Delhi",
    "IIT Madras",
    "UGC NET",
    "UPSC Prelims"
  ];
  
  for (const q of queries) {
    const match = jobs.find(j => j.title && j.title.toLowerCase().includes(q.toLowerCase()));
    console.log(`Query: ${q}`);
    if (match) {
      console.log(`  Found: ${match.title}`);
      console.log(`  recordId: ${match.recordId}`);
    } else {
      console.log(`  NOT FOUND`);
    }
  }
  await client.close();
}
run().catch(console.error);
