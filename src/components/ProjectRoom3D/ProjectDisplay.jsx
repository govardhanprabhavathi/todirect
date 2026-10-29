"use client";

import React, { useRef, useState, useMemo } from 'react';
import { Text, RoundedBox } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Generates a rounded rectangle ShapeGeometry with normalized [0, 1] UVs
function createRoundedRectGeometry(width, height, radius, segments = 24) {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;
  const w = width;
  const h = height;
  const r = radius;

  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);

  const geom = new THREE.ShapeGeometry(shape, segments);
  const pos = geom.attributes.position;
  const uvs = [];
  for (let i = 0; i < pos.count; i++) {
    const px = pos.getX(i);
    const py = pos.getY(i);
    uvs.push((px - x) / w, (py - y) / h);
  }
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  return geom;
}

function createRoundedRectPlane(w, h, r, segments = 16) {
  const shape = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;

  shape.moveTo(x + r, y);
  shape.lineTo(x + w - r, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + r);
  shape.lineTo(x + w, y + h - r);
  shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  shape.lineTo(x + r, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - r);
  shape.lineTo(x, y + r);
  shape.quadraticCurveTo(x, y, x + r, y);

  return new THREE.ShapeGeometry(shape, segments);
}

// Procedural high-resolution luxury card texture generator (zero network latency, 100% reliable)
function createCardCanvasTexture(accentColor, secondaryColor, category, number) {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 700;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Base luxury gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 1200, 700);
  bgGrad.addColorStop(0, '#FFFFFF');
  bgGrad.addColorStop(0.5, '#F8FAFC');
  bgGrad.addColorStop(1, '#EEF2F6');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1200, 700);

  // Radiant ambient color orbs
  const rad1 = ctx.createRadialGradient(1000, 180, 20, 1000, 180, 480);
  rad1.addColorStop(0, accentColor);
  rad1.addColorStop(0.8, 'transparent');
  ctx.fillStyle = rad1;
  ctx.fillRect(0, 0, 1200, 700);

  const rad2 = ctx.createRadialGradient(200, 520, 20, 200, 520, 400);
  rad2.addColorStop(0, secondaryColor);
  rad2.addColorStop(0.75, 'transparent');
  ctx.fillStyle = rad2;
  ctx.fillRect(0, 0, 1200, 700);

  // Subtle interior grid lines
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.04)';
  ctx.lineWidth = 1;
  for (let x = 60; x < 1200; x += 60) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 700);
    ctx.stroke();
  }
  for (let y = 60; y < 700; y += 60) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1200, y);
    ctx.stroke();
  }

  // Card border outline
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
  ctx.lineWidth = 3;
  ctx.strokeRect(16, 16, 1168, 668);

  // Category Tag badge
  ctx.fillStyle = 'rgba(10, 22, 41, 0.05)';
  ctx.beginPath();
  ctx.roundRect(60, 55, 340, 44, 22);
  ctx.fill();

  ctx.strokeStyle = 'rgba(37, 99, 235, 0.2)';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.fillStyle = '#2563FF';
  ctx.font = 'bold 16px sans-serif';
  ctx.fillText(category.toUpperCase(), 80, 83);

  // Giant watermark number in top right
  ctx.fillStyle = 'rgba(10, 22, 41, 0.05)';
  ctx.font = '900 130px sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(number, 1140, 140);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  return texture;
}

export default function ProjectDisplay({ project, position, rotation = [0, 0, 0], isMobile = false }) {
  const [btnHovered, setBtnHovered] = useState(false);
  const btnGroupRef = useRef(null);
  const btnScaleRef = useRef(1);

  // Generate crisp luxury procedural texture for the front face
  const texture = useMemo(() => {
    return createCardCanvasTexture(
      project.accent || 'rgba(56, 189, 248, 0.35)',
      project.secondary || 'rgba(37, 99, 235, 0.2)',
      project.category || 'Feature',
      project.number || '01'
    );
  }, [project]);

  const cardWidth = isMobile ? 6.4 : 12.8;
  const cardHeight = isMobile ? 8.0 : 7.2;
  const cardRadius = isMobile ? 0.28 : 0.36;

  const frontGeo = useMemo(() => {
    return createRoundedRectGeometry(cardWidth, cardHeight, cardRadius, 32);
  }, [cardWidth, cardHeight, cardRadius]);

  const contentStartX = 0.55;
  const contentWidth = 5.25;

  useFrame((_, delta) => {
    if (btnGroupRef.current) {
      const targetScale = btnHovered ? 1.04 : 1.0;
      btnScaleRef.current = THREE.MathUtils.damp(btnScaleRef.current, targetScale, 10, delta);
      btnGroupRef.current.scale.set(btnScaleRef.current, btnScaleRef.current, 1);
    }
  });

  const btnWidth = isMobile ? 5.0 : contentWidth;
  const btnHeight = isMobile ? 0.68 : 0.74;
  const btnGeo = useMemo(() => createRoundedRectPlane(btnWidth, btnHeight, 0.12, 16), [btnWidth, btnHeight]);

  return (
    <group position={position} rotation={rotation} scale={isMobile ? 0.72 : 1}>
      {/* 3D Dark Backplate */}
      <RoundedBox args={[cardWidth, cardHeight, 0.12]} radius={cardRadius} smoothness={16} position={[0, 0, -0.06]}>
        <meshStandardMaterial color="#0a0a0e" roughness={0.5} metalness={0.1} />
      </RoundedBox>

      {/* Front Face with Background Texture */}
      <mesh geometry={frontGeo} position={[0, 0, 0.005]}>
        {texture && <meshBasicMaterial map={texture} toneMapped={false} />}
      </mesh>

      {/* Content Text & Button Overlay */}
      <group position={[0, 0, 0.025]}>
        {/* Project Name / Feature Title */}
        <Text
          position={[isMobile ? -2.5 : contentStartX, isMobile ? 2.3 : 1.44, 0.015]}
          fontSize={isMobile ? 0.48 : 0.62}
          color="#0A1629"
          anchorX="left"
          anchorY="middle"
          letterSpacing={-0.03}
        >
          {project.name.toUpperCase()}
        </Text>

        {/* Feature Description */}
        <Text
          position={[isMobile ? -2.5 : contentStartX, isMobile ? 1.7 : 0.66, 0.015]}
          fontSize={isMobile ? 0.2 : 0.22}
          color="#334155"
          anchorX="left"
          anchorY="top"
          maxWidth={isMobile ? 5.0 : contentWidth}
          lineHeight={1.45}
        >
          {project.desc}
        </Text>

        {/* Interactive Action Button */}
        <group
          ref={btnGroupRef}
          position={[isMobile ? 0 : contentStartX + btnWidth / 2, isMobile ? -0.45 : -2.05, 0.015]}
          onPointerOver={(e) => {
            e.stopPropagation();
            setBtnHovered(true);
            if (typeof document !== 'undefined') document.body.style.cursor = 'pointer';
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            setBtnHovered(false);
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
          <mesh geometry={btnGeo} position={[0, 0, 0]}>
            <meshBasicMaterial color={btnHovered ? '#1E293B' : '#0A1629'} toneMapped={false} />
          </mesh>
          <Text position={[0, 0, 0.012]} fontSize={0.24} color="#FFFFFF" anchorX="center" anchorY="middle">
            {project.buttonLabel.toUpperCase()}
          </Text>
        </group>
      </group>
    </group>
  );
}
