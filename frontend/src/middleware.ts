import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const host = request.headers.get('host') || '';

  // Prevent duplicate content indexing on the Vercel domain
  if (host.includes('govt-job-portal-scraper.vercel.app')) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow');
  }

  return response;
}
