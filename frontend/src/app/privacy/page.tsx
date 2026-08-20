import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-slate-50 min-h-screen pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            🔒 Privacy Policy
          </h1>
          <p className="text-lg text-slate-600">
            DeshJob.com
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 p-6 sm:p-10 space-y-8 text-slate-700 leading-relaxed">
          
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-sm">1</span>
              Data We Collect
            </h2>
            <ul className="pl-10 space-y-2 list-disc list-inside marker:text-indigo-500">
              <li><strong>Non‑personal data:</strong> Page visits, clicks, device/browser info (for analytics).</li>
              <li><strong>Personal data (optional):</strong> Email if you subscribe to alerts.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-sm">2</span>
              How We Use Data
            </h2>
            <ul className="pl-10 space-y-2 list-disc list-inside marker:text-indigo-500">
              <li>To improve site performance and user experience.</li>
              <li>To send job/exam alerts if you opt‑in.</li>
              <li>To maintain security and prevent misuse.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-sm">3</span>
              Data Sharing
            </h2>
            <p className="pl-10">
              We do not sell or rent your personal data. We may share anonymized analytics with partners. Links to external sites (e.g., UPSC, SSC) are outside our control.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-sm">4</span>
              Cookies
            </h2>
            <p className="pl-10">
              We use cookies for analytics and session management. You can disable cookies in your browser, but some features may not work properly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-sm">5</span>
              Security
            </h2>
            <p className="pl-10">
              We implement reasonable security measures, but no system is 100% secure. Use at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-sm">6</span>
              Children’s Privacy
            </h2>
            <p className="pl-10">
              Our portal is not intended for children under 13. If you believe we collected data from a minor, contact us for removal.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700 text-sm">7</span>
              Policy Updates
            </h2>
            <p className="pl-10">
              We may revise this Privacy Policy periodically. Updates will be posted here.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
