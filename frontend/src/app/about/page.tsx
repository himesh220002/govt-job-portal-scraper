import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | SarkarLink",
  description:
    "SarkarLink brings the right Sarkari Naukri to the right person at the right moment — one fast, honest search across 100+ official sources. Learn why we exist and what we promise every aspirant and family.",
};

export default function AboutPage() {
  return (
    <div className="bg-slate-50">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden bg-[#070b1d] text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#070b1d] via-[#0c1d4a] to-[#1a3391]" />
        <div className="bg-grid-dark absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_75%_55%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-24 -left-24 h-[520px] w-[520px] rounded-full bg-blue-600/25 blur-[130px] animate-blob" />
        <div className="absolute -bottom-32 -right-24 h-[520px] w-[520px] rounded-full bg-cyan-400/20 blur-[130px] animate-blob [animation-delay:2s]" />
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/15 blur-[120px] animate-blob [animation-delay:4s]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pb-16 pt-14 sm:pb-20 sm:pt-20">
          <div className="mx-auto max-w-3xl text-center">
            <div className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-wide text-cyan-100 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>
              BUILT FOR BHARAT • ALWAYS FREE, ALWAYS DIRECT
            </div>

            <h1 className="animate-fade-up [animation-delay:100ms] mt-6 font-display text-[32px] font-extrabold leading-[0.95] tracking-tight sm:text-5xl lg:text-[56px]">
              Your next opportunity
              <span className="block mt-1 shimmer-text">shouldn&apos;t find you late.</span>
            </h1>

            <p className="animate-fade-up [animation-delay:200ms] mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-blue-100/85 sm:text-lg">
              We exist for a simple reason — so the <span className="font-semibold text-white">right opportunity reaches the right person</span> before the window closes.
              In time to apply. In time to prepare. In time to move forward — together.
            </p>

            <div className="animate-fade-up [animation-delay:300ms] mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/category/latest-job"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-xl shadow-blue-600/30 transition-all hover:shadow-2xl hover:shadow-cyan-500/30 hover:scale-[1.02] active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Explore Latest Jobs
                  <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                </span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/25 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              </Link>
              <a
                href="#promise"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-cyan-300/40"
              >
                Our promise
                <span className="text-cyan-200">↓</span>
              </a>
            </div>

            {/* Trust row */}
            <div className="animate-fade-up [animation-delay:400ms] mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-semibold">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-blue-100 backdrop-blur">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-400/20 text-amber-200">⚡</span> Updates within minutes
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-blue-100 backdrop-blur">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-cyan-400/20 text-cyan-200">🔗</span> 100+ official portals, one search
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-blue-100 backdrop-blur">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/20 text-emerald-200">︎</span> Made for the phone in your hand
              </span>
            </div>
          </div>
        </div>

        {/* wave */}
        <div className="absolute inset-x-0 -bottom-[1px] leading-none">
          <svg className="block h-[44px] w-full sm:h-[72px]" viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,32 C240,80 480,0 720,24 C960,48 1200,80 1440,32 L1440,80 L0,80 Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* ============ The Why — before / after ============ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold tracking-widest text-blue-700">
            WHY WE EXIST
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Finding a Sarkari Naukri shouldn&apos;t feel like a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">government exam</span> itself.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-slate-600 sm:text-base">
            Millions of aspirants lose hours every week hopping between slow, confusing official sites — hunting for a single PDF, a last date, an admit card link.
            When a notification arrives late, it isn&apos;t just a missed date. For a family, it can be a missed future. <span className="font-semibold text-slate-900">We decided to change that — with you, for you.</span>
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Old way */}
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-slate-100 blur-2xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">
                <span className="h-2 w-2 rounded-full bg-rose-400" /> The old way
              </div>
              <h3 className="mt-4 font-display text-xl font-bold text-slate-900">Scattered. Slow. Easy to miss.</h3>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-slate-600">
                <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" /> Dozens of portals — UPSC, SSC, Railway, State boards — each built differently, each slow on result day.</li>
                <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" /> PDFs buried 4 clicks deep. Last dates tucked into footnotes.</li>
                <li className="flex gap-3"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" /> Rumour channels. Forwarded screenshots. No single place you can trust.</li>
              </ul>
              <p className="mt-6 rounded-2xl bg-slate-50 px-4 py-3 text-xs font-medium text-slate-500 border border-slate-100">
                So often, talent doesn&apos;t lose because of ability — it loses because the information didn&apos;t reach in time.
              </p>
            </div>
          </div>

          {/* SarkarLink way */}
          <div className="relative overflow-hidden rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-600 to-indigo-600 p-6 sm:p-8 text-white shadow-xl shadow-blue-600/20">
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-cyan-300/20 blur-2xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold text-blue-700">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> The SarkarLink way
              </div>
              <h3 className="mt-4 font-display text-xl font-bold">Clear. Quick. Closer to you.</h3>
              <ul className="mt-5 space-y-3 text-sm leading-relaxed text-blue-50">
                <li className="flex gap-3"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs">✓</span> One calm, fast search across every official source — organized and easy to read on any phone.</li>
                <li className="flex gap-3"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs">✓</span> What&apos;s new and what&apos;s closing soon rises to the top, so the urgent never gets buried.</li>
                <li className="flex gap-3"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs">✓</span> We take you straight to the official page to apply — no detours, no paywall, no tricks.</li>
              </ul>
              <p className="mt-6 rounded-2xl bg-white/10 px-4 py-3 text-xs font-medium text-blue-50 border border-white/15 backdrop-blur">
                We don&apos;t create the opportunity. We make sure <span className="font-bold text-white">it reaches you before it&apos;s too late</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ What matters most ============ */}
      <section className="bg-white border-y border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-3.5 py-1 text-xs font-bold tracking-widest text-indigo-700">
              WHAT MATTERS MOST
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              No one should miss their <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">moment</span>.
            </h2>
            <p className="mt-3 text-slate-600">We built SarkarLink around how searching actually feels — hopeful, hurried, and human. These three ideas guide every decision we make.</p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Card 1 - nothing stays hidden */}
            <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-7 sm:p-8 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 hover:bg-white hover:border-blue-200">
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br from-amber-200/40 to-orange-200/40 blur-2xl transition-opacity group-hover:opacity-100 opacity-60" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-amber-700">01 — Be found</div>
                <h3 className="mt-3 font-display text-xl font-extrabold text-slate-900">Nothing stays hidden.</h3>
                <p className="mt-2 text-sm font-semibold text-amber-700">From national exams to your district&apos;s latest posting.</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  From UPSC and SSC to block-level outsourcing, police, teaching and railway roles — we look across <span className="font-semibold text-slate-900">100+ official sources</span> so an opening in Delhi or Darbhanga has the same chance to find you.
                </p>
                <ul className="mt-5 space-y-2 text-xs font-medium text-slate-600">
                  <li className="flex gap-2"><span className="text-amber-500">▸</span> Jobs, Results, Admit Cards, Syllabus, Answer Keys — all in one place</li>
                  <li className="flex gap-2"><span className="text-amber-500">▸</span> Search by what you have — “10th pass”, “graduate”, “UP”, “female” — not just what&apos;s popular</li>
                </ul>
              </div>
            </div>

            {/* Card 2 - straight to source */}
            <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-7 sm:p-8 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 hover:bg-white hover:border-cyan-200">
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br from-cyan-200/40 to-blue-200/40 blur-2xl transition-opacity group-hover:opacity-100 opacity-60" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                </div>
                <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-cyan-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-cyan-700">02 — Belong</div>
                <h3 className="mt-3 font-display text-xl font-extrabold text-slate-900">You go straight to the source.</h3>
                <p className="mt-2 text-sm font-semibold text-cyan-700">We open the door. You walk through.</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  We&apos;re not a gatekeeper. We tidy the chaos, put it in clear language, and send you directly to the official portal to apply. No account needed. No data collected to get in the way.
                </p>
                <ul className="mt-5 space-y-2 text-xs font-medium text-slate-600">
                  <li className="flex gap-2"><span className="text-cyan-600">▸</span> Light and fast — made for small screens and slow networks, not just fast wifi</li>
                  <li className="flex gap-2"><span className="text-cyan-600">▸</span> Built to be read — clean cards, clear dates, official PDFs one tap away</li>
                </ul>
              </div>
            </div>

            {/* Card 3 - at the moment it matters */}
            <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-7 sm:p-8 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 hover:bg-white hover:border-emerald-200">
              <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br from-emerald-200/40 to-teal-200/40 blur-2xl transition-opacity group-hover:opacity-100 opacity-60" />
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest text-emerald-700">03 — In time</div>
                <h3 className="mt-3 font-display text-xl font-extrabold text-slate-900">When it counts, you&apos;ll know.</h3>
                <p className="mt-2 text-sm font-semibold text-emerald-700">The right information, before the window shuts.</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  Speed alone isn&apos;t enough — timing is. So what&apos;s new and what&apos;s closing soon quietly moves to the top. A gentle nudge before a deadline, not a panic the day after.
                </p>
                <ul className="mt-5 space-y-2 text-xs font-medium text-slate-600">
                  <li className="flex gap-2"><span className="text-emerald-600">▸</span> “Closing Soon” and “Updated” hints so you can act calmly, not anxiously</li>
                  <li className="flex gap-2"><span className="text-emerald-600">▸</span> Sorted by when the board actually updated — not just when we saw it</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ How we work — timeline ============ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1 text-xs font-bold tracking-widest text-slate-700">
              HOW IT WORKS
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              From noise to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">next step</span> — in minutes.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-slate-600">
            Four quiet steps, running day and night — so you don&apos;t have to keep 50 tabs open to stay ahead.
          </p>
        </div>

        <div className="relative mt-10">
          {/* line — desktop */}
          <div className="pointer-events-none absolute left-0 right-0 top-[30px] hidden h-0.5 bg-gradient-to-r from-blue-200 via-cyan-200 to-emerald-200 lg:block" />
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            {[
              {
                step: "01",
                title: "We look",
                desc: "Every few minutes, we check 100+ official boards — from upsc.gov.in to state sub-portals — so you don’t have to.",
                icon: "◉",
                color: "bg-blue-600",
              },
              {
                step: "02",
                title: "We make sense of it",
                desc: "We clean, tag and put it where you expect — job, result, admit card, centre, dates, links — one simple shape.",
                icon: "⬢",
                color: "bg-indigo-600",
              },
              {
                step: "03",
                title: "We put what’s urgent first",
                desc: "What’s newly updated and what’s about to close moves up — so you see it while there’s still time to act.",
                icon: "⬣",
                color: "bg-cyan-600",
              },
              {
                step: "04",
                title: "We stay with you",
                desc: "Notification → Apply → Admit Card → Answer Key → Result. The full journey, not just the first alert.",
                icon: "◆",
                color: "bg-emerald-600",
              },
            ].map((s) => (
              <div key={s.step} className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:-translate-y-1">
                <div className={`absolute -top-3 left-6 hidden h-7 w-7 items-center justify-center rounded-full text-white text-xs font-bold shadow-md lg:flex ${s.color}`}>{s.step}</div>
                <div className="flex items-center gap-3 lg:mt-4">
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-white text-sm font-bold shadow-sm ${s.color}`}>{s.icon}</span>
                  <h3 className="font-display text-lg font-bold text-slate-900">{s.title}</h3>
                  <span className="ml-auto lg:hidden rounded-full bg-slate-900 px-2 py-0.5 text-xs font-bold text-white">{s.step}</span>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* micro proof strip */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {[
            { k: "50+", label: "Official sources", sub: "and more every month" },
            { k: "< 60 min", label: "To appear here", sub: "after the board publishes" },
            { k: "8", label: "Kinds of updates", sub: "jobs, results, cards, keys…" },
            { k: "100%", label: "Free — forever", sub: "No paywall. No spam." },
          ].map((stat) => (
            <div key={stat.k} className="rounded-2xl border border-slate-200 bg-white px-4 py-4 text-center shadow-sm sm:px-6 sm:py-5">
              <div className="font-display text-xl font-extrabold text-slate-900 sm:text-2xl">{stat.k}</div>
              <div className="mt-1 text-xs font-bold text-slate-700">{stat.label}</div>
              <div className="text-[11px] text-slate-500">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ Values / Promise ============ */}
      <section id="promise" className="bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-[#0f1f4a] to-indigo-950" />
        <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-blue-600/15 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[100px]" />
        <div className="bg-grid-dark absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black,transparent)]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 py-14 sm:py-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3.5 py-1 text-xs font-bold tracking-widest text-cyan-200 backdrop-blur">
                OUR PROMISE
              </span>
              <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
                We move forward <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">only when you do</span>.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-blue-100/75 sm:text-base">
                SarkarLink isn&apos;t a destination you stay on. It&apos;s a bridge you cross. We feel we&apos;ve done our job when someone in a small town finds the right form at the right time and walks into their future with confidence.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {[
                  { title: "Honest, not hyped", desc: "We show what the official PDF says, link straight to it, and ask you to double-check. No clickbait. No stretched dates.", icon: "✓" },
                  { title: "Free for everyone", desc: "Every notification, admit card and syllabus is free. Your ambition should never need a checkout.", icon: "∞" },
                  { title: "Made for real phones", desc: "Light, fast, readable on small screens and slow data. Because reach matters more than shine.", icon: "◐" },
                  { title: "People behind the system", desc: "Automation brings speed; people bring judgement. We watch, correct and learn every day.", icon: "♥" },
                ].map((v) => (
                  <div key={v.title} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                    <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/10 text-sm font-bold text-cyan-200 border border-white/10">{v.icon}</div>
                    <h3 className="mt-3 text-sm font-bold text-white">{v.title}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-blue-100/65">{v.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Who we serve + quote */}
            <div className="space-y-6">
              <div className="rounded-3xl border border-white/10 bg-white p-6 sm:p-8 text-slate-900 shadow-2xl">
                <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-bold text-white">WHO IT'S FOR</div>
                <h3 className="mt-4 font-display text-xl font-bold">From the first attempt to the final posting.</h3>
                <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 text-sm">
                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                    <div className="text-lg">🎓</div>
                    <div className="mt-1 font-bold text-slate-900">First-generation aspirants</div>
                    <div className="text-xs leading-relaxed text-slate-600">No coaching, no insider — just effort and the right timely link.</div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                    <div className="text-lg">👩‍👧‍👦</div>
                    <div className="mt-1 font-bold text-slate-900">Families with hope on one child</div>
                    <div className="text-xs leading-relaxed text-slate-600">When a single notification can change what a home dares to dream.</div>
                  </div>
                  <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                    <div className="text-lg">🏫</div>
                    <div className="mt-1 font-bold text-slate-900">Teachers & mentors</div>
                    <div className="text-xs leading-relaxed text-slate-600">Who need one clear place they can trust for many students.</div>
                  </div>
                  <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-4 text-white">
                    <div className="text-lg">🌱</div>
                    <div className="mt-1 font-bold">Beyond the big cities</div>
                    <div className="text-xs leading-relaxed text-blue-100">Tier-2, Tier-3, villages — where being on time matters most.</div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <p className="text-sm leading-relaxed text-blue-100/90">
                  “We don&apos;t count success in pageviews. We count it in <span className="font-bold text-white">forms filled on time, admit cards saved before midnight, results found without panic</span>.”
                </p>
                <p className="mt-3 text-xs font-bold tracking-widest text-cyan-200">— TEAM SARKARLINK</p>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-8 backdrop-blur flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display text-xl font-bold text-white sm:text-2xl">Your next step is closer than you think.</h3>
              <p className="mt-1 text-sm text-blue-100/70">Take a look now — or get a clear answer if you&apos;re unsure. We&apos;re right here with you.</p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <Link href="/category/latest-job" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-900 shadow-lg transition-all hover:bg-blue-50 active:scale-95">
                Browse Jobs <span aria-hidden>→</span>
              </Link>
              <Link href="/faq" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-transparent px-6 py-3 text-sm font-bold text-white backdrop-blur transition-all hover:bg-white/10 active:scale-95">
                Read FAQ
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-blue-100 backdrop-blur transition-all hover:bg-white/10 active:scale-95">
                Contact Us
              </Link>
            </div>
          </div>

          <p className="mt-8 text-center text-[11px] leading-relaxed text-blue-200/60 max-w-3xl mx-auto">
            Disclaimer: SarkarLink is an independent aggregator. We are not affiliated with any government body. All dates, links and PDFs are sourced from official portals — always verify the official notification before applying.
          </p>
        </div>
      </section>
    </div>
  );
}
