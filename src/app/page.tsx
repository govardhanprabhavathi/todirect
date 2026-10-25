import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroMeshCard } from '@/components/home/HeroMeshCard';
import { JourneyCards } from '@/components/home/JourneyCards';
import { FeatureAccordion } from '@/components/home/FeatureAccordion';
import { AIAssistantSpotlight } from '@/components/home/AIAssistantSpotlight';
import { CurriculumGrid } from '@/components/home/CurriculumGrid';
import { TestimonialsBanner } from '@/components/home/TestimonialsBanner';
import { EcosystemGrid } from '@/components/home/EcosystemGrid';
import { Button } from '@/components/ui/Button';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-[#070A11] text-[#0A1629] dark:text-[#F8FAFC] selection:bg-[#E5F1FC] dark:selection:bg-[#1E3A8A] selection:text-[#0A1629] dark:selection:text-white antialiased transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar />

      <main className="relative overflow-hidden">
        {/* 1. Hero Section with Tab Capsule and Radiant Sky Mesh Card */}
        <HeroMeshCard />

        {/* 2. 4-Column Journey Cards with Expansion */}
        <JourneyCards />

        {/* 3. Deep Dive Feature Accordion with Allocation Preview */}
        <FeatureAccordion />

        {/* 4. AI Assistant Spotlight: Meet Finn */}
        <AIAssistantSpotlight />

        {/* 5. 7 Foundation Curriculum Grid */}
        <CurriculumGrid />

        {/* 6. Twilight Testimonials Banner */}
        <TestimonialsBanner />

        {/* 7. Ecosystem & Audience Tracks */}
        <EcosystemGrid />

        {/* 8. Luxury Bottom Pre-Footer CTA */}
        <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="relative rounded-[32px] sm:rounded-[40px] p-8 sm:p-14 lg:p-20 bg-gradient-to-br from-[#72B3FD] via-[#94C5FF] to-[#D2E4FF] dark:from-[#1E3A8A] dark:via-[#1D4ED8] dark:to-[#0284C7] text-center shadow-xl overflow-hidden border border-white/50 dark:border-white/10 transition-colors">
            {/* Ambient glows */}
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-white/40 dark:bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="text-[11px] font-semibold text-[#0A1629] dark:text-blue-200 uppercase tracking-[0.14em] block mb-4">
                ZERO COST • 100% EDUCATIONAL
              </span>

              <h2 className="text-3xl sm:text-5xl md:text-[54px] font-semibold text-[#0A1629] dark:text-white tracking-[-0.03em] leading-[1.12] mb-4">
                Build financial confidence <br />
                <span className="text-[#1748D8] dark:text-[#94C5FF]">before you invest a single rupee.</span>
              </h2>

              <p className="text-base sm:text-lg font-normal text-[#1E293B] dark:text-slate-200 leading-[1.65] max-w-xl mx-auto mb-8">
                Join thousands of students and young professionals who learn the mechanics of wealth, asset allocation, and market psychology risk-free.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
                <Link href="/sign-in" className="w-full sm:w-auto">
                  <button
                    type="button"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-[#0A1629] dark:bg-white hover:bg-[#1E293B] dark:hover:bg-slate-100 text-white dark:text-[#0A1629] text-sm font-medium transition-all shadow-xs"
                  >
                    Get started for free &rarr;
                  </button>
                </Link>
                <Link href="/curriculum" className="w-full sm:w-auto">
                  <button
                    type="button"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-[#0A1629] dark:text-white text-sm font-medium transition-all shadow-2xs"
                  >
                    Explore 7-Topic Syllabus
                  </button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-medium text-slate-700 dark:text-slate-300">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-800 dark:text-blue-300" />
                  No credit card required
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-800 dark:text-blue-300" />
                  ₹10,000 virtual balance included
                </span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-800 dark:text-blue-300" />
                  Zero speculative stock tips
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
