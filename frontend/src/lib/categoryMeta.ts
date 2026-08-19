export const CATEGORY_META: Record<string, { icon: string; header: string; badge: string; bar: string }> = {
  'Result': { icon: '🏆', header: 'from-emerald-600 to-teal-600', badge: 'bg-emerald-50 text-emerald-700 border-emerald-200', bar: 'bg-emerald-500' },
  'Admit Card': { icon: '🎫', header: 'from-amber-500 to-orange-600', badge: 'bg-amber-50 text-amber-700 border-amber-200', bar: 'bg-amber-500' },
  'Latest Job': { icon: '💼', header: 'from-blue-600 to-indigo-600', badge: 'bg-blue-50 text-blue-700 border-blue-200', bar: 'bg-blue-500' },
  'Answer Key': { icon: '🔑', header: 'from-rose-500 to-pink-600', badge: 'bg-rose-50 text-rose-700 border-rose-200', bar: 'bg-rose-500' },
  'Syllabus': { icon: '📘', header: 'from-violet-600 to-purple-600', badge: 'bg-violet-50 text-violet-700 border-violet-200', bar: 'bg-violet-500' },
  'Admission': { icon: '🏫', header: 'from-cyan-500 to-sky-600', badge: 'bg-cyan-50 text-cyan-700 border-cyan-200', bar: 'bg-cyan-500' },
  'Certificate': { icon: '📜', header: 'from-teal-600 to-emerald-600', badge: 'bg-teal-50 text-teal-700 border-teal-200', bar: 'bg-teal-500' },
  'Important': { icon: '⭐', header: 'from-orange-500 to-red-500', badge: 'bg-orange-50 text-orange-700 border-orange-200', bar: 'bg-orange-500' },
  'Outsourcing/Offline Job': { icon: '🏗️', header: 'from-slate-600 to-slate-800', badge: 'bg-slate-100 text-slate-700 border-slate-300', bar: 'bg-slate-500' },
};

export const DEFAULT_CATEGORY_META = { icon: '📋', header: 'from-blue-600 to-indigo-600', badge: 'bg-blue-50 text-blue-700 border-blue-200', bar: 'bg-blue-500' };

export function categoryMeta(category?: string) {
  return CATEGORY_META[category || ''] || DEFAULT_CATEGORY_META;
}