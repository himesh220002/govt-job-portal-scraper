const { MongoClient } = require('mongodb');
async function run() {
  const uri = "mongodb+srv://satyamhimesh:06452220002Hq@cluster0.ckkeqng.mongodb.net/govtJobScraperDB?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('govtJobScraperDB');
    const jobs = await db.collection('scraper').find({}).project({ recordId: 1, title: 1 }).limit(30).toArray();
    console.log(JSON.stringify(jobs, null, 2));
  } finally {
    await client.close();
  }
}
run();
