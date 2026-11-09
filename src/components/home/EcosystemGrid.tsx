'use client';

import React from 'react';
import Link from 'next/link';
import { GraduationCap, Briefcase, TrendingUp, Compass, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { BlurIn } from '@/components/ui/BlurInText';

interface AudienceTrack {
  id: string;
  icon: any;
  title: string;
  subtitle: string;
  benefits: string[];
  badge: string;
}

const tracks: AudienceTrack[] = [
  {
    id: 'students',
    icon: GraduationCap,
    title: 'College Students',
    subtitle: 'From stipend budgeting to debt-free graduation',
    badge: 'Campus Ready',
    benefits: [
      'Master the 50/30/20 allocation with modest monthly allowances',
      'Understand how credit score works before applying for cards',
      'Learn the Rule of 72 and starting compounding early'
    ]
  },
  {
    id: 'early-career',
    icon: Briefcase,
    title: 'First-Job Earners',
    subtitle: 'Decode your CTC, salary slips, and emergency funds',
    badge: 'Young Pros',
    benefits: [
      'De-mystify EPF, NPS, tax regimes, and Section 80 deductions',
      'Build a non-negotiable 6-month liquid emergency buffer',
      'Automate monthly SIPs without impacting lifestyle flexibility'
    ]
  },
  {
    id: 'retail-beginners',
    icon: TrendingUp,
    title: 'Aspiring Investors',
    subtitle: 'Move past social media hype to structured evidence',
    badge: 'Evidence Driven',
    benefits: [
      'Practice with ₹10,000 virtual balance before risking savings',
      'Understand market cycles, volatility, and diversification',
      'Avoid 10 common retail investor psychological traps'
    ]
  },
  {
    id: 'curious-minds',
    icon: Compass,
    title: 'Lifelong Learners',
    subtitle: 'Solidify financial foundations at your own pace',
    badge: 'Self Paced',
    benefits: [
      'Zero pressure, zero aggressive sales pitches or brokers',
      'Ask Finn conceptual questions with zero fear of judgment',
      'Track certified evidence of comprehension and earn skill badges'
    ]
  }
];

export function EcosystemGrid() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <BlurIn
          as="span"
          delay={0.05}
          duration={0.7}
          blurAmount="6px"
          className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-3"
        >
          Tailored for every stage
        </BlurIn>

        <BlurIn
          as="h2"
          delay={0.12}
          duration={0.8}
          blurAmount="10px"
          yOffset={16}
          className="text-3xl sm:text-5xl md:text-[50px] font-semibold text-slate-900 dark:text-slate-100 tracking-tight leading-[1.15] mb-4"
        >
          Built for people who want <br />
          <span className="text-[#2563EB] dark:text-[#3B82F6]">financial independence, not speculation.</span>
        </BlurIn>

        <BlurIn
          as="p"
          delay={0.22}
          duration={0.8}
          blurAmount="8px"
          yOffset={12}
          className="text-base sm:text-lg font-normal text-slate-600 dark:text-slate-400 leading-relaxed"
        >
          Whether you have ₹500 in pocket money or your first full-time paycheck, TO DIRECT meets you where you are.
        </BlurIn>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {tracks.map((track, idx) => {
          const Icon = track.icon;
          return (
            <BlurIn
              key={track.id}
              delay={0.08 * idx}
              duration={0.75}
              blurAmount="8px"
              className="h-full"
            >
              <div className="bg-white dark:bg-[#111620] rounded-xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-colors flex flex-col justify-between group h-full">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center font-bold">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {track.badge}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                    {track.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-normal">
                    {track.subtitle}
                  </p>

                  <ul className="mt-5 space-y-2.5">
                    {track.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                        <ShieldCheck className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Link
                    href={`/onboarding?track=${track.id}`}
                    className="w-full text-xs font-medium text-[#2563EB] dark:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800 py-2 rounded-lg transition-colors flex items-center justify-center gap-1 group/btn cursor-pointer"
                  >
                    <span>Get started</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            </BlurIn>
          );
        })}
      </div>
    </section>
  );
}
