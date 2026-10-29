"use client";

import React, { useRef, useState, useEffect, Suspense, memo } from 'react';
import { Canvas } from '@react-three/fiber';
import { useScroll, useSpring, motion } from 'framer-motion';
import RoomScene, { HOW_YOU_LEARN_DATA } from './RoomScene';

// Isolated HUD to prevent re-rendering the 3D Canvas on scroll
const ProjectHUD = memo(function ProjectHUD({ smoothProgress, projects }) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  useEffect(() => {
    return smoothProgress.on('change', (latest) => {
      const normalized = Math.min(
        projects.length - 1,
        Math.max(0, Math.floor((latest / 0.9) * projects.length))
      );
      setActiveProjectIndex(normalized);
    });
  }, [smoothProgress, projects.length]);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-end p-4 sm:p-8 md:p-12 text-white font-sans">
      <div className="flex items-end justify-between w-full max-w-7xl mx-auto">
        <div>
          <p className="text-[10px] font-semibold tracking-wider text-blue-400 uppercase">Interactive 3D Corridor</p>
          <p className="text-sm sm:text-base font-bold tracking-tight text-white flex items-center gap-2">
            <span className="text-blue-400 font-mono">0{activeProjectIndex + 1}</span>
            <span>{projects[activeProjectIndex]?.name}</span>
          </p>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-28 sm:w-56 h-[2px] bg-white/20 relative overflow-hidden rounded-full">
          <motion.div className="h-full bg-[#2563FF] origin-left" style={{ scaleX: smoothProgress }} />
        </div>
      </div>
    </div>
  );
});

export default function ProjectRoom3D() {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Pause WebGL rendering when offscreen for performance
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: '200px 0px 200px 0px' }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Track scroll progress across a 950vh container to allow full exploration
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Spring physics for smooth drone-like inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 22,
    mass: 0.6,
    restDelta: 0.0001,
  });

  const projects = HOW_YOU_LEARN_DATA;

  return (
    <section
      ref={containerRef}
      className={`relative w-full ${isMobile ? 'h-[750vh]' : 'h-[950vh]'} bg-[#070A11]`}
    >
      <div className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden bg-[#070A11] select-none z-10">
        {/* Bold Section Title with Negative Color Blend Effect */}
        <div className="absolute top-16 sm:top-20 md:top-24 inset-x-0 z-30 pointer-events-none flex flex-col items-center justify-center text-center px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-black/40 backdrop-blur-md mb-2 sm:mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-white uppercase">
              Interactive Spatial Journey
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.035em] text-white mix-blend-difference uppercase select-none">
            How You Will Learn
          </h2>

          <p className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-wider text-white/80 mix-blend-difference mt-1.5 sm:mt-2 select-none uppercase">
            Scroll to fly through the 3D learning corridor
          </p>
        </div>

        {/* HUD Overlay with active card info and progress */}
        <ProjectHUD smoothProgress={smoothProgress} projects={projects} />

        {/* Three.js 3D WebGL Canvas */}
        <Canvas
          frameloop={isInView ? 'always' : 'never'}
          camera={{
            position: [0, 0, 5],
            fov: isMobile ? 56 : 45,
            near: 0.5,
            far: 220,
          }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: 'high-performance',
          }}
          style={{ width: '100%', height: '100%', background: '#070A11' }}
        >
          <color attach="background" args={['#070A11']} />
          <fog attach="fog" args={['#070A11', isMobile ? 20 : 25, isMobile ? 65 : 85]} />
          <ambientLight intensity={0.65} />
          <directionalLight position={[5, 10, 5]} intensity={1.1} color="#FFFFFF" />
          <directionalLight position={[-5, -5, -5]} intensity={0.45} color="#60A5FA" />
          <Suspense fallback={null}>
            <RoomScene scrollYProgress={smoothProgress} isMobile={isMobile} />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}
