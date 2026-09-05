import clientPromise from '@/lib/mongodb';
import Link from 'next/link';
import { unstable_cache } from 'next/cache';

const getUrgentJobs = unstable_cache(
  async () => {
    const client = await clientPromise;
    const db = client.db('govtJobScraperDB');
    const jobs = await db.collection('scraper')
      .find({ category: { $in: ['Latest Job', 'Admission'] } })
      .sort({ updatedAt: -1 })
      .limit(200)
      .project({ _id: 1, recordId: 1, title: 1, category: 1, importantDates: 1, updatedAt: 1, vacancyDetails: 1 })
      .toArray();
    return JSON.parse(JSON.stringify(jobs));
  },
  ['urgent-jobs-v2'],
  { revalidate: 60, tags: ['jobs'] }
);

const getNewUpdatesJobs = unstable_cache(
  async () => {
    const client = await clientPromise;
    const db = client.db('govtJobScraperDB');
    const jobs = await db.collection('scraper')
      .find({ category: { $in: ['Admit Card', 'Result', 'Important', 'Certificate', 'Outsourcing/Offline Job'] } })
      .sort({ updatedAt: -1 })
      .limit(100)
      .project({ _id: 1, recordId: 1, title: 1, category: 1, updatedAt: 1, lastOfficialUpdate: 1, vacancyDetails: 1 })
      .toArray();
    return JSON.parse(JSON.stringify(jobs));
  },
  ['new-updates-jobs-v2'],
  { revalidate: 60, tags: ['jobs'] }
);

interface JobData {
  _id: string;
  recordId: string;
  title: string;
  category: string;
  importantDates?: { raw_text: string }[];
  updatedAt: Date;
  lastOfficialUpdate?: string;
  vacancyDetails?: Record<string, string>[];
}

interface ParsedUrgentJob extends JobData {
  closingDate: Date | null;
  daysRemaining: number | null;
  vacancies: string;
  totalScore: number;
}

interface ParsedNewJob extends JobData {
  actualDateValue: number;
  vacancies: string;
  totalScore: number;
}

// Tier 1 National High-Impact Organizations & Keywords (+100 points)
const TIER1_KEYWORDS = [
  'UPSC', 'SSC', 'RRB', 'RAILWAY', 'BANK', 'IBPS', 'SBI', 'RBI',
  'DEFENSE', 'NDA', 'CDS', 'NAVY', 'AIR FORCE', 'ARMY', 'POLICE',
  'NTA', 'NEET', 'JEE', 'CUET', 'HIGH COURT', 'SUPREME COURT'
];

// Tier 2 Major State Organizations & Public Agencies (+60 points)
const TIER2_KEYWORDS = [
  'PSC', 'BPSC', 'UPPSC', 'MPPSC', 'RPSC', 'MPSC', 'KPSC', 'WBPSC', 'OPSC',
  'TNPSC', 'GPSC', 'HPPSC', 'UKPSC', 'JSSC', 'HSSC', 'DSSSB', 'TEACHER',
  'TET', 'POSTAL', 'POST OFFICE', 'ISRO', 'DRDO', 'BARC', 'LIC'
];

function calculateOrgScore(title: string, category: string): number {
  const upper = (title + ' ' + category).toUpperCase();
  for (const kw of TIER1_KEYWORDS) {
    if (upper.includes(kw)) return 100;
  }
  for (const kw of TIER2_KEYWORDS) {
    if (upper.includes(kw)) return 60;
  }
  return 15;
}

function calculateVacancyScore(vacanciesStr: string): number {
  const clean = vacanciesStr.replace(/,/g, '');
  const count = parseInt(clean, 10);
  if (isNaN(count)) return 0;
  if (count >= 5000) return 80;
  if (count >= 1000) return 50;
  if (count >= 100) return 25;
  return 10;
}

function calculateUrgencyScore(daysRemaining: number | null): number {
  if (daysRemaining === null || daysRemaining < 0) return 0;
  if (daysRemaining <= 3) return 120;
  if (daysRemaining <= 7) return 90;
  if (daysRemaining <= 15) return 60;
  if (daysRemaining <= 30) return 30;
  return 10;
}

function calculateFreshnessScore(actualDateValue: number, now: number): number {
  const diffHours = (now - actualDateValue) / (1000 * 60 * 60);
  if (diffHours <= 24) return 120;
  if (diffHours <= 48) return 90;
  if (diffHours <= 72) return 60;
  if (diffHours <= 168) return 30; // within 7 days
  return 10;
}

function calculateCategoryScore(category: string): number {
  if (category === 'Result') return 40;
  if (category === 'Admit Card') return 35;
  if (category === 'Important') return 30;
  if (category === 'Latest Job') return 25;
  return 10;
}

// Helper to parse dates like DD/MM/YYYY or DD-MM-YYYY
function extractFutureDates(text: string, now: number): Date[] {
  const dates: Date[] = [];
  const regex = /(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})/g;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10) - 1; // 0-indexed
    const year = parseInt(match[3], 10);

    if (month >= 0 && month <= 11 && day >= 1 && day <= 31 && year >= 2024) {
      const parsedDate = new Date(year, month, day);
      if (parsedDate.getTime() > now) {
        dates.push(parsedDate);
      }
    }
  }
  return dates;
}

function extractVacancies(title: string, vacancyDetails?: Record<string, string>[]): string {
  const titleMatch = title.match(/(\d+[,0-9]*)\s+(?:Vacancies|Vacancy|Post|Posts)/i);
  if (titleMatch) {
    return titleMatch[1];
  }
  if (vacancyDetails && vacancyDetails.length > 0) {
    for (const v of vacancyDetails) {
      if (v['Total Post']) {
        return v['Total Post'];
      }
    }
  }
  return 'Not Specified';
}

function pickTopUnique<T extends { _id: string; title: string }>(jobs: T[], count: number = 3): T[] {
  const result: T[] = [];
  const seenKeys = new Set<string>();

  for (const j of jobs) {
    const cleanKey = j.title.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 18);
    if (!seenKeys.has(cleanKey)) {
      seenKeys.add(cleanKey);
      result.push(j);
      if (result.length === count) break;
    }
  }

  // Fallback to fill up to `count` if deduplication dropped slots
  if (result.length < count) {
    for (const j of jobs) {
      if (!result.find(r => r._id === j._id)) {
        result.push(j);
        if (result.length === count) break;
      }
    }
  }

  return result;
}

export default async function ClosingSoonStrip() {
  const now = Date.now();

  // Fetch cached raw jobs
  const rawUrgentJobs = await getUrgentJobs();
  const rawNewJobs = await getNewUpdatesJobs();

  // 1. Process & Score Urgent Jobs ("Fill Before Gone")
  const parsedUrgentJobs: ParsedUrgentJob[] = [];
  for (const job of rawUrgentJobs) {
    let latestFutureDate: Date | null = null;
    let minDaysRemaining: number | null = null;

    if (job.importantDates && Array.isArray(job.importantDates)) {
      for (const dateObj of job.importantDates) {
        if (dateObj.raw_text) {
          const futureDates = extractFutureDates(dateObj.raw_text, now);
          for (const d of futureDates) {
            const daysRemaining = Math.ceil((d.getTime() - now) / (1000 * 60 * 60 * 24));
            if (minDaysRemaining === null || daysRemaining < minDaysRemaining) {
              minDaysRemaining = daysRemaining;
              latestFutureDate = d;
            }
          }
        }
      }
    }

    const vacancies = extractVacancies(job.title, job.vacancyDetails);
    const orgScore = calculateOrgScore(job.title, job.category);
    const vacancyScore = calculateVacancyScore(vacancies);
    const urgencyScore = calculateUrgencyScore(minDaysRemaining);

    // Give bonus points if job was updated recently
    const updatedDaysAgo = Math.max(0, (now - new Date(job.updatedAt).getTime()) / (1000 * 60 * 60 * 24));
    const recencyScore = Math.max(0, 50 - Math.floor(updatedDaysAgo * 5));

    const totalScore = orgScore + vacancyScore + urgencyScore + recencyScore;

    parsedUrgentJobs.push({
      _id: job._id.toString(),
      recordId: job.recordId,
      title: job.title,
      category: job.category,
      importantDates: job.importantDates,
      updatedAt: job.updatedAt,
      vacancyDetails: job.vacancyDetails,
      closingDate: latestFutureDate,
      daysRemaining: minDaysRemaining,
      vacancies,
      totalScore
    });
  }

  // Filter for valid active jobs (not past deadline) & sort by score
  const activeUrgentJobs = parsedUrgentJobs
    .filter(j => j.daysRemaining === null || j.daysRemaining >= 0)
    .sort((a: ParsedUrgentJob, b: ParsedUrgentJob) => b.totalScore - a.totalScore);

  const topUrgent = pickTopUnique(activeUrgentJobs, 3);

  // 2. Process & Score New Updates
  const parseOfficialDate = (dateStr?: string) => {
    if (!dateStr) return 0;
    const cleanStr = dateStr.split('|')[0].trim();
    const d = new Date(cleanStr);
    return isNaN(d.getTime()) ? 0 : d.getTime();
  };

  const parsedNewJobs: ParsedNewJob[] = rawNewJobs.map((job: any) => {
    const actualDateValue = parseOfficialDate(job.lastOfficialUpdate) || new Date(job.updatedAt).getTime();
    const vacancies = extractVacancies(job.title, job.vacancyDetails);
    const orgScore = calculateOrgScore(job.title, job.category);
    const catScore = calculateCategoryScore(job.category);
    const freshnessScore = calculateFreshnessScore(actualDateValue, now);

    const totalScore = orgScore + catScore + freshnessScore;

    return {
      _id: job._id.toString(),
      recordId: job.recordId,
      title: job.title,
      category: job.category,
      updatedAt: job.updatedAt,
      lastOfficialUpdate: job.lastOfficialUpdate,
      actualDateValue,
      vacancies,
      totalScore
    };
  }).sort((a: ParsedNewJob, b: ParsedNewJob) => b.totalScore - a.totalScore);

  const topNewUpdates = pickTopUnique(parsedNewJobs, 3);

  if (topUrgent.length === 0 && topNewUpdates.length === 0) return null;

  return (
    <div className="mx-auto mt-12 w-full max-w-sm sm:max-w-5xl animate-fade-up [animation-delay:500ms]">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        
        {/* Column 1: New Updates */}
        <div className="glass-dark rounded-2xl p-4 sm:p-5 border border-white/10 shadow-xl backdrop-blur-xl bg-slate-900/60">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-300 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-base shadow-inner">⚡</span>
              New Updates
            </h3>
            <Link href="/search" className="text-xs font-semibold text-blue-200 hover:text-white transition-colors flex items-center gap-1 group">
              <span>See all</span>
              <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </Link>
          </div>
          <div className="flex flex-col gap-2.5">
            {topNewUpdates.map((job) => {
              const displayDate = job.lastOfficialUpdate 
                ? job.lastOfficialUpdate.split('|')[0].trim() 
                : new Date(job.updatedAt).toLocaleDateString('en-GB');

              let badgeText = '⚡ New';
              let badgeStyle = 'text-emerald-300 bg-emerald-500/15 border-emerald-400/30';

              if (job.category === 'Result') {
                badgeText = '📊 Result Out';
                badgeStyle = 'text-emerald-300 bg-emerald-500/20 border-emerald-400/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]';
              } else if (job.category === 'Admit Card') {
                badgeText = '🎟️ Admit Card';
                badgeStyle = 'text-indigo-300 bg-indigo-500/20 border-indigo-400/40';
              }
                
              return (
                <Link
                  key={job._id}
                  href={`/${job.recordId}`}
                  className="group flex items-center justify-between rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/40 hover:bg-white/10 px-4 py-3 transition-all duration-200"
                >
                  <div className="flex flex-col overflow-hidden pr-3">
                    <span className="truncate text-sm font-bold text-white leading-snug group-hover:text-emerald-200 transition-colors">
                      {job.title}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                      <span className="font-medium text-slate-300">{job.category}</span>
                      <span className="text-white/20">•</span>
                      <span className="truncate text-slate-400">Updated: {displayDate}</span>
                    </span>
                  </div>
                  <span className={`shrink-0 flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-md border ${badgeStyle}`}>
                    {badgeText}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Column 2: Fill Before Gone */}
        <div className="glass-dark rounded-2xl p-4 sm:p-5 border border-white/10 shadow-xl backdrop-blur-xl bg-slate-900/60">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-orange-300 flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-orange-500/20 text-base shadow-inner">🔥</span>
              Fill Before Gone
            </h3>
            <Link href="/category/latest-job" className="text-xs font-semibold text-blue-200 hover:text-white transition-colors flex items-center gap-1 group">
              <span>See all</span>
              <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
            </Link>
          </div>
          <div className="flex flex-col gap-2.5">
            {topUrgent.map((job) => {
              const days = job.daysRemaining;
              let badgeText = '🌟 Open Now';
              let badgeStyle = 'text-cyan-300 bg-cyan-500/15 border-cyan-400/30';

              if (days !== null) {
                if (days <= 3) {
                  badgeText = `🔥 ${days}d Left`;
                  badgeStyle = 'text-rose-300 bg-rose-500/20 border-rose-400/40 animate-pulse shadow-[0_0_12px_rgba(244,63,94,0.3)]';
                } else if (days <= 7) {
                  badgeText = `⏳ ${days}d Left`;
                  badgeStyle = 'text-amber-300 bg-amber-500/20 border-amber-400/40 shadow-[0_0_10px_rgba(245,158,11,0.2)]';
                } else {
                  badgeText = `🗓️ ${days}d Left`;
                  badgeStyle = 'text-blue-300 bg-blue-500/20 border-blue-400/30';
                }
              }

              return (
                <Link
                  key={job._id}
                  href={`/${job.recordId}`}
                  className="group flex items-center justify-between rounded-xl bg-white/5 border border-white/5 hover:border-orange-500/40 hover:bg-white/10 px-4 py-3 transition-all duration-200"
                >
                  <div className="flex flex-col overflow-hidden pr-3">
                    <span className="truncate text-sm font-bold text-white leading-snug group-hover:text-orange-200 transition-colors">
                      {job.title}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                      <span className="font-semibold text-blue-300">{job.vacancies} Vacancies</span>
                      {job.closingDate && (
                        <>
                          <span className="text-white/20">•</span>
                          <span className="text-slate-400">Date: {job.closingDate.toLocaleDateString('en-GB')}</span>
                        </>
                      )}
                    </span>
                  </div>
                  <span className={`shrink-0 flex items-center gap-1 text-[10px] font-extrabold px-2.5 py-1 rounded-md border ${badgeStyle}`}>
                    {badgeText}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}
