"use client";

import { ScrollReveal } from "./scroll-reveal";
import { UserPlus, Settings, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: UserPlus,
    title: "Create your account",
    description:
      "Sign up in under 60 seconds. No credit card required. Connect your existing tools and import your data with a single click.",
    visual: "onboarding",
  },
  {
    number: "02",
    icon: Settings,
    title: "Configure your workspace",
    description:
      "Set up dashboards, define KPIs, and customize workflows to match how your team operates. Our AI suggests optimal configurations.",
    visual: "configure",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Launch & grow",
    description:
      "Go live with confidence. Monitor real-time metrics, automate repetitive tasks, and let Accretion's intelligence guide your growth.",
    visual: "launch",
  },
];

function StepVisual({ type }: { type: string }) {
  if (type === "onboarding") {
    return (
      <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-card">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
            <UserPlus className="w-5 h-5 text-accent" />
          </div>
          <div>
            <div className="h-3 w-24 bg-neutral-200 rounded" />
            <div className="h-2 w-16 bg-neutral-100 rounded mt-1.5" />
          </div>
        </div>
        <div className="space-y-3">
          <div className="h-10 bg-neutral-100 rounded-lg border border-neutral-200" />
          <div className="h-10 bg-neutral-100 rounded-lg border border-neutral-200" />
          <div className="h-10 bg-accent rounded-lg flex items-center justify-center">
            <span className="text-white text-sm font-semibold">Continue →</span>
          </div>
        </div>
      </div>
    );
  }
  if (type === "configure") {
    return (
      <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-card">
        <div className="flex gap-3 mb-5">
          {["Overview", "Metrics", "Alerts"].map((tab, i) => (
            <div
              key={tab}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium ${
                i === 0
                  ? "bg-accent text-white"
                  : "bg-neutral-100 text-neutral-500"
              }`}
            >
              {tab}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          {["MRR", "Churn", "LTV", "CAC"].map((kpi) => (
            <div key={kpi} className="bg-neutral-50 rounded-xl p-3 border border-neutral-100">
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
                {kpi}
              </span>
              <div className="h-3 w-16 bg-neutral-200 rounded mt-1" />
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-2xl p-6 border border-neutral-200 shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-medium text-green-600">Live</span>
        </div>
        <span className="text-xs text-neutral-400">Just now</span>
      </div>
      <div className="flex items-end gap-1 h-24">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-accent/70"
            style={{
              height: `${30 + Math.sin(i * 0.7) * 30 + i * 4}%`,
            }}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 text-sm">
        <span className="font-semibold text-neutral-800">+24.5%</span>
        <span className="text-neutral-400">growth this week</span>
      </div>
    </div>
  );
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <ScrollReveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold tracking-wide uppercase mb-4">
              How it Works
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="section-title text-neutral-900 mb-5">
              Up and running in{" "}
              <span className="text-accent">three steps</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-base md:text-lg text-neutral-500 leading-relaxed max-w-2xl mx-auto">
              Getting started with Accretion takes minutes, not months. 
              Our guided setup ensures you&apos;re productive from day one.
            </p>
          </ScrollReveal>
        </div>

        {/* Steps */}
        <div className="space-y-16 md:space-y-24">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 100}>
              <div
                className={`flex flex-col ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } items-center gap-12 md:gap-16`}
              >
                {/* Text */}
                <div className="flex-1 max-w-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl font-bold text-accent/20 font-display">
                      {step.number}
                    </span>
                    <div className="h-px flex-1 bg-neutral-200" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-neutral-500 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Visual */}
                <div className="flex-1 w-full max-w-md">
                  <StepVisual type={step.visual} />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
