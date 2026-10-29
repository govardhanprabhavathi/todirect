"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { BlurIn } from "@/components/ui/BlurInText";

export function JourneyCards() {
  const [activeCard, setActiveCard] = useState<number>(2); // Default to Card 3 (Test)

  const stages = [
    {
      id: 0,
      displayTitle: "Start",
      summary: "Assess your current financial comfort level with zero test anxiety.",
      details: "Establishes your personalized starting snapshot across cashflow, compounding, and risk.",
      link: "/baseline",
      bullets: [
        { color: "purple", text: "5-question diagnostic calibrating baseline score" },
        { color: "purple", text: "Surface existing cognitive heuristics & biases" },
        { color: "orange", text: "Personalized syllabus pacing calibrated" },
      ],
      status: "Baseline Diagnostic Ready",
    },
    {
      id: 1,
      displayTitle: "Learn",
      summary: "Master money, saving, inflation, and risk through short, scannable explanations.",
      details: "Real-world analogies, Rule of 72 calculators, and transparent mathematical proof.",
      link: "/curriculum",
      bullets: [
        { color: "purple", text: "7 progressive bite-sized visual curriculum topics" },
        { color: "purple", text: "Mental math Rule of 72 doubling formulas" },
        { color: "orange", text: "Real purchasing power vs nominal returns" },
      ],
      status: "Curriculum Catalog Ready",
    },
    {
      id: 2,
      displayTitle: "Test",
      summary: "Scenario-based questions that test practical reasoning, not trivia memorization.",
      details: "While you solve scenarios, the engine maps your answers to underlying concepts.",
      link: "/sign-in",
      bullets: [
        { color: "purple", text: "Instant conceptual explanation on every attempt" },
        { color: "purple", text: "Detection of repeated misconception patterns" },
        { color: "orange", text: "Evidence logged to your Understanding Tracker" },
      ],
      status: "Interactive Session Ready",
    },
    {
      id: 3,
      displayTitle: "Practise",
      summary: "Deploy virtual capital across reviewed educational index funds, bonds, and cash.",
      details: "Simulate real-world asset allocation and evaluate concentration risk safely.",
      link: "/practice",
      bullets: [
        { color: "purple", text: "₹10,000 virtual balance with zero bank links" },
        { color: "purple", text: "Automated concentration risk warning alerts" },
        { color: "orange", text: "Required trade rationale reflection habit" },
      ],
      status: "Sandbox Environment Ready",
    },
  ];

  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* ─── TYPOGRAPHY HEADER WITH BLUR-IN ANIMATION ─── */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        {/* Eyebrow */}
        <BlurIn
          as="span"
          delay={0.05}
          duration={0.7}
          blurAmount="6px"
          className="text-[11px] font-semibold text-[#475569] dark:text-slate-400 uppercase tracking-[0.14em] block mb-3"
        >
          FINANCIAL LEARNING PATHS
        </BlurIn>

        {/* Display Heading */}
        <BlurIn
          as="h2"
          delay={0.12}
          duration={0.8}
          blurAmount="10px"
          yOffset={16}
          className="text-3xl sm:text-5xl md:text-[56px] font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-[-0.03em] leading-[1.12] mb-5"
        >
          Built for people whose future runs on financial clarity
        </BlurIn>

        {/* Subtitle */}
        <BlurIn
          as="p"
          delay={0.22}
          duration={0.8}
          blurAmount="8px"
          yOffset={12}
          className="text-base sm:text-lg font-normal text-[#475569] dark:text-[#94A3B8] leading-[1.65] max-w-2xl mx-auto mb-7"
        >
          Understanding moves you forward, but market noise and speculative tips can wipe you out. TO DIRECT handles the foundations before, during, and after practice, so you make smart decisions with confidence.
        </BlurIn>

        {/* Button: "Start for free" */}
        <BlurIn delay={0.32} duration={0.7} blurAmount="6px" className="flex justify-center">
          <Link href="/sign-in">
            <button
              type="button"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full bg-[#0A1629] dark:bg-white hover:bg-[#1E293B] dark:hover:bg-slate-100 text-white dark:text-[#0A1629] text-sm font-medium transition-all shadow-xs cursor-pointer"
            >
              Start for free
            </button>
          </Link>
        </BlurIn>
      </div>

      {/* ─── 4-COLUMN CARDS CONTAINER (ALL CARDS EQUAL HEIGHT) ─── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-stretch">
        {stages.map((st, idx) => {
          const isActive = activeCard === idx;

          return (
            <BlurIn
              key={st.id}
              delay={0.08 * idx}
              duration={0.75}
              blurAmount="8px"
              className="h-full"
            >
              <div
                onClick={() => setActiveCard(idx)}
                className={`h-full rounded-3xl p-6 sm:p-7 transition-all duration-300 cursor-pointer border flex flex-col justify-between ${
                  isActive
                    ? "bg-white dark:bg-[#111625] border-blue-500/80 dark:border-blue-500 shadow-float ring-2 ring-blue-500/10 dark:ring-blue-500/20"
                    : "bg-white/90 dark:bg-[#111625]/80 hover:bg-white dark:hover:bg-[#111625] border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs"
                }`}
              >
              {/* Card Body Content */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3.5">
                  <h3 className="text-xl sm:text-2xl font-semibold text-[#0A1629] dark:text-white tracking-[-0.015em]">
                    {st.displayTitle}
                  </h3>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider transition-colors ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    0{idx + 1}
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-normal text-[#64748B] dark:text-slate-400 leading-relaxed mb-3">
                  {st.summary}
                </p>

                <p className="text-xs sm:text-sm font-normal text-[#475569] dark:text-slate-300 leading-relaxed pt-3 border-t border-slate-100 dark:border-slate-800">
                  {st.details}
                </p>

                {/* 3 Value Bullets */}
                <div className="space-y-2.5 pt-3 my-3">
                  {st.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5">
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                          b.color === "purple"
                            ? "bg-purple-100 dark:bg-purple-950/60 text-purple-600 dark:text-purple-300"
                            : "bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-300"
                        }`}
                      >
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <span className="text-xs font-normal text-[#475569] dark:text-slate-300 leading-tight">
                        {b.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer: Attendees + Explore Action */}
              <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center -space-x-1.5">
                    <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-semibold ring-2 ring-white dark:ring-[#111625]">
                      P
                    </div>
                    <div className="w-6 h-6 rounded-full bg-slate-900 dark:bg-slate-700 text-white flex items-center justify-center text-[10px] font-semibold ring-2 ring-white dark:ring-[#111625]">
                      F
                    </div>
                  </div>
                  <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                    {st.status}
                  </span>
                </div>

                <Link
                  href={st.link}
                  className={`flex items-center justify-between text-xs font-semibold transition-colors group ${
                    isActive
                      ? "text-[#2563FF] dark:text-blue-400"
                      : "text-slate-500 dark:text-slate-400 hover:text-[#0A1629] dark:hover:text-white"
                  }`}
                >
                  <span>Explore step</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </BlurIn>
        );
      })}
      </div>
    </section>
  );
}
