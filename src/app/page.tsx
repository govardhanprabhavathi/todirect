import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { LogoCloud } from "@/components/logo-cloud";
import { Features } from "@/components/features";
import { BentoGrid } from "@/components/bento-grid";
import { HowItWorks } from "@/components/how-it-works";
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
    <main className="relative overflow-x-hidden">
      <Navbar />

      {/* ─── Dark Hero + Logo Cloud ─── */}
      <div className="bg-neutral-950">
        <Hero />
        <LogoCloud />
      </div>

      {/* ─── Features Grid — Dark ─── */}
      <div className="bg-neutral-950">
        <Features />
      </div>

      {/* ─── Transition: Dark → Cream ─── */}
      <SectionDivider from="dark" to="cream" />

      {/* ─── How it Works — Cream ─── */}
      <div className="bg-cream">
        <HowItWorks />
      </div>

      {/* ─── Transition: Cream → Dark ─── */}
      <SectionDivider from="cream" to="dark" />

      {/* ─── Bento Grid — Dark ─── */}
      <div className="bg-neutral-950">
        <BentoGrid />
      </div>

      {/* ─── Metrics — Dark (continuous) ─── */}
      <div className="bg-neutral-950">
        <Metrics />
      </div>

      {/* ─── Transition: Dark → Cream ─── */}
      <SectionDivider from="dark" to="cream" />

      {/* ─── Testimonials — Cream ─── */}
      <div className="bg-cream">
        <Testimonials />
      </div>

      {/* ─── Transition: Cream → Dark ─── */}
      <SectionDivider from="cream" to="dark" />

      {/* ─── Integrations — Dark ─── */}
      <div className="bg-neutral-950">
        <Integrations />
      </div>

      {/* ─── Transition: Dark → Cream ─── */}
      <SectionDivider from="dark" to="cream" />

      {/* ─── Pricing — Cream ─── */}
      <div className="bg-cream">
        <Pricing />
      </div>

      {/* ─── FAQ — Cream (continuous) ─── */}
      <div className="bg-cream">
        <Faq />
      </div>

      {/* ─── Transition: Cream → Dark ─── */}
      <SectionDivider from="cream" to="dark" />

      {/* ─── CTA — Dark ─── */}
      <div className="bg-neutral-950">
        <Cta />
      </div>

      {/* ─── Footer — Dark (continuous) ─── */}
      <div className="bg-neutral-950">
        <Footer />
      </div>
    </main>
  );
}
