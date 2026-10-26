"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export function InteractiveGoldCoin() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 340;
    const height = container.clientHeight || 340;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.1, 7.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 2. Procedural Studio Environment Map for Realistic Gold Reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    const envCanvas = document.createElement("canvas");
    envCanvas.width = 1024;
    envCanvas.height = 512;
    const envCtx = envCanvas.getContext("2d")!;
    const envGrad = envCtx.createLinearGradient(0, 0, 0, 512);
    envGrad.addColorStop(0, "#FFFDF5");
    envGrad.addColorStop(0.3, "#FDE68A");
    envGrad.addColorStop(0.65, "#D97706");
    envGrad.addColorStop(1, "#451A03");
    envCtx.fillStyle = envGrad;
    envCtx.fillRect(0, 0, 1024, 512);

    // Softbox Light Highlights
    envCtx.fillStyle = "rgba(255, 255, 255, 0.95)";
    envCtx.beginPath();
    envCtx.ellipse(280, 140, 200, 90, -0.25, 0, Math.PI * 2);
    envCtx.fill();

    envCtx.fillStyle = "rgba(255, 255, 255, 0.75)";
    envCtx.beginPath();
    envCtx.ellipse(780, 200, 160, 70, 0.2, 0, Math.PI * 2);
    envCtx.fill();

    const envTexture = new THREE.CanvasTexture(envCanvas);
    envTexture.mapping = THREE.EquirectangularReflectionMapping;
    const envMap = pmremGenerator.fromEquirectangular(envTexture).texture;
    scene.environment = envMap;
    pmremGenerator.dispose();
    envTexture.dispose();

    // 3. Studio 3-Point Lighting
    const keyLight = new THREE.DirectionalLight(0xfff7e6, 3.2);
    keyLight.position.set(-4, 5, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xa5c9ff, 1.2);
    fillLight.position.set(4, -3, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffea88, 4.2);
    rimLight.position.set(5, 5, -3);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0xfff1cc, 0.85);
    scene.add(ambientLight);

    // 4. Create Procedural Textures for Coin Face with Embossed Rupee (₹)
    const faceCanvas = document.createElement("canvas");
    faceCanvas.width = 1024;
    faceCanvas.height = 1024;
    const fCtx = faceCanvas.getContext("2d")!;
    const cx = 512;
    const cy = 512;
    const radius = 480;

    // Face Radial Gold Satin Gradient
    const faceGrad = fCtx.createRadialGradient(cx - 100, cy - 100, 40, cx, cy, radius);
    faceGrad.addColorStop(0, "#FFFDF0");
    faceGrad.addColorStop(0.25, "#FDE68A");
    faceGrad.addColorStop(0.65, "#F59E0B");
    faceGrad.addColorStop(0.9, "#D97706");
    faceGrad.addColorStop(1, "#92400E");
    fCtx.fillStyle = faceGrad;
    fCtx.beginPath();
    fCtx.arc(cx, cy, radius, 0, Math.PI * 2);
    fCtx.fill();

    // Inner Bevel Recess Shadow Ring
    fCtx.strokeStyle = "rgba(120, 53, 15, 0.4)";
    fCtx.lineWidth = 14;
    fCtx.beginPath();
    fCtx.arc(cx, cy, radius - 20, 0, Math.PI * 2);
    fCtx.stroke();

    fCtx.strokeStyle = "rgba(255, 255, 255, 0.6)";
    fCtx.lineWidth = 6;
    fCtx.beginPath();
    fCtx.arc(cx, cy, radius - 32, 0, Math.PI * 2);
    fCtx.stroke();

    // Embossed Indian Rupee (₹) Symbol
    fCtx.textAlign = "center";
    fCtx.textBaseline = "middle";
    fCtx.font = "900 420px 'Inter', sans-serif, system-ui";

    // 3D Occlusion Shadow Under Rupee
    fCtx.fillStyle = "rgba(120, 53, 15, 0.65)";
    fCtx.fillText("₹", cx + 7, cy + 9);

    // Specular Highlight Above Rupee
    fCtx.fillStyle = "rgba(255, 255, 255, 0.85)";
    fCtx.fillText("₹", cx - 5, cy - 5);

    // Metallic Rupee Body
    const rupeeGrad = fCtx.createLinearGradient(0, cy - 210, 0, cy + 210);
    rupeeGrad.addColorStop(0, "#FFFDF2");
    rupeeGrad.addColorStop(0.3, "#FEF08A");
    rupeeGrad.addColorStop(0.7, "#D97706");
    rupeeGrad.addColorStop(1, "#78350F");
    fCtx.fillStyle = rupeeGrad;
    fCtx.fillText("₹", cx, cy);

    const faceTexture = new THREE.CanvasTexture(faceCanvas);
    faceTexture.anisotropy = 8;

    // Face Bump Map for Tangible 3D Embossing
    const bumpCanvas = document.createElement("canvas");
    bumpCanvas.width = 1024;
    bumpCanvas.height = 1024;
    const bCtx = bumpCanvas.getContext("2d")!;
    bCtx.fillStyle = "#808080";
    bCtx.fillRect(0, 0, 1024, 1024);

    // Embossed ring bump
    bCtx.strokeStyle = "#ffffff";
    bCtx.lineWidth = 18;
    bCtx.beginPath();
    bCtx.arc(cx, cy, radius - 22, 0, Math.PI * 2);
    bCtx.stroke();

    bCtx.strokeStyle = "#404040";
    bCtx.lineWidth = 14;
    bCtx.beginPath();
    bCtx.arc(cx, cy, radius - 36, 0, Math.PI * 2);
    bCtx.stroke();

    // Embossed Rupee Bump
    bCtx.textAlign = "center";
    bCtx.textBaseline = "middle";
    bCtx.font = "900 420px 'Inter', sans-serif, system-ui";
    bCtx.fillStyle = "#ffffff";
    bCtx.fillText("₹", cx, cy);

    const faceBumpTexture = new THREE.CanvasTexture(bumpCanvas);
    faceBumpTexture.anisotropy = 8;

    // 5. Procedural Reeded Edge (Milled Ridges) Bump Map
    const reededCanvas = document.createElement("canvas");
    reededCanvas.width = 2048;
    reededCanvas.height = 128;
    const rCtx = reededCanvas.getContext("2d")!;
    rCtx.fillStyle = "#808080";
    rCtx.fillRect(0, 0, 2048, 128);

    const numReeds = 84;
    const reedWidth = 2048 / numReeds;
    for (let i = 0; i < numReeds; i++) {
      const rx = i * reedWidth;
      const reedGrad = rCtx.createLinearGradient(rx, 0, rx + reedWidth, 0);
      reedGrad.addColorStop(0, "#333333");
      reedGrad.addColorStop(0.35, "#cccccc");
      reedGrad.addColorStop(0.5, "#ffffff");
      reedGrad.addColorStop(0.65, "#cccccc");
      reedGrad.addColorStop(1, "#333333");
      rCtx.fillStyle = reedGrad;
      rCtx.fillRect(rx, 0, reedWidth, 128);
    }
    const reededBumpTexture = new THREE.CanvasTexture(reededCanvas);
    reededBumpTexture.wrapS = THREE.RepeatWrapping;
    reededBumpTexture.wrapT = THREE.ClampToEdgeWrapping;
    reededBumpTexture.repeat.set(1, 1);
    reededBumpTexture.anisotropy = 8;

    // 6. Materials (Photorealistic 24K Gold PBR Shaders)
    const faceMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd866,
      map: faceTexture,
      bumpMap: faceBumpTexture,
      bumpScale: 0.045,
      metalness: 0.94,
      roughness: 0.22,
      envMapIntensity: 1.4,
    });

    const edgeMaterial = new THREE.MeshStandardMaterial({
      color: 0xebb238,
      bumpMap: reededBumpTexture,
      bumpScale: 0.08,
      metalness: 0.96,
      roughness: 0.26,
      envMapIntensity: 1.6,
    });

    const backMaterial = new THREE.MeshStandardMaterial({
      color: 0xffd866,
      metalness: 0.94,
      roughness: 0.22,
      envMapIntensity: 1.3,
    });

    const rimMaterial = new THREE.MeshStandardMaterial({
      color: 0xffe277,
      metalness: 0.98,
      roughness: 0.16,
      envMapIntensity: 2.0,
    });

    // 7. Coin 3D Geometry
    const coinGroup = new THREE.Group();

    // Main Coin Cylinder [side, top (front face), bottom (back face)]
    const coinRadius = 2.4;
    const coinThickness = 0.38;
    const cylinderGeo = new THREE.CylinderGeometry(coinRadius, coinRadius, coinThickness, 96);
    const coinMesh = new THREE.Mesh(cylinderGeo, [edgeMaterial, faceMaterial, backMaterial]);
    coinMesh.rotation.x = Math.PI / 2; // Face forward
    coinGroup.add(coinMesh);

    // Raised Front Bevel Ring (Torus)
    const torusGeo = new THREE.TorusGeometry(coinRadius - 0.05, 0.08, 24, 96);
    const frontRim = new THREE.Mesh(torusGeo, rimMaterial);
    frontRim.position.z = coinThickness / 2;
    coinGroup.add(frontRim);

    // Raised Back Bevel Ring (Torus)
    const backRim = new THREE.Mesh(torusGeo, rimMaterial);
    backRim.position.z = -coinThickness / 2;
    coinGroup.add(backRim);

    // Default angle matching the reference image (~32° perspective)
    const initialRotX = 0.22;
    const initialRotY = -0.58;
    coinGroup.rotation.x = initialRotX;
    coinGroup.rotation.y = initialRotY;

    scene.add(coinGroup);

    // 8. Contact Floor Shadow Plane
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext("2d")!;
    const shadowGrad = sCtx.createRadialGradient(128, 128, 20, 128, 128, 110);
    shadowGrad.addColorStop(0, "rgba(80, 40, 10, 0.45)");
    shadowGrad.addColorStop(0.5, "rgba(80, 40, 10, 0.18)");
    shadowGrad.addColorStop(1, "rgba(0, 0, 0, 0)");
    sCtx.fillStyle = shadowGrad;
    sCtx.fillRect(0, 0, 256, 256);

    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowMaterial = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    });
    const shadowGeo = new THREE.PlaneGeometry(5.2, 2.2);
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMaterial);
    shadowMesh.position.set(0, -2.6, 0);
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

        targetRotY = initialRotY + normX * 0.85;
        targetRotX = initialRotX - normY * 0.75;
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
      targetScale = 1.08;
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

    // 10. Smooth Render Loop (60 FPS with Damped Physics)
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Idle floating animation
      let idleOffsetY = 0;
      if (!isHovered && !isDragging) {
        idleOffsetY = Math.sin(elapsedTime * 1.8) * 0.12;
        targetRotY = initialRotY + Math.sin(elapsedTime * 1.2) * 0.15;
        targetRotX = initialRotX + Math.cos(elapsedTime * 1.5) * 0.08;
      }

      // Smooth damped lerp interpolation
      coinGroup.rotation.x += (targetRotX - coinGroup.rotation.x) * 0.08;
      coinGroup.rotation.y += (targetRotY - coinGroup.rotation.y) * 0.08;
      coinGroup.position.y += (idleOffsetY - coinGroup.position.y) * 0.1;

      // Scale lerp
      const currentScale = coinGroup.scale.x;
      const newScale = currentScale + (targetScale - currentScale) * 0.1;
      coinGroup.scale.set(newScale, newScale, newScale);

      // Contact shadow dynamics
      shadowMesh.position.x = coinGroup.rotation.y * 0.25;
      shadowMesh.scale.x = 1 - Math.abs(coinGroup.rotation.y) * 0.08;
      shadowMaterial.opacity = isHovered ? 0.8 : 0.6;

      renderer.render(scene, camera);
    };

    animate();

    // 11. Handle Resizing
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 340;
      const h = container.clientHeight || 340;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // 12. Cleanup on Unmount
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

      // Dispose Three.js objects
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
    <div className="relative flex items-center justify-center p-2 sm:p-4 select-none">
      {/* Warm Golden Ambient Glow Behind 3D Coin */}
      <div className="absolute w-72 h-72 sm:w-88 sm:h-88 md:w-96 md:h-96 rounded-full bg-amber-400/25 dark:bg-amber-500/20 blur-3xl pointer-events-none" />

      {/* WebGL Real 3D Coin Canvas Mount */}
      <div
        ref={mountRef}
        className="relative w-68 h-68 sm:w-80 sm:h-80 md:w-92 md:h-92 lg:w-[410px] lg:h-[410px] cursor-grab active:cursor-grabbing flex items-center justify-center touch-none"
      />
    </div>
  );
}
