'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, Sliders, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { BlurIn } from '@/components/ui/BlurInText';

interface FeatureItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  href: string;
  badge: string;
}

const features: FeatureItem[] = [
  {
    id: 'curriculum',
    title: '7-Topic Progressive Curriculum',
    subtitle: 'From financial curiosity to certified understanding',
    description: 'Master money essentials, compounding mathematics, inflation hedging, and asset allocation across 28 bite-sized, verified modules before risking a single real rupee.',
    href: '/curriculum',
    badge: 'Curriculum'
  },
  {
    id: 'evidence',
    title: 'Misconception Detection Engine',
    subtitle: 'Track genuine comprehension over lucky guesses',
    description: 'Our evidence tracker evaluates your reasoning, detects recurring cognitive biases (like high yield = high guarantee), and prescribes targeted refresher drills.',
    href: '/how-it-works',
    badge: 'Intelligence'
  },
  {
    id: 'portfolio',
    title: '₹10,000 Realistic Practice Sandbox',
    subtitle: 'Safe hands-on simulation with real market mechanics',
    description: 'Allocate a ₹10,000 virtual balance across index funds, bluechips, sovereign gold bonds, and fixed deposits with live concentration risk alerts.',
    href: '/practice',
    badge: 'Sandbox'
  },
  {
    id: 'coach',
    title: 'Socratic AI Tutor Finn',
    subtitle: '24/7 personal guide trained strictly on verified finance syllabus',
    description: 'Finn provides instant conceptual clarity, debiases common retail investor traps, and explains the "why" behind every quiz question—with zero speculative stock picks.',
    href: '/how-it-works',
    badge: 'AI Coach'
  }
];

export function FeatureAccordion() {
  const [activeId, setActiveId] = useState<string>('portfolio');
  const [allocation, setAllocation] = useState({ nifty: 50, gold: 30, fd: 20 });

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Eyebrow & Title */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <BlurIn
          as="span"
          delay={0.05}
          duration={0.7}
          blurAmount="6px"
          className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-3"
        >
          Pedagogical architecture
        </BlurIn>

        <BlurIn
          as="h2"
          delay={0.12}
          duration={0.8}
          blurAmount="10px"
          yOffset={16}
          className="text-3xl sm:text-5xl md:text-[50px] font-semibold text-slate-900 dark:text-slate-100 tracking-tight leading-[1.15] mb-4"
        >
          A complete learning system. <br className="hidden sm:inline" />
          Built to reward true understanding.
        </BlurIn>

        <BlurIn
          as="p"
          delay={0.22}
          duration={0.8}
          blurAmount="8px"
          yOffset={12}
          className="text-base sm:text-lg font-normal text-slate-600 dark:text-slate-400 leading-relaxed"
        >
          Everything you need to build financial literacy and develop disciplined, long-term decision making.
        </BlurIn>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Interactive Accordion */}
        <div className="lg:col-span-6 space-y-3">
          {features.map((feature) => {
            const isActive = activeId === feature.id;
            return (
              <div
                key={feature.id}
                onClick={() => setActiveId(feature.id)}
                className={`cursor-pointer rounded-xl border transition-colors p-5 ${
                  isActive
                    ? 'bg-white dark:bg-[#111620] border-slate-300 dark:border-slate-700 shadow-xs'
                    : 'bg-slate-50/60 dark:bg-[#111620]/60 hover:bg-white dark:hover:bg-[#111620] border-slate-200/80 dark:border-slate-800/80'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-block w-2 h-2 rounded-full transition-colors ${
                        isActive ? 'bg-[#2563EB]' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    />
                    <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                      {feature.title}
                    </h3>
                  </div>
                  <Link
                    href={feature.href}
                    onClick={(e) => e.stopPropagation()}
                    className={`inline-flex items-center justify-center w-7 h-7 rounded-lg border transition-colors ${
                      isActive
                        ? 'border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100'
                        : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                    }`}
                    aria-label={`Learn more about ${feature.title}`}
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {isActive && (
                  <div className="mt-3.5 pt-3.5 border-t border-slate-100 dark:border-slate-800/80">
                    <p className="text-xs font-medium text-[#2563EB] dark:text-blue-400 mb-1">{feature.subtitle}</p>
                    <p className="text-xs sm:text-sm font-normal text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
                    <div className="mt-3.5 flex items-center gap-2">
                      <Link href={feature.href}>
                        <Button variant="outline" size="sm" className="rounded-lg text-xs font-medium bg-white dark:bg-[#111620] text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700">
                          Explore {feature.badge.toLowerCase()} &rarr;
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column: Clean Interactive Sandbox Preview */}
        <div className="lg:col-span-6">
          <div className="rounded-2xl p-6 sm:p-7 bg-white dark:bg-[#111620] border border-slate-200/80 dark:border-slate-800/80 shadow-xs transition-colors">
            {/* Header inside widget */}
            <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-base font-semibold text-slate-900 dark:text-slate-100">Virtual Portfolio Sandbox</h4>
                  <p className="text-xs font-normal text-slate-500 dark:text-slate-400">Live ₹10,000 Allocation Preview</p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-xs font-medium border border-emerald-200 dark:border-emerald-900/50">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Balanced
              </span>
            </div>

            {/* Sandbox Interactive Allocation Sliders */}
            <div className="mt-5 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                    Nifty 50 Index Fund
                  </span>
                  <span className="font-medium text-slate-900 dark:text-slate-100 tabular-nums">
                    ₹{((10000 * allocation.nifty) / 100).toLocaleString('en-IN')} ({allocation.nifty}%)
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="80"
                  value={allocation.nifty}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    const rem = 100 - val;
                    setAllocation({
                      nifty: val,
                      gold: Math.round(rem * 0.6),
                      fd: Math.round(rem * 0.4)
                    });
                  }}
                  className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#2563EB]"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    Sovereign Gold Bonds
                  </span>
                  <span className="font-medium text-slate-900 dark:text-slate-100 tabular-nums">
                    ₹{((10000 * allocation.gold) / 100).toLocaleString('en-IN')} ({allocation.gold}%)
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-lg transition-all" style={{ width: `${allocation.gold}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    Liquid Fixed Deposit
                  </span>
                  <span className="font-medium text-slate-900 dark:text-slate-100 tabular-nums">
                    ₹{((10000 * allocation.fd) / 100).toLocaleString('en-IN')} ({allocation.fd}%)
                  </span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-lg transition-all" style={{ width: `${allocation.fd}%` }} />
                </div>
              </div>
            </div>

            {/* Risk Assessment Box */}
            <div className="mt-5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
              <div className="text-xs">
                <p className="font-medium text-slate-900 dark:text-slate-100">Prudent diversification metric</p>
                <p className="text-slate-500 dark:text-slate-400 font-normal mt-0.5">
                  Equity: {allocation.nifty}% | Defensive: {allocation.gold + allocation.fd}%. Complies with risk guardrails.
                </p>
              </div>
            </div>

            {/* Bottom Quick Action */}
            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <div className="text-xs text-slate-500 dark:text-slate-400">
                Virtual capital: <span className="font-medium text-slate-900 dark:text-slate-100 tabular-nums">₹10,000</span>
              </div>
              <Link href="/practice">
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 text-xs font-medium transition-colors cursor-pointer"
                >
                  Launch full sandbox &rarr;
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
