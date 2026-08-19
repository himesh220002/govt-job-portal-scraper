const { MongoClient } = require('mongodb');

async function run() {
  const uri = "mongodb+srv://satyamhimesh:06452220002Hq@cluster0.ckkeqng.mongodb.net/govtJobScraperDB?retryWrites=true&w=majority";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db('govtJobScraperDB');
    
    // Fetch top 50 recent records to simulate search results before sorting
    const rawJobs = await db.collection('scraper')
      .find({})
      .project({ _id: 1, recordId: 1, title: 1, category: 1, scrapedAt: 1 })
      .sort({ scrapedAt: -1 })
      .limit(50)
      .toArray();
      
    const jobs = rawJobs.sort((a, b) => {
      const getFourDigits = (recordId, title) => {
        const combined = `${recordId} ${title}`;
        const match = combined.match(/\b\d{4}\b/);
        return match ? parseInt(match[0], 10) : 0;
      };
      
      const numA = getFourDigits(a.recordId, a.title);
      const numB = getFourDigits(b.recordId, b.title);
      
      if (numA !== numB) {
        return numB - numA; // High to low
      }
      
      const dateA = a.scrapedAt ? new Date(a.scrapedAt).getTime() : 0;
      const dateB = b.scrapedAt ? new Date(b.scrapedAt).getTime() : 0;
      return dateB - dateA;
    });

    console.log("Top 10 results after sorting by 4-digits:");
    jobs.slice(0, 10).forEach(j => {
      const num = (() => {
        const match = `${j.recordId} ${j.title}`.match(/\b\d{4}\b/);
        return match ? match[0] : 'None';
      })();
      console.log(`[Extracted: ${num}] ${j.title}`);
    });
  } catch(err) {
    console.error(err);
  } finally {
    await client.close();
  }
}
run();
