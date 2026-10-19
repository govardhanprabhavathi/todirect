"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

const faqs = [
  {
    q: "How does the free trial work?",
    a: "You get 14 days of full access to all Growth plan features. No credit card required to start. At the end of the trial, you can continue on the free Starter plan or upgrade.",
  },
  {
    q: "Can I change plans later?",
    a: "Absolutely. You can upgrade, downgrade, or cancel at any time from your dashboard. Changes take effect immediately with prorated billing.",
  },
  {
    q: "What integrations are supported?",
    a: "We support 200+ native integrations including Stripe, Slack, HubSpot, Salesforce, Segment, Zapier, and many more. Our REST API and webhooks allow you to build custom integrations too.",
  },
  {
    q: "Is my data secure?",
    a: "Absolutely. We're SOC 2 Type II compliant with end-to-end encryption, daily backups, and 99.9% uptime SLA. Your data is stored in ISO 27001 certified data centers.",
  },
  {
    q: "Do you offer discounts for startups?",
    a: "Yes! We have a Startup Program that offers 50% off the Growth plan for eligible early-stage companies. Contact our sales team to learn more.",
  },
  {
    q: "What kind of support do you offer?",
    a: "Starter plans get community support. Growth plans include priority email support with < 4 hour response times. Enterprise plans get a dedicated account manager and custom SLA.",
  },
];

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <ScrollReveal delay={index * 60}>
      <div className="border-b border-neutral-200 last:border-0">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-5 text-left group"
        >
          <span className="text-base font-semibold text-neutral-900 pr-4 group-hover:text-accent transition-colors">
            {q}
          </span>
          <ChevronDown
            className={`w-5 h-5 text-neutral-400 shrink-0 transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
        <div
          className="overflow-hidden transition-all duration-300"
          style={{
            maxHeight: open ? "200px" : "0",
            opacity: open ? 1 : 0,
          }}
        >
          <p className="pb-5 text-neutral-500 leading-relaxed text-[15px]">{a}</p>
        </div>
      </div>
    </ScrollReveal>
  );
}

export function Faq() {
  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="section-container max-w-3xl">
        <div className="text-center mb-14">
          <ScrollReveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold tracking-wide uppercase mb-4">
              FAQ
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="section-title text-neutral-900 mb-5">
              Frequently asked{" "}
              <span className="text-accent">questions</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-base md:text-lg text-neutral-500 leading-relaxed max-w-xl mx-auto">
              Everything you need to know about getting started with Accretion.
            </p>
          </ScrollReveal>
        </div>

        <div className="bg-white rounded-3xl border border-neutral-200 px-6 md:px-8 shadow-subtle">
          {faqs.map((faq, i) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
