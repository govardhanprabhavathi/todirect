"use client";

import React, { useRef, useState, useEffect, Suspense, memo } from 'react';
import { Canvas } from '@react-three/fiber';
import { useScroll, useSpring, motion } from 'framer-motion';
import { useTheme } from '@/lib/theme';
import RoomScene, { HOW_YOU_LEARN_DATA } from './RoomScene';

// Isolated HUD to prevent re-rendering the 3D Canvas on scroll
const ProjectHUD = memo(function ProjectHUD({ smoothProgress, projects, isDark = true }) {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);

  useEffect(() => {
    return smoothProgress.on('change', (latest) => {
      const normalized = Math.min(
        projects.length - 1,
        Math.max(0, Math.floor(latest * projects.length))
      );
      setActiveProjectIndex(normalized);
    });
  }, [smoothProgress, projects.length]);

  return (
    <div className={`absolute inset-0 z-30 pointer-events-none flex flex-col justify-end p-4 sm:p-8 md:p-12 font-sans ${isDark ? 'text-white' : 'text-slate-900'}`}>
      <div className="flex items-end justify-between w-full max-w-7xl mx-auto">
        <div>
          <p className={`text-[10px] font-semibold tracking-wider uppercase ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>Interactive 3D Corridor</p>
          <p className={`text-sm sm:text-base font-bold tracking-tight flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
            <span className={`font-mono ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
              {String(activeProjectIndex + 1).padStart(2, '0')}
            </span>
            <span>{projects[activeProjectIndex]?.name}</span>
          </p>
        </div>

        {/* Minimal Progress Bar */}
        <div className={`w-28 sm:w-56 h-[2px] relative overflow-hidden rounded-full ${isDark ? 'bg-white/20' : 'bg-slate-300'}`}>
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
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#070A11' : '#FFFFFF';

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

  // Track scroll progress across a calibrated container that terminates right as Card 11 passes
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
      className={`relative w-full ${isMobile ? 'h-[800vh]' : 'h-[1100vh]'} transition-colors duration-300 ${isDark ? 'bg-[#070A11]' : 'bg-white'}`}
    >
      <div className={`sticky top-0 w-full h-screen h-[100dvh] overflow-hidden select-none z-10 transition-colors duration-300 ${isDark ? 'bg-[#070A11]' : 'bg-white'}`}>
        {/* Three.js 3D WebGL Canvas (Hosts the 3D scene + exact WebGL Inverted Title) */}
        <Canvas
          frameloop={isInView ? 'always' : 'never'}
          camera={{
            position: [0, 0, 5],
            fov: isMobile ? 56 : 45,
            near: 0.5,
            far: 420,
          }}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <color attach="background" args={[bgColor]} />
          <fog attach="fog" args={[bgColor, isMobile ? 22 : 28, isMobile ? 85 : 120]} />
          <ambientLight intensity={isDark ? 0.7 : 0.95} />
          <directionalLight position={[5, 10, 5]} intensity={isDark ? 1.1 : 0.9} color="#FFFFFF" />
          <directionalLight position={[-5, -5, -5]} intensity={isDark ? 0.45 : 0.3} color={isDark ? '#60A5FA' : '#CBD5E1'} />
          <Suspense fallback={null}>
            <RoomScene scrollYProgress={smoothProgress} isMobile={isMobile} isDark={isDark} />
          </Suspense>
        </Canvas>

        {/* Bottom HUD Overlay with active card info and progress */}
        <ProjectHUD smoothProgress={smoothProgress} projects={projects} isDark={isDark} />
      </div>
    </section>
  );
}
