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
        Math.max(0, Math.floor((latest / 0.92) * projects.length))
      );
      setActiveProjectIndex(normalized);
    });
  }, [smoothProgress, projects.length]);

  return (
    <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-end p-4 sm:p-8 md:p-12 text-white font-sans">
      <div className="flex items-end justify-between w-full max-w-7xl mx-auto">
        <div>
          <p className="text-[10px] font-semibold tracking-wider text-blue-400 uppercase">Interactive 3D Corridor</p>
          <p className="text-sm sm:text-base font-bold tracking-tight text-white flex items-center gap-2">
            <span className="text-blue-400 font-mono">
              {String(activeProjectIndex + 1).padStart(2, '0')}
            </span>
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

  // Track scroll progress across a 1600vh container to allow full exploration of all 11 cards
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
      className={`relative w-full ${isMobile ? 'h-[1200vh]' : 'h-[1600vh]'} bg-[#070A11]`}
    >
      <div className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden bg-[#070A11] select-none z-10">
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
          <color attach="background" args={['#070A11']} />
          <fog attach="fog" args={['#070A11', isMobile ? 22 : 28, isMobile ? 85 : 120]} />
          <ambientLight intensity={0.65} />
          <directionalLight position={[5, 10, 5]} intensity={1.1} color="#FFFFFF" />
          <directionalLight position={[-5, -5, -5]} intensity={0.45} color="#60A5FA" />
          <Suspense fallback={null}>
            <RoomScene scrollYProgress={smoothProgress} isMobile={isMobile} />
          </Suspense>
        </Canvas>

        {/* Bottom HUD Overlay with active card info and progress */}
        <ProjectHUD smoothProgress={smoothProgress} projects={projects} />
      </div>
    </section>
  );
}
