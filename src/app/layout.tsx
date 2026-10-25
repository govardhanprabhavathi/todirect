import type { Metadata } from "next";
import { ScrollProgress } from "@/components/scroll-progress";
import { ThemeProvider } from "@/lib/theme";
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* Anti-flash inline script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('todirect_theme');
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && prefersDark)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (_) {}
            `,
          }}
        />
      </head>
      <body className="antialiased bg-[#FAF8F5] dark:bg-[#070A11] text-[#0A1629] dark:text-[#F8FAFC] selection:bg-[#E5F1FC] dark:selection:bg-[#1E3A8A] selection:text-[#0A1629] dark:selection:text-white transition-colors duration-200">
        <ThemeProvider>
          <ScrollProgress />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
