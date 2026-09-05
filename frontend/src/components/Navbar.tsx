"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import SearchBar from './SearchBar';

let BhashaSwitch: any;
if (typeof window !== 'undefined') {
  BhashaSwitch = require('bhasha-switch');
}

const NAV_LINKS = [
  { label: 'Home', href: '/', icon: '🏠' },
  { label: 'Latest Jobs', href: '/category/latest-job', icon: '💼' },
  { label: 'Admit Cards', href: '/category/admit-card', icon: '🎟️' },
  { label: 'Results', href: '/category/result', icon: '📊' },
  { label: 'Tools', href: '/tools', icon: '🛠️' },
  { label: 'Study Resources', href: '/resources', icon: '📚' },
];

function LogoMark() {
  return (
    <div className="h-11 w-11 sm:h-14 sm:w-14 rounded-full overflow-hidden shadow-md ring-2 ring-blue-500/20">
      <Image src="/logo/sarkarlinklogo.png" alt="SarkarLink" width={100} height={100} className="object-cover scale-120" priority />
    </div>
  );
}

export default function Navbar({ tickerItems = [] }: { tickerItems?: string[] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock background scrolling when mobile menu is open to prevent page jumps and scrollbar flickering
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Re-initialize language switcher whenever mobile menu opens/closes
  // BhashaSwitch automatically cleans up old instances and remembers the language
  useEffect(() => {
    if (BhashaSwitch) {
      // Small timeout to ensure the DOM elements are rendered
      const timer = setTimeout(() => {
        const containerSelector = open ? '#bhasha-nav-mobile-container' : '#bhasha-nav-container';

        // Ensure the container actually exists in the DOM before initializing
        if (document.querySelector(containerSelector)) {
          try {
            BhashaSwitch.init({
              container: containerSelector,
              accent: '#2563eb',
              radius: '9999px',
              border: '#e2e8f0',
              position: 'bottom-right'
            });
          } catch (e) {
            console.error('Failed to init bhasha-switch:', e);
          }
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [open, pathname]);

  return (
    <>
      {/* Announcement ticker */}
      <div className="bg-gradient-to-r from-blue-950 via-indigo-900 to-blue-950 text-white overflow-hidden border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center">
          <div className="relative flex-1 overflow-hidden py-2 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
            <div className="flex w-max animate-marquee gap-12 whitespace-nowrap px-6 text-xs sm:text-sm font-medium">
              {[...tickerItems, ...tickerItems].map((item, i) => (
                <span key={i} className="flex items-center gap-2 text-blue-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sticky glass navbar */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
          ? 'bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_8px_30px_-12px_rgba(15,23,42,0.15)]'
          : 'bg-white/70 backdrop-blur-md border-b border-slate-100'
          }`}
      >
        <nav className="max-w-7xl mx-auto flex h-16 md:h-[72px] items-center justify-between px-4 sm:px-6">
          {/* Brand */}
          <Link href="/" className="group flex items-center gap-3">
            <LogoMark />
            <div className="leading-tight">
              <span className="block font-display text-lg sm:text-xl font-extrabold tracking-tight text-slate-900">
                Sarkar<span className="text-gradient">Link</span>
              </span>
              <span className="block text-[11px] sm:text-xs font-medium tracking-wide text-slate-500">
                India's Govt Job Portal
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
                  className={`relative px-4 py-2 text-sm font-semibold transition-colors group ${active ? 'text-blue-700' : 'text-slate-600 hover:text-blue-700'
                    }`}
                >
                  {link.label}
                  <span
                    className={`absolute left-4 right-4 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-transform duration-300 origin-left ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-3">
            <div id="bhasha-nav-container" className="h-10 flex items-center justify-center"></div>
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
            aria-expanded={open}
            className={`lg:hidden relative flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 ${
              open 
                ? 'border-blue-500/50 bg-blue-600 text-white shadow-md shadow-blue-500/30' 
                : 'border-slate-200 bg-white text-slate-700 shadow-sm hover:border-blue-300 hover:text-blue-700'
            }`}
          >
            <div className="flex w-5 flex-col items-center justify-center gap-1.5">
              <span className={`h-0.5 rounded-full bg-current transition-all duration-300 ${open ? 'w-5 translate-y-2 rotate-45' : 'w-5'}`} />
              <span className={`h-0.5 rounded-full bg-current transition-all duration-300 ${open ? 'w-0 opacity-0' : 'w-4'}`} />
              <span className={`h-0.5 rounded-full bg-current transition-all duration-300 ${open ? 'w-5 -translate-y-2 -rotate-45' : 'w-3.5 self-start'}`} />
            </div>
          </button>
        </nav>

        {/* Mobile overlay menu - visually upgraded & scrollbar hidden */}
        <div
          className={`lg:hidden absolute top-full left-0 w-full bg-[#0b132b]/95 backdrop-blur-2xl border-t border-white/10 transition-all duration-300 ease-in-out no-scrollbar overflow-y-auto flex flex-col shadow-2xl ${
            open ? 'h-[calc(100vh-64px)] opacity-100 pointer-events-auto' : 'h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex flex-col p-5 sm:p-6 space-y-6 max-w-md mx-auto w-full no-scrollbar">
            {/* Search Bar section */}
            <div className="pt-2">
              <SearchBar variant="light" onSubmitted={() => setOpen(false)} />
            </div>

            {/* Mobile language switch container */}
            <div className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 shadow-inner">
              <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <span>🌐</span> Choose Language
              </span>
              <div id="bhasha-nav-mobile-container" className="h-9 flex items-center justify-center"></div>
            </div>

            {/* Navigation links */}
            <div className="flex flex-col gap-2 pt-1">
              <span className="px-1 text-[11px] font-bold text-blue-300 uppercase tracking-widest">
                Navigation
              </span>
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-semibold transition-all duration-200 ${
                      active
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-600/30 border border-blue-400/30 font-bold scale-[1.01]'
                        : 'text-slate-100 bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/20 active:scale-98'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xl">{link.icon}</span>
                      {link.label}
                    </span>
                    {active ? (
                      <span className="flex h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,1)]" />
                    ) : (
                      <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Call to action footer */}
            <div className="pt-4 border-t border-white/10 pb-8 mt-auto">
              <Link
                href="/category/latest-job"
                onClick={() => setOpen(false)}
                className="group relative flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 p-4 text-center text-base font-bold text-white shadow-xl shadow-blue-600/30 active:scale-95 transition-all overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Browse All Govt Jobs ⚡
                </span>
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/30 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
              </Link>
              <p className="text-center text-[11px] text-slate-400 mt-3 font-medium">
                Verified official notifications updated hourly
              </p>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}