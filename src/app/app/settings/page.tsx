'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { useAppState } from '@/lib/store';
import { useTheme } from '@/lib/theme';
import { 
  Settings, 
  User, 
  ShieldAlert, 
  CheckCircle2, 
  RotateCcw, 
  Moon, 
  Sun, 
  Monitor, 
  Bell, 
  BrainCircuit, 
  Download, 
  FileText
} from 'lucide-react';

export default function SettingsPage() {
  const { state, updateState, resetAllProgress } = useAppState();
  const { preference, setTheme } = useTheme();
  
  // Profile settings
  const [name, setName] = useState(state.profile.name);
  const [goal, setGoal] = useState(state.profile.financialGoal);
  const [education, setEducation] = useState(state.profile.educationLevel);
  const [saved, setSaved] = useState(false);

  // App experience settings
  const [socraticDepth, setSocraticDepth] = useState<'gentle' | 'standard' | 'rigorous'>('standard');
  const [requireRationale, setRequireRationale] = useState(true);
  const [dailyReminder, setDailyReminder] = useState(true);
  const [newsAlerts, setNewsAlerts] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [exportNotice, setExportNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateState((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        name,
        financialGoal: goal,
        educationLevel: education
      }
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all lesson progress and reset your sandbox portfolio?')) {
      resetAllProgress();
      alert('Progress reset to initial defaults.');
    }
  };

  const handleExportData = () => {
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400">
              <Settings className="w-3.5 h-3.5" />
              System preferences
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-tight">
            Application Settings & Controls
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Customize your learning experience, AI coach rigor, sandbox rules, notifications, and privacy preferences
          </p>
        </div>

        {/* 1. Theme & Appearance */}
        <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div>
            <h2 className="text-base font-semibold text-[#0A1629] dark:text-[#F8FAFC] flex items-center gap-2">
              <Sun className="w-4 h-4 text-amber-500 dark:text-amber-400" />
              Theme & Appearance
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Choose your preferred color theme or sync automatically with your device system settings
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 pt-1">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`p-3 rounded-xl border text-center flex flex-col items-center gap-2 transition-colors cursor-pointer ${
                preference === 'light'
                  ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-600 text-blue-700 dark:text-blue-300 font-medium shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-[#0B0F19]'
              }`}
            >
              <Sun className="w-4 h-4 text-amber-500" />
              <span className="text-xs font-medium">Light</span>
            </button>

            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`p-3 rounded-xl border text-center flex flex-col items-center gap-2 transition-colors cursor-pointer ${
                preference === 'dark'
                  ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-600 text-blue-700 dark:text-blue-300 font-medium shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-[#0B0F19]'
              }`}
            >
              <Moon className="w-4 h-4 text-blue-500" />
              <span className="text-xs font-medium">Dark</span>
            </button>

            <button
              type="button"
              onClick={() => setTheme('system')}
              className={`p-3 rounded-xl border text-center flex flex-col items-center gap-2 transition-colors cursor-pointer ${
                preference === 'system'
                  ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-600 text-blue-700 dark:text-blue-300 font-medium shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-[#0B0F19]'
              }`}
            >
              <Monitor className="w-4 h-4 text-slate-500" />
              <span className="text-xs font-medium">System</span>
            </button>
          </div>
        </div>

        {/* 2. AI Coach & Socratic Learning Preferences */}
        <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800/80">
            <h2 className="text-base font-semibold text-[#0A1629] dark:text-[#F8FAFC] flex items-center gap-2">
              <BrainCircuit className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              AI Coach & Socratic Probing Settings
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Tune pedagogical depth and reflection requirements
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
                Socratic probing rigor level
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'gentle', title: 'Gentle', desc: 'Encouraging hints with direct explanations' },
                  { id: 'standard', title: 'Standard', desc: 'Balanced Socratic counter-questions & diagnostics' },
                  { id: 'rigorous', title: 'Rigorous', desc: 'Strict cognitive bias challenge & unyielding proof' }
                ].map(lvl => (
                  <button
                    key={lvl.id}
                    type="button"
                    onClick={() => setSocraticDepth(lvl.id as any)}
                    className={`p-3 rounded-xl border text-left transition-colors cursor-pointer ${
                      socraticDepth === lvl.id
                        ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-600 text-blue-950 dark:text-blue-200 ring-1 ring-blue-500/30'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-[#0B0F19]'
                    }`}
                  >
                    <div className="text-xs font-semibold">{lvl.title}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">{lvl.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 divide-y divide-slate-100 dark:divide-slate-800">
              <div className="py-3 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-medium text-[#0A1629] dark:text-[#F8FAFC]">Mandatory trade rationale in sandbox</h4>
                  <p className="text-xs text-slate-500">Require writing investment reasoning before executing any paper trade</p>
                </div>
                <input
                  type="checkbox"
                  checked={requireRationale}
                  onChange={(e) => setRequireRationale(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
                />
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-medium text-[#0A1629] dark:text-[#F8FAFC]">Interactive audio feedback</h4>
                  <p className="text-xs text-slate-500">Subtle sound chimes when passing quizzes and resolving cognitive biases</p>
                </div>
                <input
                  type="checkbox"
                  checked={soundEffects}
                  onChange={(e) => setSoundEffects(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Notifications & Study Schedule Alerts */}
        <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800/80">
            <h2 className="text-base font-semibold text-[#0A1629] dark:text-[#F8FAFC] flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Study Alerts & Market Updates
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Manage study pacing and financial intelligence feeds</p>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            <div className="py-3 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-medium text-[#0A1629] dark:text-[#F8FAFC]">Daily Smart Revision (SRS) reminder</h4>
                <p className="text-xs text-slate-500">Gentle reminder to review your completed concept cheat sheets</p>
              </div>
              <input
                type="checkbox"
                checked={dailyReminder}
                onChange={(e) => setDailyReminder(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
              />
            </div>

            <div className="py-3 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-medium text-[#0A1629] dark:text-[#F8FAFC]">Live financial news & upcoming IPOs</h4>
                <p className="text-xs text-slate-500">Curated market briefings and SEBI red-herring prospectus breakdowns</p>
              </div>
              <input
                type="checkbox"
                checked={newsAlerts}
                onChange={(e) => setNewsAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 accent-blue-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 4. Learner Profile & Context */}
        <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800/80">
            <h2 className="text-base font-semibold text-[#0A1629] dark:text-[#F8FAFC] flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Learner Account Details
            </h2>
          </div>

          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Display name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Registered email
              </label>
              <input
                type="email"
                disabled
                value={state.profile.email}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400 cursor-not-allowed font-mono"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Education / professional background
              </label>
              <input
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Primary financial goal
              </label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shadow-xs"
              >
                Save preferences
              </button>
              {saved && (
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Preferences saved
                </span>
              )}
            </div>
          </form>
        </div>

        {/* 5. Data Export & Privacy Controls */}
        <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-4">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800/80">
            <h2 className="text-base font-semibold text-[#0A1629] dark:text-[#F8FAFC] flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Data Management & Account Safety
            </h2>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/60 dark:bg-[#0B0F19]/40 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Export learning & portfolio audit
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Download your verified syllabus completion transcript and trade logs.</p>
            </div>
            <button
              onClick={handleExportData}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium border border-slate-300 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer self-start sm:self-auto"
            >
              {exportNotice ? 'Export generated!' : 'Export JSON'}
            </button>
          </div>

          <div className="p-4 rounded-xl bg-slate-50/60 dark:bg-[#0B0F19]/40 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">Reset lesson & sandbox portfolio</p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Restore starting ₹10,000 / ₹1,00,000 cash balance and clear lesson checkmarks.</p>
            </div>
            <button
              onClick={handleReset}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors cursor-pointer self-start sm:self-auto"
            >
              Reset progress
            </button>
          </div>

          <div className="p-4 rounded-xl bg-rose-50/40 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-rose-900 dark:text-rose-300">DPDP compliance & account erasure</p>
              <p className="text-xs text-rose-700 dark:text-rose-400 mt-0.5">Submit an official request to permanently erase all data under Indian DPDP guidelines.</p>
            </div>
            <Link href="/privacy#deletion">
              <button className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-rose-700 dark:text-rose-400 border border-rose-300 dark:border-rose-800 hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors cursor-pointer self-start sm:self-auto">
                Request erasure &rarr;
              </button>
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
