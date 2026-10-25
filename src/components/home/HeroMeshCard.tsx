"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Compass, Sparkles, Shield, Wallet, Calendar, Check, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function HeroMeshCard() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [calendarDate, setCalendarDate] = useState<{ year: number; month: number }>({ year: 2026, month: 6 }); // 6 = July (0-indexed)
  const [selectedDay, setSelectedDay] = useState<number>(22);
  const [selectedSlot, setSelectedSlot] = useState<string>("3:00 PM");
  const [bookingNotice, setBookingNotice] = useState<{ text: string; time: string } | null>({
    text: "Concept Check",
    time: "3:00 PM"
  });

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const currentMonthName = monthNames[calendarDate.month];
  const currentMonthYear = `${currentMonthName} ${calendarDate.year}`;

  const daysInMonth = new Date(calendarDate.year, calendarDate.month + 1, 0).getDate();
  const firstDayOfWeek = new Date(calendarDate.year, calendarDate.month, 1).getDay();

  const handlePrevMonth = () => {
    setCalendarDate((prev) => {
      const newMonth = prev.month === 0 ? 11 : prev.month - 1;
      const newYear = prev.month === 0 ? prev.year - 1 : prev.year;
      const maxDaysInNewMonth = new Date(newYear, newMonth + 1, 0).getDate();
      if (selectedDay > maxDaysInNewMonth) {
        setSelectedDay(maxDaysInNewMonth);
      }
      return { year: newYear, month: newMonth };
    });
  };

  const handleNextMonth = () => {
    setCalendarDate((prev) => {
      const newMonth = prev.month === 11 ? 0 : prev.month + 1;
      const newYear = prev.month === 11 ? prev.year + 1 : prev.year;
      const maxDaysInNewMonth = new Date(newYear, newMonth + 1, 0).getDate();
      if (selectedDay > maxDaysInNewMonth) {
        setSelectedDay(maxDaysInNewMonth);
      }
      return { year: newYear, month: newMonth };
    });
  };

  const tabs = [
    {
      id: 0,
      icon: Compass,
      label: "Money & Cash Flow",
      tag: "Foundations",
      heading: "Master cash flow mechanics before risking real capital",
      description:
        "Giving you complete conceptual clarity and practical reasoning, TO DIRECT is the easiest and most dependable way to build lifelong financial literacy.",
      link: "/curriculum#money",
      widgetTitle: "Daily Concept Check",
      slots: [
        { time: "12:30 PM", label: "Cash Flow Lab" },
        { time: "2:30 PM", label: "Opportunity Cost" },
        { time: "3:00 PM", label: "Concept Check" },
      ],
    },
    {
      id: 1,
      icon: Sparkles,
      label: "Compounding & Growth",
      tag: "Investing Engine",
      heading: "Understand exponential compounding with zero jargon",
      description:
        "Explore how time horizon and systematic discipline turn small consistent surpluses into financial freedom, backed by transparent mathematical proof.",
      link: "/curriculum#investments",
      widgetTitle: "Compounding Simulator",
      slots: [
        { time: "10:00 AM", label: "Rule of 72" },
        { time: "1:30 PM", label: "SIP Growth Lab" },
        { time: "4:00 PM", label: "Inflation Drift" },
      ],
    },
    {
      id: 2,
      icon: Shield,
      label: "Risk & Diversification",
      tag: "Capital Preservation",
      heading: "Spread risk across uncorrelated assets safely",
      description:
        "Learn why diversification is the only free lunch in finance. Differentiate daily market volatility from permanent loss of capital.",
      link: "/curriculum#risk",
      widgetTitle: "Allocation Buffer",
      slots: [
        { time: "11:00 AM", label: "Asset Classes" },
        { time: "2:00 PM", label: "Risk Matrix" },
        { time: "4:30 PM", label: "Defensive Assets" },
      ],
    },
    {
      id: 3,
      icon: Wallet,
      label: "₹10,000 Portfolio Sandbox",
      tag: "Contained Practice",
      heading: "Practise real portfolio reasoning with virtual money",
      description:
        "Execute simulated buys and sells across reviewed index funds, gold, and debt instruments with zero bank links and zero real-world financial hazard.",
      link: "/practice",
      widgetTitle: "Sandbox Trade Preview",
      slots: [
        { time: "10:30 AM", label: "Index Fund Buy" },
        { time: "1:00 PM", label: "Gold Rebalance" },
        { time: "3:30 PM", label: "Trade Reflection" },
      ],
    },
  ];

  const current = tabs[activeTab];

  return (
    <section className="pt-12 sm:pt-20 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* ─── EXACT CALENDLY HERO TYPOGRAPHY (Image 2) ─── */}
      <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-semibold text-[#0A1629] dark:text-[#F8FAFC] tracking-[-0.035em] leading-[1.08] mb-6">
          All the fundamentals of investing, handled.
        </h1>

        <p className="text-base sm:text-lg md:text-xl font-normal text-[#475569] dark:text-[#94A3B8] leading-relaxed max-w-2xl mx-auto mb-8 sm:mb-10">
          From AI-powered coaching to automated misconception checks and a ₹10,000 practice sandbox, get financial confidence with zero real-money risk.
        </p>

        {/* Dual Social Pills */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-3.5">
          <Link href="/sign-in" className="w-full sm:w-auto">
            <button
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-[#0A1629] dark:bg-white hover:bg-[#1E293B] dark:hover:bg-slate-100 text-white dark:text-[#0A1629] text-sm font-medium transition-all shadow-xs cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Sign up with Google</span>
            </button>
          </Link>

          <Link href="/sign-in" className="w-full sm:w-auto">
            <button
              type="button"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full bg-[#0A1629] dark:bg-white hover:bg-[#1E293B] dark:hover:bg-slate-100 text-white dark:text-[#0A1629] text-sm font-medium transition-all shadow-xs cursor-pointer"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 23 23">
                <path fill="#f35325" d="M1 1h10v10H1z" />
                <path fill="#81bc06" d="M12 1h10v10H12z" />
                <path fill="#05a6f0" d="M1 12h10v10H1z" />
                <path fill="#ffba08" d="M12 12h10v10H1z" />
              </svg>
              <span>Sign up with Microsoft</span>
            </button>
          </Link>
        </div>

        {/* Microcopy below auth pills */}
        <p className="text-xs font-normal text-[#64748B] dark:text-slate-400">
          <Link href="/sign-in" className="underline hover:text-[#0A1629] dark:hover:text-white transition-colors">
            Sign up with email
          </Link>{" "}
          • No credit card required
        </p>
      </div>

      {/* ─── 4-ICON FLOATING CAPSULE & RADIANT SKY MESH CARD ─── */}
      <div className="relative w-full max-w-5xl mx-auto mt-8">
        {/* 4-Icon Floating Category Switcher Capsule */}
        <div className="relative z-20 flex justify-center -mb-6">
          <div className="bg-white/95 dark:bg-[#111625]/95 backdrop-blur-md p-1.5 rounded-full border border-slate-200/80 dark:border-slate-800 shadow-card flex items-center gap-1.5">
            {tabs.map((tab, idx) => {
              const Icon = tab.icon;
              const isActive = activeTab === idx;
              return (
                <div key={tab.id} className="relative">
                  <button
                    onClick={() => {
                      setActiveTab(idx);
                      // Update active default slot
                      if (tab.slots.length > 0) {
                        setSelectedSlot(tab.slots[2]?.time || tab.slots[0].time);
                        setBookingNotice({
                          text: tab.slots[2]?.label || tab.slots[0].label,
                          time: tab.slots[2]?.time || tab.slots[0].time
                        });
                      }
                    }}
                    className={`relative w-11 h-11 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                      isActive
                        ? "bg-[#2563FF] text-white shadow-sm"
                        : "text-slate-500 dark:text-slate-400 hover:text-[#0A1629] dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`}
                    aria-label={tab.label}
                    title={tab.label}
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Radiant Gradient Mesh Card Container */}
        <div className="relative rounded-[32px] sm:rounded-[40px] p-4 sm:p-10 pt-12 sm:pt-14 bg-gradient-to-br from-[#74B9FF] via-[#A0C4FF] to-[#CADEFC] dark:from-[#1E3A8A] dark:via-[#1D4ED8] dark:to-[#0284C7] shadow-float border border-white/60 dark:border-white/10 overflow-hidden transition-all duration-300">
          {/* Soft background light blooms */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-white/40 dark:bg-white/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#60A5FA]/30 dark:bg-blue-500/20 blur-3xl pointer-events-none" />

          {/* Elevated Pure White Card Inside */}
          <div className="relative z-10 bg-white dark:bg-[#0B0F19] rounded-3xl p-6 sm:p-10 shadow-float border border-white/80 dark:border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-colors">
            {/* Left Column: Feature Description */}
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF0FF] dark:bg-blue-950/60 text-[#1748D8] dark:text-blue-300 text-xs font-semibold border border-[#2563FF]/20 dark:border-blue-800">
                <Compass className="w-3.5 h-3.5" />
                <span>{current.tag}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-semibold text-[#0A1629] dark:text-white tracking-[-0.025em] leading-tight">
                {current.heading}
              </h3>

              <p className="text-sm sm:text-base font-normal text-[#475569] dark:text-slate-300 leading-relaxed">
                {current.description}
              </p>

              <div className="pt-2">
                <Link
                  href={current.link}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0A1629] dark:text-white hover:text-[#2563FF] dark:hover:text-[#60A5FA] transition-colors group"
                >
                  <span>Explore {current.label}</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#2563FF] dark:text-[#60A5FA]" />
                </Link>
              </div>
            </div>

            {/* Right Column: Concept Check / Fully Functioning Calendar Widget */}
            <div className="lg:col-span-6 bg-[#FAF8F5] dark:bg-[#111625] rounded-2xl p-5 sm:p-6 border border-slate-200/70 dark:border-slate-800">
              {/* Header with Dynamic Month / Year Navigation */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/50 text-[#2563FF] dark:text-blue-300 flex items-center justify-center font-bold text-xs">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#0A1629] dark:text-white">{current.widgetTitle}</h4>
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-normal">
                      {currentMonthYear} • 15 min interactive
                    </p>
                  </div>
                </div>

                {/* Calendar Navigation Buttons matching image */}
                <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-200">
                  <button
                    type="button"
                    onClick={handlePrevMonth}
                    className="p-1 px-1.5 border border-slate-700 dark:border-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    aria-label="Previous month"
                    title="Previous month"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-[11px] font-semibold text-[#0A1629] dark:text-white px-1 select-none">
                    {currentMonthYear}
                  </span>
                  <button
                    type="button"
                    onClick={handleNextMonth}
                    className="p-1 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 hover:text-[#0A1629] dark:hover:text-white transition-colors cursor-pointer"
                    aria-label="Next month"
                    title="Next month"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Calendar Grid with Accurate Day-of-Week Alignment */}
              <div className="mt-4 grid grid-cols-7 gap-1 text-center text-[10px]">
                {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((d) => (
                  <span key={d} className="font-semibold text-slate-400 dark:text-slate-500 py-1">
                    {d}
                  </span>
                ))}

                {/* Blank slots before Day 1 */}
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-7 w-7" />
                ))}

                {/* Days of the month */}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const isSelected = selectedDay === day;
                  const dayOfWeek = (firstDayOfWeek + i) % 7;
                  // Featured cohort interactive days: Tue (2), Wed (3), Thu (4), Sat (6)
                  const isCohortDay = dayOfWeek === 2 || dayOfWeek === 3 || dayOfWeek === 4 || dayOfWeek === 6;

                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => {
                        setSelectedDay(day);
                        if (bookingNotice) {
                          setBookingNotice({
                            text: bookingNotice.text,
                            time: bookingNotice.time
                          });
                        }
                      }}
                      className={`h-7 w-7 mx-auto rounded-full flex items-center justify-center text-[11px] transition-all cursor-pointer ${
                        isSelected
                          ? "bg-[#2563FF] text-white font-bold shadow-xs scale-105"
                          : isCohortDay
                          ? "text-[#0A1629] dark:text-slate-100 font-bold hover:bg-blue-100 dark:hover:bg-blue-900/50"
                          : "text-slate-400 dark:text-slate-500 font-normal hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                      aria-label={`${currentMonthName} ${day}`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>

              {/* Time Slots Preview for Selected Day */}
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-[#0A1629] dark:text-white">
                    Select Practice Time for {currentMonthName} {selectedDay}
                  </span>
                  {bookingNotice && (
                    <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                      <Check className="w-3 h-3" /> Confirmed
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {current.slots.map((slot) => {
                    const isSelected = selectedSlot === slot.time;
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => {
                          setSelectedSlot(slot.time);
                          setBookingNotice({
                            text: slot.label,
                            time: slot.time
                          });
                        }}
                        className={`py-2 px-2 rounded-xl text-center border transition-all cursor-pointer ${
                          isSelected
                            ? "border-[#2563FF] bg-[#2563FF] text-white font-medium shadow-xs"
                            : "border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0B0F19] text-[#0A1629] dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-700 font-normal"
                        }`}
                      >
                        <span className="block text-[11px] font-semibold">{slot.time}</span>
                        <span
                          className={`block text-[9px] truncate ${
                            isSelected ? "text-blue-100 font-normal" : "text-slate-500 dark:text-slate-400"
                          }`}
                        >
                          {slot.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Booking feedback */}
                {bookingNotice && (
                  <div className="mt-3 p-2.5 rounded-xl bg-blue-50/90 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 flex items-center justify-between text-xs animate-fadeIn">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                      <span className="text-[11px] text-slate-700 dark:text-slate-300 font-medium truncate">
                        {bookingNotice.text} reserved for <strong>{currentMonthName} {selectedDay}</strong> at <strong>{bookingNotice.time}</strong>
                      </span>
                    </div>
                    <Link href="/sign-in" className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline shrink-0 ml-2">
                      Enter &rarr;
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
