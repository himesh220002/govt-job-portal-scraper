"use client";

import { useState } from "react";
import Link from "next/link";

function calcAge(dob: string, cutoff: string) {
  if (!dob || !cutoff) return null;
  const d1 = new Date(dob);
  const d2 = new Date(cutoff);
  if (isNaN(d1.getTime()) || isNaN(d2.getTime()) || d2 < d1) return null;
  let years = d2.getFullYear() - d1.getFullYear();
  let months = d2.getMonth() - d1.getMonth();
  let days = d2.getDate() - d1.getDate();
  if (days < 0) {
    months -= 1;
    const prevMonth = new Date(d2.getFullYear(), d2.getMonth(), 0).getDate();
    days += prevMonth;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  const totalDays = Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
  const totalMonths = years * 12 + months;
  return { years, months, days, totalDays, totalMonths };
}

export default function AgeCalculatorPage() {
  const today = new Date().toISOString().split("T")[0];
  const [dob, setDob] = useState("2002-06-15");
  const [cutoff, setCutoff] = useState(today);
  const age = calcAge(dob, cutoff);

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="relative overflow-hidden bg-[#070b1d] text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#070b1d] via-[#0c1d4a] to-[#1a3391]" />
        <div className="bg-grid-dark absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_75%_55%_at_50%_0%,black,transparent)]" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-12">
          <Link href="/tools" className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-200 hover:text-white">
            ← All Tools
          </Link>
          <div className="mt-4 flex items-start gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-xl shadow-md">🎂</span>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">Age Calculator</h1>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-blue-100/75">Exact age on cut-off date — years, months, days — and how category relaxation shifts your window.</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 -bottom-[1px] leading-none">
          <svg className="block h-[32px] w-full" viewBox="0 0 1440 40" preserveAspectRatio="none"><path d="M0,20 C360,40 720,0 1080,20 L1440,30 L1440,40 L0,40 Z" fill="#f8fafc" /></svg>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
            <h2 className="font-display text-lg font-bold text-slate-900">Enter dates</h2>
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="space-y-1.5">
                <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">Date of Birth</span>
                <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-medium focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100" />
              </label>
              <label className="space-y-1.5">
                <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">Cut-off Date</span>
                <input type="date" value={cutoff} onChange={(e) => setCutoff(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-medium focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100" />
                <span className="text-[11px] text-slate-500">Usually 01-08-2026 or as per notification</span>
              </label>
            </div>

            {age ? (
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 p-4 text-white text-center">
                  <div className="text-2xl font-extrabold">{age.years}</div>
                  <div className="text-xs font-bold tracking-widest opacity-80">YEARS</div>
                </div>
                <div className="rounded-2xl bg-slate-900 p-4 text-white text-center">
                  <div className="text-2xl font-extrabold">{age.months}</div>
                  <div className="text-xs font-bold tracking-widest opacity-70">MONTHS</div>
                </div>
                <div className="rounded-2xl bg-white border border-slate-200 p-4 text-center">
                  <div className="text-2xl font-extrabold text-slate-900">{age.days}</div>
                  <div className="text-xs font-bold tracking-widest text-slate-500">DAYS</div>
                </div>
              </div>
            ) : (
              <p className="mt-6 text-sm text-rose-600 font-medium">Check dates — cut-off must be after DOB.</p>
            )}

            {age && (
              <div className="mt-4 rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 flex items-center justify-between">
                <span className="text-xs font-bold text-amber-800">Total</span>
                <span className="text-sm font-bold text-slate-900">{age.totalDays.toLocaleString("en-IN")} days • {age.totalMonths} months</span>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
              <h3 className="font-display text-sm font-bold text-slate-900">Category relaxation (typical)</h3>
              <ul className="mt-3 space-y-2 text-sm">
                <li className="flex justify-between border-b border-blue-100 py-2"><span className="text-slate-600">General</span><span className="font-bold text-slate-900">No relaxation</span></li>
                <li className="flex justify-between border-b border-blue-100 py-2"><span className="text-slate-600">OBC (NCL)</span><span className="font-bold text-slate-900">+3 years</span></li>
                <li className="flex justify-between border-b border-blue-100 py-2"><span className="text-slate-600">SC / ST</span><span className="font-bold text-slate-900">+5 years</span></li>
                <li className="flex justify-between py-2"><span className="text-slate-600">PwD (Gen/OBC/SC)</span><span className="font-bold text-slate-900">+10 / +13 / +15</span></li>
              </ul>
              <p className="mt-3 text-xs leading-relaxed text-slate-500">Relaxation varies by notification. Always verify the cut-off clause in the official PDF.</p>
              {age && (
                <div className="mt-3 text-xs font-semibold text-blue-700">
                  Your age {age.years}y {age.months}m — fits General up to 27/30/32 as per post; with OBC add 3y, SC/ST add 5y.
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <h3 className="text-sm font-bold text-slate-900">Next steps</h3>
              <div className="mt-3 grid grid-cols-1 gap-2">
                <Link href="/tools/eligibility-checker" className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-white hover:border-blue-200 flex items-center justify-between">
                  Check eligibility <span>→</span>
                </Link>
                <Link href="/category/latest-job" className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-800 flex items-center justify-between">
                  Browse latest jobs <span>→</span>
                </Link>
                <Link href="/tools" className="text-xs font-bold text-slate-500 hover:text-slate-700 text-center mt-1">← Back to all tools</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
