const { MongoClient } = require('mongodb');
async function run() {
  const uri = "mongodb+srv://satyamhimesh:06452220002Hq@cluster0.ckkeqng.mongodb.net/govtJobScraperDB?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('govtJobScraperDB');
    const jobs = await db.collection('scraper').find({}).project({ recordId: 1, title: 1 }).toArray();
    
    // apply same logic
    const getFourDigits = (str) => {
      if (!str) return 0;
      const match = str.match(/\d{4}/);
      return match ? parseInt(match[0], 10) : 0;
    };
    
    const sorted = jobs.sort((a, b) => {
       const numA = getFourDigits(a.recordId);
       const numB = getFourDigits(b.recordId);
       return numB - numA;
    });
    
    console.log(sorted.slice(0, 10).map(j => `${getFourDigits(j.recordId)} | ${j.recordId} | ${j.title}`));
  } finally {
    await client.close();
  }
}
run();
