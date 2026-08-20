import React from 'react';
import Link from 'next/link';

const FAQS = [
  {
    q: "Are you an official government website?",
    a: "No. We are an independent, private aggregator platform. We collect publicly available information from various official government portals and organize it into an easy-to-use search engine. We have no affiliation with any government entity."
  },
  {
    q: "Is it free to use this portal?",
    a: "Yes! 100% free. We will never ask you to pay for accessing job notifications, admit cards, or syllabi."
  },
  {
    q: "How fast is the data updated?",
    a: "Our automated scrapers run continuously in the background. When an official board (like UPSC or SSC) releases a new PDF or notification, it typically appears on our platform within minutes to a few hours."
  },
  {
    q: "Can I apply for jobs directly on this website?",
    a: "No. We only provide the information and links. When you click 'Apply Online' or 'Important Links' on our job pages, you will be securely redirected to the official government portal to complete your application."
  },
  {
    q: "What happens if a link is broken?",
    a: "Occasionally, official government websites go down due to high traffic (especially during result declarations). If a link doesn't work, it usually means the source server is down. Try again after a few hours."
  },
  {
    q: "Do you guarantee the accuracy of the dates and posts?",
    a: "While our systems accurately copy what is posted on official sites, typos or sudden date changes by the recruiting boards can happen. We highly recommend always double-checking the official PDF notification provided in the 'Important Links' section before acting."
  }
];

export default function FAQPage() {
  return (
    <div className="bg-slate-50 min-h-screen pt-12 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            ❓ Frequently Asked Questions
          </h1>
          <p className="text-lg text-slate-600">
            Everything you need to know about how we work.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {faq.q}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-600 mb-4">
            Still have questions? Check out our official terms and privacy policies.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/terms" className="text-blue-600 hover:text-blue-800 font-semibold underline underline-offset-4">
              Terms &amp; Conditions
            </Link>
            <span className="text-slate-300">|</span>
            <Link href="/privacy" className="text-blue-600 hover:text-blue-800 font-semibold underline underline-offset-4">
              Privacy Policy
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
