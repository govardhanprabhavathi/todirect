'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
import { Link000, Link001, Link004 } from '@/components/ui/skiper-ui/skiper40';
import { CURRICULUM_DATA, SANDBOX_INSTRUMENTS } from '@/lib/data';
import { useAppState } from '@/lib/store';
import { 
  Home as HomeIcon,
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
  Bot,
  Play,
  RotateCcw,
  Newspaper,
  Calendar,
  X,
  Send,
  HelpCircle,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Check
} from 'lucide-react';

export default function HomePage() {
  const { state } = useAppState();

  const totalLessons = CURRICULUM_DATA.reduce((acc, m) => acc + m.lessons.length, 0);
  const completedCount = state.completedLessonIds.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  // Active module
  const currentModule = CURRICULUM_DATA[1]; // Saving & Compounding
  const currentLesson = currentModule.lessons[1]; // Rule of 72

  // Modals state
  const [srsOpen, setSrsOpen] = useState(false);
  const [newsOpen, setNewsOpen] = useState(false);
  const [srsDoubtInput, setSrsDoubtInput] = useState('');
  const [srsChat, setSrsChat] = useState([
    {
      sender: 'ai',
      text: 'Welcome to your Smart Revision System (SRS)! I can explain any concept from your completed modules or test your recall. What doubt do you have today?'
    }
  ]);
  const [srsActiveTab, setSrsActiveTab] = useState<'notes' | 'clarify'>('notes');

  // News & IPO tab state
  const [newsTab, setNewsTab] = useState<'news' | 'ipos'>('news');

  // Handle SRS doubt submission
  const handleSendSrsDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!srsDoubtInput.trim()) return;
    const userText = srsDoubtInput;
    setSrsDoubtInput('');
    setSrsChat((prev) => [...prev, { sender: 'user', text: userText }]);

    setTimeout(() => {
      let reply = "Here is a quick concept revision: always calculate real returns after subtracting 6% inflation and income tax. Does that clarify the underlying calculation?";
      const lower = userText.toLowerCase();
      if (lower.includes('72') || lower.includes('rule')) {
        reply = "The Rule of 72 estimate: Years to double = 72 divided by the expected annual interest rate. For example, at 12% compounding return, your money doubles in ~6 years (72 / 12 = 6). At 6% in an FD, it takes 12 years!";
      } else if (lower.includes('inflation') || lower.includes('purchasing')) {
        reply = "Inflation reduces purchasing power silently. If inflation averages 6% per year, an item that costs ₹100 today will cost ₹179 in 10 years. Cash kept in savings accounts loses real value!";
      } else if (lower.includes('fd') || lower.includes('fixed')) {
        reply = "Fixed Deposits provide guaranteed capital return, but interest is taxed at your income slab. If you earn 7% FD interest, pay 30% tax, and inflation is 6%, your real return is negative (-1.1%)!";
      } else if (lower.includes('50/30/20') || lower.includes('budget')) {
        reply = "The 50/30/20 budget allocates 50% of net income to Needs (rent, food, bills), 30% to Wants (entertainment, dining), and 20% to Savings & Investments (SIPs, emergency fund).";
      }
      setSrsChat((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 600);
  };

  // Remaining modules to be covered
  const remainingModules = CURRICULUM_DATA.filter((mod) => {
    const completedInMod = mod.lessons.filter((l) => state.completedLessonIds.includes(l.id)).length;
    return completedInMod < mod.lessons.length;
  });

  // Calculate sandbox metrics
  const holdingsValue = state.portfolio.holdings.reduce((acc, h) => {
    const inst = SANDBOX_INSTRUMENTS.find((i) => i.id === h.instrumentId);
    const price = inst ? inst.price : h.avgBuyPrice;
    return acc + h.units * price;
  }, 0);
  const totalSandboxValue = state.portfolio.cashBalance + holdingsValue;
  const initialCapital = 10000;
  const pnl = totalSandboxValue - initialCapital;
  const pnlPercent = ((pnl / initialCapital) * 100).toFixed(1);

  // Financial News & IPOs Mock Data
  const financeNews = [
    {
      id: 1,
      source: 'RBI Monetary Policy',
      time: '2 hours ago',
      headline: 'RBI Maintains Repo Rate at 6.5%, Highlights Disciplined 4% Inflation Objective',
      summary: 'Governor reiterates that real interest rates remain positive to encourage household financial savings while monitoring food inflation.',
      tag: 'Macroeconomics'
    },
    {
      id: 2,
      source: 'AMFI Data',
      time: '4 hours ago',
      headline: 'Monthly Mutual Fund SIP Inflows Surge to All-Time High of ₹24,200 Crore',
      summary: 'Youth and first-time retail investors drive steady systematic investment growth across index funds and large-cap equity portfolios.',
      tag: 'Mutual Funds'
    },
    {
      id: 3,
      source: 'SEBI Circular',
      time: 'Yesterday',
      headline: 'SEBI Mandates Stricter Derivative Risk Disclosures for Young Demat Account Holders',
      summary: 'Regulatory frameworks emphasize that 9 out of 10 retail traders lose money in speculative F&O, urging youth to focus on long-term assets.',
      tag: 'Regulation'
    },
    {
      id: 4,
      source: 'Commodities Desk',
      time: 'Yesterday',
      headline: 'Sovereign Gold Bonds Deliver 13.4% Annualized Returns Over 5-Year Horizon',
      summary: 'Central bank gold backed securities continue to provide tax-free capital gains on maturity alongside guaranteed 2.5% annual interest.',
      tag: 'Gold & Debt'
    }
  ];

  const upcomingIPOs = [
    {
      id: 1,
      company: 'NexGen Renewable Energy Ltd',
      dates: 'Nov 05 - Nov 08, 2026',
      priceBand: '₹210 - ₹225',
      lotSize: '65 Shares',
      issueSize: '₹1,850 Cr',
      rating: '4.2/5',
      status: 'Opens in 6 days'
    },
    {
      id: 2,
      company: 'FinHealth AI Technologies Ltd',
      dates: 'Nov 12 - Nov 15, 2026',
      priceBand: '₹480 - ₹510',
      lotSize: '28 Shares',
      issueSize: '₹2,400 Cr',
      rating: '3.8/5',
      status: 'Upcoming'
    },
    {
      id: 3,
      company: 'Bharat Infrastructure InVIT',
      dates: 'Nov 18 - Nov 21, 2026',
      priceBand: '₹98 - ₹102',
      lotSize: '150 Shares',
      issueSize: '₹3,200 Cr',
      rating: '4.5/5',
      status: 'Upcoming'
    }
  ];

  // SRS Short Notes
  const srsShortNotes = [
    {
      topic: 'Topic 01: Money Foundations',
      concepts: [
        {
          name: '50/30/20 Allocation Rule',
          formula: 'Needs (50%) + Wants (30%) + Savings (20%)',
          note: 'Non-negotiable cashflow budgeting blueprint ensuring investments are made before discretionary spends.'
        },
        {
          name: 'Emergency Fund Buffer',
          formula: 'Monthly Essential Expenses × 6 Months',
          note: 'Must be parked in ultra-safe liquid instruments (Overnight / Liquid Funds) with zero equity market risk.'
        }
      ]
    },
    {
      topic: 'Topic 02: Saving & Compounding',
      concepts: [
        {
          name: 'The Rule of 72',
          formula: 'Years to Double ≈ 72 / Annual Interest Rate (%)',
          note: 'Mental math formula for exponential growth. At 12% CAGR, money doubles in 6 years. At 6%, it takes 12 years.'
        },
        {
          name: 'Compound vs Simple Interest',
          formula: 'A = P(1 + r/n)^(nt)',
          note: 'Compounding pays interest on accumulated interest over time. Time in the market matters more than timing.'
        }
      ]
    },
    {
      topic: 'Topic 03: Inflation & Real Purchasing Power',
      concepts: [
        {
          name: 'Real Net Return Calculation',
          formula: 'Real Return = Nominal Return - Inflation - Taxes',
          note: 'Any instrument returning less than inflation plus taxes permanently destroys your future purchasing power.'
        }
      ]
    }
  ];

  return (
    <AppShell>
      <div className="space-y-8">
        {/* ─── WORKSPACE OVERVIEW HEADER ─── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                <HomeIcon className="w-3.5 h-3.5" />
                Workspace
              </span>
              <span className="text-slate-300 dark:text-slate-700">/</span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                {state.profile.educationLevel}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
              Learning Overview
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Current goal: {state.profile.financialGoal}
            </p>
          </div>

          {/* Action Controls: Sandbox, Financial News, Ask Finn */}
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/app/practice">
              <Button size="sm" variant="outline" className="rounded-lg text-xs font-medium bg-white dark:bg-[#111620] text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700">
                <Sliders className="w-3.5 h-3.5 mr-1.5 text-slate-500 dark:text-slate-400" />
                ₹10K Sandbox
              </Button>
            </Link>

            {/* Financial News & IPOs Button */}
            <Button
              size="sm"
              variant="outline"
              onClick={() => setNewsOpen(true)}
              className="rounded-lg text-xs font-medium bg-white dark:bg-[#111620] text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
            >
              <Newspaper className="w-3.5 h-3.5 mr-1.5 text-slate-500 dark:text-slate-400" />
              Market news & IPOs
            </Button>

            <Link href="/app/coach">
              <Button size="sm" variant="primaryDark" className="rounded-lg text-xs font-medium bg-[#2563EB] hover:bg-[#1D4ED8] text-white">
                <Bot className="w-3.5 h-3.5 mr-1.5" />
                Ask Finn
              </Button>
            </Link>
          </div>
        </div>

        {/* ─── HERO CARD: ACTIVE TOPIC ─── */}
        <div className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#111620] border border-slate-200/80 dark:border-slate-800/80 shadow-xs relative overflow-hidden">
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-medium">
                  Active topic: Topic 02
                </span>
                <span className="text-xs text-slate-400 dark:text-slate-500">•</span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Lesson 2 of 4
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                Saving & Compounding Math
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Currently studying &ldquo;Mental Math with the Rule of 72&rdquo;. Learn how doubling velocity operates across risk-free and inflation benchmarks before risking capital.
              </p>

              {/* Progress Bar */}
              <div className="pt-2">
                <div className="flex justify-between text-xs font-medium text-slate-500 dark:text-slate-400 mb-1.5">
                  <span>Curriculum completion</span>
                  <span className="tabular-nums font-medium text-slate-700 dark:text-slate-300">{completedCount} of {totalLessons} lessons ({progressPercent}%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#2563EB] h-full rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Right Side: Moment of Craft (Clean Rule of 72 Formula & Actions) */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0 lg:w-64">
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                  <span>Doubling formula</span>
                  <span className="font-mono text-[11px] text-blue-600 dark:text-blue-400 font-semibold">t ≈ 72 / r</span>
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  At 12% annual return, invested capital doubles every 6.0 years.
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <Link href="/app/lesson/sc-2" className="w-full">
                  <Button size="md" variant="primaryDark" className="rounded-lg text-xs font-medium w-full bg-[#2563EB] hover:bg-[#1D4ED8] text-white">
                    Resume lesson &rarr;
                  </Button>
                </Link>
                <Link href="/app/quiz/saving-compounding" className="w-full">
                  <Button size="md" variant="outline" className="rounded-lg text-xs font-medium w-full bg-white dark:bg-[#111620] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700">
                    Take concept quiz
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ─── 3 PRIMARY ACTION CARDS ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Recently Watched Video */}
          <div className="bg-white dark:bg-[#111620] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  Watched yesterday
                </span>
              </div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Recently watched
              </span>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mt-1">
                Rule of 72 Compounding Mechanics
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Lesson 2.2 • 8m 20s • Stopped at 6:40 (80% completed)
              </p>
              {/* Mini progress line */}
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-3">
                <div className="bg-[#2563EB] h-full rounded-full" style={{ width: '80%' }} />
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Link001 href="/app/lesson/sc-2" className="text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1.5 hover:underline">
                <Play className="w-3.5 h-3.5 fill-current shrink-0 mr-1" />
                <span>Resume playback (6:40) &rarr;</span>
              </Link001>
            </div>
          </div>

          {/* Card 2: Active Module */}
          <div className="bg-white dark:bg-[#111620] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                  Topic 2 of 7
                </span>
              </div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Current topic
              </span>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mt-1">
                Saving & Compounding
              </h3>
              <div className="mt-2 space-y-1 text-xs">
                <p className="text-slate-500 dark:text-slate-400">
                  Active lesson: <span className="font-medium text-slate-800 dark:text-slate-200">Lesson 2 of 4</span>
                </p>
                <p className="text-slate-500 dark:text-slate-400">
                  Next checkpoint: <span className="font-medium text-slate-800 dark:text-slate-200">Scenario Quiz on APY vs APR</span>
                </p>
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
              <Link001 href="/app/learn/saving-compounding" className="text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1 hover:underline">
                <span>View topic syllabus &rarr;</span>
              </Link001>
            </div>
          </div>

          {/* Card 3: Smart Revision System */}
          <div className="bg-white dark:bg-[#111620] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                  Ready for review
                </span>
              </div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Smart revision
              </span>
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mt-1">
                Concept Notes & Clarification
              </h3>
              <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Targeted quick-recall sheets for completed lessons with Socratic doubt clarification.
              </p>
            </div>
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setSrsOpen(true)}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-medium hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Open revision sheets &rarr;</span>
              </button>
            </div>
          </div>
        </div>

        {/* ─── DETAILS OF SANDBOX ─── */}
        <div className="bg-white dark:bg-[#111620] rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                <PieChart className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    Sandbox Portfolio
                  </h2>
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${
                    Number(pnl) >= 0 
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50' 
                      : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50'
                  }`}>
                    {Number(pnl) >= 0 ? `+₹${pnl.toFixed(0)} (+${pnlPercent}%)` : `-₹${Math.abs(pnl).toFixed(0)} (${pnlPercent}%)`}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Virtual ₹10,000 capital simulated with verified allocation guardrails
                </p>
              </div>
            </div>

            <Link href="/app/practice">
              <Button size="sm" variant="outline" className="rounded-lg text-xs font-medium bg-white dark:bg-[#111620] text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700">
                Manage sandbox positions &rarr;
              </Button>
            </Link>
          </div>

          {/* Key Sandbox Breakdown Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Portfolio value</span>
              <p className="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-1 tabular-nums">
                ₹{totalSandboxValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Available cash</span>
              <p className="text-xl font-semibold text-emerald-600 dark:text-emerald-400 mt-1 tabular-nums">
                ₹{state.portfolio.cashBalance.toLocaleString('en-IN')}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Invested capital</span>
              <p className="text-xl font-semibold text-[#2563EB] dark:text-blue-400 mt-1 tabular-nums">
                ₹{holdingsValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/60">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Active positions</span>
              <p className="text-xl font-semibold text-slate-900 dark:text-slate-100 mt-1 tabular-nums">
                {state.portfolio.holdings.length}
              </p>
            </div>
          </div>

          {/* Holdings List Preview */}
          <div className="space-y-2.5">
            <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400">
              Current allocations
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {state.portfolio.holdings.map((h) => {
                const inst = SANDBOX_INSTRUMENTS.find((i) => i.id === h.instrumentId);
                const currentPrice = inst ? inst.price : h.avgBuyPrice;
                const holdingTotal = h.units * currentPrice;

                return (
                  <div
                    key={h.instrumentId}
                    className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/30"
                  >
                    <div>
                      <p className="text-xs font-medium text-slate-900 dark:text-slate-100">{inst?.name || h.instrumentId}</p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 tabular-nums">
                        {h.units} units @ ₹{h.avgBuyPrice}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-slate-900 dark:text-slate-100 tabular-nums">
                        ₹{holdingTotal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                      </p>
                      <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 tabular-nums">
                        {((holdingTotal / totalSandboxValue) * 100).toFixed(0)}% of fund
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ─── REMAINING MODULES TO BE COVERED ─── */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Remaining curriculum topics
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {remainingModules.length} core topics left in your verified finance roadmap
              </p>
            </div>
            <Link001 href="/app/learn" className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline">
              View syllabus catalog &rarr;
            </Link001>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {remainingModules.map((mod) => {
              const completedInMod = mod.lessons.filter((l) => state.completedLessonIds.includes(l.id)).length;
              const isStarted = completedInMod > 0;

              return (
                <div
                  key={mod.id}
                  className="bg-white dark:bg-[#111620] rounded-xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        Topic 0{mod.order}
                      </span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {mod.duration}
                      </span>
                    </div>

                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                      {mod.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {mod.tagline}
                    </p>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="text-slate-500 dark:text-slate-400">
                        {completedInMod}/{mod.lessons.length} lessons
                      </span>
                      <span className={`font-medium ${isStarted ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`}>
                        {isStarted ? `${Math.round((completedInMod / mod.lessons.length) * 100)}% done` : 'Ready to start'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                    <Link001
                      href={`/app/learn/${mod.id}`}
                      className="text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {isStarted ? 'Continue topic \u2192' : 'Start topic \u2192'}
                    </Link001>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── MODAL 1: SMART REVISION SYSTEM (SRS) DRAWER / MODAL ─── */}
      {srsOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="w-full max-w-3xl bg-white dark:bg-[#0B0F19] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] flex flex-col overflow-hidden animate-slideUp">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-slate-900/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#2563FF] to-indigo-600 text-white flex items-center justify-center font-bold">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0A1629] dark:text-white">Smart Revision System (SRS)</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Short notes for completed concepts + Instant AI doubt clarification</p>
                </div>
              </div>

              <button
                onClick={() => setSrsOpen(false)}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sub-tabs: Short Notes vs Ask AI to Clarify */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] px-6 pt-3 gap-6">
              <button
                onClick={() => setSrsActiveTab('notes')}
                className={`pb-3 text-xs font-bold border-b-2 transition-colors ${
                  srsActiveTab === 'notes'
                    ? 'border-[#2563FF] text-[#2563FF] dark:text-blue-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Completed Concept Cheat-Sheets
              </button>
              <button
                onClick={() => setSrsActiveTab('clarify')}
                className={`pb-3 text-xs font-bold border-b-2 transition-colors ${
                  srsActiveTab === 'clarify'
                    ? 'border-[#2563FF] text-[#2563FF] dark:text-blue-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Ask AI to Clarify Any Doubt
              </button>
            </div>

            {/* Modal Body Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {srsActiveTab === 'notes' ? (
                <div className="space-y-6">
                  {srsShortNotes.map((section, idx) => (
                    <div key={idx} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#2563FF]" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                          {section.topic}
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                        {section.concepts.map((concept, cIdx) => (
                          <div
                            key={cIdx}
                            className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-1.5"
                          >
                            <span className="text-xs font-bold text-[#0A1629] dark:text-white block">
                              {concept.name}
                            </span>
                            <div className="px-2.5 py-1 rounded bg-blue-100/70 dark:bg-blue-950/70 text-[#2563FF] dark:text-blue-300 font-mono text-[11px] font-semibold inline-block">
                              {concept.formula}
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                              {concept.note}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col h-[400px]">
                  {/* Chat messages */}
                  <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                    {srsChat.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                            msg.sender === 'user'
                              ? 'bg-[#0A1629] dark:bg-blue-600 text-white rounded-tr-sm'
                              : 'bg-blue-50 dark:bg-slate-900 border border-blue-100 dark:border-slate-800 text-[#0A1629] dark:text-slate-200 rounded-tl-sm'
                          }`}
                        >
                          {msg.text}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Input form */}
                  <form onSubmit={handleSendSrsDoubt} className="pt-4 border-t border-slate-200 dark:border-slate-800 flex gap-2">
                    <input
                      type="text"
                      value={srsDoubtInput}
                      onChange={(e) => setSrsDoubtInput(e.target.value)}
                      placeholder="Ask about Rule of 72, inflation rate, FD real yield..."
                      className="flex-1 px-4 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-[#0A1629] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-full bg-[#2563FF] text-white text-xs font-bold hover:bg-blue-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Clarify</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL 2: FINANCIAL NEWS & UPCOMING IPOS MODAL ─── */}
      {newsOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="w-full max-w-3xl bg-white dark:bg-[#0B0F19] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] flex flex-col overflow-hidden animate-slideUp">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-slate-900/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-[#2563FF] dark:text-blue-400 flex items-center justify-center font-bold">
                  <Newspaper className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0A1629] dark:text-white">Current Finance News & Upcoming IPOs</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Live macroeconomic updates, regulator advisories & primary market issues</p>
                </div>
              </div>

              <button
                onClick={() => setNewsOpen(false)}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab switch */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] px-6 pt-3 gap-6">
              <button
                onClick={() => setNewsTab('news')}
                className={`pb-3 text-xs font-bold border-b-2 transition-colors ${
                  newsTab === 'news'
                    ? 'border-[#2563FF] text-[#2563FF] dark:text-blue-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Curated Financial News (4 Live)
              </button>
              <button
                onClick={() => setNewsTab('ipos')}
                className={`pb-3 text-xs font-bold border-b-2 transition-colors ${
                  newsTab === 'ipos'
                    ? 'border-[#2563FF] text-[#2563FF] dark:text-blue-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Upcoming IPO Calendar (3 Scheduled)
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {newsTab === 'news' ? (
                <div className="space-y-4">
                  {financeNews.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 hover:border-blue-300 transition-all space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-[#2563FF] dark:text-blue-400 uppercase">
                          {item.tag}
                        </span>
                        <span className="text-[11px] text-slate-400 font-medium">{item.source} • {item.time}</span>
                      </div>
                      <h4 className="text-sm font-bold text-[#0A1629] dark:text-white leading-snug">
                        {item.headline}
                      </h4>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        {item.summary}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingIPOs.map((ipo) => (
                    <div
                      key={ipo.id}
                      className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-bold text-[#0A1629] dark:text-white">{ipo.company}</h4>
                          <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                            <Calendar className="w-3.5 h-3.5 text-blue-500" />
                            {ipo.dates}
                          </span>
                        </div>
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#2563FF] dark:text-blue-400 border border-blue-200 dark:border-blue-900">
                          {ipo.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-3 gap-3 pt-2 text-xs">
                        <div className="p-2.5 rounded-xl bg-white dark:bg-[#0B0F19] border border-slate-100 dark:border-slate-800">
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">Price Band</span>
                          <p className="font-bold text-[#0A1629] dark:text-white mt-0.5">{ipo.priceBand}</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white dark:bg-[#0B0F19] border border-slate-100 dark:border-slate-800">
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">Lot Size</span>
                          <p className="font-bold text-[#0A1629] dark:text-white mt-0.5">{ipo.lotSize}</p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-white dark:bg-[#0B0F19] border border-slate-100 dark:border-slate-800">
                          <span className="text-[10px] text-slate-400 uppercase font-semibold">Fundamental Score</span>
                          <p className="font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{ipo.rating}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
