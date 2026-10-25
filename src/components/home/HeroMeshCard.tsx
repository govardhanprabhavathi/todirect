"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Compass, Sparkles, Shield, Wallet, Check, TrendingUp, PieChart, Sliders, ArrowUpRight } from "lucide-react";
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
    <section className="pt-12 sm:pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* ─── HERO TYPOGRAPHY ─── */}
      <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-[-0.035em] leading-[1.08] mb-6">
          All the fundamentals of investing, handled.
        </h1>

        <p className="text-base sm:text-lg md:text-xl font-normal text-[#475569] dark:text-[#94A3B8] leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10">
          From AI-powered coaching to automated misconception checks and a ₹10,000 practice sandbox, get financial confidence with zero real-money risk.
        </p>

        {/* Dual Social Pills */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-3.5">
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
        </div>

        {/* Microcopy below auth pills */}
        <p className="text-xs font-normal text-[#64748B] dark:text-slate-400">
          <Link href="/sign-in" className="underline hover:text-[#0A1629] dark:hover:text-white transition-colors">
            Sign up with email
          </Link>{" "}
          • No credit card required
        </p>
      </div>

      {/* ─── 4-ICON FLOATING CAPSULE & RADIANT SKY MESH CARD ─── */}
      <div className="relative w-full max-w-5xl mx-auto mt-8">
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
    </section>
  );
}
