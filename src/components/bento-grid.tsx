"use client";

import { ScrollReveal } from "./scroll-reveal";
import {
  BarChart3,
  Brain,
  Clock,
  Lock,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

export function BentoGrid() {
  return (
    <section className="py-24 md:py-32">
      <div className="section-container">
        <div className="text-center mb-16 md:mb-20">
          <ScrollReveal>
            <div className="section-label mx-auto w-fit">Platform</div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="section-title text-white mb-5">
              Powerful tools,{" "}
              <span className="text-gradient-accent">beautifully crafted</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="section-description mx-auto">
              Every feature is designed with intention. Powerful under the hood,
              effortless on the surface.
            </p>
          </ScrollReveal>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto">
          {/* Card 1 — Large (spans 2 cols) */}
          <ScrollReveal delay={0} className="lg:col-span-2">
            <div className="card-dark p-8 md:p-10 h-full relative overflow-hidden group">
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-6">
                  <BarChart3 className="w-6 h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                  Real-time Analytics Dashboard
                </h3>
                <p className="text-neutral-400 leading-relaxed max-w-md mb-8">
                  Track every metric that matters. Custom dashboards with
                  drag-and-drop widgets, live data streams, and exportable reports.
                </p>
              </div>

              {/* Mini chart visualization */}
              <div className="relative z-10 bg-neutral-800/50 rounded-xl p-5 border border-neutral-700/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-xs text-neutral-400 font-medium">Revenue Stream</span>
                  </div>
                  <span className="text-xs text-accent font-semibold">+24.5%</span>
                </div>
                <div className="flex items-end gap-[3px] h-20">
                  {Array.from({ length: 32 }).map((_, i) => {
                    const base = 20 + Math.sin(i * 0.3 + 1) * 30;
                    const growth = i * 1.5;
                    const noise = Math.sin(i * 2.1) * 8;
                    const h = Math.min(95, base + growth + noise);
                    return (
                      <div
                        key={i}
                        className="flex-1 rounded-[2px] transition-all duration-300"
                        style={{
                          height: `${h}%`,
                          background:
                            i > 26
                              ? "linear-gradient(to top, #ff6207, #ff852f)"
                              : "linear-gradient(to top, rgba(255,98,7,0.3), rgba(255,98,7,0.1))",
                        }}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <div
                  className="w-full h-full"
                  style={{
                    background: "radial-gradient(circle at top right, rgba(255,98,7,0.08), transparent 60%)",
                  }}
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2 — Tall */}
          <ScrollReveal delay={100}>
            <div className="card-dark p-8 h-full relative overflow-hidden group">
              <div className="w-12 h-12 rounded-2xl bg-purple-wash text-purple flex items-center justify-center mb-6">
                <Brain className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">
                AI-Powered Insights
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-6">
                Machine learning models analyze your data patterns and surface
                actionable recommendations before you even ask.
              </p>

              {/* AI insight cards */}
              <div className="space-y-3">
                {[
                  { label: "Churn Risk", value: "3 accounts", severity: "warning" },
                  { label: "Upsell Signal", value: "12 accounts", severity: "success" },
                  { label: "Anomaly", value: "API latency spike", severity: "error" },
                ].map((insight) => (
                  <div
                    key={insight.label}
                    className="bg-neutral-800/50 rounded-lg p-3 border border-neutral-700/50 flex items-center justify-between"
                  >
                    <div>
                      <span className="text-xs text-neutral-500">{insight.label}</span>
                      <p className="text-sm text-white font-medium">{insight.value}</p>
                    </div>
                    <div
                      className={`w-2 h-2 rounded-full ${
                        insight.severity === "warning"
                          ? "bg-yellow-400"
                          : insight.severity === "success"
                          ? "bg-green-400"
                          : "bg-red-400"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3 */}
          <ScrollReveal delay={150}>
            <div className="card-dark p-8 h-full group">
              <div className="w-12 h-12 rounded-2xl bg-success-wash text-success flex items-center justify-center mb-6">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">
                Workflow Automation
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                Set up triggers, conditions, and actions. Automate onboarding
                emails, slack alerts, and lifecycle campaigns without code.
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {["Triggers", "Actions", "Conditions", "Webhooks"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 bg-neutral-800 text-neutral-400 text-xs font-medium rounded-md border border-neutral-700/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Card 4 */}
          <ScrollReveal delay={200}>
            <div className="card-dark p-8 h-full group">
              <div className="w-12 h-12 rounded-2xl bg-pink-wash text-pink flex items-center justify-center mb-6">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">
                Team Collaboration
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                Shared dashboards, annotations, and comments. Keep everyone
                aligned on the metrics that matter most.
              </p>
              {/* Avatars */}
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-neutral-750"
                      style={{
                        background: `linear-gradient(135deg, hsl(${i * 80 + 200}, 50%, 50%), hsl(${i * 80 + 220}, 50%, 35%))`,
                      }}
                    />
                  ))}
                </div>
                <span className="text-xs text-neutral-500">+8 more</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 5 — Wide */}
          <ScrollReveal delay={250} className="lg:col-span-2">
            <div className="card-dark p-8 md:p-10 h-full group flex flex-col md:flex-row items-start gap-8">
              <div className="flex-1">
                <div className="w-12 h-12 rounded-2xl bg-warning-wash text-warning flex items-center justify-center mb-6">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  Enterprise-Grade Security
                </h3>
                <p className="text-neutral-400 leading-relaxed">
                  SOC 2 Type II certified. GDPR compliant. End-to-end encryption
                  with AES-256. Role-based access control with SSO and SAML support.
                </p>
              </div>
              <div className="flex-1 w-full">
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Encryption", status: "AES-256" },
                    { label: "Auth", status: "SSO + SAML" },
                    { label: "Compliance", status: "SOC 2" },
                    { label: "Privacy", status: "GDPR" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="bg-neutral-800/50 rounded-xl p-4 border border-neutral-700/50 text-center"
                    >
                      <p className="text-xs text-neutral-500 mb-1">{item.label}</p>
                      <p className="text-sm font-semibold text-white">{item.status}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 6 */}
          <ScrollReveal delay={300}>
            <div className="card-dark p-8 h-full group relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">
                Growth Forecasting
              </h3>
              <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                Predictive models project your MRR, ARR, and growth trajectory.
                Plan with confidence using AI-driven forecasts.
              </p>
              {/* Mini forecast */}
              <div className="flex items-end gap-1 h-16">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="flex-1 flex flex-col gap-0.5">
                    <div
                      className="rounded-sm bg-accent/20"
                      style={{ height: `${30 + i * 8}%` }}
                    />
                    {i >= 5 && (
                      <div
                        className="rounded-sm bg-accent/40 border border-accent/30 border-dashed"
                        style={{ height: `${(i - 4) * 12}%` }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
