'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { SANDBOX_INSTRUMENTS } from '@/lib/data';
import { 
  Sliders, 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight,
  Info,
  DollarSign
} from 'lucide-react';

export default function PracticeLandingPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'equity' | 'debt' | 'gold' | 'liquid'>('all');

  const filtered = selectedCategory === 'all'
    ? SANDBOX_INSTRUMENTS
    : SANDBOX_INSTRUMENTS.filter((i) => i.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#070A11] text-[#0A1629] dark:text-[#F8FAFC] antialiased transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-100 dark:border-emerald-900/50 text-emerald-800 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
            <Sliders className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Zero Financial Risk Sandbox
          </span>
          <h1 className="text-4xl sm:text-5xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-tight leading-tight">
            The ₹10,000 Virtual <br />
            <span className="text-blue-600 dark:text-blue-400">Investment Sandbox</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            Experience real-world asset allocation and market fluctuations with ₹10,000 in virtual capital. Build a disciplined investor mindset before opening a real Demat account.
          </p>

          <div className="mt-8 flex items-center justify-center gap-4">
            <Link href="/sign-in">
              <Button size="lg" variant="primaryDark" className="rounded-full px-8">
                Launch My Sandbox &rarr;
              </Button>
            </Link>
          </div>
        </div>

        {/* 3 Sandbox Guardrails Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="bg-white dark:bg-[#111625] rounded-2xl p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0A1629] dark:text-[#F8FAFC]">Concentration Risk Guardrails</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              If you allocate more than 60% of your capital to a single high-volatility instrument, the sandbox triggers an educational risk alert explaining unsystematic risk.
            </p>
          </div>

          <div className="bg-white dark:bg-[#111625] rounded-2xl p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0A1629] dark:text-[#F8FAFC]">Required Trade Rationale</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Every buy or sell order asks for a 1-sentence reasoning reflection. This simple step eliminates impulse gambling and trains you to think like an owner.
            </p>
          </div>

          <div className="bg-white dark:bg-[#111625] rounded-2xl p-7 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-[#0A1629] dark:text-[#F8FAFC]">Zero Leveraged Day-Trading</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              We prohibit 10x intraday margins, options, and penny stocks. The sandbox is exclusively populated with index ETFs, sovereign bonds, and cash buffers.
            </p>
          </div>
        </div>

        {/* Live Instrument Catalog Preview */}
        <div className="bg-white dark:bg-[#111625] rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-[#0A1629] dark:text-[#F8FAFC]">Available Sandbox Instruments</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Realistic asset proxies representing core asset allocation categories</p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {(['all', 'equity', 'debt', 'gold', 'liquid'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold capitalize transition-all ${
                    selectedCategory === cat
                      ? 'bg-slate-900 dark:bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 mt-2">
            {filtered.map((inst) => (
              <div key={inst.id} className="py-4.5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#0A1629] dark:text-[#F8FAFC] text-base">{inst.name}</span>
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {inst.ticker}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 capitalize">
                      {inst.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xl">{inst.description}</p>
                </div>

                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-right">
                    <p className="text-base font-mono font-bold text-[#0A1629] dark:text-[#F8FAFC]">
                      ₹{inst.price.toFixed(2)}
                    </p>
                    <p className={`text-xs font-semibold ${inst.changePercent >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                      {inst.changePercent >= 0 ? '+' : ''}{inst.changePercent}%
                    </p>
                  </div>

                  <Link href="/sign-in">
                    <Button size="sm" variant="outline" className="rounded-full text-xs font-semibold bg-white dark:bg-[#111625] dark:border-slate-800">
                      Practice Trade &rarr;
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer Card */}
        <div className="p-6 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 text-amber-900 dark:text-amber-200 flex items-start gap-3 text-xs leading-relaxed">
          <Info className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Important Educational Simulation Disclosure</p>
            <p className="mt-0.5 text-amber-800 dark:text-amber-300">
              The ₹10,000 sandbox uses virtual educational currency. No real money is deposited, exchanged, or withdrawn. Price changes and returns are simulated for instructional purposes and do not represent past, present, or future returns of any real-world security.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
