'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
import { useAppState } from '@/lib/store';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Award, 
  Sparkles, 
  ArrowRight, 
  RotateCcw, 
  BrainCircuit, 
  TrendingUp, 
  Layers, 
  History, 
  Zap, 
  ChevronRight,
  ShieldCheck,
  AlertTriangle,
  Flame
} from 'lucide-react';

interface FollowUpProbe {
  triggerChoiceId: string;
  probeQuestion: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

interface QuizItem {
  id: string;
  topicId: string;
  topicTitle: string;
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced';
  question: string;
  context?: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
    misconception?: string;
  }[];
  followUps: Record<string, FollowUpProbe>;
}

const TOPICS_DATA = [
  {
    id: 'money-foundations',
    title: 'Money Foundations',
    description: 'Purchasing power, liquidity trade-offs, and emergency cash reserves',
    score: 92,
    attempts: 4,
    questionsCount: 5,
    status: 'Mastered',
    badge: 'Liquid Sentinel'
  },
  {
    id: 'saving-compounding',
    title: 'Saving & Compounding',
    description: 'Exponential compounding mechanics, Rule of 72, and time horizons',
    score: 85,
    attempts: 3,
    questionsCount: 6,
    status: 'Proficient',
    badge: 'Compound Strategist'
  },
  {
    id: 'inflation-purchasing-power',
    title: 'Inflation & Purchasing Power',
    description: 'Real vs nominal returns, CPI erosion, and negative real yield traps',
    score: 64,
    attempts: 2,
    questionsCount: 4,
    status: 'Needs Review',
    badge: 'Inflation Guard'
  },
  {
    id: 'investment-vehicles',
    title: 'Investment Vehicles',
    description: 'Debt vs Equity, sovereign gold bonds, and fixed income structures',
    score: 78,
    attempts: 2,
    questionsCount: 5,
    status: 'Proficient',
    badge: 'Asset Architect'
  },
  {
    id: 'risk-diversification',
    title: 'Risk & Diversification',
    description: 'Unsystematic vs systematic risk, asset allocation, and correlation',
    score: 90,
    attempts: 3,
    questionsCount: 5,
    status: 'Mastered',
    badge: 'Risk Navigator'
  },
  {
    id: 'mutual-funds-etfs',
    title: 'Mutual Funds & ETFs',
    description: 'Expense ratios, active vs passive indexing, and tracking error',
    score: 80,
    attempts: 2,
    questionsCount: 5,
    status: 'Proficient',
    badge: 'Index Vanguard'
  },
  {
    id: 'stock-markets-valuation',
    title: 'Stock Markets & Decision-Making',
    description: 'P/E ratios, intrinsic valuation, moat durability, and cognitive biases',
    score: 70,
    attempts: 1,
    questionsCount: 6,
    status: 'Needs Review',
    badge: 'Valuation Analyst'
  }
];

const SAMPLE_QUIZ_QUESTIONS: QuizItem[] = [
  {
    id: 'q-inflation-1',
    topicId: 'inflation-purchasing-power',
    topicTitle: 'Inflation & Purchasing Power',
    difficulty: 'Intermediate',
    question: 'You keep ₹1,00,000 in a fixed deposit earning 5% interest per year. If inflation averages 7% annually over 3 years, what happens to your purchasing power?',
    context: 'Examine both the nominal balance and what that balance can buy at the grocery store.',
    options: [
      {
        id: 'opt-a',
        text: 'Purchasing power decreases, even though the nominal account balance grew.',
        isCorrect: true
      },
      {
        id: 'opt-b',
        text: 'Purchasing power increases because 5% compounding guarantees wealth creation.',
        isCorrect: false,
        misconception: 'Money Illusion: Focusing on rupee digits rather than purchasing power.'
      },
      {
        id: 'opt-c',
        text: 'Purchasing power stays flat because bank FDs are guaranteed capital by RBI.',
        isCorrect: false,
        misconception: 'Nominal Safety Fallacy: Confusing principal safety with real purchasing power protection.'
      }
    ],
    followUps: {
      'opt-a': {
        triggerChoiceId: 'opt-a',
        probeQuestion: 'Correct! Now probe deeper: What is the approximate real rate of return you are experiencing each year?',
        options: [
          {
            id: 'fu-a1',
            text: '-2% per year (5% nominal minus 7% inflation)',
            isCorrect: true,
            explanation: 'Exactly right. The Fisher equation (Real Return ≈ Nominal Return - Inflation) gives 5% - 7% = -2% real drag per year.'
          },
          {
            id: 'fu-a2',
            text: '+12% per year (combining 5% and 7%)',
            isCorrect: false,
            explanation: 'Incorrect. Inflation is a cost drag, not a return generator.'
          },
          {
            id: 'fu-a3',
            text: '0% because bank interest cancels out price rises',
            isCorrect: false,
            explanation: 'Incorrect. Because inflation exceeds interest by 2%, capital erodes.'
          }
        ]
      },
      'opt-b': {
        triggerChoiceId: 'opt-b',
        probeQuestion: 'You noted that the number grew. But if a shopping cart costs ₹100 today and ₹107 next year, while your money only grew to ₹105, can you still buy the whole cart?',
        options: [
          {
            id: 'fu-b1',
            text: 'No, you fall ₹2 short. Prices rose faster than your money, causing a net purchasing loss.',
            isCorrect: true,
            explanation: 'Bravo on self-correcting! This proves that nominal growth alone is insufficient—growth must outpace inflation.'
          },
          {
            id: 'fu-b2',
            text: 'Yes, because you still have more total rupees in your hand.',
            isCorrect: false,
            explanation: 'This is the Money Illusion trap. Having more paper notes is useless if every item costs significantly more.'
          }
        ]
      },
      'opt-c': {
        triggerChoiceId: 'opt-c',
        probeQuestion: 'While RBI guarantees up to ₹5 Lakh against bank default, does RBI guarantee the prices of rice, milk, or housing won’t rise?',
        options: [
          {
            id: 'fu-c1',
            text: 'No, bank insurance protects against institutional insolvency, not cost-of-living increases.',
            isCorrect: true,
            explanation: 'Precisely. Default risk is zero, but inflation risk is 100% active.'
          },
          {
            id: 'fu-c2',
            text: 'Yes, fixed deposits freeze your cost of living.',
            isCorrect: false,
            explanation: 'Incorrect. Fixed deposits have fixed nominal coupon payouts, which become worth less during high inflation.'
          }
        ]
      }
    }
  },
  {
    id: 'q-compounding-1',
    topicId: 'saving-compounding',
    topicTitle: 'Saving & Compounding',
    difficulty: 'Foundation',
    question: 'According to the Rule of 72, approximately how many years will it take for an investment to double at a 12% annual compounded return?',
    context: 'Quick mental math estimation formula: Doubling Years ≈ 72 / Annual Return Rate.',
    options: [
      {
        id: 'opt-2a',
        text: '6 years (72 divided by 12)',
        isCorrect: true
      },
      {
        id: 'opt-2b',
        text: '12 years (because 12% means 1/12th of 100)',
        isCorrect: false,
        misconception: 'Linear Growth Bias: Ignoring exponential interest accumulation.'
      },
      {
        id: 'opt-2c',
        text: '7.2 years',
        isCorrect: false,
        misconception: 'Decimal Shift Error in Rule of 72.'
      }
    ],
    followUps: {
      'opt-2a': {
        triggerChoiceId: 'opt-2a',
        probeQuestion: 'Spot on: 72 / 12 = 6 years. Now examine the second doubling: After 12 total years, how much will your initial ₹1,00,000 become?',
        options: [
          {
            id: 'fu-2a1',
            text: '₹4,00,000 (It doubles twice: 1L -> 2L in Yr 6, then 2L -> 4L in Yr 12)',
            isCorrect: true,
            explanation: 'Masterful understanding! Compounding is exponential: the second doubling produces 2x the absolute profit of the first.'
          },
          {
            id: 'fu-2a2',
            text: '₹2,50,000 (linear addition of 12% per year)',
            isCorrect: false,
            explanation: 'Incorrect. Compounding pays interest on accrued interest, not just initial principal.'
          }
        ]
      },
      'opt-2b': {
        triggerChoiceId: 'opt-2b',
        probeQuestion: 'At 12 years with simple linear growth, you would get ₹100k + ₹144k. But what happens to the profit earned in year 1, 2, and 3?',
        options: [
          {
            id: 'fu-2b1',
            text: 'It gets reinvested and earns interest on itself, doubling much faster in only 6 years.',
            isCorrect: true,
            explanation: 'Correct! Compounding accelerates doubling because previous earnings generate fresh gains.'
          },
          {
            id: 'fu-2b2',
            text: 'It sits idle and does not earn additional interest.',
            isCorrect: false,
            explanation: 'Incorrect. In compounded instruments, all gains remain invested.'
          }
        ]
      },
      'opt-2c': {
        triggerChoiceId: 'opt-2c',
        probeQuestion: 'Remember the formula: 72 divided by the rate number directly. Is 72 / 12 equal to 7.2 or 6?',
        options: [
          {
            id: 'fu-2c1',
            text: '72 / 12 = 6 years exactly.',
            isCorrect: true,
            explanation: 'Simple division: 12 x 6 = 72.'
          },
          {
            id: 'fu-2c2',
            text: '7.2 years.',
            isCorrect: false,
            explanation: '72 / 10 would be 7.2. At 12%, it is 6 years.'
          }
        ]
      }
    }
  }
];

export default function QuizzesPage() {
  const { state } = useAppState();
  const [activeTab, setActiveTab] = useState<'tests' | 'runner' | 'history'>('tests');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('inflation-purchasing-power');
  
  // Interactive Quiz Runner State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [primarySelectedOptId, setPrimarySelectedOptId] = useState<string | null>(null);
  const [followUpSelectedOptId, setFollowUpSelectedOptId] = useState<string | null>(null);
  const [stage, setStage] = useState<'primary' | 'adaptive_followup' | 'reviewed'>('primary');
  const [testScoreTotal, setTestScoreTotal] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);

  const activeQuestion = SAMPLE_QUIZ_QUESTIONS[currentQuestionIndex] || SAMPLE_QUIZ_QUESTIONS[0];
  const activeFollowUp = primarySelectedOptId ? activeQuestion.followUps[primarySelectedOptId] : null;

  const startTestForTopic = (topicId: string) => {
    setSelectedTopicId(topicId);
    setCurrentQuestionIndex(0);
    setPrimarySelectedOptId(null);
    setFollowUpSelectedOptId(null);
    setStage('primary');
    setTestScoreTotal(0);
    setTestCompleted(false);
    setActiveTab('runner');
  };

  const handlePrimarySelect = (optId: string) => {
    setPrimarySelectedOptId(optId);
    // Transition to the adaptive follow-up probing stage immediately!
    setStage('adaptive_followup');
  };

  const handleFollowUpSelect = (fuOptId: string) => {
    setFollowUpSelectedOptId(fuOptId);
    setStage('reviewed');

    // Calculate score
    const primaryOpt = activeQuestion.options.find(o => o.id === primarySelectedOptId);
    const fuOpt = activeFollowUp?.options.find(o => o.id === fuOptId);

    let pts = 0;
    if (primaryOpt?.isCorrect) pts += 50;
    if (fuOpt?.isCorrect) pts += 50;
    setTestScoreTotal(prev => prev + pts);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < SAMPLE_QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setPrimarySelectedOptId(null);
      setFollowUpSelectedOptId(null);
      setStage('primary');
    } else {
      setTestCompleted(true);
    }
  };

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Socratic Diagnostic Engine
            </span>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-tight mt-1">
              Quizzes & Adaptive Testing
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
              Take rigorous topic tests with adaptive follow-up questions that probe your rationale on every single answer you give.
            </p>
          </div>

          {/* Navigation Pill Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-[#111625] rounded-xl border border-slate-200 dark:border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('tests')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'tests'
                  ? 'bg-white dark:bg-blue-600 text-[#0A1629] dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Topic Tests & Scores
            </button>
            <button
              onClick={() => setActiveTab('runner')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'runner'
                  ? 'bg-white dark:bg-blue-600 text-[#0A1629] dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Live Adaptive Test
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'history'
                  ? 'bg-white dark:bg-blue-600 text-[#0A1629] dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Quiz History
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: TOPIC TESTS & SCORES OVERVIEW */}
        {/* ========================================================================= */}
        {activeTab === 'tests' && (
          <div className="space-y-6">
            {/* Aggregate Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-[#111625] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Average Test Score</span>
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">80.1%</div>
                <p className="text-[11px] text-slate-500 mt-0.5">Across 7 core financial disciplines</p>
              </div>

              <div className="bg-white dark:bg-[#111625] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Mastered Topics</span>
                <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">2 / 7</div>
                <p className="text-[11px] text-slate-500 mt-0.5">&gt;90% accuracy demonstrated</p>
              </div>

              <div className="bg-white dark:bg-[#111625] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Needs Attention</span>
                <div className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">2 Topics</div>
                <p className="text-[11px] text-slate-500 mt-0.5">Inflation & Stock Valuation</p>
              </div>

              <div className="bg-white dark:bg-[#111625] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Socratic Probes Taken</span>
                <div className="text-2xl font-bold text-[#0A1629] dark:text-[#F8FAFC] mt-1">24 Probes</div>
                <p className="text-[11px] text-slate-500 mt-0.5">Adaptive follow-up questions answered</p>
              </div>
            </div>

            {/* Topic List Cards */}
            <div className="bg-white dark:bg-[#111625] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-base font-bold text-[#0A1629] dark:text-[#F8FAFC]">Curriculum Topic Tests & Current Mastery Scores</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Select any topic to take or retake an adaptive assessment</p>
                </div>
                <Button 
                  onClick={() => startTestForTopic('inflation-purchasing-power')}
                  className="rounded-full text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5" /> Launch Comprehensive Drill
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-3.5 pt-2">
                {TOPICS_DATA.map((topic, idx) => (
                  <div
                    key={topic.id}
                    className="p-4 sm:p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-900/60 bg-[#FAF8F5]/60 dark:bg-[#0B0F19]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          Topic 0{idx + 1}
                        </span>
                        <h3 className="text-sm font-bold text-[#0A1629] dark:text-[#F8FAFC]">
                          {topic.title}
                        </h3>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                            topic.status === 'Mastered'
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900/50'
                              : topic.status === 'Proficient'
                              ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-900/50'
                              : 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-900/50'
                          }`}
                        >
                          {topic.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{topic.description}</p>
                      <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-1">
                        <span>{topic.questionsCount} Questions</span>
                        <span>•</span>
                        <span>{topic.attempts} Attempts recorded</span>
                        <span>•</span>
                        <span className="text-blue-600 dark:text-blue-400 font-semibold">{topic.badge}</span>
                      </div>
                    </div>

                    {/* Score Bar & Action */}
                    <div className="flex items-center gap-5 sm:min-w-[280px] justify-between md:justify-end">
                      <div className="text-right">
                        <div className="flex items-baseline gap-1.5 justify-end">
                          <span className={`text-xl font-bold ${
                            topic.score >= 85 ? 'text-emerald-600 dark:text-emerald-400' :
                            topic.score >= 70 ? 'text-blue-600 dark:text-blue-400' : 'text-rose-600 dark:text-rose-400'
                          }`}>
                            {topic.score}%
                          </span>
                          <span className="text-[10px] text-slate-400 font-semibold">score</span>
                        </div>
                        <div className="w-24 bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                          <div
                            className={`h-full rounded-full ${
                              topic.score >= 85 ? 'bg-emerald-500' :
                              topic.score >= 70 ? 'bg-blue-500' : 'bg-rose-500'
                            }`}
                            style={{ width: `${topic.score}%` }}
                          />
                        </div>
                      </div>

                      <Button
                        onClick={() => startTestForTopic(topic.id)}
                        variant="outline"
                        size="sm"
                        className="rounded-full text-xs font-bold border-slate-300 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                      >
                        {topic.score < 70 ? 'Retake Drill' : 'Test Again'} &rarr;
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: LIVE SOCRATIC ADAPTIVE TEST RUNNER */}
        {/* ========================================================================= */}
        {activeTab === 'runner' && (
          <div className="max-w-3xl mx-auto space-y-6">
            {!testCompleted ? (
              <div className="bg-white dark:bg-[#111625] rounded-3xl p-6 sm:p-9 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-7">
                {/* Progress bar */}
                <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                      Question {currentQuestionIndex + 1} of {SAMPLE_QUIZ_QUESTIONS.length}
                    </span>
                    <span className="text-slate-300 dark:text-slate-700">|</span>
                    <span className="text-slate-500 dark:text-slate-400 font-medium">
                      {activeQuestion.topicTitle}
                    </span>
                  </div>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {activeQuestion.difficulty}
                  </span>
                </div>

                {/* Question Section */}
                <div className="space-y-3">
                  <h2 className="text-lg sm:text-xl font-bold text-[#0A1629] dark:text-[#F8FAFC] leading-snug">
                    {activeQuestion.question}
                  </h2>
                  {activeQuestion.context && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 italic bg-[#FAF8F5] dark:bg-[#0B0F19] p-3 rounded-xl border border-slate-100 dark:border-slate-800/80">
                      💡 Tip: {activeQuestion.context}
                    </p>
                  )}
                </div>

                {/* Step 1: Primary Options */}
                <div className="space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Step 1: Choose your initial rationale
                  </span>
                  <div className="grid grid-cols-1 gap-2.5">
                    {activeQuestion.options.map((opt, i) => {
                      const isSelected = primarySelectedOptId === opt.id;
                      return (
                        <button
                          key={opt.id}
                          disabled={stage !== 'primary'}
                          onClick={() => handlePrimarySelect(opt.id)}
                          className={`p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-start gap-3 ${
                            isSelected
                              ? 'bg-blue-50/80 dark:bg-blue-950/40 border-blue-600 text-blue-950 dark:text-blue-200 ring-2 ring-blue-500/30'
                              : stage === 'primary'
                              ? 'border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-900 bg-white dark:bg-[#0B0F19]'
                              : 'opacity-50 border-slate-200 dark:border-slate-800 cursor-not-allowed'
                          }`}
                        >
                          <span className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                          }`}>
                            {String.fromCharCode(65 + i)}
                          </span>
                          <span className="flex-1 mt-0.5">{opt.text}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: ADAPTIVE SOCRATIC FOLLOW-UP PROBE (Reveals dynamically based on chosen answer) */}
                {stage !== 'primary' && activeFollowUp && (
                  <div className="p-5 sm:p-6 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border-2 border-amber-300 dark:border-amber-900/50 space-y-4 animate-in fade-in zoom-in-95 duration-300">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                          Socratic Follow-Up Probe (Based on your answer)
                        </span>
                        <h4 className="text-sm font-bold text-[#0A1629] dark:text-[#F8FAFC]">
                          {activeFollowUp.probeQuestion}
                        </h4>
                      </div>
                    </div>

                    {/* Follow-up Options */}
                    <div className="grid grid-cols-1 gap-2 pt-1">
                      {activeFollowUp.options.map((fuOpt, idx) => {
                        const isFuSelected = followUpSelectedOptId === fuOpt.id;
                        return (
                          <button
                            key={fuOpt.id}
                            disabled={stage === 'reviewed'}
                            onClick={() => handleFollowUpSelect(fuOpt.id)}
                            className={`p-3.5 rounded-xl border text-left text-xs font-medium transition-all flex items-start gap-2.5 ${
                              isFuSelected
                                ? fuOpt.isCorrect
                                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-200'
                                  : 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 text-rose-900 dark:text-rose-200'
                                : stage === 'adaptive_followup'
                                ? 'bg-white dark:bg-[#111625] border-amber-200 dark:border-amber-900/60 hover:border-amber-400'
                                : 'opacity-60 border-slate-200 dark:border-slate-800 cursor-not-allowed'
                            }`}
                          >
                            <span className="w-5 h-5 rounded-md text-[11px] font-bold bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <div className="flex-1">
                              <p>{fuOpt.text}</p>
                              {stage === 'reviewed' && isFuSelected && (
                                <p className={`mt-2 text-[11px] font-semibold ${
                                  fuOpt.isCorrect ? 'text-emerald-700 dark:text-emerald-300' : 'text-rose-700 dark:text-rose-300'
                                }`}>
                                  {fuOpt.explanation}
                                </p>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Review / Next Button */}
                {stage === 'reviewed' && (
                  <div className="pt-2 flex justify-end">
                    <Button
                      onClick={handleNextQuestion}
                      className="rounded-full text-xs font-bold px-6 bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                    >
                      {currentQuestionIndex < SAMPLE_QUIZ_QUESTIONS.length - 1 ? 'Next Question' : 'Complete Assessment'} &rarr;
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              /* Test Completion Results Card */
              <div className="bg-white dark:bg-[#111625] rounded-3xl p-8 sm:p-12 border border-slate-200/80 dark:border-slate-800 shadow-sm text-center space-y-6">
                <div className="w-16 h-16 rounded-3xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-inner">
                  <Award className="w-8 h-8" />
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    Assessment Complete
                  </span>
                  <h2 className="text-2xl font-bold text-[#0A1629] dark:text-[#F8FAFC]">
                    Adaptive Assessment Score: {Math.round((testScoreTotal / (SAMPLE_QUIZ_QUESTIONS.length * 100)) * 100)}%
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                    You demonstrated conceptual awareness and answered the adaptive follow-up probes. Your topic mastery score has been updated in your profile.
                  </p>
                </div>

                <div className="flex items-center justify-center gap-3 pt-3">
                  <Button
                    onClick={() => startTestForTopic(selectedTopicId)}
                    variant="outline"
                    className="rounded-full text-xs font-bold border-slate-300 dark:border-slate-700"
                  >
                    Retake This Drill
                  </Button>
                  <Button
                    onClick={() => setActiveTab('tests')}
                    className="rounded-full text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    View All Topic Scores
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: QUIZ HISTORY & AUDIT TRAIL */}
        {/* ========================================================================= */}
        {activeTab === 'history' && (
          <div className="bg-white dark:bg-[#111625] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
            <div>
              <h2 className="text-base font-bold text-[#0A1629] dark:text-[#F8FAFC] flex items-center gap-2">
                <History className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Historical Test Log & Socratic Probing Record
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Past assessment records with primary choices and follow-up probing outcomes</p>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {[
                {
                  id: 'hist-1',
                  topic: 'Money Foundations',
                  date: 'Today, 10:15 AM',
                  score: 95,
                  followUpResult: 'Cleared both primary and depth probe',
                  misconceptions: 'None'
                },
                {
                  id: 'hist-2',
                  topic: 'Saving & Compounding',
                  date: 'Yesterday, 4:20 PM',
                  score: 85,
                  followUpResult: 'Linear growth trap identified & corrected on follow-up',
                  misconceptions: 'Linear Growth Bias (Resolved)'
                },
                {
                  id: 'hist-3',
                  topic: 'Risk & Diversification',
                  date: '28 Oct 2026',
                  score: 90,
                  followUpResult: 'Distinguished company risk vs market risk correctly',
                  misconceptions: 'None'
                },
                {
                  id: 'hist-4',
                  topic: 'Inflation & Purchasing Power',
                  date: '27 Oct 2026',
                  score: 64,
                  followUpResult: 'Caught in Money Illusion probe on first try',
                  misconceptions: 'Money Illusion'
                }
              ].map(item => (
                <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xs font-bold text-[#0A1629] dark:text-[#F8FAFC]">{item.topic}</h4>
                      <span className="text-[10px] text-slate-400">{item.date}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{item.followUpResult}</p>
                    {item.misconceptions !== 'None' && (
                      <span className="inline-block text-[10px] font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-900/50">
                        {item.misconceptions}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <span className={`text-base font-bold ${
                      item.score >= 80 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'
                    }`}>
                      {item.score}%
                    </span>
                    <Button 
                      onClick={() => startTestForTopic('inflation-purchasing-power')}
                      size="sm" 
                      variant="outline" 
                      className="rounded-full text-[11px] font-semibold h-7 px-3"
                    >
                      Review &rarr;
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
