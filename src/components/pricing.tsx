"use client";

import { ScrollReveal } from "./scroll-reveal";
import { Check, ArrowRight, ShieldCheck, Sparkles, GraduationCap } from "lucide-react";
import Link from "next/link";

const learningTracks = [
  {
    name: "Independent Learner",
    price: "Free",
    period: "Forever",
    badge: "100% Non-Commercial",
    description: "Full access for any student or beginner building foundational financial confidence.",
    features: [
      "Access to all 7 foundation curriculum modules",
      "Baseline financial literacy diagnostic",
      "Scenario-based quizzes & logic puzzles",
      "Personalized evidence mastery tracker",
      "Basic AI Coach guidance from Finn",
      "₹10,000 safe simulated portfolio sandbox",
    ],
    cta: "Start Free Journey",
    popular: true,
  },
  {
    name: "Campus & Finance Clubs",
    price: "Institutional",
    period: "Zero-Cost Grant",
    badge: "For Universities",
    description: "For student unions, university finance clubs, and commerce departments.",
    features: [
      "Everything in Independent Learner",
      "Cohort analytics dashboard for club leaders",
      "Custom misconception reports across member batches",
      "Dedicated campus onboarding workshop guide",
      "Verified completion credential for student profiles",
      "Direct channel with TO DIRECT education team",
    ],
    cta: "Request Club Onboarding",
    popular: false,
  },
  {
    name: "Young Professionals",
    price: "Self-Paced",
    period: "Open Access",
    badge: "Early Career",
    description: "Tailored for early-career professionals receiving their first salary checks.",
    features: [
      "First salary budgeting & tax basics module",
      "Term insurance & emergency buffer planners",
      "Index vs. active mutual fund deep dives",
      "Portfolio asset allocation simulator",
      "Comprehensive trade journal reflection tools",
      "Lifetime mastery archive & milestone badges",
    ],
    cta: "Join Career Track",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 bg-cream">
      <div className="section-container">
        <div className="text-center mb-16 md:mb-20">
          <ScrollReveal>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider mb-4 border border-brand-blue/20">
              OPEN ACCESS EDUCATION
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-3xl md:text-5xl font-extrabold text-brand-navy mb-5 font-display tracking-tight">
              Accessible to all.{" "}
              <span className="text-brand-blue">Always pedagogical.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-base md:text-lg text-brand-slate max-w-2xl mx-auto leading-relaxed">
              We do not sell trading signals, lock core lessons behind paywalls, or run predatory ads. 
              Pick your pathway and begin mastering your financial destiny.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {learningTracks.map((track, i) => (
            <ScrollReveal key={track.name} delay={i * 90}>
              <div
                className={`relative flex flex-col rounded-3xl p-7 md:p-8 h-full transition-all duration-200 ${
                  track.popular
                    ? "bg-neutral-950 text-white border-2 border-brand-blue shadow-glow"
                    : "bg-white border border-brand-border"
                }`}
              >
                {track.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-brand-blue text-white text-xs font-extrabold rounded-full shadow-sm uppercase tracking-wider">
                      Most Popular Track
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3
                      className={`text-lg font-bold font-display ${
                        track.popular ? "text-white" : "text-brand-navy"
                      }`}
                    >
                      {track.name}
                    </h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${track.popular ? "bg-brand-blue/20 text-brand-blue-light" : "bg-neutral-100 text-neutral-600"}`}>
                      {track.badge}
                    </span>
                  </div>
                  <p
                    className={`text-xs ${
                      track.popular ? "text-neutral-400" : "text-brand-slate"
                    }`}
                  >
                    {track.description}
                  </p>
                </div>

                <div className="mb-6 pb-6 border-b border-neutral-750">
                  <span
                    className={`text-4xl font-extrabold font-display ${
                      track.popular ? "text-white" : "text-brand-navy"
                    }`}
                  >
                    {track.price}
                  </span>
                  {track.period && (
                    <span
                      className={`text-xs ml-2 ${
                        track.popular ? "text-neutral-400" : "text-brand-muted"
                      }`}
                    >
                      / {track.period}
                    </span>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {track.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          track.popular ? "text-brand-blue-light" : "text-brand-blue"
                        }`}
                      />
                      <span
                        className={`text-xs leading-relaxed ${
                          track.popular ? "text-neutral-300" : "text-brand-navy"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="#curriculum"
                  className={`flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-xs transition-all duration-200 ${
                    track.popular
                      ? "btn-primary w-full"
                      : "bg-brand-navy text-white hover:bg-neutral-800"
                  }`}
                >
                  {track.cta}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
