'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
import { SANDBOX_INSTRUMENTS, SandboxInstrument } from '@/lib/data';
import { useAppState } from '@/lib/store';
import { 
  Layers, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  X, 
  CheckCircle2, 
  Sparkles,
  PieChart,
  FileText,
  Building2,
  Play,
  Bot,
  Send,
  HelpCircle,
  Check
} from 'lucide-react';

export default function PracticalLearningPage() {
  const { state, executeTrade } = useAppState();

  // Active top-level section: Virtual ₹1,00,000 Investment vs Paper Company Analysis
  const [activeSection, setActiveSection] = useState<'sandbox' | 'paper_company'>('sandbox');

  // ─── 1. VIRTUAL ₹1,00,000 SANDBOX STATE ───
  const [modalOpen, setModalOpen] = useState(false);
  const [tradeType, setTradeType] = useState<'BUY' | 'SELL'>('BUY');
  const [selectedInstrumentId, setSelectedInstrumentId] = useState(SANDBOX_INSTRUMENTS[0].id);
  const [units, setUnits] = useState(1);
  const [rationale, setRationale] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const currentInstrument = SANDBOX_INSTRUMENTS.find((i) => i.id === selectedInstrumentId) || SANDBOX_INSTRUMENTS[0];
  const totalCost = units * currentInstrument.price;

  // Scale virtual balance to ₹1,00,000
  const virtualCashBase = 100000;
  const holdingsValue = state.portfolio.holdings.reduce((acc, h) => {
    const inst = SANDBOX_INSTRUMENTS.find((i) => i.id === h.instrumentId);
    const price = inst ? inst.price : h.avgBuyPrice;
    return acc + h.units * price * 10; // Scaled to ₹1,00,000
  }, 0);

  const totalPortfolioValue = (state.portfolio.cashBalance * 10) + holdingsValue;

  const handleExecuteTrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (units <= 0) return;

    executeTrade(
      tradeType,
      currentInstrument.id,
      currentInstrument.name,
      units,
      currentInstrument.price,
      rationale || 'Asset allocation practice order'
    );

    setSuccessMsg(`Successfully executed ${tradeType} order for ${units} units of ${currentInstrument.name}!`);
    setTimeout(() => {
      setSuccessMsg('');
      setModalOpen(false);
      setUnits(1);
      setRationale('');
    }, 1200);
  };

  // ─── 2. PAPER COMPANY ANALYSIS STATE ───
  const companyData = {
    name: 'Apex Consumer Brands Ltd',
    ticker: 'NSE: APEXCON',
    sector: 'FMCG & Packaged Foods',
    marketCap: '₹18,400 Crore (Midcap)',
    sharePrice: '₹342.50',
    peRatio: '38.4x (Sector Median: 24.5x)',
    pbRatio: '5.2x',
    roce: '16.8%',
    debtToEquity: '1.45x (High leverage alert)',
    revenue3YrCagr: '14.2%',
    ebitdaMargin: '17.6%',
    freeCashFlow: '₹280 Crore (Declining due to debt interest)',
    businessMoat: 'Strong rural distribution reach with 450,000 retail touchpoints; high brand recall in biscuits and packaged oats.',
    redFlags: 'Rising short-term debt taken for overseas packaging plant; raw material wheat prices up 8%; interest coverage ratio fallen from 6.2x to 2.8x.'
  };

  // Student report inputs
  const [studentMoatAnalysis, setStudentMoatAnalysis] = useState('');
  const [studentSolvencyAnalysis, setStudentSolvencyAnalysis] = useState('');
  const [studentValuationCall, setStudentValuationCall] = useState<'BUY' | 'HOLD' | 'AVOID'>('HOLD');
  const [studentRationale, setStudentRationale] = useState('');

  // AI Evaluation result
  const [aiReportAudit, setAiReportAudit] = useState<{
    score: number;
    grade: string;
    whatWentWell: string[];
    whatWentWrong: string[];
    recommendedVideos: { title: string; concept: string; href: string }[];
  } | null>(null);

  const [isAuditing, setIsAuditing] = useState(false);

  const handleAuditReport = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuditing(true);

    setTimeout(() => {
      setIsAuditing(false);
      const isCautious = studentValuationCall === 'HOLD' || studentValuationCall === 'AVOID';
      const spottedDebt = studentSolvencyAnalysis.toLowerCase().includes('debt') || studentSolvencyAnalysis.toLowerCase().includes('interest') || studentSolvencyAnalysis.toLowerCase().includes('leverage');

      setAiReportAudit({
        score: spottedDebt ? 88 : 65,
        grade: spottedDebt ? 'A- (Solid Fundamental Acumen)' : 'C+ (Critical Risk Overlooked)',
        whatWentWell: [
          'Recognized Apex Consumer’s extensive distribution network and FMCG brand equity.',
          'Noted the healthy 14.2% 3-year revenue CAGR and steady operating margins.'
        ],
        whatWentWrong: [
          spottedDebt 
            ? 'P/E of 38.4x is stretched against sector average 24.5x; ensure you model slower earnings growth if input costs surge.' 
            : 'You completely overlooked the 1.45x Debt/Equity ratio! Interest coverage fell to 2.8x. If interest rates rise or wheat prices spike, earnings will be squeezed severely.',
          'Failed to discount Free Cash Flow against increasing debt interest obligations.'
        ],
        recommendedVideos: [
          {
            title: 'Lesson 5.2: Deconstructing Balance Sheet Debt & Solvency Ratios',
            concept: 'Debt-to-Equity & Interest Coverage Ratios',
            href: '/curriculum'
          },
          {
            title: 'Lesson 7.2: Price-to-Earnings (P/E) Relative Valuation Multiples',
            concept: 'Comparing Sector Multiples vs Growth Rates',
            href: '/curriculum'
          }
        ]
      });
    }, 900);
  };

  return (
    <AppShell>
      <div className="space-y-8">
        {/* ─── HEADER ─── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                <Layers className="w-3.5 h-3.5" />
                Hands-On Practice
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-tight">
              Practical Learning
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Two real-world practice arenas: Virtual ₹1,00,000 Sandbox & Paper Company Analysis with AI report audits
            </p>
          </div>

          {/* Section Switcher Tabs */}
          <div className="flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800">
            <button
              onClick={() => setActiveSection('sandbox')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSection === 'sandbox'
                  ? 'bg-white dark:bg-[#111625] text-[#2563FF] dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-[#0A1629]'
              }`}
            >
              1. Virtual ₹1,00,000 Sandbox
            </button>
            <button
              onClick={() => setActiveSection('paper_company')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeSection === 'paper_company'
                  ? 'bg-white dark:bg-[#111625] text-[#2563FF] dark:text-white shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-[#0A1629]'
              }`}
            >
              2. Paper Company Analysis
            </button>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            ARENA 1: VIRTUAL ₹1,00,000 INVESTMENT SANDBOX
        ════════════════════════════════════════════════════════════════ */}
        {activeSection === 'sandbox' && (
          <div className="space-y-6">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase">
                  Total Portfolio Value
                </span>
                <p className="text-2xl font-bold text-[#0A1629] dark:text-white">
                  ₹{totalPortfolioValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
                <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  Initial Capital: ₹1,00,000
                </span>
              </div>

              <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase">
                  Available Cash Buffer
                </span>
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  ₹{(state.portfolio.cashBalance * 10).toLocaleString('en-IN')}
                </p>
                <span className="text-[11px] text-slate-500">Unallocated Reserves</span>
              </div>

              <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
                <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase">
                  Invested Assets Value
                </span>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  ₹{holdingsValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
                <span className="text-[11px] text-slate-500">{state.portfolio.holdings.length} Active Positions</span>
              </div>

              <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col justify-between">
                <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase">
                  Execute Simulation Trade
                </span>
                <Button
                  onClick={() => setModalOpen(true)}
                  size="sm"
                  variant="primaryDark"
                  className="rounded-full text-xs font-bold w-full mt-2"
                >
                  <Plus className="w-3.5 h-3.5 mr-1" />
                  Place New Trade
                </Button>
              </div>
            </div>

            {/* Instruments Catalog */}
            <div className="bg-white dark:bg-[#111625] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-lg font-bold text-[#0A1629] dark:text-[#F8FAFC]">
                    Available Educational Asset Classes
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Pre-cleared representative index funds, sovereign bonds, and liquid assets
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {SANDBOX_INSTRUMENTS.map((inst) => (
                  <div
                    key={inst.id}
                    className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-3 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-[#2563FF] dark:text-blue-400 uppercase">
                          {inst.category}
                        </span>
                        <span className="text-xs font-bold text-[#0A1629] dark:text-white">
                          ₹{inst.price} / unit
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-[#0A1629] dark:text-white mt-2">
                        {inst.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                        {inst.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500">Risk: {inst.riskRating}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedInstrumentId(inst.id);
                          setTradeType('BUY');
                          setModalOpen(true);
                        }}
                        className="rounded-full text-xs font-bold"
                      >
                        Trade &rarr;
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════
            ARENA 2: PAPER COMPANY ANALYSIS WITH AI AUDIT
        ════════════════════════════════════════════════════════════════ */}
        {activeSection === 'paper_company' && (
          <div className="space-y-6">
            {/* Company Dossier Card */}
            <div className="bg-white dark:bg-[#111625] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold text-[#0A1629] dark:text-[#F8FAFC]">
                        {companyData.name}
                      </h2>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {companyData.ticker}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {companyData.sector} • Market Cap: {companyData.marketCap}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 uppercase font-semibold">CMP (Current Market Price)</span>
                  <p className="text-2xl font-bold text-[#0A1629] dark:text-white">{companyData.sharePrice}</p>
                </div>
              </div>

              {/* Financial Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">P/E Multiple</span>
                  <p className="text-base font-bold text-[#0A1629] dark:text-white mt-0.5">{companyData.peRatio}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Debt / Equity</span>
                  <p className="text-base font-bold text-rose-600 dark:text-rose-400 mt-0.5">{companyData.debtToEquity}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">3-Yr Revenue CAGR</span>
                  <p className="text-base font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">{companyData.revenue3YrCagr}</p>
                </div>
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Free Cash Flow</span>
                  <p className="text-base font-bold text-[#0A1629] dark:text-white mt-0.5">{companyData.freeCashFlow}</p>
                </div>
              </div>

              {/* Qualitative Moat vs Red Flags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                  <span className="font-bold text-emerald-800 dark:text-emerald-300 block mb-1">
                    🏰 Competitive Moat & Advantages:
                  </span>
                  <p className="text-emerald-700 dark:text-emerald-400 leading-relaxed">
                    {companyData.businessMoat}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40">
                  <span className="font-bold text-rose-800 dark:text-rose-300 block mb-1">
                    ⚠️ Red Flags & Solvency Headwinds:
                  </span>
                  <p className="text-rose-700 dark:text-rose-400 leading-relaxed">
                    {companyData.redFlags}
                  </p>
                </div>
              </div>
            </div>

            {/* Student Report Submission Form */}
            <div className="bg-white dark:bg-[#111625] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-bold text-[#0A1629] dark:text-white">
                    Submit Your Fundamental Analysis Report
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Write your reasoning below. The AI auditor will grade your report, surface missed risks, and guide you to targeted videos.
                </p>
              </div>

              <form onSubmit={handleAuditReport} className="space-y-4 text-xs">
                <div>
                  <label className="font-bold text-[#0A1629] dark:text-white block mb-1.5">
                    1. Business Moat & Revenue Durability Assessment:
                  </label>
                  <textarea
                    rows={3}
                    value={studentMoatAnalysis}
                    onChange={(e) => setStudentMoatAnalysis(e.target.value)}
                    placeholder="Analyze whether Apex Consumer has pricing power and sustainable customer retention..."
                    className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-[#0A1629] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-[#0A1629] dark:text-white block mb-1.5">
                    2. Balance Sheet Solvency & Debt Risk Evaluation:
                  </label>
                  <textarea
                    rows={3}
                    value={studentSolvencyAnalysis}
                    onChange={(e) => setStudentSolvencyAnalysis(e.target.value)}
                    placeholder="Examine the 1.45x Debt/Equity ratio and declining interest coverage..."
                    className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-[#0A1629] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-[#0A1629] dark:text-white block mb-1.5">
                      3. Your Investment Verdict:
                    </label>
                    <select
                      value={studentValuationCall}
                      onChange={(e) => setStudentValuationCall(e.target.value as any)}
                      className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold text-[#0A1629] dark:text-white"
                    >
                      <option value="BUY">BUY (Undervalued with strong moat)</option>
                      <option value="HOLD">HOLD (Wait for debt reduction or valuation dip)</option>
                      <option value="AVOID">AVOID (Excessive leverage and high multiple)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-[#0A1629] dark:text-white block mb-1.5">
                      4. Core Justification Summary:
                    </label>
                    <input
                      type="text"
                      value={studentRationale}
                      onChange={(e) => setStudentRationale(e.target.value)}
                      placeholder="One-sentence conviction summary..."
                      className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-[#0A1629] dark:text-white"
                      required
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  variant="primaryDark"
                  disabled={isAuditing}
                  className="w-full rounded-full text-xs font-bold mt-2"
                >
                  {isAuditing ? 'AI Auditor Examining Balance Sheet & Report...' : 'Submit Report for Socratic AI Audit &rarr;'}
                </Button>
              </form>

              {/* ─── AI REPORT AUDIT RESULTS ─── */}
              {aiReportAudit && (
                <div className="mt-8 p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-6 animate-slideUp">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-[#0A1629] dark:text-white">
                          AI Audit Verdict: {aiReportAudit.grade}
                        </h4>
                        <span className="text-xs text-slate-500 font-semibold">
                          Audit Score: {aiReportAudit.score} / 100
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* What went well & what went wrong */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 space-y-2">
                      <span className="font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        What You Did Well:
                      </span>
                      <ul className="space-y-1.5 text-emerald-700 dark:text-emerald-400">
                        {aiReportAudit.whatWentWell.map((w, i) => (
                          <li key={i}>• {w}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/50 space-y-2">
                      <span className="font-bold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4" />
                        What Went Wrong / Missed Risks:
                      </span>
                      <ul className="space-y-1.5 text-rose-700 dark:text-rose-400">
                        {aiReportAudit.whatWentWrong.map((w, i) => (
                          <li key={i}>• {w}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Directed Videos */}
                  <div className="p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 space-y-3">
                    <span className="text-xs font-bold text-blue-900 dark:text-blue-200 uppercase tracking-wider block">
                      Recommended Video Lessons for Your Weak Spots:
                    </span>
                    <div className="space-y-2">
                      {aiReportAudit.recommendedVideos.map((vid, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-white dark:bg-[#111625] border border-blue-200/80 dark:border-slate-800 flex items-center justify-between"
                        >
                          <div>
                            <p className="text-xs font-bold text-[#0A1629] dark:text-white">{vid.title}</p>
                            <span className="text-[10px] text-slate-500">Core Principle: {vid.concept}</span>
                          </div>
                          <Link href={vid.href}>
                            <Button size="sm" variant="outline" className="rounded-full text-xs font-bold">
                              <Play className="w-3 h-3 mr-1 fill-current text-blue-600" />
                              Watch Lesson &rarr;
                            </Button>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ─── TRADE EXECUTION MODAL ─── */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-[#0B0F19] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-slideUp">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#0A1629] dark:text-white">Execute Virtual Order</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Practicing disciplined asset allocation</p>
              </div>
              <button onClick={() => setModalOpen(false)} className="p-1 rounded-full text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleExecuteTrade} className="p-6 space-y-4 text-xs">
              <div>
                <label className="font-bold text-[#0A1629] dark:text-white block mb-1">Asset Instrument</label>
                <select
                  value={selectedInstrumentId}
                  onChange={(e) => setSelectedInstrumentId(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                >
                  {SANDBOX_INSTRUMENTS.map((inst) => (
                    <option key={inst.id} value={inst.id}>
                      {inst.name} (₹{inst.price}/unit)
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#0A1629] dark:text-white block mb-1">Order Type</label>
                  <select
                    value={tradeType}
                    onChange={(e) => setTradeType(e.target.value as any)}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                  >
                    <option value="BUY">BUY</option>
                    <option value="SELL">SELL</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#0A1629] dark:text-white block mb-1">Units (Quantity)</label>
                  <input
                    type="number"
                    min="1"
                    value={units}
                    onChange={(e) => setUnits(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#0A1629] dark:text-white block mb-1">Investment Rationale (Required)</label>
                <input
                  type="text"
                  value={rationale}
                  onChange={(e) => setRationale(e.target.value)}
                  placeholder="Why are you allocating here? (e.g. 5-yr compounding horizon)"
                  className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  required
                />
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                <span className="font-medium text-slate-500">Total Order Cost:</span>
                <span className="font-bold text-base text-[#0A1629] dark:text-white">₹{totalCost}</span>
              </div>

              {successMsg && (
                <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold">
                  {successMsg}
                </div>
              )}

              <Button type="submit" size="md" variant="primaryDark" className="w-full rounded-full text-xs font-bold">
                Confirm & Execute Virtual Order &rarr;
              </Button>
            </form>
          </div>
        </div>
      )}
    </AppShell>
  );
}
