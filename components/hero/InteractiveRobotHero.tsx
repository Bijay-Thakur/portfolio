"use client";

import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";
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

function Scene({ onOpenSiteMap }: { onOpenSiteMap?: () => void }) {
  return (
    <>
      <ambientLight intensity={1.05} />
      <directionalLight position={[3, 4, 5]} intensity={1.35} color="#ffffff" />
      <pointLight position={[-3, 2, 3]} intensity={1.05} color="#f5f6f8" />
      <pointLight position={[2.8, 1.5, -2.6]} intensity={0.85} color="#c5c8ce" />
      <CursorParticles />

      <Float speed={1.15} rotationIntensity={0.18} floatIntensity={0.1}>
        <RobotPrimitive onOpenSiteMap={onOpenSiteMap} />
      </Float>
    </>
  );
}

function CursorParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const { pointer } = useThree();
  const windowPointer = useRef({ x: 0, y: 0 });
  const count =
    typeof window !== "undefined" && window.innerWidth < 768
      ? 90
      : typeof window !== "undefined" && window.innerWidth < 1024
        ? 160
        : 320;

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      windowPointer.current = {
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      };
    };
    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;

      windowPointer.current = {
        x: (touch.clientX / window.innerWidth) * 2 - 1,
        y: -(touch.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
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
        color="#c5c8ce"
        map={circleTexture}
        transparent
        opacity={0.78}
        depthWrite={false}
        alphaTest={0.01}
      />
    </points>
  );
}

export default function InteractiveRobotHero({
  onOpenSiteMap,
}: {
  onOpenSiteMap?: () => void;
}) {
  const [webglReady, setWebglReady] = useState(false);
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    setWebglReady(hasWebGL());
  }, []);

  if (webglFailed || !webglReady) {
    return <HeroFallback />;
  }

  return (
    <div className="relative h-full min-h-[100svh] overflow-visible">
      {/* full-hero glow behind robot */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.55),transparent_36%),radial-gradient(circle_at_54%_40%,rgba(201,182,240,0.28),transparent_42%)]" />

      <Canvas
        aria-hidden="true"
        className="!absolute inset-0 touch-pan-y"
        camera={{ position: [0, 0.45, 6.15], fov: 36 }}
        dpr={[1, 1.4]}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.setClearColor("#eef0f3", 1);
          gl.domElement.style.background = "transparent";
        }}
        onError={() => setWebglFailed(true)}
      >
        <Suspense fallback={null}>
          <Scene onOpenSiteMap={onOpenSiteMap} />
        </Suspense>
      </Canvas>

    </div>
  );
}
