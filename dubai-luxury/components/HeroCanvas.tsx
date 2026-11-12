"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdaptiveDpr, Float, Preload } from "@react-three/drei";
import * as THREE from "three";

function seeded(index: number) {
  const value = Math.sin(index * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
}

type Tower = {
  x: number;
  z: number;
  height: number;
  width: number;
  depth: number;
  tone: number;
};

const towers: Tower[] = Array.from({ length: 26 }, (_, index) => {
  const spread = index / 25;
  return {
    x: -10 + spread * 20 + (seeded(index + 1) - 0.5) * 1.4,
    z: -7 + seeded(index + 2) * 7.5,
    height: 1.1 + seeded(index + 3) * 5.4,
    width: 0.45 + seeded(index + 4) * 0.8,
    depth: 0.45 + seeded(index + 5) * 0.8,
    tone: seeded(index + 6),
  };
});

const particles = Array.from({ length: 320 }, (_, index) => {
  const angle = seeded(index + 40) * Math.PI * 2;
  const radius = 2 + seeded(index + 41) * 12;
  return {
    x: Math.cos(angle) * radius,
    y: seeded(index + 42) * 6 - 1.2,
    z: Math.sin(angle) * radius - 3,
    scale: 0.5 + seeded(index + 43) * 1.6,
    tone: seeded(index + 44),
  };
});

function Skyline({ groupRef }: { groupRef: React.RefObject<THREE.Group | null> }) {
  const { pointer } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.16,
      0.04,
    );
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      pointer.x * -0.35,
      0.03,
    );
  });

  return (
    <group ref={groupRef}>
      {towers.map((tower, index) => {
        const accent = tower.tone > 0.55;
        return (
          <group key={index} position={[tower.x, tower.height / 2 - 2.1, tower.z]}>
            <mesh castShadow receiveShadow>
              <boxGeometry args={[tower.width, tower.height, tower.depth]} />
              <meshStandardMaterial
                color={accent ? "#141821" : "#101319"}
                metalness={0.9}
                roughness={0.32}
                emissive={accent ? "#0ABAB5" : "#B57EDC"}
                emissiveIntensity={accent ? 0.035 : 0.025}
              />
            </mesh>
            {Array.from({ length: 4 }).map((_, floor) => (
              <mesh
                key={floor}
                position={[
                  0,
                  -tower.height / 2 + 0.5 + floor * (tower.height / 4.6),
                  tower.depth / 2 + 0.012,
                ]}
              >
                <planeGeometry args={[tower.width * 0.72, 0.022]} />
                <meshBasicMaterial
                  color={index % 3 === 0 ? "#81D8D0" : "#E6E6FA"}
                  transparent
                  opacity={0.24}
                />
              </mesh>
            ))}
          </group>
        );
      })}

      {/* Sculptural landmark tower */}
      <group position={[0.9, -2.1, -1.6]}>
        {Array.from({ length: 9 }).map((_, step) => {
          const scale = 1 - step * 0.082;
          return (
            <mesh
              key={step}
              position={[0, 0.85 + step * 1.05, 0]}
              castShadow
            >
              <cylinderGeometry args={[0.34 * scale, 0.42 * scale, 1.02, 4]} />
              <meshStandardMaterial
                color="#171b24"
                metalness={0.95}
                roughness={0.24}
                emissive="#81D8D0"
                emissiveIntensity={0.05}
              />
            </mesh>
          );
        })}
        <mesh position={[0, 10.4, 0]}>
          <cylinderGeometry args={[0.02, 0.07, 1.6, 4]} />
          <meshBasicMaterial color="#81D8D0" />
        </mesh>
      </group>

      <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.5}>
        <mesh position={[-3.1, 1.8, 1.4]}>
          <sphereGeometry args={[0.42, 32, 32]} />
          <meshPhysicalMaterial
            color="#81D8D0"
            metalness={0.1}
            roughness={0.08}
            transparent
            opacity={0.34}
            transmission={0.6}
            thickness={0.8}
          />
        </mesh>
      </Float>

      <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.35}>
        <mesh position={[3.4, 2.6, 0.6]} rotation={[0.4, 0.2, 0.5]}>
          <torusGeometry args={[0.55, 0.012, 12, 96]} />
          <meshBasicMaterial color="#B57EDC" transparent opacity={0.55} />
        </mesh>
      </Float>
    </group>
  );
}

function Water() {
  const geometry = useRef<THREE.PlaneGeometry>(null);

  useFrame(({ clock }) => {
    const mesh = geometry.current;
    if (!mesh) return;
    const position = mesh.attributes.position as THREE.BufferAttribute;
    const time = clock.getElapsedTime();
    for (let index = 0; index < position.count; index += 1) {
      const x = position.getX(index);
      const y = position.getY(index);
      const wave =
        Math.sin(x * 0.42 + time * 0.55) * 0.075 +
        Math.cos(y * 0.34 + time * 0.8) * 0.055 +
        Math.sin((x + y) * 0.2 + time * 0.3) * 0.045;
      position.setZ(index, wave);
    }
    position.needsUpdate = true;
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.3, 0]} receiveShadow>
      <planeGeometry ref={geometry} args={[44, 34, 96, 80]} />
      <meshStandardMaterial
        color="#05080e"
        metalness={1}
        roughness={0.18}
        emissive="#0ABAB5"
        emissiveIntensity={0.018}
      />
    </mesh>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const array = new Float32Array(particles.length * 3);
    particles.forEach((particle, index) => {
      array[index * 3] = particle.x;
      array[index * 3 + 1] = particle.y;
      array[index * 3 + 2] = particle.z;
    });
    return array;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const time = clock.getElapsedTime();
    ref.current.rotation.y = time * 0.02;
    ref.current.position.y = Math.sin(time * 0.4) * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        sizeAttenuation
        color="#81D8D0"
        transparent
        opacity={0.7}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Rig() {
  const { camera, pointer } = useThree();

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      pointer.x * 0.85,
      0.035,
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      1.55 + pointer.y * 0.32,
      0.035,
    );
    camera.lookAt(0, 0.5, -1.2);
  });

  return null;
}

export default function HeroCanvas({ paused = false }: { paused?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  // The renderer can miss its very first container measurement when the canvas
  // mounts inside an absolutely positioned hero. Nudging the resize observer
  // once after paint gives it a reliable size to initialise from.
  useEffect(() => {
    const frames: number[] = [];
    frames.push(
      window.requestAnimationFrame(() => {
        frames.push(
          window.requestAnimationFrame(() => {
            window.dispatchEvent(new Event("resize"));
          }),
        );
      }),
    );
    const timer = window.setTimeout(
      () => window.dispatchEvent(new Event("resize")),
      600,
    );
    return () => {
      frames.forEach((frame) => window.cancelAnimationFrame(frame));
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <Canvas
      dpr={[1, 1.7]}
      frameloop={paused ? "never" : "always"}
      camera={{ position: [0, 1.55, 10.5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="!absolute inset-0"
    >
      <color attach="background" args={["#0e0e12"]} />
      <fog attach="fog" args={["#0e0e12", 10, 27]} />
      <ambientLight intensity={0.32} color="#E6E6FA" />
      <directionalLight position={[5, 8, 5]} intensity={0.65} color="#81D8D0" />
      <pointLight
        position={[-6, 2.6, 2.5]}
        intensity={55}
        distance={26}
        decay={2}
        color="#0ABAB5"
      />
      <pointLight
        position={[6.5, 4, -1.5]}
        intensity={45}
        distance={24}
        decay={2}
        color="#B57EDC"
      />
      <spotLight
        position={[0, 8, 4]}
        angle={0.7}
        penumbra={1}
        intensity={28}
        color="#E6E6FA"
      />
      <Skyline groupRef={groupRef} />
      <Water />
      <Particles />
      <Rig />
      <AdaptiveDpr pixelated />
      <Preload all />
    </Canvas>
  );
}
