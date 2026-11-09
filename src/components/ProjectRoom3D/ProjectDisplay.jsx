"use client";

import React, { useRef, useState, useMemo } from 'react';
import { RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Precision 2D Vector Drawing Primitives ──────────────────────────────────

function drawRoundRect(ctx, x, y, w, h, r, fill = true, stroke = false, strokeColor = 'rgba(255, 255, 255, 0.08)', lineWidth = 1) {
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

function drawPanel(ctx, x, y, w, h, r = 16, bg = '#0D111A', border = 'rgba(255, 255, 255, 0.07)', borderWidth = 1) {
  ctx.fillStyle = bg;
  drawRoundRect(ctx, x, y, w, h, r, true, true, border, borderWidth);
}

// ─── 3D Rounded Rectangle Geometry Generator ─────────────────────────────────

function createRoundedRectGeometry(width, height, radius, segments = 24) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  const r = Math.min(radius, width / 2, height / 2);

  shape.moveTo(x + r, y);
  shape.lineTo(x + width - r, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + r);
  shape.lineTo(x + width, y + height - r);
  shape.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  shape.lineTo(x + r, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);

  const geometry = new THREE.ShapeGeometry(shape, segments);
  const pos = geometry.attributes.position;
  const uvs = new Float32Array(pos.count * 2);

  for (let i = 0; i < pos.count; i++) {
    const px = pos.getX(i);
    const py = pos.getY(i);
    uvs[i * 2] = (px - x) / width;
    uvs[i * 2 + 1] = (py - y) / height;
  }
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
  return geometry;
}

// ─── Minimalist Dark Instrument Frame (2320 x 1240 Retina) ───────────────────

function renderCardFrame(ctx, w, h, categoryTag, cardNumber, title, subtitle, statusText = 'ONLINE', statusColor = '#10B981') {
  // 1. Clear entire canvas
  ctx.clearRect(0, 0, w, h);

  const cornerRadius = 64;

  // 2. Strict clip boundary
  ctx.save();
  drawRoundRect(ctx, 0, 0, w, h, cornerRadius, false, false);
  ctx.clip();

  // 3. Calm monochrome graphite surface (Zero radial color washes, zero glows)
  ctx.fillStyle = '#080C14';
  ctx.fillRect(0, 0, w, h);

  // Subtle top specular hairline for tactile depth
  const topHairline = ctx.createLinearGradient(0, 0, w, 0);
  topHairline.addColorStop(0, 'rgba(255, 255, 255, 0.02)');
  topHairline.addColorStop(0.5, 'rgba(255, 255, 255, 0.12)');
  topHairline.addColorStop(1, 'rgba(255, 255, 255, 0.02)');
  ctx.fillStyle = topHairline;
  ctx.fillRect(0, 0, w, 2);

  // 4. Quiet hairline border (Neutral 8% opacity, no glowing cyan)
  const borderOffset = 3;
  const bW = w - borderOffset * 2;
  const bH = h - borderOffset * 2;
  const bRadius = cornerRadius - borderOffset;
  drawRoundRect(ctx, borderOffset, borderOffset, bW, bH, bRadius, false, true, 'rgba(255, 255, 255, 0.09)', 1.5);

  ctx.restore();

  // 5. Technical Telemetry Header Bar
  // Left: Monospace Index Notation
  ctx.fillStyle = '#64748B';
  ctx.font = '500 16px "JetBrains Mono", "SF Mono", Menlo, Consolas, monospace';
  ctx.fillText(`INDEX : 0${cardNumber} / 11`, 88, 76);

  ctx.fillStyle = '#334155';
  ctx.fillText('//', 260, 76);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 16px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText(categoryTag, 290, 76);

  // Right: Technical status code
  ctx.fillStyle = statusColor;
  ctx.beginPath();
  ctx.arc(w - 230, 71, 4, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 15px "JetBrains Mono", "SF Mono", Menlo, Consolas, monospace';
  ctx.fillText(statusText, w - 214, 76);

  // 6. Calm Editorial Title & Context
  ctx.fillStyle = '#F8FAFC';
  ctx.font = '600 38px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText(title, 88, 148);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText(subtitle, 88, 186);

  // Quiet hairline divider under header
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(88, 218);
  ctx.lineTo(w - 88, 218);
  ctx.stroke();

  // Bottom hairline divider
  ctx.beginPath();
  ctx.moveTo(88, 1076);
  ctx.lineTo(w - 88, 1076);
  ctx.stroke();
}

function renderBottomButton(ctx, w, h, label = 'Explore module') {
  const btnW = 280;
  const btnH = 54;
  const bx = w - 88 - btnW;
  const by = 1110;

  // Muted technical action button
  ctx.fillStyle = '#141A26';
  drawRoundRect(ctx, bx, by, btnW, btnH, 8, true, true, 'rgba(255, 255, 255, 0.12)', 1);

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '500 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`${label}  →`, bx + btnW / 2, by + 34);
  ctx.textAlign = 'left';
}

// ─── 01. AI Financial Avatar (Finn Socratic Coach) ───────────────────────────

function renderAvatarDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Socratic reasoning companion', '1',
    'Finn — Socratic Financial Avatar',
    'Interactive dialogue that probes high-yield promises using first-principles financial mechanics without stock picks.',
    'ACTIVE DIALOGUE', '#10B981'
  );

  const colW = (w - 176 - 32) / 2;
  const topY = 252;
  const colH = 788;

  // ── LEFT PANE: Authentic Socratic Transcript ──
  drawPanel(ctx, 88, topY, colW, colH, 16, '#0B0F17', 'rgba(255, 255, 255, 0.07)');

  // Pane Sub-header
  ctx.fillStyle = '#64748B';
  ctx.font = '500 15px "JetBrains Mono", monospace';
  ctx.fillText('SESSION TRANSCRIPT  •  10:42 IST', 120, topY + 44);

  // Student Inquiry Card
  const bW = colW - 64;
  drawPanel(ctx, 120, topY + 70, bW, 136, 12, '#111724', 'rgba(255, 255, 255, 0.06)');

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 15px "JetBrains Mono", monospace';
  ctx.fillText('STUDENT QUERY', 144, topY + 104);

  ctx.fillStyle = '#E2E8F0';
  ctx.font = '400 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('"A private fund promises 18% guaranteed annual yield.', 144, topY + 140);
  ctx.fillText('Should I park my emergency savings here?"', 144, topY + 172);

  // Finn AI Response Transcript
  const fY = topY + 230;
  drawPanel(ctx, 120, fY, bW, 396, 12, '#0E1420', 'rgba(255, 255, 255, 0.07)');

  ctx.fillStyle = '#10B981';
  ctx.font = '500 15px "JetBrains Mono", monospace';
  ctx.fillText('FINN AI  //  COUNTER-PROBE', 144, fY + 40);

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '600 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Where does that 18% cashflow originate?', 144, fY + 82);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 19px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('1. The sovereign risk-free rate (RBI 10Y G-Sec) benchmark is ~7.1%.', 144, fY + 128);
  ctx.fillText('2. Any scheme offering +10.9% spread without volatility is carrying', 144, fY + 168);
  ctx.fillText('   severe hidden credit default risk or complete lock-in illiquidity.', 144, fY + 204);
  ctx.fillText('3. Emergency funds require zero capital loss risk and instant T+0 exit.', 144, fY + 244);

  ctx.fillStyle = '#F1F5F9';
  ctx.font = '500 19px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('What specific liquid collateral secures your principal if defaults occur?', 144, fY + 300);

  // Quiet Action Prompt
  drawPanel(ctx, 120, topY + 650, bW, 64, 10, '#141B28', 'rgba(255, 255, 255, 0.09)');
  ctx.fillStyle = '#CBD5E1';
  ctx.font = '500 17px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Probe collateral backing with Finn  →', 144, topY + 689);

  // ── RIGHT PANE: Precision Yield & Logic Telemetry ──
  const rX = 88 + colW + 32;
  drawPanel(ctx, rX, topY, colW, colH, 16, '#0B0F17', 'rgba(255, 255, 255, 0.07)');

  ctx.fillStyle = '#64748B';
  ctx.font = '500 15px "JetBrains Mono", monospace';
  ctx.fillText('YIELD DISPERSION & RISK DECOMPOSITION', rX + 32, topY + 44);

  // Yield Comparison Block
  const cY = topY + 70;
  const cW = colW - 64;
  drawPanel(ctx, rX + 32, cY, cW, 230, 12, '#0E1420', 'rgba(255, 255, 255, 0.06)');

  // Benchmark Row 1
  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 17px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Sovereign 10Y G-Sec (Risk-free benchmark)', rX + 56, cY + 42);
  ctx.fillStyle = '#10B981';
  ctx.font = '500 17px "JetBrains Mono", monospace';
  ctx.fillText('7.10%', rX + cW - 80, cY + 42);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
  drawRoundRect(ctx, rX + 56, cY + 56, cW - 48, 8, 4, true, false);
  ctx.fillStyle = '#10B981';
  drawRoundRect(ctx, rX + 56, cY + 56, (cW - 48) * 0.394, 8, 4, true, false);

  // Benchmark Row 2
  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 17px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Promised private fund yield', rX + 56, cY + 110);
  ctx.fillStyle = '#EF4444';
  ctx.font = '500 17px "JetBrains Mono", monospace';
  ctx.fillText('18.00%', rX + cW - 90, cY + 110);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
  drawRoundRect(ctx, rX + 56, cY + 124, cW - 48, 8, 4, true, false);
  ctx.fillStyle = '#EF4444';
  drawRoundRect(ctx, rX + 56, cY + 124, cW - 48, 8, 4, true, false);

  // Spread Notice
  drawPanel(ctx, rX + 56, cY + 154, cW - 48, 48, 8, '#181216', 'rgba(239, 68, 68, 0.2)');
  ctx.fillStyle = '#FCA5A5';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Spread: +10.90% unhedged credit risk premium', rX + 76, cY + 184);

  // Dual Telemetry Metrics
  const tY = topY + 324;
  const tileW = (cW - 16) / 2;

  drawPanel(ctx, rX + 32, tY, tileW, 140, 12, '#0E1420', 'rgba(255, 255, 255, 0.06)');
  ctx.fillStyle = '#64748B';
  ctx.font = '500 14px "JetBrains Mono", monospace';
  ctx.fillText('TIPS GIVEN', rX + 52, tY + 36);
  ctx.fillStyle = '#10B981';
  ctx.font = '600 44px "JetBrains Mono", monospace';
  ctx.fillText('0.00', rX + 52, tY + 92);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 15px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Strictly Socratic pedagogy', rX + 52, tY + 120);

  drawPanel(ctx, rX + 32 + tileW + 16, tY, tileW, 140, 12, '#0E1420', 'rgba(255, 255, 255, 0.06)');
  ctx.fillStyle = '#64748B';
  ctx.font = '500 14px "JetBrains Mono", monospace';
  ctx.fillText('SOCRATIC FIDELITY', rX + 52 + tileW + 16, tY + 36);
  ctx.fillStyle = '#F8FAFC';
  ctx.font = '600 44px "JetBrains Mono", monospace';
  ctx.fillText('99.8%', rX + 52 + tileW + 16, tY + 92);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 15px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('SEBI investor framework', rX + 52 + tileW + 16, tY + 120);

  // Behavioral Traps Flagged Table
  const trY = topY + 488;
  drawPanel(ctx, rX + 32, trY, cW, 226, 12, '#0E1420', 'rgba(255, 255, 255, 0.06)');

  ctx.fillStyle = '#64748B';
  ctx.font = '500 14px "JetBrains Mono", monospace';
  ctx.fillText('BEHAVIORAL BIASES DETECTED', rX + 52, trY + 36);

  const traps = [
    { code: '01', name: 'Yield illusion (ignoring capital default risk)', tag: 'FLAGGED' },
    { code: '02', name: 'Emergency fund misallocation (duration mismatch)', tag: 'FLAGGED' },
    { code: '03', name: 'Illiquidity lock-in blindspot', tag: 'FLAGGED' }
  ];

  traps.forEach((tr, idx) => {
    const rowY = trY + 70 + idx * 48;
    ctx.fillStyle = '#64748B';
    ctx.font = '500 15px "JetBrains Mono", monospace';
    ctx.fillText(tr.code, rX + 52, rowY + 18);

    ctx.fillStyle = '#CBD5E1';
    ctx.font = '400 17px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(tr.name, rX + 88, rowY + 18);

    ctx.fillStyle = '#F59E0B';
    ctx.font = '500 13px "JetBrains Mono", monospace';
    ctx.fillText(tr.tag, rX + cW - 88, rowY + 18);
  });

  // Footer Metadata
  ctx.fillStyle = '#64748B';
  ctx.font = '400 17px "JetBrains Mono", monospace';
  ctx.fillText('Standard: SEBI Investor Education & Protection Fund guidelines', 88, 1144);

  renderBottomButton(ctx, w, h, 'Chat with Finn AI');
}

// ─── 02. Personal Learning Dashboard ──────────────────────────────────────────

function renderDashboardDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Telemetry & mastery tracking', '2',
    'Personal Learning Dashboard',
    'Syllabus progression, daily study consistency, and spaced-retention indicators.',
    'SYNCED', '#10B981'
  );

  const topY = 252;

  // ── Top Row: 3 Quiet Metric Cards ──
  const kpiW = (w - 176 - 32) / 3;
  const kpiH = 260;

  // Card 1: Syllabus Mastery
  drawPanel(ctx, 88, topY, kpiW, kpiH, 16, '#0B0F17', 'rgba(255, 255, 255, 0.07)');
  ctx.fillStyle = '#64748B';
  ctx.font = '500 15px "JetBrains Mono", monospace';
  ctx.fillText('SYLLABUS MASTERY', 116, topY + 44);

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '600 68px "JetBrains Mono", monospace';
  ctx.fillText('68%', 116, topY + 130);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('19 of 28 modules verified', 116, topY + 172);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
  drawRoundRect(ctx, 116, topY + 200, kpiW - 56, 8, 4, true, false);
  ctx.fillStyle = '#38BDF8';
  drawRoundRect(ctx, 116, topY + 200, (kpiW - 56) * 0.68, 8, 4, true, false);

  // Card 2: Study Consistency
  const k2X = 88 + kpiW + 16;
  drawPanel(ctx, k2X, topY, kpiW, kpiH, 16, '#0B0F17', 'rgba(255, 255, 255, 0.07)');
  ctx.fillStyle = '#64748B';
  ctx.font = '500 15px "JetBrains Mono", monospace';
  ctx.fillText('DAILY CONSISTENCY', k2X + 28, topY + 44);

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '600 68px "JetBrains Mono", monospace';
  ctx.fillText('14d', k2X + 28, topY + 130);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Top 5% cohort discipline', k2X + 28, topY + 172);

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const dayStep = (kpiW - 56) / 7;
  days.forEach((day, idx) => {
    const dx = k2X + 28 + idx * dayStep;
    ctx.fillStyle = idx < 5 ? '#1E293B' : '#0F172A';
    drawRoundRect(ctx, dx, topY + 200, dayStep - 6, 26, 4, true, false);
    ctx.fillStyle = idx < 5 ? '#94A3B8' : '#475569';
    ctx.font = '500 13px "JetBrains Mono", monospace';
    ctx.fillText(day, dx + (dayStep - 6) / 2 - 4, topY + 218);
  });

  // Card 3: Concept Retention
  const k3X = k2X + kpiW + 16;
  drawPanel(ctx, k3X, topY, kpiW, kpiH, 16, '#0B0F17', 'rgba(255, 255, 255, 0.07)');
  ctx.fillStyle = '#64748B';
  ctx.font = '500 15px "JetBrains Mono", monospace';
  ctx.fillText('RETENTION STABILITY', k3X + 28, topY + 44);

  ctx.fillStyle = '#10B981';
  ctx.font = '600 68px "JetBrains Mono", monospace';
  ctx.fillText('92%', k3X + 28, topY + 130);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Verified by adaptive drills', k3X + 28, topY + 172);

  ctx.fillStyle = '#111F1D';
  drawRoundRect(ctx, k3X + 28, topY + 200, kpiW - 56, 26, 4, true, false);
  ctx.fillStyle = '#10B981';
  ctx.font = '500 13px "JetBrains Mono", monospace';
  ctx.fillText('DECAY CURVE PROTECTED', k3X + 42, topY + 218);

  // ── Bottom Section: Active Queue & Targeted Review ──
  const activeY = topY + 292;
  const activeW = w - 176;
  drawPanel(ctx, 88, activeY, activeW, 496, 16, '#0B0F17', 'rgba(255, 255, 255, 0.07)');

  ctx.fillStyle = '#64748B';
  ctx.font = '500 15px "JetBrains Mono", monospace';
  ctx.fillText('ACTIVE LEARNING QUEUE  //  NEXT READY LESSON', 120, activeY + 48);

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '600 32px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Module 03 — The physics of compound interest and inflation drag', 120, activeY + 104);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Deconstruct how the Rule of 72 computes doubling periods and why inflation functions as a hidden tax.', 120, activeY + 148);
  ctx.fillText('Estimated completion: 8 minutes • Includes 3 interactive debiasing scenarios with Finn AI.', 120, activeY + 182);

  // Focus Area Cards
  const focusY = activeY + 224;
  const focusW = (activeW - 64 - 32) / 2;

  drawPanel(ctx, 120, focusY, focusW, 216, 12, '#0E1420', 'rgba(255, 255, 255, 0.06)');
  ctx.fillStyle = '#64748B';
  ctx.font = '500 14px "JetBrains Mono", monospace';
  ctx.fillText('COMPETENCY BREAKDOWN', 144, focusY + 36);

  const compList = [
    { label: 'Inflation drag on fixed deposits', val: '82% clarity', ok: true },
    { label: 'Expense ratio compounding cost', val: 'Needs review', ok: false },
    { label: 'Emergency fund sizing rules', val: 'Mastered', ok: true }
  ];
  compList.forEach((c, idx) => {
    const cy = focusY + 68 + idx * 44;
    ctx.fillStyle = '#E2E8F0';
    ctx.font = '400 17px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(c.label, 144, cy + 16);

    ctx.fillStyle = c.ok ? '#10B981' : '#F59E0B';
    ctx.font = '500 14px "JetBrains Mono", monospace';
    ctx.fillText(c.val, 144 + focusW - 170, cy + 16);
  });

  drawPanel(ctx, 120 + focusW + 32, focusY, focusW, 216, 12, '#0E1420', 'rgba(255, 255, 255, 0.06)');
  ctx.fillStyle = '#64748B';
  ctx.font = '500 14px "JetBrains Mono", monospace';
  ctx.fillText('LESSON ACTIONS', 120 + focusW + 56, focusY + 36);

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '500 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Resume Topic 03.1: Rule of 72  →', 120 + focusW + 56, focusY + 84);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 16px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Review formula cheat sheet  →', 120 + focusW + 56, focusY + 130);
  ctx.fillText('Take diagnostic spot check  →', 120 + focusW + 56, focusY + 174);

  // Footer Metadata
  ctx.fillStyle = '#64748B';
  ctx.font = '400 17px "JetBrains Mono", monospace';
  ctx.fillText('Cohort 2026 • Verified concept path', 88, 1144);

  renderBottomButton(ctx, w, h, 'Open dashboard');
}

// ─── 03. Virtual ₹10,000 Sandbox ─────────────────────────────────────────────

function renderSandboxDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Simulation terminal', '3',
    'Virtual ₹10,000 Practice Sandbox',
    'Realistic asset allocation across equity index ETFs, sovereign gold, and liquid debt with mandatory trade rationales.',
    'PORTFOLIO BALANCED', '#10B981'
  );

  const topY = 252;
  const totalW = w - 176;

  // ── Hero Valuation Card ──
  drawPanel(ctx, 88, topY, totalW, 180, 16, '#0B0F17', 'rgba(255, 255, 255, 0.07)');

  ctx.fillStyle = '#64748B';
  ctx.font = '500 15px "JetBrains Mono", monospace';
  ctx.fillText('SIMULATED PORTFOLIO VALUATION', 120, topY + 44);

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '600 72px "JetBrains Mono", monospace';
  ctx.fillText('₹10,480.00', 120, topY + 132);

  ctx.fillStyle = '#10B981';
  ctx.font = '500 20px "JetBrains Mono", monospace';
  ctx.fillText('+4.80%  (+₹480.00)', 620, topY + 116);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 17px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Cash buffer available: ₹2,000.00 (20.0%)', 980, topY + 98);
  ctx.fillText('Initial capital seed: ₹10,000.00', 980, topY + 128);

  // ── Allocation Ribbon ──
  const barY = topY + 214;
  ctx.fillStyle = '#64748B';
  ctx.font = '500 14px "JetBrains Mono", monospace';
  ctx.fillText('ASSET ALLOCATION SPECTRUM  //  EQUITY 50%  •  GOLD 30%  •  LIQUID CASH 20%', 88, barY + 14);

  const w1 = totalW * 0.5;
  const w2 = totalW * 0.3;
  const w3 = totalW * 0.2;

  ctx.fillStyle = '#38BDF8';
  drawRoundRect(ctx, 88, barY + 28, w1 - 4, 12, 4, true, false);
  ctx.fillStyle = '#F59E0B';
  drawRoundRect(ctx, 88 + w1, barY + 28, w2 - 4, 12, 4, true, false);
  ctx.fillStyle = '#10B981';
  drawRoundRect(ctx, 88 + w1 + w2, barY + 28, w3, 12, 4, true, false);

  // ── 3 Active Holding Position Cards ──
  const holdY = barY + 68;
  const holdW = (totalW - 32) / 3;

  const holdings = [
    {
      title: 'NIFTY 50 INDEX ETF',
      sub: 'Equity Growth Core (50%)',
      amount: '₹5,000.00',
      pnl: '+3.4%  (+₹170)',
      rationale: 'Broad-market index beta with low tracking error'
    },
    {
      title: 'SOVEREIGN GOLD ETF',
      sub: 'Inflation Hedge (30%)',
      amount: '₹3,000.00',
      pnl: '+2.1%  (+₹63)',
      rationale: 'Long-term rupee purchasing power hedge'
    },
    {
      title: 'OVERNIGHT LIQUID FUND',
      sub: 'Emergency Buffer (20%)',
      amount: '₹2,000.00',
      pnl: '+0.7%  (+₹14)',
      rationale: 'Zero volatility instant liquidity reserve'
    }
  ];

  holdings.forEach((hld, idx) => {
    const hx = 88 + idx * (holdW + 16);
    drawPanel(ctx, hx, holdY, holdW, 474, 16, '#0B0F17', 'rgba(255, 255, 255, 0.07)');

    ctx.fillStyle = '#94A3B8';
    ctx.font = '500 16px "JetBrains Mono", monospace';
    ctx.fillText(hld.title, hx + 28, holdY + 44);

    ctx.fillStyle = '#64748B';
    ctx.font = '400 15px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(hld.sub, hx + 28, holdY + 74);

    ctx.fillStyle = '#F8FAFC';
    ctx.font = '600 44px "JetBrains Mono", monospace';
    ctx.fillText(hld.amount, hx + 28, holdY + 154);

    ctx.fillStyle = '#10B981';
    ctx.font = '500 20px "JetBrains Mono", monospace';
    ctx.fillText(hld.pnl, hx + 28, holdY + 204);

    // Rationale Block
    drawPanel(ctx, hx + 28, holdY + 248, holdW - 56, 180, 10, '#0E1420', 'rgba(255, 255, 255, 0.06)');

    ctx.fillStyle = '#64748B';
    ctx.font = '500 13px "JetBrains Mono", monospace';
    ctx.fillText('MANDATORY TRADE RATIONALE', hx + 48, holdY + 286);

    ctx.fillStyle = '#CBD5E1';
    ctx.font = '400 17px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(hld.rationale, hx + 48, holdY + 328);

    ctx.fillStyle = '#10B981';
    ctx.font = '500 14px "JetBrains Mono", monospace';
    ctx.fillText('STATUS: VALIDATED', hx + 48, holdY + 392);
  });

  // Footer Metadata
  ctx.fillStyle = '#64748B';
  ctx.font = '400 17px "JetBrains Mono", monospace';
  ctx.fillText('Zero capital risk • Mandatory investment rationale on every order', 88, 1144);

  renderBottomButton(ctx, w, h, 'Launch sandbox');
}

// ─── 04. Quizzes & Gamified Drills ───────────────────────────────────────────

function renderQuizzesDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Adaptive diagnostic engine', '4',
    'Adaptive Quizzes & Debiasing Drills',
    'Scenario challenges that test concept understanding and interrogate cognitive biases before awarding XP.',
    'ADAPTIVE ACTIVE', '#10B981'
  );

  const topY = 252;
  const boxW = w - 176;

  // Scenario Question Box
  drawPanel(ctx, 88, topY, boxW, 190, 16, '#0B0F17', 'rgba(255, 255, 255, 0.07)');

  ctx.fillStyle = '#64748B';
  ctx.font = '500 15px "JetBrains Mono", monospace';
  ctx.fillText('SCENARIO 04 OF 10  •  PURCHASING POWER EROSION', 120, topY + 44);

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '500 24px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('You lock ₹1,00,000 into a fixed deposit earning 5.0% annual interest while inflation runs at 7.0%.', 120, topY + 98);
  ctx.fillText('After 3 years, what has happened to your real purchasing capacity?', 120, topY + 138);

  // Option A (The Cognitive Trap)
  const o1Y = topY + 222;
  drawPanel(ctx, 88, o1Y, boxW, 140, 12, '#141014', 'rgba(239, 68, 68, 0.25)');

  ctx.fillStyle = '#FCA5A5';
  ctx.font = '400 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('A) My wealth increased because 5% annual interest produces guaranteed positive rupees.', 120, o1Y + 54);

  ctx.fillStyle = '#EF4444';
  ctx.font = '500 14px "JetBrains Mono", monospace';
  ctx.fillText('TRAP DETECTED: MONEY ILLUSION BIAS', 120, o1Y + 98);

  // Option B (The Verified Answer)
  const o2Y = o1Y + 164;
  drawPanel(ctx, 88, o2Y, boxW, 140, 12, '#0D1716', 'rgba(16, 185, 129, 0.25)');

  ctx.fillStyle = '#A7F3D0';
  ctx.font = '500 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('B) My purchasing power declined by ~2% annually. Real return = 5% Nominal - 7% Inflation.', 120, o2Y + 54);

  ctx.fillStyle = '#10B981';
  ctx.font = '500 14px "JetBrains Mono", monospace';
  ctx.fillText('VERIFIED FIRST PRINCIPLES  (+50 XP)', 120, o2Y + 98);

  // Socratic Follow-Up Probe
  const sY = o2Y + 164;
  drawPanel(ctx, 88, sY, boxW, 230, 12, '#0B0F17', 'rgba(255, 255, 255, 0.07)');

  ctx.fillStyle = '#64748B';
  ctx.font = '500 14px "JetBrains Mono", monospace';
  ctx.fillText('SOCRATIC COUNTER-PROBE ENGINE', 120, sY + 44);

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '500 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Every answer requires you to state your investment premise before submission.', 120, sY + 92);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('The system questions your logic to verify concept mastery rather than lucky guessing.', 120, sY + 130);

  ctx.fillStyle = '#64748B';
  ctx.font = '400 17px "JetBrains Mono", monospace';
  ctx.fillText('Adaptive drill calibration • Socratic follow-up active', 88, 1144);

  renderBottomButton(ctx, w, h, 'Take diagnostic drill');
}

// ─── 05. Paper Company Analysis ──────────────────────────────────────────────

function renderPaperCompanyDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Institutional teardown', '5',
    'Paper Company Forensic Analysis',
    'Deconstruct corporate statements, cashflow quality, and balance sheet moats without Wall Street jargon.',
    'DOSSIER LOADED', '#10B981'
  );

  const topY = 252;
  const colW = (w - 176 - 32) / 2;
  const colH = 788;

  // ── LEFT PANE: 4 Financial Health Ratios ──
  drawPanel(ctx, 88, topY, colW, colH, 16, '#0B0F17', 'rgba(255, 255, 255, 0.07)');

  ctx.fillStyle = '#64748B';
  ctx.font = '500 15px "JetBrains Mono", monospace';
  ctx.fillText('DOSSIER: APEX CONSUMER BRANDS LTD  [NSE : APEX]', 120, topY + 44);

  const ratios = [
    { label: 'PRICE TO EARNINGS (P/E)', val: '16.4x', note: 'Sector median: 24.2x (32% discount)' },
    { label: 'RETURN ON EQUITY (ROE)', val: '24.8%', note: 'High capital productivity and moat' },
    { label: 'DEBT TO EQUITY RATIO', val: '0.14', note: 'Virtually debt-free balance sheet' },
    { label: 'FREE CASH FLOW (FCF)', val: '₹840 Cr', note: 'Operating cash conversion is 96%' }
  ];

  const rGridW = (colW - 64 - 16) / 2;
  ratios.forEach((r, idx) => {
    const rx = 120 + (idx % 2) * (rGridW + 16);
    const ry = topY + 74 + Math.floor(idx / 2) * 336;

    drawPanel(ctx, rx, ry, rGridW, 310, 12, '#0E1420', 'rgba(255, 255, 255, 0.06)');

    ctx.fillStyle = '#64748B';
    ctx.font = '500 14px "JetBrains Mono", monospace';
    ctx.fillText(r.label, rx + 24, ry + 44);

    ctx.fillStyle = '#F8FAFC';
    ctx.font = '600 48px "JetBrains Mono", monospace';
    ctx.fillText(r.val, rx + 24, ry + 128);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '400 16px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(r.note, rx + 24, ry + 180);
  });

  // ── RIGHT PANE: Forensic Auditor Checklist ──
  const rX = 88 + colW + 32;
  drawPanel(ctx, rX, topY, colW, colH, 16, '#0B0F17', 'rgba(255, 255, 255, 0.07)');

  ctx.fillStyle = '#64748B';
  ctx.font = '500 15px "JetBrains Mono", monospace';
  ctx.fillText('QUALITY OF EARNINGS AUDIT', rX + 32, topY + 44);

  // Grade Card
  drawPanel(ctx, rX + 32, topY + 70, colW - 64, 180, 12, '#0E1420', 'rgba(255, 255, 255, 0.06)');
  ctx.fillStyle = '#10B981';
  ctx.font = '600 72px "JetBrains Mono", monospace';
  ctx.fillText('GRADE A+', rX + 56, topY + 158);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('High earnings quality • Zero aggressive revenue recognition', rX + 56, topY + 204);

  // Checklist Block
  const ckY = topY + 276;
  drawPanel(ctx, rX + 32, ckY, colW - 64, 480, 12, '#0E1420', 'rgba(255, 255, 255, 0.06)');

  ctx.fillStyle = '#64748B';
  ctx.font = '500 14px "JetBrains Mono", monospace';
  ctx.fillText('AUDIT VERIFICATION STEPS', rX + 56, ckY + 44);

  const checks = [
    { title: 'Receivable days steady at 28 days', sub: 'Industry average is 45 days (No channel stuffing)' },
    { title: 'Operating cash fully funds capex', sub: 'No equity dilution or debt required for expansion' },
    { title: '0.00% promoter share pledging', sub: 'Zero collateral default hazard for equity holders' },
    { title: 'Clean related-party transactions', sub: 'Audited notes to accounts reveal no unlisted leakages' }
  ];

  checks.forEach((c, idx) => {
    const cy = ckY + 84 + idx * 96;
    ctx.fillStyle = '#10B981';
    ctx.font = '500 15px "JetBrains Mono", monospace';
    ctx.fillText('[OK]', rX + 56, cy + 20);

    ctx.fillStyle = '#F8FAFC';
    ctx.font = '500 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(c.title, rX + 104, cy + 20);

    ctx.fillStyle = '#64748B';
    ctx.font = '400 15px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(c.sub, rX + 104, cy + 46);
  });

  // Footer Metadata
  ctx.fillStyle = '#64748B';
  ctx.font = '400 17px "JetBrains Mono", monospace';
  ctx.fillText('Deconstructing annual reports without financial jargon', 88, 1144);

  renderBottomButton(ctx, w, h, 'Analyze paper dossier');
}

// ─── 06. Jargon-Free Financial Topics ─────────────────────────────────────────

function renderSimpleTopicsDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Plain English translation', '6',
    'Jargon-Free Financial Topics',
    'Complex Wall Street vocabulary translated into clean, intuitive real-world mental models.',
    'ZERO JARGON', '#10B981'
  );

  const topY = 252;
  const colW = (w - 176 - 32) / 2;
  const colH = 788;

  // ── LEFT PANE: Translation Matrix ──
  drawPanel(ctx, 88, topY, colW, colH, 16, '#0B0F17', 'rgba(255, 255, 255, 0.07)');

  ctx.fillStyle = '#64748B';
  ctx.font = '500 15px "JetBrains Mono", monospace';
  ctx.fillText('WALL STREET TRANSLATION MATRIX', 120, topY + 44);

  const pairs = [
    {
      jargon: 'ALPHA GENERATION',
      trans: 'Beating the average market index through repeatable skill rather than luck.'
    },
    {
      jargon: 'LIQUIDITY RISK',
      trans: 'Needing your money right now, but having it trapped in an illiquid asset that takes months to sell.'
    },
    {
      jargon: 'EXPENSE RATIO COMPOUNDING',
      trans: 'The silent 1% annual fee that cuts away 25% of your final wealth over a 30-year investing horizon.'
    }
  ];

  pairs.forEach((p, idx) => {
    const py = topY + 70 + idx * 224;
    drawPanel(ctx, 120, py, colW - 64, 196, 12, '#0E1420', 'rgba(255, 255, 255, 0.06)');

    ctx.fillStyle = '#64748B';
    ctx.font = '500 14px "JetBrains Mono", monospace';
    ctx.fillText(`WALL STREET TERM : ${p.jargon}`, 144, py + 40);

    ctx.fillStyle = '#F8FAFC';
    ctx.font = '400 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(`"${p.trans}"`, 144, py + 88);
  });

  // ── RIGHT PANE: Rule of 72 Mental Model ──
  const rX = 88 + colW + 32;
  drawPanel(ctx, rX, topY, colW, colH, 16, '#0B0F17', 'rgba(255, 255, 255, 0.07)');

  ctx.fillStyle = '#64748B';
  ctx.font = '500 15px "JetBrains Mono", monospace';
  ctx.fillText('MENTAL MODEL SPOTLIGHT', rX + 32, topY + 44);

  const mY = topY + 70;
  const mW = colW - 64;
  drawPanel(ctx, rX + 32, mY, mW, 320, 12, '#0E1420', 'rgba(255, 255, 255, 0.06)');

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '600 28px "JetBrains Mono", monospace';
  ctx.fillText('Years to double = 72 ÷ Return (%)', rX + 56, mY + 60);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 19px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Calculate exponential doubling in your head:', rX + 56, mY + 116);
  ctx.fillText('• At 6% return: 72 ÷ 6 = 12 years to double capital', rX + 56, mY + 162);
  ctx.fillText('• At 12% return: 72 ÷ 12 = 6 years to double capital', rX + 56, mY + 208);
  ctx.fillText('• At 18% promised return: Claims 4 years (Look for hidden default risk)', rX + 56, mY + 254);

  // Takeaway Card
  const bY = topY + 422;
  drawPanel(ctx, rX + 32, bY, mW, 334, 12, '#0E1420', 'rgba(255, 255, 255, 0.06)');

  ctx.fillStyle = '#64748B';
  ctx.font = '500 14px "JetBrains Mono", monospace';
  ctx.fillText('FIRST PRINCIPLES PEDAGOGY', rX + 56, bY + 44);

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '400 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Every finance concept is grounded in practical math,', rX + 56, bY + 98);
  ctx.fillText('concrete analogies, and real-world mechanisms that', rX + 56, bY + 138);
  ctx.fillText('anyone can evaluate on a napkin without prior background.', rX + 56, bY + 178);

  // Footer Metadata
  ctx.fillStyle = '#64748B';
  ctx.font = '400 17px "JetBrains Mono", monospace';
  ctx.fillText('Pure first-principles financial mechanics', 88, 1144);

  renderBottomButton(ctx, w, h, 'Explore syllabus');
}

// ─── 07. Understanding Where You Stand (Baseline Diagnostic) ──────────────────

function renderBaselineDiagnosticDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Entry calibration', '7',
    'Understanding Where You Stand',
    '5-minute adaptive calibration upon signup that charts your cognitive blindspots and tailored roadmap.',
    'CALIBRATED', '#10B981'
  );

  const topY = 252;
  const colW = (w - 176 - 32) / 2;
  const colH = 788;

  // ── LEFT PANE: Literacy Score ──
  drawPanel(ctx, 88, topY, colW, colH, 16, '#0B0F17', 'rgba(255, 255, 255, 0.07)');

  ctx.fillStyle = '#64748B';
  ctx.font = '500 15px "JetBrains Mono", monospace';
  ctx.fillText('BASELINE LITERACY INDEX', 120, topY + 44);

  const sW = colW - 64;
  drawPanel(ctx, 120, topY + 70, sW, 360, 12, '#0E1420', 'rgba(255, 255, 255, 0.06)');

  ctx.fillStyle = '#10B981';
  ctx.font = '600 100px "JetBrains Mono", monospace';
  ctx.fillText('84 / 100', 144, topY + 200);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 18px "JetBrains Mono", monospace';
  ctx.fillText('TOP 8% OF COHORT ENTRANTS', 144, topY + 252);

  ctx.fillStyle = '#64748B';
  ctx.font = '400 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Strong grasp of compounding math.', 144, topY + 310);
  ctx.fillText('Vulnerable to unhedged bond yields and illiquidity traps.', 144, topY + 342);

  // Recommendation Card
  drawPanel(ctx, 120, topY + 462, sW, 290, 12, '#0E1420', 'rgba(255, 255, 255, 0.06)');
  ctx.fillStyle = '#64748B';
  ctx.font = '500 14px "JetBrains Mono", monospace';
  ctx.fillText('RECOMMENDED CURRICULUM ROUTE', 144, topY + 504);

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '500 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Skip beginner theory  →  Begin at Module 03', 144, topY + 550);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Saves 2.5 hours of repetitive introductory theory.', 144, topY + 596);

  // ── RIGHT PANE: Competency Progress Meters ──
  const rX = 88 + colW + 32;
  drawPanel(ctx, rX, topY, colW, colH, 16, '#0B0F17', 'rgba(255, 255, 255, 0.07)');

  ctx.fillStyle = '#64748B';
  ctx.font = '500 15px "JetBrains Mono", monospace';
  ctx.fillText('COMPETENCY BREAKDOWN', rX + 32, topY + 44);

  const skills = [
    { name: 'Compound interest & exponential math', pct: 96, tier: 'Advanced' },
    { name: 'Asset allocation & diversification', pct: 88, tier: 'Proficient' },
    { name: 'Inflation drag & purchasing power', pct: 82, tier: 'Proficient' },
    { name: 'Risk vs volatility discrimination', pct: 70, tier: 'Review' }
  ];

  skills.forEach((sk, idx) => {
    const sy = topY + 70 + idx * 168;
    drawPanel(ctx, rX + 32, sy, colW - 64, 144, 12, '#0E1420', 'rgba(255, 255, 255, 0.06)');

    ctx.fillStyle = '#F8FAFC';
    ctx.font = '500 19px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(sk.name, rX + 56, sy + 44);

    ctx.fillStyle = '#64748B';
    ctx.font = '500 16px "JetBrains Mono", monospace';
    ctx.fillText(`${sk.pct}%  [${sk.tier}]`, rX + colW - 190, sy + 44);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
    drawRoundRect(ctx, rX + 56, sy + 76, colW - 120, 8, 4, true, false);

    ctx.fillStyle = sk.pct >= 85 ? '#10B981' : sk.pct >= 75 ? '#38BDF8' : '#F59E0B';
    drawRoundRect(ctx, rX + 56, sy + 76, (colW - 120) * (sk.pct / 100), 8, 4, true, false);
  });

  // Footer Metadata
  ctx.fillStyle = '#64748B';
  ctx.font = '400 17px "JetBrains Mono", monospace';
  ctx.fillText('Adaptive 5-minute calibration', 88, 1144);

  renderBottomButton(ctx, w, h, 'Start diagnostic');
}

// ─── 08. Badges & Verified Certificates ──────────────────────────────────────

function renderBadgesCertificateDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Verified credentials', '8',
    'Badges & Verifiable Certificates',
    'Verifiable credentials that prove practical financial literacy on your resume and professional profiles.',
    'VERIFIED', '#10B981'
  );

  const topY = 252;
  const colW = (w - 176 - 32) / 2;
  const colH = 788;

  // ── LEFT PANE: Digital Certificate Dossier ──
  drawPanel(ctx, 88, topY, colW, colH, 16, '#0B0F17', 'rgba(255, 255, 255, 0.07)');

  ctx.fillStyle = '#64748B';
  ctx.font = '500 15px "JetBrains Mono", monospace';
  ctx.fillText('CERTIFICATE OF PRACTICAL MASTERY', 120, topY + 44);

  const pY = topY + 70;
  const pW = colW - 64;
  drawPanel(ctx, 120, pY, pW, 680, 12, '#0E1420', 'rgba(255, 255, 255, 0.06)');

  ctx.fillStyle = '#64748B';
  ctx.font = '500 14px "JetBrains Mono", monospace';
  ctx.fillText('ISSUER : TODIRECT PEDAGOGICAL ENGINE', 144, pY + 54);

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '600 32px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Foundational Capital Allocation', 144, pY + 114);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 19px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Awarded upon verifying 100% Socratic drill fidelity,', 144, pY + 168);
  ctx.fillText('completing the ₹10,000 practice sandbox portfolio,', 144, pY + 204);
  ctx.fillText('and successfully auditing paper company financial statements.', 144, pY + 240);

  // Serial Verification Tag
  drawPanel(ctx, 144, pY + 310, pW - 48, 80, 8, '#141A26', 'rgba(255, 255, 255, 0.08)');
  ctx.fillStyle = '#64748B';
  ctx.font = '500 13px "JetBrains Mono", monospace';
  ctx.fillText('CRYPTOGRAPHIC SERIAL HASH', 168, pY + 342);
  ctx.fillStyle = '#10B981';
  ctx.font = '500 15px "JetBrains Mono", monospace';
  ctx.fillText('TOD-CERT-2026-9842-X7', 168, pY + 370);

  // ── RIGHT PANE: Milestone Badges ──
  const rX = 88 + colW + 32;
  drawPanel(ctx, rX, topY, colW, colH, 16, '#0B0F17', 'rgba(255, 255, 255, 0.07)');

  ctx.fillStyle = '#64748B';
  ctx.font = '500 15px "JetBrains Mono", monospace';
  ctx.fillText('UNLOCKED MILESTONE BADGES', rX + 32, topY + 44);

  const badges = [
    { code: 'B-01', name: 'Liquid Sentinel', desc: 'Maintained 20% liquid cash buffer throughout 6 simulated market cycles' },
    { code: 'B-02', name: 'Debiasing Champion', desc: 'Identified and rejected 25 cognitive trap scenarios with Finn AI' },
    { code: 'B-03', name: 'Compound Strategist', desc: 'Successfully mapped a 30-year SIP with inflation drag calculations' }
  ];

  badges.forEach((b, idx) => {
    const by = topY + 70 + idx * 224;
    drawPanel(ctx, rX + 32, by, colW - 64, 196, 12, '#0E1420', 'rgba(255, 255, 255, 0.06)');

    ctx.fillStyle = '#64748B';
    ctx.font = '500 14px "JetBrains Mono", monospace';
    ctx.fillText(b.code, rX + 56, by + 42);

    ctx.fillStyle = '#F8FAFC';
    ctx.font = '500 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(b.name, rX + 116, by + 42);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '400 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(b.desc, rX + 56, by + 94);
  });

  // Footer Metadata
  ctx.fillStyle = '#64748B';
  ctx.font = '400 17px "JetBrains Mono", monospace';
  ctx.fillText('Verifiable credentials linkable directly to profile', 88, 1144);

  renderBottomButton(ctx, w, h, 'View credentials');
}

// ─── 09. Live Sessions & Masterclasses ───────────────────────────────────────

function renderLiveSessionsDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Cohort broadcasts', '9',
    'Interactive Weekend Masterclasses',
    '200-minute deep dives with industry research analysts dissecting actual financial statements and corporate filings.',
    'BROADCAST SCHEDULED', '#10B981'
  );

  const topY = 252;
  const colW = (w - 176 - 32) / 2;
  const colH = 788;

  // ── LEFT PANE: Broadcast Session Details ──
  drawPanel(ctx, 88, topY, colW, colH, 16, '#0B0F17', 'rgba(255, 255, 255, 0.07)');

  ctx.fillStyle = '#64748B';
  ctx.font = '500 15px "JetBrains Mono", monospace';
  ctx.fillText('MASTERCLASS SESSION', 120, topY + 44);

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '600 32px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Forensic Balance Sheet Teardown', 120, topY + 114);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 19px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('How institutional investors spot hidden credit risk before earnings reports.', 120, topY + 160);

  // Telemetry Block
  const stY = topY + 220;
  const stW = colW - 64;
  drawPanel(ctx, 120, stY, stW, 190, 12, '#0E1420', 'rgba(255, 255, 255, 0.06)');

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '600 52px "JetBrains Mono", monospace';
  ctx.fillText('1,420', 144, stY + 84);
  ctx.fillStyle = '#64748B';
  ctx.font = '500 14px "JetBrains Mono", monospace';
  ctx.fillText('ACTIVE LEARNERS', 144, stY + 124);

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '600 52px "JetBrains Mono", monospace';
  ctx.fillText('2h 40m', 144 + stW / 2, stY + 84);
  ctx.fillStyle = '#64748B';
  ctx.font = '500 14px "JetBrains Mono", monospace';
  ctx.fillText('DURATION', 144 + stW / 2, stY + 124);

  // ── RIGHT PANE: Student Q&A Stream ──
  const rX = 88 + colW + 32;
  drawPanel(ctx, rX, topY, colW, colH, 16, '#0B0F17', 'rgba(255, 255, 255, 0.07)');

  ctx.fillStyle = '#64748B';
  ctx.font = '500 15px "JetBrains Mono", monospace';
  ctx.fillText('Q&A STREAM', rX + 32, topY + 44);

  const qs = [
    {
      q: 'How do we distinguish between goodwill impairments and real asset writedowns?',
      a: 'Mentor: Look at footnote 14 in notes to accounts to evaluate cash-generating units.'
    },
    {
      q: 'Can a company show positive net profit while burning cash?',
      a: 'Mentor: Yes. That is why we track Operating Cash Flow rather than accounting PAT.'
    }
  ];

  qs.forEach((item, idx) => {
    const qy = topY + 70 + idx * 240;
    drawPanel(ctx, rX + 32, qy, colW - 64, 216, 12, '#0E1420', 'rgba(255, 255, 255, 0.06)');

    ctx.fillStyle = '#F8FAFC';
    ctx.font = '500 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(`Q: "${item.q}"`, rX + 56, qy + 44);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '400 17px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(item.a, rX + 56, qy + 110);
  });

  // Footer Metadata
  ctx.fillStyle = '#64748B';
  ctx.font = '400 17px "JetBrains Mono", monospace';
  ctx.fillText('Interactive weekend masterclasses with mentor Q&A', 88, 1144);

  renderBottomButton(ctx, w, h, 'Join masterclass');
}

// ─── 10. Financial Playground & Calculators ───────────────────────────────────

function renderPlaygroundDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Simulation playground', '10',
    'Financial Playground & Calculators',
    'Tactile scenario simulators for SIP compound growth, EMI amortization, and inflation erosion.',
    'SIMULATOR ACTIVE', '#10B981'
  );

  const topY = 252;
  const colW = (w - 176 - 32) / 2;
  const colH = 788;

  // ── LEFT PANE: Input Parameters ──
  drawPanel(ctx, 88, topY, colW, colH, 16, '#0B0F17', 'rgba(255, 255, 255, 0.07)');

  ctx.fillStyle = '#64748B';
  ctx.font = '500 15px "JetBrains Mono", monospace';
  ctx.fillText('COMPOUND SIP PARAMETERS', 120, topY + 44);

  const sliders = [
    { label: 'MONTHLY SIP CONTRIBUTION', val: '₹10,000 / mo', sub: 'Baseline capital allocation' },
    { label: 'INVESTMENT HORIZON', val: '15 Years (180 mo)', sub: 'Allows compound engine to accelerate' },
    { label: 'EXPECTED CAGR (EQUITY INDEX)', val: '12.0% Annualized', sub: 'Historical Nifty 50 rolling average' }
  ];

  sliders.forEach((sl, idx) => {
    const sy = topY + 70 + idx * 224;
    drawPanel(ctx, 120, sy, colW - 64, 196, 12, '#0E1420', 'rgba(255, 255, 255, 0.06)');

    ctx.fillStyle = '#64748B';
    ctx.font = '500 14px "JetBrains Mono", monospace';
    ctx.fillText(sl.label, 144, sy + 40);

    ctx.fillStyle = '#F8FAFC';
    ctx.font = '600 36px "JetBrains Mono", monospace';
    ctx.fillText(sl.val, 144, sy + 94);

    // Track
    ctx.fillStyle = 'rgba(255, 255, 255, 0.06)';
    drawRoundRect(ctx, 144, sy + 130, colW - 112, 6, 3, true, false);
    ctx.fillStyle = '#38BDF8';
    drawRoundRect(ctx, 144, sy + 130, (colW - 112) * 0.65, 6, 3, true, false);
  });

  // ── RIGHT PANE: Maturity Projection ──
  const rX = 88 + colW + 32;
  drawPanel(ctx, rX, topY, colW, colH, 16, '#0B0F17', 'rgba(255, 255, 255, 0.07)');

  ctx.fillStyle = '#64748B';
  ctx.font = '500 15px "JetBrains Mono", monospace';
  ctx.fillText('PROJECTED MATURITY WEALTH', rX + 32, topY + 44);

  const pY = topY + 70;
  const pW = colW - 64;
  drawPanel(ctx, rX + 32, pY, pW, 260, 12, '#0E1420', 'rgba(255, 255, 255, 0.06)');

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '600 76px "JetBrains Mono", monospace';
  ctx.fillText('₹50,45,760', rX + 56, pY + 104);

  ctx.fillStyle = '#10B981';
  ctx.font = '500 20px "JetBrains Mono", monospace';
  ctx.fillText('Compounded gains: ₹32,45,760 (64.3%)', rX + 56, pY + 162);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Invested capital: ₹18,00,000 (35.7%)', rX + 56, pY + 204);

  // Inflection Note Card
  const cY = topY + 362;
  drawPanel(ctx, rX + 32, cY, pW, 394, 12, '#0E1420', 'rgba(255, 255, 255, 0.06)');

  ctx.fillStyle = '#64748B';
  ctx.font = '500 14px "JetBrains Mono", monospace';
  ctx.fillText('COMPOUNDING INFLECTION DYNAMICS', rX + 56, cY + 44);

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '400 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('During the initial 5 years, invested capital accounts', rX + 56, cY + 98);
  ctx.fillText('for over 70% of your total corpus.', rX + 56, cY + 138);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 19px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('By year 15, interest compounding generates over 64% of', rX + 56, cY + 198);
  ctx.fillText('your total net worth automatically.', rX + 56, cY + 238);

  // Footer Metadata
  ctx.fillStyle = '#64748B';
  ctx.font = '400 17px "JetBrains Mono", monospace';
  ctx.fillText('Simulate SIPs, EMIs, and compounding mechanics', 88, 1144);

  renderBottomButton(ctx, w, h, 'Launch simulator');
}

// ─── 11. Smart Revision System (SRS) ─────────────────────────────────────────

function renderSmartReviewDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Memory retention engine', '11',
    'Smart Revision System (SRS)',
    'Spaced repetition flashcards, concept short notes, and instant Socratic doubt clarification.',
    'RETENTION ACTIVE', '#10B981'
  );

  const topY = 252;
  const colW = (w - 176 - 32) / 2;
  const colH = 788;

  // ── LEFT PANE: Spaced Repetition Schedule ──
  drawPanel(ctx, 88, topY, colW, colH, 16, '#0B0F17', 'rgba(255, 255, 255, 0.07)');

  ctx.fillStyle = '#64748B';
  ctx.font = '500 15px "JetBrains Mono", monospace';
  ctx.fillText('SPACED REPETITION SCHEDULE', 120, topY + 44);

  const gY = topY + 70;
  const gW = colW - 64;
  drawPanel(ctx, 120, gY, gW, 680, 12, '#0E1420', 'rgba(255, 255, 255, 0.06)');

  ctx.fillStyle = '#64748B';
  ctx.font = '500 14px "JetBrains Mono", monospace';
  ctx.fillText('EBBINGHAUS DECAY COUNTERMEASURE', 144, gY + 44);

  const intervals = [
    { label: 'Day 1 touch', status: 'Immediate recap after lesson', done: true },
    { label: 'Day 3 touch', status: 'Scenario-based retrieval check', done: true },
    { label: 'Day 7 touch', status: 'Adaptive debiasing drill', done: true },
    { label: 'Day 30 touch', status: 'Permanent memory consolidation', done: false }
  ];

  intervals.forEach((it, idx) => {
    const iy = gY + 80 + idx * 128;
    drawPanel(ctx, 144, iy, gW - 48, 100, 8, '#141A26', 'rgba(255, 255, 255, 0.06)');

    ctx.fillStyle = it.done ? '#10B981' : '#64748B';
    ctx.font = '500 15px "JetBrains Mono", monospace';
    ctx.fillText(it.label, 168, iy + 38);

    ctx.fillStyle = '#F8FAFC';
    ctx.font = '400 17px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(it.status, 168, iy + 72);
  });

  // ── RIGHT PANE: Flashcard Review Queue ──
  const rX = 88 + colW + 32;
  drawPanel(ctx, rX, topY, colW, colH, 16, '#0B0F17', 'rgba(255, 255, 255, 0.07)');

  ctx.fillStyle = '#64748B';
  ctx.font = '500 15px "JetBrains Mono", monospace';
  ctx.fillText('ACTIVE REVISION FLASHCARD', rX + 32, topY + 44);

  const cY = topY + 70;
  const cW = colW - 64;
  drawPanel(ctx, rX + 32, cY, cW, 360, 12, '#0E1420', 'rgba(255, 255, 255, 0.06)');

  ctx.fillStyle = '#64748B';
  ctx.font = '500 14px "JetBrains Mono", monospace';
  ctx.fillText('MODULE 02 FLASHCARD : EXPENSE RATIOS', rX + 56, cY + 44);

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '500 24px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('"Why does a 1% higher expense ratio cost you ~25% of your final wealth over 30 years?"', rX + 56, cY + 104);

  drawPanel(ctx, rX + 56, cY + 228, cW - 48, 64, 8, '#141B28', 'rgba(255, 255, 255, 0.09)');
  ctx.fillStyle = '#CBD5E1';
  ctx.font = '500 17px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Ask Finn for mathematical proof  →', rX + 80, cY + 267);

  // Short Notes Ready Block
  const snY = topY + 462;
  drawPanel(ctx, rX + 32, snY, cW, 288, 12, '#0E1420', 'rgba(255, 255, 255, 0.06)');

  ctx.fillStyle = '#64748B';
  ctx.font = '500 14px "JetBrains Mono", monospace';
  ctx.fillText('SHORT-NOTES REPOSITORY', rX + 56, snY + 44);

  ctx.fillStyle = '#F8FAFC';
  ctx.font = '400 19px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('7 module formula summaries and core definitions', rX + 56, snY + 98);
  ctx.fillText('available anytime directly from your dashboard.', rX + 56, snY + 138);

  // Footer Metadata
  ctx.fillStyle = '#64748B';
  ctx.font = '400 17px "JetBrains Mono", monospace';
  ctx.fillText('Spaced repetition turns theory into permanent instincts', 88, 1144);

  renderBottomButton(ctx, w, h, 'Open revision system');
}

// ─── Master Texture Generator Dispatcher ─────────────────────────────────────

function createFeatureDashboardTexture(projectNumber) {
  if (typeof document === 'undefined') return null;

  // 2320 x 1240: 2X RETINA RESOLUTION FOR CRISP 3D INSTRUMENT DISPLAY
  const canvas = document.createElement('canvas');
  canvas.width = 2320;
  canvas.height = 1240;
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
  texture.anisotropy = 16;
  return texture;
}

// ─── Main 3D Project Display Component ───────────────────────────────────────

export default function ProjectDisplay({ project, position, rotation = [0, 0, 0], isMobile = false }) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef(null);

  // Generate crisp procedural instrument texture
  const texture = useMemo(() => {
    return createFeatureDashboardTexture(project.number || '01');
  }, [project.number]);

  // Card Dimensions (Matching 2320x1240 aspect ratio: 1.87 : 1)
  const cardWidth = isMobile ? 8.2 : 12.8;
  const cardHeight = isMobile ? 4.38 : 6.84;
  const cardRadius = isMobile ? 0.32 : 0.44;

  // Mathematically matching 3D rounded front face geometry
  const frontGeometry = useMemo(() => {
    return createRoundedRectGeometry(cardWidth, cardHeight, cardRadius, 24);
  }, [cardWidth, cardHeight, cardRadius]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      const targetScale = hovered ? 1.015 : 1.0;
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
      {/* 3D Dark Graphite Metallic Beveled Backplate with Depth */}
      <RoundedBox
        args={[cardWidth, cardHeight, 0.16]}
        radius={cardRadius}
        smoothness={16}
        position={[0, 0, -0.08]}
      >
        <meshStandardMaterial
          color="#060910"
          roughness={0.3}
          metalness={0.7}
        />
      </RoundedBox>

      {/* Front Face with Ultra-Crisp 4K Retina Texture and Exact Curved Corners */}
      <mesh geometry={frontGeometry} position={[0, 0, 0.005]}>
        {texture && (
          <meshBasicMaterial
            map={texture}
            toneMapped={false}
            transparent={true}
            alphaTest={0.01}
          />
        )}
      </mesh>
    </group>
  );
}
