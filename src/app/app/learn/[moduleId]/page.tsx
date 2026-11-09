'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { CURRICULUM_DATA } from '@/lib/data';
import { useAppState } from '@/lib/store';
import { BookOpen, Clock, CheckCircle2, ChevronRight, ArrowLeft, Sparkles } from 'lucide-react';

export default function ModuleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { state } = useAppState();

  const moduleId = params?.moduleId as string;
  const currentModule = CURRICULUM_DATA.find((m) => m.id === moduleId) || CURRICULUM_DATA[0];

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Back Link */}
        <Link
          href="/app/learn"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to curriculum catalog
        </Link>

        {/* Module Header Card */}
        <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-[11px] font-mono font-medium border border-blue-200/60 dark:border-blue-900/50">
              Topic 0{currentModule.order}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {currentModule.level} • {currentModule.duration}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-tight">
            {currentModule.title}
          </h1>
          <p className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400">{currentModule.tagline}</p>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">{currentModule.overview}</p>

          <div className="pt-2 flex flex-wrap gap-3">
            <Link href={`/app/lesson/${currentModule.lessons[0].id}`}>
              <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shadow-xs">
                Start first lesson &rarr;
              </button>
            </Link>
            <Link href={`/app/quiz/${currentModule.id}`}>
              <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
                Take concept quiz
              </button>
            </Link>
          </div>
        </div>

        {/* Demonstrated Outcomes */}
        <div className="bg-white dark:bg-[#111625] rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
          <h2 className="text-xs font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            Key learning outcomes
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentModule.learningOutcomes.map((outcome, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Lessons List */}
        <div className="space-y-3">
          <h2 className="text-base font-semibold text-[#0A1629] dark:text-[#F8FAFC]">
            Lessons in this Topic ({currentModule.lessons.length})
          </h2>

          <div className="space-y-2">
            {currentModule.lessons.map((lesson, idx) => {
              const isDone = state.completedLessonIds.includes(lesson.id);
              return (
                <Link
                  key={lesson.id}
                  href={`/app/lesson/${lesson.id}`}
                  className="flex items-center justify-between p-3.5 sm:p-4 rounded-xl bg-white dark:bg-[#111625] border border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-mono font-medium ${
                        isDone
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-medium text-[#0A1629] dark:text-[#F8FAFC] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {lesson.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{lesson.summary}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-medium text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{lesson.duration}</span>
                    <ChevronRight className="w-4 h-4 ml-0.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
