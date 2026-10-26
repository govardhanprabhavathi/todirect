"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { Sparkles } from "lucide-react";

export function InteractiveGoldCoin() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [glarePos, setGlarePos] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation (-30deg to +30deg)
    const rotX = ((y - centerY) / centerY) * -28;
    const rotY = ((x - centerX) / centerX) * 28;

    setRotateX(rotX);
    setRotateY(rotY);

    // Glare position percentage (mirrored for realistic reflection)
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlarePos({ x: glareX, y: glareY, opacity: 0.65 });
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  // Stack of 10 edge slices to produce realistic 3D coin edge thickness
  const edgeSlices = Array.from({ length: 10 }, (_, i) => i - 5);

  return (
    <div className="relative flex flex-col items-center justify-center p-4 sm:p-6 select-none">
      {/* Warm Golden Ambient Glow Behind the Coin */}
      <div
        className={`absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full transition-all duration-700 pointer-events-none ${
          isHovered
            ? "bg-amber-400/25 dark:bg-amber-500/20 blur-3xl scale-125"
            : "bg-amber-300/15 dark:bg-amber-500/10 blur-2xl scale-100"
        }`}
      />

      {/* 3D Perspective Viewport */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-56 h-56 sm:w-68 sm:h-68 md:w-76 md:h-76 cursor-grab active:cursor-grabbing flex items-center justify-center"
        style={{ perspective: "1000px" }}
      >
        {/* 3D Coin Rig */}
        <div
          className={`relative w-48 h-48 sm:w-60 sm:h-60 md:w-68 md:h-68 transition-transform duration-200 ease-out ${
            !isHovered ? "animate-coin-float" : ""
          }`}
          style={{
            transformStyle: "preserve-3d",
            transform: isHovered
              ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.08, 1.08, 1.08) translateZ(20px)`
              : `rotateX(10deg) rotateY(-14deg) scale3d(1, 1, 1)`,
          }}
        >
          {/* Extruded 3D Edge Slices (Physical Thickness & Bevel) */}
          {edgeSlices.map((z, idx) => (
            <div
              key={idx}
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                transform: `translateZ(${z}px)`,
                background:
                  idx % 2 === 0
                    ? "radial-gradient(circle, #D97706 0%, #B45309 85%, #92400E 100%)"
                    : "radial-gradient(circle, #F59E0B 0%, #D97706 85%, #B45309 100%)",
                boxShadow: "0 0 1px rgba(0,0,0,0.4)",
              }}
            />
          ))}

          {/* Front Coin Face (+6px translateZ) */}
          <div
            className="absolute inset-0 rounded-full overflow-hidden shadow-2xl flex items-center justify-center"
            style={{
              transform: "translateZ(6px)",
              background: "conic-gradient(from 45deg, #FDE68A 0deg, #F59E0B 70deg, #FEF08A 140deg, #D97706 210deg, #FDE68A 280deg, #B45309 330deg, #FDE68A 360deg)",
              boxShadow:
                "inset 0 0 0 4px #FEF08A, inset 0 0 0 7px #D97706, inset 0 0 0 11px #F59E0B, inset 0 0 16px rgba(180, 83, 9, 0.6), 0 20px 35px -8px rgba(180, 83, 9, 0.4)",
            }}
          >
            {/* Knurled / Milled Outer Coin Rim */}
            <div
              className="absolute inset-1.5 rounded-full pointer-events-none opacity-40"
              style={{
                background:
                  "repeating-conic-gradient(from 0deg, #78350F 0deg 1.5deg, transparent 1.5deg 3deg, #FEF08A 3deg 4.5deg)",
              }}
            />

            {/* Inner Recessed Medallion Disc */}
            <div
              className="relative w-[82%] h-[82%] rounded-full flex flex-col items-center justify-center border-2 border-amber-300/80 shadow-inner"
              style={{
                background:
                  "radial-gradient(circle at 35% 30%, #FFFBEB 0%, #FEF08A 30%, #F59E0B 75%, #B45309 100%)",
                boxShadow: "inset 0 4px 8px rgba(0,0,0,0.25), inset 0 -4px 8px rgba(255,255,255,0.7)",
              }}
            >
              {/* Circular Microtext Engraving */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 200">
                <path
                  id="coinTextPath"
                  d="M 100, 100 m -68, 0 a 68,68 0 1,1 136,0 a 68,68 0 1,1 -136,0"
                  fill="none"
                />
                <text
                  className="text-[9.5px] font-bold tracking-[0.26em] fill-amber-950/70 dark:fill-amber-950/80 uppercase"
                  style={{ textShadow: "0 1px 0 rgba(255,255,255,0.6)" }}
                >
                  <textPath href="#coinTextPath" startOffset="0%">
                    ★ TO DIRECT ★ ZERO RISK FINANCIAL INTELLIGENCE ★
                  </textPath>
                </text>
              </svg>

              {/* Inner Beaded Ring */}
              <div className="absolute w-[68%] h-[68%] rounded-full border border-dashed border-amber-800/40 pointer-events-none" />

              {/* Embossed Indian Rupee (₹) Emblem */}
              <div
                className="relative z-10 flex flex-col items-center justify-center font-extrabold select-none transition-transform duration-200"
                style={{
                  transform: isHovered ? "translateZ(8px) scale(1.05)" : "translateZ(4px)",
                }}
              >
                <span
                  className="text-4xl sm:text-5xl md:text-6xl font-black text-amber-950 tracking-tight leading-none drop-shadow-[0_2px_3px_rgba(255,255,255,0.7)]"
                  style={{
                    filter: "drop-shadow(0 3px 2px rgba(120,53,15,0.45))",
                  }}
                >
                  ₹
                </span>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-amber-950/80 -mt-0.5">
                  10,000 Sandbox
                </span>
              </div>
            </div>

            {/* Dynamic Specular Glare Reflection on Hover */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300"
              style={{
                opacity: glarePos.opacity,
                background: `radial-gradient(circle at ${glarePos.x}% ${glarePos.y}%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.3) 25%, transparent 60%)`,
                mixBlendMode: "overlay",
              }}
            />

            {/* Sweeping Metallic Specular Bar */}
            <div
              className="absolute -inset-full w-[300%] h-[300%] pointer-events-none transform -rotate-45 opacity-30 animate-coin-shine"
              style={{
                background:
                  "linear-gradient(90deg, transparent 40%, rgba(255,255,255,0.75) 50%, transparent 60%)",
              }}
            />
          </div>
        </div>

        {/* Dynamic Interactive Soft Contact Shadow */}
        <div
          className={`absolute -bottom-6 w-44 sm:w-56 h-6 rounded-[100%] transition-all duration-300 pointer-events-none ${
            isHovered
              ? "bg-amber-950/20 dark:bg-black/50 blur-xl scale-95"
              : "bg-amber-950/15 dark:bg-black/40 blur-lg scale-100"
          }`}
          style={{
            transform: `translateX(${rotateY * 0.4}px) scaleX(${1 - Math.abs(rotateY) * 0.005})`,
          }}
        />
      </div>

      {/* Interactive Micro-Cue Pill */}
      <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 text-xs font-medium shadow-2xs">
        <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
        <span>3D Coin • Hover & tilt to inspect</span>
      </div>
    </div>
  );
}
