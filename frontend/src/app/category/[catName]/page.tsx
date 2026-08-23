import Link from 'next/link';
import { notFound } from 'next/navigation';
import clientPromise from '@/lib/mongodb';
import { categorizeJobs } from '@/lib/categorize';
import { categoryMeta } from '@/lib/categoryMeta';
import CategoryJobList from '@/components/CategoryJobList';

export const revalidate = 60;

import { unstable_cache } from 'next/cache';

const getJobs = unstable_cache(
  async () => {
    const client = await clientPromise;
    const db = client.db('govtJobScraperDB');
    const rawJobs = await db.collection('scraper')
      .find({})
      .project({ _id: 1, recordId: 1, title: 1, category: 1, updatedAt: 1, lastOfficialUpdate: 1, importantDates: 1 })
      .toArray();

    const jobs = rawJobs.map((job: any) => {
      let extractedLastDate = null;
      if (job.importantDates) {
        const rawText = Array.isArray(job.importantDates._raw) 
          ? job.importantDates._raw.map((i: any) => i.raw_text).join(' ') 
          : JSON.stringify(job.importantDates);
        
        const match = rawText.match(/last date[^\n:]*[:\n]\s*([0-9]{1,2}[\/\-][0-9]{1,2}[\/\-][0-9]{2,4}|Not Available|TBA|Soon|As per Schedule)/i);
        if (match) {
          extractedLastDate = match[1];
        }
      }
      return {
        _id: job._id,
        recordId: job.recordId,
        title: job.title,
        category: job.category,
        updatedAt: job.updatedAt,
        lastOfficialUpdate: job.lastOfficialUpdate,
        extractedLastDate
      };
    });

    return JSON.parse(JSON.stringify(jobs));
  },
  ['all-jobs'],
  { revalidate: 60, tags: ['jobs'] }
);

const CATEGORY_MAP: Record<string, string> = {
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

export default async function CategoryPage({ params }: { params: Promise<{ catName: string }> }) {
  const resolvedParams = await params;
  const rawCatName = resolvedParams.catName;

  const originalCatName = CATEGORY_MAP[rawCatName.toLowerCase()];

  if (!originalCatName) {
    notFound();
  }

  const jobs = await getJobs();
  const categorizedJobs = categorizeJobs(jobs);
  const categoryJobs = categorizedJobs[originalCatName] || [];
  const meta = categoryMeta(originalCatName);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Compact dark header */}
      <section className="relative overflow-hidden bg-[#050914] text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050914] via-[#0a1a3f] to-[#10255c]" />
        <div className="bg-grid-dark absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-20 left-1/4 h-64 w-64 rounded-full bg-blue-600/30 blur-[100px] animate-blob" />
        <div className="absolute top-0 right-1/5 h-56 w-56 rounded-full bg-cyan-400/20 blur-[100px] animate-blob [animation-delay:2s]" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-14">
          {/* <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-blue-100 backdrop-blur-md transition-all hover:border-cyan-300/50 hover:bg-white/10 hover:text-cyan-200"
          >
            <svg className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link> */}

          <div className="mt-6 flex flex-col items-center text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl backdrop-blur-md ring-1 ring-white/20 shadow-lg">
              {meta.icon}
            </span>
            <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              {originalCatName}
            </h1>
            <p className="mt-3 text-sm text-blue-100/85 sm:text-base">
              Latest updates for {originalCatName} — notifications, dates and official links in one place.
            </p>
            <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm font-bold text-cyan-200 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>
              {categoryJobs.length} live updates
            </span>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 leading-none">
          <svg className="block h-8 w-full sm:h-12" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,30 C360,58 1080,6 1440,34 L1440,60 L0,60 Z" fill="#eef2ff" opacity="0.6" />
            <path d="M0,40 C360,60 1080,20 1440,44 L1440,60 L0,60 Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10">
        <CategoryJobList originalCatName={originalCatName} categoryJobs={categoryJobs} />
      </div>
    </main>
  );
}