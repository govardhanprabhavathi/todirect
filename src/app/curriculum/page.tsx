'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { CURRICULUM_DATA } from '@/lib/data';
import { BookOpen, Clock, CheckCircle2, ChevronRight, Sparkles, BarChart2, ShieldAlert } from 'lucide-react';

export default function CurriculumPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#070A11] text-[#0A1629] dark:text-[#F8FAFC] antialiased transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            Comprehensive Curriculum
          </span>
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-tight leading-tight">
            The 7 Core Topics of <br />
            <span className="text-blue-600 dark:text-blue-400">Unshakable Financial Literacy</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Strictly aligned with established personal finance principles and SEBI non-advisory standards. Master each module at your own pace before taking on the ₹10,000 capstone simulation.
          </p>
        </div>

        {/* Syllabus Module List */}
        <div className="space-y-8 mb-24">
          {CURRICULUM_DATA.map((module) => (
            <div
              key={module.id}
              className="bg-white dark:bg-[#111625] rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Overview */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs font-bold tracking-wide uppercase">
                      Topic 0{module.order}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium">
                      {module.level}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-tight">
                    {module.title}
                  </h2>
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">{module.tagline}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{module.overview}</p>

                  <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 pt-2">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                      {module.duration} total
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                      {module.lessons.length} core lessons
                    </span>
                  </div>

                  <div className="pt-4">
                    <Link href={`/app/learn/${module.id}`}>
                      <Button variant="primaryDark" size="md" className="rounded-full px-6 text-xs font-semibold">
                        Start Topic 0{module.order} &rarr;
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Right Lessons & Learning Outcomes */}
                <div className="lg:col-span-7 bg-[#FAF8F5] dark:bg-[#0B0F19] rounded-2xl p-6 border border-slate-200/70 dark:border-slate-800 space-y-5">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      Demonstrated Learning Outcomes
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {module.learningOutcomes.map((outcome, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-200/60 dark:border-slate-800">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-3">
                      Lesson Modules ({module.lessons.length})
                    </h3>
                    <div className="space-y-2">
                      {module.lessons.map((lesson, lIdx) => (
                        <Link
                          key={lesson.id}
                          href={`/app/lesson/${lesson.id}`}
                          className="flex items-center justify-between p-3 rounded-xl bg-white dark:bg-[#111625] border border-slate-200/70 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs font-bold flex items-center justify-center">
                              {lIdx + 1}
                            </span>
                            <div>
                              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {lesson.title}
                              </p>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400">{lesson.summary}</p>
                            </div>
                          </div>
                          <span className="text-xs text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center gap-1 font-medium shrink-0">
                            {lesson.duration}
                            <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sandbox Integration Banner */}
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-[#0B132B] to-[#1C2541] dark:from-[#080E1E] dark:to-[#111827] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 border border-slate-700 dark:border-slate-800">
          <div className="max-w-xl">
            <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold tracking-wide uppercase">
              Practical Capstone
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold mt-2 text-white">
              Put the 7 topics into practice with ₹10,000
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              No real bank accounts, no brokerage fees. Deploy a virtual allocation, test your psychological reactions to volatility, and receive real-time diversification feedback.
            </p>
          </div>
          <Link href="/practice">
            <Button size="lg" variant="primaryBlue" className="rounded-full px-8 shrink-0 font-bold">
              Explore ₹10K Sandbox &rarr;
            </Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
