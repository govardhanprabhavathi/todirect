"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { InteractiveGoldCoin } from "./InteractiveGoldCoin";
import { BlurIn } from "@/components/ui/BlurInText";

export function PreFooterCTA() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Borderless Seamless Container (Zero borders) */}
      <div className="relative p-4 sm:p-8 lg:p-12 border-0 shadow-none overflow-visible transition-colors">
        {/* Soft Ambient Warm Glow Behind Coin Area on Right */}
        <div className="absolute top-1/2 -translate-y-1/2 -right-10 w-96 h-96 bg-amber-400/15 dark:bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-16 left-1/4 w-72 h-72 bg-blue-100/40 dark:bg-blue-900/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Left-Aligned Text Content & Actions */}
          <div className="lg:col-span-7 xl:col-span-7 text-left space-y-6">
            {/* Eyebrow Pill */}
            <BlurIn
              delay={0.05}
              duration={0.7}
              blurAmount="6px"
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/60 text-[#475569] dark:text-slate-300 text-xs font-semibold tracking-wider uppercase"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>ZERO COST • 100% EDUCATIONAL</span>
            </BlurIn>

            {/* Display Headline */}
            <BlurIn
              as="h2"
              delay={0.12}
              duration={0.8}
              blurAmount="10px"
              yOffset={16}
              className="text-3xl sm:text-5xl md:text-[52px] font-semibold text-[#0A1629] dark:text-white tracking-[-0.03em] leading-[1.12]"
            >
              Build financial confidence <br />
              <span className="text-[#2563FF] dark:text-[#60A5FA]">
                before you invest a single rupee.
              </span>
            </BlurIn>

            {/* Description */}
            <BlurIn
              as="p"
              delay={0.22}
              duration={0.8}
              blurAmount="8px"
              yOffset={12}
              className="text-base sm:text-lg font-normal text-[#475569] dark:text-slate-300 leading-relaxed max-w-xl"
            >
              Join thousands of students and young professionals who learn the mechanics of wealth, asset allocation, and market psychology risk-free.
            </BlurIn>

            {/* Action Buttons (Left-Aligned) */}
            <BlurIn
              delay={0.32}
              duration={0.75}
              blurAmount="8px"
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3.5 pt-2"
            >
              <Link href="/sign-in" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#0A1629] dark:bg-white hover:bg-[#1E293B] dark:hover:bg-slate-100 text-white dark:text-[#0A1629] text-sm font-medium transition-all shadow-xs cursor-pointer group"
                >
                  <span>Get started for free</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              <Link href="/curriculum" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-7 py-3.5 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-[#111625] hover:bg-slate-50 dark:hover:bg-slate-800 text-[#0A1629] dark:text-white text-sm font-medium transition-all shadow-2xs cursor-pointer"
                >
                  Explore 7-Topic Syllabus
                </button>
              </Link>
            </BlurIn>

            {/* Trust Badges (Left-Aligned) */}
            <BlurIn
              delay={0.42}
              duration={0.7}
              blurAmount="6px"
              className="pt-2 flex flex-wrap items-center justify-start gap-x-6 gap-y-2.5 text-xs font-medium text-slate-600 dark:text-slate-400"
            >
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>No credit card required</span>
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>₹10,000 virtual balance included</span>
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Zero speculative stock tips</span>
              </span>
            </BlurIn>
          </div>

          {/* Right Column: 3D Interactive Hover-Responsive Gold Coin */}
          <div className="lg:col-span-5 xl:col-span-5 flex items-center justify-center lg:justify-end">
            <InteractiveGoldCoin />
          </div>
        </div>
      </div>
    </section>
  );
}
