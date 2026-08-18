import Link from 'next/link';
import clientPromise from '@/lib/mongodb';

export const dynamic = 'force-dynamic'; // Since search params are dynamic

const STOP_WORDS = [
  'latest', 'jobs', 'job', 'govt', 'upcoming', 'exam', 'exams', 
  'eligibility', 'date', 'result', 'results', 'admit', 'card', 
  'syllabus', 'sarkari', 'post', 'posts', 'recruitment', 'online', 'form'
];

async function performSearch(query: string) {
  if (!query) return [];

  const rawWords = query.toLowerCase().split(/\s+/);
  const keywords = rawWords.filter(word => !STOP_WORDS.includes(word) && word.length > 1);

  const client = await clientPromise;
  const db = client.db('govtJobScraperDB');

  let filter = {};

  if (keywords.length > 0) {
    // If we have actual keywords left, construct an $and query with $regex
    const andClauses = keywords.map(kw => ({
      $or: [
        { title: { $regex: kw, $options: 'i' } },
        { category: { $regex: kw, $options: 'i' } }
      ]
    }));
    
    filter = { $and: andClauses };
  } else {
    // If all words were stop words, we can fallback to matching the stop words against categories
    // For example "latest jobs" -> matches Latest Job category
    const categoryMatches = rawWords.map(w => ({ category: { $regex: w, $options: 'i' } }));
    filter = { $or: categoryMatches };
  }

  const jobs = await db.collection('scraper')
    .find(filter)
    .project({ _id: 1, recordId: 1, title: 1, category: 1, scrapedAt: 1 })
    .sort({ scrapedAt: -1 })
    .limit(50) // limit results
    .toArray();
    
  return JSON.parse(JSON.stringify(jobs));
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q || '';
  const results = await performSearch(query);

  return (
    <main className="max-w-5xl mx-auto px-5 py-10 min-h-screen">
      <Link href="/" className="inline-flex items-center text-gray-500 mb-6 font-medium text-sm hover:text-gray-900 transition-colors">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Home
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Search Results</h1>
        <p className="text-gray-500 text-lg">
          Showing results for <span className="font-semibold text-blue-700">"{query}"</span>
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col overflow-hidden mb-8">
        <div className="bg-cyan-600 text-white font-bold text-xl p-4 tracking-wide flex justify-between items-center">
          <span>Results</span>
          <span className="text-sm bg-white/20 px-3 py-1 rounded-full">{results.length} found</span>
        </div>
        
        <ul className="flex-1 p-0 m-0 divide-y divide-gray-100">
          {results.length > 0 ? (
            results.map((job: any) => (
              <li key={job._id} className="transition-colors hover:bg-gray-50 flex items-center justify-between px-5 py-4">
                <div className="flex flex-col pr-4">
                   <Link 
                     href={`/${job.recordId}`} 
                     className="text-lg text-gray-900 hover:text-blue-700 font-semibold leading-tight mb-1"
                   >
                     {job.title}
                   </Link>
                   <div className="flex items-center gap-3 text-sm mt-1">
                     <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md font-medium">{job.category}</span>
                     <span className="text-gray-500">{job.scrapedAt ? new Date(job.scrapedAt).toLocaleDateString() : 'Recent'}</span>
                   </div>
                </div>
                <Link href={`/${job.recordId}`} className="flex-shrink-0 bg-white text-blue-700 border border-blue-200 px-4 py-2 rounded-md font-medium text-sm hover:bg-blue-50 transition-colors shadow-sm">
                   View
                </Link>
              </li>
            ))
          ) : (
            <li className="px-5 py-16 text-center flex flex-col items-center justify-center">
              <span className="text-4xl mb-4">🔍</span>
              <h3 className="text-xl font-bold text-gray-700 mb-2">No matches found</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                We couldn't find any jobs or updates matching "{query}". Try checking your spelling or using fewer keywords.
              </p>
            </li>
          )}
        </ul>
      </div>
    </main>
  );
}
