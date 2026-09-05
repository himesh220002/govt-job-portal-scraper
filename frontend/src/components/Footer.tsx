import Link from 'next/link';
import Image from 'next/image';
import clientPromise from '@/lib/mongodb';

const quickLinks = [
  { label: 'Home', href: '/' },
  { label: 'Latest Jobs', href: '/category/latest-job' },
  { label: 'Admit Cards', href: '/category/admit-card' },
  { label: 'Results', href: '/category/result' },
  { label: 'Answer Keys', href: '/category/answer-key' },
  { label: 'Useful Tools', href: '/tools' },
  { label: 'About Us', href: '/about' },
  { label: 'FAQ', href: '/faq' },
];

const categories = [
  { label: 'Syllabus', href: '/category/syllabus' },
  { label: 'Admission', href: '/category/admission' },
  { label: 'Certificate', href: '/category/certificate' },
  { label: 'Important', href: '/category/important' },
  { label: 'Outsourcing Jobs', href: '/category/outsourcing-offline-job' },
];

const resources = [
  { label: 'SSC CGL 2026', href: '/search?q=SSC+CGL' },
  { label: 'UPSC Civil Services', href: '/search?q=UPSC' },
  { label: 'Railway Recruitment', href: '/search?q=Railway' },
  { label: 'Banking Exams', href: '/search?q=Bank' },
  { label: 'Teaching Jobs', href: '/search?q=TET' },
];

const socials = [
  {
    label: 'Telegram',
    href: '/search?q=telegram',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
      </svg>
    ),
  },
  {
    label: 'WhatsApp',
    href: '/search?q=whatsapp',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: '/search?q=instagram',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: '/search?q=youtube',
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default async function Footer() {
  const client = await clientPromise;
  const db = client.db('govtJobScraperDB');
  const latestJob = await db.collection('scraper')
    .find({})
    .sort({ updatedAt: -1 })
    .project({ updatedAt: 1 })
    .limit(1)
    .toArray();

  const lastScraped = latestJob.length > 0 && latestJob[0].updatedAt
    ? new Date(latestJob[0].updatedAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : 'Unknown';

  return (
    <footer className="relative overflow-hidden bg-[#070b1d] text-slate-300">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1330] via-[#0d1f4e] to-[#1e3a8a]" />
      <div className="bg-grid-dark absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_100%,black,transparent)]" />
      <div className="absolute -top-24 left-1/4 h-72 w-72 rounded-full bg-blue-600/20 blur-[120px] animate-blob" />
      <div className="absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-cyan-400/15 blur-[120px] animate-blob [animation-delay:3s]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 pt-16 pb-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="group flex items-center gap-3">
              <div className="h-12 w-12 lg:h-22 lg:w-22 rounded-full overflow-hidden">
                <Image src="/logo/sarkarlinklogo.png" alt="SarkarLink" width={100} height={100} className="object-cover scale-120" priority />
              </div>
              <div className="leading-tight">
                <span className="block font-display text-lg xl:text-2xl font-extrabold tracking-tight text-white">
                  Sarkar<span className="text-gradient">Link</span>
                </span>
                <span className="block text-xs xl:text-base font-medium text-blue-200/70">
                  India's Govt Job Portal
                </span>
              </div>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-relaxed text-blue-100/70">
              SarkarLink is India&apos;s most trusted destination for Sarkari Naukri and Govt Jobs. Get real-time updates for Sarkari Result, Sarkari Exam, admit cards, and syllabus. Whether you need Sarkari Result 2026, Sarkari Network updates, or Sarkari Job Find, we bring you fast and verified information.
            </p>

            <div className="mt-6 flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-blue-100 transition-all hover:border-cyan-300/50 hover:bg-cyan-400/10 hover:text-cyan-200 hover:-translate-y-0.5"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group inline-flex items-center gap-1.5 text-sm text-blue-100/70 transition-colors hover:text-cyan-300">
                    <span className="h-px w-3 bg-cyan-400/50 transition-all group-hover:w-5 group-hover:bg-cyan-300" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-4">Categories</h3>
            <ul className="space-y-2.5">
              {categories.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group inline-flex items-center gap-1.5 text-sm text-blue-100/70 transition-colors hover:text-cyan-300">
                    <span className="h-px w-3 bg-cyan-400/50 transition-all group-hover:w-5 group-hover:bg-cyan-300" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white mb-4">Popular Exams</h3>
            <ul className="space-y-2.5">
              {resources.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group inline-flex items-center gap-1.5 text-sm text-blue-100/70 transition-colors hover:text-cyan-300">
                    <span className="h-px w-3 bg-cyan-400/50 transition-all group-hover:w-5 group-hover:bg-cyan-300" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex flex-col gap-1.5">
              <p className="text-xs text-blue-100/60">
                © {new Date().getFullYear()} SarkarLink.com. All rights reserved.
              </p>
              <p className="text-[10px] text-emerald-400/80 font-medium tracking-wider uppercase flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                Portal Last Updated: {lastScraped}
              </p>
            </div>
            <p className="max-w-xl text-center text-xs text-blue-100/50 sm:text-right">
              Disclaimer: All job details, dates and links are sourced from official government websites. We are not affiliated with any government organisation.
            </p>
            <div className="flex items-center gap-4 text-xs">
              <Link href="/privacy" className="text-blue-100/60 transition-colors hover:text-cyan-300">Privacy</Link>
              <Link href="/terms" className="text-blue-100/60 transition-colors hover:text-cyan-300">Terms</Link>
              <Link href="/contact" className="text-blue-100/60 transition-colors hover:text-cyan-300">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}