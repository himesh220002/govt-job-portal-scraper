const { MongoClient } = require('mongodb');
async function run() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('govtJobScraperDB');
    const jobs = await db.collection('scraper').find({}).project({ recordId: 1, title: 1 }).limit(10).toArray();
    console.log(jobs);
  } finally {
    await client.close();
  }
}
run();
