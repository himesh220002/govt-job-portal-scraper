import Link from 'next/link';
import { notFound } from 'next/navigation';
import clientPromise from '@/lib/mongodb';
import { categoryMeta } from '@/lib/categoryMeta';

export const revalidate = 60; // Revalidate every 60 seconds

import { unstable_cache } from 'next/cache';

const getJob = unstable_cache(
  async (slug: string) => {
    const client = await clientPromise;
    const db = client.db('govtJobScraperDB');
    const job = await db.collection('scraper').findOne({ recordId: slug });
    return job ? JSON.parse(JSON.stringify(job)) : null;
  },
  ['job-detail'],
  { revalidate: 60, tags: ['job'] }
);

// Clean up SarkariResult watermarks and promotional text
function cleanText(text: string) {
  if (!text) return "";
  let cleaned = text.replace(/Sarkari Result® Official : WWW\.SARKARIRESULT\.COM/gi, "");

  // Fix the specific "How to fill" sentence
  cleaned = cleaned.replace(/in Sarkari Result Recruitment Latest Job Section/gi, "on our portal");

  // Fix the footer promotional sentence completely
  cleaned = cleaned.replace(/For the latest updates on Sarkari Result, admit card, answer key, and result, always visit SarkariResult\.com, the official website for Sarkari Result in India \(Since 2012\)\.?/gi, "Stay tuned to our platform for the latest updates on admit cards, answer keys, and results.");

  // Catch-all for remaining Sarkari Result mentions
  cleaned = cleaned.replace(/SarkariResult\.com/gi, "our website");
  cleaned = cleaned.replace(/Sarkari Result/gi, "our platform");
  cleaned = cleaned.replace(/SarkariResult/gi, "our platform");

  return cleaned.trim();
}

interface RawItem {
  raw_text: string;
}

interface JobDetail {
  recordId: string;
  title: string;
  shortDescription?: string;
  category?: string;
  updatedAt?: string;
  lastOfficialUpdate?: string;
  importantDates?: { _raw?: RawItem[] };
  applicationFee?: { _raw?: RawItem[] };
  ageLimit?: { _raw?: RawItem[] };
  vacancyDetails?: Record<string, string>[];
  importantLinks?: Record<string, string>;
}

type InfoCardProps = {
  icon: string;
  title: string;
  gradient: string;
  chip: string;
  children: React.ReactNode;
};

function InfoCard({ icon, title, gradient, chip, children }: InfoCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-slate-900/10">
      <div className={`flex items-center gap-3 bg-gradient-to-r ${gradient} px-5 py-4 text-white`}>
        <span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-lg backdrop-blur-sm shadow-inner`}>
          {icon}
        </span>
        <h3 className="font-display text-base font-extrabold tracking-wide uppercase">{title}</h3>
      </div>
      <div className={`p-5 ${chip}`}>
        {children}
      </div>
    </div>
  );
}

function KeyValueRows({ pairs }: { pairs: { label: string; value: string }[] }) {
  return (
    <div className="space-y-0">
      {pairs.map((pair, i) => (
        <div key={i} className={`flex items-start justify-between gap-4 mb-2 rounded-lg hover:bg-slate-100 ${pair.label ? 'border-b border-slate-100 p-2 last:border-0' : ''}`}>
          {pair.label && (
            <span className="w-fit max-w-[300px] xl:shrink-0 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs sm:text-sm font-semibold text-slate-700">
              {pair.label}
            </span>
          )}
          <span className={` text-xs sm:text-sm p-1 ${pair.label ? 'w-full text-right font-medium text-slate-900' : 'text-left text-slate-600'}`}>
            {pair.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function linkIcon(finalLabel: string) {
  if (finalLabel.includes('PDF')) {
    return (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
    );
  }
  if (finalLabel.includes('VIDEO')) {
    return (
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"></polygon>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
      </svg>
    );
  }
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
      <polyline points="15 3 21 3 21 9"></polyline>
      <line x1="10" y1="14" x2="21" y2="3"></line>
    </svg>
  );
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const job = (await getJob(resolvedParams.slug)) as JobDetail | null;

  if (!job) {
    notFound();
  }

  const vacancyTables: Array<{ headers: string[], rows: Record<string, string>[] }> = [];
  if (job.vacancyDetails && job.vacancyDetails.length > 0) {
    job.vacancyDetails.forEach(row => {
      const headers = Object.keys(row);
      const headerKey = headers.join('|');

      let table = vacancyTables.find(t => t.headers.join('|') === headerKey);
      if (!table) {
        table = { headers, rows: [] };
        vacancyTables.push(table);
      }
      table.rows.push(row);
    });
  }

  const parsePairs = (rawText: string) => {
    let text = cleanText(rawText);
    // Fix broken dates split across lines with a slash, e.g., "18/12\n/2023"
    text = text.replace(/\n\s*\//g, "/");

    const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
    const result: { label: string, value: string }[] = [];

    // First pass: merge dangling colons and broken labels from 3-column table layouts
    const mergedLines: string[] = [];
    for (let i = 0; i < lines.length; i++) {
      if (lines[i] === ':') {
        if (mergedLines.length > 0 && i + 1 < lines.length) {
          const prev = mergedLines.pop();
          mergedLines.push(prev + ' : ' + lines[i + 1]);
          i++; // skip next line
        }
      } else if (lines[i].startsWith(':') || (lines[i].endsWith(':') && lines[i].length <= 5)) {
        if (mergedLines.length > 0 && !mergedLines[mergedLines.length - 1].includes(':')) {
          const prev = mergedLines.pop();
          mergedLines.push(prev + ' ' + lines[i]);
        } else {
          mergedLines.push(lines[i]);
        }
      } else {
        mergedLines.push(lines[i]);
      }
    }

    for (let i = 0; i < mergedLines.length; i++) {
      const line = mergedLines[i];
      const lower = line.toLowerCase();
      if (lower === 'important dates' || lower === 'application fee' || lower === 'age limit' || lower.includes('age relaxation')) continue;

      if (line.endsWith(':')) {
        const label = line;
        let value = '';
        if (i + 1 < mergedLines.length) {
          const nextLine = mergedLines[i + 1];
          // If the next line is clearly another label (ends with ':' or contains ' : '), don't consume it as a value
          if (!nextLine.endsWith(':') && !nextLine.includes(' : ')) {
            value = nextLine;
            i++;
          }
        }
        result.push({ label, value });
      } else if (line.includes(':')) {
        const [l, ...v] = line.split(':');
        result.push({ label: l.trim() + ' :', value: v.join(':').trim() });
      } else {
        result.push({ label: '', value: line });
      }
    }
    return result;
  };

  const meta = categoryMeta(job.category);

  const importantDates = job.importantDates?._raw ?? [];
  const applicationFees = job.applicationFee?._raw ?? [];
  const ageLimits = job.ageLimit?._raw ?? [];

  const importantLinks = job.importantLinks ?? {};

  const hasInfoCards = importantDates.length > 0 || applicationFees.length > 0 || ageLimits.length > 0;
  const hasLinks = Object.keys(importantLinks).length > 0;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Compact dark header */}
      <section className="relative overflow-hidden bg-[#050914] text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050914] via-[#0a1a3f] to-[#10255c]" />
        <div className="bg-grid-dark absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-20 left-1/4 h-64 w-64 rounded-full bg-blue-600/30 blur-[100px] animate-blob" />
        <div className="absolute top-0 right-1/5 h-56 w-56 rounded-full bg-cyan-400/20 blur-[100px] animate-blob [animation-delay:2s]" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-14">
          <div className="mt-6 p-4">
            {job.category && (
              <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${meta.badge}`}>
                {job.category}
              </span>
            )}
            <h1 className="mt-4 font-display text-2xl font-extrabold leading-snug tracking-tight text-white sm:text-3xl">
              {cleanText(job.title)}
            </h1>
            {job.shortDescription && (
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-blue-100/85 sm:text-base">
                {cleanText(job.shortDescription)}
              </p>
            )}
            {job.lastOfficialUpdate && (
              <div className="mt-4 flex flex-col gap-1">
                <p className="inline-flex items-center gap-2 text-xs font-medium text-emerald-300">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  Last Update: {job.lastOfficialUpdate}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 leading-none">
          <svg className="block h-8 w-full sm:h-12" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,30 C360,58 1080,6 1440,34 L1440,60 L0,60 Z" fill="#eef2ff" opacity="0.6" />
            <path d="M0,40 C360,60 1080,20 1440,44 L1440,60 L0,60 Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-10">
        {/* Info cards */}
        {hasInfoCards && (
          <div className="mb-8 grid grid-cols-1 gap-5 grid-cols-1">
            {importantDates.length > 0 && (
              <InfoCard icon="📅" title="Important Dates" gradient="from-blue-600 to-indigo-600" chip="bg-white">
                <div className="space-y-3">
                  {importantDates.map((item: RawItem, idx: number) => (
                    <KeyValueRows key={idx} pairs={parsePairs(item.raw_text)} />
                  ))}
                </div>
              </InfoCard>
            )}

            {applicationFees.length > 0 && (
              <InfoCard icon="💳" title="Application Fee" gradient="from-emerald-600 to-teal-600" chip="bg-white">
                <div className="space-y-3">
                  {applicationFees.map((item: RawItem, idx: number) => (
                    <KeyValueRows key={idx} pairs={parsePairs(item.raw_text)} />
                  ))}
                </div>
              </InfoCard>
            )}

            {ageLimits.length > 0 && (
              <InfoCard icon="⏳" title="Age Limit" gradient="from-amber-500 to-orange-600" chip="bg-white">
                <div className="space-y-3">
                  {ageLimits.map((item: RawItem, idx: number) => (
                    <KeyValueRows key={idx} pairs={parsePairs(item.raw_text)} />
                  ))}
                </div>
              </InfoCard>
            )}
          </div>
        )}

        {/* Vacancy Details Table */}
        {vacancyTables.length > 0 && (
          <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 bg-gradient-to-r from-slate-800 to-slate-900 px-5 py-4 text-white">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-lg backdrop-blur-sm">📋</span>
              <h3 className="font-display text-base font-extrabold tracking-wide uppercase">Vacancy Details</h3>
            </div>

            <div className="divide-y divide-slate-200">
              {vacancyTables.map((table, tableIdx) => (
                <div key={tableIdx} className="w-full overflow-x-auto">
                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-900">
                        {table.headers.map((header) => (
                          <th key={header} className="whitespace-nowrap px-4 py-3 text-sm font-bold uppercase tracking-wide border-r border-slate-200 last:border-r-0">{header}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {table.rows.map((row, idx) => (
                        <tr key={idx} className="border-b border-slate-100 last:border-b-0 transition-colors hover:bg-blue-50/40">
                          {table.headers.map((header) => (
                            <td key={header} className="px-4 py-3 text-sm text-slate-600 border-r border-slate-100 last:border-r-0">{cleanText(row[header])}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Important Links */}
        {hasLinks && (
          <div className="mb-4">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/25">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
              </span>
              <h3 className="font-display text-xl font-extrabold tracking-tight text-slate-900">Important Links</h3>
              <span className="hidden sm:block h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent" />
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {Object.entries(importantLinks).map(([key, url]) => {
                const isGovUrl = url.includes('gov.in') || url.includes('nic.in');
                const urlLower = url.toLowerCase();
                const rawLabel = key.replace(/_/g, ' ').toUpperCase();

                // Remove spam links completely (from label or url)
                if (
                  urlLower.includes('sarkariresult') ||
                  rawLabel.includes('SARKARI RESULT') ||
                  rawLabel.includes('TELEGRAM') ||
                  rawLabel.includes('WHATSAPP') ||
                  rawLabel.includes('ANDROID APP') ||
                  rawLabel.includes('APPLE IOS')
                ) {
                  return null;
                }

                let finalLabel = rawLabel;
                if (url.toLowerCase().endsWith('.pdf') || rawLabel.includes('NOTIFICATION') || rawLabel.includes('BROCHURE')) {
                  finalLabel = 'DOWNLOAD PDF';
                } else if (rawLabel.includes('VIDEO')) {
                  finalLabel = 'WATCH VIDEO';
                } else if (rawLabel.includes('OFFICIAL WEBSITE') || isGovUrl) {
                  finalLabel = 'OFFICIAL WEBSITE';
                } else if (rawLabel === 'CLICK HERE') {
                  finalLabel = 'OPEN LINK';
                }

                const displayUrl = url.length > 42 ? url.substring(0, 42) + '...' : url;

                return (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={url}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-600/10"
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 transition-colors group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white">
                        {linkIcon(finalLabel)}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-bold text-slate-900 transition-colors group-hover:text-blue-700">
                          {finalLabel}
                        </span>
                        <span className="block truncate text-xs text-slate-400">{displayUrl}</span>
                      </span>
                    </span>
                    <svg className="h-4 w-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}