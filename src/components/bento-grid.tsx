"use client";

import { ScrollReveal } from "./scroll-reveal";
import {
  Brain,
  ShieldCheck,
  Award,
  BookOpenCheck,
  LineChart,
  HelpCircle,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";

export function BentoGrid() {
  return (
    <section id="platform" className="py-24 md:py-32 bg-neutral-950 text-white">
      <div className="section-container">
        <div className="text-center mb-16 md:mb-20">
          <ScrollReveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue/15 text-brand-blue-light border border-brand-blue/30 text-xs font-bold uppercase tracking-wider mb-4">
              <Brain className="w-3.5 h-3.5" />
              INTELLIGENT LEARNING COMPANIONS & SAFEGUARDS
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5 font-display tracking-tight">
              Evidence, AI Coaching &{" "}
              <span className="text-gradient-accent">Virtual Practice</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-base md:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Every feature exists to deepen your financial discernment. No speculative trading, 
              no fake wealth illusions—just verified competency.
            </p>
          </ScrollReveal>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: AI Coach Finn Showcase (2 cols wide) */}
          <ScrollReveal delay={0} className="lg:col-span-2">
            <div className="card-dark p-8 md:p-10 h-full relative overflow-hidden group bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-850 border-neutral-800">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-brand-blue text-white flex items-center justify-center font-bold text-lg shadow-glow-sm">
                    F
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl md:text-2xl font-bold text-white font-display">
                        Finn · The AI Learning Guide
                      </h3>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        Strict Guardrails
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400">
                      Trained solely on approved curriculum content. Strictly prohibits stock tips or advisory.
                    </p>
                  </div>
                </div>

                <p className="text-sm text-neutral-300 leading-relaxed mb-6 max-w-xl">
                  Ask Finn to explain compound interest with college pocket money examples, clarify why an assessment answer was marked incorrect, or break down the nuances of index mutual funds.
                </p>

                {/* Simulated Conversation UI */}
                <div className="bg-neutral-950/80 rounded-2xl p-5 border border-neutral-800 space-y-3 font-sans">
                  <div className="flex items-start gap-2.5">
                    <span className="px-2 py-1 rounded bg-neutral-800 text-[10px] font-bold text-neutral-400">
                      YOU
                    </span>
                    <p className="text-xs text-neutral-200 bg-neutral-800/60 p-2.5 rounded-xl border border-neutral-700/60">
                      &ldquo;Why is investing all my money in one high-dividend stock considered risky if it pays 8%?&rdquo;
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <span className="px-2 py-1 rounded bg-brand-blue text-[10px] font-bold text-white">
                      FINN
                    </span>
                    <p className="text-xs text-neutral-300 bg-brand-blue/10 p-2.5 rounded-xl border border-brand-blue/20 leading-relaxed">
                      &ldquo;Great question! An 8% dividend looks attractive, but it exposes you to <strong>single-company concentration risk</strong>. If that company faces industry disruptions or cuts its dividend, both your income and capital can drop significantly. That&apos;s why Module 5 emphasizes broad diversification across 30–50 companies.&rdquo;
                    </p>
                  </div>
                </div>

                {/* Interactive Prompt Chips */}
                <div className="mt-4 flex flex-wrap gap-2 text-xs">
                  {["Explain this simply", "Give a student example", "Why was my answer wrong?", "Review Module 4"].map(
                    (chip) => (
                      <span
                        key={chip}
                        className="px-3 py-1 rounded-full bg-neutral-800/80 border border-neutral-700 text-neutral-300 text-[11px] font-medium"
                      >
                        {chip}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: Deterministic Mastery Engine */}
          <ScrollReveal delay={100}>
            <div className="card-dark p-8 h-full bg-neutral-900 border-neutral-800 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-6">
                  <BookOpenCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2 font-display">
                  Deterministic Evidence Mastery
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-6">
                  Mastery isn&apos;t a random score. We evaluate four evidence dimensions to determine if you&apos;re genuinely ready:
                </p>

                <div className="space-y-3">
                  {[
                    { label: "Concept Retention", pct: "92%", color: "bg-emerald-400" },
                    { label: "Reasoning Accuracy", pct: "84%", color: "bg-brand-blue" },
                    { label: "Misconception Clearance", pct: "78%", color: "bg-indigo-400" },
                    { label: "Practice Consistency", pct: "88%", color: "bg-amber-400" },
                  ].map((dim) => (
                    <div key={dim.label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-neutral-400">{dim.label}</span>
                        <span className="text-white font-mono font-bold">{dim.pct}</span>
                      </div>
                      <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden">
                        <div className={`${dim.color} h-full`} style={{ width: dim.pct }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-800 text-[11px] text-neutral-500">
                Transparent rules ensure progress reflects true skill.
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3: ₹10,000 Virtual Portfolio */}
          <ScrollReveal delay={150}>
            <div className="card-dark p-8 h-full bg-neutral-900 border-neutral-800">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
                <LineChart className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-display">
                ₹10,000 Practice Sandbox
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-5">
                Every trade requires an educational reflection. You cannot execute buy/sell orders without writing your rationale.
              </p>

              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">Cash Available</span>
                  <span className="font-mono text-white font-bold">₹4,200.00</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-neutral-400">Fictional Index ETF</span>
                  <span className="font-mono text-emerald-400 font-bold">₹5,800.00</span>
                </div>
                <div className="pt-2 border-t border-neutral-800 flex items-center gap-1.5 text-[10px] text-amber-400">
                  <AlertTriangle className="w-3 h-3 shrink-0" />
                  <span>Diversification ratio: 82% healthy</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 4: Misconception Detection */}
          <ScrollReveal delay={200}>
            <div className="card-dark p-8 h-full bg-neutral-900 border-neutral-800">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center mb-6">
                <Lightbulb className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-display">
                Misconception Detection
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-5">
                Identifies recurring fallacies like &ldquo;timing the market&rdquo; or &ldquo;penny stocks are cheap bargains&rdquo; and assigns targeted micro-remedies.
              </p>
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
                <strong>Remedy assigned:</strong> 2 scenario drills on Dollar-Cost Averaging (SIP).
              </div>
            </div>
          </ScrollReveal>

          {/* Card 5: Safe Gamification (Lanyard Badges & Streaks) */}
          <ScrollReveal delay={250}>
            <div className="card-dark p-8 h-full bg-neutral-900 border-neutral-800">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2 font-display">
                Thoughtful Gamification
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed mb-5">
                Earn verified milestone badges for disciplined research and consistency—never for reckless risk or simulated short-term trading profits.
              </p>
              <div className="flex gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-neutral-800 text-[11px] font-bold text-neutral-300 border border-neutral-700">
                  🛡️ Risk-Aware
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-neutral-800 text-[11px] font-bold text-neutral-300 border border-neutral-700">
                  📚 7-Day Learner
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
