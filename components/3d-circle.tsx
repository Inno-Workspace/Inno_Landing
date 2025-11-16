"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface CircleModelProps {
  speed?: number;
  scale?: number;
  rotationAxis?: [number, number, number];
}

function CircleModel({ speed = 1, scale = 1, rotationAxis = [0, 1, 0] }: CircleModelProps) {
  const meshRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/objects/circle/base_basic_pbr.glb");

  // Subtle vibration animation
  useFrame((state) => {
    if (meshRef.current) {
      // Small rotation oscillation for vibration effect
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 3) * 0.02;
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * 2.5) * 0.02;
      // Slight scale pulse
      const scalePulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.01;
      meshRef.current.scale.set(scale * scalePulse, scale * scalePulse, scale * scalePulse);
    }
  });

  // Center the object at origin
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.geometry.center();
    }
  });

  return (
    <primitive
      ref={meshRef}
      object={scene.clone()}
      position={[0, 0, 0]}
    />
  );
}

interface ThreeDCircleProps {
  speed?: number;
  scale?: number;
  rotationAxis?: [number, number, number];
}

export default function ThreeDCircle({ 
  speed = 1, 
  scale = 1,
  rotationAxis = [0, 1, 0] 
}: ThreeDCircleProps) {
  return (
    <Canvas
      style={{ width: "100%", height: "100%" }}
      gl={{ alpha: true, antialias: true }}
      camera={{ position: [0, 0, 8], fov: 35 }}
    >
      {/* Lighting */}
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={2} />
      <directionalLight position={[-10, -10, -5]} intensity={0.8} />
      <pointLight position={[0, 0, 10]} intensity={1.5} />
      <hemisphereLight intensity={0.5} />
      
      {/* 3D Model with Suspense */}
      <Suspense fallback={null}>
        <CircleModel speed={speed} scale={scale} rotationAxis={rotationAxis} />
      </Suspense>
    </Canvas>
  );
}

// Preload the model
useGLTF.preload("/objects/circle/base_basic_pbr.glb");

