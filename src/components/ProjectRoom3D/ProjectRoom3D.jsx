"use client";

import React, { useRef, useState, useEffect, Suspense, memo } from 'react';
import { Canvas } from '@react-three/fiber';
import { useScroll, useSpring, motion } from 'framer-motion';
import RoomScene, { HOW_YOU_LEARN_DATA } from './RoomScene';

// Card milestones along the 3D spline corridor with their chromatic negative colors
const CARD_MILESTONES = [
  { progress: 0.14, name: 'Foundation Curriculum', negativeColor: '#FD8A36' }, // Inverse of Cyan
  { progress: 0.29, name: 'Concept Assessments', negativeColor: '#A3E635' }, // Inverse of Purple
  { progress: 0.44, name: 'Virtual Sandbox', negativeColor: '#FBBF24' },     // Inverse of Sapphire Blue
  { progress: 0.59, name: 'Finn AI Coach', negativeColor: '#F59E0B' },       // Inverse of Azure/Cobalt
  { progress: 0.74, name: 'Competence Badges', negativeColor: '#38BDF8' },   // Inverse of Gold Topaz
  { progress: 0.89, name: 'Disciplined Habits', negativeColor: '#4ADE80' },  // Inverse of Violet
];

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
    <div className="absolute inset-0 z-30 pointer-events-none flex flex-col justify-end p-4 sm:p-8 md:p-12 text-white font-sans">
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

  // Dynamic negative color state tracking which card is currently behind the center text
  const [activeNegativeState, setActiveNegativeState] = useState({
    active: false,
    color: '#FFFFFF',
  });

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

  // Track proximity to 3D cards to drive negative color transition in real-time
  useEffect(() => {
    return smoothProgress.on('change', (p) => {
      let minDistance = 1;
      let closestCard = CARD_MILESTONES[0];

      for (const card of CARD_MILESTONES) {
        const dist = Math.abs(p - card.progress);
        if (dist < minDistance) {
          minDistance = dist;
          closestCard = card;
        }
      }

      // Proximity threshold: when a card is directly centered behind the title
      if (minDistance < 0.048) {
        setActiveNegativeState({
          active: true,
          color: closestCard.negativeColor,
        });
      } else {
        setActiveNegativeState({
          active: false,
          color: '#FFFFFF',
        });
      }
    });
  }, [smoothProgress]);

  const projects = HOW_YOU_LEARN_DATA;

  return (
    <section
      ref={containerRef}
      className={`relative w-full ${isMobile ? 'h-[750vh]' : 'h-[950vh]'} bg-[#070A11]`}
    >
      <div className="sticky top-0 w-full h-screen h-[100dvh] overflow-hidden bg-[#070A11] select-none z-10">
        {/* 1. Three.js 3D WebGL Canvas (Backdrop Layer) */}
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
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{ width: '100%', height: '100%' }}
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

        {/* 2. Center & Middle Section Title with Reduced Font Size and Negative Color Effect */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center text-center px-4 sm:px-8">
          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-[-0.03em] uppercase select-none leading-tight transition-colors duration-200"
            style={{
              mixBlendMode: 'difference',
              color: activeNegativeState.active ? activeNegativeState.color : '#FFFFFF',
              textShadow: activeNegativeState.active
                ? `0 0 24px ${activeNegativeState.color}80, 0 0 48px ${activeNegativeState.color}33`
                : 'none',
            }}
          >
            How You Will Learn
          </h2>
        </div>

        {/* 3. Bottom HUD Overlay with active card info and progress */}
        <ProjectHUD smoothProgress={smoothProgress} projects={projects} />
      </div>
    </section>
  );
}
