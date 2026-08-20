import Link from 'next/link';

export default function InfoSection() {
  return (
    <section className="bg-white border-t border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* About Us Teaser */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-semibold text-blue-700">
              <span className="text-xl">🏢</span> Who We Are
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              Democratizing access to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">public opportunities</span>.
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              We believe that finding a government job shouldn't require a master's degree in web navigation. Our platform aggregates data from dozens of complex official portals into one beautiful, lightning-fast search engine.
            </p>
            <div className="pt-4 flex gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-0.5"
              >
                Read Our Full Story
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Quick Stats / Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="rounded-3xl bg-white border border-slate-200 p-8 text-center transition-all hover:shadow-xl hover:shadow-blue-600/5 hover:-translate-y-1 hover:border-blue-200">
              <div className="flex justify-center mb-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 text-2xl shadow-inner">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Real-Time</h3>
              <p className="text-sm font-medium text-slate-500">Live background scraping</p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-8 text-center transition-all hover:shadow-xl hover:shadow-blue-600/5 hover:-translate-y-1 hover:border-blue-200">
              <div className="flex justify-center mb-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-teal-100 text-2xl shadow-inner">🛡️</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">100% Secure</h3>
              <p className="text-sm font-medium text-slate-500">No spam, fully verified</p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-8 text-center transition-all hover:shadow-xl hover:shadow-blue-600/5 hover:-translate-y-1 hover:border-blue-200">
              <div className="flex justify-center mb-4">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 text-2xl shadow-inner">🔓</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Always Free</h3>
              <p className="text-sm font-medium text-slate-500">No paywalls, no tracking</p>
            </div>

            <div className="rounded-3xl bg-white border border-slate-200 p-8 text-center flex flex-col justify-center transition-all hover:shadow-xl hover:shadow-blue-600/5 hover:-translate-y-1 hover:border-blue-200">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Have Questions?</h3>
              <p className="text-xs text-slate-500 mb-4 leading-relaxed">Learn how we source our data and protect your privacy.</p>
              <Link href="/faq" className="text-sm text-blue-600 hover:text-blue-700 font-bold underline underline-offset-4 decoration-blue-200 hover:decoration-blue-600 transition-colors">
                Read our FAQ &rarr;
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
