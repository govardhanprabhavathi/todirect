"use client";

import Link from "next/link";
import { ArrowUpRight, ShieldCheck, HeartHandshake } from "lucide-react";

const footerLinks = {
  Curriculum: [
    { label: "1. Money Fundamentals", href: "#curriculum" },
    { label: "2. Inflation & Compounding", href: "#curriculum" },
    { label: "3. Asset Classes", href: "#curriculum" },
    { label: "4. Risk & Volatility", href: "#curriculum" },
    { label: "5. Diversification", href: "#curriculum" },
    { label: "6. Scams & Pitfalls", href: "#curriculum" },
    { label: "7. ₹10K Sandbox", href: "#curriculum" },
  ],
  Platform: [
    { label: "The Learning Journey", href: "#how-it-works" },
    { label: "Finn AI Learning Coach", href: "#platform" },
    { label: "Deterministic Mastery", href: "#evidence" },
    { label: "Milestone Badges", href: "#platform" },
    { label: "Campus Partnerships", href: "#pricing" },
  ],
  Integrity: [
    { label: "Pedagogical Philosophy", href: "#safety" },
    { label: "AI Safety Guardrails", href: "#safety" },
    { label: "Zero-Brokerage Pledge", href: "#safety" },
    { label: "Anti-Speculation Policy", href: "#safety" },
    { label: "SEBI Compliance Stance", href: "#safety" },
  ],
  Privacy: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Education", href: "#" },
    { label: "Data Retention & DPDP", href: "#" },
    { label: "Account Deletion Request", href: "#" },
    { label: "Contact Grievance Officer", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 text-white">
      <div className="section-container py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 md:gap-8">
          {/* Brand info */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-7 h-7 rounded-lg bg-brand-blue flex items-center justify-center text-white">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4" stroke="currentColor">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-white font-display font-extrabold text-base tracking-tight">
                TO DIRECT
              </span>
            </Link>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm mb-4">
              A premium, full-stack financial learning platform for college students, 
              beginners, and young professionals. Educational only. Not a brokerage or financial advisory service.
            </p>

            <div className="p-3.5 rounded-2xl bg-neutral-900 border border-neutral-800 text-[11px] text-neutral-400 space-y-1 mb-6">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Learn Before You Invest</span>
              </div>
              <p>Rewards demonstrated understanding and risk awareness—never simulated short-term trading profits.</p>
            </div>

            {/* Newsletter / Study digest */}
            <div>
              <span className="text-[11px] text-neutral-300 font-bold block mb-2 uppercase tracking-wider">
                Weekly Student Finance Digest
              </span>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="name@college.edu"
                  className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-brand-blue transition-colors"
                />
                <button className="px-4 py-2 bg-brand-blue text-white text-xs font-bold rounded-xl hover:bg-brand-blue-deep transition-colors shrink-0">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Footer links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-neutral-300 mb-4 font-display">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-xs text-neutral-400 hover:text-brand-blue-light transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal Disclaimer & Bottom bar */}
        <div className="mt-14 pt-8 border-t border-neutral-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>
            © {new Date().getFullYear()} TO DIRECT Financial Education Initiative. All rights reserved. Strictly educational.
          </p>
          <div className="flex items-center gap-4 text-neutral-400">
            <span className="hover:text-white transition-colors cursor-pointer">SEBI Pedagogy Disclosures</span>
            <span>·</span>
            <span className="hover:text-white transition-colors cursor-pointer">DPDP Act Compliance</span>
            <span>·</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
