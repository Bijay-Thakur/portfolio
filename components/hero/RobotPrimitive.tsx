"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { RoundedBox, Sparkles } from "@react-three/drei";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const ROBOT_BASE_Y = -1;

export default function RobotPrimitive() {
  const bodyRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const visorRef = useRef<THREE.Mesh>(null);
  const leftHandRef = useRef<THREE.Mesh>(null);
  const rightHandRef = useRef<THREE.Mesh>(null);
  const { pointer } = useThree();
  const windowPointer = useRef({ x: 0, y: 0 });

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

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    const activePointer =
      Math.abs(windowPointer.current.x) + Math.abs(windowPointer.current.y) > 0
        ? windowPointer.current
        : pointer;
    const targetY = clamp(activePointer.x * 0.35, -0.35, 0.35);
    const targetX = clamp(-activePointer.y * 0.18, -0.18, 0.18);

    if (headRef.current) {
      headRef.current.rotation.y += (targetY - headRef.current.rotation.y) * 0.06;
      headRef.current.rotation.x += (targetX - headRef.current.rotation.x) * 0.06;
      headRef.current.position.y = 1.18 + Math.sin(elapsed * 1.2) * 0.035;
    }

    if (bodyRef.current) {
      bodyRef.current.rotation.y += (targetY * 0.35 - bodyRef.current.rotation.y) * 0.045;
      bodyRef.current.rotation.x += (targetX * 0.25 - bodyRef.current.rotation.x) * 0.045;
      bodyRef.current.position.y = ROBOT_BASE_Y + Math.sin(elapsed * 1.2) * 0.025;
    }

    if (leftArmRef.current) {
      leftArmRef.current.rotation.z = 0.22 + Math.sin(elapsed * 1.8) * 0.09;
      leftArmRef.current.rotation.x = Math.sin(elapsed * 1.35) * 0.04;
    }

    if (rightArmRef.current) {
      rightArmRef.current.rotation.z = -0.22 + Math.sin(elapsed * 1.8 + 0.7) * 0.09;
      rightArmRef.current.rotation.x = Math.sin(elapsed * 1.35 + 0.5) * 0.04;
    }

    const winkClosed = Math.sin(elapsed * 1.15) > 0.965;
    if (visorRef.current) {
      const targetScaleY = winkClosed ? 0.18 : 1;
      visorRef.current.scale.y += (targetScaleY - visorRef.current.scale.y) * 0.28;
    }

    if (leftHandRef.current) {
      leftHandRef.current.position.y = -0.52 + Math.sin(elapsed * 1.9) * 0.035;
    }

    if (rightHandRef.current) {
      rightHandRef.current.position.y = -0.52 + Math.sin(elapsed * 1.9 + 0.7) * 0.035;
    }
  });

  return (
    <group ref={bodyRef} position={[0, ROBOT_BASE_Y, 0]} scale={1.18}>
      <Sparkles
        count={54}
        scale={[4.4, 3.2, 2.2]}
        size={1}
        speed={0.18}
        color="#0dd6c8"
        opacity={0.36}
      />

      {/* soft base glow */}
      <mesh position={[0, -0.68, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.35, 64]} />
        <meshBasicMaterial color="#0dd6c8" transparent opacity={0.1} />
      </mesh>

      {/* torso */}
      <RoundedBox args={[1.25, 1.25, 0.62]} radius={0.18} smoothness={6}>
        <meshStandardMaterial
          color="#10131b"
          metalness={0.55}
          roughness={0.28}
          emissive="#070707"
        />
      </RoundedBox>

      {/* chest plate */}
      <RoundedBox position={[0, 0.08, 0.34]} args={[0.76, 0.42, 0.04]} radius={0.08} smoothness={5}>
        <meshStandardMaterial
          color="#05070c"
          metalness={0.4}
          roughness={0.2}
          emissive="#0dd6c8"
          emissiveIntensity={0.28}
        />
      </RoundedBox>

      {/* chest core */}
      <mesh position={[0, 0.08, 0.38]}>
        <torusGeometry args={[0.16, 0.012, 16, 48]} />
        <meshStandardMaterial
          color="#8ff7ee"
          emissive="#0dd6c8"
          emissiveIntensity={1.55}
          toneMapped={false}
        />
      </mesh>

      {/* neck */}
      <mesh position={[0, 0.73, 0]}>
        <cylinderGeometry args={[0.18, 0.18, 0.24, 32]} />
        <meshStandardMaterial color="#1c2430" metalness={0.65} roughness={0.22} />
      </mesh>

      {/* head */}
      <group ref={headRef} position={[0, 1.18, 0]}>
        <RoundedBox args={[1.08, 0.82, 0.72]} radius={0.18} smoothness={8}>
          <meshStandardMaterial
            color="#111722"
            metalness={0.62}
            roughness={0.24}
            emissive="#0a0a0a"
          />
        </RoundedBox>

        {/* visor */}
        <RoundedBox ref={visorRef} position={[0, 0.05, 0.39]} args={[0.74, 0.24, 0.045]} radius={0.08} smoothness={5}>
          <meshStandardMaterial
            color="#050607"
            emissive="#0dd6c8"
            emissiveIntensity={1.25}
            metalness={0.2}
            roughness={0.12}
            toneMapped={false}
          />
        </RoundedBox>

        {/* visor scan line */}
        <mesh position={[0, 0.08, 0.425]}>
          <boxGeometry args={[0.54, 0.025, 0.012]} />
          <meshBasicMaterial color="#8ff7ee" toneMapped={false} />
        </mesh>

        {/* antenna */}
        <mesh position={[0, 0.56, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.018, 0.018, 0.32, 16]} />
          <meshStandardMaterial color="#0dd6c8" emissive="#0dd6c8" emissiveIntensity={0.45} />
        </mesh>
        <mesh position={[0, 0.76, 0]}>
          <sphereGeometry args={[0.065, 24, 24]} />
          <meshStandardMaterial
            color="#8ff7ee"
            emissive="#0dd6c8"
            emissiveIntensity={1.3}
            toneMapped={false}
          />
        </mesh>
      </group>

      {/* arms */}
      <group ref={leftArmRef} position={[-0.82, 0.08, 0]} rotation={[0, 0, 0.22]}>
        <RoundedBox args={[0.26, 0.86, 0.28]} radius={0.1} smoothness={5}>
          <meshStandardMaterial color="#111722" metalness={0.55} roughness={0.28} />
        </RoundedBox>
        <mesh ref={leftHandRef} position={[0, -0.52, 0]}>
          <sphereGeometry args={[0.16, 24, 24]} />
          <meshStandardMaterial color="#0dd6c8" metalness={0.45} roughness={0.25} />
        </mesh>
      </group>

      <group ref={rightArmRef} position={[0.82, 0.08, 0]} rotation={[0, 0, -0.22]}>
        <RoundedBox args={[0.26, 0.86, 0.28]} radius={0.1} smoothness={5}>
          <meshStandardMaterial color="#111722" metalness={0.55} roughness={0.28} />
        </RoundedBox>
        <mesh ref={rightHandRef} position={[0, -0.52, 0]}>
          <sphereGeometry args={[0.16, 24, 24]} />
          <meshStandardMaterial color="#0dd6c8" metalness={0.45} roughness={0.25} />
        </mesh>
      </group>
    </group>
  );
}
