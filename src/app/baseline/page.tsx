'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/brand/Logo';
import { Button } from '@/components/ui/Button';
import { CheckCircle2, XCircle, Sparkles, ArrowRight, Compass, ShieldCheck } from 'lucide-react';
import { useAppState } from '@/lib/store';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

interface BaselineQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    isCorrect: boolean;
    feedback: string;
  }[];
}

const questions: BaselineQuestion[] = [
  {
    id: 1,
    question: 'If you have ₹1,00,000 in a savings account paying 4% interest per year, and inflation is 6% per year, after 1 year will you be able to buy more, exactly the same, or less than today?',
    options: [
      { text: 'More than today', isCorrect: false, feedback: 'Because the bank interest (4%) is lower than inflation (6%), your purchasing power actually decreases.' },
      { text: 'Exactly the same', isCorrect: false, feedback: 'Inflation erodes the purchasing power of your money unless returns exceed inflation.' },
      { text: 'Less than today', isCorrect: true, feedback: 'Spot on! Real return = 4% - 6% = -2% real loss in purchasing power.' }
    ]
  },
  {
    id: 2,
    question: 'Using the Rule of 72, approximately how long will it take for an investment to double at a 12% annual compounded return?',
    options: [
      { text: '6 years (72 ÷ 12 = 6)', isCorrect: true, feedback: 'Correct! 72 divided by 12 equals 6 years.' },
      { text: '12 years', isCorrect: false, feedback: 'At 12%, doubling time is 6 years. 12 years would apply to a 6% return.' },
      { text: '8 years', isCorrect: false, feedback: '72 ÷ 12 = 6, not 8.' }
    ]
  },
  {
    id: 3,
    question: 'Is buying shares in a single company usually safer than buying a diversified stock mutual fund or index ETF?',
    options: [
      { text: 'Yes, a single company is easier to track.', isCorrect: false, feedback: 'A single company exposes you to company-specific bankruptcy risk. An index fund spreads risk across 50+ companies.' },
      { text: 'No, a diversified fund spreads risk across many companies.', isCorrect: true, feedback: 'Correct! Diversification protects against the failure of any single company.' }
    ]
  },
  {
    id: 4,
    question: 'If a friend tells you about a stock with a 15% guaranteed return per month with zero risk, what is the most logical conclusion?',
    options: [
      { text: 'It is a legitimate high-tech algorithmic opportunity.', isCorrect: false, feedback: 'Guaranteed 15%/month is mathematically unsustainable and indicative of a Ponzi or fraudulent scheme.' },
      { text: 'It is almost certainly a scam or high-risk fraudulent scheme.', isCorrect: true, feedback: 'Spot on! In finance, returns are directly linked to risk. No legitimate entity can guarantee 15% monthly risk-free.' }
    ]
  },
  {
    id: 5,
    question: 'Before investing in volatile equity markets, what should every beginner establish first?',
    options: [
      { text: 'A premium trading terminal subscription and 10x leverage margin.', isCorrect: false, feedback: 'Leverage and day-trading terminals destroy beginner capital quickly.' },
      { text: 'A 3 to 6-month liquid emergency fund and zero high-interest toxic debt.', isCorrect: true, feedback: 'Exactly! Financial foundations must be secure before taking market risk.' }
    ]
  }
];

export default function BaselinePage() {
  const router = useRouter();
  const { updateState } = useAppState();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const currentQ = questions[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedOption(idx);
    setHasAnswered(true);
    if (currentQ.options[idx].isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      const finalScorePercent = Math.round(((score + (currentQ.options[selectedOption!].isCorrect ? 0 : 0)) / questions.length) * 100);
      updateState((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          baselineScore: finalScorePercent,
          baselineCompleted: true,
          stage: 'LEARN'
        }
      }));
      setCompleted(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#070A11] flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8 antialiased transition-colors duration-300">
      {/* Top right theme toggle */}
      <div className="max-w-2xl w-full mx-auto flex justify-end mb-4">
        <ThemeToggle />
      </div>

      <div className="max-w-2xl w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-3">
            <Logo size="md" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Baseline Diagnostic
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] mt-1">
            Financial Literacy Diagnostic
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Question {currentIdx + 1} of {questions.length} • Calibrating your knowledge baseline
          </p>

          <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
            <div
              className="bg-blue-600 h-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        {!completed ? (
          <div className="bg-white dark:bg-[#111625] rounded-3xl p-7 sm:p-9 border border-slate-200/80 dark:border-slate-800 shadow-lg space-y-6">
            <h2 className="text-base sm:text-lg font-bold text-[#0A1629] dark:text-[#F8FAFC] leading-relaxed">
              {currentQ.question}
            </h2>

            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                let btnStyle = 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-[#0B0F19] text-slate-800 dark:text-slate-200';
                if (hasAnswered) {
                  if (opt.isCorrect) {
                    btnStyle = 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 ring-1 ring-emerald-500/20';
                  } else if (isSelected) {
                    btnStyle = 'border-rose-400 bg-rose-50/70 dark:bg-rose-950/40 text-rose-900 dark:text-rose-300 ring-1 ring-rose-400/20';
                  } else {
                    btnStyle = 'opacity-50 border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] text-slate-500';
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={hasAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start justify-between gap-3 ${btnStyle}`}
                  >
                    <span className="text-sm font-medium leading-relaxed">{opt.text}</span>
                    {hasAnswered && opt.isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    {hasAnswered && isSelected && !opt.isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-500 dark:text-rose-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after answer */}
            {hasAnswered && (
              <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed animate-fadeIn">
                <span className="font-bold text-blue-800 dark:text-blue-300 block mb-1">Pedagogical Insight:</span>
                {currentQ.options[selectedOption!].feedback}
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
              <Button
                onClick={handleNext}
                disabled={!hasAnswered}
                variant="primaryDark"
                size="md"
                className="rounded-full px-7 text-xs font-bold"
              >
                {currentIdx < questions.length - 1 ? 'Next Question \u2192' : 'View My Score & Recommendations \u2192'}
              </Button>
            </div>
          </div>
        ) : (
          /* Assessment Completion Snapshot Card */
          <div className="bg-white dark:bg-[#111625] rounded-3xl p-8 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-lg text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold mx-auto">
              <Sparkles className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Diagnostic Complete
              </span>
              <h2 className="text-3xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] mt-1">
                Your Starting Baseline: {Math.round((score / questions.length) * 100)}%
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2 max-w-md mx-auto">
                You correctly answered {score} of {questions.length} diagnostic scenarios. We have calibrated your customized learning path.
              </p>
            </div>

            <div className="bg-slate-50 dark:bg-[#0B0F19] rounded-2xl p-5 text-left border border-slate-100 dark:border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Prescribed Next Action
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Begin with <strong className="text-[#0A1629] dark:text-[#F8FAFC]">Topic 01: Money Foundations</strong> to solidify emergency buffer rules, then advance to <strong className="text-[#0A1629] dark:text-[#F8FAFC]">Topic 02: Saving & Compounding</strong> to master exponential mathematics.
              </p>
            </div>

            <Button
              onClick={() => router.push('/app')}
              variant="primaryDark"
              size="lg"
              className="w-full rounded-full text-xs font-bold py-3.5 shadow-md"
            >
              Enter Learner Dashboard \u2192
            </Button>
          </div>
        )}
      </div>

      <div className="text-center text-[11px] text-slate-400 dark:text-slate-600 mt-8">
        &copy; {new Date().getFullYear()} TO DIRECT. Learn before you invest.
      </div>
    </div>
  );
}
