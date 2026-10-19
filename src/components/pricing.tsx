"use client";

import { ScrollReveal } from "./scroll-reveal";
import { Check, ArrowRight } from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Starter",
    price: "$0",
    period: "/mo",
    description: "Perfect for side projects and early-stage startups exploring product-market fit.",
    features: [
      "Up to 1,000 events/day",
      "3 team members",
      "Core analytics dashboard",
      "7-day data retention",
      "Community support",
      "5 integrations",
    ],
    cta: "Start for Free",
    popular: false,
  },
  {
    name: "Growth",
    price: "$49",
    period: "/mo",
    description: "For growing teams that need deeper insights and automation to scale faster.",
    features: [
      "Up to 100K events/day",
      "Unlimited team members",
      "Advanced analytics & funnels",
      "90-day data retention",
      "Priority email support",
      "50+ integrations",
      "Revenue intelligence",
      "Custom dashboards",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations with advanced security, compliance, and scale requirements.",
    features: [
      "Unlimited events",
      "Unlimited team members",
      "All Growth features",
      "Unlimited data retention",
      "Dedicated account manager",
      "200+ integrations",
      "SSO & SAML",
      "SOC 2 compliance",
      "Custom SLA",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="section-container">
        <div className="text-center mb-16 md:mb-20">
          <ScrollReveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold tracking-wide uppercase mb-4">
              Pricing
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="section-title text-neutral-900 mb-5">
              Simple, transparent{" "}
              <span className="text-accent">pricing</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-base md:text-lg text-neutral-500 leading-relaxed max-w-2xl mx-auto">
              No hidden fees, no surprise charges. Choose the plan that fits your
              stage and scale as you grow.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 100}>
              <div
                className={`relative flex flex-col rounded-3xl p-7 md:p-8 h-full ${
                  plan.popular
                    ? "bg-neutral-950 text-white border-2 border-accent shadow-glow"
                    : "bg-white border border-neutral-200"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-accent text-white text-xs font-bold rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3
                    className={`text-lg font-semibold mb-1 ${
                      plan.popular ? "text-white" : "text-neutral-900"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-sm ${
                      plan.popular ? "text-neutral-400" : "text-neutral-500"
                    }`}
                  >
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6">
                  <span
                    className={`text-4xl font-bold ${
                      plan.popular ? "text-white" : "text-neutral-900"
                    }`}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span
                      className={`text-sm ${
                        plan.popular ? "text-neutral-400" : "text-neutral-500"
                      }`}
                    >
                      {plan.period}
                    </span>
                  )}
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Check
                        className={`w-4 h-4 mt-0.5 shrink-0 ${
                          plan.popular ? "text-accent" : "text-success-dark"
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          plan.popular ? "text-neutral-300" : "text-neutral-600"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="#"
                  className={`flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                    plan.popular
                      ? "btn-primary w-full"
                      : "bg-neutral-100 text-neutral-800 hover:bg-neutral-200"
                  }`}
                >
                  {plan.cta}
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
