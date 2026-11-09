'use client';

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { useAppState } from '@/lib/store';
import { Bot, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';

const promptPills = [
  'Explain the Rule of 72 with an example',
  'What is real return vs nominal return?',
  'Why is putting all savings in an 8% FD risky with inflation?',
  'Evaluate my ₹10,000 portfolio diversification',
  'Why are penny stocks considered dangerous traps?'
];

export default function FinnCoachPage() {
  const { state, addChatMessage } = useAppState();
  const [inputText, setInputText] = useState('');

  const sendQuestion = (text: string) => {
    if (!text.trim()) return;
    addChatMessage('user', text);
    setInputText('');

    setTimeout(() => {
      let reply = "That is an essential financial concept. Let us break it down into core principles: what is your time horizon, and how does purchasing power factor in?";
      const lower = text.toLowerCase();

      if (lower.includes('72')) {
        reply = "The Rule of 72 is an intuitive mental shortcut: divide 72 by your annual interest rate to find the approximate doubling time. For example, at 12% annual return, your money doubles in ~6 years (72 ÷ 12 = 6). At 6%, it takes 12 years. Notice how a 2x higher return produces 4x more wealth over 24 years!";
      } else if (lower.includes('real') || lower.includes('nominal')) {
        reply = "Nominal return is the raw percentage increase printed on your account statement (e.g. 7% in an FD). Real return is what is left after deducting inflation and taxes. If inflation is 6% and taxes take 1.4%, your real return is -0.4%—you are quietly losing purchasing power!";
      } else if (lower.includes('fd') || lower.includes('fixed deposit')) {
        reply = "Fixed deposits are great for short-term liquidity (like an emergency buffer for the next 12 months), but for a 15-year horizon, inflation will systematically erode the purchasing power of cash. That is why combining debt with index equities is vital.";
      } else if (lower.includes('penny') || lower.includes('cheap')) {
        reply = "A ₹20 share price does not mean the stock is 'cheap'! Price tells you nothing without looking at outstanding shares, earnings, and valuation. Penny stocks usually suffer from illiquidity, opaque financial reporting, and high operator manipulation.";
      } else if (lower.includes('diversification') || lower.includes('portfolio')) {
        const holdingsCount = state.portfolio.holdings.length;
        reply = `You currently have ₹${state.portfolio.cashBalance.toLocaleString('en-IN')} in cash and ${holdingsCount} active positions. To maintain prudent diversification, ensure your equity exposure does not exceed 60-70% if you are a beginner, and always maintain an emergency cash buffer!`;
      }

      addChatMessage('finn', reply);
    }, 600);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuestion(inputText);
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-blue-600 dark:text-blue-400">
                <Bot className="w-3.5 h-3.5" />
                Socratic AI companion
              </span>
              <span className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-900/50 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Grounded in syllabus
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-tight">
              Meet Finn, Your Learning Coach
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Interactive Socratic dialogue that probes high-yield promises and builds first-principles judgment without stock tips
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400 bg-white dark:bg-[#111625] px-3 py-1.5 rounded-lg border border-slate-200/80 dark:border-slate-800 self-start sm:self-auto shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Anti-speculation guardrails</span>
          </div>
        </div>

        {/* Suggestion Chips */}
        <div className="space-y-1.5">
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Suggested discussion probes:</span>
          <div className="flex flex-wrap gap-2">
            {promptPills.map((pill, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => sendQuestion(pill)}
                className="text-xs font-medium px-3 py-1.5 rounded-lg bg-white dark:bg-[#111625] border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-blue-500 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors shadow-2xs cursor-pointer"
              >
                {pill}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Window Container */}
        <div className="bg-white dark:bg-[#111625] rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs flex flex-col h-[540px] overflow-hidden">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {state.finnChat.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-xl px-4 py-3 text-xs sm:text-sm leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-sm'
                      : 'bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-sm'
                  }`}
                >
                  {msg.sender === 'finn' && (
                    <div className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold text-xs mb-1">
                      <Bot className="w-3.5 h-3.5" />
                      Finn Coach
                    </div>
                  )}
                  {msg.text}
                  <div className={`text-[10px] mt-1.5 font-mono ${msg.sender === 'user' ? 'text-blue-100' : 'text-slate-400 dark:text-slate-500'}`}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSubmit} className="p-3.5 border-t border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 flex gap-2.5">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask Finn about cashflow, compounding, inflation, risk..."
              className="flex-1 px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 bg-white dark:bg-[#111625] text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors cursor-pointer shadow-xs shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
              Ask Finn
            </button>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
