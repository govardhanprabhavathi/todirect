'use client';

import React from 'react';
import Link from 'next/link';
import { Logo } from '@/components/brand/Logo';
import { ShieldCheck, Lock, Award, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#FAF8F5] dark:bg-[#070A11] border-t border-slate-200/80 dark:border-slate-800 text-[#475569] dark:text-slate-400 pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-slate-200/70 dark:border-slate-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" />
            <p className="text-sm font-normal text-[#475569] dark:text-slate-400 max-w-sm leading-relaxed mt-2">
              TO DIRECT is a premium financial education platform for college students, beginners, and young professionals. Our mission is simple: learn before you invest.
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Strictly educational • SEBI non-advisory compliant</span>
            </div>
          </div>

          {/* Column 2: 7 Curriculum Topics */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0A1629] dark:text-[#F8FAFC] mb-4">
              Curriculum
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/curriculum" className="text-[#475569] dark:text-slate-400 hover:text-[#0A1629] dark:hover:text-[#F8FAFC] transition-colors">
                  1. Money Foundations
                </Link>
              </li>
              <li>
                <Link href="/curriculum" className="text-[#475569] dark:text-slate-400 hover:text-[#0A1629] dark:hover:text-[#F8FAFC] transition-colors">
                  2. Saving & Compounding
                </Link>
              </li>
              <li>
                <Link href="/curriculum" className="text-[#475569] dark:text-slate-400 hover:text-[#0A1629] dark:hover:text-[#F8FAFC] transition-colors">
                  3. Inflation & Purchasing Power
                </Link>
              </li>
              <li>
                <Link href="/curriculum" className="text-[#475569] dark:text-slate-400 hover:text-[#0A1629] dark:hover:text-[#F8FAFC] transition-colors">
                  4. Investment Vehicles
                </Link>
              </li>
              <li>
                <Link href="/curriculum" className="text-[#475569] dark:text-slate-400 hover:text-[#0A1629] dark:hover:text-[#F8FAFC] transition-colors">
                  5. Risk & Diversification
                </Link>
              </li>
              <li>
                <Link href="/curriculum" className="text-[#475569] dark:text-slate-400 hover:text-[#0A1629] dark:hover:text-[#F8FAFC] transition-colors">
                  6. Mutual Funds & ETFs
                </Link>
              </li>
              <li>
                <Link href="/curriculum" className="text-[#475569] dark:text-slate-400 hover:text-[#0A1629] dark:hover:text-[#F8FAFC] transition-colors">
                  7. Stock Markets & Psychology
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Platform Tools */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0A1629] dark:text-[#F8FAFC] mb-4">
              Platform Tools
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/how-it-works" className="text-[#475569] dark:text-slate-400 hover:text-[#0A1629] dark:hover:text-[#F8FAFC] transition-colors">
                  The 6-Stage Journey
                </Link>
              </li>
              <li>
                <Link href="/practice" className="text-[#475569] dark:text-slate-400 hover:text-[#0A1629] dark:hover:text-[#F8FAFC] transition-colors">
                  ₹10,000 Sandbox
                </Link>
              </li>
              <li>
                <Link href="/sign-in" className="text-[#475569] dark:text-slate-400 hover:text-[#0A1629] dark:hover:text-[#F8FAFC] transition-colors">
                  Misconception Engine
                </Link>
              </li>
              <li>
                <Link href="/sign-in" className="text-[#475569] dark:text-slate-400 hover:text-[#0A1629] dark:hover:text-[#F8FAFC] transition-colors">
                  Finn AI Companion
                </Link>
              </li>
              <li>
                <Link href="/sign-in" className="text-[#475569] dark:text-slate-400 hover:text-[#0A1629] dark:hover:text-[#F8FAFC] transition-colors">
                  Baseline Diagnostic
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Trust & Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#0A1629] dark:text-[#F8FAFC] mb-4">
              Trust & Legal
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link href="/about" className="text-[#475569] dark:text-slate-400 hover:text-[#0A1629] dark:hover:text-[#F8FAFC] transition-colors">
                  Pedagogical Charter
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-[#475569] dark:text-slate-400 hover:text-[#0A1629] dark:hover:text-[#F8FAFC] transition-colors">
                  Privacy Policy (DPDP Act)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-[#475569] dark:text-slate-400 hover:text-[#0A1629] dark:hover:text-[#F8FAFC] transition-colors">
                  Terms of Education
                </Link>
              </li>
              <li>
                <Link href="/privacy#deletion" className="text-[#475569] dark:text-slate-400 hover:text-[#0A1629] dark:hover:text-[#F8FAFC] transition-colors">
                  Account Deletion
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-[#475569] dark:text-slate-400 hover:text-[#0A1629] dark:hover:text-[#F8FAFC] transition-colors">
                  Curriculum Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Disclaimer Footer Note */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p className="text-center md:text-left leading-relaxed">
            &copy; {new Date().getFullYear()} TO DIRECT Inc. All rights reserved. <br className="hidden sm:inline" />
            <span className="text-[11px] text-slate-400 dark:text-slate-500">
              Disclaimer: TO DIRECT is an educational simulation platform. It does not provide registered investment advice, stock tips, or broker services. Simulated gains in the ₹10,000 sandbox do not guarantee real-world returns.
            </span>
          </p>
          <div className="flex items-center gap-6 shrink-0">
            <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms</Link>
            <Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Safety</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
