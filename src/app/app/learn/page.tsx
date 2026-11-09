'use client';

import React from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { CURRICULUM_DATA } from '@/lib/data';
import { useAppState } from '@/lib/store';
import { BookOpen, Clock, CheckCircle2, ChevronRight } from 'lucide-react';

export default function AppLearnCatalog() {
  const { state } = useAppState();

  return (
    <AppShell>
      <div className="space-y-8">
        <div className="pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400">
              <BookOpen className="w-3.5 h-3.5" />
              Curriculum catalog
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-tight">
            7-Topic Learning Path
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 max-w-xl">
            Complete each module in sequence to build a rock-solid foundation from cashflow budgeting to portfolio asset allocation
          </p>
        </div>

        <div className="space-y-3.5">
          {CURRICULUM_DATA.map((module) => {
            const completedLessons = module.lessons.filter((l) => state.completedLessonIds.includes(l.id)).length;
            const isCompleted = completedLessons === module.lessons.length;
            const isQuizPassed = state.passedQuizIds.includes(module.questions[0]?.id);

            return (
              <div
                key={module.id}
                className="bg-white dark:bg-[#111625] rounded-xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                  <div className="space-y-2 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/50">
                        Topic 0{module.order}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400">
                        {module.level} • {module.duration}
                      </span>
                      {isQuizPassed && (
                        <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-900/50 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Certified
                        </span>
                      )}
                    </div>

                    <h2 className="text-base sm:text-lg font-semibold text-[#0A1629] dark:text-[#F8FAFC]">
                      {module.title}
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {module.overview}
                    </p>

                    <div className="pt-1 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-medium text-slate-700 dark:text-slate-300">
                        {completedLessons} of {module.lessons.length} lessons finished
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
                    <Link href={`/app/learn/${module.id}`}>
                      <button className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shadow-xs">
                        View lessons ({module.lessons.length}) &rarr;
                      </button>
                    </Link>
                    <Link href={`/app/quiz/${module.id}`}>
                      <button className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                        Take module quiz
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
