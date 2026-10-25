"use client";

import { ScrollReveal } from "./scroll-reveal";
import { AnimatedCounter } from "./animated-counter";
import { ShieldAlert, BookOpen, CheckCircle, Users } from "lucide-react";

const metrics = [
  { value: 7, label: "Core Foundation Modules", prefix: "", suffix: "", decimals: 0 },
  { value: 45, label: "Scenario Assessments & Drills", prefix: "", suffix: "+", decimals: 0 },
  { value: 100, label: "Simulated Risk-Free Sandbox", prefix: "₹", suffix: "%", decimals: 0 },
  { value: 94.2, label: "Concept Retention Rate", prefix: "", suffix: "%", decimals: 1 },
];

export function Metrics() {
  return (
    <section id="evidence" className="py-24 md:py-32 relative overflow-hidden bg-neutral-950 text-white">
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient Electric Blue glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(37, 99, 255, 0.1) 0%, transparent 70%)",
        }}
      />

      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-blue/15 text-brand-blue-light border border-brand-blue/30 text-xs font-bold uppercase tracking-wider mb-4">
              MEASURABLE LITERACY
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-3xl md:text-5xl font-semibold text-white mb-5 font-display tracking-tight">
              Evidence-Backed <span className="text-gradient-accent">Mastery Metrics</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-base md:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              Every learner&apos;s journey is tracked using clear mathematical criteria—not vague completion percentages or superficial participation marks.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {metrics.map((metric, i) => (
            <ScrollReveal key={metric.label} delay={i * 90}>
              <div className="relative group text-center p-8 md:p-10 card-dark overflow-hidden bg-neutral-900 border-neutral-800">
                <div className="relative z-10">
                  <div className="text-4xl md:text-5xl font-semibold text-white mb-3 font-display tabular-nums">
                    <AnimatedCounter
                      end={metric.value}
                      prefix={metric.prefix || ""}
                      suffix={metric.suffix}
                      decimals={metric.decimals}
                      duration={2000}
                    />
                  </div>
                  <p className="text-xs md:text-sm text-neutral-400 font-semibold">{metric.label}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
