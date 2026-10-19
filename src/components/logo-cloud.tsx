"use client";

import { ScrollReveal } from "./scroll-reveal";
import { BookOpen, GraduationCap, Building2, Users2, Shield } from "lucide-react";

const institutions = [
  "IIT Delhi Fintech Club",
  "SRCC Finance Cell",
  "IIM Ahmedabad Initiative",
  "BITS Pilani Economics Association",
  "St. Xavier's Commerce Guild",
  "NMIMS Youth Finance Network",
  "Loyola College Literacy League",
];

export function LogoCloud() {
  return (
    <section className="py-14 md:py-18 border-t border-neutral-800/80 bg-neutral-950">
      <div className="section-container">
        <ScrollReveal>
          <div className="flex flex-col items-center justify-center text-center mb-8">
            <span className="text-[11px] uppercase tracking-widest font-bold text-brand-blue-light mb-1">
              EDUCATIONAL ADOPTION
            </span>
            <p className="text-xs text-neutral-400">
              Trusted by student finance clubs, university societies, and early-career learner networks
            </p>
          </div>
        </ScrollReveal>

        <div className="marquee-container">
          <div className="flex animate-marquee-left gap-10 items-center">
            {[...institutions, ...institutions].map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-neutral-900/60 border border-neutral-800 text-neutral-300 shrink-0 select-none hover:border-neutral-700 transition-colors"
              >
                <div className="w-5 h-5 rounded-md bg-brand-blue/20 text-brand-blue-light flex items-center justify-center text-[10px] font-bold">
                  {name[0]}
                </div>
                <span className="text-xs font-semibold tracking-wide">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
