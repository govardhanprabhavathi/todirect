'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { Button } from '@/components/ui/Button';
import { CURRICULUM_DATA } from '@/lib/data';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { 
  ShieldCheck, 
  Users, 
  BarChart3, 
  AlertTriangle, 
  BookOpen, 
  CheckCircle2, 
  ArrowLeft,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

export default function AdminPortalPage() {
  const [modules, setModules] = useState(
    CURRICULUM_DATA.map((m) => ({ ...m, isLive: true }))
  );

  const toggleModuleStatus = (id: string) => {
    setModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isLive: !m.isLive } : m))
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#070A11] text-[#0A1629] dark:text-[#F8FAFC] antialiased p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200/80 dark:border-slate-800 gap-4">
          <div className="flex items-center gap-3">
            <Logo size="md" />
            <span className="text-xs font-bold uppercase tracking-wider bg-slate-900 dark:bg-blue-600 text-white px-2.5 py-1 rounded-full">
              Admin Portal
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/app">
              <Button variant="outline" size="sm" className="rounded-full text-xs font-bold bg-white dark:bg-[#111625] dark:border-slate-800">
                <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Return to Learner Workspace
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 Aggregate Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white dark:bg-[#111625] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-400 dark:text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Active Cohort</span>
              <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-2xl font-semibold text-[#0A1629] dark:text-[#F8FAFC]">4,280</p>
            <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">+18% this month</p>
          </div>

          <div className="bg-white dark:bg-[#111625] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-400 dark:text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Diagnostic Avg</span>
              <BarChart3 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-2xl font-semibold text-[#0A1629] dark:text-[#F8FAFC]">74.2%</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Baseline accuracy score</p>
          </div>

          <div className="bg-white dark:bg-[#111625] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-400 dark:text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Top Bias Surfaced</span>
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <p className="text-base font-bold text-[#0A1629] dark:text-[#F8FAFC] truncate">Money Illusion</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">42% confused nominal with real</p>
          </div>

          <div className="bg-white dark:bg-[#111625] rounded-2xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
            <div className="flex items-center justify-between text-slate-400 dark:text-slate-500">
              <span className="text-xs font-bold uppercase tracking-wider">Active Topics</span>
              <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-2xl font-semibold text-[#0A1629] dark:text-[#F8FAFC]">7 of 7 Live</p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">28 verified lessons</p>
          </div>
        </div>

        {/* Curriculum Content Management */}
        <div className="bg-white dark:bg-[#111625] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-[#0A1629] dark:text-[#F8FAFC]">Curriculum Module Visibility Manager</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Toggle published topics available to learners</p>
            </div>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">SEBI Compliant Bank</span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {modules.map((m) => (
              <div key={m.id} className="py-4 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase font-mono">
                      Topic 0{m.order}
                    </span>
                    <h3 className="text-sm font-bold text-[#0A1629] dark:text-[#F8FAFC]">{m.title}</h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {m.lessons.length} lessons
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{m.tagline}</p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleModuleStatus(m.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                    m.isLive
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${m.isLive ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                  {m.isLive ? 'Published' : 'Hidden'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Question & Misconception Bank */}
        <div className="bg-white dark:bg-[#111625] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-[#0A1629] dark:text-[#F8FAFC]">Calibrated Question Bank</h2>
          <div className="space-y-3">
            {CURRICULUM_DATA.map((mod) => (
              <div key={mod.id} className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-[#0B0F19] border border-slate-200/80 dark:border-slate-800 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Topic 0{mod.order}: {mod.title}
                </span>
                <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{mod.questions[0]?.scenario}</p>
                <div className="flex flex-wrap gap-2 pt-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Tagged Distractor Misconceptions:</span>
                  {mod.questions[0]?.options.filter(o => o.misconception).map((o, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 font-medium border border-rose-200 dark:border-rose-900/60">
                      {o.misconception}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
