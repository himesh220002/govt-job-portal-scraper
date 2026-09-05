import FAQClient from "./FAQClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Your doubts, solved | SarkarLink",
  description:
    "Everything about SarkarLink — is it official, is it free, how quickly we update, how we sort and highlight what’s urgent, and how we take you straight to the official portal.",
};

const FAQS_JSONLD = [
  {
    q: "Are you an official government website?",
    a: "No. We are an independent aggregator. We collect publicly available information from official government portals and organize it into a fast search, linking directly to the official source.",
  },
  {
    q: "Is it free to use this portal?",
    a: "Yes, 100% free. We will never ask you to pay for notifications, admit cards or syllabi.",
  },
  {
    q: "How fast is the data updated?",
    a: "Our scanners run continuously. New official notifications typically appear within minutes to an hour, ranked by the official last-updated date.",
  },
  {
    q: "Can I apply for jobs directly on this website?",
    a: "No. We provide information and direct you securely to the official government portal to complete your application.",
  },
  {
    q: "What happens if a link is broken?",
    a: "Official sites often go down under heavy traffic. If a link fails, the source server is likely down — try again shortly.",
  },
  {
    q: "Do you guarantee accuracy?",
    a: "We copy official sources accurately, but boards can correct dates after publishing. Always double-check the official PDF linked on the job page.",
  },
  {
    q: "How do you decide what to show first?",
    a: "We lift what’s most time-sensitive to the top — newly updated notices and roles that are about to close — along with what matches your search.",
  },
  {
    q: "Will I miss a deadline?",
    a: "We highlight roles that are about to close and fresh updates with hints so you can act before the window shuts.",
  },
];

export default function FAQPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS_JSONLD.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO — premium dark */}
      <section className="relative overflow-hidden bg-[#070b1d] text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-[#070b1d] via-[#0c1d4a] to-[#1a3391]" />
        <div className="bg-grid-dark absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_75%_55%_at_50%_0%,black,transparent)]" />
        <div className="absolute -top-24 -left-24 h-[520px] w-[520px] rounded-full bg-blue-600/25 blur-[130px] animate-blob" />
        <div className="absolute -bottom-32 -right-24 h-[520px] w-[520px] rounded-full bg-cyan-400/20 blur-[130px] animate-blob [animation-delay:2s]" />
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/15 blur-[120px] animate-blob [animation-delay:4s]" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-12 pb-10 sm:pt-16 sm:pb-12">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-widest text-cyan-100 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
              </span>
              HELP CENTRE
            </span>

            <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
              Clear answers, <span className="shimmer-text">without the jargon</span>.
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-blue-100/80 sm:text-base">
              How we find updates, why you can trust what you see, and how we get you to the official page — quickly, honestly, and without keeping you here longer than needed.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-blue-100">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live — 14 answers
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur">⚡ What’s new rises first</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 backdrop-blur">↗ One tap to official</span>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 -bottom-[1px] leading-none">
          <svg className="block h-[36px] w-full sm:h-[52px]" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0,28 C240,60 480,0 720,20 C960,40 1200,60 1440,28 L1440,60 L0,60 Z" fill="#f8fafc" />
          </svg>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-10">
        <FAQClient />
      </section>
    </div>
  );
}
