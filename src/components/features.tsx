"use client";

import {
  Wallet,
  PieChart,
  TrendingDown,
  Layers,
  ShieldAlert,
  Coins,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

const curriculumModules = [
  {
    number: "01",
    title: "Money Fundamentals & Cash Flow",
    badge: "Core Basics",
    description:
      "Understand where money goes before it grows. Needs vs. wants, emergency buffers, inflation, and cash-flow discipline tailored for students.",
    icon: Wallet,
    accent: false,
  },
  {
    number: "02",
    title: "Inflation & The Time Value of Money",
    badge: "Foundational",
    description:
      "Why ₹1,000 today is not ₹1,000 tomorrow. Master compounding growth, real vs. nominal returns, and the stealth tax of purchasing power decay.",
    icon: Coins,
    accent: false,
  },
  {
    number: "03",
    title: "Asset Classes Demystified",
    badge: "Essential",
    description:
      "Equities, debt, gold, mutual funds, and fixed deposits. Understand how each behaves across market cycles without marketing jargon.",
    icon: Layers,
    accent: true,
  },
  {
    number: "04",
    title: "Risk, Volatility & Capital Preservation",
    badge: "Risk Literacy",
    description:
      "Volatility is not the same as permanent capital loss. Decode your risk capacity, investment horizon, and psychological drawdown tolerance.",
    icon: ShieldAlert,
    accent: false,
  },
  {
    number: "05",
    title: "Diversification & Asset Allocation",
    badge: "Portfolio Craft",
    description:
      "The only free lunch in investing. Why you never put all eggs in one basket and how non-correlated assets protect your long-term wealth.",
    icon: PieChart,
    accent: true,
  },
  {
    number: "06",
    title: "Common Beginner Pitfalls & Scams",
    badge: "Investor Safety",
    description:
      "Recognize pump-and-dump telegram tips, speculative options traps, get-rich-quick lures, and the dangerous illusion of overnight trading glory.",
    icon: TrendingDown,
    accent: false,
  },
];

export function Features() {
  return (
    <section id="curriculum" className="py-24 md:py-32 bg-neutral-950 text-white">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <ScrollReveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue/15 text-brand-blue-light border border-brand-blue/30 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              THE 7-TOPIC FOUNDATION CURRICULUM
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-3xl md:text-5xl font-semibold text-white mb-5 font-display tracking-tight">
              Structured knowledge.{" "}
              <span className="text-gradient-accent">Zero fluff.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-base md:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Designed from first principles. Each module combines bite-sized conceptual lessons, 
              real-world Indian finance examples, interactive check-ins, and misconception assessments.
            </p>
          </ScrollReveal>
        </div>

        {/* 6-Card Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {curriculumModules.map((item, i) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.title} delay={i * 70}>
                <div
                  className={`card-dark p-7 md:p-8 h-full flex flex-col group relative overflow-hidden ${
                    item.accent
                      ? "border-brand-blue/40 bg-gradient-to-br from-brand-blue/10 via-neutral-900 to-neutral-900"
                      : "bg-neutral-900 border-neutral-800"
                  }`}
                >
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-xs font-mono font-bold text-brand-blue-light/70 tracking-widest">
                      MODULE {item.number}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-neutral-800 text-neutral-300 border border-neutral-700">
                      {item.badge}
                    </span>
                  </div>

                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                      item.accent
                        ? "bg-brand-blue text-white shadow-glow-sm"
                        : "bg-neutral-800 text-neutral-300 group-hover:text-brand-blue group-hover:bg-brand-blue/10"
                    } transition-all duration-200`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2.5 font-display group-hover:text-brand-blue-light transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs md:text-sm text-neutral-400 leading-relaxed flex-1">
                    {item.description}
                  </p>

                  <div className="mt-6 pt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs font-bold text-brand-blue-light">
                    <span>Evidence-Tracked</span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Capstone Module Callout */}
        <ScrollReveal delay={450}>
          <div className="mt-8 p-6 md:p-8 rounded-3xl bg-neutral-900 border border-brand-blue/30 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center shrink-0">
                <span className="text-base font-bold font-mono">07</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider block mb-1">
                  MODULE 7 · CAPSTONE PREREQUISITE
                </span>
                <h4 className="text-base md:text-lg font-bold text-white font-display">
                  The ₹10,000 Safe Virtual Portfolio Sandbox
                </h4>
                <p className="text-xs text-neutral-400">
                  Unlocked only after clearing baseline understanding and evidence-based risk assessments.
                </p>
              </div>
            </div>
            <a
              href="#how-it-works"
              className="btn-primary text-xs py-3 px-6 whitespace-nowrap font-bold"
            >
              See Sandbox Rules
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
