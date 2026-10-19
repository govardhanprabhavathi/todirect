"use client";

import {
  BarChart3,
  Zap,
  Shield,
  Layers,
  Globe,
  LineChart,
  ArrowRight,
} from "lucide-react";
import { ScrollReveal } from "./scroll-reveal";

const features = [
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Deep insights into user behavior, conversion funnels, and revenue metrics. Make data-driven decisions with real-time dashboards.",
    accent: true,
  },
  {
    icon: Zap,
    title: "Lightning Performance",
    description:
      "Optimized for speed at every layer. Sub-100ms response times and edge-cached delivery ensure your users never wait.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "SOC 2 Type II compliant with end-to-end encryption, SSO, and granular role-based access controls.",
  },
  {
    icon: Layers,
    title: "Seamless Integrations",
    description:
      "Connect with 200+ tools you already use. Native integrations with Stripe, Slack, HubSpot, and more.",
  },
  {
    icon: Globe,
    title: "Global Scale",
    description:
      "Deploy to 35+ regions worldwide. Auto-scaling infrastructure handles millions of requests without breaking a sweat.",
  },
  {
    icon: LineChart,
    title: "Revenue Intelligence",
    description:
      "Predictive churn analysis, LTV forecasting, and cohort tracking. Understand your revenue before it happens.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <ScrollReveal>
            <div className="section-label mx-auto w-fit">Features</div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="section-title text-white mb-5">
              Everything you need to{" "}
              <span className="text-gradient-accent">scale</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="section-description mx-auto">
              Purpose-built tools designed for modern SaaS teams. From analytics
              to automation, every feature accelerates your growth trajectory.
            </p>
          </ScrollReveal>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <ScrollReveal key={feature.title} delay={i * 80}>
                <div
                  className={`group card-dark p-7 md:p-8 h-full flex flex-col ${
                    feature.accent
                      ? "border-accent/20 bg-gradient-to-br from-accent/5 to-transparent"
                      : ""
                  }`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${
                      feature.accent
                        ? "bg-accent/15 text-accent"
                        : "bg-neutral-800 text-neutral-400 group-hover:text-accent group-hover:bg-accent/10"
                    } transition-colors duration-300`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-neutral-400 leading-relaxed flex-1">
                    {feature.description}
                  </p>
                  <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn more <ArrowRight className="w-3.5 h-3.5" />
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
