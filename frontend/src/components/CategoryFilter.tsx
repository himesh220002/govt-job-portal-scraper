'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    
    if (newCategory === 'all') {
      params.delete('category');
    } else {
      params.set('category', newCategory);
    }
    
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-2">
      <select
        id="category-filter"
        value={currentCategory}
        onChange={handleCategoryChange}
        className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      >
        <option value="all">All Categories</option>
        <option value="Result">Result</option>
        <option value="Admit Card">Admit Card</option>
        <option value="Latest Job">Latest Job</option>
        <option value="Answer Key">Answer Key</option>
        <option value="Syllabus">Syllabus</option>
        <option value="Admission">Admission</option>
        <option value="Certificate">Certificate</option>
        <option value="Outsourcing/Offline Job">Outsourcing/Offline Job</option>
        <option value="Important">Important</option>
      </select>
    </div>
  );
}
