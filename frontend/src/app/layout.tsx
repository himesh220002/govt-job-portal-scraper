import type { Metadata, Viewport } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

import NextTopLoader from "nextjs-toploader";
import { unstable_cache } from 'next/cache';
import clientPromise from '@/lib/mongodb';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";

const getTickerItems = unstable_cache(
  async () => {
    try {
      const client = await clientPromise;
      const db = client.db('govtJobScraperDB');
      const recentJobs = await db.collection('scraper')
        .find({})
        .sort({ updatedAt: -1 })
        .limit(50)
        .project({ title: 1, lastOfficialUpdate: 1, updatedAt: 1 })
        .toArray();

      const parseOfficialDate = (dateStr?: string) => {
        if (!dateStr) return 0;
        const cleanStr = dateStr.split('|')[0].trim();
        const d = new Date(cleanStr);
        return isNaN(d.getTime()) ? 0 : d.getTime();
      };

      const sortedJobs = recentJobs.map((job: any) => ({
        title: job.title,
        actualDateValue: parseOfficialDate(job.lastOfficialUpdate) || new Date(job.updatedAt).getTime()
      })).sort((a: any, b: any) => b.actualDateValue - a.actualDateValue).slice(0, 6);

      return sortedJobs.map(job => {
        const title = job.title || "";
        const yearMatch = title.match(/\b(20[1-3][0-9])\b/);

        let shortTitle = title;
        if (yearMatch) {
          const yearIndex = yearMatch.index! + 4;
          shortTitle = title.substring(0, yearIndex).trim();
        }

        // Enforce a strict max length of 40 characters
        if (shortTitle.length > 40) {
          return shortTitle.substring(0, 37).trim() + "...";
        }
        return shortTitle;
      });
    } catch (e) {
      console.error("Failed to fetch ticker items", e);
      return [
        'SSC CGL 2026 Tier I dates announced',
        'UPSC Civil Services Prelims result released',
        'RRB NTPC CBT application window open',
      ];
    }
  },
  ['ticker-items'],
  { revalidate: 60, tags: ['jobs'] }
);

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SarkarLink.com - Sarkari Result, Sarkari Exam & Govt Jobs Portal",
  description: "SarkarLink.com is your trusted portal for Sarkari Result, Sarkari Exam, and Sarkari Naukri. Get real-time updates on latest government jobs, Sarkari results 2025/2026, admit cards, answer keys, and exam sarkari result info.",
  keywords: "Sarkari Result, Sarkari Exam, Sarkari Naukri, Sarkari Job, Sarkari Result 2026, Sarkari Result 2025, Sarkari Network, Sarkari Vigyapan, Exam Sarkari Result Info, Sarkari Vle, Sarkari Job Marg, Sarkari Sangam, Sarkari Job Find, Naukri, Govt Jobs, Government Jobs 2026, Free Job Alert, SSC, UPSC, Bank Jobs, Railway Jobs, SarkarLink",
  openGraph: {
    title: "SarkarLink.com - Sarkari Result & Sarkari Naukri",
    description: "Your trusted gateway for latest government jobs, Sarkari results 2026, Sarkari Exam updates, and study resources.",
    url: "https://sarkarlink.com",
    siteName: "SarkarLink",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: [
      { url: '/logo/favicon.ico' },
      { url: '/logo/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/logo/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/logo/apple-touch-icon.png' },
    ],
  },
  manifest: '/logo/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: "#050914",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tickerItems = await getTickerItems();

  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className="bg-slate-50 text-slate-900 font-sans antialiased">
        <NextTopLoader color="#2563eb" showSpinner={false} />
        <ScrollToTop />
        <ServiceWorkerRegister />
        <Navbar tickerItems={tickerItems} />
        <main className="flex min-h-screen flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}