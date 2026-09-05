"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type FAQ = {
  q: string;
  a: string;
  category: string;
};

const CATEGORIES = [
  { id: "all", label: "All", icon: "✦" },
  { id: "essentials", label: "Essentials", icon: "◉" },
  { id: "trust", label: "Trust & Accuracy", icon: "🛡️" },
  { id: "speed", label: "Speed & Timing", icon: "⚡" },
  { id: "using", label: "Using SarkarLink", icon: "🧭" },
  { id: "support", label: "Support", icon: "🤝" },
] as const;

const FAQS: FAQ[] = [
  // Essentials
  {
    category: "essentials",
    q: "Are you an official government website?",
    a: "No — and we want to be upfront about it. SarkarLink is an independent place that gathers publicly available information from official portals (UPSC, SSC, Railway, state boards and 50+ more) and puts it into one simple, fast search. We’re not part of any government body. Every card links you directly to the official PDF or portal so you can verify and apply there.",
  },
  {
    category: "essentials",
    q: "Is SarkarLink really 100% free — forever?",
    a: "Yes. Every job notification, admit card, result, answer key and syllabus is free and will stay free. We don’t sell forms, we don’t hide PDFs behind a login, and we’ll never ask you to pay to see an update. If someone asks for money in our name, it’s not us — please let us know.",
  },
  {
    category: "essentials",
    q: "Why use SarkarLink instead of checking each official site myself?",
    a: "Because official sites are reliable but often slow, inconsistent and hard to use on a phone — especially on result days. We bring 100+ sources into one clean search, put what’s new and what’s about to close at the top, and take you to the official link in one tap. We don’t keep you here; we get you where you need to go, faster.",
  },
  // Trust
  {
    category: "trust",
    q: "How do you make sure dates and details are correct?",
    a: "We copy exactly what the official notification says and show you the official ‘last updated’ date. But boards sometimes correct a date after publishing — that’s why every page keeps the source PDF and link front and centre. Please give the official notification a final check before you act. We’d rather be careful than flashy.",
  },
  {
    category: "trust",
    q: "Do you store or sell my personal data?",
    a: "You don’t need an account to browse or apply, and we don’t sell data or spam you. When you tap ‘Apply Online’ you leave SarkarLink for the official government portal — your application lives there, not with us. We use only minimal, anonymous analytics to keep the site fast and useful. See Privacy Policy for details.",
  },
  {
    category: "trust",
    q: "What if an official link is broken or won’t load?",
    a: "On result days, official servers often struggle with the rush — that’s not on our side. If a link fails, the source server is likely busy. Wait a few minutes and try again, or try the direct PDF link if we have it. We re-check links through the day and mark anything that looks stale.",
  },
  // Speed & Timing
  {
    category: "speed",
    q: "How quickly does a new notification appear here?",
    a: "We check official boards continuously. Once a board publishes something, it usually shows up here within minutes to an hour — depending on that board’s site speed and format. We pay attention to both when we saw it and when the board says it was updated, so what you see is truly the newest.",
  },
  {
    category: "speed",
    q: "How do you decide what to show first?",
    a: "Not just by when we saw it. We gently lift what’s most time-sensitive to the top — newly updated notices and roles that are about to close — along with what matches your search. Look for the ‘New Update’ and ‘Closing Soon’ hints. The idea is simple: you see it while there’s still time to do something about it.",
  },
  {
    category: "speed",
    q: "I’m worried I’ll miss a deadline. How do you help?",
    a: "That worry is exactly why we built the homepage the way we did. Roles that are about to close are highlighted, fresh changes get an ‘Updated’ mark, and the feed is sorted so the urgent doesn’t get buried. Make ‘Latest Jobs’ a daily 2-minute habit and try filters like ‘SSC’, ‘Railway’ or ‘Teaching’ to keep an eye on your lane. We give the nudge early — you take the step calmly.",
  },
  {
    category: "speed",
    q: "Why do admit cards and results sometimes feel delayed?",
    a: "We can only show what the board has made public. Many boards release admit cards and results in batches and their sites throttle under load. We pick them up within minutes of them being public, but if a board staggers by centre or roll number, the next batch will appear as soon as it’s out.",
  },
  // Using
  {
    category: "using",
    q: "Can I apply for jobs directly on SarkarLink?",
    a: "No — and that’s on purpose. We don’t want to be a middleman with your future on the line. We give you clear, organized information and then send you straight to the official portal to fill the form and pay fees. That keeps your application official, traceable and safe — exactly as the board intended.",
  },
  {
    category: "using",
    q: "Can I filter jobs by qualification, state or category?",
    a: "Yes. Try the search bar on the homepage — ‘10th pass’, ‘Graduate’, ‘Uttar Pradesh’, ‘Bank PO’ all work — and explore the category pages (Latest Job, Admit Card, Result, Syllabus and more). Each post is tagged so what matches your need comes up quickly. We’re working on even finer filters for qualification and state.",
  },
  {
    category: "using",
    q: "How do admit cards, answer keys and syllabi work here?",
    a: "We follow the whole journey of an exam, not just the first alert. When a board releases an admit card, answer key or syllabus PDF, we put it in the right shelf, keep the official link, and bring it near the top while it’s fresh — so you can move from notification to admit card to answer key to result without hunting across ten sites.",
  },
  // Support
  {
    category: "support",
    q: "I found something wrong or out of date — how do I tell you?",
    a: "Thank you for looking out — when you flag something, you help the next person too. Go to Contact, share the job title, link and what needs fixing (or the correct official PDF if you have it). We read these quickly and correct the page. Many fixes have come from readers like you.",
  },
  {
    category: "support",
    q: "Can you help me find an old notification or syllabus?",
    a: "Try Search first — we keep a history of titles. For very old or removed official PDFs, check the ‘Important Links’ section on the job page. If the board has taken the file down, we can only show the last information we have. If you’re stuck, write to us and we’ll help you trace it to the source.",
  },
];

function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const q = query.trim().toLowerCase();
  const idx = text.toLowerCase().indexOf(q);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="bg-amber-100 text-amber-900 rounded px-0.5">{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  );
}

export default function FAQClient() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("all");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return FAQS.filter((f) => {
      const catMatch = activeCat === "all" || f.category === activeCat;
      if (!catMatch) return false;
      if (!q) return true;
      return f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
    });
  }, [query, activeCat]);

  const grouped = useMemo(() => {
    if (activeCat !== "all") return [{ id: activeCat, items: filtered }];
    const map = new Map<string, FAQ[]>();
    filtered.forEach((f) => {
      if (!map.has(f.category)) map.set(f.category, []);
      map.get(f.category)!.push(f);
    });
    return Array.from(map.entries()).map(([id, items]) => ({ id, items }));
  }, [filtered, activeCat]);

  return (
    <div>
      {/* Search + categories */}
      <div className="rounded-3xl border border-slate-200 bg-white p-4 sm:p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 110-15 7.5 7.5 0 010 15z" /></svg>
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search FAQs — try ‘official’, ‘deadline’, ‘admit card’..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-10 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-blue-300 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 transition"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-xl bg-slate-900 text-white hover:bg-slate-700 transition"
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          <div className="text-xs font-semibold text-slate-500 sm:text-right">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-50 border border-slate-200 px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              {filtered.length} {filtered.length === 1 ? "result" : "results"}
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
          {CATEGORIES.map((c) => {
            const active = activeCat === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCat(c.id)}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-bold tracking-wide transition-all ${
                  active
                    ? "bg-slate-900 text-white border-slate-900 shadow-md"
                    : "bg-white text-slate-600 border-slate-200 hover:border-blue-200 hover:text-blue-700"
                }`}
              >
                <span className={`text-[10px] ${active ? "text-cyan-300" : "text-slate-400"}`}>{c.icon}</span>
                {c.label}
                {c.id !== "all" && (
                  <span className={`ml-1 rounded-full px-1.5 py-0.5 text-[10px] ${active ? "bg-white/15 text-white" : "bg-slate-100 text-slate-600"}`}>
                    {FAQS.filter((f) => f.category === c.id).length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Gentle explainer — feelings, not labels */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white text-xs">◉</div>
          <div className="mt-3 text-xs font-bold tracking-widest text-blue-700 uppercase">Before you miss it</div>
          <div className="mt-1 text-sm font-bold text-slate-900">What’s urgent rises first</div>
          <div className="mt-1 text-xs leading-relaxed text-slate-600">Fresh updates and closing dates move to the top — so you can act calmly, not anxiously.</div>
        </div>
        <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-teal-50 p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white text-xs">↗</div>
          <div className="mt-3 text-xs font-bold tracking-widest text-emerald-700 uppercase">Straight to the source</div>
          <div className="mt-1 text-sm font-bold text-slate-900">One tap to the official page</div>
          <div className="mt-1 text-xs leading-relaxed text-slate-600">We don’t keep you here. We get you where your application truly counts.</div>
        </div>
        <div className="rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 to-orange-50 p-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-600 text-white text-xs">♥</div>
          <div className="mt-3 text-xs font-bold tracking-widest text-amber-700 uppercase">You help the next person</div>
          <div className="mt-1 text-sm font-bold text-slate-900">Spotted something? Tell us</div>
          <div className="mt-1 text-xs leading-relaxed text-slate-600">Every correction you share makes the path clearer for thousands behind you.</div>
        </div>
      </div>

      {/* FAQ list */}
      <div className="mt-8 space-y-8">
        {grouped.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-10 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">?</div>
            <h3 className="mt-4 font-display text-lg font-bold text-slate-900">No results for “{query}”</h3>
            <p className="mt-1 text-sm text-slate-600">Try a different word or browse a category. Or write to us — we’ll answer directly.</p>
            <div className="mt-5 flex justify-center gap-3">
              <button onClick={() => { setQuery(""); setActiveCat("all"); }} className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white hover:bg-slate-800">Clear filters</button>
              <Link href="/contact" className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50">Contact support</Link>
            </div>
          </div>
        ) : (
          grouped.map((group) => {
            const catMeta = CATEGORIES.find((c) => c.id === group.id);
            return (
              <div key={group.id}>
                {activeCat === "all" && (
                  <div className="mb-3 flex items-center gap-3">
                    <h2 className="font-display text-sm font-extrabold tracking-widest text-slate-500 uppercase flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-xl bg-slate-900 text-white text-xs">{catMeta?.icon}</span>
                      {catMeta?.label}
                    </h2>
                    <span className="h-px flex-1 bg-slate-200" />
                    <span className="text-xs font-bold text-slate-400">{group.items.length}</span>
                  </div>
                )}
                <div className="space-y-3">
                  {group.items.map((faq) => {
                    const globalIdx = FAQS.indexOf(faq);
                    const isOpen = openIdx === globalIdx;
                    return (
                      <div
                        key={faq.q}
                        className={`group relative overflow-hidden rounded-2xl border bg-white transition-all ${
                          isOpen ? "border-blue-200 shadow-lg shadow-blue-600/5" : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
                        }`}
                      >
                        {isOpen && <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-600 to-cyan-400" />}
                        <button
                          onClick={() => setOpenIdx(isOpen ? null : globalIdx)}
                          className="flex w-full items-center gap-4 p-5 sm:p-6 text-left"
                          aria-expanded={isOpen}
                        >
                          <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-xs font-bold transition-colors ${isOpen ? "bg-blue-600 text-white border-blue-600 shadow-md" : "bg-slate-50 text-slate-600 border-slate-200 group-hover:bg-white"}`}>
                            {isOpen ? "—" : "+"}
                          </span>
                          <span className={`flex-1 font-display text-[15px] font-bold leading-snug sm:text-base ${isOpen ? "text-slate-900" : "text-slate-800"}`}>
                            <Highlight text={faq.q} query={query} />
                          </span>
                          <span className={`hidden sm:flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all ${isOpen ? "bg-slate-900 text-white border-slate-900 rotate-180" : "bg-white text-slate-400 border-slate-200"}`}>
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                          </span>
                        </button>
                        <div
                          className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                        >
                          <div className="overflow-hidden">
                            <div className="px-5 pb-5 sm:px-6 sm:pb-6 sm:pl-[68px]">
                              <p className="text-sm leading-relaxed text-slate-600">
                                <Highlight text={faq.a} query={query} />
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Bottom CTA */}
      <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-display text-lg font-extrabold text-slate-900">Still have a question?</h3>
            <p className="mt-1 text-sm text-slate-600 max-w-xl">
              We’re listening — the platform gets better every time someone asks. If you don’t see it here, reach out. We’ll reply, and everyone benefits.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-lg hover:bg-slate-800 active:scale-95 transition">
              Contact Support
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link href="/about" className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50 active:scale-95 transition">
              About SarkarLink
            </Link>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold">
          <Link href="/terms" className="rounded-full bg-slate-50 border border-slate-200 px-3 py-1.5 text-slate-600 hover:bg-white">Terms & Conditions</Link>
          <Link href="/privacy" className="rounded-full bg-slate-50 border border-slate-200 px-3 py-1.5 text-slate-600 hover:bg-white">Privacy Policy</Link>
          <span className="inline-flex items-center rounded-full bg-amber-50 border border-amber-200 px-3 py-1.5 text-amber-700">✦ Tip: Always double-check the official PDF before applying</span>
        </div>
      </div>
    </div>
  );
}
