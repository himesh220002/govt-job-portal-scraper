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
  title: "DeshJob.com - India's #1 Govt Jobs & Sarkari Result Portal",
  description: "Get real-time updates on latest government jobs, Sarkari results, admit cards, answer keys, and exam syllabus on DeshJob.com. Fast, reliable, and 100% secure.",
  keywords: "Sarkari Result, Govt Jobs, Government Jobs 2026, Free Job Alert, SSC, UPSC, Bank Jobs, Railway Jobs, DeshJob, Desh Job",
  openGraph: {
    title: "DeshJob.com - Govt Jobs & Sarkari Results",
    description: "The fastest, most reliable portal for Indian government job notifications, admit cards, and results.",
    url: "https://deshjob.com",
    siteName: "DeshJob",
    locale: "en_IN",
    type: "website",
  },
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