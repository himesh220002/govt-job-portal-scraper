import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: 'Preparation Resources | GovtJobs Portal',
  description: 'Official study material, PYQs, and preparation platforms for government exams.',
};

const CATEGORIES = [
  {
    id: 'study-materials',
    title: 'Official Study Material Sources',
    icon: '📚',
    gradient: 'from-blue-600 to-indigo-600',
    resources: [
      {
        name: 'NCERT Online Textbooks',
        desc: 'Free PDFs for Classes I–XII in Hindi, English, Urdu. Foundation for UPSC, SSC, Banking.',
        url: 'https://ncert.nic.in/textbook.php'
      },
      {
        name: 'DIKSHA Platform',
        desc: 'Ministry of Education’s digital platform with NCERT video lessons, practice questions, teacher resources.',
        url: 'https://diksha.gov.in'
      },
      {
        name: 'SWAYAM Courses',
        desc: 'Free online courses from IITs, IIMs, universities. Useful for UPSC optional subjects, management, engineering.',
        url: 'https://swayam.gov.in'
      },
      {
        name: 'e‑Pathshala App',
        desc: 'NCERT’s mobile app with textbooks, audio, video, offline access.',
        url: 'https://epathshala.nic.in'
      },
      {
        name: 'PRS Legislative Research',
        desc: 'Simplified summaries of Bills, Acts, policies. Excellent for Polity and Governance prep.',
        url: 'https://prsindia.org'
      },
      {
        name: 'Economic Survey of India',
        desc: 'Official government publication, essential for UPSC/Banking economy sections.',
        url: 'https://www.indiabudget.gov.in'
      }
    ]
  },
  {
    id: 'pyqs',
    title: 'Previous Year Question Papers (PYQs)',
    icon: '📝',
    gradient: 'from-emerald-600 to-teal-600',
    resources: [
      {
        name: 'SSC Official Website',
        desc: 'Direct PDFs of SSC CGL, CHSL, MTS, etc.',
        url: 'https://ssc.gov.in'
      },
      {
        name: 'UPSC Official Website',
        desc: 'Authentic UPSC Prelims and Mains papers.',
        url: 'https://upsc.gov.in'
      },
      {
        name: 'IBPS Official Website',
        desc: 'Banking exam papers (PO, Clerk, SO).',
        url: 'https://ibps.in'
      },
      {
        name: 'NTA Exams Portal',
        desc: 'NEET, JEE, UGC NET previous year papers.',
        url: 'https://nta.ac.in'
      },
      {
        name: 'Railway Recruitment Board (RRB)',
        desc: 'NTPC, Group D, ALP PYQs.',
        url: 'https://indianrailways.gov.in'
      }
    ]
  },
  {
    id: 'preparation',
    title: 'Syllabus Sources',
    icon: '📘',
    gradient: 'from-amber-500 to-orange-600',
    resources: [
      {
        name: 'UPSC Official Syllabus',
        desc: 'Prelims and Mains syllabus PDFs.',
        url: 'https://upsc.gov.in'
      },
      {
        name: 'SSC Official Syllabus',
        desc: 'SSC CGL, CHSL, MTS, etc.',
        url: 'https://ssc.gov.in'
      },
      {
        name: 'IBPS Syllabus',
        desc: 'Banking exam syllabus (PO, Clerk, SO).',
        url: 'https://ibps.in'
      },
      {
        name: 'NTA Syllabus',
        desc: 'NEET, JEE, UGC NET syllabus PDFs.',
        url: 'https://nta.ac.in'
      },
      {
        name: 'State PSC Websites',
        desc: 'Each state PSC (e.g., BPSC, MPPSC, UPPSC) publishes official syllabus PDFs.',
        url: '#'
      }
    ]
  }
];

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-[#050914] text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-[#050914] via-[#0a1a3f] to-[#10255c]" />
        <div className="bg-grid-dark absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-20 left-1/4 h-64 w-64 rounded-full bg-blue-600/30 blur-[100px] animate-blob" />
        <div className="absolute top-0 right-1/5 h-56 w-56 rounded-full bg-cyan-400/20 blur-[100px] animate-blob [animation-delay:2s]" />

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 py-14 sm:py-20 text-center">
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            Essential <span className="text-cyan-400">Preparation</span> Resources
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-blue-100/80 leading-relaxed">
            Curated study materials, previous year question papers, and top preparation platforms to accelerate your journey to success.
          </p>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 leading-none">
          <svg className="block h-8 w-full sm:h-12" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,30 C360,58 1080,6 1440,34 L1440,60 L0,60 Z" fill="#eef2ff" opacity="0.6" />
            <path d="M0,40 C360,60 1080,20 1440,44 L1440,60 L0,60 Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-12">
        <div className="space-y-16">
          {CATEGORIES.map((category) => (
            <div key={category.id} id={category.id} className="scroll-mt-24">
              <div className="mb-6 flex items-center gap-4">
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${category.gradient} text-2xl text-white shadow-lg`}>
                  {category.icon}
                </span>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  {category.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.resources.map((res, i) => (
                  <a
                    key={i}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-600/10"
                  >
                    <div className="absolute top-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 group-hover:w-full" />

                    <div>
                      <h3 className="mb-3 text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                        {res.name}
                      </h3>
                      <p className="text-sm leading-relaxed text-slate-600">
                        {res.desc}
                      </p>
                    </div>

                    <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-blue-600">
                      Visit Platform
                      <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
