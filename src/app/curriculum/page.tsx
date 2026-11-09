'use client';

import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CURRICULUM_DATA } from '@/lib/data';
import { BookOpen, Clock, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

export default function CurriculumPage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#070A11] text-[#0A1629] dark:text-[#F8FAFC] antialiased transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-50 dark:bg-blue-950/50 border border-blue-200/60 dark:border-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-medium mb-4">
            <BookOpen className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            Comprehensive curriculum
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-tight leading-tight">
            The 7 Core Topics of <br />
            <span className="text-blue-600 dark:text-blue-400">Unshakable Financial Literacy</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Strictly aligned with established personal finance principles and SEBI non-advisory standards. Master each module at your own pace before taking on the ₹10,000 capstone simulation.
          </p>
        </div>

        {/* Syllabus Module List */}
        <div className="space-y-6 mb-20">
          {CURRICULUM_DATA.map((module) => (
            <div
              key={module.id}
              className="bg-white dark:bg-[#111625] rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs transition-colors"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Overview */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-[11px] font-mono font-medium border border-blue-200/60 dark:border-blue-900/50">
                      Topic 0{module.order}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-medium border border-slate-200/60 dark:border-slate-700">
                      {module.level}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-tight">
                    {module.title}
                  </h2>
                  <p className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400">{module.tagline}</p>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{module.overview}</p>

                  <div className="flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 pt-1">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                      {module.duration} total
                    </span>
                    <span className="flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-slate-400 dark:text-slate-500" />
                      {module.lessons.length} core lessons
                    </span>
                  </div>

                  <div className="pt-2">
                    <Link href={`/app/learn/${module.id}`}>
                      <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shadow-xs">
                        Start Topic 0{module.order} &rarr;
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Right Lessons & Learning Outcomes */}
                <div className="lg:col-span-7 bg-slate-50/70 dark:bg-slate-900/40 rounded-xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 space-y-4">
                  <div>
                    <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2.5 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      Demonstrated Learning Outcomes
                    </h3>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {module.learningOutcomes.map((outcome, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800">
                    <h3 className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
                      Lesson Modules ({module.lessons.length})
                    </h3>
                    <div className="space-y-1.5">
                      {module.lessons.map((lesson, lIdx) => (
                        <Link
                          key={lesson.id}
                          href={`/app/lesson/${lesson.id}`}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-[#111625] border border-slate-200/70 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-colors group"
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-5 h-5 rounded-md bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs font-mono font-medium flex items-center justify-center">
                              {lIdx + 1}
                            </span>
                            <div>
                              <p className="text-xs font-medium text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {lesson.title}
                              </p>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400">{lesson.summary}</p>
                            </div>
                          </div>
                          <span className="text-xs text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center gap-1 font-mono shrink-0">
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
        <div className="rounded-2xl p-6 sm:p-10 bg-[#0B132B] dark:bg-[#080E1E] text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-800">
          <div className="max-w-xl">
            <span className="px-2.5 py-0.5 rounded-md bg-blue-500/20 text-blue-300 text-[11px] font-medium">
              Practical Capstone
            </span>
            <h2 className="text-xl sm:text-2xl font-semibold mt-2 text-white">
              Put the 7 topics into practice with ₹10,000
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              No real bank accounts, no brokerage fees. Deploy a virtual allocation, test your psychological reactions to volatility, and receive real-time diversification feedback.
            </p>
          </div>
          <Link href="/practice">
            <button className="px-6 py-2.5 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shadow-xs shrink-0">
              Explore ₹10K Sandbox &rarr;
            </button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
