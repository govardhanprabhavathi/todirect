'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/brand/Logo';
import { Button } from '@/components/ui/Button';
import { GraduationCap, Briefcase, Compass, CheckCircle2, ArrowRight } from 'lucide-react';
import { useAppState } from '@/lib/store';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export default function OnboardingPage() {
  const router = useRouter();
  const { updateState } = useAppState();
  const [step, setStep] = useState<1 | 2>(1);
  const [level, setLevel] = useState('College Student');
  const [goal, setGoal] = useState('Master compounding & index investing basics');

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      updateState((prev) => ({
        ...prev,
        profile: {
          ...prev.profile,
          educationLevel: level,
          financialGoal: goal
        }
      }));
      router.push('/baseline');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#070A11] flex flex-col justify-between py-10 px-4 sm:px-6 lg:px-8 antialiased transition-colors duration-300">
      {/* Top right theme toggle */}
      <div className="max-w-xl w-full mx-auto flex justify-end mb-4">
        <ThemeToggle />
      </div>

      <div className="max-w-xl w-full mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-block mb-3">
            <Logo size="md" />
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className={`w-8 h-1.5 rounded-full ${step >= 1 ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-800'}`} />
            <span className={`w-8 h-1.5 rounded-full ${step >= 2 ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-800'}`} />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Step {step} of 2
          </span>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] mt-1">
            {step === 1 ? 'Tell us about your background' : 'What is your primary financial goal?'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            We adapt Finn’s explanations and curriculum pacing to your context.
          </p>
        </div>

        {/* Pure Card */}
        <div className="bg-white dark:bg-[#111625] rounded-3xl p-7 sm:p-9 border border-slate-200/80 dark:border-slate-800 shadow-lg space-y-6">
          {step === 1 ? (
            <div className="space-y-3">
              {[
                { title: 'College Student', desc: 'Managing allowance or internship stipend; beginner to finance', icon: GraduationCap },
                { title: 'First-Job Earner', desc: 'Starting full-time salary; learning tax regimes, EPF, and SIPs', icon: Briefcase },
                { title: 'Curious Lifelong Learner', desc: 'Seeking solid mental models and unbiased financial literacy', icon: Compass }
              ].map((item) => (
                <div
                  key={item.title}
                  onClick={() => setLevel(item.title)}
                  className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-center justify-between ${
                    level === item.title
                      ? 'bg-blue-50/60 dark:bg-blue-950/40 border-blue-500 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#0A1629] dark:text-[#F8FAFC]">{item.title}</h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                  {level === item.title && (
                    <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {[
                'Master compounding & index investing basics',
                'Build an emergency buffer and stop living month-to-month',
                'Avoid get-rich-quick scams, bad advice, and crypto hype',
                'Practice asset allocation with ₹10,000 virtual balance'
              ].map((g) => (
                <div
                  key={g}
                  onClick={() => setGoal(g)}
                  className={`cursor-pointer p-4 rounded-2xl border transition-all flex items-center justify-between ${
                    goal === g
                      ? 'bg-blue-50/60 dark:bg-blue-950/40 border-blue-500 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{g}</span>
                  {goal === g && (
                    <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            {step === 2 ? (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              >
                &larr; Back
              </button>
            ) : <div />}

            <Button
              onClick={handleNext}
              variant="primaryDark"
              size="md"
              className="rounded-full px-6 text-xs font-bold"
            >
              {step === 1 ? 'Continue to Goal \u2192' : 'Go to Baseline Diagnostic \u2192'}
            </Button>
          </div>
        </div>
      </div>

      <div className="text-center text-[11px] text-slate-400 dark:text-slate-600 mt-8">
        &copy; {new Date().getFullYear()} TO DIRECT. Learn before you invest.
      </div>
    </div>
  );
}
