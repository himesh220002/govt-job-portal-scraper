import { MetadataRoute } from 'next';
import clientPromise from '@/lib/mongodb';
import { categoryMeta } from '@/lib/categoryMeta';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://sarkarlink.com';

  const sitemapEntries: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.9,
    },
  ];

  // Add categories to sitemap
  const categories = [
    'Result', 'Admit Card', 'Latest Job', 'Answer Key',
    'Syllabus', 'Admission', 'Certificate', 'Important',
    'Outsourcing/Offline Job'
  ];

  categories.forEach(category => {
    const meta = categoryMeta(category);
    sitemapEntries.push({
      url: `${baseUrl}/category/${meta.slug}`,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 0.8,
    });
  });

  return sitemapEntries;
}
