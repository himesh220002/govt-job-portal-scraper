import Link from 'next/link';

const topExams = [
  { title: "UPSC Civil Services Exam (CSE)", fact: "Prelims May 24, Mains Aug 21, 2026", link: "/category/latest-job" },
  { title: "SSC CGL 2026", fact: "Tier I June–July 2026", link: "/category/latest-job" },
  { title: "SBI PO 2026", fact: "Prelims Aug 22–23, 2026", link: "/category/latest-job" },
  { title: "RRB NTPC 2026", fact: "CBT May–June 2026", link: "/category/latest-job" },
  { title: "NDA I & II 2026", fact: "April 12 & Sept 13, 2026", link: "/category/latest-job" },
];

const topJobs = [
  { title: "IAS/IPS/IFS", fact: "Most prestigious civil services roles", link: "/category/latest-job" },
  { title: "SSC CGL Posts", fact: "Income Tax Inspector, Audit Officer", link: "/category/latest-job" },
  { title: "IBPS PO & Clerk", fact: "Banking sector jobs", link: "/category/latest-job" },
];

const topAdmissions = [
  { title: "IIT Bombay", fact: "Median package ₹20.2 LPA", link: "/category/admission" },
  { title: "IIT Delhi", fact: "Median package ₹19.08 LPA", link: "/category/admission" },
  { title: "IIT Madras", fact: "Median package ₹17.78 LPA", link: "/category/admission" },
];

const latestAnswerKeys = [
  { title: "UGC NET June 2026", fact: "Released Aug 16, 2026", link: "/category/answer-key", cta: "Download Key" },
  { title: "UPSC Prelims 2026", fact: "Released May 27, 2026", link: "/category/answer-key", cta: "Download Key" },
];

const topSyllabus = [
  { title: "UPSC CSE Syllabus", fact: "Prelims & Mains (9 papers)", link: "/category/syllabus", cta: "View Syllabus" },
  { title: "SSC CGL Syllabus", fact: "Tier I & II (Reasoning, GK, Quant)", link: "/category/syllabus", cta: "View Syllabus" },
  { title: "RRB NTPC Syllabus", fact: "CBT 1 & 2 (Maths, Reasoning)", link: "/category/syllabus", cta: "View Syllabus" },
];

const Card = ({ title, fact, link, cta = "View Details", variant = "default" }: any) => {
  const styles = {
    default: "bg-white border border-gray-100 hover:border-blue-300",
    highlight: "bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 hover:border-blue-400",
  };
  
  return (
    <div className={`p-5 rounded-2xl shadow-sm hover:shadow-md transition-all group flex flex-col justify-between h-full ${styles[variant as keyof typeof styles]}`}>
      <div>
        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors line-clamp-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{fact}</p>
      </div>
      <Link href={link} className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-800">
        {cta} <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
      </Link>
    </div>
  );
};

export default function HeroSection() {
  return (
    <section className="py-12 bg-gray-50/50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-blue-100 text-blue-800 p-2 rounded-lg text-xl">🎓</span>
            <h2 className="text-2xl font-extrabold text-gray-900">Top 5 Government Exams (India, 2026)</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {topExams.map((item, i) => <Card key={i} {...item} variant="highlight" />)}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-indigo-100 text-indigo-800 p-2 rounded-lg text-xl">💼</span>
              <h2 className="text-2xl font-extrabold text-gray-900">Top Government Jobs</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-[calc(100%-4rem)]">
              {topJobs.map((item, i) => <Card key={i} {...item} />)}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-emerald-100 text-emerald-800 p-2 rounded-lg text-xl">🏫</span>
              <h2 className="text-2xl font-extrabold text-gray-900">Top Admissions</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-[calc(100%-4rem)]">
              {topAdmissions.map((item, i) => <Card key={i} {...item} />)}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-rose-100 text-rose-800 p-2 rounded-lg text-xl">📑</span>
              <h2 className="text-2xl font-extrabold text-gray-900">Latest Answer Keys</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-[calc(100%-4rem)]">
              {latestAnswerKeys.map((item, i) => <Card key={i} {...item} />)}
            </div>
          </div>
          <div className="lg:col-span-3">
            <div className="flex items-center gap-3 mb-6">
              <span className="bg-amber-100 text-amber-800 p-2 rounded-lg text-xl">📘</span>
              <h2 className="text-2xl font-extrabold text-gray-900">Top Exam Syllabus</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-[calc(100%-4rem)]">
              {topSyllabus.map((item, i) => <Card key={i} {...item} />)}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
