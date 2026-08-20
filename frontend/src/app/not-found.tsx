import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="bg-slate-50 min-h-[calc(100vh-72px)] flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        
        {/* Animated 404 text */}
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
          <h1 className="relative text-8xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 tracking-tighter drop-shadow-sm">
            404
          </h1>
        </div>

        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
          Oops! Page Not Found
        </h2>
        
        <p className="text-slate-600 text-base md:text-lg mb-10 max-w-lg mx-auto leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. Don't worry, we'll help you get back on track!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex justify-center items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all hover:shadow-xl hover:shadow-blue-600/40 hover:scale-[1.03] active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </Link>
          <Link
            href="/search"
            className="w-full sm:w-auto inline-flex justify-center items-center gap-2 rounded-xl bg-white border border-slate-200 px-8 py-3.5 text-sm font-bold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:text-blue-700 hover:border-blue-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search Jobs
          </Link>
        </div>

      </div>
    </div>
  );
}
