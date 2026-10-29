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

function drawSlidersIcon(ctx, cx, cy) {
  ctx.strokeStyle = '#3B82F6';
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

function drawShieldIcon(ctx, cx, cy, color = '#3B82F6') {
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

function drawBookIcon(ctx, cx, cy, color = '#38BDF8') {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(cx, cy - 8);
  ctx.lineTo(cx, cy + 10);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx, cy - 8);
  ctx.quadraticCurveTo(cx - 6, cy - 12, cx - 12, cy - 10);
  ctx.lineTo(cx - 12, cy + 8);
  ctx.quadraticCurveTo(cx - 6, cy + 6, cx, cy + 10);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx, cy - 8);
  ctx.quadraticCurveTo(cx + 6, cy - 12, cx + 12, cy - 10);
  ctx.lineTo(cx + 12, cy + 8);
  ctx.quadraticCurveTo(cx + 6, cy + 6, cx, cy + 10);
  ctx.stroke();
}

function drawTargetIcon(ctx, cx, cy, color = '#A855F7') {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(cx, cy, 12, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, 6, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

function drawBotIcon(ctx, cx, cy, color = '#60A5FA') {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(cx, cy - 9);
  ctx.lineTo(cx, cy - 13);
  ctx.stroke();
  ctx.fillStyle = '#0F2447';
  drawRoundRect(ctx, cx - 12, cy - 8, 24, 18, 5, true, true, color, 2);
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(cx - 5, cy, 2.5, 0, Math.PI * 2);
  ctx.arc(cx + 5, cy, 2.5, 0, Math.PI * 2);
  ctx.fill();
}

function drawTrophyIcon(ctx, cx, cy, color = '#FBBF24') {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(cx - 8, cy - 9);
  ctx.lineTo(cx + 8, cy - 9);
  ctx.lineTo(cx + 7, cy);
  ctx.quadraticCurveTo(cx + 5, cy + 6, cx, cy + 6);
  ctx.quadraticCurveTo(cx - 5, cy + 6, cx - 7, cy);
  ctx.closePath();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx, cy + 6);
  ctx.lineTo(cx, cy + 11);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - 7, cy + 11);
  ctx.lineTo(cx + 7, cy + 11);
  ctx.stroke();
}

function drawSparkleIcon(ctx, cx, cy, color = '#A5B4FC') {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(cx, cy - 11);
  ctx.quadraticCurveTo(cx, cy, cx + 11, cy);
  ctx.quadraticCurveTo(cx, cy, cx, cy + 11);
  ctx.quadraticCurveTo(cx, cy, cx - 11, cy);
  ctx.quadraticCurveTo(cx, cy, cx, cy - 11);
  ctx.fill();
}

// ─── Individual Feature Card Canvas Renderers ────────────────────────────────

function renderSandboxDashboard(ctx, w, h) {
  // Outer frame gradient
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#2563EB');
  grad.addColorStop(0.5, '#1D4ED8');
  grad.addColorStop(1, '#0284C7');
  ctx.fillStyle = grad;
  drawRoundRect(ctx, 0, 0, w, h, 36, true, false);

  // Inner dark card
  ctx.fillStyle = '#0B0F19';
  drawRoundRect(ctx, 22, 22, w - 44, h - 44, 28, true, true, 'rgba(255, 255, 255, 0.08)', 1.5);

  // Header Icon badge
  ctx.fillStyle = '#111A2E';
  drawRoundRect(ctx, 58, 54, 58, 58, 14, true, true, '#1E293B', 1);
  drawSlidersIcon(ctx, 87, 83);

  // Title & Subtitle
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText('Virtual Portfolio Sandbox', 132, 78);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Live ₹10,000 Allocation Preview', 132, 102);

  // Status Pill: Balanced
  ctx.fillStyle = 'rgba(16, 185, 129, 0.12)';
  drawRoundRect(ctx, w - 194, 60, 136, 38, 19, true, true, '#059669', 1.5);
  drawCheckIcon(ctx, w - 172, 79, '#10B981');
  ctx.fillStyle = '#34D399';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Balanced', w - 156, 84);

  // Divider line
  ctx.strokeStyle = '#1E293B';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(58, 130);
  ctx.lineTo(w - 58, 130);
  ctx.stroke();

  // Allocation Sliders
  const sliderWidth = w - 116;

  // Item 1: Nifty 50 Index Fund
  ctx.fillStyle = '#2563FF';
  ctx.beginPath();
  ctx.arc(66, 168, 5.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#E2E8F0';
  ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Nifty 50 Index Fund', 82, 173);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('₹5,000 (50%)', w - 58, 173);
  ctx.textAlign = 'left';

  ctx.fillStyle = '#162032';
  drawRoundRect(ctx, 58, 188, sliderWidth, 12, 6, true, false);
  ctx.fillStyle = '#2563FF';
  drawRoundRect(ctx, 58, 188, sliderWidth * 0.5, 12, 6, true, false);
  // Slider knob
  ctx.fillStyle = '#60A5FA';
  drawRoundRect(ctx, 58 + sliderWidth * 0.5 - 4, 183, 8, 22, 4, true, false);

  // Item 2: Sovereign Gold Bonds
  ctx.fillStyle = '#F59E0B';
  ctx.beginPath();
  ctx.arc(66, 240, 5.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#E2E8F0';
  ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Sovereign Gold Bonds', 82, 245);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('₹3,000 (30%)', w - 58, 245);
  ctx.textAlign = 'left';

  ctx.fillStyle = '#162032';
  drawRoundRect(ctx, 58, 260, sliderWidth, 12, 6, true, false);
  ctx.fillStyle = '#F59E0B';
  drawRoundRect(ctx, 58, 260, sliderWidth * 0.3, 12, 6, true, false);

  // Item 3: Liquid Fixed Deposit
  ctx.fillStyle = '#10B981';
  ctx.beginPath();
  ctx.arc(66, 312, 5.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#E2E8F0';
  ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Liquid Fixed Deposit', 82, 317);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('₹2,000 (20%)', w - 58, 317);
  ctx.textAlign = 'left';

  ctx.fillStyle = '#162032';
  drawRoundRect(ctx, 58, 332, sliderWidth, 12, 6, true, false);
  ctx.fillStyle = '#10B981';
  drawRoundRect(ctx, 58, 332, sliderWidth * 0.2, 12, 6, true, false);

  // Prudent Diversification Metric Box
  ctx.fillStyle = '#10172A';
  drawRoundRect(ctx, 58, 380, sliderWidth, 96, 16, true, true, '#1E293B', 1);

  drawShieldIcon(ctx, 86, 412, '#3B82F6');

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Prudent Diversification Metric', 114, 416);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Equity: 50% | Defensive: 50%. Complies with beginner safety guardrails.', 114, 444);

  // Footer
  ctx.strokeStyle = '#1E293B';
  ctx.beginPath();
  ctx.moveTo(58, 502);
  ctx.lineTo(w - 58, 502);
  ctx.stroke();

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Virtual Capital: ', 58, 538);

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('₹10,000', 160, 538);

  // White Pill Button
  const btnW = 230;
  const btnH = 46;
  ctx.fillStyle = '#FFFFFF';
  drawRoundRect(ctx, w - 58 - btnW, 515, btnW, btnH, 23, true, false);

  ctx.fillStyle = '#0A1629';
  ctx.font = '700 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Launch Full Sandbox →', w - 58 - btnW / 2, 543);
  ctx.textAlign = 'left';
}

function renderCurriculumDashboard(ctx, w, h) {
  // Radiant Cyan/Blue frame
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#0284C7');
  grad.addColorStop(0.5, '#0369A1');
  grad.addColorStop(1, '#059669');
  ctx.fillStyle = grad;
  drawRoundRect(ctx, 0, 0, w, h, 36, true, false);

  ctx.fillStyle = '#080E1B';
  drawRoundRect(ctx, 22, 22, w - 44, h - 44, 28, true, true, 'rgba(255, 255, 255, 0.08)', 1.5);

  // Header
  ctx.fillStyle = '#0C2340';
  drawRoundRect(ctx, 58, 54, 58, 58, 14, true, true, '#1E3A8A', 1);
  drawBookIcon(ctx, 87, 83, '#38BDF8');

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Foundation Curriculum', 132, 78);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Topic 1 of 7: Cashflow & Compounding Mechanics', 132, 102);

  // Status Pill
  ctx.fillStyle = 'rgba(56, 189, 248, 0.12)';
  drawRoundRect(ctx, w - 210, 60, 152, 38, 19, true, true, '#0284C7', 1.5);
  drawCheckIcon(ctx, w - 188, 79, '#38BDF8');
  ctx.fillStyle = '#38BDF8';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('28 Lessons Ready', w - 172, 84);

  // Divider
  ctx.strokeStyle = '#1E293B';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(58, 130);
  ctx.lineTo(w - 58, 130);
  ctx.stroke();

  const sliderWidth = w - 116;

  // Lesson 1.1 (Completed)
  ctx.fillStyle = '#10B981';
  ctx.beginPath();
  ctx.arc(66, 168, 5.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#E2E8F0';
  ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Lesson 1.1: Why Saving Cash Guarantees Loss', 82, 173);
  ctx.fillStyle = '#34D399';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('✓ Completed (100%)', w - 58, 173);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#162032';
  drawRoundRect(ctx, 58, 188, sliderWidth, 12, 6, true, false);
  ctx.fillStyle = '#10B981';
  drawRoundRect(ctx, 58, 188, sliderWidth, 12, 6, true, false);

  // Lesson 1.2 (Active)
  ctx.fillStyle = '#38BDF8';
  ctx.beginPath();
  ctx.arc(66, 240, 5.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#E2E8F0';
  ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Lesson 1.2: Rule of 72 & The Math of Doubling', 82, 245);
  ctx.fillStyle = '#38BDF8';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('Current Lesson • 65%', w - 58, 245);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#162032';
  drawRoundRect(ctx, 58, 260, sliderWidth, 12, 6, true, false);
  ctx.fillStyle = '#38BDF8';
  drawRoundRect(ctx, 58, 260, sliderWidth * 0.65, 12, 6, true, false);
  ctx.fillStyle = '#BAE6FD';
  drawRoundRect(ctx, 58 + sliderWidth * 0.65 - 4, 255, 8, 22, 4, true, false);

  // Lesson 1.3 (Up Next)
  ctx.fillStyle = '#64748B';
  ctx.beginPath();
  ctx.arc(66, 312, 5.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#94A3B8';
  ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Lesson 1.3: Asset Classes: Equity, Debt, Gold & Liquid', 82, 317);
  ctx.fillStyle = '#64748B';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('Locked • 10 Mins', w - 58, 317);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#162032';
  drawRoundRect(ctx, 58, 332, sliderWidth, 12, 6, true, false);

  // Curriculum Metric Box
  ctx.fillStyle = '#0F1D33';
  drawRoundRect(ctx, 58, 380, sliderWidth, 96, 16, true, true, '#1E3A8A', 1);
  drawBookIcon(ctx, 86, 412, '#38BDF8');
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Progressive Pedagogy: 0% Jargon, 100% Practical Signal', 114, 416);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Step-by-step verified modules build real intuition before risking any capital.', 114, 444);

  // Footer
  ctx.strokeStyle = '#1E293B';
  ctx.beginPath();
  ctx.moveTo(58, 502);
  ctx.lineTo(w - 58, 502);
  ctx.stroke();

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Course Outline: ', 58, 538);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('7 Core Topics', 170, 538);

  const btnW = 230;
  const btnH = 46;
  ctx.fillStyle = '#FFFFFF';
  drawRoundRect(ctx, w - 58 - btnW, 515, btnW, btnH, 23, true, false);
  ctx.fillStyle = '#0A1629';
  ctx.font = '700 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Explore Curriculum →', w - 58 - btnW / 2, 543);
  ctx.textAlign = 'left';
}

function renderAssessmentDashboard(ctx, w, h) {
  // Vibrant Purple / Indigo Frame
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#7C3AED');
  grad.addColorStop(0.5, '#6366F1');
  grad.addColorStop(1, '#4338CA');
  ctx.fillStyle = grad;
  drawRoundRect(ctx, 0, 0, w, h, 36, true, false);

  ctx.fillStyle = '#0E0C20';
  drawRoundRect(ctx, 22, 22, w - 44, h - 44, 28, true, true, 'rgba(255, 255, 255, 0.08)', 1.5);

  // Header
  ctx.fillStyle = '#23184E';
  drawRoundRect(ctx, 58, 54, 58, 58, 14, true, true, '#4338CA', 1);
  drawTargetIcon(ctx, 87, 83, '#A855F7');

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Concept Assessment Engine', 132, 78);

  ctx.fillStyle = '#C4B5FD';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Scenario Diagnostic & Cognitive Trap Detection', 132, 102);

  // Status Pill
  ctx.fillStyle = 'rgba(192, 132, 252, 0.12)';
  drawRoundRect(ctx, w - 210, 60, 152, 38, 19, true, true, '#7C3AED', 1.5);
  drawCheckIcon(ctx, w - 188, 79, '#C084FC');
  ctx.fillStyle = '#C084FC';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Calibrated Score', w - 172, 84);

  // Divider
  ctx.strokeStyle = '#2E1065';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(58, 130);
  ctx.lineTo(w - 58, 130);
  ctx.stroke();

  const sliderWidth = w - 116;

  // Scenario Question Box
  ctx.fillStyle = '#181335';
  drawRoundRect(ctx, 58, 150, sliderWidth, 68, 14, true, true, '#2E1065', 1);
  ctx.fillStyle = '#FAF5FF';
  ctx.font = '600 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Scenario: Inflation is 7% and an FD yields 6%. Over 10 years, your real purchasing power:', 76, 189);

  // Option A (Trap)
  ctx.fillStyle = 'rgba(239, 68, 68, 0.12)';
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
  ctx.fillStyle = 'rgba(16, 185, 129, 0.14)';
  drawRoundRect(ctx, 58, 296, sliderWidth, 54, 12, true, true, 'rgba(16, 185, 129, 0.5)', 1);
  ctx.fillStyle = '#6EE7B7';
  ctx.font = '600 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('B) Decreases by ~1% annually (-9.5% purchasing loss)', 76, 328);
  ctx.fillStyle = '#34D399';
  ctx.font = '700 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('✓ Verified Correct', w - 76, 328);
  ctx.textAlign = 'left';

  // Debiasing Metric Box
  ctx.fillStyle = '#16132D';
  drawRoundRect(ctx, 58, 380, sliderWidth, 96, 16, true, true, '#3730A3', 1);
  drawTargetIcon(ctx, 86, 412, '#A855F7');
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Cognitive Debiasing Engine: Real Understanding Over Lucky Guesses', 114, 416);
  ctx.fillStyle = '#C4B5FD';
  ctx.font = '400 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Surfaces hidden cognitive biases like inflation illusion before you invest real funds.', 114, 444);

  // Footer
  ctx.strokeStyle = '#2E1065';
  ctx.beginPath();
  ctx.moveTo(58, 502);
  ctx.lineTo(w - 58, 502);
  ctx.stroke();

  ctx.fillStyle = '#C4B5FD';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Diagnostic Duration: ', 58, 538);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('5 Minutes • Instant Snapshot', 215, 538);

  const btnW = 230;
  const btnH = 46;
  ctx.fillStyle = '#FFFFFF';
  drawRoundRect(ctx, w - 58 - btnW, 515, btnW, btnH, 23, true, false);
  ctx.fillStyle = '#0A1629';
  ctx.font = '700 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Test Your Baseline →', w - 58 - btnW / 2, 543);
  ctx.textAlign = 'left';
}

function renderFinnCoachDashboard(ctx, w, h) {
  // Electric Blue Frame
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#2563EB');
  grad.addColorStop(0.5, '#1D4ED8');
  grad.addColorStop(1, '#1E3A8A');
  ctx.fillStyle = grad;
  drawRoundRect(ctx, 0, 0, w, h, 36, true, false);

  ctx.fillStyle = '#080D1A';
  drawRoundRect(ctx, 22, 22, w - 44, h - 44, 28, true, true, 'rgba(255, 255, 255, 0.08)', 1.5);

  // Header
  ctx.fillStyle = '#0F2447';
  drawRoundRect(ctx, 58, 54, 58, 58, 14, true, true, '#1E3A8A', 1);
  drawBotIcon(ctx, 87, 83, '#60A5FA');

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Finn — Socratic AI Financial Coach', 132, 78);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Strictly Socratic Reasoning • Zero Sales Pitches', 132, 102);

  // Status Pill
  ctx.fillStyle = 'rgba(37, 99, 235, 0.15)';
  drawRoundRect(ctx, w - 194, 60, 136, 38, 19, true, true, '#2563EB', 1.5);
  ctx.fillStyle = '#10B981';
  ctx.beginPath();
  ctx.arc(w - 172, 79, 4.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#60A5FA';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('AI Active 24/7', w - 156, 84);

  // Divider
  ctx.strokeStyle = '#1E293B';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(58, 130);
  ctx.lineTo(w - 58, 130);
  ctx.stroke();

  const sliderWidth = w - 116;

  // User chat bubble (right aligned)
  const userBubbleW = 680;
  ctx.fillStyle = '#1E293B';
  drawRoundRect(ctx, w - 58 - userBubbleW, 150, userBubbleW, 58, 16, true, true, '#334155', 1);
  ctx.fillStyle = '#F8FAFC';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Should I invest all my savings in this hot trending stock right now?', w - 58 - userBubbleW + 20, 184);

  // Finn AI chat bubble (left aligned)
  const finnBubbleW = 840;
  ctx.fillStyle = '#0F1E36';
  drawRoundRect(ctx, 58, 222, finnBubbleW, 82, 16, true, true, '#1D4ED8', 1.5);
  ctx.fillStyle = '#60A5FA';
  ctx.font = '700 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Finn (AI Coach)', 78, 248);
  ctx.fillStyle = '#E2E8F0';
  ctx.font = '400 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Let’s pause. Do you have a 6-month liquid emergency fund in place first? Without liquidity,', 78, 272);
  ctx.fillText('normal market drawdowns can force you to sell at the worst possible time.', 78, 292);

  // Chip suggestion
  ctx.fillStyle = '#13233C';
  drawRoundRect(ctx, 58, 318, 420, 38, 19, true, true, '#1D4ED8', 1);
  ctx.fillStyle = '#93C5FD';
  ctx.font = '600 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('💡 How do I calculate emergency liquidity ratio?', 76, 342);

  // Socratic Metric Box
  ctx.fillStyle = '#0F172A';
  drawRoundRect(ctx, 58, 380, sliderWidth, 96, 16, true, true, '#1E293B', 1);
  drawShieldIcon(ctx, 86, 412, '#60A5FA');
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Socratic Pedagogical Guardrails: Zero Speculation, Pure Education', 114, 416);
  ctx.fillStyle = '#94A3B8';
  ctx.font = '400 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Finn teaches you HOW to reason through financial dilemmas without ever selling products.', 114, 444);

  // Footer
  ctx.strokeStyle = '#1E293B';
  ctx.beginPath();
  ctx.moveTo(58, 502);
  ctx.lineTo(w - 58, 502);
  ctx.stroke();

  ctx.fillStyle = '#94A3B8';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Pedagogy Model: ', 58, 538);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Socratic Dialogue', 180, 538);

  const btnW = 230;
  const btnH = 46;
  ctx.fillStyle = '#FFFFFF';
  drawRoundRect(ctx, w - 58 - btnW, 515, btnW, btnH, 23, true, false);
  ctx.fillStyle = '#0A1629';
  ctx.font = '700 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Chat With Finn →', w - 58 - btnW / 2, 543);
  ctx.textAlign = 'left';
}

function renderBadgesDashboard(ctx, w, h) {
  // Radiant Gold Frame
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#F59E0B');
  grad.addColorStop(0.5, '#D97706');
  grad.addColorStop(1, '#B45309');
  ctx.fillStyle = grad;
  drawRoundRect(ctx, 0, 0, w, h, 36, true, false);

  ctx.fillStyle = '#140F05';
  drawRoundRect(ctx, 22, 22, w - 44, h - 44, 28, true, true, 'rgba(255, 255, 255, 0.08)', 1.5);

  // Header
  ctx.fillStyle = '#3B280A';
  drawRoundRect(ctx, 58, 54, 58, 58, 14, true, true, '#78350F', 1);
  drawTrophyIcon(ctx, 87, 83, '#FBBF24');

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Verified Competence Badges', 132, 78);

  ctx.fillStyle = '#FCD34D';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Evidence-Based Proof of Financial Competence', 132, 102);

  // Status Pill
  ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
  drawRoundRect(ctx, w - 194, 60, 136, 38, 19, true, true, '#D97706', 1.5);
  ctx.fillStyle = '#FBBF24';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('★ Tier 2 Mastered', w - 176, 84);

  // Divider
  ctx.strokeStyle = '#451A03';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(58, 130);
  ctx.lineTo(w - 58, 130);
  ctx.stroke();

  const sliderWidth = w - 116;

  // Badge 1 (Verified Gold)
  ctx.fillStyle = '#FBBF24';
  ctx.beginPath();
  ctx.arc(66, 168, 5.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#FEF3C7';
  ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Liquidity Preservation Guard', 82, 173);
  ctx.fillStyle = '#FBBF24';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('✓ Verified • Score 96%', w - 58, 173);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#261805';
  drawRoundRect(ctx, 58, 188, sliderWidth, 12, 6, true, false);
  ctx.fillStyle = '#FBBF24';
  drawRoundRect(ctx, 58, 188, sliderWidth * 0.96, 12, 6, true, false);

  // Badge 2 (Verified Silver)
  ctx.fillStyle = '#F59E0B';
  ctx.beginPath();
  ctx.arc(66, 240, 5.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#FEF3C7';
  ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Compounding & Time Horizon Master', 82, 245);
  ctx.fillStyle = '#F59E0B';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('✓ Verified • Score 88%', w - 58, 245);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#261805';
  drawRoundRect(ctx, 58, 260, sliderWidth, 12, 6, true, false);
  ctx.fillStyle = '#F59E0B';
  drawRoundRect(ctx, 58, 260, sliderWidth * 0.88, 12, 6, true, false);

  // Badge 3 (In Progress)
  ctx.fillStyle = '#92400E';
  ctx.beginPath();
  ctx.arc(66, 312, 5.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#D97706';
  ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Concentration Risk Guardrail Specialist', 82, 317);
  ctx.fillStyle = '#F59E0B';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('⏳ In Progress • 2/3 Passed', w - 58, 317);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#261805';
  drawRoundRect(ctx, 58, 332, sliderWidth, 12, 6, true, false);
  ctx.fillStyle = '#92400E';
  drawRoundRect(ctx, 58, 332, sliderWidth * 0.66, 12, 6, true, false);

  // Metric Box
  ctx.fillStyle = '#211403';
  drawRoundRect(ctx, 58, 380, sliderWidth, 96, 16, true, true, '#78350F', 1);
  drawTrophyIcon(ctx, 86, 412, '#FBBF24');
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Verifiable Proof: Certified Understanding Before Market Exposure', 114, 416);
  ctx.fillStyle = '#FCD34D';
  ctx.font = '400 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Earn on-chain credentials and competency milestones by mastering fundamental modules.', 114, 444);

  // Footer
  ctx.strokeStyle = '#451A03';
  ctx.beginPath();
  ctx.moveTo(58, 502);
  ctx.lineTo(w - 58, 502);
  ctx.stroke();

  ctx.fillStyle = '#FCD34D';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Badges Earned: ', 58, 538);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('2 of 5 Verified', 170, 538);

  const btnW = 230;
  const btnH = 46;
  ctx.fillStyle = '#FFFFFF';
  drawRoundRect(ctx, w - 58 - btnW, 515, btnW, btnH, 23, true, false);
  ctx.fillStyle = '#0A1629';
  ctx.font = '700 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('View Verified Badges →', w - 58 - btnW / 2, 543);
  ctx.textAlign = 'left';
}

function renderHabitsDashboard(ctx, w, h) {
  // Indigo / Violet Frame
  const grad = ctx.createLinearGradient(0, 0, w, h);
  grad.addColorStop(0, '#6366F1');
  grad.addColorStop(0.5, '#4F46E5');
  grad.addColorStop(1, '#312E81');
  ctx.fillStyle = grad;
  drawRoundRect(ctx, 0, 0, w, h, 36, true, false);

  ctx.fillStyle = '#0C0E1E';
  drawRoundRect(ctx, 22, 22, w - 44, h - 44, 28, true, true, 'rgba(255, 255, 255, 0.08)', 1.5);

  // Header
  ctx.fillStyle = '#1E1B4B';
  drawRoundRect(ctx, 58, 54, 58, 58, 14, true, true, '#312E81', 1);
  drawSparkleIcon(ctx, 87, 83, '#A5B4FC');

  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Disciplined Investor Profile', 132, 78);

  ctx.fillStyle = '#C7D2FE';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Lifelong Financial Autonomy & Anti-FOMO Guardrails', 132, 102);

  // Status Pill
  ctx.fillStyle = 'rgba(99, 102, 241, 0.15)';
  drawRoundRect(ctx, w - 210, 60, 152, 38, 19, true, true, '#4F46E5', 1.5);
  drawCheckIcon(ctx, w - 188, 79, '#818CF8');
  ctx.fillStyle = '#818CF8';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Graduation Ready', w - 172, 84);

  // Divider
  ctx.strokeStyle = '#1E1B4B';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(58, 130);
  ctx.lineTo(w - 58, 130);
  ctx.stroke();

  const sliderWidth = w - 116;

  // Habit 1
  ctx.fillStyle = '#818CF8';
  ctx.beginPath();
  ctx.arc(66, 168, 5.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#E0E7FF';
  ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Mandatory Trade Rationale Reflection', 82, 173);
  ctx.fillStyle = '#818CF8';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('✓ Active (Anti-Impulse)', w - 58, 173);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#17153B';
  drawRoundRect(ctx, 58, 188, sliderWidth, 12, 6, true, false);
  ctx.fillStyle = '#818CF8';
  drawRoundRect(ctx, 58, 188, sliderWidth, 12, 6, true, false);

  // Habit 2
  ctx.fillStyle = '#6366F1';
  ctx.beginPath();
  ctx.arc(66, 240, 5.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#E0E7FF';
  ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('20% Single Asset Concentration Guardrail', 82, 245);
  ctx.fillStyle = '#6366F1';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('✓ Guardrail Enforced', w - 58, 245);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#17153B';
  drawRoundRect(ctx, 58, 260, sliderWidth, 12, 6, true, false);
  ctx.fillStyle = '#6366F1';
  drawRoundRect(ctx, 58, 260, sliderWidth, 12, 6, true, false);

  // Habit 3
  ctx.fillStyle = '#A5B4FC';
  ctx.beginPath();
  ctx.arc(66, 312, 5.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#E0E7FF';
  ctx.font = '600 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Market Noise & FOMO Psychological Filter', 82, 317);
  ctx.fillStyle = '#A5B4FC';
  ctx.font = '700 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('✓ 100% Calibrated', w - 58, 317);
  ctx.textAlign = 'left';
  ctx.fillStyle = '#17153B';
  drawRoundRect(ctx, 58, 332, sliderWidth, 12, 6, true, false);
  ctx.fillStyle = '#A5B4FC';
  drawRoundRect(ctx, 58, 332, sliderWidth, 12, 6, true, false);

  // Metric Box
  ctx.fillStyle = '#131130';
  drawRoundRect(ctx, 58, 380, sliderWidth, 96, 16, true, true, '#312E81', 1);
  drawSparkleIcon(ctx, 86, 412, '#A5B4FC');
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Permanent Financial Autonomy: Invest With Lifelong Discipline', 114, 416);
  ctx.fillStyle = '#C7D2FE';
  ctx.font = '400 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('You graduate with verified confidence, immunity against market noise, and clear reasoning.', 114, 444);

  // Footer
  ctx.strokeStyle = '#1E1B4B';
  ctx.beginPath();
  ctx.moveTo(58, 502);
  ctx.lineTo(w - 58, 502);
  ctx.stroke();

  ctx.fillStyle = '#C7D2FE';
  ctx.font = '500 15px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('Readiness Status: ', 58, 538);
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '700 16px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('100% Prepared for Markets', 185, 538);

  const btnW = 230;
  const btnH = 46;
  ctx.fillStyle = '#FFFFFF';
  drawRoundRect(ctx, w - 58 - btnW, 515, btnW, btnH, 23, true, false);
  ctx.fillStyle = '#0A1629';
  ctx.font = '700 14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('Start For Free →', w - 58 - btnW / 2, 543);
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
      renderCurriculumDashboard(ctx, canvas.width, canvas.height);
      break;
    case '02':
      renderAssessmentDashboard(ctx, canvas.width, canvas.height);
      break;
    case '03':
      renderSandboxDashboard(ctx, canvas.width, canvas.height);
      break;
    case '04':
      renderFinnCoachDashboard(ctx, canvas.width, canvas.height);
      break;
    case '05':
      renderBadgesDashboard(ctx, canvas.width, canvas.height);
      break;
    case '06':
    default:
      renderHabitsDashboard(ctx, canvas.width, canvas.height);
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

  // Generate crisp procedural dashboard canvas texture
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
      {/* 3D Dark Beveled Backplate with Depth */}
      <RoundedBox
        args={[cardWidth, cardHeight, 0.16]}
        radius={cardRadius}
        smoothness={16}
        position={[0, 0, -0.08]}
      >
        <meshStandardMaterial
          color="#070A11"
          roughness={0.35}
          metalness={0.3}
        />
      </RoundedBox>

      {/* Front Face with High-Fidelity UI Texture */}
      <mesh position={[0, 0, 0.005]}>
        <planeGeometry args={[cardWidth, cardHeight]} />
        {texture && <meshBasicMaterial map={texture} toneMapped={false} />}
      </mesh>
    </group>
  );
}
