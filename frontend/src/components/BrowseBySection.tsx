import Link from "next/link";

const QUALIFICATIONS = [
  { label: "10th Pass", q: "10th pass", hint: "Peon, MTS, Constable", accent: "from-amber-500 to-orange-500" },
  { label: "12th Pass", q: "12th pass", hint: "Clerk, CHSL, Police", accent: "from-blue-500 to-indigo-500" },
  { label: "Graduate", q: "Graduate", hint: "SSC CGL, Bank PO, UPSC", accent: "from-emerald-500 to-teal-500" },
  { label: "Post Graduate", q: "Post Graduate", hint: "Lecturer, Specialist", accent: "from-violet-500 to-purple-500" },
  { label: "Diploma", q: "Diploma", hint: "Junior Engineer, Tech", accent: "from-cyan-500 to-blue-500" },
  { label: "ITI", q: "ITI", hint: "Apprentice, Technician", accent: "from-rose-500 to-orange-500" },
  { label: "Engineering", q: "Engineering", hint: "AE, JE, PSU", accent: "from-slate-700 to-slate-900" },
  { label: "Medical", q: "Medical", hint: "Nursing, AIIMS, Doctor", accent: "from-pink-500 to-rose-500" },
];

const STATES = [
  { label: "Uttar Pradesh", q: "UP", short: "UP" },
  { label: "Bihar", q: "Bihar", short: "BR" },
  { label: "Rajasthan", q: "Rajasthan", short: "RJ" },
  { label: "Madhya Pradesh", q: "MP", short: "MP" },
  { label: "Delhi", q: "Delhi", short: "DL" },
  { label: "Maharashtra", q: "Maharashtra", short: "MH" },
  { label: "Haryana", q: "Haryana", short: "HR" },
  { label: "Punjab", q: "Punjab", short: "PB" },
  { label: "Gujarat", q: "Gujarat", short: "GJ" },
  { label: "West Bengal", q: "West Bengal", short: "WB" },
  { label: "Odisha", q: "Odisha", short: "OD" },
  { label: "Karnataka", q: "Karnataka", short: "KA" },
];

export default function BrowseBySection() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20 relative overflow-hidden border-t border-slate-200/60">
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-100 blur-3xl opacity-40" />
      <div className="pointer-events-none absolute top-1/2 -right-24 h-96 w-96 rounded-full bg-indigo-50 blur-3xl opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1 text-xs font-bold tracking-widest text-indigo-700">
            FIND WHAT FITS YOU
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Your qualification. Your state. <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Your next step.</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
            Don’t scroll endlessly. Start where you are — we’ll show you what you can actually apply for, right now.
          </p>
        </div>

        {/* Qualifications */}
        <div className="mt-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-slate-200 text-sm shadow-sm">🎓</span>
            <h3 className="font-display text-lg font-bold text-slate-900">Browse by Qualification</h3>
            <span className="hidden sm:block h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent ml-2" />
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-4">
            {QUALIFICATIONS.map((item) => (
              <Link
                key={item.label}
                href={`/search?q=${encodeURIComponent(item.q)}`}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60 hover:border-blue-200"
              >
                <span className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${item.accent} opacity-0 transition-opacity group-hover:opacity-100`} />
                <div className="flex items-center justify-between gap-2">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br ${item.accent} text-[10px] font-extrabold tracking-widest text-white shadow-sm`}>
                    {item.label.slice(0, 2).toUpperCase()}
                  </span>
                  <svg className="h-4 w-4 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                </div>
                <div className="mt-3 font-bold text-slate-900 text-sm leading-tight">{item.label}</div>
                <div className="mt-1 text-xs text-slate-500 leading-snug">{item.hint}</div>
              </Link>
            ))}
          </div>
        </div>

        {/* States */}
        <div className="mt-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white border border-slate-200 text-sm shadow-sm">📍</span>
            <h3 className="font-display text-lg font-bold text-slate-900">Browse by State</h3>
            <span className="hidden sm:block h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent ml-2" />
            <Link href="/search" className="hidden sm:inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700">
              See all states <span aria-hidden>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {STATES.map((s) => (
              <Link
                key={s.label}
                href={`/search?q=${encodeURIComponent(s.q)}`}
                className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 transition-all hover:-translate-y-0.5 hover:shadow-md hover:border-blue-200 hover:bg-blue-50/50"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white text-xs font-extrabold tracking-widest">
                  {s.short}
                </span>
                <span className="text-sm font-semibold text-slate-800 leading-tight group-hover:text-blue-700 line-clamp-1">
                  {s.label}
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-4 flex sm:hidden justify-center">
            <Link href="/search" className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700">
              See all states <span aria-hidden>→</span>
            </Link>
          </div>
        </div>

        {/* micro trust */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-500">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Updated hourly from official sources
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white border border-slate-200 px-3 py-1.5">🔍 Search “UP Police” or “Graduate” to filter instantly</span>
        </div>
      </div>
    </section>
  );
}
