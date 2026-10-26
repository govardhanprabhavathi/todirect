import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroMeshCard } from '@/components/home/HeroMeshCard';
import { JourneyCards } from '@/components/home/JourneyCards';
import { FeatureAccordion } from '@/components/home/FeatureAccordion';
import { AIAssistantSpotlight } from '@/components/home/AIAssistantSpotlight';
import { CurriculumGrid } from '@/components/home/CurriculumGrid';
import { TestimonialsBanner } from '@/components/home/TestimonialsBanner';
import { EcosystemGrid } from '@/components/home/EcosystemGrid';
import { PreFooterCTA } from '@/components/home/PreFooterCTA';

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

        {/* 8. Luxury Bottom Pre-Footer CTA with 3D Interactive Gold Coin */}
        <PreFooterCTA />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
