"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, ArrowRight, Sparkles } from "lucide-react";
import { InteractiveGoldCoin } from "./InteractiveGoldCoin";
import { BlurIn } from "@/components/ui/BlurInText";

export function PreFooterCTA() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Borderless Seamless Container */}
      <div className="relative p-4 sm:p-8 lg:p-12 border-0 shadow-none overflow-visible transition-colors">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: 3D Interactive Hover-Responsive Gold Coin */}
          <div className="lg:col-span-5 xl:col-span-5 flex items-center justify-center lg:justify-start">
            <InteractiveGoldCoin />
          </div>

          {/* Right Column: Text Content & Actions */}
          <div className="lg:col-span-7 xl:col-span-7 text-left space-y-6">
            {/* Eyebrow Tag */}
            <BlurIn
              delay={0.05}
              duration={0.7}
              blurAmount="6px"
              className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
              <span>Zero cost, purely educational</span>
            </BlurIn>

            {/* Display Headline */}
            <BlurIn
              as="h2"
              delay={0.12}
              duration={0.8}
              blurAmount="10px"
              yOffset={16}
              className="text-3xl sm:text-5xl md:text-[50px] font-semibold text-slate-900 dark:text-slate-100 tracking-tight leading-[1.15]"
            >
              Build financial confidence <br />
              before you invest a single rupee.
            </BlurIn>

            {/* Description */}
            <BlurIn
              as="p"
              delay={0.22}
              duration={0.8}
              blurAmount="8px"
              yOffset={12}
              className="text-base sm:text-lg font-normal text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl"
            >
              Join thousands of students and young professionals who learn the mechanics of wealth, asset allocation, and market psychology risk-free.
            </BlurIn>

            {/* Action Controls */}
            <BlurIn
              delay={0.32}
              duration={0.75}
              blurAmount="8px"
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 pt-2"
            >
              <Link href="/sign-in" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-slate-900 dark:bg-slate-100 hover:bg-slate-800 dark:hover:bg-slate-200 text-white dark:text-slate-900 text-sm font-medium transition-colors shadow-xs cursor-pointer group"
                >
                  <span>Get started for free</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              <Link href="/curriculum" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#111620] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 text-sm font-medium transition-colors shadow-2xs cursor-pointer"
                >
                  Explore 7-topic syllabus
                </button>
              </Link>
            </BlurIn>

            {/* Trust Points */}
            <BlurIn
              delay={0.42}
              duration={0.7}
              blurAmount="6px"
              className="pt-2 flex flex-wrap items-center justify-start gap-x-6 gap-y-2 text-xs font-medium text-slate-500 dark:text-slate-400"
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
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Zero speculative stock tips</span>
              </span>
            </BlurIn>
          </div>
        </div>
      </div>
    </section>
  );
}
