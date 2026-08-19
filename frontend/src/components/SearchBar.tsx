"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar({
  variant = "dark",
  onSubmitted,
  initialQuery = "",
}: {
  variant?: "dark" | "light";
  onSubmitted?: () => void;
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      onSubmitted?.();
    }
  };

  const isDark = variant === "dark";

  return (
    <form onSubmit={handleSearch} className="relative group w-full">
      <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg
          className={`w-5 h-5 ${isDark ? 'text-cyan-300' : 'text-slate-400'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="7"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search exams, jobs, results, admit cards..."
        className={`w-full rounded-full pl-13 pr-36 py-4 outline-none text-base transition-all duration-300 shadow-lg ${
          isDark
            ? "bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-slate-300 focus:bg-white/15 focus:border-cyan-300 focus:shadow-cyan-500/20"
            : "bg-white border border-slate-200 text-slate-900 placeholder-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
        }`}
      />

      <button
        type="submit"
        className={`absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-2 rounded-full px-6 py-2.5 font-semibold text-sm transition-all duration-300 shadow-md ${
          isDark
            ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white hover:from-cyan-300 hover:to-blue-400 hover:shadow-lg hover:shadow-cyan-500/30 active:scale-95"
            : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 hover:shadow-lg hover:shadow-blue-500/30 active:scale-95"
        }`}
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="7"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        Search
      </button>
    </form>
  );
}