import React from 'react';

export default function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-screen pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-4 py-1.5 text-sm font-semibold text-rose-700 mb-6">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Not Affiliated with any Government Organization
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            📜 Terms &amp; Conditions
          </h1>
          <p className="text-lg text-slate-600">
            DeshJob.com
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-6 sm:p-10 space-y-8 text-slate-700 leading-relaxed">
          
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700 text-sm">1</span>
              Acceptance of Terms
            </h2>
            <p className="pl-10">
              By accessing or using DeshJob.com, you agree to these Terms &amp; Conditions. If you do not agree, please discontinue use immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700 text-sm">2</span>
              Nature of Service
            </h2>
            <p className="pl-10">
              We aggregate publicly available information on government jobs, exams, results, admissions, and study materials. <strong>We are not an official government body.</strong> All information is sourced from official portals and third‑party educational resources. We’re not the government, we just make it easier to find them.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700 text-sm">3</span>
              Accuracy Disclaimer
            </h2>
            <p className="pl-10">
              We strive for accuracy, but we cannot guarantee that all information is error‑free or up‑to‑date. Always verify details on the official government websites before acting.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700 text-sm">4</span>
              User Responsibilities
            </h2>
            <ul className="pl-10 space-y-2 list-disc list-inside marker:text-blue-500">
              <li>Do not misuse the platform for fraudulent activities.</li>
              <li>Do not attempt to scrape, hack, or overload our servers.</li>
              <li>Respect intellectual property rights of linked resources.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700 text-sm">5</span>
              External Links
            </h2>
            <p className="pl-10">
              Our portal may link to external sites (e.g., UPSC, SSC, IBPS, NCERT). We are not responsible for their content, policies, or availability.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700 text-sm">6</span>
              Limitation of Liability
            </h2>
            <p className="pl-10 mb-2">We are not liable for:</p>
            <ul className="pl-10 space-y-2 list-disc list-inside marker:text-rose-500">
              <li>Missed deadlines due to incorrect or delayed information.</li>
              <li>Losses incurred from reliance on aggregated data.</li>
              <li>Any damages arising from use of third‑party links.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700 text-sm">7</span>
              Intellectual Property &amp; DMCA
            </h2>
            <p className="pl-10 mb-2">
              All content aggregated on this portal is the intellectual property of their respective creators and official government bodies. If you believe any aggregated content infringes upon your copyright, please contact us immediately for prompt removal under the Digital Millennium Copyright Act (DMCA).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700 text-sm">8</span>
              Modifications
            </h2>
            <p className="pl-10">
              We may update these Terms at any time. Continued use after changes implies acceptance.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
