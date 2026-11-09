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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400">
                <Layers className="w-3.5 h-3.5" />
                Hands-on practice
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
          <div className="flex p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setActiveSection('sandbox')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeSection === 'sandbox'
                  ? 'bg-white dark:bg-[#111625] text-blue-600 dark:text-blue-400 shadow-xs border border-slate-200/60 dark:border-slate-800'
                  : 'text-slate-500 dark:text-slate-400 hover:text-[#0A1629] dark:hover:text-white'
              }`}
            >
              1. Virtual ₹1,00,000 Sandbox
            </button>
            <button
              onClick={() => setActiveSection('paper_company')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeSection === 'paper_company'
                  ? 'bg-white dark:bg-[#111625] text-blue-600 dark:text-blue-400 shadow-xs border border-slate-200/60 dark:border-slate-800'
                  : 'text-slate-500 dark:text-slate-400 hover:text-[#0A1629] dark:hover:text-white'
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-[#111625] rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Total portfolio value
                </span>
                <p className="text-2xl font-bold font-mono text-[#0A1629] dark:text-white">
                  ₹{totalPortfolioValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
                <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 block pt-0.5">
                  Initial capital: ₹1,00,000
                </span>
              </div>

              <div className="bg-white dark:bg-[#111625] rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Available cash buffer
                </span>
                <p className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                  ₹{(state.portfolio.cashBalance * 10).toLocaleString('en-IN')}
                </p>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block pt-0.5">
                  Unallocated reserves
                </span>
              </div>

              <div className="bg-white dark:bg-[#111625] rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-1">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Invested assets value
                </span>
                <p className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400">
                  ₹{holdingsValue.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                </p>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block pt-0.5">
                  {state.portfolio.holdings.length} active positions
                </span>
              </div>

              <div className="bg-white dark:bg-[#111625] rounded-xl p-5 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between">
                <div>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Portfolio actions
                  </span>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Execute simulated market orders
                  </p>
                </div>
                <button
                  onClick={() => setModalOpen(true)}
                  className="mt-3 inline-flex items-center justify-center gap-1.5 w-full py-2 px-3 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Place new trade
                </button>
              </div>
            </div>

            {/* Instruments Catalog */}
            <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                <div>
                  <h2 className="text-base font-semibold text-[#0A1629] dark:text-[#F8FAFC]">
                    Available Educational Asset Classes
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Pre-cleared representative index funds, sovereign bonds, and liquid assets
                  </p>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  {SANDBOX_INSTRUMENTS.length} instruments listed
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {SANDBOX_INSTRUMENTS.map((inst) => (
                  <div
                    key={inst.id}
                    className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-3 flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-900/50">
                          {inst.category}
                        </span>
                        <span className="text-xs font-semibold font-mono text-[#0A1629] dark:text-white">
                          ₹{inst.price} / unit
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-[#0A1629] dark:text-white mt-2.5">
                        {inst.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-1">
                        {inst.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Risk: {inst.riskRating}</span>
                      <button
                        onClick={() => {
                          setSelectedInstrumentId(inst.id);
                          setTradeType('BUY');
                          setModalOpen(true);
                        }}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900/60 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer"
                      >
                        Trade &rarr;
                      </button>
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
            <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold border border-blue-100 dark:border-blue-900/40">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-semibold text-[#0A1629] dark:text-[#F8FAFC]">
                        {companyData.name}
                      </h2>
                      <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
                        {companyData.ticker}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {companyData.sector} • Market cap: {companyData.marketCap}
                    </p>
                  </div>
                </div>

                <div className="sm:text-right">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Current market price</span>
                  <p className="text-2xl font-bold font-mono text-[#0A1629] dark:text-white">{companyData.sharePrice}</p>
                </div>
              </div>

              {/* Financial Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">P/E multiple</span>
                  <p className="text-base font-semibold font-mono text-[#0A1629] dark:text-white mt-0.5">{companyData.peRatio}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Debt / equity</span>
                  <p className="text-base font-semibold font-mono text-rose-600 dark:text-rose-400 mt-0.5">{companyData.debtToEquity}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">3-yr revenue CAGR</span>
                  <p className="text-base font-semibold font-mono text-emerald-600 dark:text-emerald-400 mt-0.5">{companyData.revenue3YrCagr}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Free cash flow</span>
                  <p className="text-base font-semibold font-mono text-[#0A1629] dark:text-white mt-0.5">{companyData.freeCashFlow}</p>
                </div>
              </div>

              {/* Qualitative Moat vs Red Flags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40">
                  <span className="font-semibold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5 mb-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    Competitive moat and advantages
                  </span>
                  <p className="text-emerald-800/90 dark:text-emerald-300/90 leading-relaxed">
                    {companyData.businessMoat}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40">
                  <span className="font-semibold text-rose-900 dark:text-rose-300 flex items-center gap-1.5 mb-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                    Red flags and solvency headwinds
                  </span>
                  <p className="text-rose-800/90 dark:text-rose-300/90 leading-relaxed">
                    {companyData.redFlags}
                  </p>
                </div>
              </div>
            </div>

            {/* Student Report Submission Form */}
            <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-5">
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800/80">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-base font-semibold text-[#0A1629] dark:text-white">
                    Submit Fundamental Analysis Report
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Write your reasoning below. The AI auditor will evaluate your report, highlight overlooked balance sheet risks, and recommend calibrated lessons.
                </p>
              </div>

              <form onSubmit={handleAuditReport} className="space-y-4 text-xs">
                <div>
                  <label className="font-medium text-[#0A1629] dark:text-white block mb-1.5">
                    1. Business moat and revenue durability assessment:
                  </label>
                  <textarea
                    rows={3}
                    value={studentMoatAnalysis}
                    onChange={(e) => setStudentMoatAnalysis(e.target.value)}
                    placeholder="Analyze whether Apex Consumer has pricing power and sustainable customer retention..."
                    className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-[#0A1629] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="font-medium text-[#0A1629] dark:text-white block mb-1.5">
                    2. Balance sheet solvency and debt risk evaluation:
                  </label>
                  <textarea
                    rows={3}
                    value={studentSolvencyAnalysis}
                    onChange={(e) => setStudentSolvencyAnalysis(e.target.value)}
                    placeholder="Examine the 1.45x Debt/Equity ratio and declining interest coverage..."
                    className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-[#0A1629] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-medium text-[#0A1629] dark:text-white block mb-1.5">
                      3. Your investment verdict:
                    </label>
                    <select
                      value={studentValuationCall}
                      onChange={(e) => setStudentValuationCall(e.target.value as any)}
                      className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-[#0A1629] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="BUY">BUY (Undervalued with strong moat)</option>
                      <option value="HOLD">HOLD (Wait for debt reduction or valuation dip)</option>
                      <option value="AVOID">AVOID (Excessive leverage and high multiple)</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-medium text-[#0A1629] dark:text-white block mb-1.5">
                      4. Core justification summary:
                    </label>
                    <input
                      type="text"
                      value={studentRationale}
                      onChange={(e) => setStudentRationale(e.target.value)}
                      placeholder="One-sentence conviction summary..."
                      className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-[#0A1629] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isAuditing}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shadow-xs disabled:opacity-60"
                >
                  {isAuditing ? 'AI Auditor examining balance sheet & report...' : 'Submit report for Socratic AI audit &rarr;'}
                </button>
              </form>

              {/* ─── AI REPORT AUDIT RESULTS ─── */}
              {aiReportAudit && (
                <div className="mt-6 p-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-5 animate-slideUp">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-[#0A1629] dark:text-white">
                          AI Audit Verdict: {aiReportAudit.grade}
                        </h4>
                        <span className="text-xs text-slate-500 font-medium">
                          Audit Score: {aiReportAudit.score} / 100
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* What went well & what went wrong */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-3.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 space-y-2">
                      <span className="font-semibold text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        What you did well:
                      </span>
                      <ul className="space-y-1 text-emerald-700 dark:text-emerald-400">
                        {aiReportAudit.whatWentWell.map((w, i) => (
                          <li key={i}>• {w}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/50 space-y-2">
                      <span className="font-semibold text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                        What went wrong / missed risks:
                      </span>
                      <ul className="space-y-1 text-rose-700 dark:text-rose-400">
                        {aiReportAudit.whatWentWrong.map((w, i) => (
                          <li key={i}>• {w}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Directed Videos */}
                  <div className="p-4 rounded-lg bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 space-y-3">
                    <span className="text-xs font-semibold text-blue-900 dark:text-blue-200 block">
                      Recommended video lessons for your weak spots:
                    </span>
                    <div className="space-y-2">
                      {aiReportAudit.recommendedVideos.map((vid, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-lg bg-white dark:bg-[#111625] border border-blue-200/80 dark:border-slate-800 flex items-center justify-between"
                        >
                          <div>
                            <p className="text-xs font-medium text-[#0A1629] dark:text-white">{vid.title}</p>
                            <span className="text-[11px] text-slate-500">Core principle: {vid.concept}</span>
                          </div>
                          <Link href={vid.href}>
                            <button className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium border border-blue-200 dark:border-blue-900/60 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors cursor-pointer">
                              <Play className="w-3 h-3 mr-0.5 fill-current text-blue-600 dark:text-blue-400" />
                              Watch lesson &rarr;
                            </button>
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
          <div className="w-full max-w-md bg-white dark:bg-[#0B0F19] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden animate-slideUp">
            <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-[#0A1629] dark:text-white">Execute Virtual Order</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Practicing disciplined asset allocation</p>
              </div>
              <button 
                onClick={() => setModalOpen(false)} 
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleExecuteTrade} className="p-5 space-y-4 text-xs">
              <div>
                <label className="font-medium text-[#0A1629] dark:text-white block mb-1">Asset instrument</label>
                <select
                  value={selectedInstrumentId}
                  onChange={(e) => setSelectedInstrumentId(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-[#0A1629] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
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
                  <label className="font-medium text-[#0A1629] dark:text-white block mb-1">Order type</label>
                  <select
                    value={tradeType}
                    onChange={(e) => setTradeType(e.target.value as any)}
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-medium text-[#0A1629] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  >
                    <option value="BUY">BUY</option>
                    <option value="SELL">SELL</option>
                  </select>
                </div>

                <div>
                  <label className="font-medium text-[#0A1629] dark:text-white block mb-1">Units (Quantity)</label>
                  <input
                    type="number"
                    min="1"
                    value={units}
                    onChange={(e) => setUnits(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono font-medium text-[#0A1629] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="font-medium text-[#0A1629] dark:text-white block mb-1">Investment rationale (Required)</label>
                <input
                  type="text"
                  value={rationale}
                  onChange={(e) => setRationale(e.target.value)}
                  placeholder="Why are you allocating here? (e.g. 5-yr compounding horizon)"
                  className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-[#0A1629] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  required
                />
              </div>

              <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex justify-between items-center text-xs">
                <span className="font-medium text-slate-500 dark:text-slate-400">Total order cost:</span>
                <span className="font-bold font-mono text-base text-[#0A1629] dark:text-white">₹{totalCost.toLocaleString('en-IN')}</span>
              </div>

              {successMsg && (
                <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 text-xs font-medium border border-emerald-200 dark:border-emerald-900/50">
                  {successMsg}
                </div>
              )}

              <button 
                type="submit" 
                className="w-full py-2.5 px-4 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shadow-xs"
              >
                Confirm & execute virtual order &rarr;
              </button>
            </form>
          </div>
        </div>
      )}
    </AppShell>
  );
}
