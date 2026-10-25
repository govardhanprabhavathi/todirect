'use client';

import React from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
import { CURRICULUM_DATA } from '@/lib/data';
import { useAppState } from '@/lib/store';
import { BookOpen, Clock, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

export default function AppLearnCatalog() {
  const { state } = useAppState();

  return (
    <AppShell>
      <div className="space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Curriculum Catalog
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-tight mt-1">
            7-Topic Learning Path
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            Complete each module in sequence to build a rock-solid foundation from cashflow budgeting to portfolio asset allocation.
          </p>
        </div>

        <div className="space-y-4">
          {CURRICULUM_DATA.map((module) => {
            const completedLessons = module.lessons.filter((l) => state.completedLessonIds.includes(l.id)).length;
            const isCompleted = completedLessons === module.lessons.length;
            const isQuizPassed = state.passedQuizIds.includes(module.questions[0]?.id);

            return (
              <div
                key={module.id}
                className="bg-white dark:bg-[#111625] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-blue-400 dark:hover:border-blue-500 transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 uppercase">
                        Topic 0{module.order}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                        {module.level} • {module.duration}
                      </span>
                      {isQuizPassed && (
                        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Certified
                        </span>
                      )}
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold text-[#0A1629] dark:text-[#F8FAFC]">
                      {module.title}
                    </h2>
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {module.overview}
                    </p>

                    <div className="pt-2 flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-slate-700 dark:text-slate-300">
                        {completedLessons} of {module.lessons.length} lessons finished
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
                    <Link href={`/app/learn/${module.id}`}>
                      <Button variant="primaryDark" size="sm" className="rounded-full px-5 text-xs font-semibold w-full">
                        View Lessons ({module.lessons.length}) &rarr;
                      </Button>
                    </Link>
                    <Link href={`/app/quiz/${module.id}`}>
                      <Button variant="outline" size="sm" className="rounded-full px-5 text-xs font-semibold w-full bg-white dark:bg-[#111625] dark:border-slate-800">
                        Take Module Quiz
                      </Button>
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
