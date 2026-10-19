"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

export function Cta() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255, 98, 7, 0.1) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="section-container relative z-10 text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold tracking-wide uppercase mb-6">
            Ready to start?
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6 max-w-3xl mx-auto">
            Start building the future of your{" "}
            <span className="text-gradient-accent">SaaS today</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <p className="text-lg text-neutral-400 leading-relaxed max-w-xl mx-auto mb-10">
            Join thousands of teams already accelerating their growth. 
            No credit card required. Free forever on the Starter plan.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="#pricing" className="btn-primary text-base px-10 py-4">
              Get Started for Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="#" className="btn-ghost-dark text-base px-8 py-4">
              Schedule a Demo
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={400}>
          <p className="text-sm text-neutral-600 mt-8">
            No credit card required · Free 14-day trial · Cancel anytime
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
