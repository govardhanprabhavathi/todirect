"use client";

import React, { useRef, useState, useMemo } from 'react';
import { RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Precision 2D Vector Drawing Primitives ──────────────────────────────────

function drawRoundRect(ctx, x, y, w, h, r, fill = true, stroke = false, strokeColor = '#334155', lineWidth = 2) {
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

function drawGlassPanel(ctx, x, y, w, h, r = 24, bg = 'rgba(15, 23, 42, 0.75)', border = 'rgba(255, 255, 255, 0.08)', borderWidth = 1.5) {
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

// ─── Master 4K Application Frame (2320 x 1240 Retina) ─────────────────────────

function renderCardFrame(ctx, w, h, categoryTag, cardNumber, title, subtitle, statusText = 'ACTIVE', statusColor = '#10B981') {
  // 1. Clear entire canvas (zero alpha outside card boundary)
  ctx.clearRect(0, 0, w, h);

  const cornerRadius = 76;

  // 2. Clip all card rendering strictly to the rounded rectangle
  ctx.save();
  drawRoundRect(ctx, 0, 0, w, h, cornerRadius, false, false);
  ctx.clip();

  // 3. Ultra-deep obsidian sapphire background
  const baseGrad = ctx.createLinearGradient(0, 0, w, h);
  baseGrad.addColorStop(0, '#060B18');
  baseGrad.addColorStop(0.5, '#0A1329');
  baseGrad.addColorStop(1, '#040711');
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, w, h);

  // 4. Diffuse ambient light glow (strictly clipped inside the card)
  const bloomTopRight = ctx.createRadialGradient(w - 240, 120, 20, w - 240, 120, 700);
  bloomTopRight.addColorStop(0, 'rgba(56, 189, 248, 0.18)');
  bloomTopRight.addColorStop(0.5, 'rgba(37, 99, 235, 0.08)');
  bloomTopRight.addColorStop(1, 'transparent');
  ctx.fillStyle = bloomTopRight;
  ctx.fillRect(0, 0, w, h);

  const bloomBottomLeft = ctx.createRadialGradient(280, h - 140, 30, 280, h - 140, 650);
  bloomBottomLeft.addColorStop(0, 'rgba(30, 64, 175, 0.22)');
  bloomBottomLeft.addColorStop(0.6, 'transparent');
  ctx.fillStyle = bloomBottomLeft;
  ctx.fillRect(0, 0, w, h);

  // 5. Flawless double metallic border flush with the card contour
  const borderOffset = 4;
  const bW = w - borderOffset * 2;
  const bH = h - borderOffset * 2;
  const bRadius = cornerRadius - borderOffset;

  const borderGrad = ctx.createLinearGradient(0, 0, w, h);
  borderGrad.addColorStop(0, 'rgba(255, 255, 255, 0.38)');
  borderGrad.addColorStop(0.25, 'rgba(56, 189, 248, 0.5)');
  borderGrad.addColorStop(0.7, 'rgba(37, 99, 235, 0.3)');
  borderGrad.addColorStop(1, 'rgba(255, 255, 255, 0.15)');

  // Outer bezel stroke
  drawRoundRect(ctx, borderOffset, borderOffset, bW, bH, bRadius, false, true, borderGrad, 3.5);

  // Specular inner stroke
  drawRoundRect(ctx, borderOffset + 3, borderOffset + 3, bW - 6, bH - 6, bRadius - 3, false, true, 'rgba(255, 255, 255, 0.08)', 1.5);

  ctx.restore();

  // 6. Clean Mac-style window controls (top left)
  const dotY = 82;
  const dots = [
    { x: 88, color: '#EF4444' },
    { x: 116, color: '#F59E0B' },
    { x: 144, color: '#10B981' }
  ];
  dots.forEach(d => {
    ctx.fillStyle = d.color;
    ctx.beginPath();
    ctx.arc(d.x, dotY, 7, 0, Math.PI * 2);
    ctx.fill();
  });

  // Window Breadcrumb Pill
  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  drawRoundRect(ctx, 184, 60, 280, 44, 22, true, true, 'rgba(255, 255, 255, 0.08)', 1);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText(`TODIRECT • SUITE 0${cardNumber}`, 212, 88);

  // Status Badge (Top Right)
  const pillW = 260;
  const pillH = 44;
  const pillX = w - 88 - pillW;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.8)';
  drawRoundRect(ctx, pillX, 60, pillW, pillH, 22, true, true, 'rgba(255, 255, 255, 0.1)', 1);
  ctx.fillStyle = statusColor;
  ctx.beginPath();
  ctx.arc(pillX + 26, 82, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#F8FAFC';
  ctx.font = '700 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText(statusText, pillX + 46, 88);

  // 7. Header Area: Category Eyebrow, Hero Title & Subtitle
  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText(categoryTag.toUpperCase(), 88, 156);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 52px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText(title, 88, 220);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 24px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText(subtitle, 88, 260);

  // Hairline separator under header
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(88, 286);
  ctx.lineTo(w - 88, 286);
  ctx.stroke();

  // Bottom Footer Divider
  ctx.beginPath();
  ctx.moveTo(88, 1058);
  ctx.lineTo(w - 88, 1058);
  ctx.stroke();
}

function renderBottomButton(ctx, w, h, label = 'Explore Feature →') {
  const btnW = 340;
  const btnH = 68;
  const bx = w - 88 - btnW;
  const by = 1090;

  // Crisp high-contrast action pill
  ctx.fillStyle = '#FFFFFF';
  drawRoundRect(ctx, bx, by, btnW, btnH, 34, true, false);

  ctx.fillStyle = '#060B18';
  ctx.font = '900 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(label, bx + btnW / 2, by + 42);
  ctx.textAlign = 'left';
}

// ─── 01. AI Financial Avatar (Finn Socratic Coach) ───────────────────────────

function renderAvatarDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Socratic Intelligence Companion', '1',
    'Finn — Socratic Financial Avatar',
    'Interactive voice and reasoning coach that de-biases investing decisions with zero stock tips.',
    'Socratic Active', '#10B981'
  );

  const colW = (w - 176 - 40) / 2;
  const topY = 320;
  const colH = 690;

  // ── LEFT COLUMN: Real Chat Interaction Window ──
  drawGlassPanel(ctx, 88, topY, colW, colH, 28, 'rgba(10, 18, 36, 0.75)', 'rgba(255, 255, 255, 0.09)');

  // Window Header Bar
  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('LIVE SOCRATIC CONVERSATION', 128, topY + 54);

  ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
  drawRoundRect(ctx, 88 + colW - 190, topY + 30, 150, 34, 17, true, true, 'rgba(56, 189, 248, 0.3)', 1);
  ctx.fillStyle = '#38BDF8';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('● Voice & Audio', 88 + colW - 172, topY + 52);

  // 1. Learner Query Bubble
  const bW = colW - 80;
  ctx.fillStyle = 'rgba(30, 58, 138, 0.45)';
  drawRoundRect(ctx, 128, topY + 90, bW, 114, 20, true, true, 'rgba(96, 165, 250, 0.25)', 1.5);

  ctx.fillStyle = '#93C5FD';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('YOU  •  10:42 AM', 156, topY + 128);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '500 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('"A private bond scheme is offering 18% guaranteed annual yield.', 156, topY + 162);
  ctx.fillText('Should I put my emergency fund in it?"', 156, topY + 192);

  // 2. Finn AI Response Card
  const fY = topY + 230;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
  drawRoundRect(ctx, 128, fY, bW, 320, 20, true, true, 'rgba(56, 189, 248, 0.35)', 1.5);

  // Finn Avatar Tag
  ctx.fillStyle = '#38BDF8';
  ctx.beginPath();
  ctx.arc(162, fY + 44, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#0F172A';
  ctx.font = '900 14px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('F', 157, fY + 49);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('FINN AI COACH', 186, fY + 48);

  ctx.fillStyle = '#10B981';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('First-Principles Counter-Probe', 346, fY + 48);

  // Socratic Breakdown
  ctx.fillStyle = '#E2E8F0';
  ctx.font = '600 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Where does that 18% cashflow originate?', 156, fY + 98);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('1. The sovereign risk-free rate (RBI benchmark) is ~7.1%.', 156, fY + 140);
  ctx.fillText('2. Any asset offering +10.9% spread without volatility is', 156, fY + 178);
  ctx.fillText('   carrying severe hidden credit risk or lock-in illiquidity.', 156, fY + 214);
  ctx.fillText('3. Emergency funds require zero default risk and instant T+0 exit.', 156, fY + 252);

  ctx.fillStyle = '#38BDF8';
  ctx.font = '700 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('What specific liquid collateral backs their payout promise?', 156, fY + 296);

  // Action Chip
  ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
  drawRoundRect(ctx, 128, topY + 580, bW, 64, 18, true, true, 'rgba(56, 189, 248, 0.3)', 1);
  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('✦ ASK FINN: "WHAT COLLATERAL BACKS THIS SCHEME?" →', 160, topY + 620);

  // ── RIGHT COLUMN: Diagnostic Telemetry & Risk Decomposition ──
  const rX = 88 + colW + 40;
  drawGlassPanel(ctx, rX, topY, colW, colH, 28, 'rgba(10, 18, 36, 0.75)', 'rgba(255, 255, 255, 0.09)');

  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('REAL-TIME RISK & LOGIC AUDIT', rX + 40, topY + 54);

  // 1. Yield Comparison Chart HUD
  const chartY = topY + 90;
  const cW = colW - 80;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  drawRoundRect(ctx, rX + 40, chartY, cW, 230, 20, true, true, 'rgba(255, 255, 255, 0.08)', 1);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('YIELD BENCHMARK DISPERSION', rX + 64, chartY + 44);

  // Bar 1: Safe Sovereign Rate (7.1%)
  ctx.fillStyle = '#E2E8F0';
  ctx.font = '600 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('RBI Sovereign 10Y Benchmark', rX + 64, chartY + 84);
  ctx.fillStyle = '#10B981';
  ctx.fillText('7.1% (Safe)', rX + cW - 130, chartY + 84);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  drawRoundRect(ctx, rX + 64, chartY + 96, cW - 48, 12, 6, true, false);
  ctx.fillStyle = '#10B981';
  drawRoundRect(ctx, rX + 64, chartY + 96, (cW - 48) * 0.39, 12, 6, true, false);

  // Bar 2: Claimed Yield (18.0%)
  ctx.fillStyle = '#E2E8F0';
  ctx.font = '600 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Claimed Scheme Yield', rX + 64, chartY + 144);
  ctx.fillStyle = '#EF4444';
  ctx.fillText('18.0% (Extreme Risk)', rX + cW - 200, chartY + 144);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  drawRoundRect(ctx, rX + 64, chartY + 156, cW - 48, 12, 6, true, false);
  ctx.fillStyle = '#EF4444';
  drawRoundRect(ctx, rX + 64, chartY + 156, (cW - 48) * 1.0, 12, 6, true, false);

  // Alert Tag
  ctx.fillStyle = 'rgba(239, 68, 68, 0.15)';
  drawRoundRect(ctx, rX + 64, chartY + 184, cW - 48, 32, 16, true, false);
  ctx.fillStyle = '#F87171';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('⚠️ UNHEDGED YIELD SPREAD: +10.9% PROBABLE CAPITAL LOSS RISK', rX + 80, chartY + 206);

  // 2. Dual Socratic Guardrail Tiles
  const tY = topY + 346;
  const tileW = (cW - 20) / 2;

  // Tile 1
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  drawRoundRect(ctx, rX + 40, tY, tileW, 140, 20, true, true, 'rgba(56, 189, 248, 0.2)', 1);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('STOCK TIPS GIVEN', rX + 64, tY + 44);
  ctx.fillStyle = '#10B981';
  ctx.font = '900 48px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('0.00', rX + 64, tY + 104);
  ctx.fillStyle = '#64748B';
  ctx.font = '600 14px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('100% Socratic Education', rX + 64, tY + 126);

  // Tile 2
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  drawRoundRect(ctx, rX + 40 + tileW + 20, tY, tileW, 140, 20, true, true, 'rgba(56, 189, 248, 0.2)', 1);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('SOCRATIC FIDELITY', rX + 64 + tileW + 20, tY + 44);
  ctx.fillStyle = '#38BDF8';
  ctx.font = '900 48px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('99.8%', rX + 64 + tileW + 20, tY + 104);
  ctx.fillStyle = '#64748B';
  ctx.font = '600 14px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('SEBI Pedagogical Standard', rX + 64 + tileW + 20, tY + 126);

  // 3. Biases Interrogated Checklist
  const ckY = topY + 510;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  drawRoundRect(ctx, rX + 40, ckY, cW, 134, 20, true, true, 'rgba(255, 255, 255, 0.08)', 1);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('COGNITIVE BIASES FLAGGED IN REAL TIME', rX + 64, ckY + 38);

  const tags = [
    '✓ Greed / Guaranteed Yield Illusion',
    '✓ Emergency Fund Misallocation Trap',
    '✓ Credit Default Illiquidity Blindspot'
  ];
  tags.forEach((tag, idx) => {
    ctx.fillStyle = '#34D399';
    ctx.font = '600 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(tag, rX + 64, ckY + 70 + idx * 26);
  });

  // Footer Metadata
  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Engineered with Socratic inquiry to foster independent investor judgment.', 88, 1134);

  renderBottomButton(ctx, w, h, 'Chat With Finn AI →');
}

// ─── 02. Personal Learning Dashboard ──────────────────────────────────────────

function renderDashboardDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Cockpit & Telemetry', '2',
    'Personal Learning Dashboard',
    'Comprehensive syllabus roadmap, real-time mastery metrics, and daily consistency streaks.',
    'Synced Live', '#38BDF8'
  );

  const topY = 320;

  // ── Top Row: 3 Luxury Metric Tiles ──
  const kpiW = (w - 176 - 48) / 3;
  const kpiH = 290;

  // Tile 1: Syllabus Mastery
  drawGlassPanel(ctx, 88, topY, kpiW, kpiH, 24, 'rgba(10, 18, 36, 0.8)', 'rgba(56, 189, 248, 0.25)');
  ctx.fillStyle = '#93C5FD';
  ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('SYLLABUS MASTERY', 124, topY + 54);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 84px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('68%', 124, topY + 150);

  ctx.fillStyle = '#38BDF8';
  ctx.font = '600 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('19 of 28 Modules Mastered', 124, topY + 196);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
  drawRoundRect(ctx, 124, topY + 224, kpiW - 72, 14, 7, true, false);
  ctx.fillStyle = '#38BDF8';
  drawRoundRect(ctx, 124, topY + 224, (kpiW - 72) * 0.68, 14, 7, true, false);

  // Tile 2: Study Consistency
  const k2X = 88 + kpiW + 24;
  drawGlassPanel(ctx, k2X, topY, kpiW, kpiH, 24, 'rgba(10, 18, 36, 0.8)', 'rgba(245, 158, 11, 0.25)');
  ctx.fillStyle = '#FDE68A';
  ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('DAILY STUDY CONSISTENCY', k2X + 36, topY + 54);

  ctx.fillStyle = '#F59E0B';
  ctx.font = '900 84px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('14 DAYS', k2X + 36, topY + 150);

  ctx.fillStyle = '#FCD34D';
  ctx.font = '600 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('🔥 Top 5% Cohort Learning Discipline', k2X + 36, topY + 196);

  // Day indicators (M T W T F S S)
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const dayStep = (kpiW - 72) / 7;
  days.forEach((day, idx) => {
    const dx = k2X + 36 + idx * dayStep;
    ctx.fillStyle = 'rgba(245, 158, 11, 0.25)';
    drawRoundRect(ctx, dx, topY + 224, dayStep - 8, 28, 6, true, false);
    ctx.fillStyle = '#FDE68A';
    ctx.font = '700 14px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(day, dx + (dayStep - 8) / 2 - 6, topY + 244);
  });

  // Tile 3: Retention Stability
  const k3X = k2X + kpiW + 24;
  drawGlassPanel(ctx, k3X, topY, kpiW, kpiH, 24, 'rgba(10, 18, 36, 0.8)', 'rgba(16, 185, 129, 0.25)');
  ctx.fillStyle = '#6EE7B7';
  ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('RETENTION STABILITY INDEX', k3X + 36, topY + 54);

  ctx.fillStyle = '#10B981';
  ctx.font = '900 84px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('92%', k3X + 36, topY + 150);

  ctx.fillStyle = '#A7F3D0';
  ctx.font = '600 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Verified via Adaptive Retention Drills', k3X + 36, topY + 196);

  ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
  drawRoundRect(ctx, k3X + 36, topY + 224, kpiW - 72, 34, 17, true, false);
  ctx.fillStyle = '#34D399';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('● Ebbinghaus Decay Protected', k3X + 56, topY + 246);

  // ── Bottom Section: Active Queue & Weak Spot Focus ──
  const activeY = 640;
  const activeW = w - 176;
  drawGlassPanel(ctx, 88, activeY, activeW, 370, 28, 'rgba(10, 18, 36, 0.85)', 'rgba(255, 255, 255, 0.09)');

  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('ACTIVE LEARNING QUEUE // NEXT MODULE READY', 132, activeY + 54);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 38px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Module 03: The Physics of Compound Interest & Inflation Erosion', 132, activeY + 114);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Deconstruct how the Rule of 72 computes doubling periods and why inflation functions as a hidden tax.', 132, activeY + 160);
  ctx.fillText('Estimated completion: 8 minutes • Includes 3 interactive debiasing scenarios with Finn AI.', 132, activeY + 196);

  // Action pills
  ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
  drawRoundRect(ctx, 132, activeY + 240, 240, 56, 28, true, true, '#38BDF8', 1.5);
  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('▶ RESUME LESSON', 168, activeY + 276);

  ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
  drawRoundRect(ctx, 396, activeY + 240, 320, 56, 28, true, true, 'rgba(255, 255, 255, 0.1)', 1);
  ctx.fillStyle = '#CBD5E1';
  ctx.font = '700 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('REVIEW PREVIOUS CHEAT SHEET', 424, activeY + 276);

  // Right side focus area box
  const focW = 540;
  const focX = activeW + 88 - focW - 44;
  drawGlassPanel(ctx, focX, activeY + 36, focW, 296, 20, 'rgba(15, 23, 42, 0.9)', 'rgba(56, 189, 248, 0.2)');

  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 16px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('TARGETED REVISION FOCUS', focX + 32, activeY + 76);

  const focalTopics = [
    { title: 'Inflation Drag on Fixed Deposits', status: '82% Clarity', color: '#F59E0B' },
    { title: 'Expense Ratio Compounding Cost', status: 'Needs Review', color: '#EF4444' },
    { title: 'Emergency Fund Sizing Rules', status: 'Mastered', color: '#10B981' }
  ];
  focalTopics.forEach((t, idx) => {
    const ty = activeY + 116 + idx * 64;
    ctx.fillStyle = '#E2E8F0';
    ctx.font = '600 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(t.title, focX + 32, ty);

    ctx.fillStyle = t.color;
    ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(t.status, focX + focW - 160, ty);
  });

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Personalized daily roadmap adapting dynamically to your concept clarity.', 88, 1134);

  renderBottomButton(ctx, w, h, 'Open Dashboard →');
}

// ─── 03. Virtual ₹10,000 Sandbox ─────────────────────────────────────────────

function renderSandboxDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Zero-Risk Trading Terminal', '3',
    'Virtual ₹10,000 Practice Sandbox',
    'Simulate realistic asset allocation across equity index ETFs, sovereign gold, and liquid cash.',
    'Portfolio Balanced', '#10B981'
  );

  const topY = 320;
  const totalW = w - 176;

  // ── Hero Portfolio Header Card ──
  drawGlassPanel(ctx, 88, topY, totalW, 200, 26, 'rgba(10, 18, 36, 0.85)', 'rgba(56, 189, 248, 0.25)');

  ctx.fillStyle = '#93C5FD';
  ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('SIMULATED PORTFOLIO VALUATION', 132, topY + 54);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 86px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('₹10,480.00', 132, topY + 148);

  // Profit Pill
  ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
  drawRoundRect(ctx, 720, topY + 86, 290, 60, 30, true, true, '#10B981', 1.5);
  ctx.fillStyle = '#34D399';
  ctx.font = '900 24px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('+4.80% PROFIT (+₹480)', 750, topY + 124);

  // Meta stats
  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Cash Buffer Available: ₹2,000.00 (20.0%)', 1060, topY + 110);
  ctx.fillText('Initial Capital Seed: ₹10,000.00', 1060, topY + 140);

  // ── Multi-Asset Allocation Ribbon ──
  const barY = 550;
  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('ASSET ALLOCATION SPECTRUM (EQUITY 50%  •  GOLD 30%  •  LIQUID CASH 20%)', 88, barY - 16);

  const w1 = totalW * 0.5;
  const w2 = totalW * 0.3;
  const w3 = totalW * 0.2;

  ctx.fillStyle = '#3B82F6';
  drawRoundRect(ctx, 88, barY, w1 - 4, 20, 8, true, false);
  ctx.fillStyle = '#F59E0B';
  drawRoundRect(ctx, 88 + w1, barY, w2 - 4, 20, 8, true, false);
  ctx.fillStyle = '#10B981';
  drawRoundRect(ctx, 88 + w1 + w2, barY, w3, 20, 8, true, false);

  // ── 3 Active Holding Position Cards ──
  const holdY = 604;
  const holdW = (totalW - 48) / 3;

  const holdings = [
    {
      title: 'NIFTY 50 INDEX ETF',
      sub: 'Equity Growth Core (50%)',
      amount: '₹5,000.00',
      pnl: '+3.4% (₹170)',
      pnlColor: '#34D399',
      rationale: 'Validated Long-term Broad Market Beta'
    },
    {
      title: 'SOVEREIGN GOLD ETF',
      sub: 'Inflation Hedge (30%)',
      amount: '₹3,000.00',
      pnl: '+2.1% (₹63)',
      pnlColor: '#FBBF24',
      rationale: 'Hedge against rupee purchasing power erosion'
    },
    {
      title: 'OVERNIGHT LIQUID FUND',
      sub: 'Emergency Dry Powder (20%)',
      amount: '₹2,000.00',
      pnl: '+0.7% (₹14)',
      pnlColor: '#60A5FA',
      rationale: 'Zero volatility instant liquidity reserve'
    }
  ];

  holdings.forEach((hld, idx) => {
    const hx = 88 + idx * (holdW + 24);
    drawGlassPanel(ctx, hx, holdY, holdW, 400, 24, 'rgba(10, 18, 36, 0.85)', 'rgba(255, 255, 255, 0.08)');

    ctx.fillStyle = '#94A3B8';
    ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(hld.title, hx + 36, holdY + 54);

    ctx.fillStyle = '#64748B';
    ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(hld.sub, hx + 36, holdY + 84);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 48px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(hld.amount, hx + 36, holdY + 160);

    ctx.fillStyle = hld.pnlColor;
    ctx.font = '800 24px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(`${hld.pnl} Return`, hx + 36, holdY + 214);

    // Rationale tag
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    drawRoundRect(ctx, hx + 36, holdY + 258, holdW - 72, 80, 16, true, true, 'rgba(255, 255, 255, 0.08)', 1);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '700 14px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText('MANDATORY TRADE RATIONALE:', hx + 54, holdY + 292);

    ctx.fillStyle = '#E2E8F0';
    ctx.font = '500 16px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(hld.rationale, hx + 54, holdY + 322);
  });

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Mandatory investment rationale required before executing every virtual trade.', 88, 1134);

  renderBottomButton(ctx, w, h, 'Launch Sandbox →');
}

// ─── 04. Quizzes & Gamified Drills ───────────────────────────────────────────

function renderQuizzesDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Socratic Diagnostic Engine', '4',
    'Adaptive Quizzes & Debiasing Drills',
    'Interactive scenario problems that interrogate cognitive biases and reward first-principles reasoning.',
    'Adaptive Active', '#A855F7'
  );

  const topY = 320;
  const boxW = w - 176;

  // ── Scenario Question Box ──
  drawGlassPanel(ctx, 88, topY, boxW, 160, 24, 'rgba(10, 18, 36, 0.85)', 'rgba(168, 85, 247, 0.3)');

  ctx.fillStyle = '#C084FC';
  ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('SCENARIO 04 OF 10  •  PURCHASING POWER EROSION', 132, topY + 50);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 28px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('You lock ₹1,00,000 into a fixed deposit yielding 5.0% annual interest while inflation runs at 7.0%.', 132, topY + 98);
  ctx.fillText('After 3 years, what has actually happened to your purchasing power?', 132, topY + 134);

  // ── Option A (The Trap) ──
  const o1Y = 510;
  drawGlassPanel(ctx, 88, o1Y, boxW, 130, 20, 'rgba(239, 68, 68, 0.1)', 'rgba(239, 68, 68, 0.4)');

  ctx.fillStyle = '#FCA5A5';
  ctx.font = '600 24px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('A) My wealth has grown because 5% annual compound interest produces guaranteed positive rupees.', 132, o1Y + 54);

  ctx.fillStyle = 'rgba(239, 68, 68, 0.25)';
  drawRoundRect(ctx, 132, o1Y + 76, 380, 36, 18, true, false);
  ctx.fillStyle = '#EF4444';
  ctx.font = '800 16px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('✕ COGNITIVE TRAP: MONEY ILLUSION BIAS', 152, o1Y + 100);

  // ── Option B (The Verified Answer) ──
  const o2Y = 664;
  drawGlassPanel(ctx, 88, o2Y, boxW, 130, 20, 'rgba(16, 185, 129, 0.15)', 'rgba(16, 185, 129, 0.6)');

  ctx.fillStyle = '#6EE7B7';
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('B) My purchasing power has eroded by ~2% annually. Real Return = 5% Nominal - 7% Inflation.', 132, o2Y + 54);

  ctx.fillStyle = 'rgba(16, 185, 129, 0.25)';
  drawRoundRect(ctx, 132, o2Y + 76, 360, 36, 18, true, false);
  ctx.fillStyle = '#10B981';
  ctx.font = '800 16px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('✓ VERIFIED FIRST-PRINCIPLES (+50 XP)', 152, o2Y + 100);

  // ── Streak Ribbon ──
  const sY = 820;
  drawGlassPanel(ctx, 88, sY, boxW, 170, 24, 'rgba(10, 18, 36, 0.85)', 'rgba(255, 255, 255, 0.08)');

  ctx.fillStyle = '#F59E0B';
  ctx.font = '900 28px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('🔥 7-DAY SOCRATIC STREAK  •  2.5X XP MULTIPLIER ACTIVE', 132, sY + 62);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Answering correctly triggers an AI follow-up probe verifying your reasoning, preventing rote guessing.', 132, sY + 106);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Every answer requires you to state your investment premise before confirmation.', 88, 1134);

  renderBottomButton(ctx, w, h, 'Take Diagnostic Drill →');
}

// ─── 05. Paper Company Analysis ──────────────────────────────────────────────

function renderPaperCompanyDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Institutional Teardown', '5',
    'Paper Company Forensic Analysis',
    'Deconstruct financial statements, cashflow quality, and balance sheet moats without Wall Street jargon.',
    'Dossier Loaded', '#38BDF8'
  );

  const topY = 320;
  const colW = (w - 176 - 40) / 2;
  const colH = 690;

  // ── LEFT COLUMN: 4 Financial Health Ratios ──
  drawGlassPanel(ctx, 88, topY, colW, colH, 28, 'rgba(10, 18, 36, 0.75)', 'rgba(255, 255, 255, 0.09)');

  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('EQUITY DOSSIER: APEX CONSUMER BRANDS LTD (NSE: APEX)', 128, topY + 54);

  const ratios = [
    { label: 'PRICE TO EARNINGS (P/E)', val: '16.4x', note: 'Sector Average: 24.2x (32% Discount)', color: '#34D399' },
    { label: 'RETURN ON EQUITY (ROE)', val: '24.8%', note: 'High capital productivity and reinvestment moat', color: '#38BDF8' },
    { label: 'DEBT TO EQUITY RATIO', val: '0.14', note: 'Virtually debt-free balance sheet (Low Solvency Risk)', color: '#34D399' },
    { label: 'FREE CASH FLOW (FCF)', val: '₹840 Cr', note: 'Operating cash conversion is 96% of net income', color: '#FBBF24' }
  ];

  const rGridW = (colW - 96) / 2;
  ratios.forEach((r, idx) => {
    const rx = 128 + (idx % 2) * (rGridW + 24);
    const ry = topY + 96 + Math.floor(idx / 2) * 260;

    drawGlassPanel(ctx, rx, ry, rGridW, 230, 20, 'rgba(15, 23, 42, 0.85)', 'rgba(255, 255, 255, 0.08)');

    ctx.fillStyle = '#94A3B8';
    ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(r.label, rx + 24, ry + 44);

    ctx.fillStyle = r.color;
    ctx.font = '900 48px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(r.val, rx + 24, ry + 116);

    ctx.fillStyle = '#CBD5E1';
    ctx.font = '500 16px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(r.note, rx + 24, ry + 168);
  });

  // ── RIGHT COLUMN: AI Forensic Auditor Stamp ──
  const rX = 88 + colW + 40;
  drawGlassPanel(ctx, rX, topY, colW, colH, 28, 'rgba(10, 18, 36, 0.75)', 'rgba(255, 255, 255, 0.09)');

  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('AI FORENSIC QUALITY OF EARNINGS REPORT', rX + 40, topY + 54);

  // Grade Stamp Card
  const gY = topY + 90;
  const gW = colW - 80;
  drawGlassPanel(ctx, rX + 40, gY, gW, 200, 20, 'rgba(15, 23, 42, 0.9)', 'rgba(16, 185, 129, 0.4)');

  ctx.fillStyle = '#10B981';
  ctx.font = '900 84px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('GRADE A+', rX + 72, gY + 110);

  ctx.fillStyle = '#93C5FD';
  ctx.font = '700 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('High Quality Earnings Verdict', rX + 72, gY + 154);

  // Auditor Checklist
  const aY = topY + 316;
  drawGlassPanel(ctx, rX + 40, aY, gW, 330, 20, 'rgba(15, 23, 42, 0.9)', 'rgba(255, 255, 255, 0.08)');

  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('FORENSIC AUDITOR VERIFICATION CHECKLIST', rX + 68, aY + 44);

  const checks = [
    { title: 'Zero Aggressive Revenue Recognition', desc: 'Receivable days steady at 28 days (Industry: 45 days)', ok: true },
    { title: 'Working Capital Health', desc: 'Operating cash fully funds capital expenditures', ok: true },
    { title: 'Promoter Share Pledging', desc: '0.00% shares pledged as collateral', ok: true },
    { title: 'Related-Party Transactions', desc: 'Clean unconflicted governance disclosures', ok: true }
  ];

  checks.forEach((c, idx) => {
    const cy = aY + 86 + idx * 56;
    ctx.fillStyle = '#34D399';
    ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText('✓', rX + 68, cy);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(c.title, rX + 96, cy);

    ctx.fillStyle = '#64748B';
    ctx.font = '500 14px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(c.desc, rX + 96, cy + 20);
  });

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Learn to audit actual 10-K balance sheets without needing an MBA.', 88, 1134);

  renderBottomButton(ctx, w, h, 'Analyze Paper Dossier →');
}

// ─── 06. Jargon-Free Financial Topics ─────────────────────────────────────────

function renderSimpleTopicsDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Plain English Pedagogy', '6',
    'Jargon-Free Financial Topics',
    'Complex Wall Street vocabulary translated into clean, intuitive real-world mental models.',
    'Zero Jargon', '#F59E0B'
  );

  const topY = 320;
  const colW = (w - 176 - 40) / 2;
  const colH = 690;

  // ── LEFT COLUMN: Wall Street vs Plain English Translation Matrix ──
  drawGlassPanel(ctx, 88, topY, colW, colH, 28, 'rgba(10, 18, 36, 0.75)', 'rgba(255, 255, 255, 0.09)');

  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('WALL STREET TRANSLATION MATRIX', 128, topY + 54);

  const pairs = [
    {
      jargon: 'Alpha Generation',
      trans: 'Beating the average market index through repeatable skill rather than pure gambling luck.'
    },
    {
      jargon: 'Liquidity Risk',
      trans: 'Needing your money right now, but having it trapped in an illiquid asset that takes months to cash out.'
    },
    {
      jargon: 'Expense Ratio Compounding',
      trans: 'The silent 1% annual fee that secretly cuts away 25% of your final wealth over a 30-year investing horizon.'
    }
  ];

  pairs.forEach((p, idx) => {
    const py = topY + 90 + idx * 186;
    drawGlassPanel(ctx, 128, py, colW - 80, 160, 20, 'rgba(15, 23, 42, 0.85)', 'rgba(255, 255, 255, 0.08)');

    ctx.fillStyle = '#EF4444';
    ctx.font = '800 16px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(`WALL STREET TERM // ${p.jargon.toUpperCase()}`, 156, py + 42);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '600 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(`Plain English: "${p.trans}"`, 156, py + 86);
  });

  // ── RIGHT COLUMN: Intuitive Mental Model Graphic (Rule of 72) ──
  const rX = 88 + colW + 40;
  drawGlassPanel(ctx, rX, topY, colW, colH, 28, 'rgba(10, 18, 36, 0.75)', 'rgba(255, 255, 255, 0.09)');

  ctx.fillStyle = '#F59E0B';
  ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('MENTAL MODEL SPOTLIGHT: THE RULE OF 72', rX + 40, topY + 54);

  const mY = topY + 90;
  const mW = colW - 80;
  drawGlassPanel(ctx, rX + 40, mY, mW, 280, 24, 'rgba(15, 23, 42, 0.9)', 'rgba(245, 158, 11, 0.3)');

  ctx.fillStyle = '#FDE68A';
  ctx.font = '800 24px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Years to Double = 72 ÷ Annual Return (%)', rX + 68, mY + 60);

  ctx.fillStyle = '#CBD5E1';
  ctx.font = '500 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Calculate exponential compounding in your head in seconds:', rX + 68, mY + 110);
  ctx.fillText('• At 6% Return: 72 ÷ 6 = 12 Years to double your money', rX + 68, mY + 154);
  ctx.fillText('• At 12% Return: 72 ÷ 12 = 6 Years to double your money', rX + 68, mY + 196);
  ctx.fillText('• At 18% Hype: Claims 4 years (Look for hidden hazard!)', rX + 68, mY + 238);

  // Bottom Takeaway Card
  const bY = topY + 396;
  drawGlassPanel(ctx, rX + 40, bY, mW, 250, 24, 'rgba(15, 23, 42, 0.9)', 'rgba(56, 189, 248, 0.2)');

  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('THE TODIRECT PROMISE', rX + 68, bY + 54);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '500 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Every finance concept is explained through visual physics,', rX + 68, bY + 104);
  ctx.fillText('practical analogies, and real-world math anyone can calculate', rX + 68, bY + 144);
  ctx.fillText('on a napkin without prior background.', rX + 68, bY + 184);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('No academic jargon. Pure first-principles financial mechanics.', 88, 1134);

  renderBottomButton(ctx, w, h, 'Explore 7-Topic Syllabus →');
}

// ─── 07. Understanding Where You Stand (Baseline Diagnostic) ──────────────────

function renderBaselineDiagnosticDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Entry Calibration', '7',
    'Understanding Where You Stand',
    '5-minute adaptive calibration upon signup that charts your cognitive blindspots and customized roadmap.',
    'Calibrated', '#10B981'
  );

  const topY = 320;
  const colW = (w - 176 - 40) / 2;
  const colH = 690;

  // ── LEFT COLUMN: Diagnostic Literacy Score ──
  drawGlassPanel(ctx, 88, topY, colW, colH, 28, 'rgba(10, 18, 36, 0.75)', 'rgba(255, 255, 255, 0.09)');

  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('BASELINE FINANCIAL LITERACY INDEX', 128, topY + 54);

  // Big Score Circle
  const sW = colW - 80;
  drawGlassPanel(ctx, 128, topY + 90, sW, 340, 24, 'rgba(15, 23, 42, 0.9)', 'rgba(56, 189, 248, 0.3)');

  ctx.fillStyle = '#10B981';
  ctx.font = '900 110px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('84 / 100', 168, topY + 230);

  ctx.fillStyle = 'rgba(16, 185, 129, 0.2)';
  drawRoundRect(ctx, 168, topY + 266, 310, 48, 24, true, false);
  ctx.fillStyle = '#34D399';
  ctx.font = '800 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('TOP 8% OF NEW ENTRANTS', 196, topY + 298);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Strong mental grasp of compounding math.', 168, topY + 360);
  ctx.fillText('Vulnerable to illiquidity and unhedged bond yields.', 168, topY + 392);

  // Customized Path Recommendation
  drawGlassPanel(ctx, 128, topY + 456, sW, 190, 20, 'rgba(15, 23, 42, 0.9)', 'rgba(255, 255, 255, 0.08)');
  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 16px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('RECOMMENDED ENROLLMENT PATH', 156, topY + 498);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Skip Beginner Basics ➔ Start at Module 03', 156, topY + 542);
  ctx.fillStyle = '#64748B';
  ctx.font = '500 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Saves you 2.5 hours of repetitive introductory theory.', 156, topY + 584);

  // ── RIGHT COLUMN: Competency Breakdown Progress Meters ──
  const rX = 88 + colW + 40;
  drawGlassPanel(ctx, rX, topY, colW, colH, 28, 'rgba(10, 18, 36, 0.75)', 'rgba(255, 255, 255, 0.09)');

  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('COMPETENCY BREAKDOWN RADAR', rX + 40, topY + 54);

  const skills = [
    { name: 'Compound Interest & Exponential Math', pct: 96, tier: 'Advanced' },
    { name: 'Asset Allocation & Diversification', pct: 88, tier: 'Proficient' },
    { name: 'Inflation Drag & Real Purchasing Power', pct: 82, tier: 'Proficient' },
    { name: 'Risk vs Volatility Discrimination', pct: 70, tier: 'Needs Review' }
  ];

  skills.forEach((sk, idx) => {
    const sy = topY + 90 + idx * 136;
    drawGlassPanel(ctx, rX + 40, sy, colW - 80, 116, 20, 'rgba(15, 23, 42, 0.85)', 'rgba(255, 255, 255, 0.08)');

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(sk.name, rX + 68, sy + 44);

    ctx.fillStyle = sk.pct >= 85 ? '#34D399' : sk.pct >= 75 ? '#38BDF8' : '#F59E0B';
    ctx.font = '800 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(`${sk.pct}%  (${sk.tier})`, rX + colW - 240, sy + 44);

    // Progress bar
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    drawRoundRect(ctx, rX + 68, sy + 68, colW - 136, 12, 6, true, false);

    ctx.fillStyle = sk.pct >= 85 ? '#10B981' : sk.pct >= 75 ? '#38BDF8' : '#F59E0B';
    drawRoundRect(ctx, rX + 68, sy + 68, (colW - 136) * (sk.pct / 100), 12, 6, true, false);
  });

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Calibrate your baseline in 5 minutes without feeling intimidated.', 88, 1134);

  renderBottomButton(ctx, w, h, 'Start Baseline Diagnostic →');
}

// ─── 08. Badges & Verified Certificates ──────────────────────────────────────

function renderBadgesCertificateDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Verified Credentials', '8',
    'Badges & Cryptographic Certificates',
    'Earn verifiable credentials that prove practical financial literacy on your resume and LinkedIn.',
    'Verified On-Chain', '#F59E0B'
  );

  const topY = 320;
  const colW = (w - 176 - 40) / 2;
  const colH = 690;

  // ── LEFT COLUMN: Luxury Plaque Digital Certificate ──
  drawGlassPanel(ctx, 88, topY, colW, colH, 28, 'rgba(10, 18, 36, 0.75)', 'rgba(245, 158, 11, 0.3)');

  ctx.fillStyle = '#F59E0B';
  ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('CERTIFICATE OF PRACTICAL FINANCIAL MASTERY', 128, topY + 54);

  // Digital Plaque
  const pY = topY + 90;
  const pW = colW - 80;
  drawGlassPanel(ctx, 128, pY, pW, 460, 24, 'rgba(15, 23, 42, 0.95)', 'rgba(245, 158, 11, 0.5)');

  ctx.fillStyle = '#FDE68A';
  ctx.font = '900 36px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('TODIRECT ACCREDITATION', 168, pY + 80);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 26px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Foundational Capital Allocation & Risk Management', 168, pY + 140);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Issued to candidate upon verifying 100% Socratic drill fidelity,', 168, pY + 200);
  ctx.fillText('completing the ₹10,000 sandbox portfolio, and auditing paper companies.', 168, pY + 236);

  ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
  drawRoundRect(ctx, 168, pY + 286, pW - 80, 70, 16, true, true, 'rgba(245, 158, 11, 0.4)', 1);
  ctx.fillStyle = '#FCD34D';
  ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('SERIAL HASH: TOD-CERT-2026-9842-X7', 196, pY + 330);

  // ── RIGHT COLUMN: 3 Achievement Tier Badges ──
  const rX = 88 + colW + 40;
  drawGlassPanel(ctx, rX, topY, colW, colH, 28, 'rgba(10, 18, 36, 0.75)', 'rgba(255, 255, 255, 0.09)');

  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('UNLOCKED MILESTONE BADGES', rX + 40, topY + 54);

  const badges = [
    { name: 'Liquid Sentinel', icon: '🛡️', desc: 'Maintained 20% liquid cash buffer throughout 6 simulated market cycles.' },
    { name: 'Debiasing Champion', icon: '🎯', desc: 'Identified and rejected 25 cognitive trap scenarios with Finn AI.' },
    { name: 'Compound Strategist', icon: '⚡', desc: 'Successfully mapped a 30-year SIP with inflation drag calculations.' }
  ];

  badges.forEach((b, idx) => {
    const by = topY + 90 + idx * 186;
    drawGlassPanel(ctx, rX + 40, by, colW - 80, 160, 20, 'rgba(15, 23, 42, 0.85)', 'rgba(255, 255, 255, 0.08)');

    ctx.font = '40px -apple-system';
    ctx.fillText(b.icon, rX + 68, by + 68);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '800 24px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(b.name, rX + 130, by + 56);

    ctx.fillStyle = '#94A3B8';
    ctx.font = '500 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(b.desc, rX + 130, by + 100);
  });

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Cryptographically verifiable credentials linkable directly to your profile.', 88, 1134);

  renderBottomButton(ctx, w, h, 'View All Badges →');
}

// ─── 09. Live Sessions & Masterclasses ───────────────────────────────────────

function renderLiveSessionsDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Live Cohort Broadcast', '9',
    'Interactive Weekend Masterclasses',
    '200-minute interactive live streams with industry research analysts dissecting live market mechanics.',
    'Broadcast Live', '#EF4444'
  );

  const topY = 320;
  const colW = (w - 176 - 40) / 2;
  const colH = 690;

  // ── LEFT COLUMN: Active Live Broadcast Tile ──
  drawGlassPanel(ctx, 88, topY, colW, colH, 28, 'rgba(10, 18, 36, 0.75)', 'rgba(239, 68, 68, 0.3)');

  // Live Pill
  ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
  drawRoundRect(ctx, 128, topY + 40, 150, 40, 20, true, true, '#EF4444', 1.5);
  ctx.fillStyle = '#EF4444';
  ctx.beginPath();
  ctx.arc(150, topY + 60, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 16px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('LIVE NOW', 168, topY + 66);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 36px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Forensic Balance Sheet Teardown', 128, topY + 130);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('How institutional investors spot hidden credit risk before earnings.', 128, topY + 172);

  // Stats Card
  const stY = topY + 220;
  const stW = colW - 80;
  drawGlassPanel(ctx, 128, stY, stW, 200, 20, 'rgba(15, 23, 42, 0.9)', 'rgba(255, 255, 255, 0.08)');

  ctx.fillStyle = '#38BDF8';
  ctx.font = '900 52px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('1,420', 160, stY + 80);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Active Learners in Stream', 160, stY + 120);

  ctx.fillStyle = '#10B981';
  ctx.font = '900 52px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('2h 40m', 160 + stW / 2, stY + 80);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Deep-Dive Duration', 160 + stW / 2, stY + 120);

  // ── RIGHT COLUMN: Student Live Q&A Feed ──
  const rX = 88 + colW + 40;
  drawGlassPanel(ctx, rX, topY, colW, colH, 28, 'rgba(10, 18, 36, 0.75)', 'rgba(255, 255, 255, 0.09)');

  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('REAL-TIME STUDENT Q&A STREAM', rX + 40, topY + 54);

  const qs = [
    {
      q: 'How do we distinguish between goodwill impairments and real asset writedowns?',
      a: 'Mentor: Look at footnote 14 in the notes to accounts to evaluate cash-generating units.'
    },
    {
      q: 'Can a company show positive net profit while burning cash?',
      a: 'Mentor: Yes! That is why we track Operating Cash Flow rather than accounting PAT.'
    }
  ];

  qs.forEach((item, idx) => {
    const qy = topY + 90 + idx * 240;
    drawGlassPanel(ctx, rX + 40, qy, colW - 80, 210, 20, 'rgba(15, 23, 42, 0.85)', 'rgba(255, 255, 255, 0.08)');

    ctx.fillStyle = '#93C5FD';
    ctx.font = '700 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(`Q: "${item.q}"`, rX + 68, qy + 48);

    ctx.fillStyle = '#34D399';
    ctx.font = '600 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(item.a, rX + 68, qy + 114);
  });

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Interactive masterclasses every weekend with mentor Q&A.', 88, 1134);

  renderBottomButton(ctx, w, h, 'Join Masterclass →');
}

// ─── 10. Financial Playground & Calculators ───────────────────────────────────

function renderPlaygroundDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Simulation Engine', '10',
    'Financial Playground & Calculators',
    'Tactile scenario simulators for SIP compound growth, EMI amortization, and inflation erosion.',
    'Simulator Active', '#38BDF8'
  );

  const topY = 320;
  const colW = (w - 176 - 40) / 2;
  const colH = 690;

  // ── LEFT COLUMN: Interactive Parameter Inputs ──
  drawGlassPanel(ctx, 88, topY, colW, colH, 28, 'rgba(10, 18, 36, 0.75)', 'rgba(255, 255, 255, 0.09)');

  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('COMPOUND SIP PARAMETERS', 128, topY + 54);

  const sliders = [
    { label: 'MONTHLY SIP CONTRIBUTION', val: '₹10,000 / month', sub: 'Baseline capital allocation' },
    { label: 'INVESTMENT HORIZON', val: '15 Years (180 Months)', sub: 'Allows compound engine to accelerate' },
    { label: 'EXPECTED CAGR (EQUITY INDEX)', val: '12.0% Annualized', sub: 'Historical Nifty 50 rolling average' }
  ];

  sliders.forEach((sl, idx) => {
    const sy = topY + 90 + idx * 186;
    drawGlassPanel(ctx, 128, sy, colW - 80, 160, 20, 'rgba(15, 23, 42, 0.85)', 'rgba(255, 255, 255, 0.08)');

    ctx.fillStyle = '#94A3B8';
    ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(sl.label, 156, sy + 44);

    ctx.fillStyle = '#38BDF8';
    ctx.font = '900 36px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(sl.val, 156, sy + 94);

    // Simulated slider track
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    drawRoundRect(ctx, 156, sy + 120, colW - 136, 8, 4, true, false);
    ctx.fillStyle = '#38BDF8';
    drawRoundRect(ctx, 156, sy + 120, (colW - 136) * 0.65, 8, 4, true, false);
  });

  // ── RIGHT COLUMN: Projected Wealth Outcome ──
  const rX = 88 + colW + 40;
  drawGlassPanel(ctx, rX, topY, colW, colH, 28, 'rgba(10, 18, 36, 0.75)', 'rgba(255, 255, 255, 0.09)');

  ctx.fillStyle = '#10B981';
  ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('PROJECTED MATURITY WEALTH', rX + 40, topY + 54);

  const pY = topY + 90;
  const pW = colW - 80;
  drawGlassPanel(ctx, rX + 40, pY, pW, 260, 24, 'rgba(15, 23, 42, 0.9)', 'rgba(16, 185, 129, 0.3)');

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 84px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('₹50,45,760', rX + 68, pY + 110);

  ctx.fillStyle = '#34D399';
  ctx.font = '700 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Compounded Wealth Generated: ₹32,45,760 (64.3%)', rX + 68, pY + 168);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Your Total Invested Capital: ₹18,00,000 (35.7%)', rX + 68, pY + 210);

  // Exponential Compounding Curve Callout
  const cY = topY + 380;
  drawGlassPanel(ctx, rX + 40, cY, pW, 260, 24, 'rgba(15, 23, 42, 0.9)', 'rgba(255, 255, 255, 0.08)');

  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('THE COMPOUND INFLECTION EFFECT', rX + 68, cY + 54);

  ctx.fillStyle = '#CBD5E1';
  ctx.font = '500 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Over the first 5 years, invested capital accounts for 70% of', rX + 68, cY + 104);
  ctx.fillText('your corpus. By year 15, interest generates over 64% of', rX + 68, cY + 144);
  ctx.fillText('your total net worth automatically.', rX + 68, cY + 184);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Simulate SIPs, EMIs, and dividend compounding with zero guesswork.', 88, 1134);

  renderBottomButton(ctx, w, h, 'Launch Simulator →');
}

// ─── 11. Smart Revision System (SRS) ─────────────────────────────────────────

function renderSmartReviewDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Memory Retention Engine', '11',
    'Smart Revision System (SRS)',
    'Spaced repetition flashcards, concept short notes, and instant Socratic doubt clarification.',
    'Retention Active', '#38BDF8'
  );

  const topY = 320;
  const colW = (w - 176 - 40) / 2;
  const colH = 690;

  // ── LEFT COLUMN: Ebbinghaus Forgetting Curve Graph ──
  drawGlassPanel(ctx, 88, topY, colW, colH, 28, 'rgba(10, 18, 36, 0.75)', 'rgba(255, 255, 255, 0.09)');

  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('EBBINGHAUS RETENTION CURVE OPTIMIZATION', 128, topY + 54);

  const gY = topY + 90;
  const gW = colW - 80;
  drawGlassPanel(ctx, 128, gY, gW, 360, 24, 'rgba(15, 23, 42, 0.9)', 'rgba(56, 189, 248, 0.25)');

  // Curve labels
  ctx.fillStyle = '#EF4444';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('WITHOUT SRS: Dips to 20% in 7 days', 160, gY + 50);

  ctx.fillStyle = '#10B981';
  ctx.font = '800 16px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('WITH TODIRECT SRS: Resets to 100% via Day 1, 3, 7 touches', 160, gY + 84);

  // Interval touch markers
  const intervals = [
    { label: 'Day 1', status: 'Touch 1: Complete' },
    { label: 'Day 3', status: 'Touch 2: Complete' },
    { label: 'Day 7', status: 'Touch 3: Active Today' },
    { label: 'Day 30', status: 'Touch 4: Permanent Memory' }
  ];

  intervals.forEach((it, idx) => {
    const iy = gY + 130 + idx * 52;
    ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
    drawRoundRect(ctx, 160, iy, gW - 64, 40, 12, true, false);

    ctx.fillStyle = '#38BDF8';
    ctx.font = '800 16px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(it.label, 180, iy + 26);

    ctx.fillStyle = '#E2E8F0';
    ctx.font = '600 15px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(it.status, 280, iy + 26);
  });

  // ── RIGHT COLUMN: Active Review Card & Socratic Clarifier ──
  const rX = 88 + colW + 40;
  drawGlassPanel(ctx, rX, topY, colW, colH, 28, 'rgba(10, 18, 36, 0.75)', 'rgba(255, 255, 255, 0.09)');

  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('TODAY\'S FLASHCARD REVISION QUEUE', rX + 40, topY + 54);

  const cY = topY + 90;
  const cW = colW - 80;
  drawGlassPanel(ctx, rX + 40, cY, cW, 300, 24, 'rgba(15, 23, 42, 0.9)', 'rgba(255, 255, 255, 0.08)');

  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('MODULE 02 FLASHCARD: EXPENSE RATIOS', rX + 68, cY + 50);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('"Why does a 1% higher expense ratio cost you ~25% of your final wealth over 30 years?"', rX + 68, cY + 98);

  ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
  drawRoundRect(ctx, rX + 68, cY + 190, cW - 56, 70, 18, true, true, '#38BDF8', 1.5);
  ctx.fillStyle = '#38BDF8';
  ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('✦ ASK FINN FOR MATHEMATICAL PROOF →', rX + 100, cY + 234);

  // Short Notes Available Box
  const snY = topY + 416;
  drawGlassPanel(ctx, rX + 40, snY, cW, 230, 20, 'rgba(15, 23, 42, 0.9)', 'rgba(255, 255, 255, 0.08)');

  ctx.fillStyle = '#34D399';
  ctx.font = '800 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('✓ 7 MODULE SHORT NOTES READY', rX + 68, snY + 50);

  ctx.fillStyle = '#CBD5E1';
  ctx.font = '500 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Access 2-minute formula cheat sheets, mental models, and', rX + 68, snY + 94);
  ctx.fillText('core definitions anytime directly from your dashboard.', rX + 68, snY + 130);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Spaced repetition turns theoretical knowledge into permanent financial instincts.', 88, 1134);

  renderBottomButton(ctx, w, h, 'Open Revision System →');
}

// ─── Master Texture Generator Dispatcher ─────────────────────────────────────

function createFeatureDashboardTexture(projectNumber) {
  if (typeof document === 'undefined') return null;

  // 2320 x 1240: 2X RETINA RESOLUTION FOR ULTRA-CRISP 3D CLARITY
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

  // Generate crisp procedural dashboard canvas texture with blue premium gradients
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
          color="#040b1a"
          roughness={0.2}
          metalness={0.8}
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
