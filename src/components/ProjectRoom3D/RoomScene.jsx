"use client";

import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import ProjectDisplay from './ProjectDisplay';

export const HOW_YOU_LEARN_DATA = [
  {
    number: "01",
    name: "AI Financial Avatar",
    category: "Personalized Socratic AI • 24/7 Companion",
    desc: "Your personal financial reasoning companion who clarifies complex queries, debiases retail investor traps, and guides your learning journey.",
    link: "/app/coach",
    buttonLabel: "CHAT WITH AVATAR ↗",
  },
  {
    number: "02",
    name: "Learning Dashboard",
    category: "Personal Cockpit • Progress & Streaks",
    desc: "Centralized learning command center tracking completion %, weekly study streaks, concept mastery radar, and active learning queues.",
    link: "/app",
    buttonLabel: "OPEN DASHBOARD ↗",
  },
  {
    number: "03",
    name: "Virtual ₹10,000 Sandbox",
    category: "Zero Real-Money Risk • Practice Terminal",
    desc: "A realistic ₹10,000 simulation sandbox to practice allocating across index funds, sovereign debt, and gold with live guardrails.",
    link: "/practice",
    buttonLabel: "ENTER SANDBOX ↗",
  },
  {
    number: "04",
    name: "Quizzes & Gamified Drills",
    category: "Scenario Quizzes • XP & Streaks",
    desc: "Engaging scenario-based questions that test real understanding over lucky guesses with instant feedback, streak multipliers, and XP.",
    link: "/app/learn",
    buttonLabel: "START DAILY QUIZ ↗",
  },
  {
    number: "05",
    name: "Paper Company Analysis",
    category: "Fundamental Teardowns • Zero Jargon",
    desc: "Hands-on simulated company analysis: deconstruct balance sheets, P&L statements, PE benchmarks, and competitive moats safely.",
    link: "/curriculum",
    buttonLabel: "ANALYZE COMPANY ↗",
  },
  {
    number: "06",
    name: "Jargon-Free Financial Topics",
    category: "Visual Metaphors • 3-Min Reads",
    desc: "Complex financial concepts translated into plain English through visual metaphors, relatable analogies, and clear mathematical proof.",
    link: "/curriculum",
    buttonLabel: "EXPLORE TOPICS ↗",
  },
  {
    number: "07",
    name: "Baseline Knowledge Diagnostic",
    category: "Initial Snapshot • Where You Stand",
    desc: "A 5-minute diagnostic upon logging in that maps your current literacy snapshot across cashflow, compounding, and risk biases.",
    link: "/baseline",
    buttonLabel: "TEST YOUR BASELINE ↗",
  },
  {
    number: "08",
    name: "Badges & Reflection Certificates",
    category: "Verifiable Credentials • Profile Proof",
    desc: "Earn proof-of-competence badges and reflection certificates across core principles to showcase verified financial literacy.",
    link: "/app/progress",
    buttonLabel: "VIEW CERTIFICATES ↗",
  },
  {
    number: "09",
    name: "Live Interactive Masterclasses (200m)",
    category: "Live Cohorts • Real-Time Q&A",
    desc: "Interactive 200-minute live masterclasses, weekend workshops, and real-time interactive polls with certified finance mentors.",
    link: "/how-it-works",
    buttonLabel: "JOIN LIVE COHORT ↗",
  },
  {
    number: "10",
    name: "Interactive Learning Playground",
    category: "Standalone Lab • Experimentation",
    desc: "A dedicated financial sandbox with interactive sliders, inflation time machines, SIP vs lumpsum calculators, and compounding curves.",
    link: "/practice",
    buttonLabel: "ENTER PLAYGROUND ↗",
  },
  {
    number: "11",
    name: "Smart Spaced Review System",
    category: "Retention Engine • Spaced Repetition",
    desc: "An intelligent spaced review algorithm on your home cockpit that revisits weak concepts, triggers refresher flashcards, and locks in mastery.",
    link: "/app",
    buttonLabel: "REVIEW CONCEPTS ↗",
  }
];

// ─── 3D Negative / Inverted Color Title Component ─────────────────────────────
export function ScrollRoomTitle({ isMobile = false, titleRef }) {
  const invertMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: '#ffffff',
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.CustomBlending,
      blendEquation: THREE.AddEquation,
      blendSrc: THREE.OneMinusDstColorFactor,
      blendDst: THREE.OneMinusSrcColorFactor,
    });
  }, []);

  return (
    <group
      ref={titleRef}
      renderOrder={999}
      position={[isMobile ? -0.15 : -0.2, isMobile ? 2.3 : 2.6, isMobile ? 5 : 6]}
      rotation={[-0.08, 0, 0]}
    >
      <Text
        position={[0, 0, 0]}
        fontSize={isMobile ? 0.68 : 1.05}
        lineHeight={1.05}
        textAlign="center"
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        letterSpacing={-0.02}
        fontWeight={700}
        outlineWidth={0}
        sdfGlyphSize={128}
        renderOrder={999}
        material={invertMaterial}
        material-transparent={true}
        material-depthTest={false}
        material-depthWrite={false}
        material-blending={THREE.CustomBlending}
        material-blendEquation={THREE.AddEquation}
        material-blendSrc={THREE.OneMinusDstColorFactor}
        material-blendDst={THREE.OneMinusSrcColorFactor}
      >
        {"HOW YOU\nWILL LEARN"}
      </Text>
    </group>
  );
}

export default function RoomScene({ scrollYProgress, isMobile }) {
  // 3D S-curve flight corridor across all 11 feature cards
  const flightPath = useMemo(() => {
    const waypoints = isMobile ? [
      new THREE.Vector3(0, 3.0, 14),
      new THREE.Vector3(-0.6, 0.4, -18),   // 01 AI Avatar
      new THREE.Vector3(0.6, 1.8, -38),    // 02 Dashboard
      new THREE.Vector3(-0.6, -0.4, -58),  // 03 Sandbox
      new THREE.Vector3(0.6, 1.4, -78),    // 04 Quizzes
      new THREE.Vector3(-0.6, 2.2, -98),   // 05 Paper Company
      new THREE.Vector3(0.6, 0.4, -118),   // 06 Jargon-Free
      new THREE.Vector3(-0.6, 1.8, -138),  // 07 Baseline
      new THREE.Vector3(0.6, -0.4, -158),  // 08 Badges
      new THREE.Vector3(-0.6, 1.4, -178),  // 09 Live Sessions
      new THREE.Vector3(0.6, 2.2, -198),   // 10 Playground
      new THREE.Vector3(0, 0.5, -224),     // 11 Smart Review
      new THREE.Vector3(0, 0.5, -255),     // Exit runway
    ] : [
      new THREE.Vector3(0, 3.4, 16),
      new THREE.Vector3(-1.4, 0.4, -22),   // 01 AI Avatar
      new THREE.Vector3(1.5, 2.0, -52),    // 02 Dashboard
      new THREE.Vector3(-1.5, -0.4, -82),  // 03 Sandbox
      new THREE.Vector3(1.4, 1.4, -112),   // 04 Quizzes
      new THREE.Vector3(-1.4, 2.2, -142),  // 05 Paper Company
      new THREE.Vector3(1.4, 0.4, -172),   // 06 Jargon-Free
      new THREE.Vector3(-1.4, 1.8, -202),  // 07 Baseline
      new THREE.Vector3(1.4, -0.4, -232),  // 08 Badges
      new THREE.Vector3(-1.4, 1.4, -262),  // 09 Live Sessions
      new THREE.Vector3(1.4, 2.2, -292),   // 10 Playground
      new THREE.Vector3(0, 0.6, -325),     // 11 Smart Review
      new THREE.Vector3(0, 0.6, -365),     // Exit runway so Card 11 stays fully explored
    ];
    return new THREE.CatmullRomCurve3(waypoints, false, 'centripetal', 0.5);
  }, [isMobile]);

  const currentCamPos = useMemo(() => new THREE.Vector3(), []);
  const currentLookAt = useMemo(() => new THREE.Vector3(), []);
  const targetCamPos = useMemo(() => new THREE.Vector3(), []);
  const targetLookAt = useMemo(() => new THREE.Vector3(), []);
  const tangent = useMemo(() => new THREE.Vector3(), []);

  // Title reference (placed in 3D world space at corridor entrance; zooms in & exits on scroll)
  const titleRef = useRef();

  useFrame((state, delta) => {
    const rawProgress = scrollYProgress ? scrollYProgress.get() : 0;
    const p = Math.max(0, Math.min(1, rawProgress));
    flightPath.getPoint(p, targetCamPos);

    // Look slightly ahead along the curve
    const lookAheadP = Math.min(1, p + 0.025);
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

    // Title zooms in as camera flies forward; cleanly exits once passed
    if (titleRef.current) {
      const exitZ = isMobile ? 3.8 : 4.8;
      const startZ = isMobile ? 14 : 16;
      const camZ = state.camera.position.z;

      if (camZ <= exitZ) {
        titleRef.current.visible = false;
      } else {
        titleRef.current.visible = true;
        // Subtle progressive zoom scale as camera approaches
        const progressToTitle = Math.max(0, Math.min(1, (startZ - camZ) / (startZ - exitZ)));
        const dynamicScale = 1 + progressToTitle * 0.35;
        titleRef.current.scale.set(dynamicScale, dynamicScale, 1);
      }
    }
  });

  return (
    <group>
      {/* 11 3D Feature Cards Spaced Throughout the Corridor */}
      <ProjectDisplay
        project={HOW_YOU_LEARN_DATA[0]}
        position={isMobile ? [-1.8, 0.4, -18] : [-4.8, 0.4, -22]}
        rotation={isMobile ? [0, 0.16, 0] : [0, Math.PI / 10, 0]}
        isMobile={isMobile}
      />
      <ProjectDisplay
        project={HOW_YOU_LEARN_DATA[1]}
        position={isMobile ? [1.8, 1.8, -38] : [4.8, 2.0, -52]}
        rotation={isMobile ? [0, -0.16, 0] : [0, -Math.PI / 10, 0]}
        isMobile={isMobile}
      />
      <ProjectDisplay
        project={HOW_YOU_LEARN_DATA[2]}
        position={isMobile ? [-1.8, -0.4, -58] : [-4.8, -0.4, -82]}
        rotation={isMobile ? [0, 0.16, 0] : [0, Math.PI / 10, 0]}
        isMobile={isMobile}
      />
      <ProjectDisplay
        project={HOW_YOU_LEARN_DATA[3]}
        position={isMobile ? [1.8, 1.4, -78] : [4.8, 1.4, -112]}
        rotation={isMobile ? [0, -0.16, 0] : [0, -Math.PI / 10, 0]}
        isMobile={isMobile}
      />
      <ProjectDisplay
        project={HOW_YOU_LEARN_DATA[4]}
        position={isMobile ? [-1.8, 2.2, -98] : [-4.8, 2.2, -142]}
        rotation={isMobile ? [0, 0.16, 0] : [0, Math.PI / 10, 0]}
        isMobile={isMobile}
      />
      <ProjectDisplay
        project={HOW_YOU_LEARN_DATA[5]}
        position={isMobile ? [1.8, 0.4, -118] : [4.8, 0.4, -172]}
        rotation={isMobile ? [0, -0.16, 0] : [0, -Math.PI / 10, 0]}
        isMobile={isMobile}
      />
      <ProjectDisplay
        project={HOW_YOU_LEARN_DATA[6]}
        position={isMobile ? [-1.8, 1.8, -138] : [-4.8, 1.8, -202]}
        rotation={isMobile ? [0, 0.16, 0] : [0, Math.PI / 10, 0]}
        isMobile={isMobile}
      />
      <ProjectDisplay
        project={HOW_YOU_LEARN_DATA[7]}
        position={isMobile ? [1.8, -0.4, -158] : [4.8, -0.4, -232]}
        rotation={isMobile ? [0, -0.16, 0] : [0, -Math.PI / 10, 0]}
        isMobile={isMobile}
      />
      <ProjectDisplay
        project={HOW_YOU_LEARN_DATA[8]}
        position={isMobile ? [-1.8, 1.4, -178] : [-4.8, 1.4, -262]}
        rotation={isMobile ? [0, 0.16, 0] : [0, Math.PI / 10, 0]}
        isMobile={isMobile}
      />
      <ProjectDisplay
        project={HOW_YOU_LEARN_DATA[9]}
        position={isMobile ? [1.8, 2.2, -198] : [4.8, 2.2, -292]}
        rotation={isMobile ? [0, -0.16, 0] : [0, -Math.PI / 10, 0]}
        isMobile={isMobile}
      />
      <ProjectDisplay
        project={HOW_YOU_LEARN_DATA[10]}
        position={isMobile ? [0, 0.5, -224] : [0, 0.6, -325]}
        rotation={[0, 0, 0]}
        isMobile={isMobile}
      />

      {/* 3D Negative / Inverted Color Title (Inside WebGL Pipeline) */}
      <ScrollRoomTitle isMobile={isMobile} titleRef={titleRef} />

      {/* Corridor Spatial Grid Guides */}
      <gridHelper args={[800, 240, '#2563FF', '#0F172A']} position={[0, -4.8, -170]} />
      <gridHelper args={[800, 240, '#1E3A8A', '#020617']} position={[0, 10.2, -170]} />
    </group>
  );
}
