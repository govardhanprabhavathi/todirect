'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Wallet, 
  PiggyBank, 
  TrendingDown, 
  Layers, 
  ShieldAlert, 
  PieChart, 
  BarChart3, 
  ArrowRight,
  Clock,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { BlurIn } from '@/components/ui/BlurInText';

interface CurriculumModule {
  id: string;
  order: number;
  title: string;
  tagline: string;
  duration: string;
  lessonsCount: number;
  icon: any;
  colorClass: string;
  accentBg: string;
}

const modules: CurriculumModule[] = [
  {
    id: 'money-foundations',
    order: 1,
    title: 'Money Foundations',
    tagline: 'Cashflow fundamentals, the 50/30/20 rule, and emergency buffers',
    duration: '25 mins',
    lessonsCount: 4,
    icon: Wallet,
    colorClass: 'text-blue-600 dark:text-blue-400',
    accentBg: 'bg-blue-50 dark:bg-blue-950/60'
  },
  {
    id: 'saving-compounding',
    order: 2,
    title: 'Saving & Compounding',
    tagline: 'The exponential mathematics of time, APY vs APR, and Rule of 72',
    duration: '30 mins',
    lessonsCount: 4,
    icon: PiggyBank,
    colorClass: 'text-indigo-600 dark:text-indigo-400',
    accentBg: 'bg-indigo-50 dark:bg-indigo-950/60'
  },
  {
    id: 'inflation-purchasing-power',
    order: 3,
    title: 'Inflation & Purchasing Power',
    tagline: 'Real vs nominal returns, CPI indexing, and the silent wealth erosion',
    duration: '25 mins',
    lessonsCount: 4,
    icon: TrendingDown,
    colorClass: 'text-amber-600 dark:text-amber-400',
    accentBg: 'bg-amber-50 dark:bg-amber-950/60'
  },
  {
    id: 'investment-vehicles',
    order: 4,
    title: 'Investment Vehicles',
    tagline: 'Equities, debt instruments, gold, and real assets compared',
    duration: '35 mins',
    lessonsCount: 5,
    icon: Layers,
    colorClass: 'text-emerald-600 dark:text-emerald-400',
    accentBg: 'bg-emerald-50 dark:bg-emerald-950/60'
  },
  {
    id: 'risk-diversification',
    order: 5,
    title: 'Risk & Diversification',
    tagline: 'Systematic vs unsystematic risk, correlation, and asset allocation',
    duration: '30 mins',
    lessonsCount: 4,
    icon: ShieldAlert,
    colorClass: 'text-rose-600 dark:text-rose-400',
    accentBg: 'bg-rose-50 dark:bg-rose-950/60'
  },
  {
    id: 'mutual-funds-etfs',
    order: 6,
    title: 'Mutual Funds & ETFs',
    tagline: 'Expense ratios, passive indexing, SIP discipline, and tracking error',
    duration: '35 mins',
    lessonsCount: 4,
    icon: PieChart,
    colorClass: 'text-cyan-600 dark:text-cyan-400',
    accentBg: 'bg-cyan-50 dark:bg-cyan-950/60'
  },
  {
    id: 'stock-markets-decision-making',
    order: 7,
    title: 'Stock Markets & Decision-Making',
    tagline: 'Market mechanics, valuation basics, emotional discipline, and portfolio rebalancing',
    duration: '40 mins',
    lessonsCount: 5,
    icon: BarChart3,
    colorClass: 'text-purple-600 dark:text-purple-400',
    accentBg: 'bg-purple-50 dark:bg-purple-950/60'
  }
];

export function CurriculumGrid() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header with Blur-In Animation */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <BlurIn
            as="span"
            delay={0.05}
            duration={0.7}
            blurAmount="6px"
            className="text-[11px] font-semibold text-[#475569] dark:text-slate-400 uppercase tracking-[0.14em] block mb-3"
          >
            COMPREHENSIVE SYLLABUS
          </BlurIn>

          <BlurIn
            as="h2"
            delay={0.12}
            duration={0.8}
            blurAmount="10px"
            yOffset={16}
            className="text-3xl sm:text-5xl md:text-[54px] font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-[-0.03em] leading-[1.12]"
          >
            The 7 Core Topics. <br />
            <span className="text-[#2563FF] dark:text-[#60A5FA]">Zero jargon. 100% clarity.</span>
          </BlurIn>
        </div>
        <div className="md:max-w-md">
          <BlurIn
            as="p"
            delay={0.22}
            duration={0.8}
            blurAmount="8px"
            yOffset={12}
            className="text-base font-normal text-[#475569] dark:text-[#94A3B8] leading-relaxed"
          >
            Carefully sequenced to guide you from absolute beginner to informed investor. Each module includes bite-sized lessons, interactive calculators, and concept check scenarios.
          </BlurIn>
          <div className="mt-4">
            <Link href="/curriculum">
              <button
                type="button"
                className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-[#0A1629] dark:text-white text-xs font-semibold transition-all shadow-2xs"
              >
                View Full Detailed Syllabus &rarr;
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Grid of 7 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((mod) => {
          const Icon = mod.icon;
          return (
            <div
              key={mod.id}
              className="group bg-white dark:bg-[#111625] rounded-3xl p-7 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Module Header */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-2xl ${mod.accentBg} ${mod.colorClass} flex items-center justify-center font-bold transition-transform group-hover:scale-105 duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Topic 0{mod.order}
                  </span>
                </div>

                <h3 className="text-xl font-semibold text-[#0A1629] dark:text-white tracking-[-0.015em] group-hover:text-[#2563FF] dark:group-hover:text-[#60A5FA] transition-colors">
                  {mod.title}
                </h3>
                <p className="mt-2 text-sm font-normal text-[#475569] dark:text-slate-300 leading-relaxed">
                  {mod.tagline}
                </p>
              </div>

              {/* Module Footer Info */}
              <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-1.5 font-normal">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {mod.duration} • {mod.lessonsCount} lessons
                </span>
                <Link
                  href={`/app/learn/${mod.id}`}
                  className="font-semibold text-[#2563FF] dark:text-[#60A5FA] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  Start &rarr;
                </Link>
              </div>
            </div>
          );
        })}

        {/* 8th Card: Capstone Practice Invitation */}
        <div className="bg-[#0A1629] dark:bg-[#070D1E] text-white rounded-3xl p-7 shadow-lg flex flex-col justify-between border border-slate-800">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold mb-5 border border-blue-400/30">
              <Sparkles className="w-6 h-6" />
            </div>
            <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-widest">
              Capstone Simulation
            </span>
            <h3 className="text-xl font-semibold text-white mt-1 tracking-[-0.015em]">
              ₹10,000 Portfolio Sandbox
            </h3>
            <p className="mt-2 text-sm font-normal text-slate-300 leading-relaxed">
              Test your understanding across all 7 topics by managing a simulated diversified portfolio with live concentration risk feedback.
            </p>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-800">
            <Link href="/practice">
              <button
                type="button"
                className="w-full inline-flex items-center justify-center px-4 py-2.5 rounded-full bg-[#2563FF] hover:bg-[#1748D8] text-white text-xs font-semibold transition-all"
              >
                Explore Sandbox Features &rarr;
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
