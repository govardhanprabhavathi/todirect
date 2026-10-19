"use client";

import { ScrollReveal } from "./scroll-reveal";

const logos = [
  "Stripe",
  "Vercel",
  "Linear",
  "Notion",
  "Figma",
  "Slack",
  "GitHub",
  "Discord",
];

function LogoPlaceholder({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2 text-neutral-500 select-none shrink-0 px-6">
      <div className="w-6 h-6 rounded bg-neutral-800 flex items-center justify-center">
        <span className="text-[10px] font-bold text-neutral-600">
          {name[0]}
        </span>
      </div>
      <span className="text-sm font-medium tracking-wide">{name}</span>
    </div>
  );
}

export function LogoCloud() {
  return (
    <section className="py-16 md:py-20 border-t border-neutral-800/50">
      <div className="section-container">
        <ScrollReveal>
          <p className="text-center text-sm text-neutral-500 font-medium tracking-wide uppercase mb-10">
            Trusted by forward-thinking teams worldwide
          </p>
        </ScrollReveal>

        <div className="marquee-container">
          <div className="flex animate-marquee-left">
            {/* Double the logos for seamless loop */}
            {[...logos, ...logos].map((name, i) => (
              <LogoPlaceholder key={`${name}-${i}`} name={name} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
