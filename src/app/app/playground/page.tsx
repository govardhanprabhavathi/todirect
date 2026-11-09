'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { 
  Calculator, 
  TrendingUp, 
  PieChart, 
  RotateCcw,
  Sparkles,
  Info,
  CheckCircle2
} from 'lucide-react';

export default function PlaygroundPage() {
  const [activeTab, setActiveTab] = useState<'emi' | 'sip' | 'stock' | 'dividend'>('emi');

  // 1. EMI Calculator State
  const [loanAmount, setLoanAmount] = useState<number>(500000);
  const [loanInterest, setLoanInterest] = useState<number>(8.5);
  const [loanTenureYears, setLoanTenureYears] = useState<number>(5);

  const calculateEMI = () => {
    const p = loanAmount;
    const r = loanInterest / 12 / 100;
    const n = loanTenureYears * 12;
    if (r === 0) return { emi: p / n, totalInterest: 0, totalPayment: p };
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;
    return {
      emi: Math.round(emi),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment)
    };
  };

  const emiResults = calculateEMI();

  // 2. SIP / Mutual Fund Calculator State
  const [monthlySIP, setMonthlySIP] = useState<number>(5000);
  const [sipReturnRate, setSipReturnRate] = useState<number>(12);
  const [sipYears, setSipYears] = useState<number>(10);

  const calculateSIP = () => {
    const p = monthlySIP;
    const i = sipReturnRate / 12 / 100;
    const n = sipYears * 12;
    const investedAmount = p * n;
    const totalValue = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const wealthGain = totalValue - investedAmount;
    return {
      investedAmount: Math.round(investedAmount),
      wealthGain: Math.round(wealthGain),
      totalValue: Math.round(totalValue)
    };
  };

  const sipResults = calculateSIP();

  // 3. Stock Returns Calculator State
  const [buyPrice, setBuyPrice] = useState<number>(150);
  const [sellPrice, setSellPrice] = useState<number>(380);
  const [stockQuantity, setStockQuantity] = useState<number>(100);
  const [holdingYears, setHoldingYears] = useState<number>(3);

  const calculateStockReturns = () => {
    const totalBuy = buyPrice * stockQuantity;
    const totalSell = sellPrice * stockQuantity;
    const netProfit = totalSell - totalBuy;
    const absoluteReturn = ((totalSell - totalBuy) / totalBuy) * 100;
    const cagr = holdingYears > 0 ? (Math.pow(totalSell / totalBuy, 1 / holdingYears) - 1) * 100 : absoluteReturn;
    return {
      totalBuy: Math.round(totalBuy),
      totalSell: Math.round(totalSell),
      netProfit: Math.round(netProfit),
      absoluteReturn: absoluteReturn.toFixed(1),
      cagr: cagr.toFixed(1)
    };
  };

  const stockResults = calculateStockReturns();

  // 4. Dividend Returns Calculator State
  const [sharesOwned, setSharesOwned] = useState<number>(200);
  const [stockCurrentPrice, setStockCurrentPrice] = useState<number>(250);
  const [dividendPerShare, setDividendPerShare] = useState<number>(12);

  const calculateDividend = () => {
    const totalInvestment = sharesOwned * stockCurrentPrice;
    const annualDividend = sharesOwned * dividendPerShare;
    const dividendYield = totalInvestment > 0 ? (annualDividend / totalInvestment) * 100 : 0;
    const fiveYearDividends = annualDividend * 5;
    return {
      totalInvestment: Math.round(totalInvestment),
      annualDividend: Math.round(annualDividend),
      dividendYield: dividendYield.toFixed(2),
      fiveYearDividends: Math.round(fiveYearDividends)
    };
  };

  const dividendResults = calculateDividend();

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400">
                <Calculator className="w-3.5 h-3.5" />
                Financial calculators
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-tight">
              Learning Playground
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Simulate loan EMIs, mutual fund compounding, stock CAGRs, and dividend cashflows
            </p>
          </div>

          {/* Calculator Selector Tabs */}
          <div className="flex flex-wrap p-1 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('emi')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'emi'
                  ? 'bg-white dark:bg-[#111625] text-blue-600 dark:text-blue-400 shadow-xs border border-slate-200/60 dark:border-slate-800'
                  : 'text-slate-500 dark:text-slate-400 hover:text-[#0A1629] dark:hover:text-white'
              }`}
            >
              1. Loan EMI
            </button>
            <button
              onClick={() => setActiveTab('sip')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'sip'
                  ? 'bg-white dark:bg-[#111625] text-blue-600 dark:text-blue-400 shadow-xs border border-slate-200/60 dark:border-slate-800'
                  : 'text-slate-500 dark:text-slate-400 hover:text-[#0A1629] dark:hover:text-white'
              }`}
            >
              2. Mutual Fund SIP
            </button>
            <button
              onClick={() => setActiveTab('stock')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'stock'
                  ? 'bg-white dark:bg-[#111625] text-blue-600 dark:text-blue-400 shadow-xs border border-slate-200/60 dark:border-slate-800'
                  : 'text-slate-500 dark:text-slate-400 hover:text-[#0A1629] dark:hover:text-white'
              }`}
            >
              3. Stock CAGR
            </button>
            <button
              onClick={() => setActiveTab('dividend')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === 'dividend'
                  ? 'bg-white dark:bg-[#111625] text-blue-600 dark:text-blue-400 shadow-xs border border-slate-200/60 dark:border-slate-800'
                  : 'text-slate-500 dark:text-slate-400 hover:text-[#0A1629] dark:hover:text-white'
              }`}
            >
              4. Dividend Yield
            </button>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════
            CALCULATOR 1: EMI CALCULATOR
        ══════════════════════════════════════════════════════════════ */}
        {activeTab === 'emi' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Input Controls */}
            <div className="lg:col-span-7 bg-white dark:bg-[#111625] rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
              <h2 className="text-base font-semibold text-[#0A1629] dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800/80">
                Loan EMI Parameters
              </h2>

              <div className="space-y-5 text-xs">
                <div>
                  <div className="flex justify-between font-medium mb-1.5">
                    <span className="text-slate-600 dark:text-slate-400">Loan amount</span>
                    <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">₹{loanAmount.toLocaleString('en-IN')}</span>
                  </div>
                  <input
                    type="range"
                    min="50000"
                    max="10000000"
                    step="25000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-medium mb-1.5">
                    <span className="text-slate-600 dark:text-slate-400">Interest rate (% p.a.)</span>
                    <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">{loanInterest}%</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="22"
                    step="0.25"
                    value={loanInterest}
                    onChange={(e) => setLoanInterest(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-medium mb-1.5">
                    <span className="text-slate-600 dark:text-slate-400">Loan tenure</span>
                    <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">{loanTenureYears} Years ({loanTenureYears * 12} Months)</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="1"
                    value={loanTenureYears}
                    onChange={(e) => setLoanTenureYears(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Results Display */}
            <div className="lg:col-span-5 bg-white dark:bg-[#111625] rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400 block mb-1">
                  Monthly installment (EMI)
                </span>
                <p className="text-4xl font-bold font-mono text-[#0A1629] dark:text-white tracking-tight">
                  ₹{emiResults.emi.toLocaleString('en-IN')}
                </p>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">per month</span>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-200/80 dark:border-slate-800 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Principal amount:</span>
                  <span className="font-mono font-medium text-[#0A1629] dark:text-white">₹{loanAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Total interest payable:</span>
                  <span className="font-mono font-semibold text-rose-600 dark:text-rose-400">₹{emiResults.totalInterest.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800">
                  <span className="font-semibold text-[#0A1629] dark:text-white">Total payment (Principal + Interest):</span>
                  <span className="font-bold font-mono text-[#0A1629] dark:text-white">₹{emiResults.totalPayment.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-300 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span><strong>Compounding insight:</strong> Longer tenures lower your monthly EMI but dramatically inflate total interest paid to the bank.</span>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            CALCULATOR 2: MUTUAL FUND / SIP CALCULATOR
        ══════════════════════════════════════════════════════════════ */}
        {activeTab === 'sip' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-white dark:bg-[#111625] rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
              <h2 className="text-base font-semibold text-[#0A1629] dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800/80">
                Systematic Investment Plan (SIP) Inputs
              </h2>

              <div className="space-y-5 text-xs">
                <div>
                  <div className="flex justify-between font-medium mb-1.5">
                    <span className="text-slate-600 dark:text-slate-400">Monthly investment</span>
                    <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">₹{monthlySIP.toLocaleString('en-IN')} / month</span>
                  </div>
                  <input
                    type="range"
                    min="500"
                    max="100000"
                    step="500"
                    value={monthlySIP}
                    onChange={(e) => setMonthlySIP(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-medium mb-1.5">
                    <span className="text-slate-600 dark:text-slate-400">Expected annual return rate (CAGR)</span>
                    <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">{sipReturnRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="20"
                    step="0.5"
                    value={sipReturnRate}
                    onChange={(e) => setSipReturnRate(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-medium mb-1.5">
                    <span className="text-slate-600 dark:text-slate-400">Time horizon</span>
                    <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">{sipYears} Years</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="35"
                    step="1"
                    value={sipYears}
                    onChange={(e) => setSipYears(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white dark:bg-[#111625] rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 block mb-1">
                  Expected maturity wealth
                </span>
                <p className="text-4xl font-bold font-mono text-[#0A1629] dark:text-white tracking-tight">
                  ₹{sipResults.totalValue.toLocaleString('en-IN')}
                </p>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-1 block">
                  +₹{sipResults.wealthGain.toLocaleString('en-IN')} in pure compounding returns
                </span>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-200/80 dark:border-slate-800 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Total invested capital:</span>
                  <span className="font-mono font-medium text-[#0A1629] dark:text-white">₹{sipResults.investedAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Estimated returns (gains):</span>
                  <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">₹{sipResults.wealthGain.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800">
                  <span className="font-semibold text-[#0A1629] dark:text-white">Compounding multiplier:</span>
                  <span className="font-bold font-mono text-blue-600 dark:text-blue-400">
                    {(sipResults.totalValue / sipResults.investedAmount).toFixed(1)}x capital
                  </span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 text-xs text-emerald-900 dark:text-emerald-300 flex items-start gap-2.5">
                <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Compounding dynamics:</strong> In a 10-year SIP with discipline, your compounding returns often surpass your total principal contributions.</span>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            CALCULATOR 3: STOCK RETURNS / CAGR CALCULATOR
        ══════════════════════════════════════════════════════════════ */}
        {activeTab === 'stock' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-white dark:bg-[#111625] rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
              <h2 className="text-base font-semibold text-[#0A1629] dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800/80">
                Stock Purchase & Exit Metrics
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="font-medium text-[#0A1629] dark:text-white block mb-1">Buy price (₹)</label>
                  <input
                    type="number"
                    value={buyPrice}
                    onChange={(e) => setBuyPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-medium text-[#0A1629] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="font-medium text-[#0A1629] dark:text-white block mb-1">Selling / target price (₹)</label>
                  <input
                    type="number"
                    value={sellPrice}
                    onChange={(e) => setSellPrice(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-medium text-[#0A1629] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="font-medium text-[#0A1629] dark:text-white block mb-1">Quantity (shares)</label>
                  <input
                    type="number"
                    value={stockQuantity}
                    onChange={(e) => setStockQuantity(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-medium text-[#0A1629] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>

                <div>
                  <label className="font-medium text-[#0A1629] dark:text-white block mb-1">Holding period (years)</label>
                  <input
                    type="number"
                    min="1"
                    max="40"
                    value={holdingYears}
                    onChange={(e) => setHoldingYears(Number(e.target.value))}
                    className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-mono font-medium text-[#0A1629] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white dark:bg-[#111625] rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-medium text-blue-600 dark:text-blue-400 block mb-1">
                  Annualized growth rate (CAGR)
                </span>
                <p className="text-4xl font-bold font-mono text-[#0A1629] dark:text-white tracking-tight">
                  {stockResults.cagr}%
                </p>
                <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 block">
                  Compound annual growth rate
                </span>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-200/80 dark:border-slate-800 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Total capital deployed:</span>
                  <span className="font-mono font-medium text-[#0A1629] dark:text-white">₹{stockResults.totalBuy.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Total realized value:</span>
                  <span className="font-mono font-medium text-[#0A1629] dark:text-white">₹{stockResults.totalSell.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Absolute total return:</span>
                  <span className="font-mono font-semibold text-emerald-600 dark:text-emerald-400">+{stockResults.absoluteReturn}%</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800">
                  <span className="font-semibold text-[#0A1629] dark:text-white">Net capital profit:</span>
                  <span className="font-bold font-mono text-emerald-600 dark:text-emerald-400">+₹{stockResults.netProfit.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 text-xs text-blue-900 dark:text-blue-300 flex items-start gap-2.5">
                <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                <span><strong>CAGR vs Absolute:</strong> A 100% gain over 10 years is ~7.2% CAGR, while over 3 years it is ~26% CAGR. Always normalize with holding duration.</span>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════════════
            CALCULATOR 4: DIVIDEND RETURNS CALCULATOR
        ══════════════════════════════════════════════════════════════ */}
        {activeTab === 'dividend' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-white dark:bg-[#111625] rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-xs space-y-6">
              <h2 className="text-base font-semibold text-[#0A1629] dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800/80">
                Dividend Cashflow Variables
              </h2>

              <div className="space-y-5 text-xs">
                <div>
                  <div className="flex justify-between font-medium mb-1.5">
                    <span className="text-slate-600 dark:text-slate-400">Shares owned</span>
                    <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">{sharesOwned} Shares</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="5000"
                    step="10"
                    value={sharesOwned}
                    onChange={(e) => setSharesOwned(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-medium mb-1.5">
                    <span className="text-slate-600 dark:text-slate-400">Stock market price (₹)</span>
                    <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">₹{stockCurrentPrice}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="3000"
                    step="10"
                    value={stockCurrentPrice}
                    onChange={(e) => setStockCurrentPrice(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-medium mb-1.5">
                    <span className="text-slate-600 dark:text-slate-400">Annual dividend per share (₹)</span>
                    <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">₹{dividendPerShare} / share</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="150"
                    step="1"
                    value={dividendPerShare}
                    onChange={(e) => setDividendPerShare(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white dark:bg-[#111625] rounded-2xl p-6 sm:p-7 border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-6">
              <div>
                <span className="text-xs font-medium text-amber-600 dark:text-amber-400 block mb-1">
                  Annual passive dividend cashflow
                </span>
                <p className="text-4xl font-bold font-mono text-[#0A1629] dark:text-white tracking-tight">
                  ₹{dividendResults.annualDividend.toLocaleString('en-IN')}
                </p>
                <span className="text-xs font-medium text-amber-600 dark:text-amber-400 mt-1 block">
                  Dividend yield: {dividendResults.dividendYield}%
                </span>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-200/80 dark:border-slate-800 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Total portfolio cost:</span>
                  <span className="font-mono font-medium text-[#0A1629] dark:text-white">₹{dividendResults.totalInvestment.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500 dark:text-slate-400">5-year cumulative dividends:</span>
                  <span className="font-mono font-semibold text-amber-600 dark:text-amber-400">₹{dividendResults.fiveYearDividends.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800">
                  <span className="font-semibold text-[#0A1629] dark:text-white">Yield on initial cost:</span>
                  <span className="font-bold font-mono text-blue-600 dark:text-blue-400">{dividendResults.dividendYield}%</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-2.5">
                <PieChart className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <span><strong>DRIP strategy:</strong> Reinvesting dividends back into acquiring shares compounds cashflow exponentially over long investment horizons.</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
