'use client';

import React from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
import { CURRICULUM_DATA } from '@/lib/data';
import { useAppState } from '@/lib/store';
import { 
  Award, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Flame, 
  TrendingUp, 
  PieChart, 
  ShieldCheck,
  Compass
} from 'lucide-react';

export default function ProgressTrackerPage() {
  const { state } = useAppState();

  const totalLessons = CURRICULUM_DATA.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = state.completedLessonIds.length;
  const overallPercentage = Math.round((completedLessons / totalLessons) * 100);

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Evidence-Based Intelligence
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-tight mt-1">
            Understanding & Misconception Tracker
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
            We measure demonstrable conceptual understanding and cognitive bias elimination rather than passive video completions.
          </p>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Overall Mastery Score
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-[#0A1629] dark:text-[#F8FAFC]">{overallPercentage}%</span>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">of syllabus demonstrated</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
              <div className="bg-blue-600 h-full rounded-full" style={{ width: `${overallPercentage}%` }} />
            </div>
          </div>

          <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Learning Streak
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-[#0A1629] dark:text-[#F8FAFC]">{state.profile.streakDays}</span>
              <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-amber-500" /> consecutive days
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">Daily consistency strengthens compounding habits.</p>
          </div>

          <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Starting Baseline Score
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-[#0A1629] dark:text-[#F8FAFC]">{state.profile.baselineScore || 80}%</span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">calibrated</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">Recorded during the 5-question entry diagnostic.</p>
          </div>
        </div>

        {/* Misconception Log Card */}
        <div className="bg-white dark:bg-[#111625] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#0A1629] dark:text-[#F8FAFC]">Recorded Cognitive Misconceptions</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Mental shortcuts surfaced during concept checks</p>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {state.misconceptions.length} Detected
            </span>
          </div>

          {state.misconceptions.length === 0 ? (
            <p className="text-xs text-slate-500 dark:text-slate-400 py-4 text-center">No misconceptions recorded yet. Keep solving quizzes!</p>
          ) : (
            <div className="space-y-3">
              {state.misconceptions.map((misc) => (
                <div
                  key={misc.id}
                  className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#0B0F19] border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2.5 py-0.5 rounded-full border border-rose-200 dark:border-rose-900/60">
                        {misc.misconception}
                      </span>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500">
                        {misc.timestamp}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                      Module context: <strong className="text-slate-800 dark:text-slate-200">{misc.moduleId}</strong>
                    </p>
                  </div>

                  <Link href={`/app/quiz/${misc.moduleId}`}>
                    <Button variant="outline" size="sm" className="rounded-full text-xs font-bold bg-white dark:bg-[#111625] dark:border-slate-800">
                      Retake Drills &rarr;
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 5 Verified Mastery Badges */}
        <div className="bg-white dark:bg-[#111625] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h2 className="text-lg font-bold text-[#0A1629] dark:text-[#F8FAFC] flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              Verified Competence Badges
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Badges unlocked strictly through proven understanding</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {state.badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-5 rounded-2xl border transition-all flex items-start gap-3.5 ${
                  badge.unlocked
                    ? 'bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50'
                    : 'bg-slate-50/60 dark:bg-[#0B0F19]/40 border-slate-200/60 dark:border-slate-800/60 opacity-60'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold shrink-0 ${
                    badge.unlocked
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                  }`}
                >
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-bold text-[#0A1629] dark:text-[#F8FAFC]">{badge.title}</h3>
                    {badge.unlocked && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{badge.description}</p>
                  <span className="inline-block mt-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {badge.category} • {badge.unlocked ? 'Unlocked' : 'In Progress'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
