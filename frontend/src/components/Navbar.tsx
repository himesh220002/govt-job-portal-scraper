import Link from 'next/link';

import SearchBar from './SearchBar';

export default function Navbar() {
  return (
    <header className="h-[200px] bg-gradient-to-r from-blue-900 via-indigo-800 to-blue-900 text-white shadow-xl relative overflow-hidden">
      {/* Abstract decorative shapes */}
      <div className="absolute top-[-50px] left-[-50px] w-48 h-48 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
      <div className="absolute top-0 right-[-50px] w-64 h-64 bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-20 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>

      <div className="max-w-7xl mx-auto h-full px-6 flex flex-col justify-center relative z-10">
        <div className="flex justify-between items-center w-full">
          {/* Logo / Brand */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center shadow-lg group-hover:bg-white/20 transition-all">
              <span className="text-2xl font-bold text-cyan-300">GJ</span>
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-200">
                GovtJobs Portal
              </h1>
              <p className="text-blue-200 font-medium tracking-wide mt-1 text-sm md:text-base">
                Your Gateway to Sarkari Success
              </p>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex gap-6 items-center">
            <Link href="/" className="text-white hover:text-cyan-300 font-semibold transition-colors">Home</Link>
            <Link href="/category/latest-job" className="text-white hover:text-cyan-300 font-semibold transition-colors">Latest Jobs</Link>
            <Link href="/category/admit-card" className="text-white hover:text-cyan-300 font-semibold transition-colors">Admit Cards</Link>
            <Link href="/category/result" className="text-white hover:text-cyan-300 font-semibold transition-colors">Results</Link>
          </nav>
        </div>

        {/* Optional Search / Quick Action Bar */}
        <div className="mt-8 max-w-2xl mx-auto w-full">
           <SearchBar />
        </div>
      </div>
    </header>
  );
}
