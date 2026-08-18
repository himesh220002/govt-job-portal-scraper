"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative group">
      <input 
        type="text" 
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search exams, jobs, results..." 
        className="w-full bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-blue-200 rounded-full py-3 px-6 outline-none focus:bg-white/20 focus:border-cyan-300 transition-all shadow-inner"
      />
      <button 
        type="submit" 
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-cyan-500 hover:bg-cyan-400 text-blue-900 font-bold rounded-full px-6 py-2 transition-colors shadow-md"
      >
        Search
      </button>
    </form>
  );
}
