"use client";

import { ScrollReveal } from "./scroll-reveal";

const integrations = [
  { name: "Stripe", category: "Payments" },
  { name: "Slack", category: "Communication" },
  { name: "HubSpot", category: "CRM" },
  { name: "GitHub", category: "Development" },
  { name: "Figma", category: "Design" },
  { name: "Notion", category: "Productivity" },
  { name: "Linear", category: "Project Mgmt" },
  { name: "Intercom", category: "Support" },
  { name: "Segment", category: "Data" },
  { name: "Zapier", category: "Automation" },
  { name: "Salesforce", category: "CRM" },
  { name: "Jira", category: "Project Mgmt" },
];

export function Integrations() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <ScrollReveal>
            <div className="section-label mx-auto w-fit">Integrations</div>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h2 className="section-title text-white mb-5">
              Connects with your{" "}
              <span className="text-gradient-accent">entire stack</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="section-description mx-auto">
              200+ native integrations. Plug into the tools your team already
              uses without custom development or complex migrations.
            </p>
          </ScrollReveal>
        </div>

        {/* Integration grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {integrations.map((int, i) => (
            <ScrollReveal key={int.name} delay={i * 60}>
              <div className="card-dark flex flex-col items-center justify-center p-6 text-center aspect-square">
                <div className="w-12 h-12 rounded-2xl bg-neutral-800 border border-neutral-700 flex items-center justify-center mb-3">
                  <span className="text-lg font-bold text-neutral-500">
                    {int.name[0]}
                  </span>
                </div>
                <p className="text-sm font-semibold text-white">{int.name}</p>
                <p className="text-xs text-neutral-500 mt-0.5">
                  {int.category}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={400}>
          <p className="text-center text-sm text-neutral-500 mt-10">
            + 200 more integrations available.{" "}
            <a href="#" className="text-accent hover:underline">
              View all integrations →
            </a>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
