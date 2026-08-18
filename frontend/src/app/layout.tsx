import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Govt Jobs Portal - Sarkari Result",
  description: "Browse the latest government jobs, results, and admit cards.",
};

import NextTopLoader from 'nextjs-toploader';

import Navbar from '@/components/Navbar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 font-sans antialiased">
        <NextTopLoader color="#2563eb" showSpinner={false} />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
