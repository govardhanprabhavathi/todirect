"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export function InteractiveGoldCoin() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 440;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    // Generous camera FOV and distance to prevent ANY bottom or edge clipping
    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0, 9.4);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.appendChild(renderer.domElement);

    // 2. High-Contrast Studio Environment Map for Realistic Gold Specular Sheen
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const envCanvas = document.createElement("canvas");
    envCanvas.width = 1024;
    envCanvas.height = 512;
    const envCtx = envCanvas.getContext("2d")!;
    const envGrad = envCtx.createLinearGradient(0, 0, 0, 512);
    envGrad.addColorStop(0, "#FFFDF5");
    envGrad.addColorStop(0.25, "#FDE68A");
    envGrad.addColorStop(0.6, "#D97706");
    envGrad.addColorStop(1, "#381402");
    envCtx.fillStyle = envGrad;
    envCtx.fillRect(0, 0, 1024, 512);

    // Primary High-Key Softbox (Top-Left Key Light Reflection)
    envCtx.fillStyle = "rgba(255, 255, 255, 1.0)";
    envCtx.beginPath();
    envCtx.ellipse(300, 130, 220, 95, -0.28, 0, Math.PI * 2);
    envCtx.fill();

    // Secondary Softbox (Right Rim Reflection)
    envCtx.fillStyle = "rgba(255, 255, 240, 0.85)";
    envCtx.beginPath();
    envCtx.ellipse(800, 200, 170, 75, 0.22, 0, Math.PI * 2);
    envCtx.fill();

    // Studio Horizon Light Strip
    const stripGrad = envCtx.createLinearGradient(0, 220, 1024, 220);
    stripGrad.addColorStop(0, "rgba(255, 255, 255, 0.1)");
    stripGrad.addColorStop(0.5, "rgba(255, 248, 220, 0.85)");
    stripGrad.addColorStop(1, "rgba(255, 255, 255, 0.1)");
    envCtx.fillStyle = stripGrad;
    envCtx.fillRect(0, 210, 1024, 20);

    const envTexture = new THREE.CanvasTexture(envCanvas);
    envTexture.mapping = THREE.EquirectangularReflectionMapping;
    const envMap = pmremGenerator.fromEquirectangular(envTexture).texture;
    scene.environment = envMap;
    pmremGenerator.dispose();
    envTexture.dispose();

    // 3. Studio 3-Point Lights (Rich 24K Gold Highlights)
    const keyLight = new THREE.DirectionalLight(0xfff8e8, 3.8);
    keyLight.position.set(-4.5, 5.5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xb0d0ff, 1.4);
    fillLight.position.set(4.5, -2.5, 3.5);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffeb99, 4.8);
    rimLight.position.set(5.5, 4.5, -3.5);
    scene.add(rimLight);

    const bounceLight = new THREE.DirectionalLight(0xffbe44, 1.6);
    bounceLight.position.set(0, -4.5, 2);
    scene.add(bounceLight);

    const ambientLight = new THREE.AmbientLight(0xfff2d4, 0.9);
    scene.add(ambientLight);

    // 4. Procedural Textures for Coin Face with Embossed Rupee (₹)
    const faceCanvas = document.createElement("canvas");
    faceCanvas.width = 2048;
    faceCanvas.height = 2048;
    const fCtx = faceCanvas.getContext("2d")!;
    const cx = 1024;
    const cy = 1024;
    const radius = 980;

    // Face Radial Gold Satin Gradient (Seamless, no harsh borders)
    const faceGrad = fCtx.createRadialGradient(cx - 240, cy - 260, 80, cx, cy, radius);
    faceGrad.addColorStop(0, "#FFFEEB");
    faceGrad.addColorStop(0.2, "#FDE68A");
    faceGrad.addColorStop(0.55, "#F59E0B");
    faceGrad.addColorStop(0.85, "#D97706");
    faceGrad.addColorStop(1, "#A65107");
    fCtx.fillStyle = faceGrad;
    fCtx.beginPath();
    fCtx.arc(cx, cy, radius, 0, Math.PI * 2);
    fCtx.fill();

    // Raised Outer Rim Highlight (Soft specular bevel, no dark line)
    const rimGrad = fCtx.createRadialGradient(cx, cy, radius - 80, cx, cy, radius);
    rimGrad.addColorStop(0, "rgba(255, 255, 255, 0)");
    rimGrad.addColorStop(0.5, "rgba(255, 255, 235, 0.4)");
    rimGrad.addColorStop(0.9, "rgba(255, 255, 255, 0.7)");
    rimGrad.addColorStop(1, "rgba(217, 119, 6, 0.2)");
    fCtx.fillStyle = rimGrad;
    fCtx.beginPath();
    fCtx.arc(cx, cy, radius, 0, Math.PI * 2);
    fCtx.fill();

    // Tangible Embossed Indian Rupee (₹) Symbol
    fCtx.textAlign = "center";
    fCtx.textBaseline = "middle";
    fCtx.font = "900 860px 'Inter', sans-serif, system-ui";

    // 3D Ambient Occlusion Shadow Underneath Rupee
    fCtx.fillStyle = "rgba(100, 42, 6, 0.7)";
    fCtx.fillText("₹", cx + 18, cy + 22);

    // Deep Inner Groove Shadow
    fCtx.fillStyle = "rgba(146, 64, 14, 0.5)";
    fCtx.fillText("₹", cx + 8, cy + 10);

    // Top-Left Specular Highlight Rim
    fCtx.fillStyle = "rgba(255, 255, 240, 0.95)";
    fCtx.fillText("₹", cx - 8, cy - 10);

    // Brilliant Metallic Body of Rupee Symbol
    const rupeeGrad = fCtx.createLinearGradient(0, cy - 430, 0, cy + 430);
    rupeeGrad.addColorStop(0, "#FFFFF7");
    rupeeGrad.addColorStop(0.22, "#FEF3C7");
    rupeeGrad.addColorStop(0.65, "#F59E0B");
    rupeeGrad.addColorStop(0.95, "#B45309");
    fCtx.fillStyle = rupeeGrad;
    fCtx.fillText("₹", cx, cy);

    const faceTexture = new THREE.CanvasTexture(faceCanvas);
    faceTexture.anisotropy = 16;

    // Face Bump Map for Real Tangible 3D Surface Relief
    const bumpCanvas = document.createElement("canvas");
    bumpCanvas.width = 2048;
    bumpCanvas.height = 2048;
    const bCtx = bumpCanvas.getContext("2d")!;
    bCtx.fillStyle = "#808080";
    bCtx.fillRect(0, 0, 2048, 2048);

    // Outer Beveled Rim Bump (Smooth rise, no hard cutoff)
    const rimBump = bCtx.createRadialGradient(cx, cy, radius - 90, cx, cy, radius);
    rimBump.addColorStop(0, "#808080");
    rimBump.addColorStop(0.6, "#c0c0c0");
    rimBump.addColorStop(0.95, "#f0f0f0");
    rimBump.addColorStop(1, "#808080");
    bCtx.fillStyle = rimBump;
    bCtx.beginPath();
    bCtx.arc(cx, cy, radius, 0, Math.PI * 2);
    bCtx.fill();

    // Rupee Bump (Sharp crisp embossing)
    bCtx.textAlign = "center";
    bCtx.textBaseline = "middle";
    bCtx.font = "900 860px 'Inter', sans-serif, system-ui";
    bCtx.fillStyle = "#ffffff";
    bCtx.fillText("₹", cx, cy);

    const faceBumpTexture = new THREE.CanvasTexture(bumpCanvas);
    faceBumpTexture.anisotropy = 16;

    // 5. Procedural Reeded Edge (Milled Coin Ridges)
    const reededCanvas = document.createElement("canvas");
    reededCanvas.width = 2048;
    reededCanvas.height = 128;
    const rCtx = reededCanvas.getContext("2d")!;
    rCtx.fillStyle = "#808080";
    rCtx.fillRect(0, 0, 2048, 128);

    const numReeds = 96;
    const reedWidth = 2048 / numReeds;
    for (let i = 0; i < numReeds; i++) {
      const rx = i * reedWidth;
      const reedGrad = rCtx.createLinearGradient(rx, 0, rx + reedWidth, 0);
      reedGrad.addColorStop(0, "#2b2b2b");
      reedGrad.addColorStop(0.35, "#cfcfcf");
      reedGrad.addColorStop(0.5, "#ffffff");
      reedGrad.addColorStop(0.65, "#cfcfcf");
      reedGrad.addColorStop(1, "#2b2b2b");
      rCtx.fillStyle = reedGrad;
      rCtx.fillRect(rx, 0, reedWidth, 128);
    }
    const reededBumpTexture = new THREE.CanvasTexture(reededCanvas);
    reededBumpTexture.wrapS = THREE.RepeatWrapping;
    reededBumpTexture.wrapT = THREE.ClampToEdgeWrapping;
    reededBumpTexture.repeat.set(1, 1);
    reededBumpTexture.anisotropy = 16;

    // 6. Photorealistic 24K Gold PBR Materials
    const goldColor = 0xffc73b;

    const faceMaterial = new THREE.MeshStandardMaterial({
      color: goldColor,
      map: faceTexture,
      bumpMap: faceBumpTexture,
      bumpScale: 0.055,
      metalness: 0.98,
      roughness: 0.18,
      envMapIntensity: 1.5,
    });

    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5b52e,
      bumpMap: reededBumpTexture,
      bumpScale: 0.09,
      metalness: 0.98,
      roughness: 0.22,
      envMapIntensity: 1.7,
    });

    const backMaterial = new THREE.MeshStandardMaterial({
      color: goldColor,
      metalness: 0.98,
      roughness: 0.18,
      envMapIntensity: 1.4,
    });

    const rimMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd95e,
      metalness: 1.0,
      roughness: 0.14,
      envMapIntensity: 2.2,
    });

    // 7. Coin 3D Geometry
    const coinGroup = new THREE.Group();

    // Main Coin Cylinder (Radius 2.15, Thickness 0.35)
    const coinRadius = 2.15;
    const coinThickness = 0.35;
    const cylinderGeo = new THREE.CylinderGeometry(coinRadius, coinRadius, coinThickness, 96);
    const coinMesh = new THREE.Mesh(cylinderGeo, [edgeMaterial, faceMaterial, backMaterial]);
    coinMesh.rotation.x = Math.PI / 2; // Face forward
    coinGroup.add(coinMesh);

    // Smooth Curved Outer Bevel Rim Ring (Torus seamlessly aligned)
    const torusGeo = new THREE.TorusGeometry(coinRadius - 0.04, 0.075, 24, 96);
    const frontRim = new THREE.Mesh(torusGeo, rimMaterial);
    frontRim.position.z = coinThickness / 2;
    coinGroup.add(frontRim);

    const backRim = new THREE.Mesh(torusGeo, rimMaterial);
    backRim.position.z = -coinThickness / 2;
    coinGroup.add(backRim);

    // Initial 3D angle matching the reference image (~32° perspective)
    const initialRotX = 0.24;
    const initialRotY = -0.54;
    const initialRotZ = -0.12;
    coinGroup.rotation.x = initialRotX;
    coinGroup.rotation.y = initialRotY;
    coinGroup.rotation.z = initialRotZ;

    scene.add(coinGroup);

    // 8. Soft Natural Contact Floor Shadow (Safely within frustum, ZERO clipping)
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 512;
    shadowCanvas.height = 512;
    const sCtx = shadowCanvas.getContext("2d")!;
    const shadowGrad = sCtx.createRadialGradient(256, 256, 20, 256, 256, 220);
    shadowGrad.addColorStop(0, "rgba(80, 35, 5, 0.45)");
    shadowGrad.addColorStop(0.4, "rgba(80, 35, 5, 0.18)");
    shadowGrad.addColorStop(0.8, "rgba(80, 35, 5, 0.04)");
    shadowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    sCtx.fillStyle = shadowGrad;
    sCtx.fillRect(0, 0, 512, 512);

    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowMaterial = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
    });
    const shadowGeo = new THREE.PlaneGeometry(5.2, 2.0);
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMaterial);
    shadowMesh.position.set(0, -2.35, 0);
    shadowMesh.rotation.x = -Math.PI / 2;
    scene.add(shadowMesh);

    // 9. Interactive Hover & Drag Physics
    let targetRotX = initialRotX;
    let targetRotY = initialRotY;
    let targetScale = 1.0;
    let isHovered = false;
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      if (isDragging) {
        const deltaX = clientX - previousMouseX;
        const deltaY = clientY - previousMouseY;
        targetRotY += deltaX * 0.015;
        targetRotX += deltaY * 0.015;
        previousMouseX = clientX;
        previousMouseY = clientY;
      } else if (isHovered) {
        const rect = container.getBoundingClientRect();
        const normX = ((clientX - rect.left) / rect.width) * 2 - 1;
        const normY = ((clientY - rect.top) / rect.height) * 2 - 1;

        targetRotY = initialRotY + normX * 0.75;
        targetRotX = initialRotX - normY * 0.65;
      }
    };

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      previousMouseX = clientX;
      previousMouseY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
      if (!isHovered) {
        targetRotX = initialRotX;
        targetRotY = initialRotY;
      }
    };

    const onMouseEnter = () => {
      isHovered = true;
      targetScale = 1.06;
    };

    const onMouseLeave = () => {
      isHovered = false;
      isDragging = false;
      targetScale = 1.0;
      targetRotX = initialRotX;
      targetRotY = initialRotY;
    };

    container.addEventListener("mousemove", onPointerMove);
    container.addEventListener("mousedown", onPointerDown);
    window.addEventListener("mouseup", onPointerUp);
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);

    container.addEventListener("touchmove", onPointerMove, { passive: true });
    container.addEventListener("touchstart", onPointerDown, { passive: true });
    window.addEventListener("touchend", onPointerUp);

    // 10. Smooth Render Loop (60 FPS Damped Lerp)
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Idle floating bobbing motion
      let idleOffsetY = 0;
      if (!isHovered && !isDragging) {
        idleOffsetY = Math.sin(elapsedTime * 1.8) * 0.1;
        targetRotY = initialRotY + Math.sin(elapsedTime * 1.2) * 0.12;
        targetRotX = initialRotX + Math.cos(elapsedTime * 1.4) * 0.06;
      }

      // Smooth damped lerp interpolation
      coinGroup.rotation.x += (targetRotX - coinGroup.rotation.x) * 0.08;
      coinGroup.rotation.y += (targetRotY - coinGroup.rotation.y) * 0.08;
      coinGroup.position.y += (idleOffsetY - coinGroup.position.y) * 0.09;

      // Scale lerp
      const currentScale = coinGroup.scale.x;
      const newScale = currentScale + (targetScale - currentScale) * 0.09;
      coinGroup.scale.set(newScale, newScale, newScale);

      // Dynamic shadow counter-tilt
      shadowMesh.position.x = coinGroup.rotation.y * 0.2;
      shadowMesh.scale.x = 1 - Math.abs(coinGroup.rotation.y) * 0.06;
      shadowMaterial.opacity = isHovered ? 0.75 : 0.55;

      renderer.render(scene, camera);
    };

    animate();

    // 11. Handle Window Resizing
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 400;
      const h = container.clientHeight || 440;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 12. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousemove", onPointerMove);
      container.removeEventListener("mousedown", onPointerDown);
      window.removeEventListener("mouseup", onPointerUp);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      container.removeEventListener("touchmove", onPointerMove);
      container.removeEventListener("touchstart", onPointerDown);
      window.removeEventListener("touchend", onPointerUp);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      cylinderGeo.dispose();
      torusGeo.dispose();
      shadowGeo.dispose();
      faceTexture.dispose();
      faceBumpTexture.dispose();
      reededBumpTexture.dispose();
      shadowTexture.dispose();
      faceMaterial.dispose();
      edgeMaterial.dispose();
      backMaterial.dispose();
      rimMaterial.dispose();
      shadowMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center p-2 select-none overflow-visible">
      {/* Warm Golden Ambient Glow Behind 3D Coin */}
      <div className="absolute w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 rounded-full bg-amber-400/20 dark:bg-amber-500/15 blur-3xl pointer-events-none" />

      {/* WebGL Real 3D Coin Canvas Mount with Ample Height to Prevent ANY Bottom Cutoff */}
      <div
        ref={mountRef}
        className="relative w-full max-w-[420px] h-[360px] sm:h-[420px] md:h-[460px] cursor-grab active:cursor-grabbing flex items-center justify-center touch-none overflow-visible"
      />
    </div>
  );
}
