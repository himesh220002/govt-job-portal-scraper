"use client";

import { useState } from "react";
import Link from "next/link";

const LEVELS: Record<string, number> = {
  "Level-1 (18000)": 18000,
  "Level-2 (19900)": 19900,
  "Level-4 (25500)": 25500,
  "Level-5 (29200)": 29200,
  "Level-6 (35400)": 35400,
  "Level-7 (44900)": 44900,
};

export default function SalaryCalculatorPage() {
  const [level, setLevel] = useState("Level-6 (35400)");
  const [daPct, setDaPct] = useState(50);
  const [hraPct, setHraPct] = useState(27);
  const [ta, setTa] = useState(3600);
  const [npsPct, setNpsPct] = useState(10);

  const basic = LEVELS[level];
  const da = Math.round((basic * daPct) / 100);
  const hra = Math.round((basic * hraPct) / 100);
  const gross = basic + da + hra + ta;
  const nps = Math.round(((basic + da) * npsPct) / 100);
  const inHand = gross - nps;

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="relative overflow-hidden bg-[#070b1d] text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#070b1d] via-[#0c1d4a] to-[#1a3391]" />
        <div className="bg-grid-dark absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_75%_55%_at_50%_0%,black,transparent)]" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-12">
          <Link href="/tools" className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-200 hover:text-white">← All Tools</Link>
          <div className="mt-4 flex items-start gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 text-xl shadow-md">💰</span>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">Salary Explorer</h1>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-blue-100/75">7th Pay Matrix + DA, HRA, TA — see gross and in-hand, clearly. No jargon.</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 -bottom-[1px] leading-none"><svg className="block h-[32px] w-full" viewBox="0 0 1440 40" preserveAspectRatio="none"><path d="M0,20 C360,40 720,0 1080,20 L1440,30 L1440,40 L0,40 Z" fill="#f8fafc" /></svg></div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
            <h2 className="font-display text-lg font-bold text-slate-900">Your pay</h2>
            <div className="mt-4 space-y-4">
              <label className="space-y-1.5 block">
                <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">Pay Level (Basic)</span>
                <select value={level} onChange={(e) => setLevel(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-medium focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100">
                  {Object.keys(LEVELS).map((k) => <option key={k}>{k}</option>)}
                </select>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <label className="space-y-1.5">
                  <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">DA %</span>
                  <input type="range" min={0} max={70} value={daPct} onChange={(e) => setDaPct(parseInt(e.target.value))} className="w-full" />
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-center">{daPct}% → ₹{da.toLocaleString("en-IN")}</div>
                </label>
                <label className="space-y-1.5">
                  <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">HRA %</span>
                  <input type="range" min={0} max={30} value={hraPct} onChange={(e) => setHraPct(parseInt(e.target.value))} className="w-full" />
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-center">{hraPct}% → ₹{hra.toLocaleString("en-IN")}</div>
                </label>
                <label className="space-y-1.5">
                  <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">TA (₹)</span>
                  <input type="number" value={ta} onChange={(e) => setTa(parseInt(e.target.value) || 0)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-medium focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100" />
                </label>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-5 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold tracking-widest opacity-80">GROSS</span>
                  <span className="text-xs font-bold opacity-80">Basic + DA + HRA + TA</span>
                </div>
                <div className="mt-1 font-display text-3xl font-extrabold">₹{gross.toLocaleString("en-IN")}</div>
                <div className="mt-2 grid grid-cols-4 gap-2 text-xs">
                  <span className="rounded-full bg-white/15 px-2 py-1 text-center">Basic ₹{basic.toLocaleString("en-IN")}</span>
                  <span className="rounded-full bg-white/15 px-2 py-1 text-center">DA ₹{da.toLocaleString("en-IN")}</span>
                  <span className="rounded-full bg-white/15 px-2 py-1 text-center">HRA ₹{hra.toLocaleString("en-IN")}</span>
                  <span className="rounded-full bg-white/15 px-2 py-1 text-center">TA ₹{ta.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-xs font-bold tracking-widest text-slate-500">NPS (Basic+DA){npsPct}%</div>
                  <div className="mt-1 text-lg font-extrabold text-slate-900">− ₹{nps.toLocaleString("en-IN")}</div>
                  <input type="range" min={0} max={14} value={npsPct} onChange={(e) => setNpsPct(parseInt(e.target.value))} className="mt-2 w-full" />
                </div>
                <div className="rounded-2xl bg-slate-900 p-4 text-white">
                  <div className="text-xs font-bold tracking-widest opacity-60">IN-HAND (approx)</div>
                  <div className="mt-1 text-2xl font-extrabold">₹{inHand.toLocaleString("en-IN")}</div>
                  <div className="text-xs opacity-60">Before income tax, other deductions</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-3xl border border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50 p-6">
              <h3 className="text-sm font-bold text-slate-900">What’s inside</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600 leading-relaxed">
                <li>• <b>DA</b> — Dearness Allowance, revised twice a year</li>
                <li>• <b>HRA</b> — 27% / 18% / 9% by city class (X/Y/Z)</li>
                <li>• <b>TA</b> — travel, varies by level & city</li>
                <li>• <b>NPS</b> — 10% of Basic+DA for most central posts</li>
              </ul>
              <p className="mt-3 text-xs text-slate-500">Allowances differ by department, city and post. Use this as a clear estimate, not a payslip.</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <h3 className="text-sm font-bold text-slate-900">Next steps</h3>
              <div className="mt-3 grid grid-cols-1 gap-2">
                <Link href="/tools/fee-calculator" className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold flex items-center justify-between hover:bg-white">Check application fee <span>→</span></Link>
                <Link href="/category/latest-job" className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white flex items-center justify-between hover:bg-slate-800">Browse jobs by pay level <span>→</span></Link>
                <Link href="/tools" className="text-xs font-bold text-slate-500 hover:text-slate-700 text-center">← Back to all tools</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
