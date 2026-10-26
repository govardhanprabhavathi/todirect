'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, ArrowRight, Sparkles, BookOpen, ShieldCheck, Compass, Bot } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bannerOpen, setBannerOpen] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="sticky top-0 z-50 w-full">
      {/* ─── TOP ANNOUNCEMENT BANNER ─── */}
      {bannerOpen && (
        <div className="bg-[#D9EDFC] dark:bg-white border-b border-[#C3E0FA] dark:border-slate-200 text-[#0A1629] dark:text-[#0A1629] text-xs py-2 px-4 transition-colors shadow-2xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex-1 flex items-center justify-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#2563FF] dark:text-[#2563FF] shrink-0" />
              <span className="font-medium text-[#0A1629] dark:text-[#0A1629]">
                Introducing the new TO DIRECT, built to handle all of the foundational work around money and investing.
              </span>
              <Link
                href="/curriculum"
                className="hidden sm:inline-flex items-center gap-1 font-semibold text-[#0A1629] dark:text-[#0A1629] bg-white/80 dark:bg-slate-100 hover:bg-white dark:hover:bg-slate-200 px-2.5 py-0.5 rounded-full border border-[#B8DAF7] dark:border-slate-300 transition-colors text-[11px]"
              >
                Learn more &rarr;
              </Link>
            </div>

            <button
              onClick={() => setBannerOpen(false)}
              className="p-1 text-[#0A1629]/60 dark:text-[#0A1629]/70 hover:text-[#0A1629] dark:hover:text-[#0A1629] rounded-md transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* ─── MAIN CLEAN NAVBAR ─── */}
      <nav
        className={`w-full transition-all duration-300 border-b ${
          scrolled
            ? 'bg-[#FAF8F5]/90 dark:bg-[#070A11]/90 backdrop-blur-md border-slate-200/80 dark:border-slate-800 shadow-xs py-3.5'
            : 'bg-[#FAF8F5] dark:bg-[#070A11] border-slate-200/50 dark:border-slate-800/60 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <Logo size="md" />

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="/curriculum"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#0A1629] dark:hover:text-white transition-colors"
            >
              Curriculum
            </Link>
            <Link
              href="/how-it-works"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#0A1629] dark:hover:text-white transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="/practice"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#0A1629] dark:hover:text-white transition-colors"
            >
              ₹10K Sandbox
            </Link>
            <Link
              href="/about"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#0A1629] dark:hover:text-white transition-colors"
            >
              Pedagogy & Ethics
            </Link>
          </div>

          {/* Desktop Auth CTAs & Theme Toggle */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <ThemeToggle />

            <Link
              href="/about"
              className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#0A1629] dark:hover:text-white transition-colors mr-1"
            >
              Talk to educators
            </Link>
            <Link href="/sign-in">
              <button
                type="button"
                className="inline-flex items-center justify-center px-5 py-2 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-[#0A1629] dark:text-slate-200 text-sm font-medium transition-all shadow-2xs"
              >
                Log in
              </button>
            </Link>
            <Link href="/sign-in">
              <button
                type="button"
                className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-[#0A1629] dark:bg-white hover:bg-[#1E293B] dark:hover:bg-slate-100 text-white dark:text-[#0A1629] text-sm font-medium transition-all shadow-xs"
              >
                Get started for free
              </button>
            </Link>
          </div>

          {/* Mobile Right Controls: Theme Toggle & Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white dark:bg-[#0B0F19] border-b border-slate-200 dark:border-slate-800 px-4 pt-4 pb-6 space-y-4 shadow-xl">
            <div className="flex flex-col space-y-3">
              <Link
                href="/curriculum"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"
              >
                Curriculum
              </Link>
              <Link
                href="/how-it-works"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"
              >
                How It Works
              </Link>
              <Link
                href="/practice"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"
              >
                ₹10K Sandbox
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl"
              >
                Pedagogy & Ethics
              </Link>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5">
              <Link href="/sign-in" onClick={() => setMobileOpen(false)} className="w-full">
                <Button variant="outline" size="md" className="w-full rounded-full dark:bg-slate-900 dark:border-slate-700 dark:text-white">
                  Log in
                </Button>
              </Link>
              <Link href="/sign-in" onClick={() => setMobileOpen(false)} className="w-full">
                <Button variant="primaryDark" size="md" className="w-full rounded-full dark:bg-white dark:text-[#0A1629]">
                  Get started free &rarr;
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
