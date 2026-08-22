import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";

import NextTopLoader from "nextjs-toploader";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable}`}>
      <body className="bg-slate-50 text-slate-900 font-sans antialiased">
        <NextTopLoader color="#2563eb" showSpinner={false} />
        <ScrollToTop />
        <Navbar />
        <main className="flex min-h-screen flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}