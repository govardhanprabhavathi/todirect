"use client";

import React, { useRef, useState, useMemo } from 'react';
import { RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Precision 2D Drawing Utilities ──────────────────────────────────────────

function drawRoundRect(ctx, x, y, w, h, r, fill = true, stroke = false, strokeColor = '#334155', lineWidth = 1) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }
}

// ─── Shared Luxury Blueprint Background & Master Frame ──────────────────────

function renderCardFrame(ctx, w, h, categoryTag, cardNumber, title, subtitle, statusText = 'ACTIVE', statusColor = '#38BDF8') {
  // 1. Ultra-deep obsidian blue base
  const baseGrad = ctx.createLinearGradient(0, 0, w, h);
  baseGrad.addColorStop(0, '#040816');
  baseGrad.addColorStop(0.5, '#07122A');
  baseGrad.addColorStop(1, '#030712');
  ctx.fillStyle = baseGrad;
  drawRoundRect(ctx, 0, 0, w, h, 32, true, false);

  // 2. Multi-layer radiant volumetric blue blooms
  const bloomTopRight = ctx.createRadialGradient(w - 120, 60, 20, w - 120, 60, 480);
  bloomTopRight.addColorStop(0, 'rgba(56, 189, 248, 0.28)');
  bloomTopRight.addColorStop(0.5, 'rgba(37, 99, 235, 0.12)');
  bloomTopRight.addColorStop(1, 'transparent');
  ctx.fillStyle = bloomTopRight;
  ctx.fillRect(0, 0, w, h);

  const bloomBottomLeft = ctx.createRadialGradient(160, h - 80, 20, 160, h - 80, 440);
  bloomBottomLeft.addColorStop(0, 'rgba(30, 64, 175, 0.35)');
  bloomBottomLeft.addColorStop(0.6, 'rgba(15, 23, 42, 0.1)');
  bloomBottomLeft.addColorStop(1, 'transparent');
  ctx.fillStyle = bloomBottomLeft;
  ctx.fillRect(0, 0, w, h);

  // 3. Technical fine grid lines
  ctx.strokeStyle = 'rgba(147, 197, 253, 0.035)';
  ctx.lineWidth = 1;
  for (let x = 45; x < w; x += 55) {
    ctx.beginPath();
    ctx.moveTo(x, 18);
    ctx.lineTo(x, h - 18);
    ctx.stroke();
  }
  for (let y = 45; y < h; y += 55) {
    ctx.beginPath();
    ctx.moveTo(18, y);
    ctx.lineTo(w - 18, y);
    ctx.stroke();
  }

  // 4. Electric blue double bezel border
  const borderGrad = ctx.createLinearGradient(0, 0, w, h);
  borderGrad.addColorStop(0, '#38BDF8');
  borderGrad.addColorStop(0.3, '#2563EB');
  borderGrad.addColorStop(0.7, '#1D4ED8');
  borderGrad.addColorStop(1, '#0284C7');
  drawRoundRect(ctx, 4, 4, w - 8, h - 8, 28, false, true, borderGrad, 2);
  drawRoundRect(ctx, 8, 8, w - 16, h - 16, 25, false, true, 'rgba(255, 255, 255, 0.08)', 1);

  // 5. Technical corner crosshairs
  ctx.strokeStyle = '#38BDF8';
  ctx.lineWidth = 2;
  const corners = [
    [26, 26], [w - 26, 26], [26, h - 26], [w - 26, h - 26]
  ];
  corners.forEach(([cx, cy]) => {
    ctx.beginPath();
    ctx.moveTo(cx - 6, cy);
    ctx.lineTo(cx + 6, cy);
    ctx.moveTo(cx, cy - 6);
    ctx.lineTo(cx, cy + 6);
    ctx.stroke();
  });

  // 6. Header Strip: Category Micro-Caps + Card Number
  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 12px -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif';
  ctx.fillText(`FEATURE ${cardNumber} // ${categoryTag.toUpperCase()}`, 52, 54);

  // Status Badge (Top-Right)
  const pillW = 145;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  drawRoundRect(ctx, w - 52 - pillW, 36, pillW, 32, 16, true, true, statusColor, 1.5);
  ctx.fillStyle = statusColor;
  ctx.beginPath();
  ctx.arc(w - 52 - pillW + 18, 52, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 12px -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif';
  ctx.fillText(statusText, w - 52 - pillW + 30, 56);

  // 7. Bold Main Title & Subtitle
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 32px -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif';
  ctx.fillText(title, 52, 92);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 14px -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif';
  ctx.fillText(subtitle, 52, 116);

  // Subtle separator line
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(52, 132);
  ctx.lineTo(w - 52, 132);
  ctx.stroke();

  // 8. Bottom Footer Bar
  ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)';
  ctx.beginPath();
  ctx.moveTo(52, 532);
  ctx.lineTo(w - 52, 532);
  ctx.stroke();
}

function renderBottomButton(ctx, w, h, label = 'Explore Feature →') {
  const btnW = 210;
  const btnH = 44;
  const bx = w - 52 - btnW;
  const by = 550;

  // Glowing white button
  ctx.fillStyle = '#FFFFFF';
  drawRoundRect(ctx, bx, by, btnW, btnH, 22, true, false);
  ctx.fillStyle = '#0A1629';
  ctx.font = '800 13px -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(label, bx + btnW / 2, by + 27);
  ctx.textAlign = 'left';
}

// ─── 01. AI Financial Avatar ──────────────────────────────────────────────────

function renderAvatarDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Socratic Intelligence', '01',
    'AI Financial Avatar',
    'Voice & Real-Time Socratic Reasoning • 100% Bias Debiasing',
    'AVATAR ONLINE', '#10B981'
  );

  // Dynamic Audio Frequency Equalizer Bar HUD
  const eqX = 52;
  const eqY = 155;
  ctx.fillStyle = '#38BDF8';
  ctx.font = '700 11px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('SOCRATIC SPEECH & REASONING FREQUENCY SPECTRUM', eqX, eqY);

  const barCount = 38;
  const heights = [12, 18, 28, 42, 34, 22, 16, 32, 48, 38, 20, 14, 26, 44, 52, 36, 18, 24, 38, 46, 30, 20, 16, 28, 40, 48, 32, 22, 14, 20, 36, 44, 30, 18, 12, 20, 16, 10];
  for (let i = 0; i < barCount; i++) {
    const bh = heights[i % heights.length];
    const bx = eqX + i * 27;
    const by = eqY + 56 - bh;
    const barGrad = ctx.createLinearGradient(0, by, 0, by + bh);
    barGrad.addColorStop(0, '#38BDF8');
    barGrad.addColorStop(1, '#1D4ED8');
    ctx.fillStyle = barGrad;
    drawRoundRect(ctx, bx, by, 8, bh, 4, true, false);
  }

  // Chat Conversation Glass Panel
  const chatY = 230;
  const panelW = w - 104;
  ctx.fillStyle = 'rgba(10, 25, 60, 0.7)';
  drawRoundRect(ctx, 52, chatY, panelW, 200, 18, true, true, 'rgba(56, 189, 248, 0.25)', 1);

  // User Query Bubble (Right-aligned inside panel)
  const uBubbleW = 540;
  const uX = 52 + panelW - uBubbleW - 24;
  ctx.fillStyle = 'rgba(30, 58, 138, 0.6)';
  drawRoundRect(ctx, uX, chatY + 20, uBubbleW, 46, 14, true, true, 'rgba(96, 165, 250, 0.3)', 1);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '600 14px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Learner: "How do I know if an 18% promised return is safe?"', uX + 16, chatY + 48);

  // Finn AI Socratic Response Box (Left-aligned)
  const fX = 52 + 24;
  const fY = chatY + 80;
  const fW = panelW - 48;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
  drawRoundRect(ctx, fX, fY, fW, 88, 14, true, true, 'rgba(56, 189, 248, 0.4)', 1.5);

  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('FINN AI COACH // SOCRATIC COUNTER-PROBE', fX + 16, fY + 26);

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '500 14px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Look at guaranteed yield vs risk-free sovereign benchmarks (~7%). Any asset offering +11% spread without', fX + 16, fY + 50);
  ctx.fillText('volatility is holding hidden credit default risk. What cashflow backs this payout?', fX + 16, fY + 70);

  // Bottom Telemetry Chips
  ctx.fillStyle = 'rgba(16, 185, 129, 0.15)';
  drawRoundRect(ctx, 52, 450, 240, 34, 17, true, true, '#10B981', 1);
  ctx.fillStyle = '#34D399';
  ctx.font = '700 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('✓ 99.8% SOCRATIC FIDELITY', 72, 471);

  ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
  drawRoundRect(ctx, 308, 450, 250, 34, 17, true, true, '#38BDF8', 1);
  ctx.fillStyle = '#93C5FD';
  ctx.font = '700 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('ZERO UNSOLICITED STOCK PICKS', 324, 471);

  // Footer left label
  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Trained exclusively on verified SEBI investor education principles', 52, 574);

  renderBottomButton(ctx, w, h, 'Chat With Finn AI →');
}

// ─── 02. Personal Learning Dashboard ──────────────────────────────────────────

function renderDashboardDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Cockpit & Telemetry', '02',
    'Personal Learning Dashboard',
    'Centralized Progress Radar, Streak Mechanics & Mastery Rings',
    'SYNCED LIVE', '#38BDF8'
  );

  // 3 Large Bold KPI Cards
  const kpiW = (w - 104 - 32) / 3;
  const kpiY = 150;
  const kpiH = 150;

  // KPI 1: Completion
  ctx.fillStyle = 'rgba(10, 25, 60, 0.75)';
  drawRoundRect(ctx, 52, kpiY, kpiW, kpiH, 18, true, true, 'rgba(56, 189, 248, 0.3)', 1.5);
  ctx.fillStyle = '#93C5FD';
  ctx.font = '800 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('SYLLABUS COMPLETION', 72, kpiY + 34);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 48px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('68%', 72, kpiY + 88);
  ctx.fillStyle = '#38BDF8';
  ctx.font = '600 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('19 of 28 Modules Mastered', 72, kpiY + 120);

  // Progress Bar
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  drawRoundRect(ctx, 72, kpiY + 130, kpiW - 40, 6, 3, true, false);
  ctx.fillStyle = '#38BDF8';
  drawRoundRect(ctx, 72, kpiY + 130, (kpiW - 40) * 0.68, 6, 3, true, false);

  // KPI 2: Streak
  const k2X = 52 + kpiW + 16;
  ctx.fillStyle = 'rgba(10, 25, 60, 0.75)';
  drawRoundRect(ctx, k2X, kpiY, kpiW, kpiH, 18, true, true, 'rgba(245, 158, 11, 0.3)', 1.5);
  ctx.fillStyle = '#FCD34D';
  ctx.font = '800 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('DAILY STUDY CONSISTENCY', k2X + 20, kpiY + 34);
  ctx.fillStyle = '#F59E0B';
  ctx.font = '900 48px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('14 DAYS', k2X + 20, kpiY + 88);
  ctx.fillStyle = '#FDE68A';
  ctx.font = '600 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('🔥 Top 5% Cohort Consistency', k2X + 20, kpiY + 120);

  // KPI 3: Retention
  const k3X = k2X + kpiW + 16;
  ctx.fillStyle = 'rgba(10, 25, 60, 0.75)';
  drawRoundRect(ctx, k3X, kpiY, kpiW, kpiH, 18, true, true, 'rgba(16, 185, 129, 0.3)', 1.5);
  ctx.fillStyle = '#6EE7B7';
  ctx.font = '800 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('CONCEPT RETENTION RATE', k3X + 20, kpiY + 34);
  ctx.fillStyle = '#10B981';
  ctx.font = '900 48px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('92%', k3X + 20, kpiY + 88);
  ctx.fillStyle = '#A7F3D0';
  ctx.font = '600 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Calibrated via Socratic Probes', k3X + 20, kpiY + 120);

  // Active Next-Up Lesson Card
  const activeY = 325;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  drawRoundRect(ctx, 52, activeY, w - 104, 150, 18, true, true, 'rgba(56, 189, 248, 0.35)', 1.5);

  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('ACTIVE LEARNING QUEUE // NEXT LESSON READY', 76, activeY + 36);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Topic 02.2: Mental Math with the Rule of 72 & Doubling Curves', 76, activeY + 70);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 14px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Learn how to compute doubling periods in your head before allocating capital. Estimated time: 6 mins.', 76, activeY + 98);

  ctx.fillStyle = 'rgba(56, 189, 248, 0.2)';
  drawRoundRect(ctx, 76, activeY + 112, 160, 26, 13, true, true, '#38BDF8', 1);
  ctx.fillStyle = '#BAE6FD';
  ctx.font = '700 11px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('▶ 3 SCENARIO CHECKS', 90, activeY + 129);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Student Level: Level 4 Apprentice (820 XP)', 52, 574);

  renderBottomButton(ctx, w, h, 'Open Dashboard →');
}

// ─── 03. Virtual ₹10,000 Sandbox ─────────────────────────────────────────────

function renderSandboxDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Risk-Free Trading Terminal', '03',
    'Virtual ₹10,000 Sandbox',
    'Practice Real Asset Allocation Across Index ETFs, Gold & Debt',
    'PORTFOLIO BALANCED', '#10B981'
  );

  // Big Bold Hero Balance Display
  const topY = 150;
  ctx.fillStyle = 'rgba(10, 25, 60, 0.75)';
  drawRoundRect(ctx, 52, topY, w - 104, 110, 18, true, true, 'rgba(56, 189, 248, 0.3)', 1.5);

  ctx.fillStyle = '#93C5FD';
  ctx.font = '800 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('TOTAL SIMULATED PORTFOLIO VALUE', 76, topY + 34);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 48px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('₹10,480.00', 76, topY + 84);

  // Profit Pill
  ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
  drawRoundRect(ctx, 380, topY + 48, 160, 36, 18, true, true, '#10B981', 1.5);
  ctx.fillStyle = '#34D399';
  ctx.font = '800 14px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('+4.8% PROFIT (+₹480)', 396, topY + 71);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Cash Buffer: ₹2,000.00 (20%) | Initial Capital: ₹10,000', 570, topY + 71);

  // Segmented Asset Allocation Bar
  const allocY = 280;
  const barW = w - 104;
  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('ASSET ALLOCATION DIVERSIFICATION SPECTRUM', 52, allocY - 12);

  // Segments: Equity (50%), Gold (30%), Liquid FD (20%)
  const w1 = barW * 0.5;
  const w2 = barW * 0.3;
  const w3 = barW * 0.2;

  ctx.fillStyle = '#3B82F6';
  drawRoundRect(ctx, 52, allocY, w1 - 2, 14, 4, true, false);
  ctx.fillStyle = '#F59E0B';
  drawRoundRect(ctx, 52 + w1, allocY, w2 - 2, 14, 4, true, false);
  ctx.fillStyle = '#10B981';
  drawRoundRect(ctx, 52 + w1 + w2, allocY, w3, 14, 4, true, false);

  // 3 Holding Row Cards
  const holdY = 320;
  const holdW = (barW - 24) / 3;

  const holdings = [
    { title: 'NIFTY 50 ETF', amt: '₹5,000', pct: '50% (Equity)', change: '+3.2%', cColor: '#34D399', border: '#3B82F6' },
    { title: 'SOVEREIGN GOLD', amt: '₹3,000', pct: '30% (Hedge)', change: '+1.8%', cColor: '#FBBF24', border: '#F59E0B' },
    { title: 'LIQUID OVERNIGHT', amt: '₹2,000', pct: '20% (Safety)', change: '+0.6%', cColor: '#60A5FA', border: '#10B981' }
  ];

  holdings.forEach((hld, idx) => {
    const hx = 52 + idx * (holdW + 12);
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    drawRoundRect(ctx, hx, holdY, holdW, 140, 16, true, true, 'rgba(56, 189, 248, 0.25)', 1.5);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '800 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(hld.title, hx + 18, holdY + 34);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 26px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(hld.amt, hx + 18, holdY + 70);

    ctx.fillStyle = hld.cColor;
    ctx.font = '700 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(`${hld.change} Today`, hx + 18, holdY + 98);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '500 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(hld.pct, hx + 18, holdY + 120);
  });

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('100% Risk-Free Simulation Sandbox • Mandatory Investment Rationale Required', 52, 574);

  renderBottomButton(ctx, w, h, 'Launch Sandbox →');
}

// ─── 04. Quizzes & Gamified Drills ───────────────────────────────────────────

function renderQuizzesDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Socratic Diagnostic Engine', '04',
    'Quizzes & Gamified Testing',
    'Adaptive Follow-Up Probes That Verify Why You Selected Your Answer',
    'ADAPTIVE ACTIVE', '#A855F7'
  );

  // Scenario Question Box
  const qY = 150;
  const boxW = w - 104;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  drawRoundRect(ctx, 52, qY, boxW, 80, 16, true, true, 'rgba(168, 85, 247, 0.35)', 1.5);

  ctx.fillStyle = '#C084FC';
  ctx.font = '800 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('SCENARIO 03 // PURCHASING POWER EROSION', 76, qY + 28);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('You keep ₹1,00,000 in a fixed deposit earning 5% interest while inflation runs at 7%. Over 3 years:', 76, qY + 56);

  // Option A (Trap - Red Strike)
  const o1Y = 246;
  ctx.fillStyle = 'rgba(239, 68, 68, 0.12)';
  drawRoundRect(ctx, 52, o1Y, boxW, 58, 14, true, true, 'rgba(239, 68, 68, 0.5)', 1.5);
  ctx.fillStyle = '#FCA5A5';
  ctx.font = '600 15px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('A) Your wealth grows because 5% compounding guarantees safety.', 76, o1Y + 34);
  ctx.fillStyle = '#EF4444';
  ctx.font = '800 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('✕ COGNITIVE TRAP: MONEY ILLUSION', w - 320, o1Y + 34);

  // Option B (Correct - Green Glow)
  const o2Y = 318;
  ctx.fillStyle = 'rgba(16, 185, 129, 0.18)';
  drawRoundRect(ctx, 52, o2Y, boxW, 58, 14, true, true, '#10B981', 2);
  ctx.fillStyle = '#6EE7B7';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('B) Purchasing power declines by -2% per year despite nominal digits rising.', 76, o2Y + 34);
  ctx.fillStyle = '#10B981';
  ctx.font = '900 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('✓ VERIFIED ACCURATE (+50 XP)', w - 280, o2Y + 34);

  // Gamification Ribbon
  const gY = 394;
  ctx.fillStyle = 'rgba(10, 25, 60, 0.75)';
  drawRoundRect(ctx, 52, gY, boxW, 76, 16, true, true, 'rgba(56, 189, 248, 0.3)', 1);

  ctx.fillStyle = '#F59E0B';
  ctx.font = '900 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('🔥 7-DAY STREAK • 2.5X XP MULTIPLIER ACTIVE', 76, gY + 34);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Selecting an answer triggers an adaptive follow-up Socratic question to verify true conceptual mastery.', 76, gY + 58);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Comprehensive syllabus testing across 7 core financial disciplines', 52, 574);

  renderBottomButton(ctx, w, h, 'Take Socratic Quiz →');
}

// ─── 05. Paper Company Analysis ───────────────────────────────────────────────

function renderPaperCompanyDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Institutional Teardown', '05',
    'Paper Company Analysis',
    'Deconstruct Corporate Statements, Ratios & Moats Without Financial Jargon',
    'DOSSIER READY', '#38BDF8'
  );

  // Target Dossier Header
  const topY = 150;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  drawRoundRect(ctx, 52, topY, w - 104, 70, 16, true, true, 'rgba(56, 189, 248, 0.35)', 1.5);

  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('SIMULATION DOSSIER // BSE: 500124', 76, topY + 28);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Apex Consumer Brands Ltd • FMCG Bluechip Conglomerate', 76, topY + 54);

  // 4 Financial Matrix Cards
  const fY = 236;
  const colW = (w - 104 - 36) / 4;
  const metrics = [
    { label: 'P/E RATIO', val: '16.2x', sub: 'Industry Median: 24.5x', tag: 'Fair Valuation', color: '#38BDF8' },
    { label: 'RETURN ON EQUITY', val: '24.8%', sub: 'Capital Efficiency: High', tag: 'Wide Moat', color: '#10B981' },
    { label: 'DEBT TO EQUITY', val: '0.18', sub: 'Solvency Risk: Low', tag: 'Virtually Debt-Free', color: '#F59E0B' },
    { label: 'FREE CASH FLOW', val: '₹840 Cr', sub: 'Cash Conversion: 94%', tag: 'Real Cashflows', color: '#A855F7' }
  ];

  metrics.forEach((m, idx) => {
    const mx = 52 + idx * (colW + 12);
    ctx.fillStyle = 'rgba(10, 25, 60, 0.75)';
    drawRoundRect(ctx, mx, fY, colW, 140, 16, true, true, 'rgba(56, 189, 248, 0.25)', 1.5);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '800 11px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(m.label, mx + 16, fY + 30);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 32px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(m.val, mx + 16, fY + 70);

    ctx.fillStyle = m.color;
    ctx.font = '700 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(m.tag, mx + 16, fY + 98);

    ctx.fillStyle = '#64748B';
    ctx.font = '500 11px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(m.sub, mx + 16, fY + 120);
  });

  // AI Auditor Verification Stamp Card
  const vY = 392;
  ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
  drawRoundRect(ctx, 52, vY, w - 104, 76, 16, true, true, '#10B981', 1.5);

  ctx.fillStyle = '#34D399';
  ctx.font = '800 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('FINN AI REPORT AUDITOR // VERDICT CONFIRMED: GRADE A+', 76, vY + 32);

  ctx.fillStyle = '#E2E8F0';
  ctx.font = '500 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Student submitted analysis correctly flagged aggressive accounting in receivables. Recommended video lessons auto-queued.', 76, vY + 56);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Simulate institutional equity research without risking a single rupee', 52, 574);

  renderBottomButton(ctx, w, h, 'Analyze Company →');
}

// ─── 06. Jargon-Free Financial Topics ─────────────────────────────────────────

function renderSimpleTopicsDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Plain English Pedagogy', '06',
    'Jargon-Free Financial Topics',
    'Complex Institutional Mechanics Translated Into Intuitive Visual Models',
    'ELI5 READY', '#F59E0B'
  );

  // Side-by-Side Comparison Matrix
  const cmpY = 150;
  const colW = (w - 104 - 40) / 2;

  // Left: Wall Street Jargon
  ctx.fillStyle = 'rgba(239, 68, 68, 0.1)';
  drawRoundRect(ctx, 52, cmpY, colW, 180, 18, true, true, 'rgba(239, 68, 68, 0.4)', 1.5);

  ctx.fillStyle = '#EF4444';
  ctx.font = '800 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('THE WALL STREET JARGON', 76, cmpY + 34);

  ctx.fillStyle = '#FCA5A5';
  ctx.font = '600 15px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('"Mitigate unsystematic idiosyncratic volatility', 76, cmpY + 70);
  ctx.fillText('via stochastic beta optimization and cross-asset', 76, cmpY + 96);
  ctx.fillText('variance-covariance matrix diversification."', 76, cmpY + 122);

  // Right: Plain English
  const rX = 52 + colW + 40;
  ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
  drawRoundRect(ctx, rX, cmpY, colW, 180, 18, true, true, '#10B981', 1.5);

  ctx.fillStyle = '#10B981';
  ctx.font = '800 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('THE TO DIRECT PLAIN ENGLISH REALITY', rX + 24, cmpY + 34);

  ctx.fillStyle = '#E2E8F0';
  ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('"Don’t put all your eggs in one basket.', rX + 24, cmpY + 70);
  ctx.fillText('If you own 50 companies instead of 1,', rX + 24, cmpY + 96);
  ctx.fillText('a single fraud cannot wipe out your savings."', rX + 24, cmpY + 122);

  // Mental Model Formula Card
  const fY = 350;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  drawRoundRect(ctx, 52, fY, w - 104, 116, 18, true, true, 'rgba(56, 189, 248, 0.35)', 1.5);

  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('INSTANT MENTAL MATH // THE RULE OF 72 FORMULA', 76, fY + 34);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 28px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Doubling Time (Years) = 72 ÷ Annual Return Rate %', 76, fY + 72);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('At 12% returns, money doubles in 6 years. At 6% returns, it takes 12 years. Mastered in 3 minutes.', 76, fY + 98);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Bite-sized visual lectures designed specifically for Indian youth', 52, 574);

  renderBottomButton(ctx, w, h, 'Explore Concepts →');
}

// ─── 07. Baseline Knowledge Diagnostic (Where You Stand) ──────────────────────

function renderBaselineDiagnosticDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Entry Calibration', '07',
    'Understanding Where You Stand',
    '5-Minute Diagnostic Upon Login That Maps Blindspots & Literacy Baseline',
    'CALIBRATED', '#10B981'
  );

  // Left Column: Big Composite Mastery Score
  const cardW = 340;
  const topY = 150;
  ctx.fillStyle = 'rgba(10, 25, 60, 0.75)';
  drawRoundRect(ctx, 52, topY, cardW, 310, 18, true, true, 'rgba(56, 189, 248, 0.35)', 1.5);

  ctx.fillStyle = '#93C5FD';
  ctx.font = '800 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('BASELINE MASTERY SCORE', 76, topY + 38);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 64px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('84', 76, topY + 110);
  ctx.font = '800 24px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillStyle = '#64748B';
  ctx.fillText('/ 100', 160, topY + 110);

  ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
  drawRoundRect(ctx, 76, topY + 130, 200, 32, 16, true, true, '#10B981', 1);
  ctx.fillStyle = '#34D399';
  ctx.font = '800 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('TOP 8% OF STUDENT COHORT', 90, topY + 151);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Diagnostic administered on Day 1.', 76, topY + 195);
  ctx.fillText('Zero penalty for wrong answers.', 76, topY + 218);
  ctx.fillText('Used to curate custom learning queue.', 76, topY + 241);

  // Right Column: 5 Competency Radar Bars
  const rX = 52 + cardW + 24;
  const rW = w - 104 - cardW - 24;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  drawRoundRect(ctx, rX, topY, rW, 310, 18, true, true, 'rgba(56, 189, 248, 0.25)', 1.5);

  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('COMPETENCY BREAKDOWN ACROSS 5 DISCIPLINES', rX + 24, topY + 34);

  const skills = [
    { name: 'Compounding Math & Time Horizons', pct: 94, color: '#38BDF8' },
    { name: 'Inflation & Purchasing Power Hedging', pct: 68, color: '#F59E0B' },
    { name: 'Asset Allocation & Portfolio Guardrails', pct: 88, color: '#10B981' },
    { name: 'Fundamental Equity Valuation', pct: 76, color: '#60A5FA' },
    { name: 'Psychological Bias Resistance', pct: 90, color: '#A855F7' }
  ];

  skills.forEach((sk, idx) => {
    const sy = topY + 60 + idx * 48;
    ctx.fillStyle = '#E2E8F0';
    ctx.font = '600 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(sk.name, rX + 24, sy);

    ctx.fillStyle = sk.color;
    ctx.font = '800 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(`${sk.pct}%`, rX + rW - 24, sy);
    ctx.textAlign = 'left';

    // Track
    const barW = rW - 48;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    drawRoundRect(ctx, rX + 24, sy + 8, barW, 8, 4, true, false);
    ctx.fillStyle = sk.color;
    drawRoundRect(ctx, rX + 24, sy + 8, barW * (sk.pct / 100), 8, 4, true, false);
  });

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Take the diagnostic to discover your personal risk profile and blindspots', 52, 574);

  renderBottomButton(ctx, w, h, 'Test Your Baseline →');
}

// ─── 08. Badges & Reflection Certificates ─────────────────────────────────────

function renderBadgesCertificateDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Verified Credentials', '08',
    'Badges & Verified Certificates',
    'Earn Cryptographically Verified Competence Proofs Linked to Your Profile',
    'VERIFIED ON-CHAIN', '#F59E0B'
  );

  // Left: Luxury Gold Certificate Plaque
  const certW = 420;
  const topY = 150;
  ctx.fillStyle = 'rgba(245, 158, 11, 0.08)';
  drawRoundRect(ctx, 52, topY, certW, 310, 18, true, true, '#F59E0B', 2);

  ctx.fillStyle = '#F59E0B';
  ctx.font = '800 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('OFFICIAL CERTIFICATE OF MASTERY', 76, topY + 36);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 24px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Foundations of Wealth', 76, topY + 74);
  ctx.fillText('& Risk Management', 76, topY + 104);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Awarded to Learner: Govardhan', 76, topY + 144);
  ctx.fillText('Curriculum: 28 Lessons • 14 Concept Checks', 76, topY + 168);
  ctx.fillText('Issued: October 2026 Batch', 76, topY + 192);

  // Cryptographic Hash Pill
  ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
  drawRoundRect(ctx, 76, topY + 220, certW - 48, 38, 10, true, true, 'rgba(245, 158, 11, 0.3)', 1);
  ctx.fillStyle = '#FDE68A';
  ctx.font = '700 11px monospace';
  ctx.fillText('HASH: 0x9f81...7c42 // VERIFIED SEBI COMPLIANT', 90, topY + 244);

  // Right: 3 Metallic Mastery Badges
  const rX = 52 + certW + 24;
  const rW = w - 104 - certW - 24;

  const badges = [
    { title: 'LIQUID SENTINEL', desc: 'Maintained 20% liquid cash buffer under all market scenarios', tag: 'GOLD TIER', color: '#F59E0B' },
    { title: 'DEBIASING MASTER', desc: 'Successfully identified and resolved 5 cognitive money traps', tag: 'PLATINUM TIER', color: '#38BDF8' },
    { title: 'COMPOUND STRATEGIST', desc: 'Correctly modeled 15-year exponential compounding curves', tag: 'EMERALD TIER', color: '#10B981' }
  ];

  badges.forEach((bdg, idx) => {
    const by = topY + idx * 105;
    ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
    drawRoundRect(ctx, rX, by, rW, 95, 16, true, true, bdg.color, 1.5);

    ctx.fillStyle = bdg.color;
    ctx.font = '800 11px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(bdg.tag, rX + 20, by + 28);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(bdg.title, rX + 20, by + 52);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '500 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(bdg.desc, rX + 20, by + 76);
  });

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Badges awarded strictly through proven understanding, never passive clicks', 52, 574);

  renderBottomButton(ctx, w, h, 'View All Badges →');
}

// ─── 09. Live Interactive Masterclasses (200m) ────────────────────────────────

function renderLiveSessionsDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Live Cohort Broadcast', '09',
    'Live Sessions & Masterclasses',
    'Interactive 200-Minute Weekend Deep Dives with Real-Time Q&A with Mentors',
    'BROADCAST LIVE', '#EF4444'
  );

  // Live Broadcast Stage HUD
  const topY = 150;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  drawRoundRect(ctx, 52, topY, w - 104, 180, 18, true, true, 'rgba(239, 68, 68, 0.4)', 1.5);

  // Pulsing live indicator
  ctx.fillStyle = '#EF4444';
  ctx.beginPath();
  ctx.arc(76, topY + 34, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#F87171';
  ctx.font = '800 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('LIVE STREAMING // 200M REACH COHORT AUDIENCE', 92, topY + 38);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 26px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Market Cycles & Behavioral Traps: How to Survive a Bear Market', 76, topY + 80);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 14px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Hosted by Lead Pedagogical Educators • 14,820 Students currently participating in live poll', 76, topY + 112);

  // Live Telemetry bar
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  drawRoundRect(ctx, 76, topY + 130, w - 152, 34, 10, true, false);
  ctx.fillStyle = '#38BDF8';
  ctx.font = '700 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('LIVE POLL: "At what Nifty P/E ratio do you consider broad equities overbought?" (A: >24x | B: >30x)', 92, topY + 152);

  // Live Q&A Stream Ticker
  const qY = 345;
  const colW = (w - 104 - 24) / 2;

  ctx.fillStyle = 'rgba(10, 25, 60, 0.75)';
  drawRoundRect(ctx, 52, qY, colW, 115, 16, true, true, 'rgba(56, 189, 248, 0.3)', 1.5);
  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('COMMUNITY LIVE QUESTION', 72, qY + 28);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '600 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('"Should I stop my SIP when markets fall 15%?"', 72, qY + 54);
  ctx.fillStyle = '#34D399';
  ctx.font = '500 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Mentor Answer: No! Market dips allow purchasing units at lower NAV.', 72, qY + 82);

  const rX = 52 + colW + 24;
  ctx.fillStyle = 'rgba(10, 25, 60, 0.75)';
  drawRoundRect(ctx, rX, qY, colW, 115, 16, true, true, 'rgba(56, 189, 248, 0.3)', 1.5);
  ctx.fillStyle = '#F59E0B';
  ctx.font = '800 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('UPCOMING WEEKEND MASTERCLASS', rX + 24, qY + 28);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '600 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('"Forensic Analysis of IPO Red-Herring Prospectus"', rX + 24, qY + 54);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Saturday 5:00 PM IST • 200 min duration • Replay available', rX + 24, qY + 82);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Interactive sessions included free with all verified learner accounts', 52, 574);

  renderBottomButton(ctx, w, h, 'Join Live Cohort →');
}

// ─── 10. Financial Playground (Calculators) ───────────────────────────────────

function renderPlaygroundDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Simulation Engine', '10',
    'Financial Playground & Calculators',
    'Simulate EMI Amortization, SIP Wealth Growth, Stock CAGR & Dividend Yields',
    'INTERACTIVE ENGINE', '#38BDF8'
  );

  // Left: Calculator Inputs
  const leftW = 440;
  const topY = 150;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  drawRoundRect(ctx, 52, topY, leftW, 310, 18, true, true, 'rgba(56, 189, 248, 0.35)', 1.5);

  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('MUTUAL FUND SIP COMPOUNDING SIMULATOR', 76, topY + 34);

  // Slider 1: Monthly Investment
  ctx.fillStyle = '#E2E8F0';
  ctx.font = '700 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Monthly SIP Amount: ₹10,000 / month', 76, topY + 70);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  drawRoundRect(ctx, 76, topY + 82, leftW - 48, 10, 5, true, false);
  ctx.fillStyle = '#38BDF8';
  drawRoundRect(ctx, 76, topY + 82, (leftW - 48) * 0.65, 10, 5, true, false);
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(76 + (leftW - 48) * 0.65, topY + 87, 8, 0, Math.PI * 2);
  ctx.fill();

  // Slider 2: Investment Horizon
  ctx.fillStyle = '#E2E8F0';
  ctx.font = '700 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Investment Time Horizon: 15 Years', 76, topY + 130);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  drawRoundRect(ctx, 76, topY + 142, leftW - 48, 10, 5, true, false);
  ctx.fillStyle = '#F59E0B';
  drawRoundRect(ctx, 76, topY + 142, (leftW - 48) * 0.5, 10, 5, true, false);
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(76 + (leftW - 48) * 0.5, topY + 147, 8, 0, Math.PI * 2);
  ctx.fill();

  // Slider 3: Expected Return Rate
  ctx.fillStyle = '#E2E8F0';
  ctx.font = '700 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Expected CAGR: 12.0% p.a.', 76, topY + 190);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  drawRoundRect(ctx, 76, topY + 202, leftW - 48, 10, 5, true, false);
  ctx.fillStyle = '#10B981';
  drawRoundRect(ctx, 76, topY + 202, (leftW - 48) * 0.6, 10, 5, true, false);
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.arc(76 + (leftW - 48) * 0.6, topY + 207, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('4 Calibrated Modes: Loan EMI, SIP, Stock CAGR & Dividend DRIP', 76, topY + 270);

  // Right: Massive Output Wealth Display
  const rX = 52 + leftW + 24;
  const rW = w - 104 - leftW - 24;
  ctx.fillStyle = 'rgba(10, 25, 60, 0.75)';
  drawRoundRect(ctx, rX, topY, rW, 310, 18, true, true, 'rgba(16, 185, 129, 0.35)', 1.5);

  ctx.fillStyle = '#6EE7B7';
  ctx.font = '800 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('PROJECTED ACCUMULATED WEALTH', rX + 24, topY + 38);

  ctx.fillStyle = '#10B981';
  ctx.font = '900 52px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('₹50,45,760', rX + 24, topY + 104);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Total Invested Capital: ₹18,00,000 (35.6%)', rX + 24, topY + 145);

  ctx.fillStyle = '#34D399';
  ctx.font = '800 16px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Pure Compound Wealth Created: +₹32,45,760 (64.4%)', rX + 24, topY + 175);

  // Visual Exponential Hockey Stick Curve (Canvas vector)
  ctx.strokeStyle = '#10B981';
  ctx.lineWidth = 3;
  ctx.beginPath();
  const cStartX = rX + 24;
  const cStartY = topY + 270;
  ctx.moveTo(cStartX, cStartY);
  ctx.bezierCurveTo(cStartX + 180, cStartY - 10, cStartX + 320, cStartY - 40, cStartX + rW - 48, cStartY - 80);
  ctx.stroke();

  ctx.fillStyle = '#38BDF8';
  ctx.font = '700 11px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('EXPONENTIAL TIME ACCELERATION CURVE', rX + 24, topY + 292);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Interactive mathematical playgrounds that prove the power of starting early', 52, 574);

  renderBottomButton(ctx, w, h, 'Launch Playground →');
}

// ─── 11. Smart Revision System (SRS) ──────────────────────────────────────────

function renderSmartReviewDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Memory Retention Engine', '11',
    'Smart Revision System (SRS)',
    'Spaced Repetition Flashcards & Instant AI Doubt Clarification',
    'DOUBT ENGINE READY', '#38BDF8'
  );

  // Top Status Bar: Due Concepts
  const topY = 150;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  drawRoundRect(ctx, 52, topY, w - 104, 76, 16, true, true, 'rgba(56, 189, 248, 0.35)', 1.5);

  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('ACTIVE SPACED REPETITION QUEUE', 76, topY + 30);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('3 Concepts Ready for Recall Drill Today • 94% Long-Term Retention Target', 76, topY + 56);

  // Spaced Repetition Forgetting Curve Chart (Left)
  const cW = 440;
  const cY = 240;
  ctx.fillStyle = 'rgba(10, 25, 60, 0.75)';
  drawRoundRect(ctx, 52, cY, cW, 220, 18, true, true, 'rgba(56, 189, 248, 0.3)', 1.5);

  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('EBBINGHAUS MEMORY REINFORCEMENT CURVE', 76, cY + 34);

  // Curve drawing
  ctx.strokeStyle = '#60A5FA';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(76, cY + 70);
  ctx.quadraticCurveTo(150, cY + 160, 200, cY + 110);
  ctx.quadraticCurveTo(270, cY + 150, 320, cY + 100);
  ctx.quadraticCurveTo(390, cY + 130, 440, cY + 90);
  ctx.stroke();

  // Nodes
  [
    { x: 76, y: cY + 70, l: 'Day 1' },
    { x: 200, y: cY + 110, l: 'Day 3' },
    { x: 320, y: cY + 100, l: 'Day 7' },
    { x: 440, y: cY + 90, l: 'Day 30' }
  ].forEach(nd => {
    ctx.fillStyle = '#38BDF8';
    ctx.beginPath();
    ctx.arc(nd.x, nd.y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#94A3B8';
    ctx.font = '600 11px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(nd.l, nd.x - 12, nd.y + 22);
  });

  ctx.fillStyle = '#E2E8F0';
  ctx.font = '500 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Timed reviews prevent 80% natural memory decay permanently.', 76, cY + 195);

  // Right: Interactive AI Doubt Clarifier Prompt
  const rX = 52 + cW + 24;
  const rW = w - 104 - cW - 24;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  drawRoundRect(ctx, rX, cY, rW, 220, 18, true, true, 'rgba(56, 189, 248, 0.35)', 1.5);

  ctx.fillStyle = '#F59E0B';
  ctx.font = '800 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('INSTANT AI CONCEPT CLARIFIER', rX + 24, cY + 34);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Ask Finn to re-explain any completed module:', rX + 24, cY + 68);

  ctx.fillStyle = 'rgba(10, 25, 60, 0.9)';
  drawRoundRect(ctx, rX + 24, cY + 88, rW - 48, 44, 12, true, true, 'rgba(56, 189, 248, 0.3)', 1);
  ctx.fillStyle = '#93C5FD';
  ctx.font = '500 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('"Clarify why Dividend Yield is not Total Return..."', rX + 38, cY + 115);

  ctx.fillStyle = '#34D399';
  ctx.font = '600 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('✓ Immediate Socratic explanation with zero wait time', rX + 24, cY + 160);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 12px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Full short-notes cheat sheets available for all 7 completed topics', rX + 24, cY + 185);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 13px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Quick-recall cheat sheets and doubt clarification available 24/7 on Home', 52, 574);

  renderBottomButton(ctx, w, h, 'Open Revision System →');
}

// ─── Master Texture Generator Dispatcher ─────────────────────────────────────

function createFeatureDashboardTexture(projectNumber) {
  if (typeof document === 'undefined') return null;

  const canvas = document.createElement('canvas');
  canvas.width = 1160;
  canvas.height = 620;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  switch (projectNumber) {
    case '01':
      renderAvatarDashboard(ctx, canvas.width, canvas.height);
      break;
    case '02':
      renderDashboardDashboard(ctx, canvas.width, canvas.height);
      break;
    case '03':
      renderSandboxDashboard(ctx, canvas.width, canvas.height);
      break;
    case '04':
      renderQuizzesDashboard(ctx, canvas.width, canvas.height);
      break;
    case '05':
      renderPaperCompanyDashboard(ctx, canvas.width, canvas.height);
      break;
    case '06':
      renderSimpleTopicsDashboard(ctx, canvas.width, canvas.height);
      break;
    case '07':
      renderBaselineDiagnosticDashboard(ctx, canvas.width, canvas.height);
      break;
    case '08':
      renderBadgesCertificateDashboard(ctx, canvas.width, canvas.height);
      break;
    case '09':
      renderLiveSessionsDashboard(ctx, canvas.width, canvas.height);
      break;
    case '10':
      renderPlaygroundDashboard(ctx, canvas.width, canvas.height);
      break;
    case '11':
    default:
      renderSmartReviewDashboard(ctx, canvas.width, canvas.height);
      break;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  return texture;
}

// ─── Main 3D Project Display Component ───────────────────────────────────────

export default function ProjectDisplay({ project, position, rotation = [0, 0, 0], isMobile = false }) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef(null);

  // Generate crisp procedural dashboard canvas texture with blue premium gradients
  const texture = useMemo(() => {
    return createFeatureDashboardTexture(project.number || '01');
  }, [project.number]);

  // Card Dimensions (Matching 1160x620 aspect ratio: 1.87 : 1)
  const cardWidth = isMobile ? 8.2 : 12.8;
  const cardHeight = isMobile ? 4.38 : 6.84;
  const cardRadius = isMobile ? 0.35 : 0.45;

  useFrame((_, delta) => {
    if (groupRef.current) {
      const targetScale = hovered ? 1.035 : 1.0;
      groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, 1), 8 * delta);
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      rotation={rotation}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        if (typeof document !== 'undefined') document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        if (typeof document !== 'undefined') document.body.style.cursor = 'auto';
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (project.link?.startsWith('/')) {
          window.location.href = project.link;
        } else if (project.link) {
          window.open(project.link, '_blank');
        }
      }}
    >
      {/* 3D Premium Blue Metallic Beveled Backplate with Depth */}
      <RoundedBox
        args={[cardWidth, cardHeight, 0.16]}
        radius={cardRadius}
        smoothness={16}
        position={[0, 0, -0.08]}
      >
        <meshStandardMaterial
          color="#060e24"
          roughness={0.2}
          metalness={0.7}
        />
      </RoundedBox>

      {/* Front Face with High-Fidelity Blue Premium Gradient UI Texture */}
      <mesh position={[0, 0, 0.005]}>
        <planeGeometry args={[cardWidth, cardHeight]} />
        {texture && <meshBasicMaterial map={texture} toneMapped={false} />}
      </mesh>
    </group>
  );
}
