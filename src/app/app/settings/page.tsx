'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
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
  Sliders, 
  Download, 
  Volume2, 
  Sparkles,
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
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            System Preferences
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-tight mt-1">
            Application Settings & Controls
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Customize your learning experience, AI coach rigor, sandbox rules, notifications, and privacy preferences.
          </p>
        </div>

        {/* 1. Theme & Appearance */}
        <div className="bg-white dark:bg-[#111625] rounded-3xl p-6 sm:p-9 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-[#0A1629] dark:text-[#F8FAFC] flex items-center gap-2">
            <Sun className="w-5 h-5 text-amber-500 dark:text-amber-400" />
            Theme & Appearance
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Choose your preferred color theme or sync automatically with your device system settings.
          </p>

          <div className="grid grid-cols-3 gap-3 pt-2">
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`p-3.5 rounded-2xl border text-center flex flex-col items-center gap-2 transition-all ${
                preference === 'light'
                  ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-600 text-blue-700 dark:text-blue-300 font-bold shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <Sun className="w-5 h-5 text-amber-500" />
              <span className="text-xs font-semibold">Light</span>
            </button>

            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`p-3.5 rounded-2xl border text-center flex flex-col items-center gap-2 transition-all ${
                preference === 'dark'
                  ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-600 text-blue-700 dark:text-blue-300 font-bold shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <Moon className="w-5 h-5 text-blue-500" />
              <span className="text-xs font-semibold">Dark</span>
            </button>

            <button
              type="button"
              onClick={() => setTheme('system')}
              className={`p-3.5 rounded-2xl border text-center flex flex-col items-center gap-2 transition-all ${
                preference === 'system'
                  ? 'bg-blue-50/70 dark:bg-blue-950/40 border-blue-600 text-blue-700 dark:text-blue-300 font-bold shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <Monitor className="w-5 h-5 text-slate-500" />
              <span className="text-xs font-semibold">System</span>
            </button>
          </div>
        </div>

        {/* 2. AI Coach & Socratic Learning Preferences */}
        <div className="bg-white dark:bg-[#111625] rounded-3xl p-6 sm:p-9 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-[#0A1629] dark:text-[#F8FAFC] flex items-center gap-2">
            <BrainCircuit className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            AI Coach & Socratic Probing Settings
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
                Socratic Probing Rigor Level
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
                    className={`p-3.5 rounded-2xl border text-left transition-all ${
                      socraticDepth === lvl.id
                        ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-600 text-blue-950 dark:text-blue-200 ring-2 ring-blue-500/30'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="text-xs font-bold">{lvl.title}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">{lvl.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 divide-y divide-slate-100 dark:divide-slate-800">
              <div className="py-3.5 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#0A1629] dark:text-[#F8FAFC]">Mandatory Trade Rationale in Sandbox</h4>
                  <p className="text-[11px] text-slate-500">Require writing investment reasoning before executing any paper trade</p>
                </div>
                <input
                  type="checkbox"
                  checked={requireRationale}
                  onChange={(e) => setRequireRationale(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 accent-blue-600"
                />
              </div>

              <div className="py-3.5 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-[#0A1629] dark:text-[#F8FAFC]">Interactive Audio Feedback</h4>
                  <p className="text-[11px] text-slate-500">Subtle sound chimes when passing quizzes and resolving cognitive biases</p>
                </div>
                <input
                  type="checkbox"
                  checked={soundEffects}
                  onChange={(e) => setSoundEffects(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 accent-blue-600"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 3. Notifications & Study Schedule Alerts */}
        <div className="bg-white dark:bg-[#111625] rounded-3xl p-6 sm:p-9 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-[#0A1629] dark:text-[#F8FAFC] flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Study Alerts & Market Updates
          </h2>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            <div className="py-3.5 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-[#0A1629] dark:text-[#F8FAFC]">Daily Smart Revision (SRS) Reminder</h4>
                <p className="text-[11px] text-slate-500">Gentle reminder to review your completed concept cheat sheets</p>
              </div>
              <input
                type="checkbox"
                checked={dailyReminder}
                onChange={(e) => setDailyReminder(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 accent-blue-600"
              />
            </div>

            <div className="py-3.5 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-[#0A1629] dark:text-[#F8FAFC]">Live Financial News & Upcoming IPOs</h4>
                <p className="text-[11px] text-slate-500">Curated market briefings and SEBI red-herring prospectus breakdowns</p>
              </div>
              <input
                type="checkbox"
                checked={newsAlerts}
                onChange={(e) => setNewsAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 accent-blue-600"
              />
            </div>
          </div>
        </div>

        {/* 4. Learner Profile & Context */}
        <div className="bg-white dark:bg-[#111625] rounded-3xl p-6 sm:p-9 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-[#0A1629] dark:text-[#F8FAFC] flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Learner Account Details
          </h2>

          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Display Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Registered Email
              </label>
              <input
                type="email"
                disabled
                value={state.profile.email}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs bg-slate-50 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Education / Professional Background
              </label>
              <input
                type="text"
                value={education}
                onChange={(e) => setEducation(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                Primary Financial Goal
              </label>
              <input
                type="text"
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="pt-2 flex items-center gap-3">
              <Button type="submit" size="sm" className="rounded-full px-6 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white">
                Save Preferences
              </Button>
              {saved && (
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Preferences Saved
                </span>
              )}
            </div>
          </form>
        </div>

        {/* 5. Data Export & Privacy Controls */}
        <div className="bg-white dark:bg-[#111625] rounded-3xl p-6 sm:p-9 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
          <h2 className="text-lg font-bold text-[#0A1629] dark:text-[#F8FAFC] flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            Data Management & Account Safety
          </h2>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-600" /> Export Learning & Portfolio Audit
              </p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Download your verified syllabus completion transcript and trade logs.</p>
            </div>
            <Button onClick={handleExportData} variant="outline" size="sm" className="rounded-full text-xs font-bold border-slate-300 dark:border-slate-700 bg-white dark:bg-[#111625]">
              {exportNotice ? 'Export Generated!' : 'Export JSON'}
            </Button>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Reset Lesson & Sandbox Portfolio</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Restore starting ₹10,000 / ₹1,00,000 cash balance and clear lesson checkmarks.</p>
            </div>
            <Button onClick={handleReset} variant="outline" size="sm" className="rounded-full text-xs font-bold text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700 bg-white dark:bg-[#111625]">
              Reset Progress
            </Button>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-rose-900 dark:text-rose-300">DPDP Compliance & Account Erasure</p>
              <p className="text-[11px] text-rose-700 dark:text-rose-400">Submit an official request to permanently erase all data under Indian DPDP guidelines.</p>
            </div>
            <Link href="/privacy#deletion">
              <Button variant="danger" size="sm" className="rounded-full text-xs font-bold">
                Request Erasure &rarr;
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
