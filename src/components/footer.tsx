"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Integrations", href: "#" },
    { label: "Changelog", href: "#" },
    { label: "Roadmap", href: "#" },
  ],
  Company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press Kit", href: "#" },
    { label: "Contact", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Guides", href: "#" },
    { label: "Community", href: "#" },
    { label: "Status", href: "#" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Cookies", href: "#" },
    { label: "GDPR", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-neutral-800/50">
      <div className="section-container py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 md:gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-6 h-6 text-white">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full"
                >
                  <path
                    d="M20.089 0.58C21.152-0.295 22.989-0.334 22.164 1.542C21.119 3.92 19.299 5.953 18.177 8.407C18 8.809 17.971 9.261 18.093 9.682L21.021 20.232C21.081 20.449 20.947 20.626 20.722 20.626H18.702C18.031 20.626 17.347 20.102 17.172 19.454L17.055 19.015C17.007 18.832 17.032 18.636 17.124 18.47C17.657 17.498 18.019 16.442 18.194 15.347C18.214 15.225 18.031 15.19 17.988 15.306C16.884 18.292 14.172 20.562 10.664 20.754C10.19 20.78 8.008 20.773 8.079 20.092C8.855 19.152 9.462 18.354 9.665 18.292C12.288 17.484 14.756 16.892 15.639 13.828C16.102 12.218 15.716 11.03 15.362 9.488C15.317 9.292 15.35 9.086 15.454 8.913C16.773 6.731 18.349 5.171 19.747 3.193C19.882 3.001 19.667 2.823 19.502 2.99C13.836 8.677 10.344 15.865 4.37 21.329C3.71 21.932 2.95 22.649 2.229 23.16C-2.072 26.225 1.078 20.035 1.619 18.404C1.781 17.917 2.404 16.116 2.4 15.769C2.392 15.112 2.037 14.736 1.897 14.137C0.561 8.384 4.68 3.01 10.565 3.463C11.912 3.568 14.083 4.636 15.28 4.305C16.606 3.942 18.874 1.581 20.089 0.58Z"
                    fill="currentColor"
                    transform="translate(1 0)"
                  />
                </svg>
              </div>
              <span className="text-white font-display font-bold text-base">
                Accretion
              </span>
            </Link>
            <p className="text-sm text-neutral-500 leading-relaxed max-w-xs mb-6">
              The all-in-one platform for SaaS growth. Analytics, automation, and
              intelligence — designed for modern teams.
            </p>
            {/* Newsletter */}
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-accent transition-colors"
              />
              <button className="px-4 py-2 bg-accent text-white text-sm font-semibold rounded-lg hover:bg-accent-hover transition-colors shrink-0">
                Subscribe
              </button>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-neutral-300 mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-500 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-neutral-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} Accretion. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {["Twitter", "GitHub", "LinkedIn", "Discord"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs text-neutral-500 hover:text-white transition-colors flex items-center gap-1"
              >
                {social}
                <ArrowUpRight className="w-3 h-3" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
