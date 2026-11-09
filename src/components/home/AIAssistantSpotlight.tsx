'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, MessageSquare, Bot, ChevronLeft, ChevronRight, HelpCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { BlurIn } from '@/components/ui/BlurInText';

interface SpotlightSlide {
  id: string;
  title: string;
  tagline: string;
  description: string;
  dialogue: {
    user: string;
    finn: string;
  };
}

const slides: SpotlightSlide[] = [
  {
    id: 'socratic',
    title: 'Socratic Concept Checking',
    tagline: 'Guides your thinking rather than giving away quick answers',
    description: 'Finn asks probing questions that lead you to uncover how inflation erodes cash and why asset allocation protects your purchasing power over decades.',
    dialogue: {
      user: 'Should I put all my savings into an 8% fixed deposit?',
      finn: 'An 8% FD is steady, but if annual retail inflation is 6%, what is your real purchasing power growth after taxes? Let us calculate the true net yield together.'
    }
  },
  {
    id: 'debiasing',
    title: 'Misconception Debiasing',
    tagline: 'Catches dangerous mental shortcuts before they cost you capital',
    description: 'Most beginners confuse high nominal dividend yields with guaranteed safety, or assume a ₹50 stock is cheaper than a ₹2,000 stock. Finn flags these biases in real time.',
    dialogue: {
      user: 'Stock A is only ₹40, so it has more room to grow than Stock B at ₹3,000, right?',
      finn: 'Careful! Share price alone tells you nothing about company valuation or room to grow. You need to look at market capitalization and earnings capacity.'
    }
  },
  {
    id: 'guardrails',
    title: 'Strict Educational Guardrails',
    tagline: 'Zero speculative tips, zero pump-and-dump noise',
    description: 'Finn is rigorously constrained to academic financial concepts. You will never get speculative stock picks or unrealistic return claims—only sound, timeless financial literacy.',
    dialogue: {
      user: 'Which cryptocurrency or penny stock will 10x next week?',
      finn: 'I do not predict market prices or recommend specific speculative bets. I can teach you the mechanics of volatility, risk-adjusted returns, and emergency buffers instead.'
    }
  }
];

export function AIAssistantSpotlight() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slide = slides[currentSlideIndex];

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Clean Socratic Coach Card Preview */}
        <div className="lg:col-span-6 order-2 lg:order-1">
          <div className="rounded-2xl p-6 sm:p-7 bg-white dark:bg-[#111620] border border-slate-200/80 dark:border-slate-800/80 shadow-xs transition-colors">
            {/* Header with avatar & status */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">Finn</h4>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[11px] font-medium">
                      Socratic coach
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">Grounded in SEBI-aligned syllabus</span>
                  </div>
                </div>
              </div>

              <span className="text-xs font-medium text-slate-400 tabular-nums">
                {currentSlideIndex + 1} of {slides.length}
              </span>
            </div>

            {/* Conversational dialogue preview */}
            <div className="mt-5 space-y-3.5">
              {/* User bubble */}
              <div className="flex justify-end">
                <div className="max-w-[85%] bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-xl rounded-tr-sm px-4 py-2.5 text-xs sm:text-sm font-normal">
                  {slide.dialogue.user}
                </div>
              </div>

              {/* Finn response bubble */}
              <div className="flex items-start gap-2.5">
                <div className="w-7 h-7 rounded-full bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 flex items-center justify-center text-xs font-medium shrink-0 mt-0.5">
                  F
                </div>
                <div className="max-w-[88%] bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 text-slate-800 dark:text-slate-200 rounded-xl rounded-tl-sm px-4 py-3 text-xs sm:text-sm leading-relaxed">
                  <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-medium text-xs mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Socratic counter-probe
                  </div>
                  {slide.dialogue.finn}
                </div>
              </div>
            </div>

            {/* Quick status bar */}
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">
                Zero unsolicited stock picks • Pure reasoning
              </span>

              <Link href="/app/coach">
                <Button size="sm" variant="ghost" className="text-xs text-blue-600 dark:text-blue-400 font-medium rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                  Open Finn drawer &rarr;
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column: Copy & Interactive Slides Controls */}
        <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
          <BlurIn
            as="span"
            delay={0.05}
            duration={0.7}
            blurAmount="6px"
            className="text-xs font-medium text-slate-500 dark:text-slate-400 block"
          >
            Socratic AI coach
          </BlurIn>

          <BlurIn
            as="h2"
            delay={0.12}
            duration={0.8}
            blurAmount="10px"
            yOffset={16}
            className="text-3xl sm:text-5xl md:text-[50px] font-semibold text-slate-900 dark:text-slate-100 tracking-tight leading-[1.15]"
          >
            Meet Finn. <br />
            The coach that teaches reasoning, not stock tips.
          </BlurIn>

          <BlurIn
            as="p"
            delay={0.22}
            duration={0.8}
            blurAmount="8px"
            yOffset={12}
            className="text-base sm:text-lg font-normal text-slate-600 dark:text-slate-400 leading-relaxed"
          >
            Unlike generic AI chat windows that generate speculative claims, Finn is strictly grounded in proven financial foundations. Finn helps you understand compounding, evaluates your risk profile, and debiases retail FOMO.
          </BlurIn>

          {/* Current slide details card */}
          <div className="bg-white dark:bg-[#111620] rounded-xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-2.5 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Capability {currentSlideIndex + 1}
              </span>
              {/* Slide Nav Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Previous capability"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-7 h-7 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  aria-label="Next capability"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 tracking-tight">{slide.title}</h3>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{slide.tagline}</p>
            <p className="text-xs sm:text-sm font-normal text-slate-600 dark:text-slate-400 leading-relaxed">{slide.description}</p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link href="/sign-in">
              <button
                type="button"
                className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 text-xs sm:text-sm font-medium transition-colors shadow-xs cursor-pointer"
              >
                Start learning with Finn &rarr;
              </button>
            </Link>
            <Link href="/how-it-works">
              <button
                type="button"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111620] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-medium transition-colors cursor-pointer"
              >
                How guardrails work
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
