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
      .limit(150)
      .project({ _id: 1, recordId: 1, title: 1, category: 1, importantDates: 1, updatedAt: 1, vacancyDetails: 1 })
      .toArray();
    return JSON.parse(JSON.stringify(jobs));
  },
  ['urgent-jobs'],
  { revalidate: 60, tags: ['jobs'] }
);

const getNewUpdatesJobs = unstable_cache(
  async () => {
    const client = await clientPromise;
    const db = client.db('govtJobScraperDB');
    const jobs = await db.collection('scraper')
      .find({ category: { $in: ['Admit Card', 'Result', 'Important', 'Certificate', 'Outsourcing/Offline Job'] } })
      .sort({ updatedAt: -1 })
      .limit(10)
      .project({ _id: 1, recordId: 1, title: 1, category: 1, updatedAt: 1, vacancyDetails: 1 })
      .toArray();
    return JSON.parse(JSON.stringify(jobs));
  },
  ['new-updates-jobs'],
  { revalidate: 60, tags: ['jobs'] }
);

interface JobData {
  _id: string;
  recordId: string;
  title: string;
  category: string;
  importantDates?: { raw_text: string }[];
  updatedAt: Date;
  vacancyDetails?: Record<string, string>[];
}

interface ParsedJob extends JobData {
  closingDate: Date | null;
  daysRemaining: number | null;
  vacancies: string;
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

    // basic sanity check on dates
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

export default async function ClosingSoonStrip() {
  const now = Date.now();

  // Fetch jobs using Next.js cache
  const rawUrgentJobs = await getUrgentJobs();
  const rawNewJobs = await getNewUpdatesJobs();

  const parsedUrgentJobs: ParsedJob[] = [];
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
      vacancies
    });
  }

  const openJobs = parsedUrgentJobs.filter(j => j.daysRemaining !== null && j.daysRemaining >= 0);
  const sortedByUrgency = [...openJobs].sort((a, b) => (a.daysRemaining || 999) - (b.daysRemaining || 999));
  
  let topUrgent = sortedByUrgency.slice(0, 3);
  
  if (topUrgent.length < 3) {
    const fallbackJobs = parsedUrgentJobs
      .filter(j => !topUrgent.find(u => u._id === j._id))
      .slice(0, 3 - topUrgent.length);
    topUrgent = [...topUrgent, ...fallbackJobs];
  }

  const topRecent = rawNewJobs.map((job: any) => ({
    _id: job._id.toString(),
    recordId: job.recordId,
    title: job.title,
    category: job.category,
    updatedAt: job.updatedAt,
    vacancies: extractVacancies(job.title, job.vacancyDetails),
    closingDate: null,
    daysRemaining: null
  })).slice(0, 3);

  if (topUrgent.length === 0 && topRecent.length === 0) return null;

  return (
    <div className="mx-auto mt-12 w-full max-w-sm sm:max-w-5xl animate-fade-up [animation-delay:500ms]">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        
        {/* Column 1: New Updates */}
        <div className="glass-dark rounded-2xl p-4 sm:p-5 border border-white/10 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-300 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">🔔</span>
              New Updates
            </h3>
            <Link href="/search" className="text-xs font-semibold text-blue-200 hover:text-white transition-colors">
              See all &rarr;
            </Link>
          </div>
          <div className="flex flex-col gap-2.5">
            {topRecent.map((job: any) => (
              <Link
                key={job._id}
                href={`/${job.recordId}`}
                className="group flex items-center justify-between rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/30 hover:bg-white/10 px-4 py-2.5 transition-all"
              >
                <div className="flex flex-col overflow-hidden pr-3">
                  <span className="truncate text-sm font-bold text-white leading-snug group-hover:text-emerald-200 transition-colors">{job.title}</span>
                  <span className="text-[11px] text-slate-400 mt-0.5 flex gap-2">
                    <span>{job.category}</span>
                    <span className="text-white/20">|</span>
                    <span>Updated: {new Date(job.updatedAt).toLocaleDateString('en-GB')}</span>
                  </span>
                </div>
                <span className="shrink-0 flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">
                  New
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Column 2: Fill Before Gone */}
        <div className="glass-dark rounded-2xl p-4 sm:p-5 border border-white/10 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-orange-300 flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-orange-500/20">⏳</span>
              Fill Before Gone
            </h3>
            <Link href="/category/latest-job" className="text-xs font-semibold text-blue-200 hover:text-white transition-colors">
              See all &rarr;
            </Link>
          </div>
          <div className="flex flex-col gap-2.5">
            {topUrgent.map((job: any) => {
              const hasDate = job.daysRemaining !== null;
              const badgeClass = hasDate 
                ? 'text-orange-400 bg-orange-400/10 border-orange-400/20' 
                : 'text-blue-400 bg-blue-400/10 border-blue-400/20';
              const badgeText = hasDate ? `${job.daysRemaining}d Left` : 'Coming Soon';

              return (
                <Link
                  key={job._id}
                  href={`/${job.recordId}`}
                  className="group flex items-center justify-between rounded-xl bg-white/5 border border-white/5 hover:border-orange-500/30 hover:bg-white/10 px-4 py-2.5 transition-all"
                >
                  <div className="flex flex-col overflow-hidden pr-3">
                    <span className={`truncate text-sm font-bold text-white leading-snug transition-colors ${hasDate ? 'group-hover:text-orange-200' : 'group-hover:text-blue-200'}`}>{job.title}</span>
                    <span className="text-[11px] text-slate-400 mt-0.5 flex gap-2">
                      <span>{job.vacancies} Vacancies</span>
                      {job.closingDate && (
                        <>
                          <span className="text-white/20">|</span>
                          <span>Date: {job.closingDate.toLocaleDateString('en-GB')}</span>
                        </>
                      )}
                    </span>
                  </div>
                  <span className={`shrink-0 flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded border ${badgeClass}`}>
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
