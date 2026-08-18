import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
