'use client';

import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#070A11] text-[#0A1629] dark:text-[#F8FAFC] antialiased transition-colors duration-300">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
            <FileText className="w-3.5 h-3.5" />
            Terms of Use
          </span>
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-tight leading-tight">
            Terms of Education & <br />
            <span className="text-blue-600 dark:text-blue-400">Simulation Agreement</span>
          </h1>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Please review the educational commitments and non-commercial simulation rules governing your TO DIRECT experience.
          </p>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-[#111625] rounded-3xl p-8 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-8 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0A1629] dark:text-[#F8FAFC]">1. Educational Scope Only</h2>
            <p>
              TO DIRECT is strictly an interactive educational service. No content, lesson, quiz response, AI response from Finn, or simulated performance figure constitutes financial advice, investment advice, tax advice, or a recommendation to purchase or sell any security.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0A1629] dark:text-[#F8FAFC]">2. Virtual Currency & Sandbox Rules</h2>
            <p>
              The ₹10,000 credit allocated in your portfolio sandbox has zero real-world cash equivalence. It cannot be withdrawn, transferred, converted to fiat currency, or pledged as collateral. It is a mathematical counter designed solely to teach diversification discipline.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0A1629] dark:text-[#F8FAFC]">3. Non-Affiliation with Regulated Brokers</h2>
            <p>
              TO DIRECT does not execute real-money orders. Any similarities between sandbox instruments and real-world ETFs are for illustrative case studies only.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0A1629] dark:text-[#F8FAFC]">4. User Conduct & Academic Integrity</h2>
            <p>
              Learners agree to engage in sincere concept mastery. Automated scraping, exploitation of assessment question answers, or malicious abuse of Finn AI is prohibited.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
