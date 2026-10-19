"use client";

import { ScrollReveal } from "./scroll-reveal";
import { AnimatedCounter } from "./animated-counter";

const metrics = [
  { value: 99.9, label: "Uptime SLA", suffix: "%", decimals: 1 },
  { value: 2.4, label: "Events Processed Daily", suffix: "M+", decimals: 1 },
  { value: 35, label: "Global Edge Regions", suffix: "+", decimals: 0 },
  { value: 50, label: "Avg Response Time", prefix: "<", suffix: "ms", decimals: 0 },
];

export function Metrics() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(255, 98, 7, 0.06) 0%, transparent 70%)",
        }}
      />

      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <ScrollReveal>
            <div className="section-label mx-auto w-fit">Performance</div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="section-title text-white mb-5">
              Built for <span className="text-gradient-accent">reliability</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="section-description mx-auto">
              Infrastructure that scales with you. Enterprise-grade performance you
              can count on, every second of every day.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {metrics.map((metric, i) => (
            <ScrollReveal key={metric.label} delay={i * 100}>
              <div className="relative group text-center p-8 md:p-10 card-dark overflow-hidden">
                {/* Hover gradient */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(ellipse at center bottom, rgba(255, 98, 7, 0.08) 0%, transparent 60%)",
                    }}
                  />
                </div>

                <div className="relative z-10">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-3 font-display tabular-nums">
                    <AnimatedCounter
                      end={metric.value}
                      prefix={metric.prefix || ""}
                      suffix={metric.suffix}
                      decimals={metric.decimals}
                      duration={2200}
                    />
                  </div>
                  <p className="text-sm text-neutral-400 font-medium">{metric.label}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
