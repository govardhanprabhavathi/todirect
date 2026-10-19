"use client";

import { ScrollReveal } from "./scroll-reveal";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Before TO DIRECT, I almost lost my college savings on high-risk options tips from Telegram channels. The misconception drills completely rewired my understanding of risk vs return.",
    name: "Rohan Varma",
    role: "Engineering Student, BITS Pilani",
    avatar: "RV",
    rating: 5,
  },
  {
    quote:
      "The requirement to write a rationale before executing a trade in the ₹10,000 sandbox forced me to articulate WHY I was making an investment. It taught me true discipline.",
    name: "Pooja Sundaram",
    role: "First-Year Analyst, Bengaluru",
    avatar: "PS",
    rating: 5,
  },
  {
    quote:
      "Finn, the AI coach, is phenomenal. It never tells you what to buy. Instead, it explains concepts like compounding and asset allocation with relatable Indian student examples.",
    name: "Ananya Deshmukh",
    role: "Commerce Student, Mumbai",
    avatar: "AD",
    rating: 5,
  },
  {
    quote:
      "Most finance apps are disguised brokerages trying to get you to trade every day. TO DIRECT actually wants you to LEARN first. The editorial quality is world-class.",
    name: "Karan Singhania",
    role: "Young Professional, Delhi NCR",
    avatar: "KS",
    rating: 5,
  },
  {
    quote:
      "Our university finance club made TO DIRECT&apos;s baseline assessment mandatory for all new members. The deterministic evidence tracker gives real accountability.",
    name: "Meera Nair",
    role: "President, SRCC Finance Cell",
    avatar: "MN",
    rating: 5,
  },
  {
    quote:
      "The lesson player breaks down dry financial topics into bite-sized logic puzzles. Understanding inflation&apos;s stealth tax changed how I budget my monthly stipend.",
    name: "Aditya Roy",
    role: "Postgrad Scholar, Kolkata",
    avatar: "AR",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-cream">
      <div className="section-container">
        <div className="text-center mb-16 md:mb-20">
          <ScrollReveal>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-brand-blue/10 text-brand-blue text-xs font-bold uppercase tracking-wider mb-4 border border-brand-blue/20">
              LEARNER REFLECTIONS
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="text-3xl md:text-5xl font-extrabold text-brand-navy mb-5 font-display tracking-tight">
              Real understanding.{" "}
              <span className="text-brand-blue">Lasting financial confidence.</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-base md:text-lg text-brand-slate max-w-2xl mx-auto leading-relaxed">
              Read how college students and early-career learners transitioned from financial curiosity to disciplined decision-makers.
            </p>
          </ScrollReveal>
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 70}>
              <div className="break-inside-avoid card-cream p-7">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 text-amber-500 fill-amber-500"
                    />
                  ))}
                </div>

                <p className="text-brand-navy leading-relaxed mb-6 text-sm font-medium">
                  &ldquo;{t.quote}&rdquo;
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-brand-divider">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-sm"
                    style={{
                      background: `linear-gradient(135deg, hsl(${i * 60 + 215}, 80%, 48%), hsl(${i * 60 + 235}, 70%, 35%))`,
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brand-navy font-display">
                      {t.name}
                    </p>
                    <p className="text-xs text-brand-muted">{t.role}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
