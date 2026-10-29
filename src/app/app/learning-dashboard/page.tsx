'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
import { CURRICULUM_DATA } from '@/lib/data';
import { useAppState } from '@/lib/store';
import { 
  LayoutDashboard,
  Video,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Bot,
  Calendar,
  Clock,
  Sparkles,
  HelpCircle,
  TrendingUp,
  History,
  ArrowRight,
  ShieldAlert,
  Send,
  X,
  PieChart,
  Eye,
  Check
} from 'lucide-react';

export default function LearningDashboardPage() {
  const { state } = useAppState();

  // Concept understanding metrics
  const conceptMastery = [
    { name: 'Compounding Math & Rule of 72', score: 88, status: 'Mastered', videos: 4, clarityNeeded: false },
    { name: 'Cashflow & 50/30/20 Budgeting', score: 92, status: 'Mastered', videos: 4, clarityNeeded: false },
    { name: 'Inflation & Real Purchasing Power', score: 62, status: 'Needs Review', videos: 4, clarityNeeded: true, reviewVideo: 'Lesson 3.2: Real vs Nominal Growth' },
    { name: 'Asset Allocation & Concentration Risk', score: 74, status: 'In Progress', videos: 5, clarityNeeded: false },
    { name: 'P/E Ratios & Moat Analysis', score: 55, status: 'Needs Review', videos: 4, clarityNeeded: true, reviewVideo: 'Lesson 7.2: Valuation & Price-to-Earnings' },
    { name: 'Mutual Fund Expense Ratios & SIPs', score: 80, status: 'Proficient', videos: 4, clarityNeeded: false }
  ];

  // Misconceptions with videos and Socratic dialogue
  const misconceptionsList = [
    {
      id: 'm1',
      title: 'Assuming an 8% Fixed Deposit Beats 6% Inflation Without Taxes',
      concept: 'Real Purchasing Power After Tax',
      video: 'Lesson 3.2: Why Inflation Destroys Bank FD Real Returns',
      explanation: 'A 7-8% FD interest is fully taxable at your income slab. After a 30% tax deduction, your net yield drops to 5.6%. When retail inflation runs at 6%, your real purchasing power shrinks by -0.4% annually!',
      socraticQuestion: 'Now tell me in your own words: why does nominal bank deposit interest give a false sense of safety during sustained inflation?'
    },
    {
      id: 'm2',
      title: 'Believing a ₹40 Stock is Cheaper Than a ₹3,000 Stock',
      concept: 'Stock Price vs Valuation & Market Cap',
      video: 'Lesson 7.1: Share Price vs Company Valuation Mechanics',
      explanation: 'Share price is merely the total company valuation divided by the number of shares. A ₹40 penny stock can be dangerously overvalued if the company loses money, while a ₹3,000 bluechip can be trading at an attractive price-to-earnings discount.',
      socraticQuestion: 'Explain why share price alone tells you nothing about whether a stock is a bargain or expensive.'
    }
  ];

  // Socratic Finn AI Modal State
  const [activeMisconception, setActiveMisconception] = useState<typeof misconceptionsList[0] | null>(null);
  const [userUnderstandingInput, setUserUnderstandingInput] = useState('');
  const [socraticFeedback, setSocraticFeedback] = useState<{
    submitted: boolean;
    isCorrect: boolean;
    analysis: string;
    correction: string;
  } | null>(null);

  // Quiz History Modal State
  const [quizHistoryOpen, setQuizHistoryOpen] = useState(false);
  const quizHistory = [
    { id: 'qh-1', topic: 'Money Foundations Diagnostic', date: '2 days ago', score: '80%', status: 'Passed', totalQ: 5, correctQ: 4 },
    { id: 'qh-2', topic: 'Saving & Compounding Math', date: 'Yesterday', score: '75%', status: 'Passed', totalQ: 4, correctQ: 3 },
    { id: 'qh-3', topic: 'Inflation Purchasing Power Check', date: 'Today', score: '60%', status: 'Retake Recommended', totalQ: 5, correctQ: 3 }
  ];

  // Prep Plan Modal State
  const [prepPlanOpen, setPrepPlanOpen] = useState(false);
  const [prepAvailability, setPrepAvailability] = useState('Evenings (7 PM - 10 PM)');
  const [prepDuration, setPrepDuration] = useState('45 mins/day');
  const [prepDays, setPrepDays] = useState('5 days/week');
  const [generatedPlan, setGeneratedPlan] = useState<any | null>(null);

  const handleGeneratePlan = (e: React.FormEvent) => {
    e.preventDefault();
    setGeneratedPlan({
      pace: 'Disciplined Growth (Recommended)',
      estimatedWeeks: '3.5 weeks to complete all 7 topics',
      weeklySchedule: [
        { day: 'Monday & Tuesday', task: 'Watch 2 bite-sized video lessons (20 mins) + complete 1 scenario drill' },
        { day: 'Wednesday & Thursday', task: 'Execute 1 practical sandbox trade + review reflection notes' },
        { day: 'Friday', task: 'Weekend Concept Assessment Quiz + Socratic debiasing session' },
        { day: 'Saturday & Sunday', task: 'Rest & review SRS flash summaries' }
      ]
    });
  };

  // Practical Use Understanding Data
  const practicalInvestments = [
    {
      instrument: 'Nifty 50 Index Fund ETF',
      conceptsCovered: 'Low-cost passive indexing, long-term equity compounding, tracking error',
      whatDidRight: 'Automated recurring monthly SIP allocations without timing market dips.',
      whatDidWrong: 'Initially considered stopping SIP when market showed a temporary 3% correction.',
      videoRecommendation: 'Lesson 6.2: Market Corrections vs Permanent Capital Loss',
      clarificationPrompt: 'Why does continuing SIP during market pullbacks lower your average purchase price?'
    },
    {
      instrument: 'Sovereign Gold Bonds (SGB)',
      conceptsCovered: 'Sovereign default safety, commodity inflation hedging, 2.5% tax-free coupon',
      whatDidRight: 'Capped allocation at 12% as a strategic non-correlated portfolio hedge.',
      whatDidWrong: 'Assumed gold would generate high annual dividend cashflow like a real business.',
      videoRecommendation: 'Lesson 4.3: Productive Assets (Stocks) vs Store of Value (Gold)',
      clarificationPrompt: 'Explain the fundamental difference between capital-generating assets and commodity stores of value.'
    },
    {
      instrument: 'Liquid Overnight Cash Buffer',
      conceptsCovered: 'Capital preservation, instant T+0 redemption, emergency buffer protection',
      whatDidRight: 'Maintained ₹4,500 liquid reserves before placing speculative orders.',
      whatDidWrong: 'Expected overnight funds to beat retail inflation rates.',
      videoRecommendation: 'Lesson 1.3: Safe Reserves vs Growth Capital Separation',
      clarificationPrompt: 'Why is the primary purpose of an emergency fund liquidity rather than return maximization?'
    }
  ];

  // Handle Socratic submission
  const handleSubmitSocraticAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userUnderstandingInput.trim()) return;

    const lower = userUnderstandingInput.toLowerCase();
    const isGood = lower.includes('tax') || lower.includes('inflation') || lower.includes('real') || lower.includes('purchasing') || lower.includes('market cap') || lower.includes('valuation') || lower.includes('worth');

    setSocraticFeedback({
      submitted: true,
      isCorrect: isGood,
      analysis: isGood 
        ? "Excellent reasoning! You correctly identified the critical economic mechanism that retail investors routinely overlook." 
        : "You are close, but missed the essential friction factor: taxes and purchasing power erosion.",
      correction: isGood
        ? "Your explanation shows solid mental clarity. You are ready to apply this principle in the sandbox."
        : "Always remember: nominal yield is an illusion until you subtract government taxation and retail inflation."
    });
  };

  return (
    <AppShell>
      <div className="space-y-8">
        {/* ─── HEADER ─── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                <LayoutDashboard className="w-3.5 h-3.5" />
                Core Intelligence
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-tight">
              Learning Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Comprehensive analytics on videos watched, conceptual mastery, and targeted clarity drills
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setQuizHistoryOpen(true)}
              className="rounded-full text-xs font-bold bg-white dark:bg-[#111625] dark:border-slate-800"
            >
              <History className="w-3.5 h-3.5 mr-1 text-blue-600 dark:text-blue-400" />
              Quiz History
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setPrepPlanOpen(true)}
              className="rounded-full text-xs font-bold bg-white dark:bg-[#111625] dark:border-slate-800"
            >
              <Calendar className="w-3.5 h-3.5 mr-1 text-indigo-600 dark:text-indigo-400" />
              Prep Plan
            </Button>
            <Link href="/app/quizzes">
              <Button size="sm" variant="primaryDark" className="rounded-full text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                Take Test
              </Button>
            </Link>
          </div>
        </div>

        {/* ─── SECTION 1: VIDEOS COVERED & CONCEPT UNDERSTANDING ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <Video className="w-4 h-4 text-blue-600" />
              Videos Covered
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-[#0A1629] dark:text-white">18 / 28</span>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">(64% watched)</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Total screen time: 3.8 hours of verified financial curriculum.
            </p>
          </div>

          <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Average Concept Mastery
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-[#0A1629] dark:text-white">76%</span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">Solid Foundation</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Calibrated across cashflow, compounding, debt, and equities.
            </p>
          </div>

          <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              Pending Clarity Items
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-amber-600 dark:text-amber-400">2 Concepts</span>
              <span className="text-xs text-slate-500 font-semibold">Flagged for re-watch</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Inflation after-tax yields and P/E valuation metrics.
            </p>
          </div>
        </div>

        {/* ─── SECTION 2: WHERE NEEDS MORE CLARITY ("IT'S BETTER U WATCH AGAIN") ─── */}
        <div className="bg-amber-50/70 dark:bg-amber-950/30 rounded-3xl p-6 sm:p-7 border border-amber-200 dark:border-amber-900/50 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-amber-950 dark:text-amber-200">
                  Where You Need More Clarity
                </h3>
                <p className="text-xs text-amber-800 dark:text-amber-400">
                  Based on recent scenario quizzes, our diagnostic engine detected uncertainty here:
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {conceptMastery.filter(c => c.clarityNeeded).map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-white dark:bg-[#111625] border border-amber-200 dark:border-amber-900/60 flex items-center justify-between gap-4"
              >
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300">
                    Mastery: {item.score}%
                  </span>
                  <h4 className="text-sm font-bold text-[#0A1629] dark:text-white mt-1">
                    {item.name}
                  </h4>
                  <p className="text-xs text-amber-700 dark:text-amber-400 font-medium mt-1">
                    👉 It&apos;s better you watch again: <span className="underline">{item.reviewVideo}</span>
                  </p>
                </div>

                <Link href="/app/curriculum">
                  <Button size="sm" variant="outline" className="rounded-full text-xs font-bold border-amber-300 dark:border-amber-800 shrink-0">
                    <Play className="w-3.5 h-3.5 mr-1 fill-current" />
                    Watch Again
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ─── SECTION 3: DETAILED CONCEPT UNDERSTANDING MATRIX ─── */}
        <div className="bg-white dark:bg-[#111625] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-[#0A1629] dark:text-[#F8FAFC]">
                Concept-by-Concept Understanding
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Calibrated against scenario questions, trade rationales, and video retention
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              6 Core Principles
            </span>
          </div>

          <div className="space-y-4">
            {conceptMastery.map((concept, i) => (
              <div key={i} className="p-4 rounded-2xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#0A1629] dark:text-white">
                      {concept.name}
                    </span>
                    <span className="text-[10px] text-slate-400">({concept.videos} videos)</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold ${
                      concept.score >= 80 
                        ? 'text-emerald-600 dark:text-emerald-400' 
                        : concept.score >= 70 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-amber-600 dark:text-amber-400'
                    }`}>
                      {concept.status} ({concept.score}%)
                    </span>
                  </div>
                </div>

                <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      concept.score >= 80 
                        ? 'bg-emerald-500' 
                        : concept.score >= 70 
                        ? 'bg-blue-600' 
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${concept.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── SECTION 4: MISCONCEPTIONS + SOCRATIC ASK FINN COACH ─── */}
        <div className="bg-white dark:bg-[#111625] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-[#0A1629] dark:text-[#F8FAFC]">
                Detected Misconceptions & Socratic Verification
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                AI explains the concept, asks you to reflect, and checks if your mental model is accurate
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 self-start sm:self-auto">
              {misconceptionsList.length} Active Misconceptions
            </span>
          </div>

          <div className="space-y-4">
            {misconceptionsList.map((m) => (
              <div
                key={m.id}
                className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 uppercase">
                      Bias: {m.concept}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-[#0A1629] dark:text-white mt-1.5">
                      {m.title}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                      Recommended Video Lesson: <span className="font-semibold text-blue-600 dark:text-blue-400 underline">{m.video}</span>
                    </p>
                  </div>

                  <Button
                    size="sm"
                    variant="primaryDark"
                    onClick={() => {
                      setActiveMisconception(m);
                      setUserUnderstandingInput('');
                      setSocraticFeedback(null);
                    }}
                    className="rounded-full text-xs font-bold shrink-0"
                  >
                    <Bot className="w-3.5 h-3.5 mr-1" />
                    Ask Finn to Explain & Verify &rarr;
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── SECTION 5: PRACTICAL USE UNDERSTANDING ─── */}
        <div className="bg-white dark:bg-[#111625] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-lg font-bold text-[#0A1629] dark:text-[#F8FAFC]">
              Practical Use Understanding
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Review of concepts covered in each simulation investment: what you did right, what went wrong, and recommended video drills
            </p>
          </div>

          <div className="space-y-4">
            {practicalInvestments.map((inv, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-3.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-[#0A1629] dark:text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2563FF]" />
                    {inv.instrument}
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Concepts: {inv.conceptsCovered}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                      ✓ What You Did Right:
                    </span>
                    <p className="text-emerald-700 dark:text-emerald-400 leading-relaxed">
                      {inv.whatDidRight}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40">
                    <span className="font-bold text-rose-800 dark:text-rose-300 block mb-1">
                      ✗ What You Did Wrong:
                    </span>
                    <p className="text-rose-700 dark:text-rose-400 leading-relaxed">
                      {inv.whatDidWrong}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-200/60 dark:border-slate-800">
                  <span className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                    <Play className="w-3 h-3 text-blue-600 fill-current" />
                    Recommended Video: <span className="font-semibold text-blue-600 dark:text-blue-400">{inv.videoRecommendation}</span>
                  </span>

                  <Link href="/app/coach">
                    <Button size="sm" variant="outline" className="rounded-full text-xs font-bold">
                      <Bot className="w-3.5 h-3.5 mr-1" />
                      Ask Finn About This Investment
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── MODAL 1: SOCRATIC AI FINN EXPLANATION & CHECK MODAL ─── */}
      {activeMisconception && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-[#0B0F19] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] flex flex-col overflow-hidden animate-slideUp">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-slate-900/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#2563FF] text-white flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0A1629] dark:text-white">Finn Socratic Concept Verification</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Explain in your own words to prove true understanding</p>
                </div>
              </div>

              <button
                onClick={() => setActiveMisconception(null)}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5">
              {/* Step 1: AI Explains */}
              <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Step 1: Finn&apos;s Clear Explanation
                </span>
                <p className="text-xs sm:text-sm text-[#0A1629] dark:text-slate-200 leading-relaxed font-normal">
                  {activeMisconception.explanation}
                </p>
              </div>

              {/* Step 2: Finn asks user */}
              <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  Step 2: Finn&apos;s Question to You
                </span>
                <p className="text-xs sm:text-sm font-semibold text-[#0A1629] dark:text-white">
                  &ldquo;{activeMisconception.socraticQuestion}&rdquo;
                </p>
              </div>

              {/* Step 3: User types what they understood */}
              {!socraticFeedback ? (
                <form onSubmit={handleSubmitSocraticAnswer} className="space-y-3">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Your Response: What did you understand?
                  </label>
                  <textarea
                    rows={4}
                    value={userUnderstandingInput}
                    onChange={(e) => setUserUnderstandingInput(e.target.value)}
                    placeholder="Type your explanation here. For example: Inflation erodes real value and taxes eat the nominal interest..."
                    className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-[#0A1629] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    required
                  />

                  <Button type="submit" size="md" variant="primaryDark" className="w-full rounded-full text-xs font-bold">
                    Submit Explanation for AI Evaluation &rarr;
                  </Button>
                </form>
              ) : (
                /* Step 4: AI Verdict & Correction */
                <div className="space-y-4 pt-2">
                  <div className={`p-4 rounded-2xl border ${
                    socraticFeedback.isCorrect 
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900' 
                      : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-900'
                  }`}>
                    <div className="flex items-center gap-2 mb-1.5">
                      {socraticFeedback.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                      )}
                      <h4 className="text-xs font-bold uppercase tracking-wider">
                        {socraticFeedback.isCorrect ? 'Status: Correct Understanding Verified!' : 'Status: Correction Needed'}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {socraticFeedback.analysis}
                    </p>
                    <p className="text-xs font-semibold text-[#0A1629] dark:text-white mt-2">
                      Key Takeaway: {socraticFeedback.correction}
                    </p>
                  </div>

                  <Button
                    onClick={() => {
                      setActiveMisconception(null);
                    }}
                    size="md"
                    variant="outline"
                    className="w-full rounded-full text-xs font-bold"
                  >
                    Done & Close &rarr;
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL 2: QUIZ HISTORY MODAL ─── */}
      {quizHistoryOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-[#0B0F19] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[85vh] flex flex-col overflow-hidden animate-slideUp">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-slate-900/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0A1629] dark:text-white">Past Quiz Scores & Attempt History</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Track your score trajectory across previous assessments</p>
                </div>
              </div>

              <button
                onClick={() => setQuizHistoryOpen(false)}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-3">
              {quizHistory.map((q) => (
                <div
                  key={q.id}
                  className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/40"
                >
                  <div>
                    <h4 className="text-sm font-bold text-[#0A1629] dark:text-white">{q.topic}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {q.date} • {q.correctQ} of {q.totalQ} correct
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400 block">{q.score}</span>
                    <span className="text-[10px] font-semibold text-slate-500">{q.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL 3: PREP PLAN MODAL ─── */}
      {prepPlanOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-[#0B0F19] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] flex flex-col overflow-hidden animate-slideUp">
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-slate-900/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0A1629] dark:text-white">Custom Study Prep Planner</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Generate a feasible course roadmap based on your daily availability</p>
                </div>
              </div>

              <button
                onClick={() => setPrepPlanOpen(false)}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6">
              {!generatedPlan ? (
                <form onSubmit={handleGeneratePlan} className="space-y-4 text-xs">
                  <div>
                    <label className="font-bold text-[#0A1629] dark:text-white block mb-1.5">
                      When are you usually free to study?
                    </label>
                    <select
                      value={prepAvailability}
                      onChange={(e) => setPrepAvailability(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-[#0A1629] dark:text-white"
                    >
                      <option>Mornings (7 AM - 9 AM)</option>
                      <option>Afternoons (1 PM - 3 PM)</option>
                      <option>Evenings (7 PM - 10 PM)</option>
                      <option>Weekends Only (Saturday & Sunday)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-[#0A1629] dark:text-white block mb-1.5">
                      Time period you want to sit per session:
                    </label>
                    <select
                      value={prepDuration}
                      onChange={(e) => setPrepDuration(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-[#0A1629] dark:text-white"
                    >
                      <option>20 mins/day (Micro-learning)</option>
                      <option>45 mins/day (Balanced)</option>
                      <option>60 mins/day (Accelerated)</option>
                      <option>90 mins/day (Intensive)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-[#0A1629] dark:text-white block mb-1.5">
                      How many days can you learn in a week?
                    </label>
                    <select
                      value={prepDays}
                      onChange={(e) => setPrepDays(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-[#0A1629] dark:text-white"
                    >
                      <option>3 days/week</option>
                      <option>5 days/week</option>
                      <option>7 days/week (Daily discipline)</option>
                    </select>
                  </div>

                  <Button type="submit" size="md" variant="primaryDark" className="w-full rounded-full text-xs font-bold mt-2">
                    Generate Feasible Study Roadmap &rarr;
                  </Button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      Calculated Timeline
                    </span>
                    <h4 className="text-sm font-bold text-[#0A1629] dark:text-white mt-1">
                      {generatedPlan.estimatedWeeks}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                      Configured for {prepDuration} across {prepDays} during {prepAvailability}.
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Weekly Execution Routine
                    </h4>
                    {generatedPlan.weeklySchedule.map((sched: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-xs"
                      >
                        <span className="font-bold text-blue-600 dark:text-blue-400">{sched.day}: </span>
                        <span className="text-slate-700 dark:text-slate-300">{sched.task}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => setGeneratedPlan(null)}
                      size="sm"
                      variant="outline"
                      className="rounded-full text-xs font-bold flex-1"
                    >
                      Recalibrate
                    </Button>
                    <Button
                      onClick={() => setPrepPlanOpen(false)}
                      size="sm"
                      variant="primaryDark"
                      className="rounded-full text-xs font-bold flex-1"
                    >
                      Save to My Schedule
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
