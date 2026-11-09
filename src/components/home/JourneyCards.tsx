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
      {/* ─── TYPOGRAPHY HEADER ─── */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        {/* Eyebrow */}
        <BlurIn
          as="span"
          delay={0.05}
          duration={0.7}
          blurAmount="6px"
          className="text-xs font-medium text-slate-500 dark:text-slate-400 block mb-3"
        >
          Learning progression
        </BlurIn>

        {/* Display Heading */}
        <BlurIn
          as="h2"
          delay={0.12}
          duration={0.8}
          blurAmount="10px"
          yOffset={16}
          className="text-3xl sm:text-5xl md:text-[50px] font-semibold text-slate-900 dark:text-slate-100 tracking-tight leading-[1.15] mb-5"
        >
          Built for people whose future runs on <span className="text-[#2563EB] dark:text-[#3B82F6]">financial clarity.</span>
        </BlurIn>

        {/* Subtitle */}
        <BlurIn
          as="p"
          delay={0.22}
          duration={0.8}
          blurAmount="8px"
          yOffset={12}
          className="text-base sm:text-lg font-normal text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto mb-7"
        >
          Understanding moves you forward, but market noise and speculative tips can wipe you out. TO DIRECT handles the foundations before, during, and after practice, so you make smart decisions with confidence.
        </BlurIn>

        {/* Button: "Start for free" */}
        <BlurIn delay={0.32} duration={0.7} blurAmount="6px" className="flex justify-center">
          <Link href="/sign-in">
            <button
              type="button"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs sm:text-sm font-medium transition-colors shadow-xs cursor-pointer"
            >
              Start for free
            </button>
          </Link>
        </BlurIn>
      </div>

      {/* ─── 4-COLUMN CARDS CONTAINER ─── */}
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
                className={`h-full rounded-xl p-5 sm:p-6 transition-colors cursor-pointer border flex flex-col justify-between ${
                  isActive
                    ? "bg-white dark:bg-[#111620] border-slate-300 dark:border-slate-700 shadow-xs"
                    : "bg-slate-50/60 dark:bg-[#111620]/60 hover:bg-white dark:hover:bg-[#111620] border-slate-200/80 dark:border-slate-800/80"
                }`}
              >
              {/* Card Body Content */}
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3.5">
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight">
                    {st.displayTitle}
                  </h3>
                  <span
                    className={`text-[11px] font-medium px-2 py-0.5 rounded-md transition-colors ${
                      isActive
                        ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    0{idx + 1}
                  </span>
                </div>

                <p className="text-xs sm:text-sm font-normal text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                  {st.summary}
                </p>

                <p className="text-xs sm:text-sm font-normal text-slate-700 dark:text-slate-300 leading-relaxed pt-3 border-t border-slate-100 dark:border-slate-800">
                  {st.details}
                </p>

                {/* 3 Value Bullets */}
                <div className="space-y-2.5 pt-3 my-3">
                  {st.bullets.map((b, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2.5">
                      <span className="w-4 h-4 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                      </span>
                      <span className="text-xs font-normal text-slate-600 dark:text-slate-300 leading-tight">
                        {b.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    {st.status}
                  </span>
                </div>

                <Link
                  href={st.link}
                  className={`flex items-center justify-between text-xs font-medium transition-colors group ${
                    isActive
                      ? "text-[#2563EB] dark:text-blue-400"
                      : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
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
