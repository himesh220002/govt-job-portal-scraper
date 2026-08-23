const { MongoClient } = require('mongodb');

async function run() {
  const client = new MongoClient('mongodb://localhost:27017');
  await client.connect();
  const db = client.db('sarkari_jobs');
  const jobs = await db.collection('scraper')
    .find({'importantDates.0': {$exists: true}})
    .limit(10)
    .toArray();
    
  console.log(JSON.stringify(jobs.map(j => ({
    title: j.title,
    dates: j.importantDates
  })), null, 2));
  
  await client.close();
}
run();
