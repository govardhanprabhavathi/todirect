'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { Button } from '@/components/ui/Button';
import { SANDBOX_INSTRUMENTS, SandboxInstrument } from '@/lib/data';
import { useAppState } from '@/lib/store';
import { 
  Sliders, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  Plus, 
  ArrowUpRight, 
  ArrowDownRight, 
  X, 
  CheckCircle2, 
  Sparkles,
  PieChart
} from 'lucide-react';

export default function AppPracticeSandbox() {
  const { state, executeTrade } = useAppState();
  const [modalOpen, setModalOpen] = useState(false);
  const [tradeType, setTradeType] = useState<'BUY' | 'SELL'>('BUY');
  const [selectedInstrumentId, setSelectedInstrumentId] = useState(SANDBOX_INSTRUMENTS[0].id);
  const [units, setUnits] = useState(1);
  const [rationale, setRationale] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const currentInstrument = SANDBOX_INSTRUMENTS.find((i) => i.id === selectedInstrumentId) || SANDBOX_INSTRUMENTS[0];
  const totalCost = units * currentInstrument.price;

  // Calculate holdings value
  const holdingsValue = state.portfolio.holdings.reduce((acc, h) => {
    const inst = SANDBOX_INSTRUMENTS.find((i) => i.id === h.instrumentId);
    const price = inst ? inst.price : h.avgBuyPrice;
    return acc + h.units * price;
  }, 0);

  const totalPortfolioValue = state.portfolio.cashBalance + holdingsValue;

  // Check for concentration risk (> 60% in one equity)
  let concentrationRiskAlert = false;
  let concentratedName = '';
  for (const h of state.portfolio.holdings) {
    const inst = SANDBOX_INSTRUMENTS.find((i) => i.id === h.instrumentId);
    if (inst && (inst.category === 'equity')) {
      const val = h.units * inst.price;
      if (totalPortfolioValue > 0 && (val / totalPortfolioValue) > 0.6) {
        concentrationRiskAlert = true;
        concentratedName = inst.name;
        break;
      }
    }
  }

  const handleExecuteTrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (units <= 0) return;

    if (tradeType === 'BUY' && state.portfolio.cashBalance < totalCost) {
      alert('Insufficient virtual cash balance for this order.');
      return;
    }

    if (tradeType === 'SELL') {
      const owned = state.portfolio.holdings.find((h) => h.instrumentId === selectedInstrumentId);
      if (!owned || owned.units < units) {
        alert('You do not own enough units to sell.');
        return;
      }
    }

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

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Interactive Simulation
            </span>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-tight mt-1">
              ₹10,000 Portfolio Sandbox
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Real market proxies • Zero real rupee risk • Practice disciplined asset allocation
            </p>
          </div>

          <Button
            onClick={() => {
              setTradeType('BUY');
              setModalOpen(true);
            }}
            variant="primaryDark"
            size="md"
            className="rounded-full px-6 text-xs font-bold shadow-sm"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            New Simulation Order
          </Button>
        </div>

        {/* Concentration Alert Banner */}
        {concentrationRiskAlert && (
          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-amber-900 dark:text-amber-200 flex items-start gap-3 text-xs sm:text-sm animate-fadeIn">
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">High Concentration Warning</p>
              <p className="mt-0.5 text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                Over 60% of your portfolio is concentrated in <strong>{concentratedName}</strong>. As covered in Module 5, single-asset concentration exposes you to sharp unsystematic volatility. Consider allocating to fixed deposits or sovereign bonds.
              </p>
            </div>
          </div>
        )}

        {/* Portfolio Valuation Bento */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Total Portfolio Value
            </span>
            <p className="text-2xl sm:text-3xl font-semibold text-[#0A1629] dark:text-[#F8FAFC]">
              ₹{totalPortfolioValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Capital Base: ₹10,000</span>
            </div>
          </div>

          <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Available Cash
            </span>
            <p className="text-2xl sm:text-3xl font-semibold text-[#0A1629] dark:text-[#F8FAFC]">
              ₹{state.portfolio.cashBalance.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
              {((state.portfolio.cashBalance / totalPortfolioValue) * 100).toFixed(1)}% of total capital
            </p>
          </div>

          <div className="bg-white dark:bg-[#111625] rounded-2xl p-6 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Invested Holdings
            </span>
            <p className="text-2xl sm:text-3xl font-semibold text-[#0A1629] dark:text-[#F8FAFC]">
              ₹{holdingsValue.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 pt-1">
              {state.portfolio.holdings.length} active positions
            </p>
          </div>
        </div>

        {/* Active Holdings Table */}
        <div className="bg-white dark:bg-[#111625] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-[#0A1629] dark:text-[#F8FAFC]">Current Portfolio Holdings</h2>

          {state.portfolio.holdings.length === 0 ? (
            <div className="py-8 text-center text-slate-400 dark:text-slate-500 text-xs">
              You currently hold 100% cash. Click "New Simulation Order" above to place your first trade!
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3">Asset</th>
                    <th className="py-3 px-3">Units</th>
                    <th className="py-3 px-3">Avg Buy Price</th>
                    <th className="py-3 px-3">Current Price</th>
                    <th className="py-3 px-3">Current Value</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {state.portfolio.holdings.map((h) => {
                    const inst = SANDBOX_INSTRUMENTS.find((i) => i.id === h.instrumentId);
                    const curPrice = inst ? inst.price : h.avgBuyPrice;
                    const val = h.units * curPrice;
                    const profit = val - (h.units * h.avgBuyPrice);

                    return (
                      <tr key={h.instrumentId} className="hover:bg-slate-50/50 dark:hover:bg-[#0B0F19]/50 transition-colors">
                        <td className="py-3.5 px-3">
                          <p className="font-bold text-[#0A1629] dark:text-[#F8FAFC]">{inst?.name || h.instrumentId}</p>
                          <span className="text-[10px] uppercase font-mono font-semibold text-slate-400 dark:text-slate-500">
                            {inst?.ticker}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 font-semibold text-slate-700 dark:text-slate-300">{h.units}</td>
                        <td className="py-3.5 px-3 font-mono text-slate-600 dark:text-slate-400">₹{h.avgBuyPrice.toFixed(2)}</td>
                        <td className="py-3.5 px-3 font-mono font-semibold text-[#0A1629] dark:text-[#F8FAFC]">₹{curPrice.toFixed(2)}</td>
                        <td className="py-3.5 px-3">
                          <span className="font-bold font-mono text-[#0A1629] dark:text-[#F8FAFC]">₹{val.toFixed(2)}</span>
                          <span className={`block text-[10px] font-semibold ${profit >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                            {profit >= 0 ? '+' : ''}₹{profit.toFixed(2)}
                          </span>
                        </td>
                        <td className="py-3.5 px-3 text-right">
                          <Button
                            onClick={() => {
                              setSelectedInstrumentId(h.instrumentId);
                              setTradeType('SELL');
                              setUnits(Math.min(1, h.units));
                              setModalOpen(true);
                            }}
                            variant="outline"
                            size="sm"
                            className="rounded-full text-[11px] font-bold bg-white dark:bg-[#111625] dark:border-slate-800"
                          >
                            Sell
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Trade History Log */}
        <div className="bg-white dark:bg-[#111625] rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-[#0A1629] dark:text-[#F8FAFC]">Trade Execution & Rationale Log</h2>
          <div className="space-y-2.5">
            {state.portfolio.trades.map((tr) => (
              <div
                key={tr.id}
                className="p-3.5 rounded-2xl bg-[#FAF8F5] dark:bg-[#0B0F19] border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        tr.type === 'BUY'
                          ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                          : 'bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                      }`}
                    >
                      {tr.type}
                    </span>
                    <span className="font-bold text-[#0A1629] dark:text-[#F8FAFC]">{tr.instrumentName}</span>
                    <span className="text-slate-400 dark:text-slate-500">({tr.units} units @ ₹{tr.price.toFixed(2)})</span>
                  </div>
                  {tr.rationale && (
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 italic">
                      Rationale: "{tr.rationale}"
                    </p>
                  )}
                </div>

                <div className="text-right shrink-0">
                  <span className="font-bold font-mono text-[#0A1629] dark:text-[#F8FAFC]">₹{tr.total.toFixed(2)}</span>
                  <span className="block text-[10px] text-slate-400 dark:text-slate-500">{tr.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Order Execution Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-white dark:bg-[#111625] rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 animate-fadeIn space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-lg font-bold text-[#0A1629] dark:text-[#F8FAFC]">Execute Sandbox Order</h3>
                </div>
                <button
                  onClick={() => setModalOpen(false)}
                  className="p-1 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {successMsg ? (
                <div className="py-6 text-center space-y-2">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
                  <p className="text-sm font-bold text-[#0A1629] dark:text-[#F8FAFC]">{successMsg}</p>
                </div>
              ) : (
                <form onSubmit={handleExecuteTrade} className="space-y-4">
                  {/* Buy / Sell Toggle Tabs */}
                  <div className="flex rounded-full bg-slate-100 dark:bg-slate-800 p-1">
                    <button
                      type="button"
                      onClick={() => setTradeType('BUY')}
                      className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all ${
                        tradeType === 'BUY'
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-[#0A1629] dark:hover:text-[#F8FAFC]'
                      }`}
                    >
                      BUY
                    </button>
                    <button
                      type="button"
                      onClick={() => setTradeType('SELL')}
                      className={`flex-1 py-1.5 rounded-full text-xs font-bold transition-all ${
                        tradeType === 'SELL'
                          ? 'bg-rose-600 text-white shadow-sm'
                          : 'text-slate-600 dark:text-slate-400 hover:text-[#0A1629] dark:hover:text-[#F8FAFC]'
                      }`}
                    >
                      SELL
                    </button>
                  </div>

                  {/* Instrument Selector */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Select Financial Instrument
                    </label>
                    <select
                      value={selectedInstrumentId}
                      onChange={(e) => setSelectedInstrumentId(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-medium bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    >
                      {SANDBOX_INSTRUMENTS.map((inst) => (
                        <option key={inst.id} value={inst.id}>
                          {inst.name} (₹{inst.price.toFixed(2)})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Units input */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Units / Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={units}
                      onChange={(e) => setUnits(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-800 text-sm font-mono font-bold bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Required Reflection Rationale */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Trade Rationale (Required Reflection)
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={rationale}
                      onChange={(e) => setRationale(e.target.value)}
                      placeholder="Why are you making this trade? e.g. Adding gold to hedge inflation volatility..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs bg-white dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                    />
                  </div>

                  {/* Summary Box */}
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0B0F19] border border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400 font-medium">Estimated Total Cost:</span>
                    <span className="font-bold font-mono text-[#0A1629] dark:text-[#F8FAFC] text-sm">
                      ₹{totalCost.toFixed(2)}
                    </span>
                  </div>

                  <Button
                    type="submit"
                    variant={tradeType === 'BUY' ? 'primaryDark' : 'danger'}
                    size="md"
                    className="w-full rounded-full text-xs font-bold py-3"
                  >
                    Confirm {tradeType} Simulation Order &rarr;
                  </Button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
