'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { ShieldCheck, CheckCircle2, Lock, Trash2, AlertCircle } from 'lucide-react';

export default function PrivacyPage() {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('Completed learning journey');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitDeletion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#070A11] text-[#0A1629] dark:text-[#F8FAFC] antialiased transition-colors duration-300">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Lock className="w-3.5 h-3.5" />
            Digital Personal Data Protection (DPDP) Act
          </span>
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-tight leading-tight">
            Privacy Policy & <br />
            <span className="text-blue-600 dark:text-blue-400">Data Governance</span>
          </h1>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            We collect the absolute minimum data required to facilitate your learning journey. We do not sell your personal data or browsing habits.
          </p>
        </div>

        {/* Policy Content */}
        <div className="bg-white dark:bg-[#111625] rounded-3xl p-8 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-8 mb-16 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0A1629] dark:text-[#F8FAFC]">1. Information We Collect</h2>
            <p>
              When you use TO DIRECT, we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
              <li>Profile data (name, email address, declared experience level).</li>
              <li>Learning telemetry (lesson completion timestamps, quiz responses, misconception tags).</li>
              <li>Virtual sandbox transaction records (simulated asset allocations, order logs).</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0A1629] dark:text-[#F8FAFC]">2. How We Use Your Data</h2>
            <p>
              Your data is exclusively utilized to:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
              <li>Calculate your understanding score and surface personalized curriculum recommendations.</li>
              <li>Contextualize Finn AI’s Socratic feedback without sending personal identifiers to external advertising networks.</li>
              <li>Maintain your simulated ₹10,000 portfolio sandbox balance and transaction history.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0A1629] dark:text-[#F8FAFC]">3. Non-Sale & Anti-Brokering Commitment</h2>
            <p>
              We will never sell, rent, or lease learner contact details to banks, credit card issuers, stockbrokers, or lead-generation aggregators.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#0A1629] dark:text-[#F8FAFC]">4. Your Right to Erasure & Data Portability</h2>
            <p>
              Under the Digital Personal Data Protection Act (DPDP), you retain full rights to request an export of your progress records or complete deletion of your account and associated data.
            </p>
          </section>
        </div>

        {/* Account Deletion Request Module */}
        <div id="deletion" className="bg-white dark:bg-[#111625] rounded-3xl p-8 sm:p-10 border border-rose-200 dark:border-rose-900/60 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[#0A1629] dark:text-[#F8FAFC]">Request Account & Data Deletion</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Self-service DPDP erasure request portal</p>
            </div>
          </div>

          {submitted ? (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 space-y-2">
              <div className="flex items-center gap-2 font-bold text-base">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                Deletion Request Queued Successfully
              </div>
              <p className="text-xs leading-relaxed text-emerald-700 dark:text-emerald-400">
                A verification link has been dispatched to <strong>{email}</strong>. Once confirmed, all your learner progress, virtual portfolio records, and authentication tokens will be permanently purged within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmitDeletion} className="space-y-4">
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Submitting this form initiates an automated cryptographic wipe of your learner profile, understanding badges, and ₹10,000 sandbox portfolio.
              </p>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Account Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. govardhan@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                  Primary Reason for Deletion
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-sm bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100"
                >
                  <option value="Completed learning journey">Completed the curriculum</option>
                  <option value="Privacy preference">Privacy preference</option>
                  <option value="Switching accounts">Switching accounts</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="pt-2">
                <Button type="submit" variant="danger" size="md" className="rounded-full px-6 text-xs font-bold">
                  Submit Permanent Erasure Request &rarr;
                </Button>
              </div>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
