"use client";

import { ScrollReveal } from "./scroll-reveal";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Accretion transformed our onboarding flow. We went from a 30% activation rate to over 65% in just two months. The analytics alone paid for themselves.",
    name: "Sarah Chen",
    role: "Head of Growth, Lumina",
    avatar: "SC",
    rating: 5,
  },
  {
    quote:
      "The speed of iteration is unmatched. What used to take our team weeks now takes hours. Accretion's integrations with our existing stack made migration seamless.",
    name: "Marcus Rodriguez",
    role: "CTO, Velocity Labs",
    avatar: "MR",
    rating: 5,
  },
  {
    quote:
      "We evaluated a dozen platforms before choosing Accretion. The combination of powerful analytics, intuitive UX, and responsive support made it an easy decision.",
    name: "Aisha Patel",
    role: "VP Product, Nexus AI",
    avatar: "AP",
    rating: 5,
  },
  {
    quote:
      "Finally, a platform that understands early-stage SaaS. The revenue intelligence features helped us identify our ideal customer profile and double our conversion rate.",
    name: "James Liu",
    role: "Co-founder, Prism Analytics",
    avatar: "JL",
    rating: 5,
  },
  {
    quote:
      "From the moment we set up, the support was incredible. But more importantly, Accretion's churn prediction saved us from losing key enterprise accounts.",
    name: "Eliana Hoffman",
    role: "Customer Success Lead, Archway",
    avatar: "EH",
    rating: 5,
  },
  {
    quote:
      "I've never seen a tool that bridges the gap between product, marketing, and revenue so effortlessly. Accretion is the backbone of our growth stack now.",
    name: "David Kim",
    role: "Growth Engineer, Forge",
    avatar: "DK",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32">
      <div className="section-container">
        <div className="text-center mb-16 md:mb-20">
          <ScrollReveal>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold tracking-wide uppercase mb-4">
              Testimonials
            </div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="section-title text-neutral-900 mb-5">
              Loved by <span className="text-accent">teams everywhere</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-base md:text-lg text-neutral-500 leading-relaxed max-w-2xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what our customers have to
              say about building with Accretion.
            </p>
          </ScrollReveal>
        </div>

        {/* Masonry grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-5 space-y-5">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} delay={i * 80}>
              <div className="break-inside-avoid card-cream p-6 md:p-7">
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star
                      key={j}
                      className="w-4 h-4 text-accent fill-accent"
                    />
                  ))}
                </div>
                {/* Quote */}
                <p className="text-neutral-700 leading-relaxed mb-5 text-[15px]">
                  &ldquo;{t.quote}&rdquo;
                </p>
                {/* Author */}
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
                    style={{
                      background: `linear-gradient(135deg, hsl(${i * 50 + 15}, 60%, 50%), hsl(${i * 50 + 35}, 50%, 40%))`,
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-800">
                      {t.name}
                    </p>
                    <p className="text-xs text-neutral-400">{t.role}</p>
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
