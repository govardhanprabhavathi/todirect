"use client";

import React, { useRef, useState, useMemo } from 'react';
import { RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ─── 2D Canvas Drawing Utilities ─────────────────────────────────────────────

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

// ─── Custom Vector Icon Drawing Helpers ───────────────────────────────────────

function drawAvatarIcon(ctx, cx, cy) {
  ctx.strokeStyle = '#38BDF8';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(cx, cy - 2, 13, 0, Math.PI * 2);
  ctx.stroke();
  // eyes
  ctx.fillStyle = '#60A5FA';
  ctx.beginPath();
  ctx.arc(cx - 5, cy - 3, 2.5, 0, Math.PI * 2);
  ctx.arc(cx + 5, cy - 3, 2.5, 0, Math.PI * 2);
  ctx.fill();
  // smile
  ctx.strokeStyle = '#38BDF8';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy + 1, 5, 0.2, Math.PI - 0.2);
  ctx.stroke();
  // pulse badge
  ctx.fillStyle = '#10B981';
  ctx.beginPath();
  ctx.arc(cx + 12, cy - 10, 4, 0, Math.PI * 2);
  ctx.fill();
}

function drawDashboardIcon(ctx, cx, cy) {
  ctx.strokeStyle = '#38BDF8';
  ctx.lineWidth = 2;
  drawRoundRect(ctx, cx - 12, cy - 12, 11, 11, 3, false, true, '#38BDF8', 2);
  drawRoundRect(ctx, cx + 1, cy - 12, 11, 11, 3, false, true, '#38BDF8', 2);
  drawRoundRect(ctx, cx - 12, cy + 1, 11, 11, 3, false, true, '#38BDF8', 2);
  drawRoundRect(ctx, cx + 1, cy + 1, 11, 11, 3, true, true, '#60A5FA', 2);
}

function drawSlidersIcon(ctx, cx, cy) {
  ctx.strokeStyle = '#38BDF8';
  ctx.lineWidth = 2.5;
  ctx.lineCap = 'round';
  [-11, 0, 11].forEach((offset, idx) => {
    ctx.beginPath();
    ctx.moveTo(cx + offset, cy - 13);
    ctx.lineTo(cx + offset, cy + 13);
    ctx.stroke();
    const knobY = idx === 0 ? cy - 3 : idx === 1 ? cy + 4 : cy - 6;
    ctx.beginPath();
    ctx.arc(cx + offset, knobY, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#60A5FA';
    ctx.fill();
  });
}

function drawGamePadIcon(ctx, cx, cy) {
  ctx.strokeStyle = '#38BDF8';
  ctx.lineWidth = 2.5;
  drawRoundRect(ctx, cx - 14, cy - 8, 28, 16, 6, false, true, '#38BDF8', 2);
  // D-pad
  ctx.beginPath();
  ctx.moveTo(cx - 7, cy - 4);
  ctx.lineTo(cx - 7, cy + 4);
  ctx.moveTo(cx - 11, cy);
  ctx.lineTo(cx - 3, cy);
  ctx.stroke();
  // action dots
  ctx.fillStyle = '#F59E0B';
  ctx.beginPath();
  ctx.arc(cx + 7, cy - 2, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#10B981';
  ctx.beginPath();
  ctx.arc(cx + 4, cy + 3, 2.5, 0, Math.PI * 2);
  ctx.fill();
}

function drawAnalysisIcon(ctx, cx, cy) {
  ctx.strokeStyle = '#38BDF8';
  ctx.lineWidth = 2;
  // paper
  drawRoundRect(ctx, cx - 10, cy - 13, 20, 26, 4, false, true, '#38BDF8', 2);
  // chart lines
  ctx.beginPath();
  ctx.moveTo(cx - 6, cy + 5);
  ctx.lineTo(cx - 2, cy - 1);
  ctx.lineTo(cx + 2, cy + 2);
  ctx.lineTo(cx + 6, cy - 6);
  ctx.stroke();
}

function drawLightbulbIcon(ctx, cx, cy) {
  ctx.strokeStyle = '#FBBF24';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(cx, cy - 4, 9, 0.6 * Math.PI, 2.4 * Math.PI);
  ctx.lineTo(cx + 4, cy + 7);
  ctx.lineTo(cx - 4, cy + 7);
  ctx.closePath();
  ctx.stroke();
  // base
  ctx.beginPath();
  ctx.moveTo(cx - 3, cy + 10);
  ctx.lineTo(cx + 3, cy + 10);
  ctx.stroke();
}

function drawRadarCompassIcon(ctx, cx, cy) {
  ctx.strokeStyle = '#38BDF8';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, 13, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, 7, 0, Math.PI * 2);
  ctx.stroke();
  // crosshairs
  ctx.beginPath();
  ctx.moveTo(cx, cy - 13);
  ctx.lineTo(cx, cy + 13);
  ctx.moveTo(cx - 13, cy);
  ctx.lineTo(cx + 13, cy);
  ctx.stroke();
  // target dot
  ctx.fillStyle = '#60A5FA';
  ctx.beginPath();
  ctx.arc(cx + 4, cy - 4, 3, 0, Math.PI * 2);
  ctx.fill();
}

function drawCertificateIcon(ctx, cx, cy) {
  ctx.strokeStyle = '#FBBF24';
  ctx.lineWidth = 2;
  drawRoundRect(ctx, cx - 12, cy - 11, 24, 18, 3, false, true, '#FBBF24', 2);
  // seal
  ctx.fillStyle = '#F59E0B';
  ctx.beginPath();
  ctx.arc(cx + 4, cy + 2, 5, 0, Math.PI * 2);
  ctx.fill();
  // ribbon
  ctx.strokeStyle = '#F59E0B';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cx + 4, cy + 6);
  ctx.lineTo(cx + 2, cy + 12);
  ctx.moveTo(cx + 5, cy + 6);
  ctx.lineTo(cx + 7, cy + 12);
  ctx.stroke();
}

function drawLiveVideoIcon(ctx, cx, cy) {
  ctx.strokeStyle = '#38BDF8';
  ctx.lineWidth = 2;
  drawRoundRect(ctx, cx - 12, cy - 8, 16, 16, 3, false, true, '#38BDF8', 2);
  // camera triangle
  ctx.beginPath();
  ctx.moveTo(cx + 6, cy - 4);
  ctx.lineTo(cx + 12, cy - 8);
  ctx.lineTo(cx + 12, cy + 8);
  ctx.lineTo(cx + 6, cy + 4);
  ctx.closePath();
  ctx.fillStyle = '#38BDF8';
  ctx.fill();
  // live red dot
  ctx.fillStyle = '#EF4444';
  ctx.beginPath();
  ctx.arc(cx - 6, cy - 3, 3, 0, Math.PI * 2);
  ctx.fill();
}

function drawPlaygroundIcon(ctx, cx, cy) {
  ctx.strokeStyle = '#38BDF8';
  ctx.lineWidth = 2;
  drawRoundRect(ctx, cx - 13, cy - 10, 26, 20, 4, false, true, '#38BDF8', 2);
  // prompt
  ctx.beginPath();
  ctx.moveTo(cx - 9, cy - 4);
  ctx.lineTo(cx - 5, cy);
  ctx.lineTo(cx - 9, cy + 4);
  ctx.moveTo(cx - 3, cy + 4);
  ctx.lineTo(cx + 1, cy + 4);
  ctx.stroke();
  // wave curve
  ctx.strokeStyle = '#34D399';
  ctx.beginPath();
  ctx.arc(cx + 6, cy - 2, 4, Math.PI, 0);
  ctx.arc(cx + 10, cy - 2, 4, 0, Math.PI);
  ctx.stroke();
}

function drawBrainReviewIcon(ctx, cx, cy) {
  ctx.strokeStyle = '#38BDF8';
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(cx, cy, 12, 0.3 * Math.PI, 1.7 * Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, 12, 1.3 * Math.PI, 2.7 * Math.PI);
  ctx.stroke();
  // center sync arrows
  ctx.fillStyle = '#60A5FA';
  ctx.beginPath();
  ctx.arc(cx, cy, 4, 0, Math.PI * 2);
  ctx.fill();
}

function drawShieldIcon(ctx, cx, cy, color = '#38BDF8') {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(cx, cy - 12);
  ctx.lineTo(cx + 10, cy - 7);
  ctx.lineTo(cx + 10, cy + 3);
  ctx.quadraticCurveTo(cx + 10, cy + 13, cx, cy + 16);
  ctx.quadraticCurveTo(cx - 10, cy + 13, cx - 10, cy + 3);
  ctx.lineTo(cx - 10, cy - 7);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - 4, cy + 2);
  ctx.lineTo(cx - 1, cy + 5);
  ctx.lineTo(cx + 5, cy - 3);
  ctx.stroke();
}

function drawCheckIcon(ctx, cx, cy, color = '#10B981') {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  ctx.moveTo(cx - 5, cy);
  ctx.lineTo(cx - 1, cy + 4);
  ctx.lineTo(cx + 6, cy - 4);
  ctx.stroke();
}

// ─── Shared Blue Premium Gradient Background Generator ────────────────────────

function renderBluePremiumBackground(
  ctx,
  w,
  h,
  accent1 = '#60A5FA',
  accent2 = '#2563EB',
  accent3 = '#0284C7',
  innerStart = '#0B1736',
  innerMid = '#0F2552',
  innerEnd = '#071126'
) {
  // 1. Outer Radiant Blue Luxury Gradient Frame
  const outerGrad = ctx.createLinearGradient(0, 0, w, h);
  outerGrad.addColorStop(0, accent1);
  outerGrad.addColorStop(0.35, accent2);
  outerGrad.addColorStop(0.7, '#1D4ED8');
  outerGrad.addColorStop(1, accent3);
  ctx.fillStyle = outerGrad;
  drawRoundRect(ctx, 0, 0, w, h, 36, true, false);

  // 2. Inner Card: Deep Luxury Blue Gradient
  const innerGrad = ctx.createLinearGradient(0, 0, w, h);
  innerGrad.addColorStop(0, innerStart);
  innerGrad.addColorStop(0.45, innerMid);
  innerGrad.addColorStop(0.85, innerEnd);
  innerGrad.addColorStop(1, '#050D1E');
  ctx.fillStyle = innerGrad;
  drawRoundRect(ctx, 16, 16, w - 32, h - 32, 28, true, true, 'rgba(147, 197, 253, 0.28)', 1.5);

  // 3. Multi-Layer Radiant Ambient Blue Glows
  const rad1 = ctx.createRadialGradient(w - 100, 80, 10, w - 100, 80, 460);
  rad1.addColorStop(0, 'rgba(56, 189, 248, 0.35)');
  rad1.addColorStop(0.55, 'rgba(37, 99, 235, 0.15)');
  rad1.addColorStop(1, 'transparent');
  ctx.fillStyle = rad1;
  ctx.fillRect(16, 16, w - 32, h - 32);

  const rad2 = ctx.createRadialGradient(140, h - 80, 10, 140, h - 80, 420);
  rad2.addColorStop(0, 'rgba(29, 78, 216, 0.3)');
  rad2.addColorStop(0.65, 'rgba(30, 58, 138, 0.1)');
  rad2.addColorStop(1, 'transparent');
  ctx.fillStyle = rad2;
  ctx.fillRect(16, 16, w - 32, h - 32);

  // 4. Subtle Technical Blueprint Grid
  ctx.strokeStyle = 'rgba(147, 197, 253, 0.04)';
  ctx.lineWidth = 1;
  for (let x = 50; x < w - 20; x += 55) {
    ctx.beginPath();
    ctx.moveTo(x, 16);
    ctx.lineTo(x, h - 16);
    ctx.stroke();
  }
  for (let y = 50; y < h - 20; y += 55) {
    ctx.beginPath();
    ctx.moveTo(16, y);
    ctx.lineTo(w - 16, y);
    ctx.stroke();
  }
}

// ─── 11 Individual Feature Card Canvas Renderers ─────────────────────────────

// 01. AI Avatar
function renderAvatarDashboard(ctx, w, h) {
  renderBluePremiumBackground(ctx, w, h, '#93C5FD', '#3B82F6', '#1D4ED8', '#091A3E', '#0E2962', '#06122C');

  ctx.fillStyle = 'rgba(17, 36, 75, 0.85)';
  drawRoundRect(ctx, 58, 54, 58, 58, 14, true, true, 'rgba(96, 165, 250, 0.3)', 1);
  drawAvatarIcon(ctx, 87, 83);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('AI Financial Avatar', 132, 78);

  ctx.fillStyle = '#93C5FD';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Personalized Socratic Guidance • Voice & Real-Time Reasoning', 132, 102);

  // Status Pill
  ctx.fillStyle = 'rgba(16, 185, 129, 0.18)';
  drawRoundRect(ctx, w - 194, 60, 136, 38, 19, true, true, '#10B981', 1.5);
  ctx.fillStyle = '#10B981';
  ctx.beginPath();
  ctx.arc(w - 172, 79, 4.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#34D399';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Avatar Active', w - 156, 84);

  // Divider
  ctx.strokeStyle = 'rgba(147, 197, 253, 0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(58, 130);
  ctx.lineTo(w - 58, 130);
  ctx.stroke();

  // Chat conversation
  const userBubbleW = 680;
  ctx.fillStyle = 'rgba(15, 30, 65, 0.8)';
  drawRoundRect(ctx, w - 58 - userBubbleW, 150, userBubbleW, 56, 16, true, true, 'rgba(96, 165, 250, 0.3)', 1);
  ctx.fillStyle = '#F8FAFC';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('How do I know if an investment is safe or just high-risk hype?', w - 58 - userBubbleW + 20, 184);

  const finnBubbleW = 840;
  ctx.fillStyle = 'rgba(10, 26, 60, 0.9)';
  drawRoundRect(ctx, 58, 222, finnBubbleW, 82, 16, true, true, 'rgba(56, 189, 248, 0.4)', 1.5);
  ctx.fillStyle = '#38BDF8';
  ctx.font = '700 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Finn (AI Avatar Companion)', 78, 248);
  ctx.fillStyle = '#E2E8F0';
  ctx.font = '400 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Look at guaranteed yield vs market risk. Any asset promising above 12% without volatility', 78, 272);
  ctx.fillText('is carrying hidden credit risk or illiquidity. Let’s evaluate the underlying cashflows.', 78, 292);

  // Chip
  ctx.fillStyle = 'rgba(14, 34, 76, 0.8)';
  drawRoundRect(ctx, 58, 318, 440, 38, 19, true, true, 'rgba(56, 189, 248, 0.3)', 1);
  ctx.fillStyle = '#93C5FD';
  ctx.font = '600 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('💡 Check risk-adjusted Sharpe ratio formula', 76, 342);

  // Metric box
  ctx.fillStyle = 'rgba(10, 24, 56, 0.75)';
  drawRoundRect(ctx, 58, 380, w - 116, 96, 16, true, true, 'rgba(96, 165, 250, 0.25)', 1);
  drawShieldIcon(ctx, 86, 412, '#60A5FA');
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Strictly Socratic Reasoning: Teaches You How to Think', 114, 416);
  ctx.fillStyle = '#93C5FD';
  ctx.font = '400 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Your personalized AI avatar guides you with verified first principles and zero stock picks.', 114, 444);

  // Footer
  ctx.strokeStyle = 'rgba(147, 197, 253, 0.15)';
  ctx.beginPath();
  ctx.moveTo(58, 502);
  ctx.lineTo(w - 58, 502);
  ctx.stroke();

  ctx.fillStyle = '#93C5FD';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Avatar Status: ', 58, 538);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Trained on Verified Syllabus', 165, 538);

  const btnW = 230;
  ctx.fillStyle = '#FFFFFF';
  drawRoundRect(ctx, w - 58 - btnW, 515, btnW, 46, 23, true, false);
  ctx.fillStyle = '#0A1629';
  ctx.font = '700 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Chat With Avatar →', w - 58 - btnW / 2, 543);
  ctx.textAlign = 'left';
}

// 02. Learning Dashboard
function renderDashboardDashboard(ctx, w, h) {
  renderBluePremiumBackground(ctx, w, h, '#38BDF8', '#0284C7', '#1E3A8A', '#081A38', '#0D2958', '#061126');

  ctx.fillStyle = 'rgba(17, 36, 75, 0.85)';
  drawRoundRect(ctx, 58, 54, 58, 58, 14, true, true, 'rgba(56, 189, 248, 0.3)', 1);
  drawDashboardIcon(ctx, 87, 83);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Personal Learning Dashboard', 132, 78);

  ctx.fillStyle = '#93C5FD';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Personal Study Cockpit • Progress, Streaks & Mastery Rings', 132, 102);

  // Status Pill
  ctx.fillStyle = 'rgba(56, 189, 248, 0.18)';
  drawRoundRect(ctx, w - 194, 60, 136, 38, 19, true, true, '#0284C7', 1.5);
  ctx.fillStyle = '#38BDF8';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('🔥 14-Day Streak', w - 176, 84);

  // Divider
  ctx.strokeStyle = 'rgba(147, 197, 253, 0.15)';
  ctx.beginPath();
  ctx.moveTo(58, 130);
  ctx.lineTo(w - 58, 130);
  ctx.stroke();

  // 3 Metric Stat Cards
  const statW = (w - 116 - 32) / 3;
  [
    { label: 'Curriculum Completion', val: '68% (19/28 Lessons)', bar: 0.68, color: '#38BDF8' },
    { label: 'Weekly Study Target', val: '4.5 / 5 Hours Done', bar: 0.9, color: '#10B981' },
    { label: 'Concept Retention Rate', val: '92% Strong Mastery', bar: 0.92, color: '#F59E0B' }
  ].forEach((stat, i) => {
    const sx = 58 + i * (statW + 16);
    ctx.fillStyle = 'rgba(15, 30, 65, 0.8)';
    drawRoundRect(ctx, sx, 150, statW, 90, 14, true, true, 'rgba(96, 165, 250, 0.25)', 1);
    ctx.fillStyle = '#93C5FD';
    ctx.font = '500 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(stat.label, sx + 16, 178);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 17px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(stat.val, sx + 16, 204);
    // bar
    ctx.fillStyle = '#0B172E';
    drawRoundRect(ctx, sx + 16, 218, statW - 32, 8, 4, true, false);
    ctx.fillStyle = stat.color;
    drawRoundRect(ctx, sx + 16, 218, (statW - 32) * stat.bar, 8, 4, true, false);
  });

  // Active module card
  ctx.fillStyle = 'rgba(14, 30, 68, 0.85)';
  drawRoundRect(ctx, 58, 260, w - 116, 100, 16, true, true, 'rgba(56, 189, 248, 0.3)', 1);
  ctx.fillStyle = '#38BDF8';
  ctx.font = '700 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('NEXT UP IN YOUR LEARNING QUEUE', 82, 288);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Topic 4.2: Evaluating Debt Mutual Funds & Yield to Maturity', 82, 314);
  ctx.fillStyle = '#BAE6FD';
  ctx.font = '400 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Estimated time: 8 minutes • Includes 3 debiasing quiz scenarios', 82, 338);

  // Metric Box
  ctx.fillStyle = 'rgba(10, 24, 56, 0.75)';
  drawRoundRect(ctx, 58, 380, w - 116, 96, 16, true, true, 'rgba(96, 165, 250, 0.25)', 1);
  drawShieldIcon(ctx, 86, 412, '#38BDF8');
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Automated Learning Cadence: 100% Calibrated to Your Schedule', 114, 416);
  ctx.fillStyle = '#93C5FD';
  ctx.font = '400 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Adaptive algorithms queue lessons and review drills based on your past quiz responses.', 114, 444);

  // Footer
  ctx.strokeStyle = 'rgba(147, 197, 253, 0.15)';
  ctx.beginPath();
  ctx.moveTo(58, 502);
  ctx.lineTo(w - 58, 502);
  ctx.stroke();

  ctx.fillStyle = '#93C5FD';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Student Level: ', 58, 538);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Level 4 Apprentice (820 XP)', 160, 538);

  const btnW = 230;
  ctx.fillStyle = '#FFFFFF';
  drawRoundRect(ctx, w - 58 - btnW, 515, btnW, 46, 23, true, false);
  ctx.fillStyle = '#0A1629';
  ctx.font = '700 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Open Dashboard →', w - 58 - btnW / 2, 543);
  ctx.textAlign = 'left';
}

// 03. Virtual ₹10,000 Sandbox (Exact match with user's approved screenshot)
function renderSandboxDashboard(ctx, w, h) {
  renderBluePremiumBackground(ctx, w, h, '#60A5FA', '#2563EB', '#0284C7', '#0A1838', '#0F2654', '#061026');

  // Header Icon badge
  ctx.fillStyle = 'rgba(17, 34, 70, 0.85)';
  drawRoundRect(ctx, 58, 54, 58, 58, 14, true, true, 'rgba(96, 165, 250, 0.3)', 1);
  drawSlidersIcon(ctx, 87, 83);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Virtual Portfolio Sandbox', 132, 78);

  ctx.fillStyle = '#93C5FD';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Live ₹10,000 Allocation Preview', 132, 102);

  // Status Pill: Balanced
  ctx.fillStyle = 'rgba(16, 185, 129, 0.18)';
  drawRoundRect(ctx, w - 194, 60, 136, 38, 19, true, true, '#10B981', 1.5);
  drawCheckIcon(ctx, w - 172, 79, '#34D399');
  ctx.fillStyle = '#34D399';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Balanced', w - 156, 84);

  // Divider
  ctx.strokeStyle = 'rgba(147, 197, 253, 0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(58, 130);
  ctx.lineTo(w - 58, 130);
  ctx.stroke();

  const sliderWidth = w - 116;

  // Item 1: Nifty 50 Index Fund
  ctx.fillStyle = '#38BDF8';
  ctx.beginPath();
  ctx.arc(66, 168, 5.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#F0F9FF';
  ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Nifty 50 Index Fund', 82, 173);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('₹5,000 (50%)', w - 58, 173);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#0B172E';
  drawRoundRect(ctx, 58, 188, sliderWidth, 12, 6, true, false);
  ctx.fillStyle = '#38BDF8';
  drawRoundRect(ctx, 58, 188, sliderWidth * 0.5, 12, 6, true, false);
  ctx.fillStyle = '#BAE6FD';
  drawRoundRect(ctx, 58 + sliderWidth * 0.5 - 4, 183, 8, 22, 4, true, false);

  // Item 2: Sovereign Gold Bonds
  ctx.fillStyle = '#F59E0B';
  ctx.beginPath();
  ctx.arc(66, 240, 5.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#F0F9FF';
  ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Sovereign Gold Bonds', 82, 245);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('₹3,000 (30%)', w - 58, 245);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#0B172E';
  drawRoundRect(ctx, 58, 260, sliderWidth, 12, 6, true, false);
  ctx.fillStyle = '#F59E0B';
  drawRoundRect(ctx, 58, 260, sliderWidth * 0.3, 12, 6, true, false);

  // Item 3: Liquid Fixed Deposit
  ctx.fillStyle = '#10B981';
  ctx.beginPath();
  ctx.arc(66, 312, 5.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#F0F9FF';
  ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Liquid Fixed Deposit', 82, 317);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('₹2,000 (20%)', w - 58, 317);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#0B172E';
  drawRoundRect(ctx, 58, 332, sliderWidth, 12, 6, true, false);
  ctx.fillStyle = '#10B981';
  drawRoundRect(ctx, 58, 332, sliderWidth * 0.2, 12, 6, true, false);

  // Prudent Diversification Metric Box
  ctx.fillStyle = 'rgba(10, 24, 56, 0.75)';
  drawRoundRect(ctx, 58, 380, sliderWidth, 96, 16, true, true, 'rgba(96, 165, 250, 0.25)', 1);
  drawShieldIcon(ctx, 86, 412, '#38BDF8');
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Prudent Diversification Metric', 114, 416);
  ctx.fillStyle = '#BAE6FD';
  ctx.font = '400 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Equity: 50% | Defensive: 50%. Complies with beginner safety guardrails.', 114, 444);

  // Footer
  ctx.strokeStyle = 'rgba(147, 197, 253, 0.15)';
  ctx.beginPath();
  ctx.moveTo(58, 502);
  ctx.lineTo(w - 58, 502);
  ctx.stroke();

  ctx.fillStyle = '#93C5FD';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Virtual Capital: ', 58, 538);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('₹10,000', 160, 538);

  const btnW = 230;
  ctx.fillStyle = '#FFFFFF';
  drawRoundRect(ctx, w - 58 - btnW, 515, btnW, 46, 23, true, false);
  ctx.fillStyle = '#0A1629';
  ctx.font = '700 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Launch Full Sandbox →', w - 58 - btnW / 2, 543);
  ctx.textAlign = 'left';
}

// 04. Quizzes & Gamified Drills
function renderQuizzesDashboard(ctx, w, h) {
  renderBluePremiumBackground(ctx, w, h, '#818CF8', '#4F46E5', '#2563EB', '#0D163A', '#132056', '#080E28');

  ctx.fillStyle = 'rgba(26, 32, 80, 0.85)';
  drawRoundRect(ctx, 58, 54, 58, 58, 14, true, true, 'rgba(129, 140, 248, 0.3)', 1);
  drawGamePadIcon(ctx, 87, 83);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Quizzes & Gamified Drills', 132, 78);

  ctx.fillStyle = '#C7D2FE';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Scenario Diagnostic, Instant Rationale & XP Multipliers', 132, 102);

  // Status Pill
  ctx.fillStyle = 'rgba(168, 85, 247, 0.18)';
  drawRoundRect(ctx, w - 194, 60, 136, 38, 19, true, true, '#A855F7', 1.5);
  ctx.fillStyle = '#C084FC';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('+150 XP Ready', w - 176, 84);

  // Divider
  ctx.strokeStyle = 'rgba(147, 197, 253, 0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(58, 130);
  ctx.lineTo(w - 58, 130);
  ctx.stroke();

  const sliderWidth = w - 116;

  // Scenario Question Box
  ctx.fillStyle = 'rgba(18, 26, 66, 0.8)';
  drawRoundRect(ctx, 58, 150, sliderWidth, 68, 14, true, true, 'rgba(129, 140, 248, 0.25)', 1);
  ctx.fillStyle = '#FAF5FF';
  ctx.font = '600 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Scenario: Inflation is 7% and an FD yields 6%. Over 10 years, your purchasing power:', 76, 189);

  // Option A (Trap)
  ctx.fillStyle = 'rgba(239, 68, 68, 0.16)';
  drawRoundRect(ctx, 58, 230, sliderWidth, 54, 12, true, true, 'rgba(239, 68, 68, 0.4)', 1);
  ctx.fillStyle = '#FCA5A5';
  ctx.font = '600 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('A) Increases by 1% compounding annually', 76, 262);
  ctx.fillStyle = '#F87171';
  ctx.font = '700 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('✕ Cognitive Trap Detected', w - 76, 262);
  ctx.textAlign = 'left';

  // Option B (Correct)
  ctx.fillStyle = 'rgba(16, 185, 129, 0.18)';
  drawRoundRect(ctx, 58, 296, sliderWidth, 54, 12, true, true, 'rgba(16, 185, 129, 0.5)', 1);
  ctx.fillStyle = '#6EE7B7';
  ctx.font = '600 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('B) Decreases by ~1% annually (-9.5% purchasing loss)', 76, 328);
  ctx.fillStyle = '#34D399';
  ctx.font = '700 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('✓ Verified Correct (+50 XP)', w - 76, 328);
  ctx.textAlign = 'left';

  // Metric Box
  ctx.fillStyle = 'rgba(14, 22, 60, 0.8)';
  drawRoundRect(ctx, 58, 380, sliderWidth, 96, 16, true, true, 'rgba(129, 140, 248, 0.25)', 1);
  drawShieldIcon(ctx, 86, 412, '#A855F7');
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Gamified Mastery Engine: True Understanding Over Lucky Guesses', 114, 416);
  ctx.fillStyle = '#C7D2FE';
  ctx.font = '400 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Each quiz unlocks streak multipliers, flags misconceptions, and awards verified badges.', 114, 444);

  // Footer
  ctx.strokeStyle = 'rgba(147, 197, 253, 0.15)';
  ctx.beginPath();
  ctx.moveTo(58, 502);
  ctx.lineTo(w - 58, 502);
  ctx.stroke();

  ctx.fillStyle = '#C7D2FE';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Quiz Streak: ', 58, 538);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('7 Days 🔥 • 2.5x Multiplier', 150, 538);

  const btnW = 230;
  ctx.fillStyle = '#FFFFFF';
  drawRoundRect(ctx, w - 58 - btnW, 515, btnW, 46, 23, true, false);
  ctx.fillStyle = '#0A1629';
  ctx.font = '700 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Start Daily Quiz →', w - 58 - btnW / 2, 543);
  ctx.textAlign = 'left';
}

// 05. Paper Company Analysis
function renderPaperCompanyDashboard(ctx, w, h) {
  renderBluePremiumBackground(ctx, w, h, '#38BDF8', '#0284C7', '#0369A1', '#061D38', '#0A2D54', '#051224');

  ctx.fillStyle = 'rgba(15, 36, 75, 0.85)';
  drawRoundRect(ctx, 58, 54, 58, 58, 14, true, true, 'rgba(56, 189, 248, 0.3)', 1);
  drawAnalysisIcon(ctx, 87, 83);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Paper Company Analysis', 132, 78);

  ctx.fillStyle = '#93C5FD';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Fundamental Teardowns • P&L, Balance Sheets & Economic Moats', 132, 102);

  // Status Pill
  ctx.fillStyle = 'rgba(56, 189, 248, 0.18)';
  drawRoundRect(ctx, w - 194, 60, 136, 38, 19, true, true, '#0284C7', 1.5);
  ctx.fillStyle = '#38BDF8';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Case Study #12', w - 176, 84);

  // Divider
  ctx.strokeStyle = 'rgba(147, 197, 253, 0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(58, 130);
  ctx.lineTo(w - 58, 130);
  ctx.stroke();

  // 4 fundamental metrics
  const metW = (w - 116 - 36) / 4;
  [
    { label: '5-Yr Revenue CAGR', val: '+18.4%', sub: 'Consistent Growth', color: '#10B981' },
    { label: 'Debt to Equity', val: '0.18', sub: 'Low Solvency Risk', color: '#38BDF8' },
    { label: 'PE vs Industry', val: '16.2 / 24.5', sub: 'Fair Valuation', color: '#F59E0B' },
    { label: 'Moat Strength', val: 'Wide Moat', sub: 'Pricing Power', color: '#818CF8' }
  ].forEach((m, idx) => {
    const mx = 58 + idx * (metW + 12);
    ctx.fillStyle = 'rgba(14, 30, 68, 0.8)';
    drawRoundRect(ctx, mx, 150, metW, 90, 14, true, true, 'rgba(56, 189, 248, 0.25)', 1);
    ctx.fillStyle = '#93C5FD';
    ctx.font = '500 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(m.label, mx + 14, 178);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(m.val, mx + 14, 204);
    ctx.fillStyle = m.color;
    ctx.font = '600 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(m.sub, mx + 14, 226);
  });

  // Paper teardown highlight card
  ctx.fillStyle = 'rgba(10, 24, 56, 0.8)';
  drawRoundRect(ctx, 58, 255, w - 116, 105, 16, true, true, 'rgba(56, 189, 248, 0.28)', 1);
  ctx.fillStyle = '#38BDF8';
  ctx.font = '700 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('SIMULATED CASE STUDY: FMCG BLUECHIP CORP', 82, 284);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('How to read a cashflow statement without accounting jargon.', 82, 310);
  ctx.fillStyle = '#BAE6FD';
  ctx.font = '400 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Distinguish between accounting profits and real cash generation before investing a rupee.', 82, 334);

  // Metric Box
  ctx.fillStyle = 'rgba(10, 24, 56, 0.75)';
  drawRoundRect(ctx, 58, 380, w - 116, 96, 16, true, true, 'rgba(96, 165, 250, 0.25)', 1);
  drawShieldIcon(ctx, 86, 412, '#38BDF8');
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Hands-On Simulated Valuation: Practice Real Fundamental Analysis', 114, 416);
  ctx.fillStyle = '#93C5FD';
  ctx.font = '400 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Learn to evaluate companies like an institutional analyst without risking personal savings.', 114, 444);

  // Footer
  ctx.strokeStyle = 'rgba(147, 197, 253, 0.15)';
  ctx.beginPath();
  ctx.moveTo(58, 502);
  ctx.lineTo(w - 58, 502);
  ctx.stroke();

  ctx.fillStyle = '#93C5FD';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Case Studies: ', 58, 538);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('12 Real-World Indian Companies', 155, 538);

  const btnW = 230;
  ctx.fillStyle = '#FFFFFF';
  drawRoundRect(ctx, w - 58 - btnW, 515, btnW, 46, 23, true, false);
  ctx.fillStyle = '#0A1629';
  ctx.font = '700 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Analyze Company →', w - 58 - btnW / 2, 543);
  ctx.textAlign = 'left';
}

// 06. Simple Explanation of Financial Topics
function renderSimpleTopicsDashboard(ctx, w, h) {
  renderBluePremiumBackground(ctx, w, h, '#38BDF8', '#0284C7', '#059669', '#081D34', '#0B2C4E', '#051324');

  ctx.fillStyle = 'rgba(14, 40, 78, 0.85)';
  drawRoundRect(ctx, 58, 54, 58, 58, 14, true, true, 'rgba(251, 191, 36, 0.3)', 1);
  drawLightbulbIcon(ctx, 87, 83);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Jargon-Free Financial Topics', 132, 78);

  ctx.fillStyle = '#BAE6FD';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Plain English Explanations • Relatable Analogies & Visual Proof', 132, 102);

  // Status Pill
  ctx.fillStyle = 'rgba(56, 189, 248, 0.18)';
  drawRoundRect(ctx, w - 194, 60, 136, 38, 19, true, true, '#0284C7', 1.5);
  ctx.fillStyle = '#38BDF8';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('3-Min Reads', w - 176, 84);

  // Divider
  ctx.strokeStyle = 'rgba(147, 197, 253, 0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(58, 130);
  ctx.lineTo(w - 58, 130);
  ctx.stroke();

  // 3 Analogy cards
  const cardW = (w - 116 - 32) / 3;
  [
    { title: 'The Compounding Snowball', analogy: 'Money earning money is like a rolling snowball gathering mass exponentially.', tag: 'Topic 1' },
    { title: 'The Inflation Leaky Bucket', analogy: 'Keeping raw cash under the mattress is a bucket losing 6% water annually.', tag: 'Topic 2' },
    { title: 'The Diversification Parachute', analogy: 'Owning uncorrelated assets ensures one bad landing doesn’t crash everything.', tag: 'Topic 3' }
  ].forEach((item, i) => {
    const ix = 58 + i * (cardW + 16);
    ctx.fillStyle = 'rgba(15, 30, 65, 0.8)';
    drawRoundRect(ctx, ix, 150, cardW, 100, 14, true, true, 'rgba(56, 189, 248, 0.25)', 1);
    ctx.fillStyle = '#38BDF8';
    ctx.font = '700 12px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(item.tag.toUpperCase(), ix + 16, 176);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(item.title, ix + 16, 200);
    ctx.fillStyle = '#BAE6FD';
    ctx.font = '400 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(item.analogy, ix + 16, 226);
  });

  // Plain English toggle preview
  ctx.fillStyle = 'rgba(14, 30, 68, 0.85)';
  drawRoundRect(ctx, 58, 265, w - 116, 95, 16, true, true, 'rgba(56, 189, 248, 0.3)', 1);
  ctx.fillStyle = '#38BDF8';
  ctx.font = '700 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('FINANCIAL JARGON TRANSLATOR', 82, 292);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Technical: "Asymmetrical risk-reward beta distribution with unhedged tail exposure."', 82, 318);
  ctx.fillStyle = '#34D399';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Plain English: "You can lose a lot of money very quickly if the market drops."', 82, 342);

  // Metric Box
  ctx.fillStyle = 'rgba(10, 24, 56, 0.75)';
  drawRoundRect(ctx, 58, 380, w - 116, 96, 16, true, true, 'rgba(96, 165, 250, 0.25)', 1);
  drawShieldIcon(ctx, 86, 412, '#38BDF8');
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Cognitive Clarity: Zero Fluff, 100% Practical Signal', 114, 416);
  ctx.fillStyle = '#BAE6FD';
  ctx.font = '400 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Every lesson is tested for readability so teenagers and young professionals grasp it effortlessly.', 114, 444);

  // Footer
  ctx.strokeStyle = 'rgba(147, 197, 253, 0.15)';
  ctx.beginPath();
  ctx.moveTo(58, 502);
  ctx.lineTo(w - 58, 502);
  ctx.stroke();

  ctx.fillStyle = '#BAE6FD';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Curriculum Scope: ', 58, 538);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('7 Core Topics • 28 Lessons', 185, 538);

  const btnW = 230;
  ctx.fillStyle = '#FFFFFF';
  drawRoundRect(ctx, w - 58 - btnW, 515, btnW, 46, 23, true, false);
  ctx.fillStyle = '#0A1629';
  ctx.font = '700 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Explore Topics →', w - 58 - btnW / 2, 543);
  ctx.textAlign = 'left';
}

// 07. Understanding Where You Stand (Baseline Diagnostic)
function renderBaselineDiagnosticDashboard(ctx, w, h) {
  renderBluePremiumBackground(ctx, w, h, '#818CF8', '#6366F1', '#2563EB', '#0D163A', '#132056', '#080E28');

  ctx.fillStyle = 'rgba(26, 32, 80, 0.85)';
  drawRoundRect(ctx, 58, 54, 58, 58, 14, true, true, 'rgba(129, 140, 248, 0.3)', 1);
  drawRadarCompassIcon(ctx, 87, 83);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Baseline Knowledge Diagnostic', 132, 78);

  ctx.fillStyle = '#C7D2FE';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Understanding Where You Stand • Instant Snapshot Upon Login', 132, 102);

  // Status Pill
  ctx.fillStyle = 'rgba(129, 140, 248, 0.18)';
  drawRoundRect(ctx, w - 194, 60, 136, 38, 19, true, true, '#6366F1', 1.5);
  ctx.fillStyle = '#818CF8';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Instant Snapshot', w - 176, 84);

  // Divider
  ctx.strokeStyle = 'rgba(147, 197, 253, 0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(58, 130);
  ctx.lineTo(w - 58, 130);
  ctx.stroke();

  // Diagnostic Scores across 3 pillars
  const colW = (w - 116 - 32) / 3;
  [
    { pillar: 'Cashflow & Budgeting', score: '84/100', status: 'Strong Baseline', bar: 0.84, color: '#34D399' },
    { pillar: 'Compounding & Inflation', score: '62/100', status: 'Moderate Trap Risk', bar: 0.62, color: '#F59E0B' },
    { pillar: 'Asset Risk Preservation', score: '48/100', status: 'Priority Focus Area', bar: 0.48, color: '#F87171' }
  ].forEach((col, idx) => {
    const cx = 58 + idx * (colW + 16);
    ctx.fillStyle = 'rgba(18, 26, 66, 0.8)';
    drawRoundRect(ctx, cx, 150, colW, 95, 14, true, true, 'rgba(129, 140, 248, 0.25)', 1);
    ctx.fillStyle = '#C7D2FE';
    ctx.font = '600 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(col.pillar, cx + 16, 178);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 20px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(col.score, cx + 16, 206);
    ctx.fillStyle = '#0B172E';
    drawRoundRect(ctx, cx + 16, 222, colW - 32, 8, 4, true, false);
    ctx.fillStyle = col.color;
    drawRoundRect(ctx, cx + 16, 222, (colW - 32) * col.bar, 8, 4, true, false);
  });

  // Tailored Recommendation Card
  ctx.fillStyle = 'rgba(14, 22, 60, 0.85)';
  drawRoundRect(ctx, 58, 260, w - 116, 100, 16, true, true, 'rgba(129, 140, 248, 0.3)', 1);
  ctx.fillStyle = '#818CF8';
  ctx.font = '700 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('PERSONALIZED STARTING SNAPSHOT', 82, 288);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Your Custom Syllabus: Skip Basic Budgeting → Start at Module 2: The Inflation Trap', 82, 314);
  ctx.fillStyle = '#C7D2FE';
  ctx.font = '400 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Zero wasted time. We start you exactly where your financial blind spots are.', 82, 338);

  // Metric Box
  ctx.fillStyle = 'rgba(10, 24, 56, 0.75)';
  drawRoundRect(ctx, 58, 380, w - 116, 96, 16, true, true, 'rgba(96, 165, 250, 0.25)', 1);
  drawShieldIcon(ctx, 86, 412, '#818CF8');
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Evidence-Based Snapshot: Know Exactly Where You Stand', 114, 416);
  ctx.fillStyle = '#C7D2FE';
  ctx.font = '400 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Logging in gives you an instant, unvarnished measure of your practical money instincts.', 114, 444);

  // Footer
  ctx.strokeStyle = 'rgba(147, 197, 253, 0.15)';
  ctx.beginPath();
  ctx.moveTo(58, 502);
  ctx.lineTo(w - 58, 502);
  ctx.stroke();

  ctx.fillStyle = '#C7D2FE';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Diagnostic Time: ', 58, 538);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('5 Minutes • Zero Test Anxiety', 170, 538);

  const btnW = 230;
  ctx.fillStyle = '#FFFFFF';
  drawRoundRect(ctx, w - 58 - btnW, 515, btnW, 46, 23, true, false);
  ctx.fillStyle = '#0A1629';
  ctx.font = '700 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Test Your Baseline →', w - 58 - btnW / 2, 543);
  ctx.textAlign = 'left';
}

// 08. Badges & Scores (Reflection Certificate)
function renderBadgesCertificateDashboard(ctx, w, h) {
  renderBluePremiumBackground(ctx, w, h, '#38BDF8', '#2563EB', '#F59E0B', '#0E1B38', '#162852', '#081126');

  ctx.fillStyle = 'rgba(40, 30, 20, 0.85)';
  drawRoundRect(ctx, 58, 54, 58, 58, 14, true, true, 'rgba(251, 191, 36, 0.3)', 1);
  drawCertificateIcon(ctx, 87, 83);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Badges, Scores & Reflection Certificates', 132, 78);

  ctx.fillStyle = '#FCD34D';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Verifiable Competence Credentials • Profile Proof of Understanding', 132, 102);

  // Status Pill
  ctx.fillStyle = 'rgba(245, 158, 11, 0.18)';
  drawRoundRect(ctx, w - 194, 60, 136, 38, 19, true, true, '#F59E0B', 1.5);
  ctx.fillStyle = '#FBBF24';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Tier 2 Mastered', w - 176, 84);

  // Divider
  ctx.strokeStyle = 'rgba(147, 197, 253, 0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(58, 130);
  ctx.lineTo(w - 58, 130);
  ctx.stroke();

  // 3 Badges
  const sliderWidth = w - 116;
  [
    { name: 'Liquidity Preservation Guard', score: '✓ Verified • Score 96%', pct: 0.96, col: '#FBBF24' },
    { name: 'Compounding & Time Horizon Master', score: '✓ Verified • Score 88%', pct: 0.88, col: '#38BDF8' },
    { name: 'Anti-FOMO Emotional Discipline', score: '✓ Verified • Score 92%', pct: 0.92, col: '#10B981' }
  ].forEach((b, i) => {
    const by = 155 + i * 72;
    ctx.fillStyle = b.col;
    ctx.beginPath();
    ctx.arc(66, by, 5.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#FEF3C7';
    ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(b.name, 82, by + 5);
    ctx.fillStyle = b.col;
    ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText(b.score, w - 58, by + 5);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#0B172E';
    drawRoundRect(ctx, 58, by + 18, sliderWidth, 12, 6, true, false);
    ctx.fillStyle = b.col;
    drawRoundRect(ctx, 58, by + 18, sliderWidth * b.pct, 12, 6, true, false);
  });

  // Metric Box
  ctx.fillStyle = 'rgba(10, 24, 56, 0.75)';
  drawRoundRect(ctx, 58, 380, sliderWidth, 96, 16, true, true, 'rgba(251, 191, 36, 0.25)', 1);
  drawShieldIcon(ctx, 86, 412, '#FBBF24');
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Verifiable Proof: Certified Understanding Before Market Exposure', 114, 416);
  ctx.fillStyle = '#FCD34D';
  ctx.font = '400 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Earn on-chain credentials and competency milestones by mastering fundamental modules.', 114, 444);

  // Footer
  ctx.strokeStyle = 'rgba(147, 197, 253, 0.15)';
  ctx.beginPath();
  ctx.moveTo(58, 502);
  ctx.lineTo(w - 58, 502);
  ctx.stroke();

  ctx.fillStyle = '#FCD34D';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Badges Earned: ', 58, 538);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('3 Verified Certificates', 170, 538);

  const btnW = 230;
  ctx.fillStyle = '#FFFFFF';
  drawRoundRect(ctx, w - 58 - btnW, 515, btnW, 46, 23, true, false);
  ctx.fillStyle = '#0A1629';
  ctx.font = '700 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('View Certificates →', w - 58 - btnW / 2, 543);
  ctx.textAlign = 'left';
}

// 09. Live Sessions (200m)
function renderLiveSessionsDashboard(ctx, w, h) {
  renderBluePremiumBackground(ctx, w, h, '#60A5FA', '#2563EB', '#1E40AF', '#091A3E', '#0E2858', '#061026');

  ctx.fillStyle = 'rgba(17, 36, 75, 0.85)';
  drawRoundRect(ctx, 58, 54, 58, 58, 14, true, true, 'rgba(96, 165, 250, 0.3)', 1);
  drawLiveVideoIcon(ctx, 87, 83);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Live Interactive Masterclasses (200m)', 132, 78);

  ctx.fillStyle = '#93C5FD';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Weekend Cohorts • Live Simulations & Real-Time Educator Q&A', 132, 102);

  // Status Pill
  ctx.fillStyle = 'rgba(239, 68, 68, 0.18)';
  drawRoundRect(ctx, w - 194, 60, 136, 38, 19, true, true, '#EF4444', 1.5);
  ctx.fillStyle = '#EF4444';
  ctx.beginPath();
  ctx.arc(w - 172, 79, 4.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#F87171';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Live Broadcast', w - 156, 84);

  // Divider
  ctx.strokeStyle = 'rgba(147, 197, 253, 0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(58, 130);
  ctx.lineTo(w - 58, 130);
  ctx.stroke();

  // Live session card
  ctx.fillStyle = 'rgba(12, 28, 64, 0.85)';
  drawRoundRect(ctx, 58, 150, w - 116, 95, 16, true, true, 'rgba(56, 189, 248, 0.3)', 1);
  ctx.fillStyle = '#38BDF8';
  ctx.font = '700 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('THIS SATURDAY • 200-MINUTE INTENSIVE COHORT', 82, 178);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 18px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Navigating Bear Markets: Live Portfolio Stress-Testing Workshop', 82, 204);
  ctx.fillStyle = '#BAE6FD';
  ctx.font = '400 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Led by SEBI-registered educators • Live interactive polling and simulated portfolio triage.', 82, 228);

  // Live polling widget
  ctx.fillStyle = 'rgba(14, 30, 68, 0.8)';
  drawRoundRect(ctx, 58, 260, w - 116, 100, 16, true, true, 'rgba(56, 189, 248, 0.25)', 1);
  ctx.fillStyle = '#F59E0B';
  ctx.font = '700 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('LIVE COHORT POLL (640 VOTES)', 82, 288);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '600 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('"If Nifty drops 15% next week, where would you deploy your dry powder?"', 82, 312);
  ctx.fillStyle = '#34D399';
  ctx.font = '600 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Top Choice: Index SIP (58%)  •  Gold Hedge (26%)  •  Hold Cash (16%)', 82, 338);

  // Metric Box
  ctx.fillStyle = 'rgba(10, 24, 56, 0.75)';
  drawRoundRect(ctx, 58, 380, w - 116, 96, 16, true, true, 'rgba(96, 165, 250, 0.25)', 1);
  drawShieldIcon(ctx, 86, 412, '#38BDF8');
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Synchronous Cohort Learning: Ask Questions in Real-Time', 114, 416);
  ctx.fillStyle = '#93C5FD';
  ctx.font = '400 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Connect with peer learners, break down live market scenarios, and get instant instructor clarity.', 114, 444);

  // Footer
  ctx.strokeStyle = 'rgba(147, 197, 253, 0.15)';
  ctx.beginPath();
  ctx.moveTo(58, 502);
  ctx.lineTo(w - 58, 502);
  ctx.stroke();

  ctx.fillStyle = '#93C5FD';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Next Cohort: ', 58, 538);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Saturday 10:00 AM IST (200m)', 150, 538);

  const btnW = 230;
  ctx.fillStyle = '#FFFFFF';
  drawRoundRect(ctx, w - 58 - btnW, 515, btnW, 46, 23, true, false);
  ctx.fillStyle = '#0A1629';
  ctx.font = '700 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Join Live Cohort →', w - 58 - btnW / 2, 543);
  ctx.textAlign = 'left';
}

// 10. Learning Playground (Separate)
function renderPlaygroundDashboard(ctx, w, h) {
  renderBluePremiumBackground(ctx, w, h, '#38BDF8', '#0284C7', '#1D4ED8', '#081C38', '#0D2C58', '#061026');

  ctx.fillStyle = 'rgba(15, 36, 75, 0.85)';
  drawRoundRect(ctx, 58, 54, 58, 58, 14, true, true, 'rgba(56, 189, 248, 0.3)', 1);
  drawPlaygroundIcon(ctx, 87, 83);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Interactive Learning Playground', 132, 78);

  ctx.fillStyle = '#93C5FD';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Dedicated Experimentation Lab • Calculators, Time Machines & Curves', 132, 102);

  // Status Pill
  ctx.fillStyle = 'rgba(56, 189, 248, 0.18)';
  drawRoundRect(ctx, w - 194, 60, 136, 38, 19, true, true, '#0284C7', 1.5);
  ctx.fillStyle = '#38BDF8';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Sandbox Mode', w - 176, 84);

  // Divider
  ctx.strokeStyle = 'rgba(147, 197, 253, 0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(58, 130);
  ctx.lineTo(w - 58, 130);
  ctx.stroke();

  // 3 Interactive Playground Lab Tools
  const toolW = (w - 116 - 32) / 3;
  [
    { name: 'Rule of 72 Doubler', desc: 'Calculate exact years to double capital at any rate.', stat: '12% = 6.0 Years', col: '#38BDF8' },
    { name: 'Inflation Time Machine', desc: 'Simulate ₹1 Lakh purchasing power 20 years ahead.', stat: '6% = ₹31,180 Value', col: '#F59E0B' },
    { name: 'SIP vs Lumpsum Curve', desc: 'Compare dollar-cost averaging in volatile bear markets.', stat: 'SIP +24% Outperform', col: '#10B981' }
  ].forEach((tool, i) => {
    const tx = 58 + i * (toolW + 16);
    ctx.fillStyle = 'rgba(14, 30, 68, 0.8)';
    drawRoundRect(ctx, tx, 150, toolW, 95, 14, true, true, 'rgba(56, 189, 248, 0.25)', 1);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(tool.name, tx + 14, 178);
    ctx.fillStyle = '#BAE6FD';
    ctx.font = '400 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(tool.desc, tx + 14, 202);
    ctx.fillStyle = tool.col;
    ctx.font = '700 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(tool.stat, tx + 14, 228);
  });

  // Playground simulation slider preview
  ctx.fillStyle = 'rgba(10, 24, 56, 0.85)';
  drawRoundRect(ctx, 58, 260, w - 116, 100, 16, true, true, 'rgba(56, 189, 248, 0.3)', 1);
  ctx.fillStyle = '#38BDF8';
  ctx.font = '700 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('COMPOUNDING CURVE SIMULATOR', 82, 288);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Monthly SIP: ₹5,000 @ 12% Expected Return over 15 Years: Total Wealth = ₹25.2 Lakhs', 82, 314);
  ctx.fillStyle = '#34D399';
  ctx.font = '400 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Invested: ₹9.0 Lakhs  •  Compound Wealth Generated: ₹16.2 Lakhs (64% pure gains)', 82, 338);

  // Metric Box
  ctx.fillStyle = 'rgba(10, 24, 56, 0.75)';
  drawRoundRect(ctx, 58, 380, w - 116, 96, 16, true, true, 'rgba(96, 165, 250, 0.25)', 1);
  drawShieldIcon(ctx, 86, 412, '#38BDF8');
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Hands-On Experimentation: Build Math Intuition with Zero Risk', 114, 416);
  ctx.fillStyle = '#93C5FD';
  ctx.font = '400 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Tweak variables, stress-test extreme market drops, and see the numbers calculate in real-time.', 114, 444);

  // Footer
  ctx.strokeStyle = 'rgba(147, 197, 253, 0.15)';
  ctx.beginPath();
  ctx.moveTo(58, 502);
  ctx.lineTo(w - 58, 502);
  ctx.stroke();

  ctx.fillStyle = '#93C5FD';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Lab Environment: ', 58, 538);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Infinite Scenarios • No Limits', 180, 538);

  const btnW = 230;
  ctx.fillStyle = '#FFFFFF';
  drawRoundRect(ctx, w - 58 - btnW, 515, btnW, 46, 23, true, false);
  ctx.fillStyle = '#0A1629';
  ctx.font = '700 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Enter Playground →', w - 58 - btnW / 2, 543);
  ctx.textAlign = 'left';
}

// 11. Smart Review System (Home)
function renderSmartReviewDashboard(ctx, w, h) {
  renderBluePremiumBackground(ctx, w, h, '#60A5FA', '#4338CA', '#1D4ED8', '#0B1636', '#122250', '#070D22');

  ctx.fillStyle = 'rgba(25, 30, 75, 0.85)';
  drawRoundRect(ctx, 58, 54, 58, 58, 14, true, true, 'rgba(129, 140, 248, 0.3)', 1);
  drawBrainReviewIcon(ctx, 87, 83);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Smart Spaced Review System', 132, 78);

  ctx.fillStyle = '#C7D2FE';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Home Cockpit Retention Engine • Spaced Repetition Flashcards', 132, 102);

  // Status Pill
  ctx.fillStyle = 'rgba(99, 102, 241, 0.18)';
  drawRoundRect(ctx, w - 194, 60, 136, 38, 19, true, true, '#6366F1', 1.5);
  ctx.fillStyle = '#818CF8';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('3 Reviews Queued', w - 176, 84);

  // Divider
  ctx.strokeStyle = 'rgba(147, 197, 253, 0.15)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(58, 130);
  ctx.lineTo(w - 58, 130);
  ctx.stroke();

  // 3 Review Cards
  const revW = (w - 116 - 32) / 3;
  [
    { concept: 'Bond Yield vs Price', last: 'Tested 5 Days Ago', status: 'Memory Decaying', col: '#F87171' },
    { concept: 'Rule of 72 Shortcut', last: 'Tested 12 Days Ago', status: 'Refresher Ready', col: '#F59E0B' },
    { concept: 'Emergency Fund Ratio', last: 'Tested 3 Days Ago', status: 'High Retention', col: '#34D399' }
  ].forEach((r, i) => {
    const rx = 58 + i * (revW + 16);
    ctx.fillStyle = 'rgba(16, 26, 68, 0.8)';
    drawRoundRect(ctx, rx, 150, revW, 95, 14, true, true, 'rgba(129, 140, 248, 0.25)', 1);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(r.concept, rx + 14, 178);
    ctx.fillStyle = '#C7D2FE';
    ctx.font = '400 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(r.last, rx + 14, 202);
    ctx.fillStyle = r.col;
    ctx.font = '700 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
    ctx.fillText(r.status, rx + 14, 226);
  });

  // Home retention banner
  ctx.fillStyle = 'rgba(12, 22, 60, 0.85)';
  drawRoundRect(ctx, 58, 260, w - 116, 100, 16, true, true, 'rgba(129, 140, 248, 0.3)', 1);
  ctx.fillStyle = '#818CF8';
  ctx.font = '700 13px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('EBBINGHAUS FORGETTING CURVE SHIELD', 82, 288);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Our algorithm resurfaces key financial concepts right before you forget them.', 82, 314);
  ctx.fillStyle = '#C7D2FE';
  ctx.font = '400 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Spend 3 minutes on your home dashboard every morning to turn knowledge into permanent reflex.', 82, 338);

  // Metric Box
  ctx.fillStyle = 'rgba(10, 24, 56, 0.75)';
  drawRoundRect(ctx, 58, 380, w - 116, 96, 16, true, true, 'rgba(96, 165, 250, 0.25)', 1);
  drawShieldIcon(ctx, 86, 412, '#818CF8');
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Permanent Financial Autonomy: Retain What You Learn for Life', 114, 416);
  ctx.fillStyle = '#C7D2FE';
  ctx.font = '400 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Never lose your edge. The home review system ensures you invest with disciplined frameworks.', 114, 444);

  // Footer
  ctx.strokeStyle = 'rgba(147, 197, 253, 0.15)';
  ctx.beginPath();
  ctx.moveTo(58, 502);
  ctx.lineTo(w - 58, 502);
  ctx.stroke();

  ctx.fillStyle = '#C7D2FE';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Memory Retention: ', 58, 538);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('94% Long-Term Recall Rate', 185, 538);

  const btnW = 230;
  ctx.fillStyle = '#FFFFFF';
  drawRoundRect(ctx, w - 58 - btnW, 515, btnW, 46, 23, true, false);
  ctx.fillStyle = '#0A1629';
  ctx.font = '700 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Review Concepts →', w - 58 - btnW / 2, 543);
  ctx.textAlign = 'left';
}

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
          color="#081432"
          roughness={0.25}
          metalness={0.65}
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
