import Link from 'next/link';
import { notFound } from 'next/navigation';
import clientPromise from '@/lib/mongodb';
import { categorizeJobs } from '@/lib/categorize';

export const revalidate = 60;

import { unstable_cache } from 'next/cache';

const getJobs = unstable_cache(
  async () => {
    const client = await clientPromise;
    const db = client.db('govtJobScraperDB');
    const jobs = await db.collection('scraper')
      .find({})
      .project({ _id: 1, recordId: 1, title: 1, category: 1, scrapedAt: 1 })
      .toArray();
      
    return JSON.parse(JSON.stringify(jobs));
  },
  ['all-jobs'],
  { revalidate: 60, tags: ['jobs'] }
);

export default async function CategoryPage({ params }: { params: Promise<{ catName: string }> }) {
  const resolvedParams = await params;
  const rawCatName = resolvedParams.catName;
  
  const categoryMap: Record<string, string> = {
    'result': 'Result',
    'admit-card': 'Admit Card',
    'latest-job': 'Latest Job',
    'answer-key': 'Answer Key',
    'syllabus': 'Syllabus',
    'admission': 'Admission',
    'certificate': 'Certificate',
    'outsourcing-offline-job': 'Outsourcing/Offline Job',
    'important': 'Important'
  };
  
  const originalCatName = categoryMap[rawCatName.toLowerCase()];
  
  if (!originalCatName) {
    notFound();
  }

  const jobs = await getJobs();
  const categorizedJobs = categorizeJobs(jobs);
  const categoryJobs = categorizedJobs[originalCatName] || [];

  return (
    <main className="max-w-5xl mx-auto px-5 py-10">
      <Link href="/" className="inline-flex items-center text-gray-500 mb-6 font-medium text-sm hover:text-gray-900 transition-colors">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Home
      </Link>

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col overflow-hidden mb-8">
        <div className="bg-blue-800 text-white font-bold text-xl p-4 text-center tracking-wide uppercase">
          {originalCatName} ({categoryJobs.length})
        </div>
        
        <ul className="flex-1 p-0 m-0 divide-y divide-gray-100">
          {categoryJobs.length > 0 ? (
            categoryJobs.map((job: any) => (
              <li key={job._id} className="transition-colors hover:bg-gray-50 flex items-center justify-between px-5 py-4">
                <div className="flex flex-col pr-4">
                   <Link 
                     href={`/${job.recordId}`} 
                     className="text-lg text-gray-900 hover:text-blue-700 font-semibold leading-tight mb-1"
                   >
                     {job.title}
                   </Link>
                   <span className="text-sm text-gray-500">{new Date(job.scrapedAt).toLocaleDateString()}</span>
                </div>
                <Link href={`/${job.recordId}`} className="flex-shrink-0 bg-blue-50 text-blue-700 border border-blue-600 px-4 py-2 rounded-md font-medium text-sm hover:bg-blue-100 transition-colors">
                   View
                </Link>
              </li>
            ))
          ) : (
            <li className="px-5 py-10 text-center text-gray-400">
              No updates in this section yet.
            </li>
          )}
        </ul>
      </div>
    </main>
  );
}
