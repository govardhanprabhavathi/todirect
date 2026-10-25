'use client';

import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

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
      {/* Outer Card with Twilight Mesh Gradient */}
      <div className="relative rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 lg:p-16 bg-[#0A1629] text-white shadow-2xl overflow-hidden border border-slate-800">
        {/* Ambient background glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl mb-14">
          <span className="text-[11px] font-semibold text-blue-300 uppercase tracking-[0.14em] block mb-3">
            LEARNER STORIES
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-[54px] font-semibold text-white tracking-[-0.03em] leading-[1.12]">
            Loved by beginners. <br />
            <span className="text-blue-400">Trusted by thoughtful learners.</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg font-normal text-slate-300 leading-[1.65]">
            Hear from students and early career professionals who built financial confidence without losing hard-earned savings to market speculation.
          </p>
        </div>

        {/* 3 Testimonial Cards */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-7 border border-white/10 flex flex-col justify-between hover:bg-white/15 transition-all duration-300"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm sm:text-base font-normal text-slate-200 leading-[1.65] italic">
                  "{item.quote}"
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-white/10 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full ${item.avatarBg} text-white font-bold flex items-center justify-center text-sm shadow-md`}>
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white flex items-center gap-1.5">
                    {item.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
                  </h4>
                  <p className="text-xs text-slate-400 font-normal">
                    {item.role} • {item.collegeOrCompany}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
