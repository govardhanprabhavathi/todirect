'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/brand/Logo';
import { 
  LayoutDashboard, 
  BookOpen, 
  Sliders, 
  Award, 
  Bot, 
  Settings, 
  Flame, 
  Sparkles,
  ChevronRight,
  LogOut,
  X,
  Send
} from 'lucide-react';
import { useAppState } from '@/lib/store';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

interface AppShellProps {
  children: React.ReactNode;
}

const navItems = [
  { href: '/app', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/app/learn', label: 'Curriculum', icon: BookOpen },
  { href: '/app/progress', label: 'Understanding', icon: Award },
  { href: '/app/practice', label: '₹10K Sandbox', icon: Sliders },
  { href: '/app/coach', label: 'Finn AI Coach', icon: Bot },
  { href: '/app/settings', label: 'Settings', icon: Settings }
];

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const { state, addChatMessage } = useAppState();
  const [finnOpen, setFinnOpen] = useState(false);
  const [inputMsg, setInputMsg] = useState('');

  const handleSendFinn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    const userText = inputMsg;
    setInputMsg('');
    addChatMessage('user', userText);

    setTimeout(() => {
      let reply = "That is a great question. Let us think about the underlying financial principle: are you considering real purchasing power after inflation and taxes?";
      if (userText.toLowerCase().includes('fd') || userText.toLowerCase().includes('fixed deposit')) {
        reply = "A fixed deposit provides capital safety, but remember to subtract inflation (approx 6%) and tax on interest. What is your net real return?";
      } else if (userText.toLowerCase().includes('nifty') || userText.toLowerCase().includes('index')) {
        reply = "A Nifty 50 index fund gives you instant diversification across the top 50 companies in India with ultra-low expense ratios (under 0.1%). It requires a 5+ year horizon to ride out volatility.";
      } else if (userText.toLowerCase().includes('crypto') || userText.toLowerCase().includes('penny')) {
        reply = "Remember our core educational principle: high speculative promises usually conceal asymmetric downside. Have you secured your 6-month liquid emergency fund first?";
      }
      addChatMessage('finn', reply);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#070A11] text-[#0A1629] dark:text-[#F8FAFC] flex antialiased transition-colors duration-200">
      {/* Desktop Left Sidebar */}
      <aside className="hidden lg:flex w-64 flex-col justify-between border-r border-slate-200/80 dark:border-slate-800 bg-white dark:bg-[#0B0F19] p-5 sticky top-0 h-screen shrink-0 transition-colors">
        <div className="space-y-6">
          {/* Logo & Theme Toggle Header */}
          <div className="flex items-center justify-between px-1 pt-1">
            <Logo size="md" />
            <ThemeToggle />
          </div>

          {/* Current Stage Capsule */}
          <div className="p-3 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#2563FF] animate-pulse" />
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">Stage: {state.profile.stage}</span>
            </div>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-200 dark:bg-blue-900/80 text-blue-800 dark:text-blue-300 uppercase">
              {state.profile.overallMastery}% Mastery
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== '/app' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#0A1629] dark:bg-white text-white dark:text-[#0A1629] shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-[#0A1629] dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-70" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Profile & Finn Quick Launcher */}
        <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
          {/* Mini Finn Trigger Card */}
          <button
            onClick={() => setFinnOpen(true)}
            className="w-full p-3 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-100 dark:border-blue-900/40 flex items-center gap-3 text-left hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-[#2563FF] text-white flex items-center justify-center font-bold shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-[#0A1629] dark:text-white truncate">Ask Finn Coach</p>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">Concept clarity in 1 click</p>
            </div>
          </button>

          {/* Learner Profile Capsule */}
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#2563FF] text-white font-bold flex items-center justify-center text-xs">
                {state.profile.name.charAt(0)}
              </div>
              <div>
                <p className="text-xs font-semibold text-[#0A1629] dark:text-white">{state.profile.name}</p>
                <div className="flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                  <Flame className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <span>{state.profile.streakDays} day streak</span>
                </div>
              </div>
            </div>

            <Link href="/" title="Sign Out" className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-8">
        {/* Top Header Mobile */}
        <header className="lg:hidden sticky top-0 z-30 bg-[#FAF8F5]/90 dark:bg-[#070A11]/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-3 flex items-center justify-between transition-colors">
          <Logo size="sm" />
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="flex items-center gap-1 text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-900/50">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{state.profile.streakDays}d</span>
            </div>
            <button
              onClick={() => setFinnOpen(true)}
              className="p-2 rounded-xl bg-[#2563FF] text-white"
              aria-label="Open Finn AI Coach"
            >
              <Bot className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#0B0F19]/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-3 py-2 flex items-center justify-around transition-colors">
        {navItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 p-1.5 rounded-xl text-[10px] font-medium ${
                isActive ? 'text-[#2563FF] dark:text-[#60A5FA]' : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Floating Finn AI Quick Drawer */}
      {finnOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-white dark:bg-[#0B0F19] h-full shadow-2xl flex flex-col justify-between animate-slideLeft border-l dark:border-slate-800">
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-[#FAF8F5] dark:bg-[#070A11]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#2563FF] text-white flex items-center justify-center font-bold">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#0A1629] dark:text-white">Finn AI Coach</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Socratic guidance • No stock tips</p>
                </div>
              </div>
              <button
                onClick={() => setFinnOpen(false)}
                className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400"
                aria-label="Close Finn"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {state.finnChat.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#0A1629] dark:bg-[#1E293B] text-white rounded-tr-sm'
                        : 'bg-blue-50/80 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 text-[#0A1629] dark:text-slate-200 rounded-tl-sm'
                    }`}
                  >
                    {msg.text}
                    <p className={`text-[10px] mt-1 ${msg.sender === 'user' ? 'text-slate-400' : 'text-slate-400'}`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSendFinn} className="p-3 border-t border-slate-200 dark:border-slate-800 bg-[#FAF8F5] dark:bg-[#070A11] flex gap-2">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Ask Finn about compounding, inflation..."
                className="flex-1 px-4 py-2.5 rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-[#0A1629] dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <button
                type="submit"
                className="w-10 h-10 rounded-full bg-[#2563FF] text-white flex items-center justify-center shrink-0 hover:bg-[#1748D8] transition-colors"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
