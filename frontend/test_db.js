const { MongoClient } = require('mongodb');
require('dotenv').config({ path: '.env.local' });

async function run() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('govtJobScraperDB');
    const job = await db.collection('scraper').findOne({ recordId: 'sbi-j-a-clerk-august26' });
    console.log(JSON.stringify(job.vacancyDetails, null, 2));
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
