import Link from 'next/link';
import { Suspense } from 'react';
import clientPromise from '@/lib/mongodb';
import SearchBar from '@/components/SearchBar';
import SortController from '@/components/SortController';
import CategoryFilter from '@/components/CategoryFilter';

export const dynamic = 'force-dynamic'; // Since search params are dynamic

const STOP_WORDS = [
  'latest', 'jobs', 'job', 'govt', 'upcoming', 'exam', 'exams',
  'eligibility', 'date', 'result', 'results', 'admit', 'card',
  'syllabus', 'sarkari', 'post', 'posts', 'recruitment', 'online', 'form'
];

async function performSearch(query: string, sort: string, categoryFilter: string | null) {
  const rawWords = query ? query.toLowerCase().split(/\s+/) : [];
  const keywords = rawWords.filter(word => !STOP_WORDS.includes(word) && word.length > 1);

  const client = await clientPromise;
  const db = client.db('govtJobScraperDB');

  let filter = {};

  if (rawWords.length > 0) {
    const andClauses = keywords.map(kw => ({
      $or: [
        { title: { $regex: kw, $options: 'i' } },
        { category: { $regex: kw, $options: 'i' } }
      ]
    }));

    if (andClauses.length > 0) {
      filter = { $and: andClauses };
    } else {
      const categoryMatches = rawWords.map(w => ({ category: { $regex: w, $options: 'i' } }));
      filter = { $or: categoryMatches };
    }
  } else {
    filter = {}; // Return all records if no query is provided
  }

  if (categoryFilter) {
    if (Object.keys(filter).length === 0) {
      filter = { category: categoryFilter };
    } else {
      filter = { $and: [{ category: categoryFilter }, filter] };
    }
  }

  const rawJobs = await db.collection('scraper')
    .find(filter)
    .project({ _id: 1, recordId: 1, title: 1, category: 1, updatedAt: 1, lastOfficialUpdate: 1 })
    .sort({ updatedAt: -1 })
    .toArray();

  const jobs = rawJobs.sort((a, b) => {
    if (sort === 'a-z') {
      return (a.title || '').localeCompare(b.title || '');
    } else if (sort === 'z-a') {
      return (b.title || '').localeCompare(a.title || '');
    }

    const getFourDigits = (recordId: string, title: string) => {
      const combined = `${recordId} ${title}`;
      const matches = combined.match(/(?<!\d)\d{4}(?!\d)/g);
      if (matches) {
        const maxYear = new Date().getFullYear() + 5;
        for (const match of matches) {
          const num = parseInt(match, 10);
          if (num <= maxYear) {
            return num;
          }
        }
      }
      return 0;
    };



    const parseDate = (lastOfficialUpdate?: string, updatedAt?: string) => {
      if (lastOfficialUpdate) {
        const dateStr = lastOfficialUpdate.split('|')[0].trim();
        const time = new Date(dateStr).getTime();
        if (!isNaN(time)) return time;
      }
      return new Date(updatedAt || 0).getTime();
    };

    const dateA = parseDate(a.lastOfficialUpdate, a.updatedAt);
    const dateB = parseDate(b.lastOfficialUpdate, b.updatedAt);

    if (sort === 'oldest') {
      if (dateA !== dateB) {
        return dateA - dateB; // Ascending date
      }
      const numA = getFourDigits(a.recordId, a.title);
      const numB = getFourDigits(b.recordId, b.title);
      return numA - numB; // Ascending year fallback
    }

    // Default: newest
    if (dateA !== dateB) {
      return dateB - dateA; // Descending date
    }
    const numA = getFourDigits(a.recordId, a.title);
    const numB = getFourDigits(b.recordId, b.title);
    return numB - numA; // Descending year fallback
  });

  return JSON.parse(JSON.stringify(jobs));
}

const categoryColors: Record<string, string> = {
  'Result': 'bg-emerald-50 text-emerald-700 border-emerald-200',
  'Admit Card': 'bg-amber-50 text-amber-700 border-amber-200',
  'Latest Job': 'bg-blue-50 text-blue-700 border-blue-200',
  'Answer Key': 'bg-rose-50 text-rose-700 border-rose-200',
  'Syllabus': 'bg-violet-50 text-violet-700 border-violet-200',
  'Admission': 'bg-cyan-50 text-cyan-700 border-cyan-200',
  'Certificate': 'bg-teal-50 text-teal-700 border-teal-200',
  'Important': 'bg-orange-50 text-orange-700 border-orange-200',
  'Outsourcing/Offline Job': 'bg-slate-100 text-slate-700 border-slate-300',
};

function categoryBadge(category: string) {
  return categoryColors[category] || 'bg-indigo-50 text-indigo-700 border-indigo-200';
}

const SUGGESTIONS = ['SSC', 'UPSC', 'Railway', 'Bank', 'NDA', 'TET'];

function ResultsSkeleton() {
  return (
    <div className="animate-pulse space-y-4" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="h-4 w-2/3 rounded-full bg-slate-200" />
          <div className="mt-3 flex items-center gap-3">
            <div className="h-5 w-16 rounded-full bg-slate-200" />
            <div className="h-4 w-24 rounded-full bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}

async function ResultsSection({ query, sort, category }: { query: string, sort: string, category: string | null }) {
  const results = await performSearch(query, sort, category);

  return (
    <div>
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Search Results
          </h1>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-sm font-bold text-blue-700">
            {results.length}
            <span className="font-medium text-blue-500">found</span>
          </span>
        </div>
        <div className="flex items-center gap-3">
          {query && (
            <span className="hidden sm:inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm text-slate-600 shadow-sm">
              <span className="text-slate-400">for</span>
              <span className="font-semibold text-slate-900">&ldquo;{query}&rdquo;</span>
            </span>
          )}
          <Suspense fallback={<div className="h-9 w-32 bg-slate-100 rounded-lg animate-pulse" />}>
            <CategoryFilter />
            <SortController />
          </Suspense>
        </div>
      </div>

      {results.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <ul className="divide-y divide-slate-100">
            {results.map((job: { _id: string; recordId: string; title: string; category: string; updatedAt?: string; lastOfficialUpdate?: string }) => (
              <li key={job._id} className="group transition-colors hover:bg-slate-50/80">
                <Link
                  href={`/${job.recordId}`}
                  className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6"
                >
                  <div className="flex min-w-0 flex-col pr-2">
                    <span className="mb-1.5 line-clamp-2 text-[15px] font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-700 sm:text-base">
                      {job.title}
                    </span>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold ${categoryBadge(job.category)}`}>
                        {job.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-slate-500">
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                          <line x1="16" y1="2" x2="16" y2="6"></line>
                          <line x1="8" y1="2" x2="8" y2="6"></line>
                          <line x1="3" y1="10" x2="21" y2="10"></line>
                        </svg>
                        {job.lastOfficialUpdate 
                          ? job.lastOfficialUpdate.split('|')[0].trim() 
                          : (job.updatedAt ? new Date(job.updatedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : 'Recent')}
                      </span>
                    </div>
                  </div>

                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-blue-600 shadow-sm transition-all duration-300 group-hover:border-blue-300 group-hover:bg-blue-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-blue-600/30">
                    <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-4xl shadow-inner">
            🔍
          </div>
          <h2 className="mt-6 font-display text-xl font-bold text-slate-900 sm:text-2xl">No matches found</h2>
          <p className="mt-2 max-w-md text-sm text-slate-500">
            We couldn&apos;t find anything for{query ? ` "${query}"` : ' your search'}. Try checking the spelling or use fewer keywords.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Try:</span>
            {SUGGESTIONS.map((term) => (
              <Link
                key={term}
                href={`/search?q=${encodeURIComponent(term)}`}
                className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold text-slate-700 transition-all hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 hover:scale-105"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string, sort?: string, category?: string }>
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q || '';
  const sort = resolvedSearchParams.sort || 'newest';
  const category = resolvedSearchParams.category || null;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Compact hero header directly under the navbar */}
      <section className="relative overflow-hidden bg-[#050914] text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050914] via-[#0a1a3f] to-[#10255c]" />
        <div className="bg-grid-dark absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-20 left-1/4 h-64 w-64 rounded-full bg-blue-600/30 blur-[100px] animate-blob" />
        <div className="absolute top-0 right-1/5 h-56 w-56 rounded-full bg-cyan-400/20 blur-[100px] animate-blob [animation-delay:2s]" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-14 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-semibold text-cyan-200 backdrop-blur-md">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            Search across jobs, results, admit cards &amp; more
          </span>

          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Search <span className="shimmer-text">Results</span>
          </h1>

          <div className="mx-auto mt-6 max-w-2xl">
            <SearchBar initialQuery={query} />
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
        <Suspense fallback={<ResultsSkeleton />}>
          <ResultsSection query={query} sort={sort} category={category} />
        </Suspense>
      </div>
    </main>
  );
}