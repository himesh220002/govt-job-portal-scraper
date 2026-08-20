import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen pt-12 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 text-blue-600 shadow-inner">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            About Us
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Democratizing access to government job opportunities across India.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
          
          <div className="p-8 sm:p-12 space-y-8 text-slate-700 leading-relaxed text-lg">
            
            <p>
              Welcome to <strong>DeshJob.com</strong>, your one-stop destination for tracking the most crucial public sector opportunities in India. 
            </p>

            <p>
              Every year, millions of candidates spend countless hours navigating through dozens of poorly designed, slow, and confusing official websites just to find a simple PDF notification or an admit card link. <strong>We decided to fix that.</strong>
            </p>

            <div className="my-10 p-6 sm:p-8 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                Our Mission
              </h2>
              <p className="text-slate-700 text-lg">
                To build the fastest, most reliable, and beautifully designed search engine for Indian government jobs, exam results, and admissions. We believe that accessing public information shouldn't require a master's degree in web navigation.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-slate-900 mt-10 mb-4">
              How We Work
            </h2>
            <p>
              Our automated systems continuously scan and aggregate data from official government websites (like UPSC, SSC, state portals, and railways) the second it is published. We then categorize, tag, and organize this data into a searchable, ultra-fast interface that you can access from any device.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center transition-all hover:bg-white hover:shadow-lg hover:border-blue-100">
                <div className="flex justify-center mb-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Real-Time</h3>
                <p className="text-sm text-slate-600">Our scraper runs constantly to bring you updates as they happen.</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center transition-all hover:bg-white hover:shadow-lg hover:border-blue-100">
                <div className="flex justify-center mb-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Secure &amp; Free</h3>
                <p className="text-sm text-slate-600">No hidden fees, no shady tracking. Just free access to information.</p>
              </div>
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 text-center transition-all hover:bg-white hover:shadow-lg hover:border-blue-100">
                <div className="flex justify-center mb-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Mobile First</h3>
                <p className="text-sm text-slate-600">A premium interface that feels like a native app on your phone.</p>
              </div>
            </div>

            <hr className="my-10 border-slate-200" />

            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                Got Questions?
              </h2>
              <p className="mb-6">
                Check out our Frequently Asked Questions or read through our terms of service.
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/faq" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-600/30">
                  Read our FAQ
                </Link>
                <Link href="/terms" className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold border border-slate-200 rounded-xl transition-colors">
                  Terms &amp; Conditions
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
