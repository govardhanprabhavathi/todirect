"use client";

import { ScrollReveal } from "./scroll-reveal";
import { ShieldCheck, Lock, AlertCircle, Ban, CheckCircle2, HeartHandshake } from "lucide-react";

const safeguards = [
  {
    title: "Zero Brokerage & Real Money Features",
    description: "TO DIRECT will never ask for your bank account or brokerage credentials. No real financial capital can ever be deposited or risked.",
    icon: Ban,
  },
  {
    title: "Strict No-Advisory AI Safety Guardrails",
    description: "Our AI Learning Coach Finn is programmatically prohibited from generating stock picks, trade signals, or price forecasts.",
    icon: ShieldCheck,
  },
  {
    title: "SEBI & Financial Regulatory Integrity",
    description: "Created purely as an educational learning companion. Compliant with strict boundaries between pedagogy and investment advice.",
    icon: CheckCircle2,
  },
  {
    title: "Anti-Speculation Reward Philosophy",
    description: "Platform rewards, badges, and streaks recognize demonstrated reasoning, sound diversification, and consistent study—never portfolio gambling.",
    icon: HeartHandshake,
  },
  {
    title: "Privacy First & Account Rights",
    description: "Full GDPR and Indian DPDP Act compliance. Transparent data access and immediate account deletion capabilities upon request.",
    icon: Lock,
  },
  {
    title: "Independent & Free from Vendor Bias",
    description: "Curriculum is completely independent. No sponsored funds, no affiliate broker links, and no conflict-of-interest promotions.",
    icon: AlertCircle,
  },
];

export function Integrations() {
  return (
    <section id="safety" className="py-24 md:py-32 bg-neutral-950 text-white relative">
      <div className="section-container relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <ScrollReveal>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-wider mb-4">
              ETHICAL FOUNDATIONS
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-3xl md:text-5xl font-semibold text-white mb-5 font-display tracking-tight">
              Safety, Ethics & <span className="text-gradient-accent">Learner Protection</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-base md:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed">
              We believe financial education must be completely safe, conflict-free, 
              and strictly isolated from commercial trading incentives.
            </p>
          </ScrollReveal>
        </div>

        {/* Safeguard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safeguards.map((item, i) => {
            const Icon = item.icon;
            return (
              <ScrollReveal key={item.title} delay={i * 70}>
                <div className="card-dark p-7 bg-neutral-900 border-neutral-800 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-brand-blue/15 text-brand-blue-light flex items-center justify-center mb-5">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2 font-display">
                      {item.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-3 border-t border-neutral-800 text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                    Enforced by System Design
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
