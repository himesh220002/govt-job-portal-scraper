"use client";

import { useState } from "react";
import Link from "next/link";

type JobHint = { title: string; why: string; search: string };

function getHints(age: number, qual: string, state: string): JobHint[] {
  const hints: JobHint[] = [];
  const q = qual.toLowerCase();
  const isGraduate = ["graduate", "post graduate", "engineering", "medical", "postgraduate"].includes(q);
  const is12th = ["12th pass", "12th", "diploma", "iti"].includes(q) || isGraduate;
  const is10th = true;

  if (is10th && age >= 18 && age <= 27) {
    hints.push({ title: "MTS & Group D (Railway/SSC)", why: "10th pass • 18–27y — good starter", search: "MTS Group D" });
    hints.push({ title: "Constable / Police", why: `10th/12th • ${state || "your state"} police`, search: `${state} Police Constable` });
  }
  if (is12th && age >= 18 && age <= 30) {
    hints.push({ title: "SSC CHSL, Clerk, Data Entry", why: "12th pass • 18–27/30y", search: "12th pass CHSL" });
    hints.push({ title: "Railway Clerk / Junior Associate", why: "12th pass • Railway NTPC", search: "Railway NTPC 12th" });
  }
  if (isGraduate && age >= 18 && age <= 32) {
    hints.push({ title: "SSC CGL, CHSL, Bank PO", why: "Graduate • 20–30/32y", search: "Graduate SSC CGL" });
    hints.push({ title: "Teaching (TET/CTET)", why: "Graduate + TET • 21–42y varies", search: "Teaching TET" });
  }
  if (q === "engineering" && age >= 21 && age <= 32) {
    hints.push({ title: "JE / AE (Diploma/B.Tech)", why: "Engineering • 18–30y", search: "JE AE Engineer" });
  }
  if (q === "medical" && age >= 18) {
    hints.push({ title: "Nursing / AIIMS / Medical", why: "ANM/GNM/MBBS as per post", search: "Nursing Medical" });
  }
  if (hints.length === 0) {
    hints.push({ title: "Search all Latest Jobs", why: "Try broader — age or qual may limit above filters", search: "" });
  }
  return hints.slice(0, 5);
}

export default function EligibilityCheckerPage() {
  const [age, setAge] = useState("22");
  const [qual, setQual] = useState("Graduate");
  const [state, setState] = useState("Uttar Pradesh");
  const [cat, setCat] = useState("General");

  const ageNum = parseInt(age) || 0;
  const hints = getHints(ageNum, qual, state);

  return (
    <div className="bg-slate-50 min-h-screen">
      <section className="relative overflow-hidden bg-[#070b1d] text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#070b1d] via-[#0c1d4a] to-[#1a3391]" />
        <div className="bg-grid-dark absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_75%_55%_at_50%_0%,black,transparent)]" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-12">
          <Link href="/tools" className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-200 hover:text-white">← All Tools</Link>
          <div className="mt-4 flex items-start gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-green-600 to-emerald-500 text-xl shadow-md">✅</span>
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight">Eligibility Checker</h1>
              <p className="mt-1 max-w-2xl text-sm leading-relaxed text-blue-100/75">Enter age, qualification, state — see where you’re eligible right now. Simple guidance before you open forms.</p>
              <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-bold tracking-widest text-cyan-100">SOON • More filters coming</span>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 -bottom-[1px] leading-none"><svg className="block h-[32px] w-full" viewBox="0 0 1440 40" preserveAspectRatio="none"><path d="M0,20 C360,40 720,0 1080,20 L1440,30 L1440,40 L0,40 Z" fill="#f8fafc" /></svg></div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 rounded-3xl border border-slate-200 bg-white p-6 sm:p-7 shadow-sm">
            <h2 className="font-display text-lg font-bold text-slate-900">Tell us a bit</h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <label className="space-y-1.5">
                <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">Age</span>
                <input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-bold focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100" />
              </label>
              <label className="space-y-1.5">
                <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">Category</span>
                <select value={cat} onChange={(e) => setCat(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-bold focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100">
                  <option>General</option><option>OBC</option><option>SC</option><option>ST</option><option>EWS</option>
                </select>
              </label>
              <label className="space-y-1.5">
                <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">Qualification</span>
                <select value={qual} onChange={(e) => setQual(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-bold focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100">
                  <option>10th Pass</option><option>12th Pass</option><option>Graduate</option><option>Post Graduate</option><option>Diploma</option><option>ITI</option><option>Engineering</option><option>Medical</option>
                </select>
              </label>
              <label className="space-y-1.5">
                <span className="text-xs font-bold tracking-widest text-slate-500 uppercase">State</span>
                <input value={state} onChange={(e) => setState(e.target.value)} placeholder="e.g. Bihar" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-3 text-sm font-bold focus:border-blue-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100" />
              </label>
            </div>

            <div className="mt-6 space-y-3">
              {hints.map((h) => (
                <Link key={h.title} href={`/search?q=${encodeURIComponent(h.search || h.title)}`} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 hover:bg-white hover:border-blue-200 transition">
                  <div>
                    <div className="text-sm font-bold text-slate-900">{h.title}</div>
                    <div className="text-xs text-slate-500">{h.why} {cat !== "General" && "• + relaxation by category"}</div>
                  </div>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-white text-xs">→</span>
                </Link>
              ))}
            </div>
            <p className="mt-4 text-xs leading-relaxed text-slate-500">This is guidance, not a guarantee. Final eligibility is in the official notification’s age, qualification and domicile clauses — please verify.</p>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-3xl border border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50 p-6">
              <h3 className="text-sm font-bold text-slate-900">What next?</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">Tap a suggestion to search filtered jobs. Then use Age Calculator and Days Counter to confirm cut-off and last date.</p>
              <div className="mt-4 grid grid-cols-1 gap-2">
                <Link href="/tools/age-calculator" className="rounded-xl bg-white border border-slate-200 px-4 py-2.5 text-sm font-semibold text-center hover:border-blue-200">Open Age Calculator</Link>
                <Link href="/tools/days-counter" className="rounded-xl bg-white border border-slate-200 px-4 py-2.5 text-sm font-semibold text-center hover:border-blue-200">Check Days Left</Link>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-6">
              <h3 className="text-sm font-bold text-slate-900">Next steps</h3>
              <div className="mt-3 grid grid-cols-1 gap-2">
                <Link href="/category/latest-job" className="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white flex items-center justify-between hover:bg-slate-800">Browse latest jobs <span>→</span></Link>
                <Link href="/tools" className="text-xs font-bold text-slate-500 hover:text-slate-700 text-center">← Back to all tools</Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
