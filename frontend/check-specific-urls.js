const { MongoClient } = require('mongodb');
async function run() {
  const uri = "mongodb+srv://satyamhimesh:06452220002Hq@cluster0.ckkeqng.mongodb.net/govtJobScraperDB?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('govtJobScraperDB');
    const jobs = await db.collection('scraper').find({
      $or: [
        { title: { $regex: 'UPSC NDA I Exam 2016', $options: 'i' } },
        { title: { $regex: 'UPPSC UPSC NDA 1', $options: 'i' } },
        { title: { $regex: 'RBI Office Attendant', $options: 'i' } },
        { title: { $regex: 'Rajasthan Staff Selection Board', $options: 'i' } }
      ]
    }).project({ recordId: 1, title: 1 }).toArray();
    
    console.log(JSON.stringify(jobs, null, 2));
  } finally {
    await client.close();
  }
}
run();
