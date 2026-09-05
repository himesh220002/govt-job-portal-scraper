import Link from "next/link";

type Tool = {
  title: string;
  desc: string;
  icon: string;
  gradient: string;
  badge?: string;
  href: string;
};

const TOOLS: Tool[] = [
  {
    title: "Age Calculator",
    desc: "Check if you fit the age window — category-wise, in seconds.",
    icon: "🎂",
    gradient: "from-amber-500 to-orange-500",
    badge: "Most used",
    href: "/tools/age-calculator",
  },
  {
    title: "Photo & Sign Resizer",
    desc: "Make photo 20–50 KB, sign 10–20 KB — exactly as forms want.",
    icon: "🖼️",
    gradient: "from-violet-500 to-indigo-500",
    badge: "For every form",
    href: "/tools/photo-resizer",
  },
  {
    title: "Percentage Calculator",
    desc: "From CGPA or marks to % — 10th, 12th, graduation ready.",
    icon: "📊",
    gradient: "from-emerald-500 to-teal-500",
    href: "/tools/percentage-calculator",
  },
  {
    title: "Salary Explorer",
    desc: "7th Pay Matrix + DA, HRA, TA — see in-hand, clearly.",
    icon: "💰",
    gradient: "from-blue-500 to-cyan-500",
    badge: "New",
    href: "/tools/salary-calculator",
  },
  {
    title: "Fee & Cost Planner",
    desc: "Category-wise fee, plus extra charges — total before you pay.",
    icon: "🧾",
    gradient: "from-rose-500 to-pink-500",
    href: "/tools/fee-calculator",
  },
  {
    title: "Document Compressor",
    desc: "PDF/JPG under the limit without losing clarity.",
    icon: "🗜️",
    gradient: "from-slate-700 to-slate-900",
    href: "/tools/image-compressor",
  },
  {
    title: "Days Counter",
    desc: "How many days left to apply or to the exam — calm countdown.",
    icon: "⏳",
    gradient: "from-amber-600 to-red-500",
    href: "/tools/days-counter",
  },
  {
    title: "Eligibility Checker",
    desc: "Enter qualification, age, state — get what you can apply for.",
    icon: "✅",
    gradient: "from-green-600 to-emerald-500",
    badge: "Soon",
    href: "/tools/eligibility-checker",
  },
];

export default function UsefulToolsSection() {
  return (
    <section id="tools" className="relative overflow-hidden bg-white border-y border-slate-200 py-16 sm:py-20 scroll-mt-20">
      {/* soft blobs */}
      <div className="pointer-events-none absolute -top-24 right-0 h-96 w-96 rounded-full bg-blue-50 blur-3xl opacity-60" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-cyan-50 blur-3xl opacity-60" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 text-xs font-bold tracking-widest text-blue-700">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
            USEFUL TOOLS
          </span>
          <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Tools that save you <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">time on form day</span>.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            No logins, no paywalls. Just the small, annoying tasks — made quick and clear. Tap a card to open — each tool lives at its own page and keeps your next step one tap away.
          </p>
        </div>

        {/* bento */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS.map((t) => (
            <Link
              key={t.title}
              href={t.href}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-slate-50 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-slate-200/60 hover:border-blue-200"
            >
              {/* top gradient line on hover */}
              <span className="pointer-events-none absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="flex items-start justify-between gap-3">
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${t.gradient} text-xl text-white shadow-md`}>
                  {t.icon}
                </span>
                {t.badge && (
                  <span className="inline-flex items-center rounded-full bg-white border border-slate-200 px-2.5 py-1 text-[11px] font-bold tracking-wide text-slate-700 shadow-sm">
                    {t.badge}
                  </span>
                )}
              </div>

              <h3 className="mt-5 font-display text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                {t.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-500 line-clamp-2">
                {t.desc}
              </p>

              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 group-hover:text-blue-700">
                Open tool
                <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </span>

              {/* subtle bg icon */}
              <span className="pointer-events-none absolute -bottom-6 -right-6 text-7xl opacity-[0.04] group-hover:opacity-[0.07] transition-opacity">
                {t.icon}
              </span>
            </Link>
          ))}
        </div>

        {/* footer help strip */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 sm:flex-row sm:px-6">
          <p className="text-sm text-slate-600 text-center sm:text-left">
            Want a tool not listed? Tell us what wastes your time — we build what actually helps.
          </p>
          <div className="flex items-center gap-2">
            <Link href="/tools" className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50">
              View all tools <span aria-hidden>→</span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-md hover:bg-slate-800 active:scale-95 transition-all"
            >
              Request a tool
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
