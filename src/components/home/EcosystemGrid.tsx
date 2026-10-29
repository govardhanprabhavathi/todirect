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
      {/* Header with Blur-In Animation */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <BlurIn
          as="span"
          delay={0.05}
          duration={0.7}
          blurAmount="6px"
          className="text-[11px] font-semibold text-[#475569] dark:text-slate-400 uppercase tracking-[0.14em] block mb-3"
        >
          TAILORED FOR EVERY STAGE
        </BlurIn>

        <BlurIn
          as="h2"
          delay={0.12}
          duration={0.8}
          blurAmount="10px"
          yOffset={16}
          className="text-3xl sm:text-5xl md:text-[54px] font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-[-0.03em] leading-[1.12] mb-4"
        >
          Built for people who want <br />
          <span className="text-[#2563FF] dark:text-[#60A5FA]">financial independence, not speculation.</span>
        </BlurIn>

        <BlurIn
          as="p"
          delay={0.22}
          duration={0.8}
          blurAmount="8px"
          yOffset={12}
          className="text-base sm:text-lg font-normal text-[#475569] dark:text-[#94A3B8] leading-[1.65]"
        >
          Whether you have ₹500 in pocket money or your first full-time paycheck, TO DIRECT meets you where you are.
        </BlurIn>
      </div>

      {/* 4 Cards Grid with Staggered Blur-In */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <div className="bg-white dark:bg-[#111625] rounded-3xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 flex flex-col justify-between group h-full">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-[#2563FF] dark:text-blue-400 flex items-center justify-center font-bold group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {track.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-[#0A1629] dark:text-white tracking-[-0.015em] group-hover:text-[#2563FF] dark:group-hover:text-[#60A5FA] transition-colors">
                    {track.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-normal">
                    {track.subtitle}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {track.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[#475569] dark:text-slate-300 leading-relaxed">
                        <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800">
                  <Link
                    href={`/onboarding?track=${track.id}`}
                    className="w-full text-xs font-semibold text-[#2563FF] dark:text-[#60A5FA] hover:bg-blue-50 dark:hover:bg-blue-950/40 py-2.5 rounded-full transition-colors flex items-center justify-center gap-1 group/btn cursor-pointer"
                  >
                    <span>Get Started</span>
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
