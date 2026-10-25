'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
import { CURRICULUM_DATA } from '@/lib/data';
import { useAppState } from '@/lib/store';
import { BookOpen, Clock, CheckCircle2, ChevronRight, ArrowLeft, HelpCircle, Sparkles } from 'lucide-react';

export default function ModuleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { state } = useAppState();

  const moduleId = params?.moduleId as string;
  const currentModule = CURRICULUM_DATA.find((m) => m.id === moduleId) || CURRICULUM_DATA[0];

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Back Link */}
        <Link
          href="/app/learn"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Curriculum Catalog
        </Link>

        {/* Module Header Card */}
        <div className="bg-white dark:bg-[#111625] rounded-3xl p-6 sm:p-9 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
              Topic 0{currentModule.order}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
              {currentModule.level} • {currentModule.duration}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-tight">
            {currentModule.title}
          </h1>
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">{currentModule.tagline}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl">{currentModule.overview}</p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Link href={`/app/lesson/${currentModule.lessons[0].id}`}>
              <Button variant="primaryDark" size="md" className="rounded-full px-6 text-xs font-semibold">
                Start First Lesson &rarr;
              </Button>
            </Link>
            <Link href={`/app/quiz/${currentModule.id}`}>
              <Button variant="outline" size="md" className="rounded-full px-6 text-xs font-semibold bg-white dark:bg-[#111625] dark:border-slate-800">
                Take Concept Quiz
              </Button>
            </Link>
          </div>
        </div>

        {/* Demonstrated Outcomes */}
        <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            Key Learning Outcomes
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
          <h2 className="text-lg font-bold text-[#0A1629] dark:text-[#F8FAFC]">
            Lessons in this Topic ({currentModule.lessons.length})
          </h2>

          <div className="space-y-2.5">
            {currentModule.lessons.map((lesson, idx) => {
              const isDone = state.completedLessonIds.includes(lesson.id);
              return (
                <Link
                  key={lesson.id}
                  href={`/app/lesson/${lesson.id}`}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white dark:bg-[#111625] border border-slate-200/80 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-sm transition-all group"
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold ${
                        isDone
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {isDone ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#0A1629] dark:text-[#F8FAFC] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {lesson.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{lesson.summary}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-medium text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{lesson.duration}</span>
                    <ChevronRight className="w-4 h-4 ml-1" />
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
