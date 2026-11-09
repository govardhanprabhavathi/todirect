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
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                <LayoutDashboard className="w-3.5 h-3.5" />
                Intelligence & Progress
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
              Learning Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Comprehensive analytics on video retention, conceptual mastery, and targeted clarity drills
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setQuizHistoryOpen(true)}
              className="rounded-lg text-xs font-medium bg-white dark:bg-[#111620] text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
            >
              <History className="w-3.5 h-3.5 mr-1.5 text-slate-500 dark:text-slate-400" />
              Quiz history
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setPrepPlanOpen(true)}
              className="rounded-lg text-xs font-medium bg-white dark:bg-[#111620] text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
            >
              <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-500 dark:text-slate-400" />
              Prep plan
            </Button>
            <Link href="/app/quizzes">
              <Button size="sm" variant="primaryDark" className="rounded-lg text-xs font-medium bg-[#2563EB] hover:bg-[#1D4ED8] text-white">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                Take test
              </Button>
            </Link>
          </div>
        </div>

        {/* ─── SECTION 1: VIDEOS COVERED & CONCEPT UNDERSTANDING ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white dark:bg-[#111620] rounded-xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              Videos covered
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-slate-100 tabular-nums">18 / 28</span>
              <span className="text-xs text-[#2563EB] dark:text-blue-400 font-medium tabular-nums">(64% watched)</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Total screen time: 3.8 hours of verified financial curriculum.
            </p>
          </div>

          <div className="bg-white dark:bg-[#111620] rounded-xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              Average concept mastery
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-slate-100 tabular-nums">76%</span>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Solid foundation</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Calibrated across cashflow, compounding, debt, and equities.
            </p>
          </div>

          <div className="bg-white dark:bg-[#111620] rounded-xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
              Pending clarity items
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-slate-100 tabular-nums">2 concepts</span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Flagged for review</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Inflation after-tax yields and P/E valuation metrics.
            </p>
          </div>
        </div>

        {/* ─── SECTION 2: WHERE NEEDS MORE CLARITY ─── */}
        <div className="bg-white dark:bg-[#111620] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                  Targeted Clarity & Prescribed Revision
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Diagnostic analysis of recent scenario quiz errors recommends reviewing these modules:
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {conceptMastery.filter(c => c.clarityNeeded).map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between gap-4"
              >
                <div>
                  <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50">
                    Mastery: {item.score}%
                  </span>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mt-1.5">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Prescribed review: <span className="font-medium text-slate-700 dark:text-slate-300">{item.reviewVideo}</span>
                  </p>
                </div>

                <Link href="/app/curriculum">
                  <Button size="sm" variant="outline" className="rounded-lg text-xs font-medium bg-white dark:bg-[#111620] text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shrink-0">
                    <Play className="w-3 h-3 mr-1 fill-current text-slate-500" />
                    Review
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* ─── SECTION 3: DETAILED CONCEPT UNDERSTANDING MATRIX ─── */}
        <div className="bg-white dark:bg-[#111620] rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">
                Concept-by-Concept Understanding
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Calibrated against scenario questions, trade rationales, and video retention
              </p>
            </div>
            <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
              6 Core Principles
            </span>
          </div>

          <div className="space-y-3">
            {conceptMastery.map((concept, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-50/50 dark:bg-slate-900/30 border border-slate-100 dark:border-slate-800/70">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-slate-900 dark:text-slate-100">
                      {concept.name}
                    </span>
                    <span className="text-xs text-slate-400">({concept.videos} lessons)</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-medium tabular-nums ${
                      concept.score >= 80 
                        ? 'text-emerald-600 dark:text-emerald-400' 
                        : concept.score >= 70 
                        ? 'text-[#2563EB] dark:text-blue-400' 
                        : 'text-amber-600 dark:text-amber-400'
                    }`}>
                      {concept.status} ({concept.score}%)
                    </span>
                  </div>
                </div>

                <div className="w-full bg-slate-200/80 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      concept.score >= 80 
                        ? 'bg-emerald-500' 
                        : concept.score >= 70 
                        ? 'bg-[#2563EB]' 
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
        <div className="bg-white dark:bg-[#111620] rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">
                Detected Misconceptions & Socratic Verification
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Finn explains the root principle, prompts you to reflect, and validates your reasoning model
              </p>
            </div>
            <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50 self-start sm:self-auto">
              {misconceptionsList.length} active items
            </span>
          </div>

          <div className="space-y-3.5">
            {misconceptionsList.map((m) => (
              <div
                key={m.id}
                className="p-5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50">
                      Topic: {m.concept}
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-100 mt-2">
                      {m.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Recommended syllabus lesson: <span className="font-medium text-slate-700 dark:text-slate-300">{m.video}</span>
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
                    className="rounded-lg text-xs font-medium bg-[#2563EB] hover:bg-[#1D4ED8] text-white shrink-0"
                  >
                    <Bot className="w-3.5 h-3.5 mr-1.5" />
                    Verify reasoning with Finn &rarr;
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── SECTION 5: PRACTICAL USE UNDERSTANDING ─── */}
        <div className="bg-white dark:bg-[#111620] rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-5">
          <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100">
              Practical Use Understanding
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Review of simulation trade executions: strengths, common pitfalls, and video recommendations
            </p>
          </div>

          <div className="space-y-4">
            {practicalInvestments.map((inv, idx) => (
              <div
                key={idx}
                className="p-5 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-900/30 space-y-3.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                    {inv.instrument}
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    Principles: {inv.conceptsCovered}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-lg bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40">
                    <span className="font-medium text-emerald-800 dark:text-emerald-300 block mb-1">
                      ✓ Sound execution:
                    </span>
                    <p className="text-emerald-700 dark:text-emerald-400 leading-relaxed font-normal">
                      {inv.whatDidRight}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-lg bg-rose-50/50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-900/40">
                    <span className="font-medium text-rose-800 dark:text-rose-300 block mb-1">
                      ✗ Execution risk flagged:
                    </span>
                    <p className="text-rose-700 dark:text-rose-400 leading-relaxed font-normal">
                      {inv.whatDidWrong}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-slate-200/60 dark:border-slate-800">
                  <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Play className="w-3 h-3 text-slate-400 fill-current" />
                    Recommended video: <span className="font-medium text-slate-700 dark:text-slate-300">{inv.videoRecommendation}</span>
                  </span>

                  <Link href="/app/coach">
                    <Button size="sm" variant="outline" className="rounded-lg text-xs font-medium bg-white dark:bg-[#111620] text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700">
                      <Bot className="w-3.5 h-3.5 mr-1.5 text-slate-400" />
                      Discuss with Finn
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
          <div className="w-full max-w-2xl bg-white dark:bg-[#111620] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 max-h-[90vh] flex flex-col overflow-hidden animate-slideUp">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-slate-900/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-bold">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Finn Concept Verification</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Explain in your own words to prove conceptual understanding</p>
                </div>
              </div>

              <button
                onClick={() => setActiveMisconception(null)}
                className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-4">
              {/* Step 1: AI Explains */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 space-y-1.5">
                <span className="text-[11px] font-medium text-[#2563EB] dark:text-blue-400 block">
                  Step 1: Conceptual explanation
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {activeMisconception.explanation}
                </p>
              </div>

              {/* Step 2: Finn asks user */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80 space-y-1">
                <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block">
                  Step 2: Counter-probe
                </span>
                <p className="text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100">
                  &ldquo;{activeMisconception.socraticQuestion}&rdquo;
                </p>
              </div>

              {/* Step 3: User types what they understood */}
              {!socraticFeedback ? (
                <form onSubmit={handleSubmitSocraticAnswer} className="space-y-3">
                  <label className="text-xs font-medium text-slate-700 dark:text-slate-300 block">
                    Your reflection: Explain the principle in your words
                  </label>
                  <textarea
                    rows={4}
                    value={userUnderstandingInput}
                    onChange={(e) => setUserUnderstandingInput(e.target.value)}
                    placeholder="Type your explanation here. For example: Inflation erodes real value and taxes eat the nominal interest..."
                    className="w-full p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    required
                  />

                  <Button type="submit" size="md" variant="primaryDark" className="w-full rounded-lg text-xs font-medium bg-[#2563EB] hover:bg-[#1D4ED8] text-white">
                    Submit explanation for evaluation &rarr;
                  </Button>
                </form>
              ) : (
                /* Step 4: AI Verdict & Correction */
                <div className="space-y-4 pt-1">
                  <div className={`p-4 rounded-xl border ${
                    socraticFeedback.isCorrect 
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/60' 
                      : 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60'
                  }`}>
                    <div className="flex items-center gap-2 mb-1">
                      {socraticFeedback.isCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                      )}
                      <h4 className="text-xs font-medium">
                        {socraticFeedback.isCorrect ? 'Correct understanding verified' : 'Correction recommended'}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {socraticFeedback.analysis}
                    </p>
                    <p className="text-xs font-medium text-slate-900 dark:text-slate-100 mt-2">
                      Key takeaway: {socraticFeedback.correction}
                    </p>
                  </div>

                  <Button
                    onClick={() => {
                      setActiveMisconception(null);
                    }}
                    size="md"
                    variant="outline"
                    className="w-full rounded-lg text-xs font-medium bg-white dark:bg-[#111620] text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
                  >
                    Done & close
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
          <div className="w-full max-w-2xl bg-white dark:bg-[#111620] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 max-h-[85vh] flex flex-col overflow-hidden animate-slideUp">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-slate-900/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold">
                  <History className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Past Quiz Scores & Attempt History</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Track score trajectory across previous assessment checkpoints</p>
                </div>
              </div>

              <button
                onClick={() => setQuizHistoryOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-3">
              {quizHistory.map((q) => (
                <div
                  key={q.id}
                  className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/30"
                >
                  <div>
                    <h4 className="text-xs sm:text-sm font-medium text-slate-900 dark:text-slate-100">{q.topic}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 tabular-nums">
                      {q.date} • {q.correctQ} of {q.totalQ} correct
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-semibold text-slate-900 dark:text-slate-100 block tabular-nums">{q.score}</span>
                    <span className="text-[11px] font-medium text-slate-500">{q.status}</span>
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
          <div className="w-full max-w-2xl bg-white dark:bg-[#111620] rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 max-h-[90vh] flex flex-col overflow-hidden animate-slideUp">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/60 dark:bg-slate-900/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">Study Prep Planner</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Generate a feasible course roadmap based on your daily availability</p>
                </div>
              </div>

              <button
                onClick={() => setPrepPlanOpen(false)}
                className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-5">
              {!generatedPlan ? (
                <form onSubmit={handleGeneratePlan} className="space-y-4 text-xs">
                  <div>
                    <label className="font-medium text-slate-900 dark:text-slate-100 block mb-1.5">
                      When are you usually free to study?
                    </label>
                    <select
                      value={prepAvailability}
                      onChange={(e) => setPrepAvailability(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option>Mornings (7 AM - 9 AM)</option>
                      <option>Afternoons (1 PM - 3 PM)</option>
                      <option>Evenings (7 PM - 10 PM)</option>
                      <option>Weekends Only (Saturday & Sunday)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-medium text-slate-900 dark:text-slate-100 block mb-1.5">
                      Time period you want to sit per session:
                    </label>
                    <select
                      value={prepDuration}
                      onChange={(e) => setPrepDuration(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option>20 mins/day (Micro-learning)</option>
                      <option>45 mins/day (Balanced)</option>
                      <option>60 mins/day (Accelerated)</option>
                      <option>90 mins/day (Intensive)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-medium text-slate-900 dark:text-slate-100 block mb-1.5">
                      How many days can you learn in a week?
                    </label>
                    <select
                      value={prepDays}
                      onChange={(e) => setPrepDays(e.target.value)}
                      className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option>3 days/week</option>
                      <option>5 days/week</option>
                      <option>7 days/week (Daily discipline)</option>
                    </select>
                  </div>

                  <Button type="submit" size="md" variant="primaryDark" className="w-full rounded-lg text-xs font-medium bg-[#2563EB] hover:bg-[#1D4ED8] text-white mt-2">
                    Generate study roadmap &rarr;
                  </Button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-800/80">
                    <span className="text-[11px] font-medium text-[#2563EB] dark:text-blue-400 block">
                      Calculated timeline
                    </span>
                    <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mt-1">
                      {generatedPlan.estimatedWeeks}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Configured for {prepDuration} across {prepDays} during {prepAvailability}.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Weekly execution routine
                    </h4>
                    {generatedPlan.weeklySchedule.map((sched: any, idx: number) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg border border-slate-200/60 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 text-xs"
                      >
                        <span className="font-medium text-[#2563EB] dark:text-blue-400">{sched.day}: </span>
                        <span className="text-slate-700 dark:text-slate-300 font-normal">{sched.task}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      onClick={() => setGeneratedPlan(null)}
                      size="sm"
                      variant="outline"
                      className="rounded-lg text-xs font-medium bg-white dark:bg-[#111620] text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 flex-1"
                    >
                      Recalibrate
                    </Button>
                    <Button
                      onClick={() => setPrepPlanOpen(false)}
                      size="sm"
                      variant="primaryDark"
                      className="rounded-lg text-xs font-medium bg-[#2563EB] hover:bg-[#1D4ED8] text-white flex-1"
                    >
                      Save to schedule
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
