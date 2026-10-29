"use client";

import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import ProjectDisplay from './ProjectDisplay';

export const HOW_YOU_LEARN_DATA = [
  {
    number: "01",
    name: "Foundation Curriculum",
    category: "Core Fundamentals • Step-by-Step",
    desc: "7 structured topics covering cashflow, compounding, risk preservation, and equity markets—broken into bite-sized, jargon-free lessons.",
    tech: ["7 Topics", "28 Lessons", "Jargon-Free", "Zero Fluff"],
    link: "/curriculum",
    buttonLabel: "EXPLORE CURRICULUM ↗",
    accent: "rgba(56, 189, 248, 0.45)",
    secondary: "rgba(37, 99, 235, 0.25)",
  },
  {
    number: "02",
    name: "Concept Assessments",
    category: "Real Understanding • Misconception Checks",
    desc: "Interactive scenario quizzes that identify and correct cognitive traps like inflation erosion and the Rule of 72 before you risk real money.",
    tech: ["Debiasing Traps", "Instant Rationale", "Calibrated Scoring", "Baseline Test"],
    link: "/baseline",
    buttonLabel: "TEST YOUR BASELINE ↗",
    accent: "rgba(167, 139, 250, 0.45)",
    secondary: "rgba(124, 58, 237, 0.25)",
  },
  {
    number: "03",
    name: "₹10,000 Virtual Sandbox",
    category: "Zero Real-Money Risk • Practice Terminal",
    desc: "A realistic ₹10,000 simulation sandbox to practice allocating across index funds, sovereign debt, and gold without losing a single rupee.",
    tech: ["₹10,000 Virtual Fund", "Asset Allocation", "Concentration Guardrails", "Live Simulation"],
    link: "/practice",
    buttonLabel: "ENTER SANDBOX ↗",
    accent: "rgba(52, 211, 153, 0.45)",
    secondary: "rgba(16, 185, 129, 0.25)",
  },
  {
    number: "04",
    name: "Finn — AI Financial Coach",
    category: "Personalized Guidance • 24/7 Clarification",
    desc: "Your personal financial reasoning companion who clarifies complex investing queries, evaluates portfolio choices, and guides your learning journey.",
    tech: ["Adaptive AI", "24/7 Availability", "Zero Sales Pitch", "Student Focused"],
    link: "/app/coach",
    buttonLabel: "CHAT WITH FINN ↗",
    accent: "rgba(96, 165, 250, 0.5)",
    secondary: "rgba(30, 64, 175, 0.25)",
  },
  {
    number: "05",
    name: "Competence Badges",
    category: "Credentialing • Evidence-Based Mastery",
    desc: "Earn proof-of-understanding badges across liquidity, compounding, and diversification to showcase verified financial literacy.",
    tech: ["5 Competence Tiers", "Verifiable Badges", "Milestone Rewards", "Proof of Skill"],
    link: "/app/progress",
    buttonLabel: "VIEW BADGES ↗",
    accent: "rgba(251, 191, 36, 0.45)",
    secondary: "rgba(217, 119, 6, 0.25)",
  },
  {
    number: "06",
    name: "Disciplined Investor Habits",
    category: "Lifelong Autonomy • Anti-FOMO Guardrails",
    desc: "Graduate with genuine financial confidence, immunity against market hype, and the autonomy to build long-term wealth responsibly.",
    tech: ["Mandatory Rationale", "Safe Guardrails", "Zero Speculation", "Financial Independence"],
    link: "/sign-in",
    buttonLabel: "START FOR FREE ↗",
    accent: "rgba(129, 140, 248, 0.45)",
    secondary: "rgba(79, 70, 229, 0.25)",
  }
];

export default function RoomScene({ scrollYProgress, isMobile }) {
  // 3D S-curve flight corridor with smooth entrance and generous exit runway
  const flightPath = useMemo(() => {
    const waypoints = isMobile ? [
      new THREE.Vector3(0, 3.0, 14),
      new THREE.Vector3(-0.6, 0.4, -18),
      new THREE.Vector3(0.7, 2.0, -38),
      new THREE.Vector3(-0.7, -0.4, -58),
      new THREE.Vector3(0.6, 1.4, -78),
      new THREE.Vector3(-0.6, 2.4, -98),
      new THREE.Vector3(0, 0.4, -120),
      new THREE.Vector3(0, 0.4, -145), // Exit runway so last card stays fully visible
    ] : [
      new THREE.Vector3(0, 3.4, 16),
      new THREE.Vector3(-1.4, 0.4, -22),
      new THREE.Vector3(1.6, 2.0, -55),
      new THREE.Vector3(-1.6, -0.4, -88),
      new THREE.Vector3(1.5, 1.4, -120),
      new THREE.Vector3(-1.3, 2.4, -152),
      new THREE.Vector3(0, 0.6, -185),
      new THREE.Vector3(0, 0.6, -215), // Exit runway so Card 06 stays fully explored
    ];
    return new THREE.CatmullRomCurve3(waypoints, false, 'centripetal', 0.5);
  }, [isMobile]);

  const currentCamPos = useMemo(() => new THREE.Vector3(), []);
  const currentLookAt = useMemo(() => new THREE.Vector3(), []);
  const targetCamPos = useMemo(() => new THREE.Vector3(), []);
  const targetLookAt = useMemo(() => new THREE.Vector3(), []);
  const tangent = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, delta) => {
    const rawProgress = scrollYProgress ? scrollYProgress.get() : 0;
    const p = Math.max(0, Math.min(1, rawProgress));
    flightPath.getPoint(p, targetCamPos);

    // Look slightly ahead along the curve
    const lookAheadP = Math.min(1, p + 0.035);
    flightPath.getPoint(lookAheadP, targetLookAt);
    flightPath.getTangent(p, tangent);

    // Exponential smoothing (lerp)
    const smoothFactor = 1 - Math.exp(-8 * delta);
    currentCamPos.lerp(targetCamPos, smoothFactor);
    state.camera.position.copy(currentCamPos);

    currentLookAt.lerp(targetLookAt, smoothFactor);
    state.camera.lookAt(currentLookAt);

    // Subtle drone roll banking
    state.camera.rotation.z = -tangent.x * 0.06;
  });

  return (
    <group>
      {/* 3D Feature Cards spaced through the corridor */}
      <ProjectDisplay
        project={HOW_YOU_LEARN_DATA[0]}
        position={isMobile ? [-1.8, 0.4, -18] : [-4.8, 0.4, -22]}
        rotation={isMobile ? [0, 0.16, 0] : [0, Math.PI / 10, 0]}
        isMobile={isMobile}
      />
      <ProjectDisplay
        project={HOW_YOU_LEARN_DATA[1]}
        position={isMobile ? [1.8, 2.0, -38] : [4.8, 2.0, -55]}
        rotation={isMobile ? [0, -0.16, 0] : [0, -Math.PI / 10, 0]}
        isMobile={isMobile}
      />
      <ProjectDisplay
        project={HOW_YOU_LEARN_DATA[2]}
        position={isMobile ? [-1.8, -0.4, -58] : [-4.8, -0.4, -88]}
        rotation={isMobile ? [0, 0.16, 0] : [0, Math.PI / 10, 0]}
        isMobile={isMobile}
      />
      <ProjectDisplay
        project={HOW_YOU_LEARN_DATA[3]}
        position={isMobile ? [1.8, 1.4, -78] : [4.8, 1.4, -120]}
        rotation={isMobile ? [0, -0.16, 0] : [0, -Math.PI / 10, 0]}
        isMobile={isMobile}
      />
      <ProjectDisplay
        project={HOW_YOU_LEARN_DATA[4]}
        position={isMobile ? [-1.8, 2.4, -98] : [-4.8, 2.4, -152]}
        rotation={isMobile ? [0, 0.16, 0] : [0, Math.PI / 10, 0]}
        isMobile={isMobile}
      />
      <ProjectDisplay
        project={HOW_YOU_LEARN_DATA[5]}
        position={isMobile ? [0, 0.4, -120] : [0, 0.6, -185]}
        rotation={[0, 0, 0]}
        isMobile={isMobile}
      />

      {/* Corridor Spatial Grid Guides */}
      <gridHelper args={[400, 120, '#2563FF', '#0F172A']} position={[0, -4.8, -100]} />
      <gridHelper args={[400, 120, '#1E3A8A', '#020617']} position={[0, 10.2, -100]} />
    </group>
  );
}
