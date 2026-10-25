'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
import { useAppState } from '@/lib/store';
import { useTheme } from '@/lib/theme';
import { Settings, User, ShieldAlert, CheckCircle2, RotateCcw, Moon, Sun, Monitor } from 'lucide-react';

export default function SettingsPage() {
  const { state, updateState, resetAllProgress } = useAppState();
  const { preference, setTheme } = useTheme();
  const [name, setName] = useState(state.profile.name);
  const [goal, setGoal] = useState(state.profile.financialGoal);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateState((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        name,
        financialGoal: goal
      }
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all lesson progress and reset your ₹10,000 sandbox portfolio?')) {
      resetAllProgress();
      alert('Progress reset to initial defaults.');
    }
  };

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Account Preferences
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-tight mt-1">
            Learner Settings
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Manage your personal learning context, notifications, and data privacy
          </p>
        </div>

        {/* Appearance / Theme Preference Card */}
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

        {/* Profile Card */}
        <div className="bg-white dark:bg-[#111625] rounded-3xl p-6 sm:p-9 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <h2 className="text-lg font-bold text-[#0A1629] dark:text-[#F8FAFC] flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Personal Profile
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
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
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
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-sm bg-slate-50 dark:bg-slate-800/40 text-slate-500 dark:text-slate-400"
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
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            <div className="pt-2 flex items-center gap-3">
              <Button type="submit" variant="primaryDark" size="md" className="rounded-full px-6 text-xs font-bold">
                Save Preferences
              </Button>
              {saved && (
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4" /> Changes Saved
                </span>
              )}
            </div>
          </form>
        </div>

        {/* Data & Reset Actions */}
        <div className="bg-white dark:bg-[#111625] rounded-3xl p-6 sm:p-9 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
          <h2 className="text-lg font-bold text-[#0A1629] dark:text-[#F8FAFC] flex items-center gap-2">
            <RotateCcw className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            Learning Progress & Sandbox Controls
          </h2>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Reset Lesson & Portfolio Progress</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Restore starting ₹10,000 cash balance and clear lesson checkmarks.</p>
            </div>
            <Button onClick={handleReset} variant="outline" size="sm" className="rounded-full text-xs font-bold text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700 bg-white dark:bg-[#111625]">
              Reset Progress
            </Button>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-rose-900 dark:text-rose-300">DPDP Account Deletion</p>
              <p className="text-[11px] text-rose-700 dark:text-rose-400">Submit an official request to permanently erase all data under DPDP guidelines.</p>
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
