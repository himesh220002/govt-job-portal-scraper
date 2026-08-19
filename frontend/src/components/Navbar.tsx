"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchBar from './SearchBar';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Latest Jobs', href: '/category/latest-job' },
  { label: 'Admit Cards', href: '/category/admit-card' },
  { label: 'Results', href: '/category/result' },
  { label: 'Study Resources', href: '/resources' },
];

const TICKER_ITEMS = [
  'SSC CGL 2026 Tier I dates announced',
  'UPSC Civil Services Prelims result released',
  'RRB NTPC CBT application window open',
  'SBI PO 2026 notification out',
  'New Delhi Railway recruitment 2026 live',
];

function LogoMark() {
  return (
    <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 shadow-lg shadow-blue-600/30 ring-1 ring-white/20 transition-transform duration-300 group-hover:scale-105">
      <span className="text-lg font-extrabold tracking-tight text-white">GJ</span>
      <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-blue-500/40 to-cyan-400/40 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
    </div>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="relative z-50">
      {/* Announcement ticker */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-900 to-blue-950 text-white overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center">
          <div className="relative flex-1 overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
            <div className="flex w-max animate-marquee gap-12 whitespace-nowrap px-6 text-xs sm:text-sm font-medium">
              {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                <span key={i} className="flex items-center gap-2 text-blue-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <Link
            href="/category/latest-job"
            className="hidden sm:flex shrink-0 items-center gap-1.5 pr-6 pl-4 text-xs font-bold uppercase tracking-wider text-cyan-300 hover:text-cyan-200 transition-colors"
          >
            View All
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Sticky glass navbar */}
      <div
        className={`sticky top-0 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/70 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.15)]'
            : 'bg-white/60 backdrop-blur-md border-b border-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto flex h-16 md:h-[72px] items-center justify-between px-4 sm:px-6">
          {/* Brand */}
          <Link href="/" className="group flex items-center gap-3">
            <LogoMark />
            <div className="leading-tight">
              <span className="block font-display text-lg sm:text-xl font-extrabold tracking-tight text-slate-900">
                Govt<span className="text-gradient">Jobs</span> Portal
              </span>
              <span className="block text-[11px] sm:text-xs font-medium tracking-wide text-slate-500">
                Your Gateway to Sarkari Success
              </span>
            </div>
          </Link>

          {/* Desktop links */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 text-sm font-semibold transition-colors group ${
                    active ? 'text-blue-700' : 'text-slate-600 hover:text-blue-700'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute left-4 right-4 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-transform duration-300 origin-left ${
                      active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/search"
              className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-slate-700 border border-slate-200 bg-white/70 hover:border-blue-300 hover:text-blue-700 transition-all shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
              Quick Search
            </Link>
            <Link
              href="/category/latest-job"
              className="group relative overflow-hidden rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:shadow-xl hover:shadow-blue-600/40 hover:scale-[1.03] active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Jobs
                <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan-400/40 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:border-blue-300 hover:text-blue-700"
          >
            <div className="flex w-5 flex-col items-end gap-1.5">
              <span className={`h-0.5 rounded-full bg-current transition-all duration-300 ${open ? 'w-5 translate-y-2 rotate-45' : 'w-5'}`} />
              <span className={`h-0.5 rounded-full bg-current transition-all duration-300 ${open ? 'w-0 opacity-0' : 'w-3.5'}`} />
              <span className={`h-0.5 rounded-full bg-current transition-all duration-300 ${open ? 'w-5 -translate-y-2 -rotate-45' : 'w-4'}`} />
            </div>
          </button>
        </nav>

        {/* Mobile menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            open ? 'max-h-[520px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="mx-4 mb-4 space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/5">
            <SearchBar variant="light" onSubmitted={() => setOpen(false)} />
            <div className="flex flex-col gap-1 pt-2">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                      active
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-blue-700'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/category/latest-job"
                onClick={() => setOpen(false)}
                className="mt-1 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-600/25"
              >
                Explore Jobs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}