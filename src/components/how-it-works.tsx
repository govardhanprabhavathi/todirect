"use client";

import { ScrollReveal } from "./scroll-reveal";
import {
  Compass,
  BookOpen,
  CheckCircle,
  BarChart2,
  Sparkles,
  TrendingUp,
} from "lucide-react";

const stages = [
  {
    step: "01",
    tag: "START",
    title: "Baseline Assessment & Goal Setting",
    description:
      "A 5-minute diagnostic quiz assesses your current baseline literacy. Zero judgment—just clear visibility into where your financial foundations stand.",
    icon: Compass,
    accent: "bg-blue-500/10 text-brand-blue",
    details: ["Personal finance diagnostic", "Misconception scan", "Customized curriculum starting point"],
  },
  {
    step: "02",
    tag: "LEARN",
    title: "Concept-First Bite-Sized Lessons",
    description:
      "Engage with editorial, jargon-free lessons built around real Indian scenarios. Visual infographics, calculators, and no Wall Street noise.",
    icon: BookOpen,
    accent: "bg-indigo-500/10 text-indigo-600",
    details: ["7 Foundation topics", "Real-life relatable cases", "Active reading check-points"],
  },
  {
    step: "03",
    tag: "TEST",
    title: "Scenario Quizzes & Concept Puzzles",
    description:
      "Forget rote memorization. Our scenario-based assessments test decision-making under simulated market events and economic changes.",
    icon: CheckCircle,
    accent: "bg-emerald-500/10 text-emerald-600",
    details: ["Multiple choice & ranking puzzles", "Reasoning verification", "Instant explanation on error"],
  },
  {
    step: "04",
    tag: "TRACK",
    title: "Deterministic Evidence-Based Mastery",
    description:
      "We track what you actually comprehend—not just checkmarks. Your mastery index measures retention, consistency, and reasoning accuracy.",
    icon: BarChart2,
    accent: "bg-purple-500/10 text-purple-600",
    details: ["Transparent mastery rules", "Topic confidence map", "Clear retention indicators"],
  },
  {
    step: "05",
    tag: "IMPROVE",
    title: "Contextual AI Learning Coach & Targeted Review",
    description:
      "Meet Finn—your strictly curriculum-grounded learning coach. Detects repeated misconceptions and delivers tailored micro-practice.",
    icon: Sparkles,
    accent: "bg-amber-500/10 text-amber-600",
    details: ["Strict AI safety guardrails", "Misconception remediation", "No investment advice permitted"],
  },
  {
    step: "06",
    tag: "PRACTISE",
    title: "₹10,000 Safe Virtual Portfolio Sandbox",
    description:
      "Put your knowledge to work with zero real-money risk. Allocate across fictional diversified instruments and write reflective trade journals.",
    icon: TrendingUp,
    accent: "bg-brand-blue/10 text-brand-blue",
    details: ["₹10,000 virtual balance", "Mandatory trade rationales", "Rewards thoughtful diversification"],
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32 bg-cream">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <ScrollReveal>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider mb-4 border border-brand-blue/20">
              THE 6-STAGE LEARNING JOURNEY
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-3xl md:text-5xl font-extrabold text-brand-navy mb-5 font-display tracking-tight">
              Start → Learn → Test →{" "}
              <span className="text-brand-blue">Track → Improve → Practise</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-base md:text-lg text-brand-slate max-w-2xl mx-auto leading-relaxed">
              Every stage is inextricably connected. The application remembers what you understand, 
              flags what needs strengthening, and guides your next meaningful action.
            </p>
          </ScrollReveal>
        </div>

        {/* 6 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stages.map((stage, i) => {
            const Icon = stage.icon;
            return (
              <ScrollReveal key={stage.step} delay={i * 80}>
                <div className="card-cream p-7 md:p-8 h-full flex flex-col justify-between relative group hover:border-brand-blue/40">
                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-3xl font-extrabold font-mono text-neutral-300 group-hover:text-brand-blue transition-colors">
                        {stage.step}
                      </span>
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase bg-brand-blue-pale text-brand-blue border border-brand-blue-soft">
                        {stage.tag}
                      </span>
                    </div>

                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${stage.accent}`}>
                      <Icon className="w-6 h-6" />
                    </div>

                    <h3 className="text-lg font-bold text-brand-navy mb-3 font-display">
                      {stage.title}
                    </h3>

                    <p className="text-xs md:text-sm text-brand-slate leading-relaxed mb-6">
                      {stage.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-brand-divider">
                    <ul className="space-y-1.5">
                      {stage.details.map((detail, idx) => (
                        <li key={idx} className="text-[11px] font-medium text-brand-muted flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-blue/60" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
