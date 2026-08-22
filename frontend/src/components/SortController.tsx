'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function SortController() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentSort = searchParams.get('sort') || 'newest';

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', newSort);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <label htmlFor="sort-select" className="text-sm font-medium text-slate-600 hidden sm:block">
        Sort by:
      </label>
      <select
        id="sort-select"
        value={currentSort}
        onChange={handleSortChange}
        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
        <option value="a-z">Title (A-Z)</option>
        <option value="z-a">Title (Z-A)</option>
      </select>
    </div>
  );
}
