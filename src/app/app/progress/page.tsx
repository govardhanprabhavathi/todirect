'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { CURRICULUM_DATA } from '@/lib/data';
import { useAppState } from '@/lib/store';
import { 
  Award, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Flame, 
  TrendingUp, 
  ShieldCheck,
  User,
  Mail,
  GraduationCap,
  Target,
  Calendar,
  Edit3,
  Check
} from 'lucide-react';

export default function ProfileAndProgressPage() {
  const { state, updateState } = useAppState();

  const totalLessons = CURRICULUM_DATA.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedLessons = state.completedLessonIds.length;
  const syllabusPercentage = Math.round((completedLessons / totalLessons) * 100);

  // Overall performance composite score calculation
  const overallPerformanceScore = Math.min(
    98,
    Math.round(
      (syllabusPercentage * 0.3) +
      ((state.profile.baselineScore || 80) * 0.3) +
      (Math.min(100, state.profile.streakDays * 15) * 0.2) +
      (state.badges.filter(b => b.unlocked).length * 4)
    )
  );

  // Inline profile editing state
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(state.profile.name);
  const [editGoal, setEditGoal] = useState(state.profile.financialGoal);
  const [editEducation, setEditEducation] = useState(state.profile.educationLevel);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateState(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        name: editName,
        financialGoal: editGoal,
        educationLevel: editEducation
      }
    }));
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400">
                <User className="w-3.5 h-3.5" />
                Learner profile & academic record
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-tight">
              Profile & Overall Performance
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 max-w-xl">
              Track your personal details, academic progress, cognitive accuracy score, and verified certificates
            </p>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-medium text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit profile details
            </button>
          ) : (
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => setIsEditing(false)}
                className="px-3.5 py-2 rounded-lg text-xs font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        {savedSuccess && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-xs font-medium text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            Profile details updated successfully!
          </div>
        )}

        {/* 1. BASIC DETAILS OF THE USER */}
        <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-blue-600 text-white font-semibold text-xl flex items-center justify-center shadow-xs">
                {state.profile.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#0A1629] dark:text-[#F8FAFC]">
                  {state.profile.name}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> {state.profile.email}
                </p>
              </div>
            </div>

            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[11px] text-slate-400">Current status</span>
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900/50 mt-1">
                Active scholar
              </span>
            </div>
          </div>

          {!isEditing ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
              <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-500" /> Education / background
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#0A1629] dark:text-[#F8FAFC] mt-1.5">
                  {state.profile.educationLevel}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-blue-500" /> Primary financial goal
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#0A1629] dark:text-[#F8FAFC] mt-1.5">
                  {state.profile.financialGoal}
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-500" /> Cohort / joined
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#0A1629] dark:text-[#F8FAFC] mt-1.5">
                  October 2026 Batch
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50/70 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-amber-500" /> Streak consistency
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#0A1629] dark:text-[#F8FAFC] mt-1.5">
                  {state.profile.streakDays} Consecutive Days
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSaveProfile} className="space-y-4 pt-1">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Full name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-[#0A1629] dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Education / background</label>
                  <input
                    type="text"
                    value={editEducation}
                    onChange={(e) => setEditEducation(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-[#0A1629] dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300">Financial goal</label>
                  <input
                    type="text"
                    value={editGoal}
                    onChange={(e) => setEditGoal(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-[#0A1629] dark:text-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shadow-xs"
                >
                  Save changes
                </button>
              </div>
            </form>
          )}
        </div>

        {/* 2. OVERALL PERFORMANCE & SCORE DASHBOARD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Main Performance Score Card */}
          <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4 md:col-span-1 flex flex-col justify-between">
            <div>
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                Composite evaluation
              </span>
              <h3 className="text-base font-semibold text-[#0A1629] dark:text-[#F8FAFC] mt-0.5">
                Overall Performance Score
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Computed across concept diagnostics, follow-up probe precision, and sandbox trading discipline.
              </p>
            </div>

            <div className="py-2 text-center">
              <div className="inline-flex items-baseline gap-1.5">
                <span className="text-5xl font-black font-mono tracking-tight text-[#0A1629] dark:text-white">{overallPerformanceScore}</span>
                <span className="text-lg text-slate-400 font-mono">/100</span>
              </div>
              <div className="mt-2">
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/50">
                  Grade A • High conceptual competence
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Top 8% in the October 2026 Cohort
              </p>
            </div>
          </div>

          {/* 4 Score Breakdown Cards */}
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-[#111625] rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Syllabus mastery
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-[#0A1629] dark:text-[#F8FAFC]">{syllabusPercentage}%</span>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">{completedLessons}/{totalLessons} lessons</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-2">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: `${syllabusPercentage}%` }} />
              </div>
            </div>

            <div className="bg-white dark:bg-[#111625] rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Baseline calibration
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-[#0A1629] dark:text-[#F8FAFC]">{state.profile.baselineScore || 80}%</span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">calibrated</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Recorded on initial diagnostic</p>
            </div>

            <div className="bg-white dark:bg-[#111625] rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Virtual sandbox ROI
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">+3.8%</span>
                <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">+₹380 profit</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Outperforming cash FD benchmark</p>
            </div>

            <div className="bg-white dark:bg-[#111625] rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-2">
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Quiz success rate
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-[#0A1629] dark:text-[#F8FAFC]">84%</span>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">accuracy</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Across 24 Socratic follow-up probes</p>
            </div>
          </div>
        </div>

        {/* 3. COGNITIVE MISCONCEPTIONS DETECTED & RESOLVED */}
        <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold border border-rose-100 dark:border-rose-900/40">
                <AlertCircle className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-[#0A1629] dark:text-[#F8FAFC]">Cognitive Bias Audit & Misconception Log</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Biases identified during quizzes and how you resolved them</p>
              </div>
            </div>
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
              {state.misconceptions.length} Flagged
            </span>
          </div>

          <div className="space-y-3">
            {state.misconceptions.map((misc) => (
              <div
                key={misc.id}
                className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-md border border-rose-200/60 dark:border-rose-900/50">
                      {misc.misconception}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {misc.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Identified in module: <strong className="text-slate-800 dark:text-slate-200 font-medium">{misc.moduleId}</strong>
                  </p>
                </div>

                <Link href={`/app/quizzes`}>
                  <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer">
                    Retake drill &rarr;
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* 4. VERIFIED MASTERY BADGES */}
        <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800/80">
            <h2 className="text-base font-semibold text-[#0A1629] dark:text-[#F8FAFC] flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Verified Competence Badges
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Badges unlocked strictly through proven understanding</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {state.badges.map((badge) => (
              <div
                key={badge.id}
                className={`p-4 rounded-xl border transition-colors flex items-start gap-3 ${
                  badge.unlocked
                    ? 'bg-blue-50/40 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900/50'
                    : 'bg-slate-50/40 dark:bg-slate-900/30 border-slate-200/60 dark:border-slate-800/60 opacity-60'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold shrink-0 ${
                    badge.unlocked
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                  }`}
                >
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-semibold text-[#0A1629] dark:text-[#F8FAFC]">{badge.title}</h3>
                    {badge.unlocked && <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{badge.description}</p>
                  <span className="inline-block mt-2 text-[11px] font-medium text-slate-400 dark:text-slate-500">
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
