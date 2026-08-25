import Link from 'next/link';
import { Suspense } from 'react';
import SearchBar from './SearchBar';
import ClosingSoonStrip from './ClosingSoonStrip';
import clientPromise from '@/lib/mongodb';

const topExams = [
  { title: "UPSC Civil Services", fact: "Prelims, Mains 2026", link: "/search?q=UPSC", keywords: ["UPSC"] },
  { title: "SSC CGL 2026", fact: "Tier I June–July 2026", link: "/search?q=SSC", keywords: ["SSC CGL"] },
  { title: "SBI PO 2026", fact: "Prelims Aug 22–23, 2026", link: "/search?q=SBI", keywords: ["SBI PO"] },
  { title: "RRB NTPC 2026", fact: "CBT May–June 2026", link: "/search?q=RRB", keywords: ["RRB NTPC"] },
  { title: "NDA I & II 2026", fact: "April 12 & Sept 13, 2026", link: "/search?q=NDA", keywords: ["NDA"] },
];

const topJobs = [
  { title: "Railway Recruitment", fact: "Latest RRB Job Openings", link: "/search?q=Railway", keywords: ["Railway", "RRB"] },
  { title: "SSC Combined Exams", fact: "CGL, CHSL & MTS Posts", link: "/search?q=SSC", keywords: ["SSC"] },
  { title: "Banking Sector Jobs", fact: "PO, Clerk & SO Openings", link: "/search?q=Bank", keywords: ["Bank", "SBI", "IBPS"] },
];

const topAdmissions = [
  { title: "IIT Admissions", fact: "JEE Advanced Updates", link: "/search?q=IIT", keywords: ["IIT", "JEE"] },
  { title: "IIM Admissions", fact: "CAT & Management", link: "/search?q=IIM", keywords: ["IIM", "CAT"] },
  { title: "Medical (AIIMS/NEET)", fact: "MBBS & BDS Counseling", link: "/search?q=Medical", keywords: ["AIIMS", "NEET", "Medical"] },
];

const latestAnswerKeys = [
  { title: "UGC NET Answer Key", fact: "Latest NTA UGC NET Updates", link: "/search?q=UGC+NET+Answer+Key", cta: "Download Key", keywords: ["UGC NET", "Answer Key"] },
  { title: "SSC / Railway Keys", fact: "Latest Official Keys", link: "/search?q=SSC+Railway", cta: "Download Key", keywords: ["SSC", "Railway", "Answer Key"] },
];

const topSyllabus = [
  { title: "UPSC CSE Syllabus", fact: "Prelims & Mains (9 papers)", link: "https://insightsonindia.com/wp-content/uploads/2013/07/upsc-syllabus.pdf", cta: "View Syllabus", keywords: ["UPSC", "Syllabus"] },
  { title: "SSC CGL Syllabus", fact: "Tier I & II (Reasoning, GK, Quant)", link: "https://www.practicemock.com/blog/ssc-cgl-syllabus/", cta: "View Syllabus", keywords: ["SSC CGL", "Syllabus"] },
  { title: "RRB NTPC Syllabus", fact: "CBT 1 & 2 (Maths, Reasoning)", link: "https://www.sreedharscce.com/blogs/rrb-ntpc-syllabus/", cta: "View Syllabus", keywords: ["RRB NTPC", "Syllabus"] },
];

const popularSearches = ["SSC", "UPSC", "Railway", "Bank", "NDA", "TET"];

const SectionHeading = ({ icon, chip, title, subtitle }: { icon: React.ReactNode; chip: string; title: string; subtitle?: string }) => (
  <div className="mb-4 sm:mb-8 flex items-center justify-center sm:justify-start gap-4">
    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${chip} text-xl shadow-md`}>
      {icon}
    </span>
    <div>
      <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900">{title}</h2>
      {subtitle && <p className="mt-1 text-xs sm:text-base text-slate-500">{subtitle}</p>}
    </div>
    <div className="hidden sm:block sm:flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent ml-4" />
  </div>
);

const Card = ({
  title,
  fact,
  link,
  cta = "View Details",
  variant = "default",
  isNew = false,
}: {
  title: string;
  fact: string;
  link: string;
  cta?: string;
  variant?: "default" | "highlight";
  isNew?: boolean;
}) => {
  const styles = {
    default: isNew
      ? "border-emerald-300 ring-1 ring-emerald-200 bg-emerald-50/20 shadow-emerald-100/50"
      : "border-slate-200/80",
    highlight: isNew
      ? "border-emerald-300 ring-1 ring-emerald-200 bg-gradient-to-br from-white to-emerald-50/60 shadow-emerald-100/50"
      : "border-blue-100/80 bg-gradient-to-br from-white to-blue-50/60",
  };

  return (
    <Link
      href={link}
      className={`group card-hover relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border bg-white p-3 sm:p-4 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 ${styles[variant as keyof typeof styles]}`}
    >
      {isNew && (
        <span className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700 uppercase tracking-wide border border-emerald-200 shadow-sm z-10">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
          </span>
          New Update
        </span>
      )}

      <span className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-400/10 blur-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100" />

      <div className="relative">
        <h3 className={`mb-2 font-display text-base sm:text-lg font-bold leading-snug transition-colors line-clamp-2 ${isNew ? 'pr-20 text-emerald-900 group-hover:text-emerald-700' : 'text-slate-900 group-hover:text-blue-700'}`}>
          {title}
        </h3>
        <p className="hidden md:block mb-4 text-xs sm:text-sm text-slate-500">{fact}</p>
      </div>

      <span className={`relative inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold ${isNew ? 'text-emerald-600' : 'text-blue-600'}`}>
        {cta}
        <svg className="h-3 w-3 sm:h-4 sm:w-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </span>
    </Link>
  );
};

export default async function HeroSection() {
  const client = await clientPromise;
  const db = client.db('govtJobScraperDB');

  // Look for jobs updated in the last 3 days
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

  const recentJobs = await db.collection('scraper')
    .find({ updatedAt: { $gte: threeDaysAgo } })
    .project({ title: 1 })
    .limit(100)
    .toArray();

  const recentTitles = recentJobs.map(j => (j.title || '').toLowerCase());

  const checkIsNew = (keywords?: string[]) => {
    if (!keywords) return false;
    return keywords.some(kw => {
      const lowerKw = kw.toLowerCase();
      return recentTitles.some(title => title.includes(lowerKw));
    });
  };

  return (
    <>
      {/* ---------- Premium Hero ---------- */}
      <section className="relative overflow-hidden bg-[#050914] text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050914] via-[#0a1a3f] to-[#10255c]" />
        <div className="bg-grid-dark absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_75%_60%_at_50%_0%,black,transparent)]" />

        {/* Glow blobs */}
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-600/30 blur-[120px] animate-blob" />
        <div className="absolute top-10 right-[-80px] h-80 w-80 rounded-full bg-cyan-400/20 blur-[110px] animate-blob [animation-delay:2s]" />
        <div className="absolute bottom-[-100px] left-1/3 h-72 w-72 rounded-full bg-indigo-500/25 blur-[110px] animate-blob [animation-delay:4s]" />
        <div className="absolute left-1/4 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[130px] animate-blob [animation-delay:6s]" />

        {/* Floating orbs */}
        <div className="absolute top-24 left-[12%] hidden lg:block h-2.5 w-2.5 rounded-full bg-cyan-300/70 shadow-[0_0_20px_rgba(34,211,238,0.8)] animate-float" />
        <div className="absolute top-40 right-[16%] hidden lg:block h-2 w-2 rounded-full bg-indigo-300/70 shadow-[0_0_16px_rgba(165,180,252,0.8)] animate-float-slow" />
        <div className="absolute bottom-24 right-[28%] hidden lg:block h-3 w-3 rounded-full bg-blue-300/60 shadow-[0_0_20px_rgba(147,197,253,0.8)] animate-float" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pb-28 pt-16 sm:pt-24 sm:pb-36 text-center">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-cyan-200 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>
              India&apos;s Trusted Sarkari Job Portal
            </span>
          </div>

          <h1 className="block sm:hidden mx-auto mt-6 max-w-4xl font-display text-3xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl animate-fade-up [animation-delay:100ms]">
            Your Gateway to <span className="shimmer-text">Government Jobs</span>
          </h1>
          <h1 className="hidden sm:block mx-auto mt-6 max-w-4xl font-display text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl animate-fade-up [animation-delay:100ms]">
            Your Gateway to <span className="shimmer-text">Government Jobs</span>, Results &amp; Admit Cards
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-xs sm:text-lg leading-relaxed text-blue-100/90 animate-fade-up [animation-delay:200ms]">
            Get the latest Sarkari results, job notifications, admit cards, answer keys and syllabi — all in one place, updated daily from verified official sources.
          </p>

          <div className="mx-auto mt-9 max-w-2xl animate-fade-up [animation-delay:300ms]">
            <SearchBar />
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
              {popularSearches.map((term) => (
                <Link
                  key={term}
                  href={`/search?q=${encodeURIComponent(term)}`}
                  className="rounded-full border border-white/15 bg-white/5 px-2 sm:px-3.5 py-1 sm:py-1.5 text-xs font-semibold text-blue-100 backdrop-blur-sm transition-all hover:border-cyan-300/50 hover:bg-cyan-400/10 hover:text-cyan-200 hover:scale-105"
                >
                  {term}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick actions */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3 animate-fade-up [animation-delay:400ms]">
            <Link
              href="/category/latest-job"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-4 py-2 md:px-7 md:py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-600/30 transition-all hover:shadow-2xl hover:shadow-cyan-500/30 hover:scale-[1.03] active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                Browse Latest Jobs
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/30 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </Link>
            <Link
              href="/category/result"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 md:px-7 md:py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-cyan-300/40 hover:scale-[1.03] active:scale-95"
            >
              View Results
            </Link>
          </div>

          {/* Feature strip replaced with dynamic Closing Soon Strip */}
          <Suspense fallback={
            <div className="mx-auto mt-12 w-full max-w-sm sm:max-w-5xl">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                {/* Column 1 Skeleton */}
                <div className="glass-dark rounded-2xl p-4 sm:p-5 border border-white/5 shadow-lg">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-white/10 animate-pulse" />
                      <div className="h-4 w-28 rounded bg-white/10 animate-pulse" />
                    </div>
                    <div className="h-3 w-12 rounded bg-white/10 animate-pulse" />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center justify-between rounded-xl bg-white/5 border border-white/5 px-4 py-2.5">
                        <div className="flex flex-col gap-2 w-2/3">
                          <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
                          <div className="h-2.5 w-1/2 rounded bg-white/10 animate-pulse" />
                        </div>
                        <div className="h-5 w-10 rounded bg-white/10 animate-pulse shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Column 2 Skeleton */}
                <div className="glass-dark rounded-2xl p-4 sm:p-5 border border-white/5 shadow-lg">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-white/10 animate-pulse" />
                      <div className="h-4 w-32 rounded bg-white/10 animate-pulse" />
                    </div>
                    <div className="h-3 w-12 rounded bg-white/10 animate-pulse" />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center justify-between rounded-xl bg-white/5 border border-white/5 px-4 py-2.5">
                        <div className="flex flex-col gap-2 w-2/3">
                          <div className="h-4 w-full rounded bg-white/10 animate-pulse" />
                          <div className="h-2.5 w-1/2 rounded bg-white/10 animate-pulse" />
                        </div>
                        <div className="h-5 w-14 rounded bg-white/10 animate-pulse shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          }>
            <ClosingSoonStrip />
          </Suspense>
        </div>

        {/* Layered wave divider into the page background */}
        <div className="absolute inset-x-0 -bottom-[2px] z-20 leading-none">
          <svg
            className="block h-[70px] w-full sm:h-[110px]"
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M0,64 C240,120 480,8 720,40 C960,72 1200,120 1440,56 L1440,120 L0,120 Z"
              fill="#eef2ff"
              opacity="0.6"
            />
            <path
              d="M0,80 C280,24 560,112 840,72 C1080,40 1260,80 1440,96 L1440,120 L0,120 Z"
              fill="#f8fafc"
            />
          </svg>
        </div>
      </section>

      {/* ---------- Featured sections ---------- */}
      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-20">
          {/* Top 5 Exams */}
          <div className="mb-8 sm:mb-14">
            <SectionHeading
              icon={<span className="text-xl">🎓</span>}
              chip="bg-blue-100 text-blue-800"
              title="Top 5 Government Exams"
              subtitle="India · 2026 · Prelims, Mains & result dates"
            />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {topExams.map((item, i) => <Card key={i} {...item} variant="highlight" isNew={checkIsNew(item.keywords)} />)}
            </div>
          </div>

          {/* Jobs + Admissions */}
          <div className="mb-8 sm:mb-14 grid grid-cols-1 gap-12 xl:grid-cols-2">
            <div>
              <SectionHeading
                icon={<span className="text-xl">💼</span>}
                chip="bg-indigo-100 text-indigo-800"
                title="Top Government Jobs"
                subtitle="Openings across Railways, SSC & Banks"
              />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {topJobs.map((item, i) => <Card key={i} {...item} isNew={checkIsNew(item.keywords)} />)}
              </div>
            </div>
            <div>
              <SectionHeading
                icon={<span className="text-xl">🏫</span>}
                chip="bg-emerald-100 text-emerald-800"
                title="Top Admissions"
                subtitle="IIT, IIM, NEET & AIIMS counselling"
              />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {topAdmissions.map((item, i) => <Card key={i} {...item} isNew={checkIsNew(item.keywords)} />)}
              </div>
            </div>
          </div>

          {/* Answer Keys + Syllabus */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <SectionHeading
                icon={<span className="text-xl">📑</span>}
                chip="bg-rose-100 text-rose-800"
                title="Latest Answer Keys"
                subtitle="NTA, SSC & Railway official keys"
              />
              <div className="grid gap-4 grid-cols-2">
                {latestAnswerKeys.map((item, i) => <Card key={i} {...item} isNew={checkIsNew(item.keywords)} />)}
              </div>
            </div>
            <div className="lg:col-span-3">
              <SectionHeading
                icon={<span className="text-xl">📘</span>}
                chip="bg-amber-100 text-amber-800"
                title="Top Exam Syllabus"
                subtitle="UPSC, SSC CGL & RRB NTPC"
              />
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                {topSyllabus.map((item, i) => <Card key={i} {...item} isNew={checkIsNew(item.keywords)} />)}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}