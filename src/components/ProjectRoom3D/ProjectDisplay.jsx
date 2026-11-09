"use client";

import React, { useRef, useState, useMemo } from 'react';
import { RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Precision 2D Vector Drawing Primitives ──────────────────────────────────

function drawRoundRect(ctx, x, y, w, h, r, fill = true, stroke = false, strokeColor = 'rgba(15, 23, 42, 0.1)', lineWidth = 1) {
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

function drawPanel(ctx, x, y, w, h, r = 20, bg = '#F8FAFC', border = 'rgba(15, 23, 42, 0.08)', borderWidth = 1.5) {
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

// ─── High-Impact White Card Frame with Bold Typography (2320 x 1240 Native) ───

function renderCardFrame(ctx, w, h, categoryTag, cardNumber, title, subtitle, statusText = 'ONLINE', statusColor = '#059669') {
  // 1. Clear entire canvas (zero alpha outside boundary)
  ctx.clearRect(0, 0, w, h);

  const cornerRadius = 64;

  // 2. Strict clip boundary
  ctx.save();
  drawRoundRect(ctx, 0, 0, w, h, cornerRadius, false, false);
  ctx.clip();

  // 3. Pristine Pure White Card Background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, w, h);

  // Subtle top highlight border for physical card depth
  const topHairline = ctx.createLinearGradient(0, 0, w, 0);
  topHairline.addColorStop(0, 'rgba(15, 23, 42, 0.02)');
  topHairline.addColorStop(0.5, 'rgba(15, 23, 42, 0.08)');
  topHairline.addColorStop(1, 'rgba(15, 23, 42, 0.02)');
  ctx.fillStyle = topHairline;
  ctx.fillRect(0, 0, w, 4);

  // 4. Clean Graphite Hairline Perimeter Border
  const borderOffset = 4;
  const bW = w - borderOffset * 2;
  const bH = h - borderOffset * 2;
  const bRadius = cornerRadius - borderOffset;
  drawRoundRect(ctx, borderOffset, borderOffset, bW, bH, bRadius, false, true, 'rgba(15, 23, 42, 0.12)', 2);

  ctx.restore();

  // 5. Header Telemetry Bar (Enlarged for 3D distance reading)
  // Left: Monospace Index Notation
  ctx.fillStyle = '#64748B';
  ctx.font = '700 22px "JetBrains Mono", "SF Mono", Menlo, Consolas, monospace';
  ctx.fillText(`INDEX : 0${cardNumber} / 11`, 88, 88);

  ctx.fillStyle = '#CBD5E1';
  ctx.fillText('//', 320, 88);

  ctx.fillStyle = '#0F172A';
  ctx.font = '700 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText(categoryTag, 360, 88);

  // Right: Technical status code
  ctx.fillStyle = statusColor;
  ctx.beginPath();
  ctx.arc(w - 260, 80, 6, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = statusColor;
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.fillText(statusText, w - 240, 88);

  // 6. Massive, High-Impact Bold Black Hero Title
  ctx.fillStyle = '#090D16';
  ctx.font = '900 68px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText(title, 88, 178);

  ctx.fillStyle = '#334155';
  ctx.font = '600 28px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText(subtitle, 88, 226);

  // Clean hairline divider under header
  ctx.strokeStyle = 'rgba(15, 23, 42, 0.08)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(88, 260);
  ctx.lineTo(w - 88, 260);
  ctx.stroke();

  // Bottom hairline divider
  ctx.beginPath();
  ctx.moveTo(88, 1060);
  ctx.lineTo(w - 88, 1060);
  ctx.stroke();
}

function renderBottomButton(ctx, w, h, label = 'Explore module') {
  const btnW = 360;
  const btnH = 68;
  const bx = w - 88 - btnW;
  const by = 1092;

  // Solid Black Bold Action Button (Enlarged & Prominent)
  ctx.fillStyle = '#090D16';
  drawRoundRect(ctx, bx, by, btnW, btnH, 14, true, false);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(`${label}  →`, bx + btnW / 2, by + 42);
  ctx.textAlign = 'left';
}

// ─── 01. AI Financial Avatar (Finn Socratic Coach) ───────────────────────────

function renderAvatarDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Socratic reasoning companion', '1',
    'Finn — Socratic Financial Avatar',
    'Real-time interactive dialogue that probes high-yield claims with first-principles logic.',
    'ACTIVE DIALOGUE', '#059669'
  );

  const colW = (w - 176 - 48) / 2;
  const topY = 296;
  const colH = 724;

  // ── LEFT PANE: Socratic Dialogue Stream ──
  drawPanel(ctx, 88, topY, colW, colH, 20, '#F8FAFC', 'rgba(15, 23, 42, 0.08)');

  // Student Query Box
  const bW = colW - 64;
  drawPanel(ctx, 120, topY + 40, bW, 180, 16, '#FFFFFF', 'rgba(15, 23, 42, 0.1)');

  ctx.fillStyle = '#64748B';
  ctx.font = '700 18px "JetBrains Mono", monospace';
  ctx.fillText('STUDENT INQUIRY', 152, topY + 84);

  ctx.fillStyle = '#090D16';
  ctx.font = '600 28px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('"A private fund promises 18% guaranteed yield.', 152, topY + 132);
  ctx.fillText('Should I park my emergency savings here?"', 152, topY + 172);

  // Finn AI Response Box
  const fY = topY + 252;
  drawPanel(ctx, 120, fY, bW, 432, 16, '#FFFFFF', 'rgba(15, 23, 42, 0.1)');

  ctx.fillStyle = '#059669';
  ctx.font = '700 18px "JetBrains Mono", monospace';
  ctx.fillText('FINN AI  //  SOCRATIC COUNTER-PROBE', 152, fY + 54);

  ctx.fillStyle = '#090D16';
  ctx.font = '800 34px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Where does that 18% cashflow originate?', 152, fY + 112);

  ctx.fillStyle = '#334155';
  ctx.font = '600 24px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('• Sovereign 10Y benchmark is ~7.1% risk-free.', 152, fY + 176);
  ctx.fillText('• An unhedged +10.9% spread carries unpriced default risk.', 152, fY + 224);
  ctx.fillText('• Emergency savings demand zero loss risk and T+0 liquidity.', 152, fY + 272);

  ctx.fillStyle = '#090D16';
  ctx.font = '700 26px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('What specific liquid collateral secures your principal?', 152, fY + 346);

  // ── RIGHT PANE: Yield Telemetry & Guardrail HUD ──
  const rX = 88 + colW + 48;
  drawPanel(ctx, rX, topY, colW, colH, 20, '#F8FAFC', 'rgba(15, 23, 42, 0.08)');

  // Yield Comparison Header
  ctx.fillStyle = '#64748B';
  ctx.font = '700 18px "JetBrains Mono", monospace';
  ctx.fillText('YIELD BENCHMARK DISPERSION AUDIT', rX + 40, topY + 54);

  // Bar 1: Safe Sovereign Rate (7.1%)
  const chartY = topY + 90;
  const cW = colW - 80;
  drawPanel(ctx, rX + 40, chartY, cW, 250, 16, '#FFFFFF', 'rgba(15, 23, 42, 0.1)');

  ctx.fillStyle = '#334155';
  ctx.font = '700 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Sovereign 10Y Benchmark (Risk-Free)', rX + 68, chartY + 54);
  ctx.fillStyle = '#059669';
  ctx.font = '800 24px "JetBrains Mono", monospace';
  ctx.fillText('7.10%', rX + cW - 88, chartY + 54);

  ctx.fillStyle = '#E2E8F0';
  drawRoundRect(ctx, rX + 68, chartY + 74, cW - 56, 16, 8, true, false);
  ctx.fillStyle = '#059669';
  drawRoundRect(ctx, rX + 68, chartY + 74, (cW - 56) * 0.394, 16, 8, true, false);

  // Bar 2: Claimed Yield (18.0%)
  ctx.fillStyle = '#334155';
  ctx.font = '700 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Claimed Scheme Yield', rX + 68, chartY + 140);
  ctx.fillStyle = '#DC2626';
  ctx.font = '800 24px "JetBrains Mono", monospace';
  ctx.fillText('18.00%', rX + cW - 100, chartY + 140);

  ctx.fillStyle = '#E2E8F0';
  drawRoundRect(ctx, rX + 68, chartY + 160, cW - 56, 16, 8, true, false);
  ctx.fillStyle = '#DC2626';
  drawRoundRect(ctx, rX + 68, chartY + 160, cW - 56, 16, 8, true, false);

  // Spread Tag
  drawPanel(ctx, rX + 68, chartY + 194, cW - 56, 44, 8, '#FEF2F2', 'rgba(220, 38, 38, 0.2)');
  ctx.fillStyle = '#B91C1C';
  ctx.font = '700 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Spread: +10.90% Unhedged Credit Default Risk', rX + 92, chartY + 224);

  // Dual Large Telemetry Tiles
  const tY = topY + 372;
  const tileW = (cW - 24) / 2;

  drawPanel(ctx, rX + 40, tY, tileW, 310, 16, '#FFFFFF', 'rgba(15, 23, 42, 0.1)');
  ctx.fillStyle = '#64748B';
  ctx.font = '700 18px "JetBrains Mono", monospace';
  ctx.fillText('TIPS GIVEN', rX + 68, tY + 54);
  ctx.fillStyle = '#059669';
  ctx.font = '900 84px "JetBrains Mono", monospace';
  ctx.fillText('0.00', rX + 68, tY + 160);
  ctx.fillStyle = '#475569';
  ctx.font = '700 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Strictly Socratic pedagogy', rX + 68, tY + 214);
  ctx.font = '500 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Zero speculative stock picks', rX + 68, tY + 248);

  drawPanel(ctx, rX + 40 + tileW + 24, tY, tileW, 310, 16, '#FFFFFF', 'rgba(15, 23, 42, 0.1)');
  ctx.fillStyle = '#64748B';
  ctx.font = '700 18px "JetBrains Mono", monospace';
  ctx.fillText('SOCRATIC FIDELITY', rX + 68 + tileW + 24, tY + 54);
  ctx.fillStyle = '#090D16';
  ctx.font = '900 84px "JetBrains Mono", monospace';
  ctx.fillText('99.8%', rX + 68 + tileW + 24, tY + 160);
  ctx.fillStyle = '#475569';
  ctx.font = '700 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('SEBI Aligned Framework', rX + 68 + tileW + 24, tY + 214);
  ctx.font = '500 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('De-biasing mental models', rX + 68 + tileW + 24, tY + 248);

  // Footer Metadata
  ctx.fillStyle = '#64748B';
  ctx.font = '600 20px "JetBrains Mono", monospace';
  ctx.fillText('Standard: SEBI Investor Education & Protection Fund guidelines', 88, 1136);

  renderBottomButton(ctx, w, h, 'Chat with Finn AI');
}

// ─── 02. Personal Learning Dashboard ──────────────────────────────────────────

function renderDashboardDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Telemetry & mastery tracking', '2',
    'Personal Learning Dashboard',
    'Real-time syllabus progression, daily consistency tracking, and concept retention stability.',
    'SYNCED LIVE', '#059669'
  );

  const topY = 296;

  // ── Top Row: 3 Massive Metric Cards ──
  const kpiW = (w - 176 - 48) / 3;
  const kpiH = 340;

  // Card 1: Syllabus Mastery
  drawPanel(ctx, 88, topY, kpiW, kpiH, 20, '#F8FAFC', 'rgba(15, 23, 42, 0.08)');
  ctx.fillStyle = '#64748B';
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.fillText('SYLLABUS MASTERY', 124, topY + 54);

  ctx.fillStyle = '#090D16';
  ctx.font = '900 104px "JetBrains Mono", monospace';
  ctx.fillText('68%', 124, topY + 170);

  ctx.fillStyle = '#334155';
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('19 of 28 Modules Mastered', 124, topY + 230);

  ctx.fillStyle = '#E2E8F0';
  drawRoundRect(ctx, 124, topY + 264, kpiW - 72, 16, 8, true, false);
  ctx.fillStyle = '#2563EB';
  drawRoundRect(ctx, 124, topY + 264, (kpiW - 72) * 0.68, 16, 8, true, false);

  // Card 2: Study Consistency
  const k2X = 88 + kpiW + 24;
  drawPanel(ctx, k2X, topY, kpiW, kpiH, 20, '#F8FAFC', 'rgba(15, 23, 42, 0.08)');
  ctx.fillStyle = '#64748B';
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.fillText('DAILY CONSISTENCY', k2X + 36, topY + 54);

  ctx.fillStyle = '#090D16';
  ctx.font = '900 104px "JetBrains Mono", monospace';
  ctx.fillText('14d', k2X + 36, topY + 170);

  ctx.fillStyle = '#334155';
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Top 5% Cohort Discipline', k2X + 36, topY + 230);

  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const dayStep = (kpiW - 72) / 7;
  days.forEach((day, idx) => {
    const dx = k2X + 36 + idx * dayStep;
    ctx.fillStyle = idx < 5 ? '#090D16' : '#CBD5E1';
    drawRoundRect(ctx, dx, topY + 264, dayStep - 8, 32, 6, true, false);
    ctx.fillStyle = idx < 5 ? '#FFFFFF' : '#475569';
    ctx.font = '700 16px "JetBrains Mono", monospace';
    ctx.fillText(day, dx + (dayStep - 8) / 2 - 5, topY + 286);
  });

  // Card 3: Concept Retention
  const k3X = k2X + kpiW + 24;
  drawPanel(ctx, k3X, topY, kpiW, kpiH, 20, '#F8FAFC', 'rgba(15, 23, 42, 0.08)');
  ctx.fillStyle = '#64748B';
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.fillText('RETENTION STABILITY', k3X + 36, topY + 54);

  ctx.fillStyle = '#059669';
  ctx.font = '900 104px "JetBrains Mono", monospace';
  ctx.fillText('92%', k3X + 36, topY + 170);

  ctx.fillStyle = '#334155';
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Verified via Adaptive Drills', k3X + 36, topY + 230);

  ctx.fillStyle = '#ECFDF5';
  drawRoundRect(ctx, k3X + 36, topY + 264, kpiW - 72, 34, 8, true, false);
  ctx.fillStyle = '#059669';
  ctx.font = '700 16px "JetBrains Mono", monospace';
  ctx.fillText('✓ EBBINGHAUS DECAY PROTECTED', k3X + 54, topY + 287);

  // ── Bottom Section: Active Queue Banner ──
  const activeY = topY + 380;
  const activeW = w - 176;
  drawPanel(ctx, 88, activeY, activeW, 340, 20, '#F8FAFC', 'rgba(15, 23, 42, 0.08)');

  ctx.fillStyle = '#64748B';
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.fillText('ACTIVE LEARNING QUEUE  //  UP NEXT', 132, activeY + 58);

  ctx.fillStyle = '#090D16';
  ctx.font = '800 42px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Module 03 — The Physics of Compound Interest & Inflation Drag', 132, activeY + 128);

  ctx.fillStyle = '#334155';
  ctx.font = '600 26px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Deconstruct how the Rule of 72 computes doubling periods and why inflation functions as a hidden tax.', 132, activeY + 182);
  ctx.fillText('Duration: 8 minutes • Includes 3 interactive debiasing scenarios with Finn AI.', 132, activeY + 224);

  drawPanel(ctx, 132, activeY + 260, 320, 56, 12, '#090D16', '#090D16');
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Resume Topic 03.1  →', 168, activeY + 296);

  // Footer Metadata
  ctx.fillStyle = '#64748B';
  ctx.font = '600 20px "JetBrains Mono", monospace';
  ctx.fillText('Cohort 2026 • Verified concept path', 88, 1136);

  renderBottomButton(ctx, w, h, 'Open dashboard');
}

// ─── 03. Virtual ₹10,000 Sandbox ─────────────────────────────────────────────

function renderSandboxDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Simulation terminal', '3',
    'Virtual ₹10,000 Practice Sandbox',
    'Simulate realistic portfolio allocation across equity index ETFs, sovereign gold, and liquid cash.',
    'PORTFOLIO BALANCED', '#059669'
  );

  const topY = 296;
  const totalW = w - 176;

  // ── Hero Valuation Card ──
  drawPanel(ctx, 88, topY, totalW, 220, 20, '#F8FAFC', 'rgba(15, 23, 42, 0.08)');

  ctx.fillStyle = '#64748B';
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.fillText('TOTAL SIMULATED PORTFOLIO VALUE', 132, topY + 54);

  ctx.fillStyle = '#090D16';
  ctx.font = '900 96px "JetBrains Mono", monospace';
  ctx.fillText('₹10,480.00', 132, topY + 160);

  ctx.fillStyle = '#059669';
  ctx.font = '800 32px "JetBrains Mono", monospace';
  ctx.fillText('+4.80% PROFIT (+₹480.00)', 760, topY + 140);

  ctx.fillStyle = '#334155';
  ctx.font = '700 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Cash Buffer Available: ₹2,000.00 (20.0%) | Initial Capital: ₹10,000', 1320, topY + 140);

  // ── Bold Allocation Spectrum Bar ──
  const barY = topY + 264;
  ctx.fillStyle = '#64748B';
  ctx.font = '700 18px "JetBrains Mono", monospace';
  ctx.fillText('PRUDENT ASSET ALLOCATION (EQUITY 50%  •  GOLD 30%  •  LIQUID CASH 20%)', 88, barY + 14);

  const w1 = totalW * 0.5;
  const w2 = totalW * 0.3;
  const w3 = totalW * 0.2;

  ctx.fillStyle = '#2563EB';
  drawRoundRect(ctx, 88, barY + 32, w1 - 6, 20, 6, true, false);
  ctx.fillStyle = '#D97706';
  drawRoundRect(ctx, 88 + w1, barY + 32, w2 - 6, 20, 6, true, false);
  ctx.fillStyle = '#059669';
  drawRoundRect(ctx, 88 + w1 + w2, barY + 32, w3, 20, 6, true, false);

  // ── 3 Active Holding Cards (Large & Prominent) ──
  const holdY = barY + 84;
  const holdW = (totalW - 48) / 3;

  const holdings = [
    {
      title: 'NIFTY 50 INDEX ETF',
      sub: 'Equity Growth Core (50%)',
      amount: '₹5,000.00',
      pnl: '+3.4% Return',
      rationale: 'Broad-market index beta with verified low tracking error'
    },
    {
      title: 'SOVEREIGN GOLD ETF',
      sub: 'Inflation Hedge (30%)',
      amount: '₹3,000.00',
      pnl: '+2.1% Return',
      rationale: 'Long-term rupee purchasing power hedge against inflation'
    },
    {
      title: 'OVERNIGHT LIQUID FUND',
      sub: 'Emergency Buffer (20%)',
      amount: '₹2,000.00',
      pnl: '+0.7% Return',
      rationale: 'Instant T+0 capital preservation buffer for market dips'
    }
  ];

  holdings.forEach((hld, idx) => {
    const hx = 88 + idx * (holdW + 24);
    drawPanel(ctx, hx, holdY, holdW, 356, 18, '#F8FAFC', 'rgba(15, 23, 42, 0.08)');

    ctx.fillStyle = '#090D16';
    ctx.font = '800 24px "JetBrains Mono", monospace';
    ctx.fillText(hld.title, hx + 36, holdY + 54);

    ctx.fillStyle = '#64748B';
    ctx.font = '600 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(hld.sub, hx + 36, holdY + 90);

    ctx.fillStyle = '#090D16';
    ctx.font = '900 58px "JetBrains Mono", monospace';
    ctx.fillText(hld.amount, hx + 36, holdY + 172);

    ctx.fillStyle = '#059669';
    ctx.font = '800 26px "JetBrains Mono", monospace';
    ctx.fillText(hld.pnl, hx + 36, holdY + 224);

    drawPanel(ctx, hx + 36, holdY + 256, holdW - 72, 70, 10, '#FFFFFF', 'rgba(15, 23, 42, 0.1)');
    ctx.fillStyle = '#334155';
    ctx.font = '600 18px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(hld.rationale, hx + 54, holdY + 298);
  });

  // Footer Metadata
  ctx.fillStyle = '#64748B';
  ctx.font = '600 20px "JetBrains Mono", monospace';
  ctx.fillText('100% Risk-Free Simulation • Mandatory investment rationale before every trade', 88, 1136);

  renderBottomButton(ctx, w, h, 'Launch sandbox');
}

// ─── 04. Quizzes & Gamified Drills ───────────────────────────────────────────

function renderQuizzesDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Adaptive diagnostic engine', '4',
    'Adaptive Quizzes & Debiasing Drills',
    'Scenario challenges that test concept comprehension and interrogate cognitive biases before awarding XP.',
    'ADAPTIVE ACTIVE', '#059669'
  );

  const topY = 296;
  const boxW = w - 176;

  // Scenario Question Box
  drawPanel(ctx, 88, topY, boxW, 200, 20, '#F8FAFC', 'rgba(15, 23, 42, 0.08)');

  ctx.fillStyle = '#64748B';
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.fillText('SCENARIO 04 OF 10 // PURCHASING POWER EROSION', 132, topY + 54);

  ctx.fillStyle = '#090D16';
  ctx.font = '800 34px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('You lock ₹1,00,000 into a fixed deposit yielding 5.0% annual interest while inflation runs at 7.0%.', 132, topY + 114);
  ctx.fillText('After 3 years, what has happened to your real purchasing power?', 132, topY + 160);

  // Option A (The Trap)
  const o1Y = topY + 236;
  drawPanel(ctx, 88, o1Y, boxW, 148, 16, '#FEF2F2', 'rgba(220, 38, 38, 0.3)');

  ctx.fillStyle = '#991B1B';
  ctx.font = '700 26px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('A) My wealth has grown because 5% annual interest produces guaranteed positive rupees.', 132, o1Y + 58);

  ctx.fillStyle = '#DC2626';
  ctx.font = '800 20px "JetBrains Mono", monospace';
  ctx.fillText('✕ COGNITIVE TRAP: MONEY ILLUSION BIAS', 132, o1Y + 108);

  // Option B (The Verified Answer)
  const o2Y = o1Y + 176;
  drawPanel(ctx, 88, o2Y, boxW, 148, 16, '#ECFDF5', 'rgba(5, 150, 105, 0.3)');

  ctx.fillStyle = '#065F46';
  ctx.font = '800 26px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('B) My purchasing power has declined by ~2% annually. Real Return = 5% Nominal - 7% Inflation.', 132, o2Y + 58);

  ctx.fillStyle = '#059669';
  ctx.font = '800 20px "JetBrains Mono", monospace';
  ctx.fillText('✓ VERIFIED FIRST PRINCIPLES (+50 XP)', 132, o2Y + 108);

  // Socratic Follow-Up Probe
  const sY = o2Y + 176;
  drawPanel(ctx, 88, sY, boxW, 164, 16, '#F8FAFC', 'rgba(15, 23, 42, 0.08)');

  ctx.fillStyle = '#090D16';
  ctx.font = '800 26px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Socratic Reasoning Verification:', 132, sY + 54);

  ctx.fillStyle = '#334155';
  ctx.font = '600 24px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Every answer requires you to state your investment premise before submission to prevent rote guessing.', 132, sY + 104);

  // Footer Metadata
  ctx.fillStyle = '#64748B';
  ctx.font = '600 20px "JetBrains Mono", monospace';
  ctx.fillText('Adaptive drill calibration • Socratic follow-up active', 88, 1136);

  renderBottomButton(ctx, w, h, 'Take diagnostic drill');
}

// ─── 05. Paper Company Analysis ──────────────────────────────────────────────

function renderPaperCompanyDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Institutional teardown', '5',
    'Paper Company Forensic Analysis',
    'Deconstruct corporate statements, cashflow quality, and balance sheet moats without Wall Street jargon.',
    'DOSSIER LOADED', '#059669'
  );

  const topY = 296;
  const colW = (w - 176 - 48) / 2;
  const colH = 724;

  // ── LEFT PANE: 4 Financial Health Ratios (Massive Numbers) ──
  drawPanel(ctx, 88, topY, colW, colH, 20, '#F8FAFC', 'rgba(15, 23, 42, 0.08)');

  ctx.fillStyle = '#64748B';
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.fillText('DOSSIER: APEX CONSUMER BRANDS LTD [NSE : APEX]', 132, topY + 54);

  const ratios = [
    { label: 'PRICE TO EARNINGS (P/E)', val: '16.4x', note: 'Sector median: 24.2x (32% discount)' },
    { label: 'RETURN ON EQUITY (ROE)', val: '24.8%', note: 'High capital productivity and moat' },
    { label: 'DEBT TO EQUITY RATIO', val: '0.14', note: 'Virtually debt-free balance sheet' },
    { label: 'FREE CASH FLOW (FCF)', val: '₹840 Cr', note: 'Operating cash conversion is 96%' }
  ];

  const rGridW = (colW - 64 - 24) / 2;
  ratios.forEach((r, idx) => {
    const rx = 120 + (idx % 2) * (rGridW + 24);
    const ry = topY + 90 + Math.floor(idx / 2) * 290;

    drawPanel(ctx, rx, ry, rGridW, 260, 16, '#FFFFFF', 'rgba(15, 23, 42, 0.1)');

    ctx.fillStyle = '#64748B';
    ctx.font = '700 18px "JetBrains Mono", monospace';
    ctx.fillText(r.label, rx + 32, ry + 50);

    ctx.fillStyle = '#090D16';
    ctx.font = '900 68px "JetBrains Mono", monospace';
    ctx.fillText(r.val, rx + 32, ry + 144);

    ctx.fillStyle = '#334155';
    ctx.font = '600 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(r.note, rx + 32, ry + 204);
  });

  // ── RIGHT PANE: Forensic Quality Verdict ──
  const rX = 88 + colW + 48;
  drawPanel(ctx, rX, topY, colW, colH, 20, '#F8FAFC', 'rgba(15, 23, 42, 0.08)');

  // Grade Card (Huge & Commanding)
  drawPanel(ctx, rX + 40, topY + 40, colW - 80, 240, 16, '#FFFFFF', 'rgba(15, 23, 42, 0.1)');
  ctx.fillStyle = '#059669';
  ctx.font = '900 96px "JetBrains Mono", monospace';
  ctx.fillText('GRADE A+', rX + 72, topY + 150);

  ctx.fillStyle = '#334155';
  ctx.font = '700 26px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('High Earnings Quality Verdict', rX + 72, topY + 210);

  // Checklist
  const ckY = topY + 310;
  drawPanel(ctx, rX + 40, ckY, colW - 80, 370, 16, '#FFFFFF', 'rgba(15, 23, 42, 0.1)');

  ctx.fillStyle = '#64748B';
  ctx.font = '700 18px "JetBrains Mono", monospace';
  ctx.fillText('FORENSIC AUDITOR VERIFICATION', rX + 72, ckY + 54);

  const checks = [
    '✓ Receivable days steady at 28 days (No channel stuffing)',
    '✓ Operating cash fully funds all capital expenditure',
    '✓ 0.00% promoter share pledging as collateral',
    '✓ Clean unconflicted related-party governance'
  ];

  checks.forEach((c, idx) => {
    ctx.fillStyle = '#090D16';
    ctx.font = '700 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(c, rX + 72, ckY + 116 + idx * 64);
  });

  // Footer Metadata
  ctx.fillStyle = '#64748B';
  ctx.font = '600 20px "JetBrains Mono", monospace';
  ctx.fillText('Deconstructing annual reports without financial jargon', 88, 1136);

  renderBottomButton(ctx, w, h, 'Analyze paper dossier');
}

// ─── 06. Jargon-Free Financial Topics ─────────────────────────────────────────

function renderSimpleTopicsDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Plain English translation', '6',
    'Jargon-Free Financial Topics',
    'Complex institutional vocabulary translated into clean, intuitive real-world mental models.',
    'ZERO JARGON', '#059669'
  );

  const topY = 296;
  const colW = (w - 176 - 48) / 2;
  const colH = 724;

  // ── LEFT PANE: Large Translation Matrix ──
  drawPanel(ctx, 88, topY, colW, colH, 20, '#F8FAFC', 'rgba(15, 23, 42, 0.08)');

  ctx.fillStyle = '#64748B';
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.fillText('WALL STREET TRANSLATION MATRIX', 132, topY + 54);

  const pairs = [
    {
      jargon: 'ALPHA GENERATION',
      trans: 'Beating the average market index through repeatable skill rather than pure gambling luck.'
    },
    {
      jargon: 'LIQUIDITY RISK',
      trans: 'Needing your money right now, but having it trapped in an illiquid asset that takes months to cash out.'
    },
    {
      jargon: 'EXPENSE RATIO COMPOUNDING',
      trans: 'The silent 1% annual fee that secretly cuts away 25% of your final wealth over a 30-year investing horizon.'
    }
  ];

  pairs.forEach((p, idx) => {
    const py = topY + 84 + idx * 200;
    drawPanel(ctx, 120, py, colW - 64, 176, 16, '#FFFFFF', 'rgba(15, 23, 42, 0.1)');

    ctx.fillStyle = '#64748B';
    ctx.font = '700 18px "JetBrains Mono", monospace';
    ctx.fillText(`WALL STREET TERM : ${p.jargon}`, 152, py + 46);

    ctx.fillStyle = '#090D16';
    ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(`"${p.trans}"`, 152, py + 98);
  });

  // ── RIGHT PANE: Mental Model Spotlight (Large Formula) ──
  const rX = 88 + colW + 48;
  drawPanel(ctx, rX, topY, colW, colH, 20, '#F8FAFC', 'rgba(15, 23, 42, 0.08)');

  ctx.fillStyle = '#64748B';
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.fillText('MENTAL MODEL SPOTLIGHT', rX + 40, topY + 54);

  const mY = topY + 84;
  const mW = colW - 80;
  drawPanel(ctx, rX + 40, mY, mW, 320, 16, '#FFFFFF', 'rgba(15, 23, 42, 0.1)');

  ctx.fillStyle = '#090D16';
  ctx.font = '900 38px "JetBrains Mono", monospace';
  ctx.fillText('Years to Double = 72 ÷ Return (%)', rX + 68, mY + 70);

  ctx.fillStyle = '#334155';
  ctx.font = '600 24px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Calculate exponential compounding in your head in seconds:', rX + 68, mY + 130);
  ctx.fillText('• At 6% return: 72 ÷ 6 = 12 years to double capital', rX + 68, mY + 180);
  ctx.fillText('• At 12% return: 72 ÷ 12 = 6 years to double capital', rX + 68, mY + 228);
  ctx.fillText('• At 18% return: Claims 4 years (Look for hidden default hazard)', rX + 68, mY + 276);

  // Takeaway Card
  const bY = topY + 434;
  drawPanel(ctx, rX + 40, bY, mW, 240, 16, '#FFFFFF', 'rgba(15, 23, 42, 0.1)');

  ctx.fillStyle = '#64748B';
  ctx.font = '700 18px "JetBrains Mono", monospace';
  ctx.fillText('FIRST PRINCIPLES PEDAGOGY', rX + 68, bY + 54);

  ctx.fillStyle = '#090D16';
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Every finance concept is grounded in practical math,', rX + 68, bY + 104);
  ctx.fillText('concrete analogies, and real-world mechanisms that', rX + 68, bY + 144);
  ctx.fillText('anyone can evaluate on a napkin without prior background.', rX + 68, bY + 184);

  // Footer Metadata
  ctx.fillStyle = '#64748B';
  ctx.font = '600 20px "JetBrains Mono", monospace';
  ctx.fillText('Pure first-principles financial mechanics', 88, 1136);

  renderBottomButton(ctx, w, h, 'Explore syllabus');
}

// ─── 07. Understanding Where You Stand (Baseline Diagnostic) ──────────────────

function renderBaselineDiagnosticDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Entry calibration', '7',
    'Understanding Where You Stand',
    '5-minute adaptive calibration upon signup that charts your cognitive blindspots and tailored roadmap.',
    'CALIBRATED', '#059669'
  );

  const topY = 296;
  const colW = (w - 176 - 48) / 2;
  const colH = 724;

  // ── LEFT PANE: Massive Score Tile ──
  drawPanel(ctx, 88, topY, colW, colH, 20, '#F8FAFC', 'rgba(15, 23, 42, 0.08)');

  ctx.fillStyle = '#64748B';
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.fillText('BASELINE LITERACY INDEX', 132, topY + 54);

  const sW = colW - 64;
  drawPanel(ctx, 120, topY + 84, sW, 360, 16, '#FFFFFF', 'rgba(15, 23, 42, 0.1)');

  ctx.fillStyle = '#059669';
  ctx.font = '900 128px "JetBrains Mono", monospace';
  ctx.fillText('84 / 100', 160, topY + 236);

  ctx.fillStyle = '#090D16';
  ctx.font = '800 28px "JetBrains Mono", monospace';
  ctx.fillText('TOP 8% OF COHORT ENTRANTS', 160, topY + 296);

  ctx.fillStyle = '#334155';
  ctx.font = '600 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Strong grasp of compounding math.', 160, topY + 350);
  ctx.fillText('Vulnerable to unhedged bond yields and illiquidity traps.', 160, topY + 386);

  // Recommendation Banner
  drawPanel(ctx, 120, topY + 474, sW, 200, 16, '#FFFFFF', 'rgba(15, 23, 42, 0.1)');
  ctx.fillStyle = '#64748B';
  ctx.font = '700 18px "JetBrains Mono", monospace';
  ctx.fillText('RECOMMENDED CURRICULUM ROUTE', 152, topY + 524);

  ctx.fillStyle = '#090D16';
  ctx.font = '800 28px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Skip beginner theory  →  Begin at Module 03', 152, topY + 580);

  ctx.fillStyle = '#475569';
  ctx.font = '600 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Saves 2.5 hours of repetitive introductory theory.', 152, topY + 624);

  // ── RIGHT PANE: Competency Progress Meters ──
  const rX = 88 + colW + 48;
  drawPanel(ctx, rX, topY, colW, colH, 20, '#F8FAFC', 'rgba(15, 23, 42, 0.08)');

  ctx.fillStyle = '#64748B';
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.fillText('COMPETENCY BREAKDOWN', rX + 40, topY + 54);

  const skills = [
    { name: 'Compound interest & exponential math', pct: 96, tier: 'Advanced' },
    { name: 'Asset allocation & diversification', pct: 88, tier: 'Proficient' },
    { name: 'Inflation drag & purchasing power', pct: 82, tier: 'Proficient' },
    { name: 'Risk vs volatility discrimination', pct: 70, tier: 'Review' }
  ];

  skills.forEach((sk, idx) => {
    const sy = topY + 84 + idx * 148;
    drawPanel(ctx, rX + 40, sy, colW - 80, 128, 16, '#FFFFFF', 'rgba(15, 23, 42, 0.1)');

    ctx.fillStyle = '#090D16';
    ctx.font = '800 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(sk.name, rX + 68, sy + 44);

    ctx.fillStyle = '#64748B';
    ctx.font = '800 20px "JetBrains Mono", monospace';
    ctx.fillText(`${sk.pct}%  [${sk.tier}]`, rX + colW - 220, sy + 44);

    ctx.fillStyle = '#E2E8F0';
    drawRoundRect(ctx, rX + 68, sy + 74, colW - 136, 14, 7, true, false);

    ctx.fillStyle = sk.pct >= 85 ? '#059669' : sk.pct >= 75 ? '#2563EB' : '#D97706';
    drawRoundRect(ctx, rX + 68, sy + 74, (colW - 136) * (sk.pct / 100), 14, 7, true, false);
  });

  // Footer Metadata
  ctx.fillStyle = '#64748B';
  ctx.font = '600 20px "JetBrains Mono", monospace';
  ctx.fillText('Adaptive 5-minute calibration', 88, 1136);

  renderBottomButton(ctx, w, h, 'Start diagnostic');
}

// ─── 08. Badges & Verified Certificates ──────────────────────────────────────

function renderBadgesCertificateDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Verified credentials', '8',
    'Badges & Verifiable Certificates',
    'Verifiable credentials that prove practical financial literacy on your resume and professional profiles.',
    'VERIFIED', '#059669'
  );

  const topY = 296;
  const colW = (w - 176 - 48) / 2;
  const colH = 724;

  // ── LEFT PANE: Digital Certificate Dossier ──
  drawPanel(ctx, 88, topY, colW, colH, 20, '#F8FAFC', 'rgba(15, 23, 42, 0.08)');

  ctx.fillStyle = '#64748B';
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.fillText('CERTIFICATE OF PRACTICAL MASTERY', 132, topY + 54);

  const pY = topY + 84;
  const pW = colW - 64;
  drawPanel(ctx, 120, pY, pW, 580, 16, '#FFFFFF', 'rgba(15, 23, 42, 0.1)');

  ctx.fillStyle = '#64748B';
  ctx.font = '700 18px "JetBrains Mono", monospace';
  ctx.fillText('ISSUER : TODIRECT PEDAGOGICAL ENGINE', 152, pY + 64);

  ctx.fillStyle = '#090D16';
  ctx.font = '900 44px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Foundational Capital Allocation', 152, pY + 144);

  ctx.fillStyle = '#334155';
  ctx.font = '600 24px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Awarded upon verifying 100% Socratic drill fidelity,', 152, pY + 210);
  ctx.fillText('completing the ₹10,000 practice sandbox portfolio,', 152, pY + 254);
  ctx.fillText('and successfully auditing paper company financial statements.', 152, pY + 298);

  // Serial Tag
  drawPanel(ctx, 152, pY + 370, pW - 64, 96, 12, '#F1F5F9', 'rgba(15, 23, 42, 0.12)');
  ctx.fillStyle = '#64748B';
  ctx.font = '700 16px "JetBrains Mono", monospace';
  ctx.fillText('CRYPTOGRAPHIC SERIAL HASH', 184, pY + 412);
  ctx.fillStyle = '#059669';
  ctx.font = '800 24px "JetBrains Mono", monospace';
  ctx.fillText('TOD-CERT-2026-9842-X7', 184, pY + 448);

  // ── RIGHT PANE: Milestone Badges ──
  const rX = 88 + colW + 48;
  drawPanel(ctx, rX, topY, colW, colH, 20, '#F8FAFC', 'rgba(15, 23, 42, 0.08)');

  ctx.fillStyle = '#64748B';
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.fillText('UNLOCKED MILESTONE BADGES', rX + 40, topY + 54);

  const badges = [
    { code: 'B-01', name: 'Liquid Sentinel', desc: 'Maintained 20% liquid cash buffer throughout 6 simulated market cycles' },
    { code: 'B-02', name: 'Debiasing Champion', desc: 'Identified and rejected 25 cognitive trap scenarios with Finn AI' },
    { code: 'B-03', name: 'Compound Strategist', desc: 'Successfully mapped a 30-year SIP with inflation drag calculations' }
  ];

  badges.forEach((b, idx) => {
    const by = topY + 84 + idx * 200;
    drawPanel(ctx, rX + 40, by, colW - 80, 176, 16, '#FFFFFF', 'rgba(15, 23, 42, 0.1)');

    ctx.fillStyle = '#64748B';
    ctx.font = '700 18px "JetBrains Mono", monospace';
    ctx.fillText(b.code, rX + 68, by + 48);

    ctx.fillStyle = '#090D16';
    ctx.font = '800 28px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(b.name, rX + 144, by + 48);

    ctx.fillStyle = '#334155';
    ctx.font = '600 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(b.desc, rX + 68, by + 108);
  });

  // Footer Metadata
  ctx.fillStyle = '#64748B';
  ctx.font = '600 20px "JetBrains Mono", monospace';
  ctx.fillText('Verifiable credentials linkable directly to profile', 88, 1136);

  renderBottomButton(ctx, w, h, 'View credentials');
}

// ─── 09. Live Sessions & Masterclasses ───────────────────────────────────────

function renderLiveSessionsDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Cohort broadcasts', '9',
    'Interactive Weekend Masterclasses',
    '200-minute deep dives with industry research analysts dissecting actual financial statements and corporate filings.',
    'BROADCAST SCHEDULED', '#059669'
  );

  const topY = 296;
  const colW = (w - 176 - 48) / 2;
  const colH = 724;

  // ── LEFT PANE: Broadcast Session Details ──
  drawPanel(ctx, 88, topY, colW, colH, 20, '#F8FAFC', 'rgba(15, 23, 42, 0.08)');

  ctx.fillStyle = '#64748B';
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.fillText('MASTERCLASS SESSION', 132, topY + 54);

  ctx.fillStyle = '#090D16';
  ctx.font = '900 44px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Forensic Balance Sheet Teardown', 132, topY + 130);

  ctx.fillStyle = '#334155';
  ctx.font = '600 26px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('How institutional investors spot hidden credit risk before earnings reports.', 132, topY + 184);

  // Big Stats Block
  const stY = topY + 252;
  const stW = colW - 64;
  drawPanel(ctx, 120, stY, stW, 412, 16, '#FFFFFF', 'rgba(15, 23, 42, 0.1)');

  ctx.fillStyle = '#090D16';
  ctx.font = '900 84px "JetBrains Mono", monospace';
  ctx.fillText('1,420', 160, stY + 130);
  ctx.fillStyle = '#64748B';
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.fillText('ACTIVE ENROLLED LEARNERS', 160, stY + 180);

  ctx.fillStyle = '#090D16';
  ctx.font = '900 84px "JetBrains Mono", monospace';
  ctx.fillText('2h 40m', 160, stY + 290);
  ctx.fillStyle = '#64748B';
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.fillText('TOTAL DEEP-DIVE DURATION', 160, stY + 340);

  // ── RIGHT PANE: Student Q&A Stream ──
  const rX = 88 + colW + 48;
  drawPanel(ctx, rX, topY, colW, colH, 20, '#F8FAFC', 'rgba(15, 23, 42, 0.08)');

  ctx.fillStyle = '#64748B';
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.fillText('LIVE Q&A TRANSCRIPT', rX + 40, topY + 54);

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
    const qy = topY + 84 + idx * 300;
    drawPanel(ctx, rX + 40, qy, colW - 80, 276, 16, '#FFFFFF', 'rgba(15, 23, 42, 0.1)');

    ctx.fillStyle = '#090D16';
    ctx.font = '800 26px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(`Q: "${item.q}"`, rX + 68, qy + 64);

    ctx.fillStyle = '#334155';
    ctx.font = '600 24px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(item.a, rX + 68, qy + 154);
  });

  // Footer Metadata
  ctx.fillStyle = '#64748B';
  ctx.font = '600 20px "JetBrains Mono", monospace';
  ctx.fillText('Interactive weekend masterclasses with mentor Q&A', 88, 1136);

  renderBottomButton(ctx, w, h, 'Join masterclass');
}

// ─── 10. Financial Playground & Calculators ───────────────────────────────────

function renderPlaygroundDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Simulation playground', '10',
    'Financial Playground & Calculators',
    'Tactile scenario simulators for SIP compound growth, EMI amortization, and inflation erosion.',
    'SIMULATOR ACTIVE', '#059669'
  );

  const topY = 296;
  const colW = (w - 176 - 48) / 2;
  const colH = 724;

  // ── LEFT PANE: Input Parameters (Large Font) ──
  drawPanel(ctx, 88, topY, colW, colH, 20, '#F8FAFC', 'rgba(15, 23, 42, 0.08)');

  ctx.fillStyle = '#64748B';
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.fillText('COMPOUND SIP PARAMETERS', 132, topY + 54);

  const sliders = [
    { label: 'MONTHLY SIP CONTRIBUTION', val: '₹10,000 / mo', sub: 'Baseline monthly capital allocation' },
    { label: 'INVESTMENT HORIZON', val: '15 Years (180 mo)', sub: 'Allows compound engine to accelerate' },
    { label: 'EXPECTED CAGR (EQUITY INDEX)', val: '12.0% Annualized', sub: 'Historical Nifty 50 rolling average' }
  ];

  sliders.forEach((sl, idx) => {
    const sy = topY + 84 + idx * 200;
    drawPanel(ctx, 120, sy, colW - 64, 176, 16, '#FFFFFF', 'rgba(15, 23, 42, 0.1)');

    ctx.fillStyle = '#64748B';
    ctx.font = '700 18px "JetBrains Mono", monospace';
    ctx.fillText(sl.label, 152, sy + 44);

    ctx.fillStyle = '#090D16';
    ctx.font = '900 48px "JetBrains Mono", monospace';
    ctx.fillText(sl.val, 152, sy + 104);

    // Track
    ctx.fillStyle = '#E2E8F0';
    drawRoundRect(ctx, 152, sy + 138, colW - 128, 10, 5, true, false);
    ctx.fillStyle = '#2563EB';
    drawRoundRect(ctx, 152, sy + 138, (colW - 128) * 0.65, 10, 5, true, false);
  });

  // ── RIGHT PANE: Maturity Projection (Huge Number) ──
  const rX = 88 + colW + 48;
  drawPanel(ctx, rX, topY, colW, colH, 20, '#F8FAFC', 'rgba(15, 23, 42, 0.08)');

  ctx.fillStyle = '#64748B';
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.fillText('PROJECTED MATURITY WEALTH', rX + 40, topY + 54);

  const pY = topY + 84;
  const pW = colW - 80;
  drawPanel(ctx, rX + 40, pY, pW, 260, 16, '#FFFFFF', 'rgba(15, 23, 42, 0.1)');

  ctx.fillStyle = '#090D16';
  ctx.font = '900 100px "JetBrains Mono", monospace';
  ctx.fillText('₹50,45,760', rX + 68, pY + 128);

  ctx.fillStyle = '#059669';
  ctx.font = '800 26px "JetBrains Mono", monospace';
  ctx.fillText('Compounded gains: ₹32,45,760 (64.3%)', rX + 68, pY + 188);

  ctx.fillStyle = '#475569';
  ctx.font = '600 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Invested capital: ₹18,00,000 (35.7%)', rX + 68, pY + 230);

  // Inflection Note Card
  const cY = topY + 372;
  drawPanel(ctx, rX + 40, cY, pW, 310, 16, '#FFFFFF', 'rgba(15, 23, 42, 0.1)');

  ctx.fillStyle = '#64748B';
  ctx.font = '700 18px "JetBrains Mono", monospace';
  ctx.fillText('COMPOUNDING INFLECTION DYNAMICS', rX + 68, cY + 54);

  ctx.fillStyle = '#090D16';
  ctx.font = '800 28px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('During the initial 5 years, invested capital accounts', rX + 68, cY + 116);
  ctx.fillText('for over 70% of your total corpus.', rX + 68, cY + 160);

  ctx.fillStyle = '#334155';
  ctx.font = '600 24px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('By year 15, interest compounding generates over 64% of', rX + 68, cY + 224);
  ctx.fillText('your total net worth automatically.', rX + 68, cY + 266);

  // Footer Metadata
  ctx.fillStyle = '#64748B';
  ctx.font = '600 20px "JetBrains Mono", monospace';
  ctx.fillText('Simulate SIPs, EMIs, and compounding mechanics', 88, 1136);

  renderBottomButton(ctx, w, h, 'Launch simulator');
}

// ─── 11. Smart Revision System (SRS) ─────────────────────────────────────────

function renderSmartReviewDashboard(ctx, w, h) {
  renderCardFrame(
    ctx, w, h,
    'Memory retention engine', '11',
    'Smart Revision System (SRS)',
    'Spaced repetition flashcards, concept short notes, and instant Socratic doubt clarification.',
    'RETENTION ACTIVE', '#059669'
  );

  const topY = 296;
  const colW = (w - 176 - 48) / 2;
  const colH = 724;

  // ── LEFT PANE: Spaced Repetition Schedule ──
  drawPanel(ctx, 88, topY, colW, colH, 20, '#F8FAFC', 'rgba(15, 23, 42, 0.08)');

  ctx.fillStyle = '#64748B';
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.fillText('SPACED REPETITION SCHEDULE', 132, topY + 54);

  const gY = topY + 84;
  const gW = colW - 64;
  drawPanel(ctx, 120, gY, gW, 600, 16, '#FFFFFF', 'rgba(15, 23, 42, 0.1)');

  ctx.fillStyle = '#64748B';
  ctx.font = '700 18px "JetBrains Mono", monospace';
  ctx.fillText('EBBINGHAUS DECAY COUNTERMEASURE', 152, gY + 54);

  const intervals = [
    { label: 'Day 1 Touch', status: 'Immediate recap after lesson completion' },
    { label: 'Day 3 Touch', status: 'Scenario-based retrieval drill' },
    { label: 'Day 7 Touch', status: 'Adaptive debiasing challenge' },
    { label: 'Day 30 Touch', status: 'Permanent memory consolidation' }
  ];

  intervals.forEach((it, idx) => {
    const iy = gY + 90 + idx * 118;
    drawPanel(ctx, 152, iy, gW - 64, 96, 12, '#F8FAFC', 'rgba(15, 23, 42, 0.08)');

    ctx.fillStyle = '#059669';
    ctx.font = '800 22px "JetBrains Mono", monospace';
    ctx.fillText(it.label, 184, iy + 42);

    ctx.fillStyle = '#090D16';
    ctx.font = '700 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    ctx.fillText(it.status, 184, iy + 76);
  });

  // ── RIGHT PANE: Flashcard Review Queue ──
  const rX = 88 + colW + 48;
  drawPanel(ctx, rX, topY, colW, colH, 20, '#F8FAFC', 'rgba(15, 23, 42, 0.08)');

  ctx.fillStyle = '#64748B';
  ctx.font = '700 20px "JetBrains Mono", monospace';
  ctx.fillText('ACTIVE REVISION FLASHCARD', rX + 40, topY + 54);

  const cY = topY + 84;
  const cW = colW - 80;
  drawPanel(ctx, rX + 40, cY, cW, 360, 16, '#FFFFFF', 'rgba(15, 23, 42, 0.1)');

  ctx.fillStyle = '#64748B';
  ctx.font = '700 18px "JetBrains Mono", monospace';
  ctx.fillText('MODULE 02 FLASHCARD : EXPENSE RATIOS', rX + 68, cY + 54);

  ctx.fillStyle = '#090D16';
  ctx.font = '800 32px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('"Why does a 1% higher expense ratio cost you ~25%', rX + 68, cY + 120);
  ctx.fillText('of your final wealth over 30 years?"', rX + 68, cY + 170);

  drawPanel(ctx, rX + 68, cY + 236, cW - 56, 76, 12, '#090D16', '#090D16');
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 22px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('Ask Finn for mathematical proof  →', rX + 104, cY + 282);

  // Short Notes Ready Block
  const snY = topY + 472;
  drawPanel(ctx, rX + 40, snY, cW, 212, 16, '#FFFFFF', 'rgba(15, 23, 42, 0.1)');

  ctx.fillStyle = '#64748B';
  ctx.font = '700 18px "JetBrains Mono", monospace';
  ctx.fillText('SHORT-NOTES REPOSITORY', rX + 68, snY + 54);

  ctx.fillStyle = '#090D16';
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText('7 module formula summaries and core definitions', rX + 68, snY + 110);
  ctx.fillText('available anytime directly from your dashboard.', rX + 68, snY + 152);

  // Footer Metadata
  ctx.fillStyle = '#64748B';
  ctx.font = '600 20px "JetBrains Mono", monospace';
  ctx.fillText('Spaced repetition turns theory into permanent instincts', 88, 1136);

  renderBottomButton(ctx, w, h, 'Open revision system');
}

// ─── Master Texture Generator Dispatcher ─────────────────────────────────────

function createFeatureDashboardTexture(projectNumber) {
  if (typeof document === 'undefined') return null;

  // 3480 x 1860 Native 4K Canvas Oversampling
  // Ensures text remains razor-sharp with ZERO blurriness or pixelation even on extreme 3D camera zoom
  const BASE_W = 2320;
  const BASE_H = 1240;
  const SCALE = 1.5;

  const canvas = document.createElement('canvas');
  canvas.width = Math.round(BASE_W * SCALE);   // 3480 px
  canvas.height = Math.round(BASE_H * SCALE);  // 1860 px
  const ctx = canvas.getContext('2d', { alpha: true });
  if (!ctx) return null;

  // High-performance subpixel text anti-aliasing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.scale(SCALE, SCALE);

  switch (projectNumber) {
    case '01':
      renderAvatarDashboard(ctx, BASE_W, BASE_H);
      break;
    case '02':
      renderDashboardDashboard(ctx, BASE_W, BASE_H);
      break;
    case '03':
      renderSandboxDashboard(ctx, BASE_W, BASE_H);
      break;
    case '04':
      renderQuizzesDashboard(ctx, BASE_W, BASE_H);
      break;
    case '05':
      renderPaperCompanyDashboard(ctx, BASE_W, BASE_H);
      break;
    case '06':
      renderSimpleTopicsDashboard(ctx, BASE_W, BASE_H);
      break;
    case '07':
      renderBaselineDiagnosticDashboard(ctx, BASE_W, BASE_H);
      break;
    case '08':
      renderBadgesCertificateDashboard(ctx, BASE_W, BASE_H);
      break;
    case '09':
      renderLiveSessionsDashboard(ctx, BASE_W, BASE_H);
      break;
    case '10':
      renderPlaygroundDashboard(ctx, BASE_W, BASE_H);
      break;
    case '11':
    default:
      renderSmartReviewDashboard(ctx, BASE_W, BASE_H);
      break;
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;

  // Use LinearFilter and disable mipmaps to completely eliminate zoom blurriness
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  texture.anisotropy = 16;
  texture.needsUpdate = true;
  return texture;
}

// ─── Main 3D Project Display Component ───────────────────────────────────────

export default function ProjectDisplay({ project, position, rotation = [0, 0, 0], isMobile = false, isDark = true }) {
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
      {/* 3D Premium Beveled Backplate with Subtle Edge Depth */}
      <RoundedBox
        args={[cardWidth, cardHeight, 0.16]}
        radius={cardRadius}
        smoothness={16}
        position={[0, 0, -0.08]}
      >
        <meshStandardMaterial
          color={isDark ? "#1E293B" : "#CBD5E1"}
          roughness={0.25}
          metalness={0.15}
        />
      </RoundedBox>

      {/* Front Face with Ultra-Crisp Native 4K Retina Texture and Exact Curved Corners */}
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
