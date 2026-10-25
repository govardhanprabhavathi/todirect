'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ShieldCheck, HeartHandshake, BookOpen, Compass, CheckCircle2, AlertOctagon } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#070A11] text-[#0A1629] dark:text-[#F8FAFC] antialiased transition-colors duration-300">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Compass className="w-3.5 h-3.5" />
            Our Mission & Ethics
          </span>
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-tight leading-tight">
            The TO DIRECT <br />
            <span className="text-blue-600 dark:text-blue-400">Pedagogical Charter</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            We exist to end financial anxiety and speculative gambling among young learners by championing evidence-based understanding before capital commitment.
          </p>
        </div>

        {/* Core Principles */}
        <div className="space-y-10 mb-20">
          <section className="bg-white dark:bg-[#111625] rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-2xl font-bold text-[#0A1629] dark:text-[#F8FAFC] flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-sm">1</span>
              The "Learn Before You Invest" Philosophy
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
              The modern financial ecosystem is designed to encourage rapid, high-frequency transactions. Brokerage platforms profit from turnover, not learner comprehension. At TO DIRECT, we reject this incentive structure. Every module, assessment, and simulation feature is structured to ensure learners grasp fundamental concepts like real purchasing power, correlation, and compounding before ever placing real funds at risk.
            </p>
          </section>

          <section className="bg-white dark:bg-[#111625] rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-2xl font-bold text-[#0A1629] dark:text-[#F8FAFC] flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm">2</span>
              Anti-Speculation & Zero Brokerage Pledge
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
              We pledge to never sell retail trading signals, tips, stock picks, or affiliate links to third-party brokerage platforms. We do not receive commissions from fund houses or brokerages. Our metric of success is your demonstrated mastery score, not your trading frequency.
            </p>
          </section>

          <section className="bg-white dark:bg-[#111625] rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-2xl font-bold text-[#0A1629] dark:text-[#F8FAFC] flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm">3</span>
              AI Coach Finn: Strict Educational Guardrails
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
              Our AI coach Finn is built with deterministic system guardrails. Finn is strictly forbidden from:
            </p>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <AlertOctagon className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Recommending specific individual stocks or cryptocurrency tokens.</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertOctagon className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Predicting market tops, bottoms, or short-term price targets.</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertOctagon className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Encouraging leveraged options or day-trading derivatives.</span>
              </li>
            </ul>
          </section>

          <section className="bg-white dark:bg-[#111625] rounded-3xl p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <h2 className="text-2xl font-bold text-[#0A1629] dark:text-[#F8FAFC] flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-sm">4</span>
              Regulatory Alignment & SEBI Compliance Stance
            </h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm sm:text-base">
              TO DIRECT is an educational simulation platform operating in full compliance with Securities and Exchange Board of India (SEBI) guidelines. We are not a Registered Investment Advisor (RIA), Research Analyst (RA), or broker. All curriculum material is purely educational, intended solely to build general financial capability and informed critical thinking.
            </p>
          </section>
        </div>

        {/* Contact Grievance Box */}
        <div className="bg-[#0B132B] dark:bg-[#0B0F19] text-white rounded-3xl p-8 text-center space-y-4 border border-slate-800">
          <h3 className="text-xl font-bold">Have questions or pedagogical feedback?</h3>
          <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-400 max-w-lg mx-auto">
            Our educational review board welcomes suggestions from academic faculty, financial educators, and students.
          </p>
          <div className="pt-2">
            <a href="mailto:grievance@todirect.edu" className="inline-block">
              <Button size="md" variant="primaryBlue" className="rounded-full px-6 text-xs font-semibold">
                Contact Academic Grievance Officer &rarr;
              </Button>
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
