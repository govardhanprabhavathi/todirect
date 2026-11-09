'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { CURRICULUM_DATA, Lesson } from '@/lib/data';
import { useAppState } from '@/lib/store';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Calculator, 
  Bot
} from 'lucide-react';

export default function LessonPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const { state, markLessonComplete } = useAppState();

  const lessonId = params?.lessonId as string;

  // Search for the lesson
  let foundLesson: Lesson | undefined;
  let foundModule = CURRICULUM_DATA[0];

  for (const mod of CURRICULUM_DATA) {
    const l = mod.lessons.find((item) => item.id === lessonId);
    if (l) {
      foundLesson = l;
      foundModule = mod;
      break;
    }
  }

  // Fallback to first lesson
  const lesson = foundLesson || foundModule.lessons[0];
  const isCompleted = state.completedLessonIds.includes(lesson.id);

  // Simple interactive calculator state for Rule of 72 or Compounding
  const [rate, setRate] = useState(12);
  const doublingYears = (72 / rate).toFixed(1);

  const handleMarkComplete = () => {
    markLessonComplete(lesson.id);
  };

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Navigation back */}
        <div className="flex items-center justify-between pb-1 border-b border-slate-200/80 dark:border-slate-800/80">
          <Link
            href={`/app/learn/${foundModule.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to {foundModule.title}
          </Link>

          <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
            Topic 0{foundModule.order} • {lesson.duration}
          </span>
        </div>

        {/* Lesson Reading Container */}
        <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
          {/* Title & Metadata */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-[11px] font-mono font-medium border border-blue-200/60 dark:border-blue-900/50">
                Lesson
              </span>
              {isCompleted && (
                <span className="text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 text-[11px] font-medium px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-900/50 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-tight">
              {lesson.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">{lesson.summary}</p>
          </div>

          {/* Key Takeaway Callout Box */}
          <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 space-y-1.5">
            <span className="text-xs font-semibold text-blue-900 dark:text-blue-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              Core Takeaway
            </span>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
              {lesson.keyTakeaway}
            </p>
          </div>

          {/* Lesson Body Paragraphs */}
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-1">
            {lesson.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Interactive Calculator / Worked Example Widget */}
          {lesson.formula && (
            <div className="mt-5 p-5 rounded-xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h3 className="text-xs sm:text-sm font-semibold text-[#0A1629] dark:text-[#F8FAFC]">
                  Interactive Formula Sandbox: {lesson.formula}
                </h3>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between font-medium text-slate-700 dark:text-slate-300">
                  <span>Annual Compound Return (r): {rate}%</span>
                  <span className="text-blue-600 dark:text-blue-400 font-mono font-semibold">Doubling Time ≈ {doublingYears} years</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="24"
                  value={rate}
                  onChange={(e) => setRate(parseInt(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              {lesson.workedExample && (
                <div className="mt-3 pt-3 border-t border-slate-200/70 dark:border-slate-800 text-xs space-y-1">
                  <p className="font-semibold text-slate-800 dark:text-slate-200">Case Study: {lesson.workedExample.scenario}</p>
                  <p className="text-slate-600 dark:text-slate-400 font-mono">{lesson.workedExample.calculation}</p>
                  <p className="text-blue-700 dark:text-blue-300 font-medium italic mt-1">{lesson.workedExample.insight}</p>
                </div>
              )}
            </div>
          )}

          {/* Action Bar */}
          <div className="pt-5 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              onClick={handleMarkComplete}
              className={`w-full sm:w-auto px-4 py-2.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                isCompleted
                  ? 'border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 bg-white dark:bg-[#111625]'
                  : 'border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-[#0A1629] dark:text-white'
              }`}
            >
              {isCompleted ? '✓ Completed' : 'Mark as understood & completed'}
            </button>

            <Link href={`/app/quiz/${foundModule.id}`} className="w-full sm:w-auto">
              <button className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shadow-xs">
                Test understanding in quiz &rarr;
              </button>
            </Link>
          </div>
        </div>

        {/* Finn AI Prompt Card */}
        <div className="bg-white dark:bg-[#111625] rounded-xl p-4 sm:p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#0A1629] dark:text-[#F8FAFC]">Unclear about this lesson?</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Ask Finn for an alternative analogy or custom math scenario.</p>
            </div>
          </div>
          <Link href="/app/coach">
            <button className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer shrink-0">
              Ask Finn &rarr;
            </button>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
