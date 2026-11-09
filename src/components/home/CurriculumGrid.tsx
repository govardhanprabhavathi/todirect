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
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <BlurIn
            as="span"
            delay={0.05}
            duration={0.7}
            blurAmount="6px"
            className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-3"
          >
            Syllabus structure
          </BlurIn>

          <BlurIn
            as="h2"
            delay={0.12}
            duration={0.8}
            blurAmount="10px"
            yOffset={16}
            className="text-3xl sm:text-5xl md:text-[50px] font-semibold text-slate-900 dark:text-slate-100 tracking-tight leading-[1.15]"
          >
            The 7 Core Topics. <br />
            Zero jargon. 100% clarity.
          </BlurIn>
        </div>
        <div className="md:max-w-md">
          <BlurIn
            as="p"
            delay={0.22}
            duration={0.8}
            blurAmount="8px"
            yOffset={12}
            className="text-base font-normal text-slate-600 dark:text-slate-400 leading-relaxed"
          >
            Sequenced to guide you from absolute beginner to informed investor. Each module includes bite-sized lessons, interactive calculators, and concept check scenarios.
          </BlurIn>
          <div className="mt-4">
            <Link href="/curriculum">
              <button
                type="button"
                className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111620] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-medium transition-colors shadow-2xs cursor-pointer"
              >
                View full detailed syllabus &rarr;
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Grid of 7 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {modules.map((mod) => {
          const Icon = mod.icon;
          return (
            <div
              key={mod.id}
              className="group bg-white dark:bg-[#111620] rounded-xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors flex flex-col justify-between"
            >
              <div>
                {/* Module Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                    Topic 0{mod.order}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                  {mod.title}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm font-normal text-slate-600 dark:text-slate-400 leading-relaxed">
                  {mod.tagline}
                </p>
              </div>

              {/* Module Footer Info */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                <span className="flex items-center gap-1.5 font-normal">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {mod.duration} • {mod.lessonsCount} lessons
                </span>
                <Link
                  href={`/app/learn/${mod.id}`}
                  className="font-medium text-[#2563EB] dark:text-blue-400 flex items-center gap-1 hover:underline"
                >
                  Start &rarr;
                </Link>
              </div>
            </div>
          );
        })}

        {/* 8th Card: Capstone Practice Invitation */}
        <div className="bg-slate-900 dark:bg-[#111620] text-white rounded-xl p-6 shadow-xs flex flex-col justify-between border border-slate-800">
          <div>
            <div className="w-10 h-10 rounded-lg bg-slate-800 text-slate-200 flex items-center justify-center font-bold mb-4 border border-slate-700">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-medium text-slate-400">
              Capstone simulation
            </span>
            <h3 className="text-lg font-semibold text-white mt-1 tracking-tight">
              ₹10,000 Portfolio Sandbox
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm font-normal text-slate-400 leading-relaxed">
              Test your understanding across all 7 topics by managing a simulated diversified portfolio with live concentration risk feedback.
            </p>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-800">
            <Link href="/practice">
              <button
                type="button"
                className="w-full inline-flex items-center justify-center px-4 py-2 rounded-lg bg-slate-100 hover:bg-white text-slate-900 text-xs font-medium transition-colors cursor-pointer"
              >
                Explore sandbox features &rarr;
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
