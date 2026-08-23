import React from 'react';

const PerksSection = () => {
  return (
    <section className="bg-slate-50 py-16 sm:py-24 border-t border-slate-200/60 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none opacity-40">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/2 -right-24 w-96 h-96 bg-emerald-50 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-14 flex flex-col items-center text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            Perks of Government Jobs
          </h2>
          {/* Tricolor accent line */}
          <div className="mt-5 flex h-1.5 w-24 overflow-hidden rounded-full shadow-sm">
            <div className="h-full w-1/3 bg-[#FF9933]"></div>
            <div className="h-full w-1/3 bg-slate-100"></div>
            <div className="h-full w-1/3 bg-[#138808]"></div>
          </div>
          <p className="mt-5 text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed">
            Government jobs in India come with a mix of financial stability, social respect, and long-term perks that grow as you move up the hierarchy. Here is a clear breakdown of what you can expect.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-2 items-stretch max-w-5xl mx-auto">
          
          {/* Column 1: New Joiners */}
          <div className="group relative rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-10 shadow-xl shadow-slate-200/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/10">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-blue-50/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
            
            <div className="relative mb-8 flex items-center gap-4 border-b border-slate-100 pb-6">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100/50 text-2xl shadow-sm border border-blue-100/50">
                💼
              </span>
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900">For New Joiners</h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Entry-level perks & stability</p>
              </div>
            </div>
            
            <ul className="space-y-6 relative">
              <li className="flex items-start gap-4">
                <span className="flex shrink-0 h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 text-lg border border-emerald-100">💰</span>
                <div className="pt-0.5">
                  <h4 className="text-sm font-bold text-slate-900">Stable Salary</h4>
                  <p className="text-sm text-slate-500 mt-0.5 leading-snug">Based on the 7th Pay Commission pay matrix.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex shrink-0 h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 text-lg border border-blue-100">💸</span>
                <div className="pt-0.5">
                  <h4 className="text-sm font-bold text-slate-900">Allowances (DA, HRA, TA)</h4>
                  <p className="text-sm text-slate-500 mt-0.5 leading-snug">Regular dearness and travel allowances.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex shrink-0 h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 text-lg border border-indigo-100">🛡️</span>
                <div className="pt-0.5">
                  <h4 className="text-sm font-bold text-slate-900">Pension & Provident Fund</h4>
                  <p className="text-sm text-slate-500 mt-0.5 leading-snug">NPS contribution ensures post-retirement security.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex shrink-0 h-10 w-10 items-center justify-center rounded-xl bg-rose-50 text-rose-600 text-lg border border-rose-100">🏥</span>
                <div className="pt-0.5">
                  <h4 className="text-sm font-bold text-slate-900">Medical Facilities</h4>
                  <p className="text-sm text-slate-500 mt-0.5 leading-snug">Free or subsidized healthcare via CGHS or ESIC.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex shrink-0 h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600 text-lg border border-amber-100">🌴</span>
                <div className="pt-0.5">
                  <h4 className="text-sm font-bold text-slate-900">Generous Leave Policies</h4>
                  <p className="text-sm text-slate-500 mt-0.5 leading-snug">Casual, earned, medical, and maternity leaves.</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 2: Senior Posts */}
          <div className="group relative rounded-3xl border border-indigo-900/10 bg-[#0f172a] p-6 sm:p-10 shadow-2xl shadow-indigo-900/20 transition-all duration-300 hover:-translate-y-1">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/10 via-transparent to-blue-500/5 pointer-events-none" />
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-[80px] pointer-events-none" />
            
            <div className="relative mb-8 flex items-center gap-4 border-b border-white/10 pb-6">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-2xl shadow-inner border border-white/10 backdrop-blur-md">
                🏛️
              </span>
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">For Senior Posts</h3>
                <p className="text-xs sm:text-sm text-indigo-200/80 mt-0.5">Executive power & prestige</p>
              </div>
            </div>
            
            <ul className="space-y-6 relative z-10">
              <li className="flex items-start gap-4">
                <span className="flex shrink-0 h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/20 text-indigo-300 text-lg border border-indigo-400/20">📈</span>
                <div className="pt-0.5">
                  <h4 className="text-sm font-bold text-white">Higher Pay Bands</h4>
                  <p className="text-sm text-slate-400 mt-0.5 leading-snug">Grade pay increments and special officer allowances.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex shrink-0 h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20 text-blue-300 text-lg border border-blue-400/20">🏠</span>
                <div className="pt-0.5">
                  <h4 className="text-sm font-bold text-white">Official Residence & Vehicle</h4>
                  <p className="text-sm text-slate-400 mt-0.5 leading-snug">Government allotted bungalows and chauffeur-driven cars.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex shrink-0 h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 text-lg border border-emerald-400/20">🌍</span>
                <div className="pt-0.5">
                  <h4 className="text-sm font-bold text-white">Foreign Deputations</h4>
                  <p className="text-sm text-slate-400 mt-0.5 leading-snug">Assignments with embassies, UN bodies, or global projects.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex shrink-0 h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300 text-lg border border-amber-400/20">🎖️</span>
                <div className="pt-0.5">
                  <h4 className="text-sm font-bold text-white">Policy Influence</h4>
                  <p className="text-sm text-slate-400 mt-0.5 leading-snug">Administrative control, high social status, and recognition.</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="flex shrink-0 h-10 w-10 items-center justify-center rounded-xl bg-rose-500/20 text-rose-300 text-lg border border-rose-400/20">🏅</span>
                <div className="pt-0.5">
                  <h4 className="text-sm font-bold text-white">Lifetime Benefits</h4>
                  <p className="text-sm text-slate-400 mt-0.5 leading-snug">Lifetime pension, gratuity, and VIP post-retirement care.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto max-w-3xl mt-12 rounded-2xl bg-white p-4 border border-slate-200/60 shadow-sm flex items-center justify-center gap-3">
          <span className="text-slate-400">ℹ️</span>
          <p className="text-xs sm:text-sm text-slate-500">
            <strong className="font-semibold text-slate-700">Note:</strong> These perks are generally true but may vary depending on the department, cadre, and specific job type.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PerksSection;
