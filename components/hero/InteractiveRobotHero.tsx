"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import RobotPrimitive from "./RobotPrimitive";
import HeroFallback from "./HeroFallback";

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.78} />
      <directionalLight position={[3, 4, 5]} intensity={1.55} color="#dffcff" />
      <pointLight position={[-3, 2, 3]} intensity={1.7} color="#0dd6c8" />
      <pointLight position={[2.8, 1.5, -2.6]} intensity={1.7} color="#45beff" />
      <CursorParticles />

      <Float speed={1.15} rotationIntensity={0.24} floatIntensity={0.12}>
        <RobotPrimitive />
      </Float>

      <ContactShadows
        position={[0, -40, 0]}
        opacity={0.28}
        scale={5}
        blur={2.8}
        far={0.0}
      />
    </>
  );
}

function CursorParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const { pointer } = useThree();
  const windowPointer = useRef({ x: 0, y: 0 });
  const count = typeof window !== "undefined" && window.innerWidth < 768 ? 170 : 420;

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      windowPointer.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);
  const origins = useMemo(() => {
    const data = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      data[i * 3] = (Math.random() - 0.5) * 8.6;
      data[i * 3 + 1] = (Math.random() - 0.5) * 5.4;
      data[i * 3 + 2] = (Math.random() - 0.5) * 2.4 - 0.35;
    }
    return data;
  }, [count]);

  const positions = useMemo(() => new Float32Array(origins), [origins]);
  const velocities = useMemo(() => new Float32Array(count * 3), [count]);
  const circleTexture = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const context = canvas.getContext("2d");

    if (context) {
      const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 30);
      gradient.addColorStop(0, "rgba(255,255,255,1)");
      gradient.addColorStop(0.62, "rgba(255,255,255,0.92)");
      gradient.addColorStop(1, "rgba(255,255,255,0)");
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(32, 32, 30, 0, Math.PI * 2);
      context.fill();
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  useFrame(() => {
    const activePointer =
      Math.abs(windowPointer.current.x) + Math.abs(windowPointer.current.y) > 0
        ? windowPointer.current
        : pointer;
    const mouseX = activePointer.x * 3.8;
    const mouseY = activePointer.y * 2.35;

    for (let i = 0; i < count; i += 1) {
      const ix = i * 3;
      const dx = positions[ix] - mouseX;
      const dy = positions[ix + 1] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 1.55 && dist > 0.001) {
        const force = (1.55 - dist) / 1.55;
        velocities[ix] += (dx / dist) * force * 0.022;
        velocities[ix + 1] += (dy / dist) * force * 0.022;
      }

      velocities[ix] += (origins[ix] - positions[ix]) * 0.004;
      velocities[ix + 1] += (origins[ix + 1] - positions[ix + 1]) * 0.004;
      velocities[ix + 2] += (origins[ix + 2] - positions[ix + 2]) * 0.004;

      velocities[ix] *= 0.94;
      velocities[ix + 1] *= 0.94;
      velocities[ix + 2] *= 0.94;

      positions[ix] += velocities[ix];
      positions[ix + 1] += velocities[ix + 1];
      positions[ix + 2] += velocities[ix + 2];
    }

    const geometry = pointsRef.current?.geometry;
    const attr = geometry?.getAttribute("position") as THREE.BufferAttribute | undefined;
    if (attr) {
      attr.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.048}
        color="#8ff7ee"
        map={circleTexture}
        transparent
        opacity={0.78}
        depthWrite={false}
        alphaTest={0.01}
      />
    </points>
  );
}

export default function InteractiveRobotHero() {
  const [webglReady, setWebglReady] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    setWebglReady(hasWebGL());
  }, []);

  if (webglFailed || !webglReady) {
    return <HeroFallback />;
  }

  return (
    <div className="relative h-full min-h-screen overflow-visible">
      {/* full-hero glow behind robot */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(13,214,200,0.18),transparent_30%),radial-gradient(circle_at_54%_40%,rgba(69,190,255,0.12),transparent_42%)]" />
      <div
        className="absolute inset-0 opacity-[0.075]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(13,214,200,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(13,214,200,0.8) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <Canvas
        aria-hidden="true"
        className="!absolute inset-0"
        camera={{ position: [0, 0.52, 6.1], fov: 36 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
        }}
        onError={() => setWebglFailed(true)}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>

      <div className="pointer-events-none absolute bottom-7 right-7 z-10 hidden text-[#8ff7ee]/75 sm:block">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#0dd6c8]/25 bg-black/25">
          ↓
        </div>
      </div>
    </div>
  );
}
