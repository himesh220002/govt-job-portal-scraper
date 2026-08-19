const { MongoClient } = require('mongodb');

async function run() {
  const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('govtJobScraperDB');
    const result = await db.collection('scraper').aggregate([
      { $limit: 1 },
      { $project: { yearMatch: { $regexFind: { input: "test-2026", regex: "\\d{4}" } } } }
    ]).toArray();
    console.log("Aggregation success:", result);
  } catch (e) {
    console.error("Aggregation error:", e);
  } finally {
    await client.close();
  }
}
run();
