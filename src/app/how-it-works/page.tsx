'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Sliders, 
  Target, 
  BrainCircuit, 
  Award, 
  ShieldCheck, 
  XCircle,
  HelpCircle
} from 'lucide-react';

const stages = [
  {
    step: '01',
    name: 'START',
    title: 'Baseline Diagnostic',
    description: 'Take a rapid 5-question diagnostic to identify your baseline financial literacy and surface existing cognitive biases.',
    icon: Target,
    highlight: 'No test anxiety — just establishing your personalized starting score.'
  },
  {
    step: '02',
    name: 'LEARN',
    title: '7-Topic Progressive Curriculum',
    description: 'Work through bite-sized, jargon-free lessons that illustrate compounding, inflation math, and portfolio diversification.',
    icon: BrainCircuit,
    highlight: 'Includes interactive calculators, formula breakdowns, and real-world worked examples.'
  },
  {
    step: '03',
    name: 'TEST',
    title: 'Misconception-Aware Concept Checks',
    description: 'Solve realistic financial scenarios. When you get a question wrong, our engine pinpoints the exact mental shortcut you took.',
    icon: HelpCircle,
    highlight: 'Detects "High Dividend = Guaranteed Return" and "Penny Stock = Cheap" traps.'
  },
  {
    step: '04',
    name: 'TRACK',
    title: 'Deterministic Understanding Tracker',
    description: 'We track demonstrated understanding, not just video clicks. Earn verified mastery badges based on consistent reasoning.',
    icon: Award,
    highlight: 'Dynamic radar breakdown across Cashflow, Compounding, Risk, and Valuation.'
  },
  {
    step: '05',
    name: 'IMPROVE',
    title: 'Socratic AI Tutoring with Finn',
    description: 'Finn intervenes when you struggle with a concept, prompting you with guided questions rather than handing you quick answers.',
    icon: Sparkles,
    highlight: 'Rigorously constrained to syllabus. Zero speculative stock tips or predictions.'
  },
  {
    step: '06',
    name: 'PRACTISE',
    title: '₹10,000 Portfolio Sandbox',
    description: 'Deploy ₹10,000 in virtual capital across index funds, debt instruments, and gold with live concentration risk warnings.',
    icon: Sliders,
    highlight: 'Requires a written trade rationale to cultivate disciplined, intentional investor habits.'
  }
];

const comparisons = [
  {
    feature: 'Core Philosophy',
    toDirect: 'Learn before you invest (rewards understanding)',
    tradingApps: 'Trade immediately (rewards transaction volume)'
  },
  {
    feature: 'Assessment Engine',
    toDirect: 'Misconception-aware diagnostics with cognitive feedback',
    tradingApps: 'Generic pass/fail quizzes or none at all'
  },
  {
    feature: 'AI Tutoring',
    toDirect: 'Finn: Grounded Socratic coaching with anti-speculation guardrails',
    tradingApps: 'Hallucinating chatbots or automated stock buy alerts'
  },
  {
    feature: 'Simulation Sandbox',
    toDirect: '₹10,000 capital with concentration risk alerts and reflection prompts',
    tradingApps: 'Gamified ₹10,00,000 day-trading games encouraging reckless leverage'
  },
  {
    feature: 'Monetization Model',
    toDirect: '100% Educational integrity. Zero broker commissions or referrals',
    tradingApps: 'Order flow fees, margin interest, and broker affiliate commissions'
  }
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#070A11] text-[#0A1629] dark:text-[#F8FAFC] antialiased transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            The Proven Pedagogy
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-tight leading-tight">
            How TO DIRECT turns curiosity into <br />
            <span className="text-blue-600 dark:text-blue-400">financial mastery.</span>
          </h1>
          <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            A sequenced 6-stage continuum connecting diagnostics, foundational learning, misconception checking, AI guidance, and simulated practice.
          </p>
        </div>

        {/* 6 Stages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {stages.map((st) => {
            const Icon = st.icon;
            return (
              <div
                key={st.step}
                className="bg-white dark:bg-[#111625] rounded-2xl p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-black tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full">
                      STAGE {st.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#0A1629] dark:text-[#F8FAFC] mb-2">
                    {st.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {st.description}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-[#0B0F19] rounded-xl p-3 text-xs text-slate-600 dark:text-slate-400 font-medium flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span>{st.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Comparison Table: TO DIRECT vs Typical Trading Platforms */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-tight">
              Why We Are Different From Brokerage & Trading Apps
            </h2>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              We succeed when you build disciplined, lifelong financial competence—not when you trade frequently.
            </p>
          </div>

          <div className="bg-white dark:bg-[#111625] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-[#0B0F19] border-b border-slate-200 dark:border-slate-800">
                    <th className="py-4 px-6 font-bold text-slate-700 dark:text-slate-300">Core Dimension</th>
                    <th className="py-4 px-6 font-bold text-blue-700 dark:text-blue-300 bg-blue-50/60 dark:bg-blue-950/40">TO DIRECT (Educational)</th>
                    <th className="py-4 px-6 font-bold text-slate-500 dark:text-slate-400">Commercial Trading Apps</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {comparisons.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-[#0B0F19]/50 transition-colors">
                      <td className="py-4 px-6 font-semibold text-[#0A1629] dark:text-[#F8FAFC]">{row.feature}</td>
                      <td className="py-4 px-6 font-medium text-slate-800 dark:text-slate-200 bg-blue-50/30 dark:bg-blue-950/20">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{row.toDirect}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-500 dark:text-slate-400">
                        <div className="flex items-start gap-2">
                          <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                          <span>{row.tradingApps}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-900 text-white text-center shadow-xl">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
            Ready to experience the learning journey firsthand?
          </h2>
          <p className="text-blue-100 max-w-lg mx-auto text-sm sm:text-base mb-8">
            Complete the 5-minute baseline diagnostic and start building real financial confidence today.
          </p>
          <Link href="/sign-in">
            <Button size="lg" variant="pure" className="rounded-full px-8 text-blue-900 font-bold shadow-md">
              Start Free Assessment &rarr;
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
