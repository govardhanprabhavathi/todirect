import type { Metadata } from "next";
import { ScrollProgress } from "@/components/scroll-progress";
import "./globals.css";

export const metadata: Metadata = {
  title: "TO DIRECT — Learn Before You Invest | Financial Education Platform",
  description:
    "Master personal finance, investing fundamentals, risk management, and portfolio strategy through structured lessons, evidence-based assessments, and a safe ₹10,000 sandbox.",
  keywords: [
    "financial education",
    "personal finance India",
    "learn investing",
    "virtual stock portfolio",
    "stock market basics",
    "financial literacy students",
  ],
  openGraph: {
    title: "TO DIRECT — Learn Before You Invest",
    description:
      "A premium financial learning platform for students and young professionals. Demonstrating understanding before you risk real money.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="antialiased bg-cream text-brand-navy selection:bg-brand-blue selection:text-white">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
