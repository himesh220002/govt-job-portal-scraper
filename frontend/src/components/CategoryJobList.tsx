"use client";

import { useState } from 'react';
import Link from 'next/link';
import { categoryMeta } from '@/lib/categoryMeta';

type SortMode = 'recent' | 'az';

interface CategoryJob {
  _id: string;
  recordId: string;
  title: string;
  category: string;
  updatedAt?: string;
  lastOfficialUpdate?: string;
  extractedLastDate?: string | null;
}

const SORT_OPTIONS: { key: SortMode; label: string; icon: string }[] = [
  { key: 'recent', label: 'Latest', icon: '🕐' },
  { key: 'az', label: 'A - Z', icon: '🔤' },
];

export default function CategoryJobList({ originalCatName, categoryJobs }: { originalCatName: string, categoryJobs: CategoryJob[] }) {
  const [sortMode, setSortMode] = useState<SortMode>('recent');

  const sortItems = (items: CategoryJob[]) => {
    const itemsCopy = [...items];

    return itemsCopy.sort((a, b) => {
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

      if (sortMode === 'az') {
        return (a.title || "").toLowerCase().localeCompare((b.title || "").toLowerCase());
      }

      // Latest: year descending, then date, then title A-Z
      const yearA = getFourDigits(a.recordId, a.title);
      const yearB = getFourDigits(b.recordId, b.title);

      if (yearA !== yearB) {
        return yearB - yearA;
      }
      const parseDate = (lastOfficialUpdate?: string, updatedAt?: string) => {
        let time = NaN;
        if (lastOfficialUpdate) {
          const dateStr = lastOfficialUpdate.split('|')[0].trim();
          time = new Date(dateStr).getTime();
          
          if (isNaN(time)) {
            const match = dateStr.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})/);
            if (match) {
              const day = parseInt(match[1], 10);
              const month = parseInt(match[2], 10) - 1;
              let year = parseInt(match[3], 10);
              if (year < 100) year += 2000;
              time = new Date(year, month, day).getTime();
            }
          }
        }
        return isNaN(time) ? new Date(updatedAt || 0).getTime() : time;
      };

      const dateA = parseDate(a.lastOfficialUpdate, a.updatedAt);
      const dateB = parseDate(b.lastOfficialUpdate, b.updatedAt);
      if (dateA !== dateB) {
        return dateB - dateA;
      }
      return (a.title || "").toLowerCase().localeCompare((b.title || "").toLowerCase());
    });
  };

  const sortedJobs = sortItems(categoryJobs);
  const meta = categoryMeta(originalCatName);

  return (
    <>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <span className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${meta.header} text-xl text-white shadow-lg`}>
            {meta.icon}
          </span>
          <div>
            <h1 className="font-display text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">{originalCatName}</h1>
            <p className="text-sm text-slate-500">{categoryJobs.length} updates available</p>
          </div>
        </div>

        {/* Segmented sort control */}
        <div className="inline-flex w-fit items-center gap-1 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm md:w-auto">
          <span className="hidden sm:inline px-3 text-sm font-semibold text-slate-500">Sort by</span>
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSortMode(opt.key)}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${sortMode === opt.key
                  ? `bg-gradient-to-r ${meta.header} text-white shadow-md`
                  : 'text-slate-600 hover:bg-slate-100 hover:text-blue-700'
                }`}
            >
              <span className="text-xs">{opt.icon}</span>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {sortedJobs.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className={`relative overflow-hidden bg-gradient-to-r ${meta.header} px-6 py-4 text-white`}>
            <div className="absolute inset-0 bg-grid-dark opacity-30" />
            <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10 blur-2xl" />
            <div className="relative flex items-center justify-between gap-3">
              <h2 className="flex items-center gap-2.5 font-display text-base font-extrabold tracking-wide uppercase">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-base backdrop-blur-sm">
                  {meta.icon}
                </span>
                {originalCatName}
              </h2>
              <span className="rounded-full bg-white/20 px-3 py-0.5 text-xs font-bold backdrop-blur-sm">
                {categoryJobs.length} Jobs
              </span>
            </div>
          </div>

          <ul className="divide-y divide-slate-100">
            {sortedJobs.map((job: CategoryJob) => (
              <li key={job._id} className="group transition-colors hover:bg-blue-50/50">
                <Link
                  href={`/${job.recordId}`}
                  className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6"
                >
                  <div className="flex min-w-0 flex-col pr-2">
                    <span className="mb-1.5 line-clamp-2 text-[15px] font-semibold leading-snug text-slate-900 transition-colors group-hover:text-blue-700 sm:text-base">
                      {job.title}
                    </span>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold ${meta.badge}`}>
                        {job.category}
                      </span>
                      {originalCatName === 'Latest Job' && job.extractedLastDate && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-orange-200 bg-orange-50 px-2.5 py-0.5 font-semibold text-orange-700">
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          Last Date: {job.extractedLastDate}
                        </span>
                      )}
                      {(job.lastOfficialUpdate || job.updatedAt) && (
                        <span className="inline-flex items-center gap-1 text-slate-500">
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                            <line x1="16" y1="2" x2="16" y2="6"></line>
                            <line x1="8" y1="2" x2="8" y2="6"></line>
                            <line x1="3" y1="10" x2="21" y2="10"></line>
                          </svg>
                          {job.lastOfficialUpdate
                            ? job.lastOfficialUpdate.split('|')[0].trim()
                            : (job.updatedAt ? new Date(job.updatedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '')}
                        </span>
                      )}
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
            {meta.icon}
          </div>
          <h3 className="mt-6 font-display text-xl font-bold text-slate-900">No updates yet</h3>
          <p className="mt-2 max-w-md text-sm text-slate-500">
            There are no updates in the {originalCatName} section right now. Please check back soon.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:shadow-xl hover:scale-[1.03]"
          >
            Browse Latest Jobs
          </Link>
        </div>
      )}
    </>
  );
}