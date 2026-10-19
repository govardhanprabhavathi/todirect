"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Compass, ShieldCheck } from "lucide-react";

const navLinks = [
  { label: "Curriculum", href: "#curriculum" },
  { label: "The Learning Journey", href: "#how-it-works" },
  { label: "AI Coach & Sandbox", href: "#platform" },
  { label: "Mastery Tracker", href: "#evidence" },
  { label: "Safety & Ethics", href: "#safety" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-dark py-2.5 shadow-float"
          : "bg-transparent py-4"
      }`}
    >
      <nav className="section-container flex items-center justify-between gap-6">
        {/* Brand Wordmark & Icon */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-8 h-8 rounded-xl bg-brand-blue flex items-center justify-center text-white shadow-glow-sm transition-transform duration-200 group-hover:scale-105">
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-display font-extrabold text-lg tracking-tight leading-none flex items-center gap-1.5">
              TO DIRECT
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-blue animate-pulse" />
            </span>
            <span className="text-[10px] text-neutral-400 font-medium tracking-widest uppercase">
              Learn Before You Invest
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-1 bg-neutral-900/60 p-1.5 rounded-full border border-neutral-700/60 backdrop-blur-md">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-semibold text-neutral-300 hover:text-white px-3.5 py-1.5 rounded-full transition-all duration-150 hover:bg-neutral-800"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Action Controls */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>₹10,000 Sandbox</span>
          </div>
          <Link
            href="#curriculum"
            className="btn-primary text-xs py-2 px-4 gap-1.5 rounded-xl font-bold"
          >
            Start Learning
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-white hover:bg-neutral-800 rounded-xl transition-colors border border-neutral-700"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-white" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div
        className={`lg:hidden fixed inset-0 top-[64px] z-40 bg-neutral-950/98 backdrop-blur-2xl transition-all duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col p-6 gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-base font-semibold text-neutral-200 hover:text-white py-3 px-4 rounded-xl hover:bg-neutral-900 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-6 flex flex-col gap-3 pt-6 border-t border-neutral-800">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/10 text-emerald-400 text-xs font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Risk-free simulated financial learning. Zero real money required.</span>
            </div>
            <Link
              href="#curriculum"
              onClick={() => setMobileOpen(false)}
              className="btn-primary w-full justify-center py-3 text-sm"
            >
              Explore Curriculum & Assessments
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
