"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Compass, Sparkles, Shield, Wallet, Check, TrendingUp, PieChart, Sliders, ArrowUpRight, XCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HeroMeshCard() {
  const [activeTab, setActiveTab] = useState<number>(0);

  // Interactive controls for Tab 0 (Money & Cash Flow)
  const [monthlyIncome, setMonthlyIncome] = useState<number>(50000);

  // Interactive controls for Tab 1 (Compounding & Growth)
  const [compoundRate, setCompoundRate] = useState<number>(12);

  // Interactive controls for Tab 2 (Risk & Diversification)
  const [riskProfile, setRiskProfile] = useState<"balanced" | "growth" | "conservative">("balanced");

  const tabs = [
    {
      id: 0,
      icon: Compass,
      label: "Money & Cash Flow",
      tag: "Foundations",
      heading: "Master cash flow mechanics before risking real capital",
      description:
        "Giving you complete conceptual clarity and practical reasoning, TO DIRECT is the easiest and most dependable way to build lifelong financial literacy.",
      link: "/curriculum#money",
    },
    {
      id: 1,
      icon: Sparkles,
      label: "Compounding & Growth",
      tag: "Investing Engine",
      heading: "Understand exponential compounding with zero jargon",
      description:
        "Explore how time horizon and systematic discipline turn small consistent surpluses into financial freedom, backed by transparent mathematical proof.",
      link: "/curriculum#investments",
    },
    {
      id: 2,
      icon: Shield,
      label: "Risk & Diversification",
      tag: "Capital Preservation",
      heading: "Spread risk across uncorrelated assets safely",
      description:
        "Learn why diversification is the only free lunch in finance. Differentiate daily market volatility from permanent loss of capital.",
      link: "/curriculum#risk",
    },
    {
      id: 3,
      icon: Wallet,
      label: "₹10,000 Portfolio Sandbox",
      tag: "Contained Practice",
      heading: "Practise real portfolio reasoning with virtual money",
      description:
        "Execute simulated buys and sells across reviewed index funds, gold, and debt instruments with zero bank links and zero real-world financial hazard.",
      link: "/practice",
    },
  ];

  const current = tabs[activeTab];

  // Tab 0 Calculations
  const needs = Math.round(monthlyIncome * 0.5);
  const wants = Math.round(monthlyIncome * 0.3);
  const savings = Math.round(monthlyIncome * 0.2);
  const runwayFund = needs * 6;

  // Tab 1 Calculations
  const doublingYears = (72 / compoundRate).toFixed(1);

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
        {/* ─── HERO TYPOGRAPHY ─── */}
        <div className="text-center max-w-5xl mx-auto mb-12 sm:mb-16">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-[-0.035em] leading-[1.08] mb-6">
          Learn before you invest
        </h1>

        <p className="text-base sm:text-lg md:text-xl font-normal text-[#475569] dark:text-[#94A3B8] leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10">
          India&apos;s First Youth Focused Financial Investment Learning Platform.
        </p>

        {/* ─── TWO PERSPECTIVE COMPARISON CARDS ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto text-left">
          {/* Card 1: Traditional Way */}
          <div className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-white/75 dark:bg-[#0B0F19]/80 backdrop-blur-md border border-slate-200/90 dark:border-slate-800/90 shadow-sm flex flex-col justify-between transition-all hover:border-slate-300 dark:hover:border-slate-700">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-semibold border border-slate-200 dark:border-slate-700">
                  <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>Traditional Way</span>
                </div>
                <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                  High Risk & Confusion
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-[#0A1629] dark:text-white tracking-[-0.02em] mb-2">
                Trial, Error & Costly Mistakes
              </h3>
              <p className="text-xs sm:text-sm text-[#64748B] dark:text-slate-400 leading-relaxed mb-6">
                Faces constant struggle to learn, unsure where to start, and without a safe guide on how to invest properly.
              </p>

              <ul className="space-y-3.5 text-xs sm:text-sm text-[#475569] dark:text-slate-300">
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>Where to start?</strong> — Lost in scattered YouTube videos, random blogs, and conflicting advice</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>Problems to learn</strong> — Complex financial jargon, dry formulas, and zero beginner context</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>How to invest properly?</strong> — No structured practice sandbox, forced to risk real money blindly</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>Speculative FOMO</strong> — Chasing unverified stock tips, Telegram hype, and finfluencer trends</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <XCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span><strong>Constant anxiety</strong> — Left second-guessing every choice with persistent fear of capital wipeout</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
              <span>Result: Costly errors & frustration</span>
              <span className="font-semibold text-rose-600 dark:text-rose-400">High Risk</span>
            </div>
          </div>

          {/* Card 2: TO DIRECT Way */}
          <div className="relative rounded-2xl sm:rounded-3xl p-6 sm:p-7 bg-white dark:bg-[#0E1526] backdrop-blur-md border-2 border-[#2563FF]/30 dark:border-[#2563FF]/50 shadow-xl shadow-blue-500/5 dark:shadow-blue-500/10 flex flex-col justify-between transition-all hover:border-[#2563FF]/70 relative overflow-hidden">
            {/* Ambient Accent Glow */}
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-blue-500/15 blur-2xl pointer-events-none" />

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EBF3FF] dark:bg-blue-950/80 text-[#1748D8] dark:text-blue-300 text-xs font-semibold border border-[#2563FF]/25 dark:border-blue-700">
                  <Sparkles className="w-3.5 h-3.5 text-[#2563FF] shrink-0" />
                  <span>TO DIRECT Way</span>
                </div>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#2563FF] text-white">
                  Recommended
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold text-[#0A1629] dark:text-white tracking-[-0.02em] mb-2">
                Personalised, Practical & Confident
              </h3>
              <p className="text-xs sm:text-sm text-[#475569] dark:text-slate-300 leading-relaxed mb-6">
                A structured, youth-focused path designed to take you from absolute zero to autonomous investing.
              </p>

              <ul className="space-y-3.5 text-xs sm:text-sm text-[#0A1629] dark:text-slate-200">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2563FF] dark:text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Personalised learning</strong> — Guided paths calibrated to your pace, age, and individual goals</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2563FF] dark:text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Simple lectures</strong> — Intuitive, bite-sized lessons that make complex money concepts click</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2563FF] dark:text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Practical learning</strong> — Hands-on, zero-risk ₹10,000 sandbox to practice real allocation safe</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2563FF] dark:text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Gamified experience</strong> — Streaks, calibrated interactive quizzes, and verifiable competence badges</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#2563FF] dark:text-blue-400 shrink-0 mt-0.5" />
                  <span><strong>Make you confident</strong> — Graduate with genuine clarity and conviction before risking real rupees</span>
                </li>
              </ul>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800/80 relative z-10">
              <Link
                href="/curriculum"
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#0A1629] dark:bg-white hover:bg-[#1E293B] dark:hover:bg-slate-100 text-white dark:text-[#0A1629] text-xs sm:text-sm font-semibold transition-all shadow-xs group"
              >
                <span>Start Learning Free</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 4-ICON FLOATING CAPSULE & RADIANT SKY MESH CARD ─── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto mt-8">
        {/* 4-Icon Floating Category Switcher Capsule */}
        <div className="relative z-20 flex justify-center -mb-6">
          <div className="bg-white/95 dark:bg-[#111625]/95 backdrop-blur-md p-1.5 rounded-full border border-slate-200/80 dark:border-slate-800 shadow-card flex items-center gap-1.5">
            {tabs.map((tab, idx) => {
              const Icon = tab.icon;
              const isActive = activeTab === idx;
              return (
                <div key={tab.id} className="relative">
                  <button
                    onClick={() => setActiveTab(idx)}
                    className={`relative w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#2563FF] text-white shadow-sm"
                        : "text-slate-500 dark:text-slate-400 hover:text-[#0A1629] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                    aria-label={tab.label}
                    title={tab.label}
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Radiant Gradient Mesh Card Container */}
        <div className="relative rounded-[32px] sm:rounded-[40px] p-4 sm:p-10 pt-12 sm:pt-14 bg-gradient-to-br from-[#74B9FF] via-[#A0C4FF] to-[#CADEFC] dark:from-[#1E3A8A] dark:via-[#1D4ED8] dark:to-[#0284C7] shadow-float border border-white/60 dark:border-white/10 overflow-hidden transition-all duration-300">
          {/* Soft background light blooms */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/40 dark:bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#60A5FA]/30 dark:bg-blue-500/20 blur-3xl pointer-events-none" />

          {/* Elevated Pure White Card Inside */}
          <div className="relative z-10 bg-white dark:bg-[#0B0F19] rounded-3xl p-6 sm:p-10 shadow-float border border-white/80 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-colors">
            {/* Left Column: Feature Description */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF0FF] dark:bg-blue-950/60 text-[#1748D8] dark:text-blue-300 text-xs font-semibold border border-[#2563FF]/20 dark:border-blue-800">
                <Compass className="w-3.5 h-3.5" />
                <span>{current.tag}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-semibold text-[#0A1629] dark:text-white tracking-[-0.025em] leading-tight">
                {current.heading}
              </h3>

              <p className="text-sm sm:text-base font-normal text-[#475569] dark:text-slate-300 leading-relaxed">
                {current.description}
              </p>

              <div className="pt-2">
                <Link
                  href={current.link}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A1629] dark:text-white hover:text-[#2563FF] dark:hover:text-[#60A5FA] transition-colors group"
                >
                  <span>Explore {current.label}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#2563FF] dark:text-[#60A5FA]" />
                </Link>
              </div>
            </div>

            {/* Right Column: Financial Intelligence Interactive Visualizer (No Calendars) */}
            <div className="lg:col-span-6 bg-[#FAF8F5] dark:bg-[#111625] rounded-2xl p-5 sm:p-6 border border-slate-200/70 dark:border-slate-800 shadow-xs">
              {/* TAB 0: Money & Cash Flow */}
              {activeTab === 0 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-[#2563FF] dark:text-blue-300 flex items-center justify-center font-bold text-xs">
                        <PieChart className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-[#0A1629] dark:text-white">Cash Flow & Runway Simulator</h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">50-30-20 Rule Calibration</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      Runway: 6 Months
                    </span>
                  </div>

                  {/* Monthly Income Presets */}
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1.5">
                      Select Sample Net Salary
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[35000, 50000, 80000].map((inc) => (
                        <button
                          key={inc}
                          type="button"
                          onClick={() => setMonthlyIncome(inc)}
                          className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            monthlyIncome === inc
                              ? "bg-[#2563FF] text-white shadow-xs"
                              : "bg-white dark:bg-[#0B0F19] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300"
                          }`}
                        >
                          ₹{inc.toLocaleString("en-IN")}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 50-30-20 Segmented Visualizer */}
                  <div className="space-y-2 pt-1">
                    <div className="flex h-3 w-full rounded-full overflow-hidden gap-0.5 bg-slate-200 dark:bg-slate-800">
                      <div className="bg-blue-600 h-full rounded-l-full" style={{ width: "50%" }} title="Needs: 50%" />
                      <div className="bg-amber-500 h-full" style={{ width: "30%" }} title="Wants: 30%" />
                      <div className="bg-emerald-500 h-full rounded-r-full" style={{ width: "20%" }} title="Savings: 20%" />
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-[10px] pt-1">
                      <div className="p-2 rounded-xl bg-white dark:bg-[#0B0F19] border border-slate-200/80 dark:border-slate-800">
                        <span className="text-slate-500 dark:text-slate-400 block font-medium">50% Needs</span>
                        <span className="font-bold text-[#0A1629] dark:text-white text-xs">₹{needs.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white dark:bg-[#0B0F19] border border-slate-200/80 dark:border-slate-800">
                        <span className="text-slate-500 dark:text-slate-400 block font-medium">30% Wants</span>
                        <span className="font-bold text-[#0A1629] dark:text-white text-xs">₹{wants.toLocaleString("en-IN")}</span>
                      </div>
                      <div className="p-2 rounded-xl bg-white dark:bg-[#0B0F19] border border-slate-200/80 dark:border-slate-800">
                        <span className="text-slate-500 dark:text-slate-400 block font-medium">20% Savings</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 text-xs">₹{savings.toLocaleString("en-IN")}</span>
                      </div>
                    </div>
                  </div>

                  {/* Liquid Buffer Safeguard */}
                  <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 flex items-center justify-between text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 block">
                        Emergency Liquidity Target
                      </span>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        ₹{runwayFund.toLocaleString("en-IN")} (6-month buffer)
                      </span>
                    </div>
                    <Link href="/curriculum" className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline">
                      Learn Lab &rarr;
                    </Link>
                  </div>
                </div>
              )}

              {/* TAB 1: Compounding & Growth */}
              {activeTab === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-[#2563FF] dark:text-blue-300 flex items-center justify-center font-bold text-xs">
                        <TrendingUp className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-[#0A1629] dark:text-white">Rule of 72 Compounding Engine</h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">Exponential Doubling Velocity</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      Doubles in {doublingYears} Years
                    </span>
                  </div>

                  {/* Compound Rate Switcher */}
                  <div>
                    <label className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 block mb-1.5">
                      Select Annual Compound Return (r)
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { r: 7, label: "7% (Bank FD)" },
                        { r: 12, label: "12% (Index ETF)" },
                        { r: 15, label: "15% (Equity Alpha)" },
                      ].map((item) => (
                        <button
                          key={item.r}
                          type="button"
                          onClick={() => setCompoundRate(item.r)}
                          className={`py-1.5 px-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            compoundRate === item.r
                              ? "bg-[#2563FF] text-white shadow-xs"
                              : "bg-white dark:bg-[#0B0F19] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Exponential Wealth Multiplier Timeline */}
                  <div className="grid grid-cols-4 gap-2 pt-1 text-center">
                    <div className="p-2 rounded-xl bg-white dark:bg-[#0B0F19] border border-slate-200/80 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block">Year 0</span>
                      <span className="text-xs font-bold text-[#0A1629] dark:text-white">₹10K</span>
                      <span className="text-[9px] text-slate-400 block">Base 1x</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white dark:bg-[#0B0F19] border border-slate-200/80 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block">{doublingYears}y</span>
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">₹20K</span>
                      <span className="text-[9px] text-blue-500 block">2x double</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white dark:bg-[#0B0F19] border border-slate-200/80 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block">{(parseFloat(doublingYears) * 2).toFixed(0)}y</span>
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">₹40K</span>
                      <span className="text-[9px] text-blue-500 block">4x double</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white dark:bg-[#0B0F19] border border-slate-200/80 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block">{(parseFloat(doublingYears) * 3).toFixed(0)}y</span>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">₹80K</span>
                      <span className="text-[9px] text-emerald-500 block">8x double</span>
                    </div>
                  </div>

                  {/* Insight note */}
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 italic bg-slate-100/60 dark:bg-slate-800/40 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800">
                    💡 Mental math rule: 72 ÷ {compoundRate}% = {doublingYears} years. Small percentage increases yield massive wealth acceleration over long horizons!
                  </p>
                </div>
              )}

              {/* TAB 2: Risk & Diversification */}
              {activeTab === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-[#2563FF] dark:text-blue-300 flex items-center justify-center font-bold text-xs">
                        <Shield className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-[#0A1629] dark:text-white">Prudent Asset Allocation Matrix</h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">Zero Single-Asset Vulnerability</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                      Risk: Balanced
                    </span>
                  </div>

                  {/* Asset Allocation Sliders Preview */}
                  <div className="space-y-2.5 pt-1">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-700 dark:text-slate-300">Nifty 50 Index Equities</span>
                        <span className="text-blue-600 dark:text-blue-400">60%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full rounded-full" style={{ width: "60%" }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-700 dark:text-slate-300">Sovereign Debt & Fixed Deposits</span>
                        <span className="text-emerald-600 dark:text-emerald-400">25%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: "25%" }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-700 dark:text-slate-300">Sovereign Gold Bonds (Inflation Hedge)</span>
                        <span className="text-amber-600 dark:text-amber-400">15%</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                        <div className="bg-amber-500 h-full rounded-full" style={{ width: "15%" }} />
                      </div>
                    </div>
                  </div>

                  {/* Guardrail badge */}
                  <div className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/50 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-[11px] text-emerald-900 dark:text-emerald-200 font-medium">
                        Concentration Guardrail: <strong className="font-bold">PASSED (No asset &gt; 60%)</strong>
                      </span>
                    </div>
                    <Link href="/curriculum" className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline">
                      Risk Guide &rarr;
                    </Link>
                  </div>
                </div>
              )}

              {/* TAB 3: ₹10,000 Portfolio Sandbox */}
              {activeTab === 3 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-[#2563FF] dark:text-blue-300 flex items-center justify-center font-bold text-xs">
                        <Wallet className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-[#0A1629] dark:text-white">₹10,000 Simulation Terminal</h4>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400">Live Practice Sandbox</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      ₹10,000 Virtual Capital
                    </span>
                  </div>

                  {/* Portfolio Balances */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-3 rounded-xl bg-white dark:bg-[#0B0F19] border border-slate-200/80 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-medium">Available Cash</span>
                      <span className="font-bold text-[#0A1629] dark:text-white text-sm">₹3,500.00</span>
                      <span className="text-[10px] text-slate-500 block">35% buffer balance</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white dark:bg-[#0B0F19] border border-slate-200/80 dark:border-slate-800">
                      <span className="text-[10px] text-slate-400 block font-medium">Invested Assets</span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">₹6,500.00</span>
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block">+₹320.00 (+5.1%)</span>
                    </div>
                  </div>

                  {/* Sample Holdings List */}
                  <div className="space-y-1.5 text-xs">
                    <div className="p-2 rounded-xl bg-white dark:bg-[#0B0F19] border border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">Nifty 50 Index ETF</span>
                      <span className="font-mono font-bold text-slate-700 dark:text-slate-300">₹4,000 (16 units)</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white dark:bg-[#0B0F19] border border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">Bharat Bond ETF 2030</span>
                      <span className="font-mono font-bold text-slate-700 dark:text-slate-300">₹1,500 (1 unit)</span>
                    </div>
                    <div className="p-2 rounded-xl bg-white dark:bg-[#0B0F19] border border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">Sovereign Gold ETF</span>
                      <span className="font-mono font-bold text-slate-700 dark:text-slate-300">₹1,000 (2 units)</span>
                    </div>
                  </div>

                  {/* Rationale habit pill */}
                  <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-600 dark:text-slate-400">
                      ✓ Mandatory trade reflection rationale habit
                    </span>
                    <Link href="/practice" className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline">
                      Launch Sandbox &rarr;
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
