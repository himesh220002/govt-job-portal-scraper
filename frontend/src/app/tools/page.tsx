import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Useful Tools — Calculators for Govt Job Forms | SarkarLink",
  description:
    "Free tools for government job aspirants — age calculator, photo & signature resizer, percentage to CGPA, salary explorer, fee planner and more. No login, no paywall.",
};

const TOOLS = [
  {
    slug: "age-calculator",
    title: "Age Calculator",
    desc: "Know your exact age on cut-off date — year, month, day. Check category relaxation in one view.",
    icon: "🎂",
    gradient: "from-amber-500 to-orange-500",
    badge: "Most used",
  },
  {
    slug: "photo-resizer",
    title: "Photo & Sign Resizer",
    desc: "Resize to 20–50 KB photo, 10–20 KB sign. Right pixels, right size, first try.",
    icon: "🖼️",
    gradient: "from-violet-500 to-indigo-500",
    badge: "For every form",
  },
  {
    slug: "percentage-calculator",
    title: "Percentage Calculator",
    desc: "Marks → %, CGPA → %, and back. For 10th, 12th, graduation.",
    icon: "📊",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    slug: "salary-calculator",
    title: "Salary Explorer",
    desc: "7th Pay Matrix + DA, HRA, TA. See gross, deductions and in-hand.",
    icon: "💰",
    gradient: "from-blue-500 to-cyan-500",
    badge: "New",
  },
  {
    slug: "fee-calculator",
    title: "Fee & Cost Planner",
    desc: "Category-wise fee + charges + late fine, if any — total before you pay.",
    icon: "🧾",
    gradient: "from-rose-500 to-pink-500",
  },
  {
    slug: "image-compressor",
    title: "Image & PDF Compressor",
    desc: "Bring JPG/PDF under the limit without losing clarity. In-browser, private.",
    icon: "🗜️",
    gradient: "from-slate-700 to-slate-900",
  },
  {
    slug: "days-counter",
    title: "Days Counter",
    desc: "Days left to last date or exam day. Calm countdown, not panic.",
    icon: "⏳",
    gradient: "from-amber-600 to-red-500",
  },
  {
    slug: "eligibility-checker",
    title: "Eligibility Checker",
    desc: "Enter age, qualification, state — see where you’re eligible right now.",
    icon: "✅",
    gradient: "from-green-600 to-emerald-500",
    badge: "Soon",
  },
];

export default function ToolsIndexPage() {
  return (
    <div className="bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#070b1d] text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#070b1d] via-[#0c1d4a] to-[#1a3391]" />
        <div className="bg-grid-dark absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_75%_55%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-24 -left-24 h-[520px] w-[520px] rounded-full bg-blue-600/25 blur-[130px] animate-blob" />
        <div className="absolute -bottom-32 -right-24 h-[520px] w-[520px] rounded-full bg-cyan-400/20 blur-[130px] animate-blob [animation-delay:2s]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-14 sm:pt-16 sm:pb-16 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-widest text-cyan-100 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" /> USEFUL TOOLS • FREE • NO LOGIN
          </span>
          <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
            The small tasks, <span className="shimmer-text">made easy</span>.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-blue-100/80 sm:text-base">
            Photo sizes, age cut-offs, percentages, fees — the bits that slow you down on form day. All here, free, fast, and private in your browser.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs font-semibold">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-blue-100 backdrop-blur">⚡ In-browser • Private</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-blue-100 backdrop-blur">↗ One tap to official form after</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-blue-100 backdrop-blur">🔓 100% free forever</span>
          </div>
        </div>
        <div className="absolute inset-x-0 -bottom-[1px] leading-none">
          <svg className="block h-[36px] w-full sm:h-[52px]" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,28 C240,60 480,0 720,20 C960,40 1200,60 1440,28 L1440,60 L0,60 Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-14">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS.map((t) => (
            <Link
              key={t.slug}
              href={`/tools/${t.slug}`}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-200/60 hover:border-blue-200"
            >
              <span className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="flex items-start justify-between">
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${t.gradient} text-xl text-white shadow-md`}>{t.icon}</span>
                {t.badge && (
                  <span className="rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-700">{t.badge}</span>
                )}
              </div>
              <h3 className="mt-5 font-display text-base font-bold text-slate-900 group-hover:text-blue-700">{t.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500">{t.desc}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 group-hover:text-blue-700">
                Open tool <svg className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-bold text-slate-900">Not finding what you need?</h3>
            <p className="mt-1 text-sm text-slate-600">Tell us the exact hassle — we’ll build the tool that removes it.</p>
          </div>
          <Link href="/contact" className="shrink-0 inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-md hover:bg-slate-800 active:scale-95">
            Request a tool <span aria-hidden>→</span>
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3 text-center">
          <Link href="/" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50">
            ← Back to Home
          </Link>
          <Link href="/category/latest-job" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-2.5 text-sm font-bold text-white shadow-md hover:shadow-lg">
            Browse Latest Jobs <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
