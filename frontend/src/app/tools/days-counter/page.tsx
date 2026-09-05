"use client";

import { useState } from "react";
import Link from "next/link";

function diffDays(a: string, b: string) {
  if (!a || !b) return null;
  const d1 = new Date(a);
  const d2 = new Date(b);
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;
  const ms = d2.getTime() - d1.getTime();
  const days = Math.ceil(ms / (1000 * 60 * 60 * 24));
  return days;
}

export default function DaysCounterPage() {
  const today = new Date().toISOString().split("T")[0];
  const [from, setFrom] = useState(today);
  const [to, setTo] = useState("2026-09-30");
  const days = diffDays(from, to);

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="relative overflow-hidden bg-[#070b1d] text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#070b1d] via-[#0c1d4a] to-[#1a3391]" />
        <div className="bg-grid-dark absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_75%_55%_at_50%_0%,black,transparent)]" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-12">
          <Link href="/tools" className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-200 hover:text-white">← All Tools</Link>
          <div className="mt-4 flex items-start gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-600 to-red-500 text-xl shadow-md">⏳</span>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">Days Counter</h1>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-blue-100/75">How many days left to the last date or exam — a calm, clear countdown.</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 -bottom-[1px] leading-none"><svg className="block h-[32px] w-full" viewBox="0 0 1440 40" preserveAspectRatio="none"><path d="M0,20 C360,40 720,0 1080,20 L1440,30 L1440,40 L0,40 Z" fill="#f8fafc" /></svg></div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
            <h2 className="font-display text-lg font-bold text-slate-900">Pick dates</h2>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="space-y-1.5">
                <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">From</span>
                <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-medium focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100" />
              </label>
              <label className="space-y-1.5">
                <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">To (last date / exam)</span>
                <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-medium focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100" />
              </label>
            </div>

            {days !== null && (
              <div className="mt-6">
                {days < 0 ? (
                  <div className="rounded-2xl bg-rose-50 border border-rose-200 p-5 text-center">
                    <div className="text-sm font-bold text-rose-700">Date has passed</div>
                    <div className="mt-1 font-display text-3xl font-extrabold text-slate-900">{Math.abs(days)} days ago</div>
                  </div>
                ) : days === 0 ? (
                  <div className="rounded-2xl bg-amber-50 border border-amber-200 p-5 text-center">
                    <div className="font-display text-3xl font-extrabold text-slate-900">Today</div>
                    <div className="text-sm font-bold text-amber-700">Last day — apply now if you haven’t</div>
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-3">
                    <div className={`rounded-2xl p-4 text-center text-white ${days <= 3 ? "bg-gradient-to-br from-rose-600 to-red-600 animate-pulse" : days <= 7 ? "bg-gradient-to-br from-amber-500 to-orange-500" : "bg-gradient-to-br from-emerald-500 to-teal-500"}`}>
                      <div className="text-3xl font-extrabold">{days}</div>
                      <div className="text-xs font-bold tracking-widest opacity-80">DAYS LEFT</div>
                    </div>
                    <div className="rounded-2xl bg-slate-900 p-4 text-white text-center">
                      <div className="text-2xl font-extrabold">{Math.floor(days / 7)}</div>
                      <div className="text-xs font-bold tracking-widest opacity-60">WEEKS</div>
                    </div>
                    <div className="rounded-2xl bg-white border border-slate-200 p-4 text-center">
                      <div className="text-2xl font-extrabold text-slate-900">{(days / 30).toFixed(1)}</div>
                      <div className="text-xs font-bold tracking-widest text-slate-500">MONTHS</div>
                    </div>
                  </div>
                )}
                {days !== null && days >= 0 && days <= 3 && (
                  <p className="mt-3 text-xs font-bold text-rose-600 text-center">⚠️ Very urgent — keep documents ready and apply now.</p>
                )}
              </div>
            )}
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
              <h3 className="text-sm font-bold text-slate-900">Make it useful</h3>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>• Set <b>From</b> as today, <b>To</b> as last date from the notification.</li>
                <li>• If exam date, plan revision — {days !== null && days > 0 ? `${Math.floor(days / 7)} weeks left` : "countdown helps"}.</li>
                <li>• Don’t wait for the last day — servers are slowest then.</li>
              </ul>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <h3 className="text-sm font-bold text-slate-900">Next steps</h3>
              <div className="mt-3 grid grid-cols-1 gap-2">
                <Link href="/category/latest-job" className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white flex items-center justify-between hover:bg-slate-800">See closing soon <span>→</span></Link>
                <Link href="/tools/age-calculator" className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold flex items-center justify-between hover:bg-white">Check age eligibility <span>→</span></Link>
                <Link href="/tools" className="text-xs font-bold text-slate-500 hover:text-slate-700 text-center">← Back to all tools</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
