"use client";

import { useState } from "react";
import Link from "next/link";

export default function FeeCalculatorPage() {
  const [category, setCategory] = useState("General");
  const [baseFee, setBaseFee] = useState(500);
  const [extra, setExtra] = useState(0);

  const presets: Record<string, number> = {
    General: 500,
    OBC: 500,
    "SC/ST": 250,
    PwD: 0,
    Female: 250,
  };

  const onCategoryChange = (c: string) => {
    setCategory(c);
    setBaseFee(presets[c] ?? 500);
  };

  const total = baseFee + extra;

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="relative overflow-hidden bg-[#070b1d] text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#070b1d] via-[#0c1d4a] to-[#1a3391]" />
        <div className="bg-grid-dark absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_75%_55%_at_50%_0%,black,transparent)]" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-12">
          <Link href="/tools" className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-200 hover:text-white">← All Tools</Link>
          <div className="mt-4 flex items-start gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-pink-500 text-xl shadow-md">🧾</span>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">Fee & Cost Planner</h1>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-blue-100/75">Category fee + gateway charges + late fine, if any — total before you pay. No surprises at checkout.</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 -bottom-[1px] leading-none"><svg className="block h-[32px] w-full" viewBox="0 0 1440 40" preserveAspectRatio="none"><path d="M0,20 C360,40 720,0 1080,20 L1440,30 L1440,40 L0,40 Z" fill="#f8fafc" /></svg></div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
            <h2 className="font-display text-lg font-bold text-slate-900">Your fee</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {Object.keys(presets).map((c) => (
                <button
                  key={c}
                  onClick={() => onCategoryChange(c)}
                  className={`rounded-full px-4 py-2 text-xs font-bold border ${category === c ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-700 border-slate-200 hover:border-blue-200"}`}
                >
                  {c}
                </button>
              ))}
            </div>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="space-y-1.5">
                <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">Base Fee (₹)</span>
                <input type="number" value={baseFee} onChange={(e) => setBaseFee(parseInt(e.target.value) || 0)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-bold focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100" />
              </label>
              <label className="space-y-1.5">
                <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">Extra (GST / late fine ₹)</span>
                <input type="number" value={extra} onChange={(e) => setExtra(parseInt(e.target.value) || 0)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-bold focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100" />
              </label>
            </div>

            <div className="mt-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-5 text-white flex items-center justify-between">
              <div>
                <div className="text-xs font-bold tracking-widest opacity-60">TOTAL TO PAY</div>
                <div className="mt-1 font-display text-3xl font-extrabold">₹{total.toLocaleString("en-IN")}</div>
                <div className="text-xs opacity-60">{category} • Base ₹{baseFee} + Extra ₹{extra}</div>
              </div>
              <span className="hidden sm:flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 border border-white/15">₹</span>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-slate-500">This is an estimate. Confirm the exact fee table in the official notification — especially for PwD/Female concessions.</p>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
              <h3 className="text-sm font-bold text-slate-900">Why this helps</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• Avoid last-minute “fee mismatch” errors.</li>
                <li>• Plan for multiple forms — total it clearly.</li>
                <li>• Keep UPI limit in mind for late-night payments.</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <h3 className="text-sm font-bold text-slate-900">Next steps</h3>
              <div className="mt-3 grid grid-cols-1 gap-2">
                <Link href="/tools/days-counter" className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold flex items-center justify-between hover:bg-white">Days left to pay? <span>→</span></Link>
                <Link href="/category/latest-job" className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white flex items-center justify-between hover:bg-slate-800">Browse jobs <span>→</span></Link>
                <Link href="/tools" className="text-xs font-bold text-slate-500 hover:text-slate-700 text-center">← Back to all tools</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
