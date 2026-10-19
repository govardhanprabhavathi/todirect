import type { Metadata } from "next";
import { ScrollProgress } from "@/components/scroll-progress";
import "./globals.css";

export const metadata: Metadata = {
  title: "Accretion — Accelerate Your SaaS Growth",
  description:
    "Accelerate your SaaS launch with Accretion. Communicate your value, attract users, and grow faster with a sleek, scalable platform.",
  openGraph: {
    title: "Accretion — Accelerate Your SaaS Growth",
    description:
      "Accelerate your SaaS launch with Accretion. Communicate your value, attract users, and grow faster with a sleek, scalable platform.",
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
      <body className="antialiased">
        <ScrollProgress />
        {children}
      </body>
    </html>
  );
}
