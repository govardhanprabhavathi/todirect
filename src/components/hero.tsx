"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";
import { ParticleField } from "./particle-field";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-20 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <ParticleField />
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255, 98, 7, 0.12) 0%, rgba(255, 98, 7, 0.04) 40%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 50%, transparent)",
          }}
        />
      </div>

      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <ScrollReveal delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-8">
              <Sparkles className="w-3.5 h-3.5" />
              Now in Public Beta
            </div>
          </ScrollReveal>

          {/* Headline */}
          <ScrollReveal delay={100}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-6">
              Accelerate your{" "}
              <span className="text-gradient-accent">SaaS growth</span>{" "}
              with precision
            </h1>
          </ScrollReveal>

          {/* Subheadline */}
          <ScrollReveal delay={200}>
            <p className="text-lg md:text-xl text-neutral-400 leading-relaxed max-w-2xl mx-auto mb-10">
              The all-in-one platform designed to help you communicate your value,
              attract users, and scale faster. From launch to growth — Accretion
              has you covered.
            </p>
          </ScrollReveal>

          {/* CTAs */}
          <ScrollReveal delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="#pricing" className="btn-primary text-base px-8 py-3.5">
                Start Free Trial
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="#how-it-works"
                className="btn-ghost-dark text-base px-8 py-3.5"
              >
                See How It Works
              </Link>
            </div>
          </ScrollReveal>

          {/* Social Proof */}
          <ScrollReveal delay={400}>
            <div className="mt-12 flex items-center justify-center gap-6 text-sm text-neutral-500">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 border-neutral-950 bg-neutral-700"
                      style={{
                        background: `linear-gradient(135deg, hsl(${i * 60 + 10}, 50%, 45%), hsl(${i * 60 + 30}, 50%, 35%))`,
                      }}
                    />
                  ))}
                </div>
                <span>2,400+ teams</span>
              </div>
              <div className="w-px h-4 bg-neutral-700" />
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    className="w-3.5 h-3.5 text-accent"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1">4.9/5 rating</span>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Dashboard Preview */}
        <ScrollReveal delay={500} duration={800}>
          <div className="mt-16 md:mt-20 relative mx-auto max-w-5xl">
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden border border-neutral-800 shadow-2xl">
              {/* Fake browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-neutral-900 border-b border-neutral-800">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-neutral-700" />
                  <div className="w-3 h-3 rounded-full bg-neutral-700" />
                  <div className="w-3 h-3 rounded-full bg-neutral-700" />
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-6 bg-neutral-800 rounded-md max-w-xs mx-auto flex items-center justify-center">
                    <span className="text-xs text-neutral-500">app.accretion.io/dashboard</span>
                  </div>
                </div>
              </div>

              {/* Dashboard mockup */}
              <div className="bg-neutral-900 p-6 md:p-8">
                {/* Top bar */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <div className="h-5 w-32 bg-neutral-800 rounded mb-2" />
                    <div className="h-3 w-48 bg-neutral-800/50 rounded" />
                  </div>
                  <div className="flex gap-2">
                    <div className="h-9 w-20 bg-neutral-800 rounded-lg" />
                    <div className="h-9 w-24 bg-accent rounded-lg" />
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: "Revenue", value: "$48.2K", change: "+12.5%", up: true },
                    { label: "Users", value: "2,847", change: "+8.2%", up: true },
                    { label: "Conversion", value: "3.24%", change: "+0.8%", up: true },
                    { label: "Churn", value: "1.2%", change: "-0.3%", up: false },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-neutral-800/50 rounded-xl p-4 border border-neutral-800"
                    >
                      <p className="text-xs text-neutral-500 mb-1">{stat.label}</p>
                      <p className="text-xl font-bold text-white">{stat.value}</p>
                      <p
                        className={`text-xs mt-1 ${
                          stat.up ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {stat.change}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Chart placeholder */}
                <div className="bg-neutral-800/30 rounded-xl p-6 border border-neutral-800 h-48 flex items-end gap-1">
                  {Array.from({ length: 24 }).map((_, i) => {
                    const h = 20 + Math.sin(i * 0.5 + 1) * 40 + Math.random() * 20;
                    return (
                      <div
                        key={i}
                        className="flex-1 rounded-sm bg-accent/60"
                        style={{ height: `${h}%` }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Glow behind dashboard */}
            <div
              className="absolute -inset-4 -z-10 blur-3xl opacity-30"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(255, 98, 7, 0.2), transparent 70%)",
              }}
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
