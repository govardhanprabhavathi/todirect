'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SANDBOX_INSTRUMENTS } from '@/lib/data';
import { 
  Sliders, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight,
  Info
} from 'lucide-react';

export default function PracticeLandingPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'equity' | 'debt' | 'gold' | 'liquid'>('all');

  const filtered = selectedCategory === 'all'
    ? SANDBOX_INSTRUMENTS
    : SANDBOX_INSTRUMENTS.filter((i) => i.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#070A11] text-[#0A1629] dark:text-[#F8FAFC] antialiased transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-900/40 text-emerald-800 dark:text-emerald-300 text-xs font-medium mb-4">
            <Sliders className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Zero financial risk sandbox
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-tight leading-tight">
            The ₹10,000 Virtual <br />
            <span className="text-blue-600 dark:text-blue-400">Investment Sandbox</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Experience real-world asset allocation and market fluctuations with ₹10,000 in virtual capital. Build a disciplined investor mindset before opening a real Demat account.
          </p>

          <div className="mt-7 flex items-center justify-center gap-4">
            <Link href="/sign-in">
              <button className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs sm:text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shadow-xs">
                Launch my sandbox
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>
        </div>

        {/* 3 Sandbox Guardrails Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          <div className="bg-white dark:bg-[#111625] rounded-xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold border border-blue-100 dark:border-blue-900/40">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[#0A1629] dark:text-[#F8FAFC]">Concentration risk guardrails</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              If you allocate more than 60% of your capital to a single high-volatility instrument, the sandbox triggers an educational risk alert explaining unsystematic risk.
            </p>
          </div>

          <div className="bg-white dark:bg-[#111625] rounded-xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold border border-emerald-100 dark:border-emerald-900/40">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[#0A1629] dark:text-[#F8FAFC]">Required trade rationale</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Every buy or sell order asks for a 1-sentence reasoning reflection. This simple step eliminates impulse gambling and trains you to think like an owner.
            </p>
          </div>

          <div className="bg-white dark:bg-[#111625] rounded-xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold border border-amber-100 dark:border-amber-900/40">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-[#0A1629] dark:text-[#F8FAFC]">Zero leveraged day-trading</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              We prohibit 10x intraday margins, options, and penny stocks. The sandbox is exclusively populated with index ETFs, sovereign bonds, and cash buffers.
            </p>
          </div>
        </div>

        {/* Live Instrument Catalog Preview */}
        <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xs mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800 gap-4">
            <div>
              <h2 className="text-xl font-semibold text-[#0A1629] dark:text-[#F8FAFC]">Available Sandbox Instruments</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Realistic asset proxies representing core asset allocation categories</p>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
              {(['all', 'equity', 'debt', 'gold', 'liquid'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium capitalize transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-white dark:bg-[#111625] text-blue-600 dark:text-blue-400 shadow-xs border border-slate-200/60 dark:border-slate-800'
                      : 'text-slate-500 dark:text-slate-400 hover:text-[#0A1629] dark:hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 mt-2">
            {filtered.map((inst) => (
              <div key={inst.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#0A1629] dark:text-[#F8FAFC] text-sm sm:text-base">{inst.name}</span>
                    <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
                      {inst.ticker}
                    </span>
                    <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/50 capitalize">
                      {inst.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl">{inst.description}</p>
                </div>

                <div className="flex items-center gap-5 shrink-0 self-end sm:self-auto">
                  <div className="text-right">
                    <p className="text-sm sm:text-base font-mono font-semibold text-[#0A1629] dark:text-[#F8FAFC]">
                      ₹{inst.price.toFixed(2)}
                    </p>
                    <p className={`text-[11px] font-mono font-medium ${inst.changePercent >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      {inst.changePercent >= 0 ? '+' : ''}{inst.changePercent}%
                    </p>
                  </div>

                  <Link href="/sign-in">
                    <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer">
                      Practice trade &rarr;
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer Card */}
        <div className="p-5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/70 dark:border-amber-900/40 text-amber-900 dark:text-amber-200 flex items-start gap-3 text-xs leading-relaxed">
          <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Educational Simulation Disclosure</p>
            <p className="mt-0.5 text-amber-800/90 dark:text-amber-300/90">
              The ₹10,000 sandbox uses virtual educational currency. No real money is deposited, exchanged, or withdrawn. Price changes and returns are simulated for instructional purposes and do not represent past, present, or future returns of any real-world security.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
