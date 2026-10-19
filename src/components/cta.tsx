"use client";

import Link from "next/link";
import { ArrowRight, ShieldCheck, Sparkles, BookOpen } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

export function Cta() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-neutral-950 text-white">
      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(37, 99, 255, 0.18) 0%, transparent 65%)",
          }}
        />
      </div>

      <div className="section-container relative z-10 text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-brand-blue/15 border border-brand-blue/30 text-brand-blue-light text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            BEGIN YOUR FINANCIAL LITERACY JOURNEY
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6 max-w-3xl mx-auto font-display">
            Start with understanding.{" "}
            <span className="text-gradient-accent">Invest with confidence.</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-base md:text-lg text-neutral-300 leading-relaxed max-w-xl mx-auto mb-10">
            Take the 5-minute diagnostic baseline assessment today. Discover your financial knowledge baseline, 
            unlock structured lessons, and begin guided practice with ₹10,000 in sandbox funds.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#curriculum" className="btn-primary text-sm px-10 py-4 font-bold shadow-glow">
              Take Free Baseline Assessment
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#how-it-works" className="btn-ghost-dark text-sm px-8 py-4 font-semibold">
              Explore The Curriculum First
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-400 mt-10">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% Risk-Free Simulation
            </span>
            <span className="w-1 h-1 rounded-full bg-neutral-700" />
            <span>Zero Brokerage / Demat Required</span>
            <span className="w-1 h-1 rounded-full bg-neutral-700" />
            <span>Built Specifically for Students & Beginners</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
