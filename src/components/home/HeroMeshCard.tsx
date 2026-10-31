"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, XCircle, CheckCircle2 } from "lucide-react";
import { BlurIn } from "@/components/ui/BlurInText";

export function HeroMeshCard() {
  return (
    <section className="relative w-full pt-12 sm:pt-20 pb-24 sm:pb-36 overflow-hidden">
      {/* ─── LITTLE BOX GRID PATTERN (LAYERED BEHIND FLOWING ORBS) ─── */}
      <div
        aria-hidden="true"
        className="hero-box-grid absolute inset-0 pointer-events-none z-0 select-none"
      />

      {/* ─── CONTINUOUS FLOWING WIDE LIGHT BLUE BLURRY ORBS (HERO SECTION BOTTOM & SIDES) ─── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -bottom-20 pointer-events-none overflow-hidden z-0 select-none"
      >
        {/* Orb 1: Far Left Wing Glow - Extends beyond left screen edge */}
        <div
          className="animate-orb-float-4 absolute top-[28%] -left-[20%] sm:-left-[12%] md:-left-[6%] w-[580px] sm:w-[800px] md:w-[1050px] lg:w-[1200px] h-[450px] sm:h-[600px] md:h-[750px] rounded-full opacity-85 dark:opacity-45"
          style={{
            background:
              "radial-gradient(ellipse at 40% 50%, rgba(147, 197, 253, 0.95) 0%, rgba(96, 165, 250, 0.65) 38%, rgba(59, 130, 246, 0.28) 65%, transparent 80%)",
            filter: "blur(110px)",
          }}
        />

        {/* Orb 2: Flowing Light Blue - Left-Center Core */}
        <div
          className="animate-orb-float-1 absolute top-[36%] left-[8%] sm:left-[15%] w-[480px] sm:w-[680px] md:w-[850px] lg:w-[1000px] h-[440px] sm:h-[600px] md:h-[700px] rounded-full opacity-90 dark:opacity-50"
          style={{
            background:
              "radial-gradient(circle at 45% 45%, rgba(125, 211, 252, 0.95) 0%, rgba(56, 189, 248, 0.7) 40%, rgba(37, 99, 235, 0.25) 68%, transparent 82%)",
            filter: "blur(115px)",
          }}
        />

        {/* Orb 3: Massive Central Bottom Anchor Glow - Spans wide beneath switcher & card */}
        <div
          className="animate-orb-float-3 absolute top-[44%] left-1/2 -translate-x-1/2 w-[700px] sm:w-[1050px] md:w-[1350px] lg:w-[1550px] h-[400px] sm:h-[550px] md:h-[680px] rounded-full opacity-95 dark:opacity-55"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(186, 230, 253, 1) 0%, rgba(147, 197, 253, 0.75) 38%, rgba(96, 165, 250, 0.35) 68%, transparent 85%)",
            filter: "blur(120px)",
          }}
        />

        {/* Orb 4: Flowing Sky/Cyan Blue - Right-Center Core */}
        <div
          className="animate-orb-float-2 absolute top-[35%] right-[8%] sm:right-[15%] w-[480px] sm:w-[680px] md:w-[850px] lg:w-[1000px] h-[440px] sm:h-[600px] md:h-[700px] rounded-full opacity-90 dark:opacity-50"
          style={{
            background:
              "radial-gradient(circle at 55% 55%, rgba(186, 230, 253, 0.95) 0%, rgba(56, 189, 248, 0.7) 42%, rgba(37, 99, 235, 0.25) 70%, transparent 82%)",
            filter: "blur(115px)",
          }}
        />

        {/* Orb 5: Far Right Wing Glow - Extends beyond right screen edge */}
        <div
          className="animate-orb-float-5 absolute top-[26%] -right-[20%] sm:-right-[12%] md:-right-[6%] w-[580px] sm:w-[800px] md:w-[1050px] lg:w-[1200px] h-[450px] sm:h-[600px] md:h-[750px] rounded-full opacity-85 dark:opacity-45"
          style={{
            background:
              "radial-gradient(ellipse at 60% 50%, rgba(147, 197, 253, 0.95) 0%, rgba(96, 165, 250, 0.65) 38%, rgba(59, 130, 246, 0.28) 65%, transparent 80%)",
            filter: "blur(110px)",
          }}
        />

        {/* Continuous Soft Ambient Shimmer Base that dissolves smoothly into next section */}
        <div
          className="animate-pulse absolute -bottom-16 left-0 right-0 h-96 bg-gradient-to-t from-transparent via-[#93C5FD]/30 dark:via-blue-600/15 to-transparent blur-3xl pointer-events-none"
          style={{ animationDuration: "7s" }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ─── HERO TYPOGRAPHY WITH LUXURY BLUR-IN ANIMATION ─── */}
        <div className="text-center max-w-5xl mx-auto">
          <BlurIn
            as="h1"
            delay={0.05}
            duration={0.65}
            blurAmount="4px"
            yOffset={10}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-[-0.035em] leading-[1.12] mb-8 sm:mb-10"
          >
            Learn before <br />
            you Invest.
          </BlurIn>

          <BlurIn
            as="p"
            delay={0.16}
            duration={0.6}
            blurAmount="3px"
            yOffset={8}
            className="text-base sm:text-lg md:text-xl font-normal text-[#475569] dark:text-[#94A3B8] leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-9"
          >
            India&apos;s First Youth Focused Financial Investment Learning Platform.
          </BlurIn>

          {/* Dual Social Pills */}
          <BlurIn
            delay={0.25}
            duration={0.55}
            blurAmount="3px"
            yOffset={6}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-3.5"
          >
            <Link href="/sign-in" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-[#0A1629] dark:bg-white hover:bg-[#1E293B] dark:hover:bg-slate-100 text-white dark:text-[#0A1629] text-sm font-medium transition-all shadow-xs cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Sign up with Google</span>
              </button>
            </Link>

            <Link href="/sign-in" className="w-full sm:w-auto">
              <button
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-[#0A1629] dark:bg-white hover:bg-[#1E293B] dark:hover:bg-slate-100 text-white dark:text-[#0A1629] text-sm font-medium transition-all shadow-xs cursor-pointer"
              >
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 23 23">
                  <path fill="#f35325" d="M1 1h10v10H1z" />
                  <path fill="#81bc06" d="M12 1h10v10H12z" />
                  <path fill="#05a6f0" d="M1 12h10v10H1z" />
                  <path fill="#ffba08" d="M12 12h10v10H1z" />
                </svg>
                <span>Sign up with Microsoft</span>
              </button>
            </Link>
          </BlurIn>

          {/* Microcopy below auth pills */}
          <BlurIn
            as="p"
            delay={0.32}
            duration={0.5}
            blurAmount="2px"
            yOffset={4}
            className="text-xs font-normal text-[#64748B] dark:text-slate-400 mb-10 sm:mb-12"
          >
            <Link href="/sign-in" className="underline hover:text-[#0A1629] dark:hover:text-white transition-colors">
              Sign up with email
            </Link>{" "}
            • No credit card required
          </BlurIn>

        {/* ─── TWO PERSPECTIVE COMPARISON CARDS ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 max-w-5xl mx-auto text-left">
          {/* Card 1: Traditional Way */}
          <BlurIn
            delay={0.1}
            duration={0.8}
            blurAmount="8px"
            className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-white/90 via-slate-50/80 to-blue-50/40 dark:from-[#0B152A]/90 dark:via-[#0E1D3B]/80 dark:to-[#081022]/90 backdrop-blur-md border border-slate-200/90 dark:border-blue-900/40 shadow-sm flex flex-col justify-between transition-all hover:border-slate-300 dark:hover:border-blue-700"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl sm:text-2xl font-semibold text-[#0A1629] dark:text-white tracking-[-0.02em]">
                  Traditional Way
                </h3>
                <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                  High Risk & Confusion
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 leading-relaxed mb-5">
                Unsure where to start, confused by jargon, and forced to risk real money.
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-[#475569] dark:text-slate-300">
                <li className="flex items-center gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span><strong>Where to start?</strong> Lost in scattered advice & noise</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span><strong>Hard to learn:</strong> Complex jargon & dry theory</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span><strong>How to invest?</strong> Blind trial & error with real savings</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span><strong>Market hype:</strong> Chasing unverified tips & FOMO</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                  <span><strong>High anxiety:</strong> Constant fear of losing capital</span>
                </li>
              </ul>
            </div>

            <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Outcome: Costly mistakes & doubt</span>
              <span className="font-semibold text-rose-600 dark:text-rose-400">High Risk</span>
            </div>
          </BlurIn>

          {/* Card 2: TO DIRECT Way (Blue Premium Gradient) */}
          <BlurIn
            delay={0.2}
            duration={0.8}
            blurAmount="8px"
            className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-[#F0F7FF] via-[#E2F0FE] to-[#D5E9FE] dark:from-[#0E1F42] dark:via-[#132A5C] dark:to-[#091530] backdrop-blur-md border-2 border-[#2563FF]/40 dark:border-[#38BDF8]/50 shadow-xl shadow-blue-500/10 flex flex-col justify-between transition-all hover:border-[#2563FF]/70 relative overflow-hidden"
          >
            {/* Ambient Accent Glow */}
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-blue-500/15 blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl sm:text-2xl font-semibold text-[#0A1629] dark:text-white tracking-[-0.02em]">
                  TO DIRECT Way
                </h3>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#2563FF] text-white">
                  Recommended
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-300 leading-relaxed mb-5">
                A simple youth roadmap to learn first and practice with zero risk.
              </p>

              <ul className="space-y-3 text-xs sm:text-sm text-[#0A1629] dark:text-slate-200">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2563FF] dark:text-blue-400 shrink-0" />
                  <span><strong>Personalised learning:</strong> Tailored to your pace & goals</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2563FF] dark:text-blue-400 shrink-0" />
                  <span><strong>Simple lectures:</strong> Bite-sized, visual, and jargon-free</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2563FF] dark:text-blue-400 shrink-0" />
                  <span><strong>Practical learning:</strong> Safe ₹10,000 practice sandbox</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2563FF] dark:text-blue-400 shrink-0" />
                  <span><strong>Gamified experience:</strong> Quizzes, streaks, and badges</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2563FF] dark:text-blue-400 shrink-0" />
                  <span><strong>Builds confidence:</strong> Real clarity before investing</span>
                </li>
              </ul>
            </div>

            <div className="pt-5 mt-5 border-t border-slate-100 dark:border-slate-800/80 relative z-10">
              <Link
                href="/curriculum"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#0A1629] dark:bg-white hover:bg-[#1E293B] dark:hover:bg-slate-100 text-white dark:text-[#0A1629] text-xs sm:text-sm font-semibold transition-all shadow-xs group"
              >
                <span>Start Learning Free</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </BlurIn>
        </div>
      </div>
    </div>
  </section>
  );
}
