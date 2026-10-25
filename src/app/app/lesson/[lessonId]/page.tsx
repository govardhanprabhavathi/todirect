'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
import { CURRICULUM_DATA, Lesson } from '@/lib/data';
import { useAppState } from '@/lib/store';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  BookOpen, 
  Calculator, 
  ChevronRight,
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
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Navigation back */}
        <div className="flex items-center justify-between">
          <Link
            href={`/app/learn/${foundModule.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to {foundModule.title}
          </Link>

          <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
            Topic 0{foundModule.order} • {lesson.duration}
          </span>
        </div>

        {/* Lesson Reading Container */}
        <div className="bg-white dark:bg-[#111625] rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          {/* Title & Metadata */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-[11px] font-bold uppercase tracking-wider">
                Lesson
              </span>
              {isCompleted && (
                <span className="text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Completed
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-tight">
              {lesson.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-medium">{lesson.summary}</p>
          </div>

          {/* Key Takeaway Callout Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 space-y-1.5">
            <span className="text-xs font-bold text-blue-800 dark:text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              Core Takeaway
            </span>
            <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
              {lesson.keyTakeaway}
            </p>
          </div>

          {/* Lesson Body Paragraphs */}
          <div className="space-y-4 text-sm text-slate-700 dark:text-slate-300 leading-relaxed pt-2">
            {lesson.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Interactive Calculator / Worked Example Widget */}
          {lesson.formula && (
            <div className="mt-6 p-6 rounded-2xl bg-[#FAF8F5] dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <Calculator className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h3 className="text-sm font-bold text-[#0A1629] dark:text-[#F8FAFC]">
                  Interactive Formula Sandbox: {lesson.formula}
                </h3>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>Annual Compound Return (r): {rate}%</span>
                  <span className="text-blue-600 dark:text-blue-400 font-bold">Doubling Time ≈ {doublingYears} years</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="24"
                  value={rate}
                  onChange={(e) => setRate(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
              </div>

              {lesson.workedExample && (
                <div className="mt-4 pt-4 border-t border-slate-200/70 dark:border-slate-800 text-xs space-y-1">
                  <p className="font-bold text-slate-800 dark:text-slate-200">Case Study: {lesson.workedExample.scenario}</p>
                  <p className="text-slate-600 dark:text-slate-400 font-mono">{lesson.workedExample.calculation}</p>
                  <p className="text-blue-700 dark:text-blue-300 font-medium italic mt-1">{lesson.workedExample.insight}</p>
                </div>
              )}
            </div>
          )}

          {/* Action Bar */}
          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button
              onClick={handleMarkComplete}
              variant={isCompleted ? 'outline' : 'primaryDark'}
              size="md"
              className="rounded-full px-6 text-xs font-bold w-full sm:w-auto"
            >
              {isCompleted ? '✓ Completed' : 'Mark as Understood & Completed'}
            </Button>

            <Link href={`/app/quiz/${foundModule.id}`} className="w-full sm:w-auto">
              <Button variant="primaryBlue" size="md" className="rounded-full px-6 text-xs font-bold w-full sm:w-auto">
                Test Understanding in Quiz &rarr;
              </Button>
            </Link>
          </div>
        </div>

        {/* Finn AI Prompt Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 rounded-2xl p-5 border border-blue-100 dark:border-blue-900/50 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#0A1629] dark:text-[#F8FAFC]">Unclear about this lesson?</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Ask Finn for an alternative analogy or custom math scenario.</p>
            </div>
          </div>
          <Link href="/app/coach">
            <Button size="sm" variant="outline" className="rounded-full text-xs font-bold bg-white dark:bg-[#111625] dark:border-slate-800 shrink-0">
              Ask Finn &rarr;
            </Button>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
