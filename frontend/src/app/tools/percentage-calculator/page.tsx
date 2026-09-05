"use client";

import { useState } from "react";
import Link from "next/link";

export default function PercentageCalculatorPage() {
  const [obtained, setObtained] = useState("425");
  const [total, setTotal] = useState("500");
  const [cgpa, setCgpa] = useState("8.2");
  const [scale, setScale] = useState("10");

  const perc = (() => {
    const o = parseFloat(obtained);
    const t = parseFloat(total);
    if (!isNaN(o) && !isNaN(t) && t > 0) return (o / t) * 100;
    return null;
  })();

  const cgpaPerc = (() => {
    const c = parseFloat(cgpa);
    const s = parseFloat(scale);
    if (!isNaN(c) && !isNaN(s) && s > 0) return (c / s) * 100;
    // common CBSE 9.5 rule
    if (!isNaN(c)) return c * 9.5;
    return null;
  })();

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="relative overflow-hidden bg-[#070b1d] text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#070b1d] via-[#0c1d4a] to-[#1a3391]" />
        <div className="bg-grid-dark absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_75%_55%_at_50%_0%,black,transparent)]" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-12">
          <Link href="/tools" className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-200 hover:text-white">← All Tools</Link>
          <div className="mt-4 flex items-start gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 text-xl shadow-md">📊</span>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">Percentage Calculator</h1>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-blue-100/75">Marks → %, CGPA → %, and back — for 10th, 12th, graduation. No rounding surprises.</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 -bottom-[1px] leading-none"><svg className="block h-[32px] w-full" viewBox="0 0 1440 40" preserveAspectRatio="none"><path d="M0,20 C360,40 720,0 1080,20 L1440,30 L1440,40 L0,40 Z" fill="#f8fafc" /></svg></div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
            <h2 className="font-display text-lg font-bold text-slate-900">Marks to Percentage</h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <label className="space-y-1.5">
                <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">Obtained</span>
                <input value={obtained} onChange={(e) => setObtained(e.target.value)} inputMode="decimal" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-medium focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100" />
              </label>
              <label className="space-y-1.5">
                <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">Total</span>
                <input value={total} onChange={(e) => setTotal(e.target.value)} inputMode="decimal" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-medium focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100" />
              </label>
            </div>
            <div className="mt-5 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-5 text-white flex items-center justify-between">
              <div>
                <div className="text-xs font-bold tracking-widest opacity-80">RESULT</div>
                <div className="mt-1 font-display text-3xl font-extrabold">{perc !== null ? `${perc.toFixed(2)}%` : "—"}</div>
                <div className="text-xs opacity-80">{obtained || 0} / {total || 0}</div>
              </div>
              <span className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 border border-white/20">%</span>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
            <h2 className="font-display text-lg font-bold text-slate-900">CGPA to Percentage</h2>
            <p className="mt-1 text-xs text-slate-500">CBSE often uses ×9.5. Universities vary — check your marksheet footnote.</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <label className="space-y-1.5">
                <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">CGPA</span>
                <input value={cgpa} onChange={(e) => setCgpa(e.target.value)} inputMode="decimal" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-medium focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100" />
              </label>
              <label className="space-y-1.5">
                <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">Scale (e.g. 10)</span>
                <input value={scale} onChange={(e) => setScale(e.target.value)} inputMode="decimal" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-medium focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100" />
              </label>
            </div>
            <div className="mt-5 rounded-2xl bg-slate-900 p-5 text-white flex items-center justify-between">
              <div>
                <div className="text-xs font-bold tracking-widest opacity-60">RESULT</div>
                <div className="mt-1 font-display text-3xl font-extrabold">{cgpaPerc !== null ? `${cgpaPerc.toFixed(2)}%` : "—"}</div>
                <div className="text-xs opacity-60">{cgpa} / {scale} • ×9.5 ≈ {(parseFloat(cgpa) * 9.5 || 0).toFixed(2)}%</div>
              </div>
              <span className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/10">⇄</span>
            </div>
            <div className="mt-4 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 text-xs leading-relaxed text-amber-800">
              Tip: Some universities mention “CGPA × 10 = %”. Always use the formula printed on your degree/transcript.
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-slate-600">Done? Next, pick jobs that match your % or age.</p>
          <div className="flex gap-2">
            <Link href="/tools/age-calculator" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50">Age Calculator</Link>
            <Link href="/category/latest-job" className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800">Browse Jobs →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
