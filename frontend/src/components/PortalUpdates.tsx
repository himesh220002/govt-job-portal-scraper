"use client";

import { useState } from 'react';
import Link from 'next/link';
import { CATEGORY_META, DEFAULT_CATEGORY_META } from '@/lib/categoryMeta';

type SortMode = 'recent' | 'az';

interface PortalJob {
  _id: string;
  recordId: string;
  title: string;
  category: string;
  updatedAt?: string;
  lastOfficialUpdate?: string;
}

const SORT_OPTIONS: { key: SortMode; label: string; icon: string }[] = [
  { key: 'recent', label: 'Latest', icon: '🕐' },
  { key: 'az', label: 'A - Z', icon: '🔤' },
];

export default function PortalUpdates({ categorizedJobs, categoryOrder }: { categorizedJobs: Record<string, PortalJob[]>, categoryOrder: string[] }) {
  const [sortMode, setSortMode] = useState<SortMode>('recent');

  const sortItems = (items: PortalJob[]) => {
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

      // Latest: year descending, then title A-Z
      const yearA = getFourDigits(a.recordId, a.title);
      const yearB = getFourDigits(b.recordId, b.title);

      if (yearA !== yearB) {
        return yearB - yearA;
      }
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
      if (dateA !== dateB) {
        return dateB - dateA;
      }
      return (a.title || "").toLowerCase().localeCompare((b.title || "").toLowerCase());
    });
  };

  const totalCount = Object.values(categorizedJobs).reduce((acc: number, items: PortalJob[]) => acc + (items?.length || 0), 0);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-xl text-white shadow-lg shadow-blue-600/25">
              🔄
            </span>
            <div>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-slate-900">Latest Portal Updates</h2>
              <p className="mt-1 text-slate-500">Browse through all recent Sarkari Results and Job Postings.</p>
            </div>
            <span className="hidden sm:block h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent ml-4" />
          </div>
        </div>

        {/* Segmented sort control */}
        <div className="inline-flex w-full items-center gap-1 rounded-2xl border border-slate-200 bg-white p-1.5 shadow-sm md:w-auto">
          <span className="hidden sm:inline px-3 text-sm font-semibold text-slate-500">Sort by</span>
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSortMode(opt.key)}
              className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                sortMode === opt.key
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-600/25'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-blue-700'
              }`}
            >
              <span className="text-xs">{opt.icon}</span>
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {totalCount === 0 ? (
        <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-4xl shadow-inner">🗂️</div>
          <h3 className="mt-6 font-display text-xl font-bold text-slate-900">No updates yet</h3>
          <p className="mt-2 max-w-md text-sm text-slate-500">The database is empty. Run the scraper to start collecting government job updates.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categoryOrder.map((catName) => {
            const items = categorizedJobs[catName] || [];
            const sortedItems = sortItems(items);
            const displayItems = sortedItems.slice(0, 20);
            const meta = CATEGORY_META[catName] || DEFAULT_CATEGORY_META;

            return (
              <div key={catName} className="group/card relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10">
                {/* Gradient header */}
                <div className={`relative overflow-hidden bg-gradient-to-r ${meta.header} px-5 py-4 text-white`}>
                  <div className="absolute inset-0 bg-grid-dark opacity-30" />
                  <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-white/10 blur-2xl" />
                  <div className="relative flex items-center justify-between gap-3">
                    <h3 className="flex items-center gap-2.5 font-display text-base font-extrabold tracking-wide uppercase">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm text-base">
                        {meta.icon}
                      </span>
                      {catName}
                    </h3>
                    <span className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-bold backdrop-blur-sm">
                      {items.length}
                    </span>
                  </div>
                </div>

                {/* List */}
                <ul className="flex-1 divide-y divide-slate-100">
                  {displayItems.length > 0 ? (
                    displayItems.map((job: PortalJob) => (
                      <li key={job._id} className="relative transition-colors hover:bg-blue-50/50">
                        <span className={`absolute inset-y-0 left-0 w-0.5 ${meta.bar} opacity-0 transition-opacity duration-200 group-hover/card:opacity-100`} />
                        <Link
                          href={`/${job.recordId}`}
                          className="group/item flex items-center justify-between gap-3 px-5 py-3.5"
                        >
                          <span className="line-clamp-2 pr-2 text-sm font-medium leading-snug text-slate-700 transition-colors group-hover/item:text-blue-700">
                            {job.title}
                          </span>
                          <svg className="h-4 w-4 shrink-0 text-slate-300 transition-all duration-200 group-hover/item:translate-x-0.5 group-hover/item:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </li>
                    ))
                  ) : (
                    <li className="px-5 py-10 text-center text-sm text-slate-400">No updates in this section.</li>
                  )}
                </ul>

                {/* View more */}
                <div className="mt-auto border-t border-slate-100 bg-slate-50/60 p-3 text-center">
                  <Link
                    href={`/category/${catName.toLowerCase().replace(/[\s/]+/g, '-')}`}
                    className="group/view inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-bold text-blue-700 shadow-sm transition-all hover:border-blue-300 hover:bg-blue-600 hover:text-white hover:shadow-md hover:shadow-blue-600/25"
                  >
                    View More {catName}
                    <svg className="h-3.5 w-3.5 transition-transform group-hover/view:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}