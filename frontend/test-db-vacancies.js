const { MongoClient } = require('mongodb');

async function test() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('govtJobScraperDB');
    const jobs = await db.collection('scraper').find({ vacancyDetails: { $exists: true, $not: {$size: 0} } }).limit(5).toArray();
    for (const job of jobs) {
      console.log(job.title);
      console.log(JSON.stringify(job.vacancyDetails, null, 2));
      console.log('---');
    }
  } finally {
    await client.close();
  }
}

test().catch(console.error);
