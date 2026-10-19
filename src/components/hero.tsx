"use client";

import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  TrendingUp,
  Brain,
  Lock,
  Award,
} from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";
import { ParticleField } from "./particle-field";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-neutral-950">
      {/* Background glow & Particle field */}
      <div className="absolute inset-0 pointer-events-none">
        <ParticleField />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[650px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(37, 99, 255, 0.16) 0%, rgba(37, 99, 255, 0.05) 45%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(37, 99, 255, 0.3) 50%, transparent)",
          }}
        />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <ScrollReveal delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-blue/10 border border-brand-blue/30 text-brand-blue-soft text-xs font-semibold uppercase tracking-wider mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-brand-blue animate-ping" />
              FINANCIAL EDUCATION PLATFORM · ZERO REAL MONEY RISK
            </div>
          </ScrollReveal>

          {/* Headline */}
          <ScrollReveal delay={80}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight mb-6 font-display">
              Learn Before You{" "}
              <span className="text-gradient-accent">Invest.</span>
            </h1>
          </ScrollReveal>

          {/* Subheadline */}
          <ScrollReveal delay={160}>
            <p className="text-lg md:text-xl text-neutral-300 leading-relaxed max-w-2xl mx-auto mb-10 font-sans">
              Demonstrate genuine conceptual understanding before you risk real money. 
              Built for college students and complete beginners to master saving, diversification, 
              risk, and investment fundamentals through structured assessments and a safe ₹10,000 sandbox.
            </p>
          </ScrollReveal>

          {/* CTAs */}
          <ScrollReveal delay={240}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="#curriculum" className="btn-primary text-sm px-8 py-4 font-bold shadow-glow">
                Explore 7 Foundation Modules
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#how-it-works"
                className="btn-ghost-dark text-sm px-8 py-4 font-semibold"
              >
                The 6-Stage Learning Journey
              </Link>
            </div>
          </ScrollReveal>

          {/* Proof Badges */}
          <ScrollReveal delay={320}>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Deterministic Evidence Mastery</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-neutral-700 hidden sm:block" />
              <div className="flex items-center gap-1.5">
                <Brain className="w-4 h-4 text-brand-blue-light" />
                <span>AI Coach with Curriculum Guardrails</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-neutral-700 hidden sm:block" />
              <div className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-amber-400" />
                <span>₹10,000 Educational Sandbox Only</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Dashboard Preview Mockup */}
        <ScrollReveal delay={400} duration={800}>
          <div className="mt-16 md:mt-20 relative mx-auto max-w-5xl">
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-neutral-700/80 shadow-2xl bg-neutral-900">
              {/* App chrome bar */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-950 border-b border-neutral-800">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-neutral-800" />
                    <div className="w-3 h-3 rounded-full bg-neutral-800" />
                    <div className="w-3 h-3 rounded-full bg-neutral-800" />
                  </div>
                  <span className="text-xs text-neutral-400 font-mono ml-3 font-semibold">
                    app.todirect.edu / learner-dashboard
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-blue/20 text-brand-blue-light border border-brand-blue/30">
                    STAGE: TEST → TRACK
                  </span>
                </div>
              </div>

              {/* Inside Learner Dashboard UI */}
              <div className="p-6 md:p-8 bg-neutral-900 text-left">
                {/* Header row */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs uppercase font-bold text-brand-blue-light tracking-wider">
                        Learner Profile · Year 2 College Student
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-400">
                        Level 3 · Consistent Learner
                      </span>
                    </div>
                    <h2 className="text-xl md:text-2xl font-bold text-white font-display">
                      Welcome back, Aarav!
                    </h2>
                    <p className="text-xs text-neutral-400">
                      Overall Evidence Mastery: <strong className="text-emerald-400 font-semibold">78%</strong> across 7 core foundation modules
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-neutral-800/80 rounded-xl px-4 py-2 border border-neutral-700">
                      <span className="text-[10px] text-neutral-400 block uppercase">Sandbox Balance</span>
                      <span className="text-base font-bold text-white font-mono">₹10,480.00</span>
                    </div>
                    <div className="bg-neutral-800/80 rounded-xl px-4 py-2 border border-neutral-700">
                      <span className="text-[10px] text-neutral-400 block uppercase">Active Streak</span>
                      <span className="text-base font-bold text-amber-400">🔥 6 Days</span>
                    </div>
                  </div>
                </div>

                {/* 3 Interactive Cards inside Preview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  {/* Card 1: Next Action */}
                  <div className="bg-neutral-800/60 rounded-2xl p-4 border border-neutral-700/80">
                    <div className="flex items-center justify-between text-xs text-brand-blue-light font-semibold mb-2">
                      <span>RECOMMENDED NEXT</span>
                      <span className="text-[10px] bg-brand-blue/20 px-2 py-0.5 rounded">High Priority</span>
                    </div>
                    <h3 className="text-sm font-bold text-white mb-1">
                      Module 4: Risk vs Return
                    </h3>
                    <p className="text-xs text-neutral-400 mb-3">
                      Detected misconception on volatility vs capital permanent loss. Complete 2 review questions to advance.
                    </p>
                    <div className="w-full bg-neutral-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-brand-blue h-full w-[65%]" />
                    </div>
                  </div>

                  {/* Card 2: AI Coach Finn Alert */}
                  <div className="bg-neutral-800/60 rounded-2xl p-4 border border-brand-blue/30 relative overflow-hidden">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-lg bg-brand-blue flex items-center justify-center text-white text-xs font-bold">
                        F
                      </div>
                      <span className="text-xs font-bold text-white">Finn · AI Learning Guide</span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 rounded ml-auto">Grounded</span>
                    </div>
                    <p className="text-xs text-neutral-300 italic bg-neutral-900/60 p-2.5 rounded-xl border border-neutral-800">
                      &ldquo;Remember Aarav: higher past returns don&apos;t guarantee safety. Let&apos;s check what diversification actually does!&rdquo;
                    </p>
                  </div>

                  {/* Card 3: Portfolio Sandbox */}
                  <div className="bg-neutral-800/60 rounded-2xl p-4 border border-neutral-700/80">
                    <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                      <span className="font-semibold text-white">Simulated Holdings</span>
                      <span className="text-[10px] text-emerald-400 font-mono">+4.8% demo</span>
                    </div>
                    <div className="space-y-1.5 text-xs">
                      <div className="flex justify-between text-neutral-300">
                        <span>Nifty 50 Broad Index</span>
                        <span className="font-mono text-white">₹6,000 (57%)</span>
                      </div>
                      <div className="flex justify-between text-neutral-300">
                        <span>Sovereign Gold Bond</span>
                        <span className="font-mono text-white">₹2,500 (24%)</span>
                      </div>
                      <div className="flex justify-between text-neutral-300">
                        <span>Liquid Cash Sandbox</span>
                        <span className="font-mono text-emerald-400">₹1,980 (19%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Glowing Backdrop */}
            <div
              className="absolute -inset-4 -z-10 blur-3xl opacity-25 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(37, 99, 255, 0.4), transparent 70%)",
              }}
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
