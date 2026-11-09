"use client";

import React, { useRef, useState, useMemo } from 'react';
import { RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── Precision 2D Vector Drawing Utilities ───────────────────────────────────

function drawRoundRect(ctx, x, y, w, h, r, fill = true, stroke = false, strokeColor = '#E2E8F0', lineWidth = 1) {
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

// 4-point sparkle star (matching reference design)
function drawFourPointStar(ctx, cx, cy, outerRadius, innerRadius, color = '#0F172A') {
  ctx.save();
  ctx.fillStyle = color;
  ctx.beginPath();
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / 4;

  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < 4; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawStarCluster(ctx, baseX, baseY) {
  drawFourPointStar(ctx, baseX, baseY, 68, 24, '#0F172A');
  drawFourPointStar(ctx, baseX + 90, baseY - 60, 42, 14, '#0F172A');
  drawFourPointStar(ctx, baseX + 130, baseY + 20, 52, 18, '#0F172A');
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

// ─── Master High-Impact White Card Framework (2320 x 1240 Retina) ────────────

function renderFeatureCard(ctx, w, h, {
  number,
  category,
  title,
  description,
  tags = [],
  buttonLabel = 'LIVE DEMO ↗',
  drawVisual
}) {
  // 1. Clear entire canvas
  ctx.clearRect(0, 0, w, h);

  const cornerRadius = 56;

  // 2. Strict rounded rectangle clipping
  ctx.save();
  drawRoundRect(ctx, 0, 0, w, h, cornerRadius, false, false);
  ctx.clip();

  // 3. Crisp Solid White Background
  ctx.fillStyle = '#FFFFFF';
  ctx.fillRect(0, 0, w, h);

  // 4. Subtle Outer Hairline Border
  drawRoundRect(ctx, 2, 2, w - 4, h - 4, cornerRadius - 2, false, true, '#E2E8F0', 3);

  // ── LEFT SIDE: Feature Representation Visual (~40% width) ──
  const visualX = 80;
  const visualY = 80;
  const visualW = 860;
  const visualH = h - 160;

  ctx.save();
  drawVisual(ctx, visualX, visualY, visualW, visualH);
  ctx.restore();

  // ── RIGHT SIDE: Bold Typography & Action Area (~60% width) ──
  const contentX = 1040;
  const contentW = w - contentX - 100;

  // Top Index Number (Right Aligned)
  ctx.fillStyle = '#94A3B8';
  ctx.font = '700 36px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(number, w - 100, 160);
  ctx.textAlign = 'left';

  // Category Eyebrow
  ctx.fillStyle = '#64748B';
  ctx.font = '800 20px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText(category.toUpperCase(), contentX, 160);

  // Massive Bold Title (Black 900)
  ctx.fillStyle = '#0F172A';
  ctx.font = '900 80px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.fillText(title, contentX, 260);

  // Punchy 2-Line Description (Readable 500 weight, dark slate)
  ctx.fillStyle = '#475569';
  ctx.font = '500 28px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  const descWords = description.split(' ');
  let line1 = '';
  let line2 = '';
  let line3 = '';
  descWords.forEach((word) => {
    if ((line1 + word).length < 52) {
      line1 += `${word} `;
    } else if ((line2 + word).length < 52) {
      line2 += `${word} `;
    } else {
      line3 += `${word} `;
    }
  });

  ctx.fillText(line1.trim(), contentX, 350);
  if (line2) ctx.fillText(line2.trim(), contentX, 396);
  if (line3) ctx.fillText(line3.trim(), contentX, 442);

  // Feature Capability Tags
  const tagY = line3 ? 530 : 490;
  let curTagX = contentX;
  tags.forEach((tag) => {
    ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
    const tagTextW = ctx.measureText(tag).width;
    const pillW = tagTextW + 36;
    const pillH = 46;

    ctx.fillStyle = '#F1F5F9';
    drawRoundRect(ctx, curTagX, tagY, pillW, pillH, 8, true, true, '#E2E8F0', 1);

    ctx.fillStyle = '#334155';
    ctx.fillText(tag, curTagX + 18, tagY + 29);

    curTagX += pillW + 14;
  });

  // High-Impact Solid Black Action Button
  const btnY = tagY + 110;
  const btnW = 520;
  const btnH = 88;

  ctx.fillStyle = '#0F172A';
  drawRoundRect(ctx, contentX, btnY, btnW, btnH, 16, true, false);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '800 26px -apple-system, BlinkMacSystemFont, "Inter", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(buttonLabel, contentX + btnW / 2, btnY + 54);
  ctx.textAlign = 'left';

  ctx.restore();
}

// ─── 01. Finn AI Financial Avatar ───────────────────────────────────────────

function renderAvatarCard(ctx, w, h) {
  renderFeatureCard(ctx, w, h, {
    number: '01',
    category: 'AI System • Socratic Triage',
    title: 'FINN AI AVATAR',
    description: 'Autonomous voice & dialogue coach that interrogates high-yield promises using first-principles financial mechanics without stock picks.',
    tags: ['SOCRATIC DIALOGUE', 'ZERO STOCK TIPS', 'BIAS DEBIASED', 'VOICE & AUDIO'],
    buttonLabel: 'TALK TO FINN AI ↗',
    drawVisual: (ctx, x, y, w, h) => {
      // 3 Black Sparkle Stars
      drawStarCluster(ctx, x + 80, y + 140);

      // Central Socratic Orb Illustration
      const cx = x + w / 2;
      const cy = y + h / 2 + 60;

      // Outer radiant ring
      const grad = ctx.createLinearGradient(cx - 180, cy - 180, cx + 180, cy + 180);
      grad.addColorStop(0, '#2563EB');
      grad.addColorStop(0.5, '#06B6D4');
      grad.addColorStop(1, '#10B981');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, 180, 0, Math.PI * 2);
      ctx.fill();

      // Inner white disc
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(cx, cy, 140, 0, Math.PI * 2);
      ctx.fill();

      // Dynamic Audio Voice Waveform Bars
      const bars = [16, 28, 44, 76, 110, 68, 92, 110, 84, 46, 24];
      const barW = 12;
      const barGap = 10;
      const totalW = bars.length * barW + (bars.length - 1) * barGap;
      const startX = cx - totalW / 2;

      ctx.fillStyle = '#0F172A';
      bars.forEach((bh, i) => {
        const bx = startX + i * (barW + barGap);
        const by = cy - bh / 2;
        drawRoundRect(ctx, bx, by, barW, bh, 6, true, false);
      });

      // Floating verified tag
      ctx.fillStyle = '#10B981';
      drawRoundRect(ctx, cx - 140, cy + 190, 280, 48, 24, true, false);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '800 16px -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('SOCRATIC PROBE ACTIVE', cx, cy + 221);
      ctx.textAlign = 'left';
    }
  });
}

// ─── 02. Personal Learning Dashboard ──────────────────────────────────────────

function renderDashboardCard(ctx, w, h) {
  renderFeatureCard(ctx, w, h, {
    number: '02',
    category: 'Telemetry • Command Cockpit',
    title: 'LEARNING DASHBOARD',
    description: 'Centralized cockpit tracking syllabus progression, concept mastery rings, weekly study consistency, and active learning queues.',
    tags: ['SYLLABUS PROGRESS', 'STREAK MECHANICS', 'RETENTION RADAR', 'COHORT SYNC'],
    buttonLabel: 'OPEN DASHBOARD ↗',
    drawVisual: (ctx, x, y, w, h) => {
      drawStarCluster(ctx, x + 80, y + 140);

      const cx = x + w / 2;
      const cy = y + h / 2 + 50;

      // Circular Mastery Progress Dial
      ctx.strokeStyle = '#F1F5F9';
      ctx.lineWidth = 32;
      ctx.beginPath();
      ctx.arc(cx, cy, 160, 0, Math.PI * 2);
      ctx.stroke();

      // Active Arc (68%)
      const arcGrad = ctx.createLinearGradient(cx - 160, cy - 160, cx + 160, cy + 160);
      arcGrad.addColorStop(0, '#2563EB');
      arcGrad.addColorStop(1, '#38BDF8');

      ctx.strokeStyle = arcGrad;
      ctx.lineWidth = 32;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(cx, cy, 160, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * 0.68);
      ctx.stroke();
      ctx.lineCap = 'butt';

      // Inner Center Score
      ctx.fillStyle = '#0F172A';
      ctx.font = '900 76px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('68%', cx, cy + 18);

      ctx.fillStyle = '#64748B';
      ctx.font = '800 16px -apple-system, sans-serif';
      ctx.fillText('SYLLABUS MASTERY', cx, cy + 56);

      // Streak Pill Below
      ctx.fillStyle = '#F59E0B';
      drawRoundRect(ctx, cx - 130, cy + 200, 260, 48, 24, true, false);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '800 16px -apple-system, sans-serif';
      ctx.fillText('🔥 14-DAY STUDY STREAK', cx, cy + 231);
      ctx.textAlign = 'left';
    }
  });
}

// ─── 03. Virtual ₹10,000 Sandbox ─────────────────────────────────────────────

function renderSandboxCard(ctx, w, h) {
  renderFeatureCard(ctx, w, h, {
    number: '03',
    category: 'Zero-Risk • Practice Terminal',
    title: '₹10,000 SANDBOX',
    description: 'Realistic simulated trading terminal to practice allocating across equity index ETFs, sovereign gold, and liquid cash with zero capital risk.',
    tags: ['₹10,000 BALANCE', 'INDEX ETFS', 'SOVEREIGN GOLD', 'ZERO RISK'],
    buttonLabel: 'START TRADING ↗',
    drawVisual: (ctx, x, y, w, h) => {
      drawStarCluster(ctx, x + 80, y + 140);

      const cx = x + w / 2;
      const cy = y + h / 2 + 50;

      // 3D Metallic Golden Rupee Medallion
      const coinGrad = ctx.createRadialGradient(cx - 40, cy - 40, 20, cx, cy, 180);
      coinGrad.addColorStop(0, '#FDE68A');
      coinGrad.addColorStop(0.4, '#F59E0B');
      coinGrad.addColorStop(0.85, '#D97706');
      coinGrad.addColorStop(1, '#B45309');

      ctx.fillStyle = coinGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 180, 0, Math.PI * 2);
      ctx.fill();

      // Outer Coin Bezel
      ctx.strokeStyle = '#FCD34D';
      ctx.lineWidth = 14;
      ctx.beginPath();
      ctx.arc(cx, cy, 168, 0, Math.PI * 2);
      ctx.stroke();

      // Engraved ₹ Symbol
      ctx.fillStyle = '#78350F';
      ctx.font = '900 150px -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('₹', cx + 4, cy + 54);

      // Profit Badge Below
      ctx.fillStyle = '#10B981';
      drawRoundRect(ctx, cx - 140, cy + 200, 280, 48, 24, true, false);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '800 16px -apple-system, sans-serif';
      ctx.fillText('+4.80% SIMULATED PROFIT', cx, cy + 231);
      ctx.textAlign = 'left';
    }
  });
}

// ─── 04. Adaptive Quizzes & Debiasing Drills ──────────────────────────────────

function renderQuizzesCard(ctx, w, h) {
  renderFeatureCard(ctx, w, h, {
    number: '04',
    category: 'Diagnostic Engine • Debiasing',
    title: 'ADAPTIVE QUIZZES',
    description: 'Scenario challenges that test concept understanding and interrogate cognitive biases before awarding XP and maintaining multipliers.',
    tags: ['SCENARIO PROBES', 'MONEY ILLUSION', 'XP MULTIPLIERS', 'DEBIASED'],
    buttonLabel: 'START DAILY QUIZ ↗',
    drawVisual: (ctx, x, y, w, h) => {
      drawStarCluster(ctx, x + 80, y + 140);

      const cx = x + w / 2;
      const cy = y + h / 2 + 50;

      // Faceted Quiz Diamond Badge
      const dGrad = ctx.createLinearGradient(cx - 160, cy - 160, cx + 160, cy + 160);
      dGrad.addColorStop(0, '#6366F1');
      dGrad.addColorStop(0.5, '#8B5CF6');
      dGrad.addColorStop(1, '#A855F7');

      ctx.fillStyle = dGrad;
      ctx.beginPath();
      ctx.moveTo(cx, cy - 170);
      ctx.lineTo(cx + 170, cy);
      ctx.lineTo(cx, cy + 170);
      ctx.lineTo(cx - 170, cy);
      ctx.closePath();
      ctx.fill();

      // Lightning bolt icon inside
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(cx + 10, cy - 90);
      ctx.lineTo(cx - 50, cy + 10);
      ctx.lineTo(cx, cy + 10);
      ctx.lineTo(cx - 10, cy + 90);
      ctx.lineTo(cx + 50, cy - 10);
      ctx.lineTo(cx, cy - 10);
      ctx.closePath();
      ctx.fill();

      // Reward Pill
      ctx.fillStyle = '#0F172A';
      drawRoundRect(ctx, cx - 140, cy + 200, 280, 48, 24, true, false);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '800 16px -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('+50 XP • 2.5X MULTIPLIER', cx, cy + 231);
      ctx.textAlign = 'left';
    }
  });
}

// ─── 05. Paper Company Analysis ──────────────────────────────────────────────

function renderPaperCompanyCard(ctx, w, h) {
  renderFeatureCard(ctx, w, h, {
    number: '05',
    category: 'Equity Research • Forensic Moat',
    title: 'COMPANY ANALYSIS',
    description: 'Deconstruct real corporate statements, cashflow quality, and balance sheet moats without Wall Street jargon or accounting confusion.',
    tags: ['BALANCE SHEETS', 'P/E RATIOS', 'FREE CASH FLOW', 'GRADE A+ MOAT'],
    buttonLabel: 'ANALYZE COMPANY ↗',
    drawVisual: (ctx, x, y, w, h) => {
      drawStarCluster(ctx, x + 80, y + 140);

      const cx = x + w / 2;
      const cy = y + h / 2 + 50;

      // Institutional Document Clipboard Card
      drawRoundRect(ctx, cx - 170, cy - 180, 340, 360, 20, true, true, '#CBD5E1', 3);
      ctx.fillStyle = '#F8FAFC';
      ctx.fill();

      // Document Top Clip
      ctx.fillStyle = '#0F172A';
      drawRoundRect(ctx, cx - 70, cy - 195, 140, 30, 8, true, false);

      // Ticker Header
      ctx.fillStyle = '#2563EB';
      ctx.font = '800 18px "JetBrains Mono", monospace';
      ctx.fillText('NSE : APEX', cx - 140, cy - 120);

      // 4 Metric Rows
      const metrics = [
        { l: 'P/E RATIO', v: '16.4x' },
        { l: 'ROE %', v: '24.8%' },
        { l: 'DEBT/EQ', v: '0.14' },
        { l: 'FCF CR', v: '₹840 Cr' }
      ];
      metrics.forEach((m, i) => {
        const my = cy - 80 + i * 44;
        ctx.fillStyle = '#E2E8F0';
        drawRoundRect(ctx, cx - 140, my, 280, 36, 6, true, false);

        ctx.fillStyle = '#64748B';
        ctx.font = '700 13px -apple-system, sans-serif';
        ctx.fillText(m.l, cx - 126, my + 23);

        ctx.fillStyle = '#0F172A';
        ctx.font = '800 15px "JetBrains Mono", monospace';
        ctx.textAlign = 'right';
        ctx.fillText(m.v, cx + 126, my + 24);
        ctx.textAlign = 'left';
      });

      // Grade A+ Stamp Seal
      ctx.fillStyle = '#10B981';
      drawRoundRect(ctx, cx - 130, cy + 200, 260, 48, 24, true, false);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '800 16px -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('GRADE A+ FORENSIC MOAT', cx, cy + 231);
      ctx.textAlign = 'left';
    }
  });
}

// ─── 06. Jargon-Free Financial Topics ─────────────────────────────────────────

function renderSimpleTopicsCard(ctx, w, h) {
  renderFeatureCard(ctx, w, h, {
    number: '06',
    category: 'Pedagogy • Plain English',
    title: 'JARGON-FREE TOPICS',
    description: 'Complex financial mechanics translated into intuitive mental models, visual analogies, and Rule of 72 napkin math anyone can calculate.',
    tags: ['RULE OF 72', 'PLAIN ENGLISH', 'VISUAL PHYSICS', 'ZERO JARGON'],
    buttonLabel: 'EXPLORE TOPICS ↗',
    drawVisual: (ctx, x, y, w, h) => {
      drawStarCluster(ctx, x + 80, y + 140);

      const cx = x + w / 2;
      const cy = y + h / 2 + 50;

      // Formula Plaque
      ctx.fillStyle = '#0F172A';
      drawRoundRect(ctx, cx - 170, cy - 140, 340, 280, 24, true, false);

      ctx.fillStyle = '#F59E0B';
      ctx.font = '900 48px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('72 ÷ R', cx, cy - 20);

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '700 24px -apple-system, sans-serif';
      ctx.fillText('= YEARS TO DOUBLE', cx, cy + 30);

      ctx.fillStyle = '#94A3B8';
      ctx.font = '500 16px -apple-system, sans-serif';
      ctx.fillText('Napkin math in seconds', cx, cy + 74);

      // Translation Pill
      ctx.fillStyle = '#2563EB';
      drawRoundRect(ctx, cx - 140, cy + 180, 280, 48, 24, true, false);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '800 15px -apple-system, sans-serif';
      ctx.fillText('WALL ST ➔ PLAIN ENGLISH', cx, cy + 211);
      ctx.textAlign = 'left';
    }
  });
}

// ─── 07. Understanding Where You Stand (Baseline Diagnostic) ──────────────────

function renderBaselineDiagnosticCard(ctx, w, h) {
  renderFeatureCard(ctx, w, h, {
    number: '07',
    category: 'Initial Snapshot • Calibration',
    title: 'BASELINE DIAGNOSTIC',
    description: '5-minute adaptive calibration upon signup that charts your cognitive blindspots and maps an optimized curriculum route.',
    tags: ['5-MIN TEST', 'BLINDSPOT RADAR', '84/100 INDEX', 'CUSTOM PATH'],
    buttonLabel: 'TEST YOUR BASELINE ↗',
    drawVisual: (ctx, x, y, w, h) => {
      drawStarCluster(ctx, x + 80, y + 140);

      const cx = x + w / 2;
      const cy = y + h / 2 + 50;

      // Gauge Arc
      ctx.strokeStyle = '#F1F5F9';
      ctx.lineWidth = 32;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(cx, cy, 160, Math.PI * 0.8, Math.PI * 2.2);
      ctx.stroke();

      const gGrad = ctx.createLinearGradient(cx - 160, cy, cx + 160, cy);
      gGrad.addColorStop(0, '#EF4444');
      gGrad.addColorStop(0.5, '#F59E0B');
      gGrad.addColorStop(1, '#10B981');

      ctx.strokeStyle = gGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 160, Math.PI * 0.8, Math.PI * 0.8 + (Math.PI * 1.4) * 0.84);
      ctx.stroke();
      ctx.lineCap = 'butt';

      // Big Score Text
      ctx.fillStyle = '#0F172A';
      ctx.font = '900 80px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('84', cx, cy + 15);

      ctx.fillStyle = '#64748B';
      ctx.font = '700 18px -apple-system, sans-serif';
      ctx.fillText('OUT OF 100', cx, cy + 54);

      // Percentile Pill Below
      ctx.fillStyle = '#10B981';
      drawRoundRect(ctx, cx - 130, cy + 200, 260, 48, 24, true, false);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '800 16px -apple-system, sans-serif';
      ctx.fillText('TOP 8% OF ENTRANTS', cx, cy + 231);
      ctx.textAlign = 'left';
    }
  });
}

// ─── 08. Badges & Verified Certificates ──────────────────────────────────────

function renderBadgesCertificateCard(ctx, w, h) {
  renderFeatureCard(ctx, w, h, {
    number: '08',
    category: 'Credentials • Verified Proof',
    title: 'VERIFIED CREDENTIALS',
    description: 'Earn cryptographic proof-of-competence badges and reflection certificates to showcase practical financial literacy on your resume and LinkedIn.',
    tags: ['VERIFIED SERIAL', 'LINKEDIN READY', 'MILESTONE CREST', 'SEBI ALIGNED'],
    buttonLabel: 'VIEW CREDENTIALS ↗',
    drawVisual: (ctx, x, y, w, h) => {
      drawStarCluster(ctx, x + 80, y + 140);

      const cx = x + w / 2;
      const cy = y + h / 2 + 50;

      // Golden Medal Ribbon
      ctx.fillStyle = '#1D4ED8';
      ctx.beginPath();
      ctx.moveTo(cx - 50, cy - 180);
      ctx.lineTo(cx - 100, cy - 20);
      ctx.lineTo(cx - 50, cy - 50);
      ctx.lineTo(cx, cy - 20);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#2563EB';
      ctx.beginPath();
      ctx.moveTo(cx + 50, cy - 180);
      ctx.lineTo(cx + 100, cy - 20);
      ctx.lineTo(cx + 50, cy - 50);
      ctx.lineTo(cx, cy - 20);
      ctx.closePath();
      ctx.fill();

      // Gold Medal Body
      const mGrad = ctx.createRadialGradient(cx - 30, cy + 10, 20, cx, cy + 30, 140);
      mGrad.addColorStop(0, '#FEF08A');
      mGrad.addColorStop(0.5, '#F59E0B');
      mGrad.addColorStop(1, '#B45309');

      ctx.fillStyle = mGrad;
      ctx.beginPath();
      ctx.arc(cx, cy + 30, 130, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#FEF08A';
      ctx.lineWidth = 10;
      ctx.beginPath();
      ctx.arc(cx, cy + 30, 118, 0, Math.PI * 2);
      ctx.stroke();

      // Shield Crest in center
      drawFourPointStar(ctx, cx, cy + 30, 60, 22, '#78350F');

      // Serial Pill
      ctx.fillStyle = '#0F172A';
      drawRoundRect(ctx, cx - 140, cy + 200, 280, 48, 24, true, false);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '800 15px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('TOD-CERT-2026-X7', cx, cy + 231);
      ctx.textAlign = 'left';
    }
  });
}

// ─── 09. Live Sessions & Masterclasses ───────────────────────────────────────

function renderLiveSessionsCard(ctx, w, h) {
  renderFeatureCard(ctx, w, h, {
    number: '09',
    category: 'Live Cohort • Weekend Deep Dives',
    title: 'LIVE MASTERCLASSES',
    description: 'Interactive 200-minute live masterclasses dissecting actual balance sheets and IPO prospectuses with real-time mentor Q&A.',
    tags: ['200-MIN SESSIONS', 'LIVE MENTOR Q&A', 'BALANCE SHEETS', '1,420 LEARNERS'],
    buttonLabel: 'JOIN LIVE COHORT ↗',
    drawVisual: (ctx, x, y, w, h) => {
      drawStarCluster(ctx, x + 80, y + 140);

      const cx = x + w / 2;
      const cy = y + h / 2 + 50;

      // Broadcast Screen Monitor
      ctx.fillStyle = '#0F172A';
      drawRoundRect(ctx, cx - 180, cy - 140, 360, 260, 20, true, false);

      // Video Window Header
      ctx.fillStyle = '#EF4444';
      ctx.beginPath();
      ctx.arc(cx - 140, cy - 100, 8, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '800 15px -apple-system, sans-serif';
      ctx.fillText('LIVE BROADCAST', cx - 120, cy - 95);

      // Play Icon in Screen
      ctx.fillStyle = '#38BDF8';
      ctx.beginPath();
      ctx.moveTo(cx - 20, cy - 30);
      ctx.lineTo(cx + 35, cy);
      ctx.lineTo(cx - 20, cy + 30);
      ctx.closePath();
      ctx.fill();

      // Audio Frequency visualizer bars
      const bars = [14, 26, 40, 56, 32, 48, 20];
      ctx.fillStyle = '#94A3B8';
      bars.forEach((b, i) => {
        drawRoundRect(ctx, cx - 70 + i * 20, cy + 70 - b, 10, b, 4, true, false);
      });

      // Attendee Pill
      ctx.fillStyle = '#10B981';
      drawRoundRect(ctx, cx - 140, cy + 180, 280, 48, 24, true, false);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '800 16px -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('1,420 ACTIVE LEARNERS', cx, cy + 211);
      ctx.textAlign = 'left';
    }
  });
}

// ─── 10. Financial Playground & Calculators ───────────────────────────────────

function renderPlaygroundCard(ctx, w, h) {
  renderFeatureCard(ctx, w, h, {
    number: '10',
    category: 'Simulation Lab • Wealth Engine',
    title: 'WEALTH PLAYGROUND',
    description: 'Tactile scenario simulators for SIP compound growth, EMI amortization schedules, and real inflation time machines.',
    tags: ['COMPOUND SIP', 'INFLATION SIM', 'EXPONENTIAL CURVE', 'EMI ANALYZER'],
    buttonLabel: 'LAUNCH PLAYGROUND ↗',
    drawVisual: (ctx, x, y, w, h) => {
      drawStarCluster(ctx, x + 80, y + 140);

      const cx = x + w / 2;
      const cy = y + h / 2 + 50;

      // Exponential Compounding Hockey Stick Graph Box
      ctx.fillStyle = '#F8FAFC';
      drawRoundRect(ctx, cx - 180, cy - 140, 360, 280, 20, true, true, '#E2E8F0', 2);

      // Exponential Curve Area Gradient
      const curveGrad = ctx.createLinearGradient(cx - 150, cy + 100, cx + 150, cy - 100);
      curveGrad.addColorStop(0, 'rgba(56, 189, 248, 0.2)');
      curveGrad.addColorStop(1, 'rgba(16, 185, 129, 0.4)');

      ctx.fillStyle = curveGrad;
      ctx.beginPath();
      ctx.moveTo(cx - 150, cy + 100);
      ctx.bezierCurveTo(cx - 50, cy + 90, cx + 50, cy + 40, cx + 150, cy - 90);
      ctx.lineTo(cx + 150, cy + 100);
      ctx.closePath();
      ctx.fill();

      // Stroke Line
      ctx.strokeStyle = '#2563EB';
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(cx - 150, cy + 100);
      ctx.bezierCurveTo(cx - 50, cy + 90, cx + 50, cy + 40, cx + 150, cy - 90);
      ctx.stroke();

      // Terminal Wealth Pin
      ctx.fillStyle = '#10B981';
      ctx.beginPath();
      ctx.arc(cx + 150, cy - 90, 14, 0, Math.PI * 2);
      ctx.fill();

      // Big Maturity Pill
      ctx.fillStyle = '#0F172A';
      drawRoundRect(ctx, cx - 140, cy + 180, 280, 48, 24, true, false);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '800 16px -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('₹50.45 LAKHS CORPUS', cx, cy + 211);
      ctx.textAlign = 'left';
    }
  });
}

// ─── 11. Smart Revision System (SRS) ─────────────────────────────────────────

function renderSmartReviewCard(ctx, w, h) {
  renderFeatureCard(ctx, w, h, {
    number: '11',
    category: 'Retention Engine • Spaced Recall',
    title: 'SMART REVISION (SRS)',
    description: 'Spaced repetition engine that revisits weak concepts, triggers 2-minute formula cheat sheets, and locks in permanent financial instincts.',
    tags: ['EBBINGHAUS CURVE', 'DAY 1/3/7/30 RECALL', 'SHORT NOTES', '2-MIN CHEATS'],
    buttonLabel: 'OPEN REVISION ↗',
    drawVisual: (ctx, x, y, w, h) => {
      drawStarCluster(ctx, x + 80, y + 140);

      const cx = x + w / 2;
      const cy = y + h / 2 + 50;

      // Spaced Repetition Stepped Loops
      ctx.fillStyle = '#0F172A';
      drawRoundRect(ctx, cx - 170, cy - 140, 340, 280, 20, true, false);

      // Memory Retention Staircase
      const steps = [
        { label: 'DAY 1', p: 100 },
        { label: 'DAY 3', p: 95 },
        { label: 'DAY 7', p: 92 },
        { label: 'DAY 30', p: 90 }
      ];

      steps.forEach((s, idx) => {
        const sy = cy - 90 + idx * 56;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        drawRoundRect(ctx, cx - 130, sy, 260, 40, 8, true, false);

        ctx.fillStyle = '#38BDF8';
        drawRoundRect(ctx, cx - 130, sy, (260 * s.p) / 100, 40, 8, true, false);

        ctx.fillStyle = '#FFFFFF';
        ctx.font = '800 15px "JetBrains Mono", monospace';
        ctx.fillText(s.label, cx - 116, sy + 26);

        ctx.textAlign = 'right';
        ctx.fillText(`${s.p}%`, cx + 116, sy + 26);
        ctx.textAlign = 'left';
      });

      // Retention Lock Pill
      ctx.fillStyle = '#10B981';
      drawRoundRect(ctx, cx - 140, cy + 180, 280, 48, 24, true, false);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '800 16px -apple-system, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('PERMANENT MEMORY LOCK', cx, cy + 211);
      ctx.textAlign = 'left';
    }
  });
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
      renderAvatarCard(ctx, canvas.width, canvas.height);
      break;
    case '02':
      renderDashboardCard(ctx, canvas.width, canvas.height);
      break;
    case '03':
      renderSandboxCard(ctx, canvas.width, canvas.height);
      break;
    case '04':
      renderQuizzesCard(ctx, canvas.width, canvas.height);
      break;
    case '05':
      renderPaperCompanyCard(ctx, canvas.width, canvas.height);
      break;
    case '06':
      renderSimpleTopicsCard(ctx, canvas.width, canvas.height);
      break;
    case '07':
      renderBaselineDiagnosticCard(ctx, canvas.width, canvas.height);
      break;
    case '08':
      renderBadgesCertificateCard(ctx, canvas.width, canvas.height);
      break;
    case '09':
      renderLiveSessionsCard(ctx, canvas.width, canvas.height);
      break;
    case '10':
      renderPlaygroundCard(ctx, canvas.width, canvas.height);
      break;
    case '11':
    default:
      renderSmartReviewCard(ctx, canvas.width, canvas.height);
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

export default function ProjectDisplay({ project, position, rotation = [0, 0, 0], isMobile = false, isLight = false }) {
  const [hovered, setHovered] = useState(false);
  const groupRef = useRef(null);

  // Generate crisp procedural card texture matching the Fisherbowl luxury reference
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
      const targetScale = hovered ? 1.025 : 1.0;
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
      {/* 3D Beveled Backplate with Depth (adapts to light/dark theme) */}
      <RoundedBox
        args={[cardWidth, cardHeight, 0.16]}
        radius={cardRadius}
        smoothness={16}
        position={[0, 0, -0.08]}
      >
        <meshStandardMaterial
          color={isLight ? "#CBD5E1" : "#0A0F1D"}
          roughness={0.4}
          metalness={0.2}
        />
      </RoundedBox>

      {/* Front Face with Ultra-Crisp White Card and Curved Corners */}
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
