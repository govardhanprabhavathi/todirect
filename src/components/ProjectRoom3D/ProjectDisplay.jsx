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

// Procedural high-resolution luxury card texture generator
function createCardCanvasTexture(accentColor, secondaryColor, number) {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 1280;
  canvas.height = 720;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  // Base background: clean bright luxury gradient
  const bgGrad = ctx.createLinearGradient(0, 0, 1280, 720);
  bgGrad.addColorStop(0, '#FFFFFF');
  bgGrad.addColorStop(0.6, '#F8FAFC');
  bgGrad.addColorStop(1, '#EEF2F6');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 1280, 720);

  // Soft radiant color bloom in top right
  const rad1 = ctx.createRadialGradient(1080, 160, 20, 1080, 160, 520);
  rad1.addColorStop(0, accentColor);
  rad1.addColorStop(0.85, 'transparent');
  ctx.fillStyle = rad1;
  ctx.fillRect(0, 0, 1280, 720);

  // Secondary subtle color bloom in bottom left
  const rad2 = ctx.createRadialGradient(180, 580, 20, 180, 580, 420);
  rad2.addColorStop(0, secondaryColor);
  rad2.addColorStop(0.8, 'transparent');
  ctx.fillStyle = rad2;
  ctx.fillRect(0, 0, 1280, 720);

  // Subtle interior blueprint grid
  ctx.strokeStyle = 'rgba(15, 23, 42, 0.035)';
  ctx.lineWidth = 1;
  for (let x = 64; x < 1280; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 720);
    ctx.stroke();
  }
  for (let y = 64; y < 720; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(1280, y);
    ctx.stroke();
  }

  // Refined card border outline
  ctx.strokeStyle = 'rgba(15, 23, 42, 0.09)';
  ctx.lineWidth = 3;
  ctx.strokeRect(16, 16, 1248, 688);

  // Giant watermark feature number in top right corner
  ctx.fillStyle = 'rgba(15, 23, 42, 0.045)';
  ctx.font = '900 160px sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(number, 1220, 160);

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

  // Generate crisp procedural card texture
  const texture = useMemo(() => {
    return createCardCanvasTexture(
      project.accent || 'rgba(56, 189, 248, 0.35)',
      project.secondary || 'rgba(37, 99, 235, 0.2)',
      project.number || '01'
    );
  }, [project]);

  // Card Dimensions
  const cardWidth = isMobile ? 6.4 : 12.8;
  const cardHeight = isMobile ? 8.2 : 7.2;
  const cardRadius = isMobile ? 0.32 : 0.42;

  const frontGeo = useMemo(() => {
    return createRoundedRectGeometry(cardWidth, cardHeight, cardRadius, 32);
  }, [cardWidth, cardHeight, cardRadius]);

  // Precise text layout bounds covering the whole card properly:
  // Starts on the left edge with healthy padding, stays completely within card margins!
  const contentStartX = isMobile ? -2.6 : -5.4;
  const maxTextWidth = isMobile ? 5.2 : 10.4;

  useFrame((_, delta) => {
    if (btnGroupRef.current) {
      const targetScale = btnHovered ? 1.04 : 1.0;
      btnScaleRef.current = THREE.MathUtils.damp(btnScaleRef.current, targetScale, 10, delta);
      btnGroupRef.current.scale.set(btnScaleRef.current, btnScaleRef.current, 1);
    }
  });

  const btnWidth = isMobile ? 5.0 : 4.4;
  const btnHeight = isMobile ? 0.72 : 0.78;
  const btnGeo = useMemo(() => createRoundedRectPlane(btnWidth, btnHeight, 0.14, 16), [btnWidth, btnHeight]);

  return (
    <group position={position} rotation={rotation} scale={isMobile ? 0.76 : 1}>
      {/* 3D Dark Backplate with Depth */}
      <RoundedBox args={[cardWidth, cardHeight, 0.14]} radius={cardRadius} smoothness={16} position={[0, 0, -0.07]}>
        <meshStandardMaterial color="#0A0E17" roughness={0.4} metalness={0.2} />
      </RoundedBox>

      {/* Front Face with Background Texture */}
      <mesh geometry={frontGeo} position={[0, 0, 0.005]}>
        {texture && <meshBasicMaterial map={texture} toneMapped={false} />}
      </mesh>

      {/* Content Text & Button Overlay (Centered & Left-Aligned within Card Bounds) */}
      <group position={[0, 0, 0.025]}>
        {/* Category Tag Badge */}
        <Text
          position={[contentStartX, isMobile ? 2.8 : 2.4, 0.015]}
          fontSize={isMobile ? 0.2 : 0.24}
          color="#2563FF"
          anchorX="left"
          anchorY="middle"
          letterSpacing={0.06}
        >
          {project.category.toUpperCase()}
        </Text>

        {/* Feature Title (Bold & Properly Placed) */}
        <Text
          position={[contentStartX, isMobile ? 2.0 : 1.55, 0.015]}
          fontSize={isMobile ? 0.44 : 0.62}
          color="#0A1629"
          anchorX="left"
          anchorY="middle"
          letterSpacing={-0.03}
          maxWidth={maxTextWidth}
        >
          {project.name.toUpperCase()}
        </Text>

        {/* Feature Description */}
        <Text
          position={[contentStartX, isMobile ? 1.2 : 0.7, 0.015]}
          fontSize={isMobile ? 0.2 : 0.26}
          color="#334155"
          anchorX="left"
          anchorY="top"
          maxWidth={maxTextWidth}
          lineHeight={1.5}
        >
          {project.desc}
        </Text>

        {/* Highlights / Tech Badges Line */}
        {project.tech && (
          <Text
            position={[contentStartX, isMobile ? -0.7 : -0.9, 0.015]}
            fontSize={isMobile ? 0.17 : 0.2}
            color="#64748B"
            anchorX="left"
            anchorY="middle"
            maxWidth={maxTextWidth}
            letterSpacing={0.02}
          >
            {project.tech.join("  •  ")}
          </Text>
        )}

        {/* Action Button */}
        <group
          ref={btnGroupRef}
          position={[
            isMobile ? 0 : contentStartX + btnWidth / 2,
            isMobile ? -2.4 : -2.1,
            0.015
          ]}
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
          <Text position={[0, 0, 0.012]} fontSize={0.22} color="#FFFFFF" anchorX="center" anchorY="middle">
            {project.buttonLabel.toUpperCase()}
          </Text>
        </group>
      </group>
    </group>
  );
}
