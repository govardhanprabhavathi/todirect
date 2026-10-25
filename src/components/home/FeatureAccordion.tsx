'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, Sliders, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';

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
        <span className="text-[11px] font-semibold text-[#475569] dark:text-slate-400 uppercase tracking-[0.14em] block mb-3">
          THE TO DIRECT ARCHITECTURE
        </span>
        <h2 className="text-3xl sm:text-5xl md:text-[54px] font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-[-0.03em] leading-[1.12] mb-4">
          A complete learning system. <br className="hidden sm:inline" />
          <span className="text-[#2563FF] dark:text-[#60A5FA]">Built to reward true understanding.</span>
        </h2>
        <p className="text-base sm:text-lg font-normal text-[#475569] dark:text-[#94A3B8] leading-[1.65]">
          Everything you need to build unbreakable financial literacy and develop smart, disciplined decision-making.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Interactive Accordion */}
        <div className="lg:col-span-6 space-y-3">
          {features.map((feature) => {
            const isActive = activeId === feature.id;
            return (
              <div
                key={feature.id}
                onClick={() => setActiveId(feature.id)}
                className={`cursor-pointer rounded-2xl border transition-all duration-300 p-6 ${
                  isActive
                    ? 'bg-white dark:bg-[#111625] border-blue-200 dark:border-blue-900/60 shadow-md ring-1 ring-blue-500/10'
                    : 'bg-white/60 dark:bg-[#111625]/60 hover:bg-white dark:hover:bg-[#111625] border-slate-200/70 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-block w-2 h-2 rounded-full transition-colors ${
                        isActive ? 'bg-[#2563FF] dark:bg-[#60A5FA]' : 'bg-slate-300 dark:bg-slate-700'
                      }`}
                    />
                    <h3 className="text-lg sm:text-xl font-semibold text-[#0A1629] dark:text-white tracking-[-0.015em]">
                      {feature.title}
                    </h3>
                  </div>
                  <Link
                    href={feature.href}
                    onClick={(e) => e.stopPropagation()}
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full border transition-all ${
                      isActive
                        ? 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/60 text-[#2563FF] dark:text-blue-300 hover:bg-blue-100'
                        : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                    }`}
                    aria-label={`Learn more about ${feature.title}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>

                {isActive && (
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 animate-fadeIn">
                    <p className="text-xs font-semibold text-[#2563FF] dark:text-[#60A5FA] mb-1.5">{feature.subtitle}</p>
                    <p className="text-sm font-normal text-[#475569] dark:text-slate-300 leading-relaxed">{feature.description}</p>
                    <div className="mt-4 flex items-center gap-2">
                      <Link href={feature.href}>
                        <Button variant="outline" size="sm" className="rounded-full text-xs font-semibold dark:bg-slate-900 dark:border-slate-700 dark:text-white">
                          Explore {feature.badge} &rarr;
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Column: Radiant Gradient Mesh Card Preview */}
        <div className="lg:col-span-6">
          <div className="relative rounded-[28px] p-6 sm:p-8 bg-gradient-to-br from-[#72B3FD] via-[#94C5FF] to-[#D2E4FF] dark:from-[#1E3A8A] dark:via-[#1D4ED8] dark:to-[#0284C7] shadow-xl overflow-hidden border border-white/40 dark:border-white/10 transition-colors">
            {/* Ambient radiant glow elements */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/30 dark:bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-400/20 dark:bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />

            {/* Inner Floating Card */}
            <div className="relative z-10 bg-white dark:bg-[#0B0F19] rounded-2xl p-6 sm:p-7 shadow-lg border border-slate-100 dark:border-slate-800 transition-colors">
              {/* Header inside widget */}
              <div className="flex items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-[#2563FF] dark:text-blue-300 flex items-center justify-center font-bold">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-[#0A1629] dark:text-white">Virtual Portfolio Sandbox</h4>
                    <p className="text-xs font-normal text-slate-500 dark:text-slate-400">Live ₹10,000 Allocation Preview</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-100 dark:border-emerald-900/50">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Balanced
                </span>
              </div>

              {/* Sandbox Interactive Allocation Sliders */}
              <div className="mt-5 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#2563FF]" />
                      Nifty 50 Index Fund
                    </span>
                    <span className="font-semibold text-[#0A1629] dark:text-white">
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
                    className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#2563FF]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                      Sovereign Gold Bonds
                    </span>
                    <span className="font-semibold text-[#0A1629] dark:text-white">
                      ₹{((10000 * allocation.gold) / 100).toLocaleString('en-IN')} ({allocation.gold}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                    <div className="h-full bg-amber-400 rounded-lg transition-all" style={{ width: `${allocation.gold}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      Liquid Fixed Deposit
                    </span>
                    <span className="font-semibold text-[#0A1629] dark:text-white">
                      ₹{((10000 * allocation.fd) / 100).toLocaleString('en-IN')} ({allocation.fd}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-lg transition-all" style={{ width: `${allocation.fd}%` }} />
                  </div>
                </div>
              </div>

              {/* Risk Assessment Box */}
              <div className="mt-5 p-3.5 rounded-xl bg-slate-50 dark:bg-[#161D30] border border-slate-100 dark:border-slate-800 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-[#2563FF] shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p className="font-semibold text-[#0A1629] dark:text-white">Prudent Diversification Metric</p>
                  <p className="text-slate-500 dark:text-slate-400 font-normal mt-0.5">
                    Equity: {allocation.nifty}% | Defensive: {allocation.gold + allocation.fd}%. Complies with beginner safety guardrails.
                  </p>
                </div>
              </div>

              {/* Bottom Quick Action */}
              <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  Virtual Capital: <span className="font-semibold text-[#0A1629] dark:text-white">₹10,000</span>
                </div>
                <Link href="/practice">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[#0A1629] dark:bg-white hover:bg-[#1E293B] dark:hover:bg-slate-100 text-white dark:text-[#0A1629] text-xs font-medium transition-all"
                  >
                    Launch Full Sandbox &rarr;
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
