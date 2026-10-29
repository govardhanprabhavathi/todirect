'use client';

import React, { useState } from 'react';
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
  Compass,
  User,
  Mail,
  GraduationCap,
  Target,
  Calendar,
  Edit3,
  Check,
  Zap,
  BookOpen
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Learner Profile & Academic Record
            </span>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-tight mt-1">
              Profile & Overall Performance
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-xl">
              Track your personal details, academic progress, cognitive accuracy score, and verified certificates.
            </p>
          </div>

          {!isEditing ? (
            <Button
              onClick={() => setIsEditing(true)}
              variant="outline"
              size="sm"
              className="rounded-full text-xs font-bold border-slate-300 dark:border-slate-700 flex items-center gap-1.5 self-start sm:self-auto"
            >
              <Edit3 className="w-3.5 h-3.5" /> Edit Profile Details
            </Button>
          ) : (
            <div className="flex items-center gap-2 self-start sm:self-auto">
              <Button
                onClick={() => setIsEditing(false)}
                variant="ghost"
                size="sm"
                className="rounded-full text-xs font-semibold text-slate-500"
              >
                Cancel
              </Button>
            </div>
          )}
        </div>

        {savedSuccess && (
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Profile details updated successfully!
          </div>
        )}

        {/* 1. BASIC DETAILS OF THE USER */}
        <div className="bg-white dark:bg-[#111625] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-bold text-2xl flex items-center justify-center shadow-md">
                {state.profile.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-xl font-bold text-[#0A1629] dark:text-[#F8FAFC]">
                  {state.profile.name}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" /> {state.profile.email}
                </p>
              </div>
            </div>

            <div className="hidden sm:flex flex-col items-end">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Current Status</span>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50 mt-1">
                Active Scholar
              </span>
            </div>
          </div>

          {!isEditing ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-[#FAF8F5]/80 dark:bg-[#0B0F19]/60 border border-slate-200/70 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-500" /> Education / Background
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#0A1629] dark:text-[#F8FAFC] mt-1.5">
                  {state.profile.educationLevel}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5]/80 dark:bg-[#0B0F19]/60 border border-slate-200/70 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-indigo-500" /> Primary Financial Goal
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#0A1629] dark:text-[#F8FAFC] mt-1.5">
                  {state.profile.financialGoal}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5]/80 dark:bg-[#0B0F19]/60 border border-slate-200/70 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-emerald-500" /> Cohort / Joined
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#0A1629] dark:text-[#F8FAFC] mt-1.5">
                  October 2026 Batch
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#FAF8F5]/80 dark:bg-[#0B0F19]/60 border border-slate-200/70 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500" /> Streak Consistency
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#0A1629] dark:text-[#F8FAFC] mt-1.5">
                  {state.profile.streakDays} Consecutive Days
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSaveProfile} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Full Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-[#0A1629] dark:text-[#F8FAFC]"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Education / Background</label>
                  <input
                    type="text"
                    value={editEducation}
                    onChange={(e) => setEditEducation(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-[#0A1629] dark:text-[#F8FAFC]"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Financial Goal</label>
                  <input
                    type="text"
                    value={editGoal}
                    onChange={(e) => setEditGoal(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-[#0A1629] dark:text-[#F8FAFC]"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button type="submit" size="sm" className="rounded-full text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white">
                  Save Changes
                </Button>
              </div>
            </form>
          )}
        </div>

        {/* 2. OVERALL PERFORMANCE & SCORE DASHBOARD */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Performance Score Card */}
          <div className="bg-gradient-to-br from-blue-600 via-indigo-600 to-blue-800 text-white rounded-3xl p-6 sm:p-8 shadow-md space-y-4 md:col-span-1 flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-blue-200">
                Composite Evaluation
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                Overall Performance Score
              </h3>
              <p className="text-xs text-blue-100/80 mt-1">
                Computed across concept diagnostics, follow-up probe precision, and sandbox trading discipline.
              </p>
            </div>

            <div className="py-4 text-center">
              <div className="inline-flex items-baseline gap-2">
                <span className="text-5xl sm:text-6xl font-black tracking-tight">{overallPerformanceScore}</span>
                <span className="text-xl text-blue-200 font-bold">/100</span>
              </div>
              <div className="mt-2">
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white">
                  Grade A • High Conceptual Competence
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/20 text-center">
              <p className="text-[11px] text-blue-100/90 font-medium">
                Top 8% in the October 2026 Cohort
              </p>
            </div>
          </div>

          {/* 4 Score Breakdown Cards */}
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-[#111625] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Syllabus Mastery
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#0A1629] dark:text-[#F8FAFC]">{syllabusPercentage}%</span>
                <span className="text-xs text-blue-600 font-semibold">{completedLessons}/{totalLessons} lessons</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden mt-3">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: `${syllabusPercentage}%` }} />
              </div>
            </div>

            <div className="bg-white dark:bg-[#111625] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Baseline Calibration
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#0A1629] dark:text-[#F8FAFC]">{state.profile.baselineScore || 80}%</span>
                <span className="text-xs text-emerald-600 font-semibold">calibrated</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Recorded on initial diagnostic</p>
            </div>

            <div className="bg-white dark:bg-[#111625] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Virtual Sandbox ROI
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">+3.8%</span>
                <span className="text-xs text-emerald-600 font-semibold">+₹380 profit</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Outperforming cash FD benchmark</p>
            </div>

            <div className="bg-white dark:bg-[#111625] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Quiz Success Rate
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-[#0A1629] dark:text-[#F8FAFC]">84%</span>
                <span className="text-xs text-blue-600 font-semibold">accuracy</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Across 24 Socratic follow-up probes</p>
            </div>
          </div>
        </div>

        {/* 3. COGNITIVE MISCONCEPTIONS DETECTED & RESOLVED */}
        <div className="bg-white dark:bg-[#111625] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#0A1629] dark:text-[#F8FAFC]">Cognitive Bias Audit & Misconception Log</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Biases identified during quizzes and how you resolved them</p>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {state.misconceptions.length} Flagged
            </span>
          </div>

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
                    Identified in module: <strong className="text-slate-800 dark:text-slate-200">{misc.moduleId}</strong>
                  </p>
                </div>

                <Link href={`/app/quizzes`}>
                  <Button variant="outline" size="sm" className="rounded-full text-xs font-bold bg-white dark:bg-[#111625] dark:border-slate-800">
                    Retake Socratic Drill &rarr;
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* 4. VERIFIED MASTERY BADGES */}
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
