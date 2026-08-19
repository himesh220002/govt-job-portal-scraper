export default function Loading() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="relative overflow-hidden bg-[#050914] text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050914] via-[#0a1a3f] to-[#10255c]" />
        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-14 text-center">
          <div className="mx-auto h-6 w-56 animate-pulse rounded-full bg-white/10" />
          <div className="mx-auto mt-4 h-10 w-64 animate-pulse rounded-xl bg-white/10" />
          <div className="mx-auto mt-6 h-14 max-w-2xl animate-pulse rounded-full bg-white/10" />
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 sm:py-10">
        <div className="animate-pulse space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="h-4 w-2/3 rounded-full bg-slate-200" />
              <div className="mt-3 flex items-center gap-3">
                <div className="h-5 w-16 rounded-full bg-slate-200" />
                <div className="h-4 w-24 rounded-full bg-slate-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}