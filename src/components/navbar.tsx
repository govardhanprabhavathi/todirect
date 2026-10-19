"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll on mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass-dark py-2"
          : "bg-transparent py-3"
      }`}
    >
      <nav className="section-container flex items-center justify-between gap-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 shrink-0"
        >
          {/* Logo Mark */}
          <div className="w-7 h-7 relative">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
              <path
                d="M20.089 0.58C21.152-0.295 22.989-0.334 22.164 1.542C21.119 3.92 19.299 5.953 18.177 8.407C18 8.809 17.971 9.261 18.093 9.682L21.021 20.232C21.081 20.449 20.947 20.626 20.722 20.626H18.702C18.031 20.626 17.347 20.102 17.172 19.454L17.055 19.015C17.007 18.832 17.032 18.636 17.124 18.47C17.657 17.498 18.019 16.442 18.194 15.347C18.214 15.225 18.031 15.19 17.988 15.306C16.884 18.292 14.172 20.562 10.664 20.754C10.19 20.78 8.008 20.773 8.079 20.092C8.855 19.152 9.462 18.354 9.665 18.292C12.288 17.484 14.756 16.892 15.639 13.828C16.102 12.218 15.716 11.03 15.362 9.488C15.317 9.292 15.35 9.086 15.454 8.913C16.773 6.731 18.349 5.171 19.747 3.193C19.882 3.001 19.667 2.823 19.502 2.99C13.836 8.677 10.344 15.865 4.37 21.329C3.71 21.932 2.95 22.649 2.229 23.16C-2.072 26.225 1.078 20.035 1.619 18.404C1.781 17.917 2.404 16.116 2.4 15.769C2.392 15.112 2.037 14.736 1.897 14.137C0.561 8.384 4.68 3.01 10.565 3.463C11.912 3.568 14.083 4.636 15.28 4.305C16.606 3.942 18.874 1.581 20.089 0.58ZM13.889 7.877C12.974 6.697 10.849 6.023 9.407 6.205C4.395 6.833 2.548 12.775 6.178 16.398C6.679 16.898 14.421 8.564 13.889 7.878Z"
                fill="currentColor"
                transform="translate(1 0)"
              />
            </svg>
          </div>
          <span className="text-white font-display font-bold text-lg tracking-tight">
            Accretion
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link px-4 py-2 rounded-lg hover:bg-white/5"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="#pricing" className="btn-ghost-dark text-sm py-2 px-4">
            Log In
          </Link>
          <Link
            href="#pricing"
            className="btn-primary text-sm py-2 px-5 gap-1.5"
          >
            Get Started
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-0 top-[56px] z-40 bg-neutral-950/98 backdrop-blur-xl transition-all duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col p-6 gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-lg font-medium text-neutral-300 hover:text-white py-3 px-4 rounded-xl hover:bg-white/5 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="#pricing"
              onClick={() => setMobileOpen(false)}
              className="btn-ghost-dark w-full justify-center"
            >
              Log In
            </Link>
            <Link
              href="#pricing"
              onClick={() => setMobileOpen(false)}
              className="btn-primary w-full justify-center"
            >
              Get Started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
