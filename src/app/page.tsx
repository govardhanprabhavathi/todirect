import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { LogoCloud } from "@/components/logo-cloud";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { BentoGrid } from "@/components/bento-grid";
import { Metrics } from "@/components/metrics";
import { Testimonials } from "@/components/testimonials";
import { Integrations } from "@/components/integrations";
import { Pricing } from "@/components/pricing";
import { Faq } from "@/components/faq";
import { Cta } from "@/components/cta";
import { Footer } from "@/components/footer";
import { SectionDivider } from "@/components/section-divider";

export default function Home() {
  return (
    <main className="relative overflow-x-hidden bg-neutral-950">
      <Navbar />

      {/* ─── Stage 1: Hero & Adoption Marquee (Dark) ─── */}
      <div className="bg-neutral-950">
        <Hero />
        <LogoCloud />
      </div>

      {/* ─── Stage 2: The 7 Foundation Modules (Dark) ─── */}
      <div className="bg-neutral-950">
        <Features />
      </div>

      {/* ─── Transition: Dark → Cream ─── */}
      <SectionDivider from="dark" to="cream" />

      {/* ─── Stage 3: The 6-Stage Learning Journey (Cream) ─── */}
      <div className="bg-cream">
        <HowItWorks />
      </div>

      {/* ─── Transition: Cream → Dark ─── */}
      <SectionDivider from="cream" to="dark" />

      {/* ─── Stage 4: Bento Grid — AI Coach Finn & Sandbox (Dark) ─── */}
      <div className="bg-neutral-950">
        <BentoGrid />
      </div>

      {/* ─── Stage 5: Evidence Mastery Metrics (Dark) ─── */}
      <div className="bg-neutral-950">
        <Metrics />
      </div>

      {/* ─── Transition: Dark → Cream ─── */}
      <SectionDivider from="dark" to="cream" />

      {/* ─── Stage 6: Learner Reflections & Testimonials (Cream) ─── */}
      <div className="bg-cream">
        <Testimonials />
      </div>

      {/* ─── Transition: Cream → Dark ─── */}
      <SectionDivider from="cream" to="dark" />

      {/* ─── Stage 7: Safety, Ethics & Safeguards (Dark) ─── */}
      <div className="bg-neutral-950">
        <Integrations />
      </div>

      {/* ─── Transition: Dark → Cream ─── */}
      <SectionDivider from="dark" to="cream" />

      {/* ─── Stage 8: Learning Tracks (Cream) ─── */}
      <div className="bg-cream">
        <Pricing />
      </div>

      {/* ─── Stage 9: Frequently Asked Questions (Cream) ─── */}
      <div className="bg-cream">
        <Faq />
      </div>

      {/* ─── Transition: Cream → Dark ─── */}
      <SectionDivider from="cream" to="dark" />

      {/* ─── Stage 10: Final Call To Action (Dark) ─── */}
      <div className="bg-neutral-950">
        <Cta />
      </div>

      {/* ─── Stage 11: Comprehensive Footer (Dark) ─── */}
      <div className="bg-neutral-950">
        <Footer />
      </div>
    </main>
  );
}
