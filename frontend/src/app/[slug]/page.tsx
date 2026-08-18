import Link from 'next/link';
import { notFound } from 'next/navigation';
import clientPromise from '@/lib/mongodb';

export const revalidate = 60; // Revalidate every 60 seconds

import { unstable_cache } from 'next/cache';

const getJob = unstable_cache(
  async (slug: string) => {
    const client = await clientPromise;
    const db = client.db('govtJobScraperDB');
    const job = await db.collection('scraper').findOne({ recordId: slug });
    return job ? JSON.parse(JSON.stringify(job)) : null;
  },
  ['job-detail'],
  { revalidate: 60, tags: ['job'] }
);

// Clean up SarkariResult watermarks and promotional text
function cleanText(text: string) {
  if (!text) return "";
  let cleaned = text.replace(/Sarkari Result® Official : WWW\.SARKARIRESULT\.COM/gi, "");

  // Fix the specific "How to fill" sentence
  cleaned = cleaned.replace(/in Sarkari Result Recruitment Latest Job Section/gi, "on our portal");

  // Fix the footer promotional sentence completely
  cleaned = cleaned.replace(/For the latest updates on Sarkari Result, admit card, answer key, and result, always visit SarkariResult\.com, the official website for Sarkari Result in India \(Since 2012\)\.?/gi, "Stay tuned to our platform for the latest updates on admit cards, answer keys, and results.");

  // Catch-all for remaining Sarkari Result mentions
  cleaned = cleaned.replace(/SarkariResult\.com/gi, "our website");
  cleaned = cleaned.replace(/Sarkari Result/gi, "our platform");
  cleaned = cleaned.replace(/SarkariResult/gi, "our platform");

  return cleaned.trim();
}

export default async function JobDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const job = await getJob(resolvedParams.slug);

  if (!job) {
    notFound();
  }

  // Helper to extract keys safely for dynamic tables
  const vacancyHeaders = job.vacancyDetails && job.vacancyDetails.length > 0
    ? Object.keys(job.vacancyDetails[0])
    : [];

  const parsePairs = (rawText: string) => {
    const lines = cleanText(rawText).split('\n').filter(Boolean);
    const result = [];
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      const lower = line.toLowerCase();
      if (lower === 'important dates' || lower === 'application fee' || lower === 'age limit' || lower.includes('age relaxation')) continue;

      if (line.endsWith(':')) {
        result.push({ label: line, value: lines[i + 1] ? lines[i + 1].trim() : '' });
        i++; // skip next line as it's the value
      } else if (line.includes(':')) {
        const [l, ...v] = line.split(':');
        result.push({ label: l.trim() + ' :', value: v.join(':').trim() });
      } else {
        result.push({ label: '', value: line });
      }
    }
    return result;
  };

  return (
    <main className="max-w-4xl mx-auto px-5 py-10">
      <Link href="/" className="inline-flex items-center text-gray-500 mb-6 font-medium text-sm hover:text-gray-900 transition-colors">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Jobs
      </Link>

      <div className="my-8 pb-6 border-b border-gray-200 flex flex-col items-center justify-center gap-6">
        <h1 className="text-2xl sm:text-3xl text-center font-semibold leading-snug mb-3 text-gray-900">{cleanText(job.title)}</h1>
        <p className="text-md sm:text-lg text-center text-blue-900 max-w-3xl">{cleanText(job.shortDescription)}</p>
      </div>

      <div className="grid grid-cols-1 gap-5 mb-8">
        {/* Important Dates */}
        {job.importantDates?._raw?.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">📅 Important Dates</h3>
            <div className="space-y-3">
              {job.importantDates._raw.map((item: any, idx: number) => (
                <div key={idx} className="flex flex-col space-y-2">
                  {parsePairs(item.raw_text).map((pair, i) => (
                    <div key={i} className={`flex justify-between items-start gap-4 ${pair.label ? 'border-b border-gray-100 pb-2 last:border-0' : ''}`}>
                      {pair.label && <span className="font-medium text-gray-700 w-1/2">{pair.label}</span>}
                      <span className={`${pair.label ? "text-gray-900 text-right w-1/2" : "text-gray-600"}`}>{pair.value}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Application Fee */}
        {job.applicationFee?._raw?.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">💳 Application Fee</h3>
            <div className="space-y-3">
              {job.applicationFee._raw.map((item: any, idx: number) => (
                <div key={idx} className="flex flex-col space-y-2">
                  {parsePairs(item.raw_text).map((pair, i) => (
                    <div key={i} className={`flex justify-between items-start gap-4 ${pair.label ? 'border-b border-gray-100 pb-2 last:border-0' : ''}`}>
                      {pair.label && <span className="font-medium text-gray-700 w-1/2">{pair.label}</span>}
                      <span className={`${pair.label ? "text-gray-900 text-right w-1/2" : "text-blue-800"}`}>{pair.value}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Age Limit */}
        {job.ageLimit?._raw?.length > 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase tracking-wide">⏳ Age Limit</h3>
            <div className="space-y-3">
              {job.ageLimit._raw.map((item: any, idx: number) => (
                <div key={idx} className="flex flex-col space-y-2">
                  {parsePairs(item.raw_text).map((pair, i) => (
                    <div key={i} className={`flex justify-between items-start gap-4 ${pair.label ? 'border-b border-gray-100 pb-2 last:border-0' : ''}`}>
                      {pair.label && <span className="font-medium text-gray-700 w-1/2">{pair.label}</span>}
                      <span className={`${pair.label ? "text-gray-900 text-right w-1/2" : "text-gray-600"}`}>{pair.value}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Vacancy Details Table */}
      {job.vacancyDetails && job.vacancyDetails.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            📋 Vacancy Details
          </h3>
          <div className="w-full overflow-x-auto bg-white border border-gray-200 rounded-lg">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="bg-gray-50 text-gray-900 font-semibold border-b border-gray-200">
                  {vacancyHeaders.map((header) => (
                    <th key={header} className="p-3 text-lg whitespace-nowrap">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {job.vacancyDetails.map((row: any, idx: number) => (
                  <tr key={idx} className="border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-colors">
                    {vacancyHeaders.map((header) => (
                      <td key={header} className="p-3 text-md text-gray-600">{cleanText(row[header])}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Important Links */}
      {job.importantLinks && Object.keys(job.importantLinks).length > 0 && (
        <div className="mt-8 mb-10">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            🔗 Important Links
          </h3>
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <div className="flex flex-col space-y-3">
              {Object.entries(job.importantLinks).map(([key, url]: [string, any]) => {
                const isGovUrl = url.includes('gov.in') || url.includes('nic.in');
                const urlLower = url.toLowerCase();
                let rawLabel = key.replace(/_/g, ' ').toUpperCase();

                // Remove spam links completely (from label or url)
                if (
                  urlLower.includes('sarkariresult') ||
                  rawLabel.includes('SARKARI RESULT') ||
                  rawLabel.includes('TELEGRAM') ||
                  rawLabel.includes('WHATSAPP') ||
                  rawLabel.includes('ANDROID APP') ||
                  rawLabel.includes('APPLE IOS')
                ) {
                  return null;
                }

                let finalLabel = rawLabel;
                if (url.toLowerCase().endsWith('.pdf') || rawLabel.includes('NOTIFICATION') || rawLabel.includes('BROCHURE')) {
                  finalLabel = 'DOWNLOAD PDF';
                } else if (rawLabel.includes('VIDEO')) {
                  finalLabel = 'WATCH VIDEO';
                } else if (rawLabel.includes('OFFICIAL WEBSITE') || isGovUrl) {
                  finalLabel = 'OFFICIAL WEBSITE';
                } else if (rawLabel === 'CLICK HERE') {
                  finalLabel = 'OPEN LINK';
                }

                // Truncate URL to 20+ chars
                const displayUrl = url.length > 55 ? url.substring(0, 55) + '...' : url;

                return (
                  <div key={key} className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-0">
                    <span className="font-medium text-gray-700 text-sm md:text-base w-1/2">{finalLabel} :</span>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 hover:underline text-right text-sm w-1/2 truncate"
                      title={url}
                    >
                      {displayUrl}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
