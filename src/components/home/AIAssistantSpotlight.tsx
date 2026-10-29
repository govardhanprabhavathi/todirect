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
        {/* Left Column: Radiant Aurora Mesh Card with Finn Preview (Matches Image 5) */}
        <div className="lg:col-span-6 order-2 lg:order-1">
          <div className="relative rounded-[28px] p-6 sm:p-10 bg-gradient-to-br from-[#71D7CE] via-[#86E4AE] to-[#F1E897] dark:from-[#064E3B] dark:via-[#0F766E] dark:to-[#1E3A8A] shadow-xl overflow-hidden border border-white/50 dark:border-white/10 transition-colors">
            {/* Ambient radiant circles */}
            <div className="absolute -top-10 -left-10 w-44 h-44 bg-white/40 dark:bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-teal-400/20 dark:bg-teal-500/20 rounded-full blur-2xl pointer-events-none" />

            {/* Inner Floating Pure White Finn Card */}
            <div className="relative z-10 bg-white dark:bg-[#0B0F19] rounded-2xl p-6 sm:p-7 shadow-lg border border-slate-100 dark:border-slate-800 transition-colors">
              {/* Header with avatar & status */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/20">
                    <Bot className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-semibold text-[#0A1629] dark:text-white">Finn</h4>
                      <span className="px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-[#2563FF] dark:text-blue-300 text-[10px] font-semibold tracking-wide uppercase">
                        AI Coach
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-normal">Grounded in SEBI-aligned syllabus</span>
                    </div>
                  </div>
                </div>

                <span className="text-xs font-semibold text-slate-400">
                  {currentSlideIndex + 1} of {slides.length}
                </span>
              </div>

              {/* Conversational dialogue preview */}
              <div className="mt-5 space-y-3.5">
                {/* User bubble */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] bg-slate-100/90 dark:bg-slate-800 text-[#0A1629] dark:text-white rounded-2xl rounded-tr-sm px-4 py-2.5 text-xs sm:text-sm font-medium">
                    {slide.dialogue.user}
                  </div>
                </div>

                {/* Finn response bubble */}
                <div className="flex items-start gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#2563FF] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 shadow-xs">
                    F
                  </div>
                  <div className="max-w-[88%] bg-blue-50/80 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 text-[#0A1629] dark:text-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-xs">
                    <div className="flex items-center gap-1.5 text-[#2563FF] dark:text-[#60A5FA] font-semibold text-[11px] mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Socratic Walkthrough
                    </div>
                    {slide.dialogue.finn}
                  </div>
                </div>
              </div>

              {/* Interactive Audio Waveform graphic */}
              <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-3 bg-[#2563FF] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-1 h-5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-1 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  <div className="w-1 h-6 bg-[#2563FF] rounded-full animate-bounce" style={{ animationDelay: '75ms' }} />
                  <div className="w-1 h-3 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '225ms' }} />
                  <span className="text-xs text-slate-400 ml-2 font-normal">Listening for reasoning...</span>
                </div>

                <Link href="/app/coach">
                  <Button size="sm" variant="ghost" className="text-xs text-[#2563FF] dark:text-[#60A5FA] font-semibold hover:bg-blue-50 dark:hover:bg-blue-950/40">
                    Open Finn Drawer &rarr;
                  </Button>
                </Link>
              </div>
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
            className="text-[11px] font-semibold text-[#475569] dark:text-slate-400 uppercase tracking-[0.14em] block"
          >
            AI LEARNING COMPANION
          </BlurIn>

          <BlurIn
            as="h2"
            delay={0.12}
            duration={0.8}
            blurAmount="10px"
            yOffset={16}
            className="text-3xl sm:text-5xl md:text-[54px] font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-[-0.03em] leading-[1.12]"
          >
            Meet Finn. <br />
            <span className="text-[#2563FF] dark:text-[#60A5FA]">The AI coach that teaches reasoning, not stock tips.</span>
          </BlurIn>

          <BlurIn
            as="p"
            delay={0.22}
            duration={0.8}
            blurAmount="8px"
            yOffset={12}
            className="text-base sm:text-lg font-normal text-[#475569] dark:text-[#94A3B8] leading-[1.65]"
          >
            Unlike generic AI chat windows that hallucinate get-rich-quick schemes, Finn is strictly grounded in proven financial foundations. Finn helps you understand compounding, evaluates your risk profile, and debiases retail FOMO.
          </BlurIn>

          {/* Current slide details card */}
          <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3 transition-colors">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#2563FF] dark:text-[#60A5FA]">
                Capability {currentSlideIndex + 1}
              </span>
              {/* Slide Nav Buttons [ ← ] [ → ] */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrev}
                  className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Previous capability"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Next capability"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-[#0A1629] dark:text-white tracking-[-0.015em]">{slide.title}</h3>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{slide.tagline}</p>
            <p className="text-sm font-normal text-[#475569] dark:text-slate-300 leading-relaxed">{slide.description}</p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/sign-in">
              <button
                type="button"
                className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-[#0A1629] dark:bg-white hover:bg-[#1E293B] dark:hover:bg-slate-100 text-white dark:text-[#0A1629] text-sm font-medium transition-all shadow-xs"
              >
                Start Learning with Finn &rarr;
              </button>
            </Link>
            <Link href="/how-it-works">
              <button
                type="button"
                className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-[#0A1629] dark:text-white text-sm font-medium transition-all"
              >
                How Guardrails Work
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
