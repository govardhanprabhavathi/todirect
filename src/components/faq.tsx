"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

const faqs = [
  {
    q: "Is TO DIRECT a real brokerage or trading terminal?",
    a: "No. TO DIRECT is purely an educational platform. You cannot link bank accounts, deposit fiat currency, buy real equities, or execute market trades. Everything operates in our safe, simulated sandbox.",
  },
  {
    q: "How does the ₹10,000 practice portfolio sandbox work?",
    a: "Once you achieve verified baseline mastery in Modules 1 through 6, you unlock ₹10,000 in virtual sandbox credits. You can allocate across simulated diversified instruments, write mandatory trade rationales, and review how macro events affect asset prices over time.",
  },
  {
    q: "What makes the AI Learning Coach 'Finn' safe?",
    a: "Finn is governed by strict deterministic guardrails. It is programmatically blocked from providing stock recommendations, price targets, or speculative market calls. Its sole function is pedagogical: clarifying concepts, detecting learner misconceptions, and giving relatable student examples.",
  },
  {
    q: "How is 'Understanding' measured instead of simple lesson completion?",
    a: "We use a multi-factor Deterministic Mastery Engine. Simply clicking 'Next' does not mark a topic as mastered. You must demonstrate conceptual retention across scenario quizzes, solve reasoning check-points, and successfully clear flagged misconceptions.",
  },
  {
    q: "Is TO DIRECT suitable for complete beginners with zero finance background?",
    a: "Yes! TO DIRECT was designed specifically for college students and young professionals. Lessons avoid intimidating jargon, explain concepts using everyday pocket-money examples, and build up knowledge systematically from first principles.",
  },
  {
    q: "Can educational institutions or university finance cells partner with TO DIRECT?",
    a: "Absolutely. We offer an institutional track with cohort analytics, progress summaries for student club leaders, and verified pedagogical credentials for participating learners.",
  },
];

function FaqItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <ScrollReveal delay={index * 50}>
      <div className="border-b border-brand-divider last:border-0">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between py-5 text-left group"
        >
          <span className="text-sm md:text-base font-bold text-brand-navy pr-4 group-hover:text-brand-blue transition-colors font-display">
            {q}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-brand-muted shrink-0 transition-transform duration-300 ${
              open ? "rotate-180 text-brand-blue" : ""
            }`}
          />
        </button>
        <div
          className="overflow-hidden transition-all duration-300"
          style={{
            maxHeight: open ? "220px" : "0",
            opacity: open ? 1 : 0,
          }}
        >
          <p className="pb-5 text-xs md:text-sm text-brand-slate leading-relaxed">{a}</p>
        </div>
      </div>
    </ScrollReveal>
  );
}

export function Faq() {
  return (
    <section id="faq" className="py-24 md:py-32 bg-cream">
      <div className="section-container max-w-3xl">
        <div className="text-center mb-14">
          <ScrollReveal>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider mb-4 border border-brand-blue/20">
              <HelpCircle className="w-3.5 h-3.5" />
              FREQUENTLY ASKED QUESTIONS
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-3xl md:text-5xl font-semibold text-brand-navy mb-5 font-display tracking-tight">
              Clear answers.{" "}
              <span className="text-brand-blue">Total transparency.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-base text-brand-slate max-w-xl mx-auto leading-relaxed">
              Everything you need to know about our pedagogy, AI coach boundaries, and the safe practice sandbox.
            </p>
          </ScrollReveal>
        </div>

        <div className="bg-white rounded-3xl border border-brand-border px-6 md:px-8 shadow-subtle">
          {faqs.map((faq, i) => (
            <FaqItem key={faq.q} q={faq.q} a={faq.a} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
