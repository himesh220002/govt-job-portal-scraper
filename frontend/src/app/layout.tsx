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
  title: "Govt Jobs Portal - Sarkari Result",
  description: "Browse the latest government jobs, results, and admit cards.",
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