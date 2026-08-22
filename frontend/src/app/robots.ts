import { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get('host') || '';

  // If we are on the Vercel domain, block crawling
  if (host.includes('govt-job-portal-scraper.vercel.app')) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  // Otherwise, allow crawling (production domain)
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: 'https://sarkarlink.com/sitemap.xml',
  };
}
