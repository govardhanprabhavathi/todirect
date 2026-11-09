'use client';

import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { BlurIn } from '@/components/ui/BlurInText';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  collegeOrCompany: string;
  avatarBg: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "TO DIRECT helped me realize that a 7% FD isn't giving me 7% real growth once 6% inflation and taxes are deducted. Finn’s Socratic questions changed how I view money forever.",
    name: "Aarav Sharma",
    role: "Engineering Student",
    collegeOrCompany: "IIT Delhi",
    avatarBg: "bg-blue-600"
  },
  {
    quote: "The misconception detection caught my bad habits immediately. I used to think cheap penny stocks were 'cheap.' Now I understand market cap and index investing.",
    name: "Pooja Varma",
    role: "Junior Associate",
    collegeOrCompany: "Deloitte India",
    avatarBg: "bg-indigo-600"
  },
  {
    quote: "The ₹10,000 practice sandbox is brilliant. It won't let you gamble blindly. It forced me to balance debt and equity before I ever opened a real Demat account.",
    name: "Rohan Nair",
    role: "Final Year B.Com",
    collegeOrCompany: "Loyola College Chennai",
    avatarBg: "bg-teal-600"
  }
];

export function TestimonialsBanner() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Outer Card with Refined Graphite Background */}
      <div className="relative rounded-2xl p-8 sm:p-12 lg:p-14 bg-slate-900 text-white shadow-xs overflow-hidden border border-slate-800">
        <div className="relative z-10 max-w-3xl mb-12">
          <BlurIn
            as="span"
            delay={0.05}
            duration={0.7}
            blurAmount="6px"
            className="text-xs font-medium text-slate-400 block mb-3"
          >
            Learner reflections
          </BlurIn>

          <BlurIn
            as="h2"
            delay={0.12}
            duration={0.8}
            blurAmount="10px"
            yOffset={16}
            className="text-3xl sm:text-5xl md:text-[50px] font-semibold text-white tracking-tight leading-[1.15]"
          >
            Loved by beginners. <br />
            Trusted by thoughtful learners.
          </BlurIn>

          <BlurIn
            as="p"
            delay={0.22}
            duration={0.8}
            blurAmount="8px"
            yOffset={12}
            className="mt-4 text-base sm:text-lg font-normal text-slate-400 leading-relaxed"
          >
            Hear from students and early career professionals who built financial confidence without losing savings to market speculation.
          </BlurIn>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((item, idx) => (
            <BlurIn
              key={idx}
              delay={0.1 * idx}
              duration={0.75}
              blurAmount="8px"
              className="h-full"
            >
              <div className="bg-white/5 rounded-xl p-6 border border-white/10 flex flex-col justify-between hover:border-white/20 transition-colors h-full">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm font-normal text-slate-300 leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${item.avatarBg} text-white font-medium flex items-center justify-center text-xs`}>
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-medium text-white flex items-center gap-1.5">
                      {item.name}
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                    </h4>
                    <p className="text-[11px] text-slate-400 font-normal">
                      {item.role} • {item.collegeOrCompany}
                    </p>
                  </div>
                </div>
              </div>
            </BlurIn>
          ))}
        </div>
      </div>
    </section>
  );
}
