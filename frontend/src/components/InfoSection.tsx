import Link from 'next/link';

export default function InfoSection() {
  return (
    <section className="bg-white border-t border-slate-200 relative overflow-hidden">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-50 blur-3xl opacity-60" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Story */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-white text-xs">◉</span> Who We Are
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight">
              We turn scattered notices into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">clear next steps</span>.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              A government opportunity shouldn’t be hard to find — or easy to miss. We bring 100+ official portals into one calm, fast search, put what’s urgent at the top, and take you straight to the official page. No logins. No paywalls. Just in time to act.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:shadow-xl hover:shadow-blue-600/30 hover:-translate-y-0.5"
              >
                Read Our Story
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="#tools"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 shadow-sm transition-all hover:border-blue-200 hover:text-blue-700 hover:shadow-md"
              >
                Try Useful Tools
                <span className="rounded-full bg-amber-100 text-amber-700 px-2 py-0.5 text-[10px]">NEW</span>
              </Link>
            </div>
            <div className="flex items-center gap-2 pt-2 text-xs font-medium text-slate-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Updated hourly • Linked to official PDFs • Free forever
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="rounded-3xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 p-6 sm:p-7 text-center transition-all hover:shadow-lg hover:shadow-amber-100/50 hover:-translate-y-1 hover:bg-white">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-amber-100 text-xl shadow-sm">⚡</div>
              <h3 className="mt-4 text-base font-bold text-slate-900">In minutes, not days</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">New notices surface quickly — and what’s closing soon stays on top.</p>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 p-6 sm:p-7 text-center transition-all hover:shadow-lg hover:shadow-emerald-100/50 hover:-translate-y-1 hover:bg-white">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-emerald-100 text-xl shadow-sm">↗</div>
              <h3 className="mt-4 text-base font-bold text-slate-900">Straight to official</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">One tap to the real form. We don’t keep you here.</p>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-violet-50 to-indigo-50 border border-violet-100 p-6 sm:p-7 text-center transition-all hover:shadow-lg hover:shadow-violet-100/50 hover:-translate-y-1 hover:bg-white">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white border border-violet-100 text-xl shadow-sm">🔓</div>
              <h3 className="mt-4 text-base font-bold text-slate-900">Always free</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">No paywalls, no spam. Your ambition shouldn’t need a checkout.</p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-7 flex flex-col justify-center text-center transition-all hover:shadow-xl hover:shadow-blue-600/5 hover:-translate-y-1 hover:border-blue-200">
              <h3 className="text-base font-bold text-slate-900">Have questions?</h3>
              <p className="mt-1 text-xs text-slate-500 leading-relaxed">How we source, sort and stay accurate — explained plainly.</p>
              <Link href="/faq" className="mt-3 inline-flex items-center justify-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-700">
                Read FAQ <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
