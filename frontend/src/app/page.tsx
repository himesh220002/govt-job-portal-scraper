import Link from 'next/link';
import clientPromise from '@/lib/mongodb';
import { categorizeJobs } from '@/lib/categorize';
import HeroSection from '@/components/HeroSection';
import PortalUpdates from '@/components/PortalUpdates';
import InfoSection from '@/components/InfoSection';
import PerksSection from '@/components/PerksSection';

export const revalidate = 60; // Revalidate every 60 seconds

import { unstable_cache } from 'next/cache';

const getJobs = unstable_cache(
  async () => {
    const client = await clientPromise;
    const db = client.db('govtJobScraperDB');
    const jobs = await db.collection('scraper')
      .find({})
      .project({ _id: 1, recordId: 1, title: 1, category: 1, updatedAt: 1, lastOfficialUpdate: 1 })
      .toArray();

    return JSON.parse(JSON.stringify(jobs));
  },
  ['all-jobs'],
  { revalidate: 60, tags: ['jobs'] }
);

export default async function Home() {
  const jobs = await getJobs();
  const categorizedJobs = categorizeJobs(jobs);

  const categoryOrder = [
    'Result', 'Admit Card', 'Latest Job',
    'Answer Key', 'Syllabus', 'Admission',
    'Certificate', 'Important', 'Outsourcing/Offline Job'
  ];

  return (
    <main>
      <HeroSection />

      <PortalUpdates categorizedJobs={categorizedJobs} categoryOrder={categoryOrder} />

      <PerksSection />

      <InfoSection />


    </main>
  );
}
