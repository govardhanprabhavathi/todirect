'use client';

import React from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
import { CURRICULUM_DATA } from '@/lib/data';
import { useAppState } from '@/lib/store';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  Sliders, 
  Award, 
  AlertCircle, 
  CheckCircle2, 
  TrendingUp, 
  Clock, 
  Flame,
  PieChart,
  Bot
} from 'lucide-react';

export default function LearnerDashboard() {
  const { state } = useAppState();

  const totalLessons = CURRICULUM_DATA.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = state.completedLessonIds.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  // Active module
  const currentModule = CURRICULUM_DATA[1]; // Saving & Compounding

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Learner Workspace
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                {state.profile.educationLevel}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-tight">
              Welcome back, {state.profile.name} 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Current Goal: {state.profile.financialGoal}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/app/practice">
              <Button size="sm" variant="outline" className="rounded-full text-xs font-bold bg-white dark:bg-[#111625] dark:border-slate-800">
                <Sliders className="w-3.5 h-3.5 mr-1 text-blue-600 dark:text-blue-400" />
                ₹10K Sandbox
              </Button>
            </Link>
            <Link href="/app/coach">
              <Button size="sm" variant="primaryDark" className="rounded-full text-xs font-bold">
                <Bot className="w-3.5 h-3.5 mr-1" />
                Ask Finn
              </Button>
            </Link>
          </div>
        </div>

        {/* 1. Radiant Sky Mesh Hero: Continue Learning Card (Calendly Style) */}
        <div className="relative rounded-[28px] p-6 sm:p-9 bg-gradient-to-br from-[#72B3FD] via-[#94C5FF] to-[#D2E4FF] dark:from-[#1E3A8A] dark:via-[#1D4ED8] dark:to-[#0369A1] shadow-lg border border-white/50 dark:border-white/10 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-44 h-44 bg-white/40 dark:bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-white/15 backdrop-blur-sm text-blue-900 dark:text-blue-100 text-xs font-bold tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-300" />
                In Progress: Topic 02
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#0A1629] dark:text-white tracking-tight">
                Saving & Compounding Math
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-blue-100/90 leading-relaxed">
                You are on Lesson 2: "Mental Math with the Rule of 72". Learn how to estimate portfolio doubling speed in under 5 seconds.
              </p>

              {/* Progress bar */}
              <div className="pt-2">
                <div className="flex justify-between text-xs font-bold text-slate-800 dark:text-blue-50 mb-1.5">
                  <span>Curriculum Completion</span>
                  <span>{completedCount} of {totalLessons} lessons ({progressPercent}%)</span>
                </div>
                <div className="w-full bg-white/70 dark:bg-white/20 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 dark:bg-white h-full rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-3">
              <Link href="/app/lesson/sc-2">
                <Button size="lg" variant="primaryDark" className="rounded-full px-7 text-xs font-bold shadow-md w-full">
                  Resume Lesson &rarr;
                </Button>
              </Link>
              <Link href="/app/quiz/saving-compounding">
                <Button size="lg" variant="pure" className="rounded-full px-7 text-xs font-bold w-full text-slate-800 dark:text-slate-900">
                  Take Concept Quiz
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* 2. 6-Stage Journey Tracker Ribbon */}
        <div className="bg-white dark:bg-[#111625] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
            Learning Journey Continuum
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {[
              { label: 'START', state: 'done' },
              { label: 'LEARN', state: 'current' },
              { label: 'TEST', state: 'next' },
              { label: 'TRACK', state: 'locked' },
              { label: 'IMPROVE', state: 'locked' },
              { label: 'PRACTISE', state: 'unlocked' }
            ].map((st, i) => (
              <div
                key={i}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  st.state === 'current'
                    ? 'bg-blue-50 dark:bg-blue-950/50 border-blue-500 text-blue-700 dark:text-blue-300 font-bold'
                    : st.state === 'done'
                    ? 'bg-slate-50 dark:bg-[#0B0F19] border-slate-200 dark:border-slate-800 text-emerald-700 dark:text-emerald-400 font-semibold'
                    : 'bg-white dark:bg-[#111625] border-slate-100 dark:border-slate-800/60 text-slate-400 dark:text-slate-600 font-medium'
                }`}
              >
                <div className="text-[10px] uppercase tracking-wider opacity-70">Stage 0{i + 1}</div>
                <div className="text-xs font-bold mt-0.5">{st.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Bento Grid: Evidence Diagnostics & Portfolio Snapshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Misconception Insight */}
          <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
                  {state.misconceptions.filter(m => !m.resolved).length} Pending Review
                </span>
              </div>
              <h3 className="text-base font-bold text-[#0A1629] dark:text-[#F8FAFC]">Misconception Alert</h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                {state.misconceptions[0]?.misconception || 'No active misconceptions detected! Excellent logical reasoning.'}
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Link href="/app/progress" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                Review and Debiase in Tracker &rarr;
              </Link>
            </div>
          </div>

          {/* Card 2: ₹10,000 Portfolio Health */}
          <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  <PieChart className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                  Diversified
                </span>
              </div>
              <h3 className="text-base font-bold text-[#0A1629] dark:text-[#F8FAFC]">₹10K Sandbox Status</h3>
              <div className="mt-2 space-y-1 text-xs">
                <p className="text-slate-500 dark:text-slate-400">
                  Cash Balance: <span className="font-bold text-[#0A1629] dark:text-[#F8FAFC]">₹{state.portfolio.cashBalance.toLocaleString('en-IN')}</span>
                </p>
                <p className="text-slate-500 dark:text-slate-400">
                  Active Holdings: <span className="font-bold text-[#0A1629] dark:text-[#F8FAFC]">{state.portfolio.holdings.length} instruments</span>
                </p>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Link href="/app/practice" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                Execute Practice Orders &rarr;
              </Link>
            </div>
          </div>

          {/* Card 3: Finn AI Companion Pulse */}
          <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300">
                  Online
                </span>
              </div>
              <h3 className="text-base font-bold text-[#0A1629] dark:text-[#F8FAFC]">Finn Coaching Socratic Prompt</h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic">
                "If inflation is 6% and your deposit yields 6.5%, what is your real tax-adjusted growth?"
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Link href="/app/coach" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                Chat with Finn &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* 4. 7-Topic Curriculum Matrix */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-[#0A1629] dark:text-[#F8FAFC]">All 7 Curriculum Modules</h2>
            <Link href="/app/learn" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline">
              View Catalog &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CURRICULUM_DATA.map((mod) => {
              const completedInMod = mod.lessons.filter((l) => state.completedLessonIds.includes(l.id)).length;
              const isPassed = state.passedQuizIds.includes(mod.questions[0]?.id);
              const isStarted = completedInMod > 0;

              return (
                <div
                  key={mod.id}
                  className="bg-white dark:bg-[#111625] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:border-blue-400 dark:hover:border-blue-500 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 uppercase">
                        Topic 0{mod.order}
                      </span>
                      {isPassed ? (
                        <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> Passed
                        </span>
                      ) : isStarted ? (
                        <span className="text-[10px] font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded-full">
                          In Progress
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/40 px-2 py-0.5 rounded-full">
                          Not Started
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-[#0A1629] dark:text-[#F8FAFC]">{mod.title}</h3>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{mod.tagline}</p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400 dark:text-slate-500">
                      {completedInMod}/{mod.lessons.length} lessons
                    </span>
                    <Link
                      href={`/app/learn/${mod.id}`}
                      className="font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      Open Module &rarr;
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
