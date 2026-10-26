"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";

export function InteractiveGoldCoin() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState<number>(0);
  const [rotateY, setRotateY] = useState<number>(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [glare, setGlare] = useState<{ x: number; y: number; opacity: number }>({
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

    // Responsive 3D tilt calculation (-26deg to +26deg)
    const rotX = ((y - centerY) / centerY) * -24;
    const rotY = ((x - centerX) / centerX) * 26;

    setRotateX(rotX);
    setRotateY(rotY);

    // Dynamic light glare coordinates reflecting off the metallic face
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlare({ x: glareX, y: glareY, opacity: 0.55 });
  }, []);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-2 sm:p-4 select-none">
      {/* Warm Golden Ambient Glow Behind the Coin */}
      <div
        className={`absolute w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 rounded-full transition-all duration-700 pointer-events-none ${
          isHovered
            ? "bg-amber-400/30 dark:bg-amber-500/25 blur-3xl scale-125"
            : "bg-amber-300/18 dark:bg-amber-500/15 blur-2xl scale-100"
        }`}
      />

      {/* 3D Perspective Viewport */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-64 h-64 sm:w-76 sm:h-76 md:w-88 md:h-88 lg:w-96 lg:h-96 cursor-grab active:cursor-grabbing flex items-center justify-center"
        style={{ perspective: "1200px" }}
      >
        {/* 3D Coin Model Rig */}
        <div
          className={`relative w-full h-full flex items-center justify-center transition-transform duration-200 ease-out ${
            !isHovered ? "animate-coin-float" : ""
          }`}
          style={{
            transformStyle: "preserve-3d",
            transform: isHovered
              ? `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.08, 1.08, 1.08) translateZ(30px)`
              : `rotateX(4deg) rotateY(-8deg) scale3d(1, 1, 1)`,
          }}
        >
          {/* High-Resolution Realistic 3D Coin Asset */}
          <div className="relative w-[88%] h-[88%] pointer-events-none drop-shadow-[0_24px_32px_rgba(180,83,9,0.35)] dark:drop-shadow-[0_24px_36px_rgba(0,0,0,0.65)]">
            <Image
              src="/images/gold-coin-3d.png"
              alt="TO DIRECT Financial Intelligence 3D Gold Coin"
              fill
              sizes="(max-width: 640px) 240px, (max-width: 768px) 300px, 380px"
              priority
              className="object-contain"
            />

            {/* Dynamic Specular Glare Reflection on Hover */}
            <div
              className="absolute inset-0 rounded-full pointer-events-none transition-opacity duration-200"
              style={{
                opacity: glare.opacity,
                background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.75) 0%, rgba(255,250,220,0.3) 30%, transparent 65%)`,
                mixBlendMode: "overlay",
              }}
            />

            {/* Ambient Metallic Surface Sweep */}
            <div
              className="absolute -inset-full w-[300%] h-[300%] pointer-events-none transform -rotate-45 opacity-25 animate-coin-shine"
              style={{
                background:
                  "linear-gradient(90deg, transparent 40%, rgba(255,255,255,0.85) 50%, transparent 60%)",
                mixBlendMode: "overlay",
              }}
            />
          </div>
        </div>

        {/* Dynamic Responsive Floor Contact Shadow */}
        <div
          className={`absolute -bottom-4 w-52 sm:w-64 md:w-72 h-8 rounded-[100%] transition-all duration-300 pointer-events-none ${
            isHovered
              ? "bg-amber-950/25 dark:bg-black/60 blur-xl scale-95"
              : "bg-amber-950/18 dark:bg-black/45 blur-lg scale-100"
          }`}
          style={{
            transform: `translateX(${rotateY * 0.45}px) scaleX(${1 - Math.abs(rotateY) * 0.006})`,
          }}
        />
      </div>
    </div>
  );
}
