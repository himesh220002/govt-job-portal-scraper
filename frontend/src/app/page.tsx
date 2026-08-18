import Link from 'next/link';
import clientPromise from '@/lib/mongodb';
import { categorizeJobs } from '@/lib/categorize';

export const revalidate = 60; // Revalidate every 60 seconds

async function getJobs() {
  const client = await clientPromise;
  const db = client.db('govtJobScraperDB');
  const jobs = await db.collection('scraper')
    .find({})
    .toArray();

  return JSON.parse(JSON.stringify(jobs));
}

export default async function Home() {
  const jobs = await getJobs();
  const categorizedJobs = categorizeJobs(jobs);

  const categoryOrder = [
    'Result', 'Admit Card', 'Latest Job',
    'Answer Key', 'Syllabus', 'Admission',
    'Certificate', 'Important', 'Outsourcing/Offline Job'
  ];

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-center text-4xl font-bold text-gray-900 mb-2">Govt Jobs Portal</h1>
      <p className="text-center text-gray-500 text-md mb-10">Your latest portal for all Sarkari Results and Job Postings.</p>

      {jobs.length === 0 ? (
        <p className="text-gray-500 text-center">No jobs found in the database. Run the scraper first!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryOrder.map((catName) => {
            const items = categorizedJobs[catName];
            const displayItems = items.slice(0, 20);

            return (
              <div key={catName} className="bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col overflow-hidden">
                <div className="bg-blue-800 text-white font-bold text-lg p-3 text-center tracking-wide uppercase">
                  {catName}
                </div>

                <ul className="flex-1 p-0 m-0 divide-y divide-gray-100">
                  {displayItems.length > 0 ? (
                    displayItems.map((job) => (
                      <li key={job._id} className="transition-colors hover:bg-gray-50">
                        <Link
                          href={`/${job.recordId}`}
                          className="block px-4 py-3 text-md text-gray-800 hover:text-blue-700 font-medium leading-tight"
                        >
                          {job.title}
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="px-4 py-8 text-center text-sm text-gray-400">
                      No updates in this section.
                    </li>
                  )}
                </ul>

                <div className="bg-gray-50 border-t border-gray-100 p-3 text-center mt-auto">
                  <Link href={`/category/${catName.toLowerCase().replace(/[\s/]+/g, '-')}`} className="text-blue-600 font-semibold text-sm hover:underline">
                    View More {catName}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
