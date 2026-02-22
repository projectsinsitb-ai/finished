import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

function FloatingBox({ position, size, color, speed = 1 }: { position: [number, number, number]; size: [number, number, number]; color: string; speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.3;
      meshRef.current.rotation.y += 0.005 * speed;
    }
  });
  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={size} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  );
}

function FloatingChip({ position, speed = 1 }: { position: [number, number, number]; speed?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * speed * 0.4) * 0.2;
    }
  });
  return (
    <Float speed={speed * 0.8} rotationIntensity={0.3} floatIntensity={2}>
      <mesh ref={meshRef} position={position}>
        <cylinderGeometry args={[0.4, 0.4, 0.08, 6]} />
        <meshStandardMaterial color="#a855f7" metalness={0.9} roughness={0.1} />
      </mesh>
    </Float>
  );
}

function GlowSphere({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <Float speed={1.5} floatIntensity={2}>
      <mesh position={position}>
        <sphereGeometry args={[0.15, 32, 32]} />
        <MeshDistortMaterial color={color} emissive={color} emissiveIntensity={0.5} distort={0.3} speed={2} />
      </mesh>
    </Float>
  );
}

export function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }} style={{ position: 'absolute', inset: 0 }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#a855f7" />
      <pointLight position={[-5, -3, 3]} intensity={0.5} color="#22d3ee" />
      <spotLight position={[0, 8, 4]} intensity={0.8} color="#a855f7" angle={0.4} penumbra={0.5} />

      <FloatingBox position={[-3, 1.5, 0]} size={[0.6, 0.6, 0.6]} color="#1a1a2e" speed={0.8} />
      <FloatingBox position={[3.5, -1, -1]} size={[0.8, 0.15, 1.2]} color="#2a2a3e" speed={1.2} />
      <FloatingBox position={[-2, -2, 1]} size={[1, 0.1, 0.6]} color="#1e1e30" speed={0.6} />
      <FloatingBox position={[2, 2.5, -2]} size={[0.4, 0.8, 0.4]} color="#252538" speed={1} />

      <FloatingChip position={[1.5, 0.5, 1]} speed={0.7} />
      <FloatingChip position={[-1.8, -0.8, 0.5]} speed={1.1} />

      <GlowSphere position={[4, 2, -1]} color="#a855f7" />
      <GlowSphere position={[-4, -1.5, 0]} color="#22d3ee" />
      <GlowSphere position={[0, 3, -2]} color="#a855f7" />
      <GlowSphere position={[-3, 2.5, -1]} color="#22d3ee" />

      <Environment preset="night" />
    </Canvas>
  );
}

function AnvilMesh() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Base */}
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[2, 0.3, 1]} />
        <meshStandardMaterial color="#3a3a4a" metalness={0.9} roughness={0.3} />
      </mesh>
      {/* Middle column */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[1, 0.6, 0.7]} />
        <meshStandardMaterial color="#4a4a5a" metalness={0.85} roughness={0.25} />
      </mesh>
      {/* Top face */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[2.2, 0.4, 0.9]} />
        <meshStandardMaterial color="#5a5a6a" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Horn */}
      <mesh position={[1.4, 0.35, 0]} rotation={[0, 0, -0.1]}>
        <coneGeometry args={[0.25, 0.8, 8]} />
        <meshStandardMaterial color="#5a5a6a" metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
}

export function AnvilScene() {
  return (
    <Canvas camera={{ position: [0, 1, 4], fov: 40 }} style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={1.5} color="#d4a24e" />
      <pointLight position={[-3, 2, 2]} intensity={0.6} color="#3b82f6" />
      <spotLight position={[0, 5, 2]} intensity={1} color="#d4a24e" angle={0.5} penumbra={0.5} />
      <Float speed={1} floatIntensity={0.5} rotationIntensity={0.2}>
        <AnvilMesh />
      </Float>
      <Environment preset="night" />
    </Canvas>
  );
}

function ProductMesh({ type }: { type: 'desktop' | 'laptop' | 'monitor' | 'speaker' }) {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  if (type === 'desktop') {
    return (
      <group ref={groupRef}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1.2, 1.6, 0.5]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.85, 0]}>
          <boxGeometry args={[0.3, 0.05, 0.3]} />
          <meshStandardMaterial color="#d4a24e" metalness={0.9} roughness={0.1} emissive="#d4a24e" emissiveIntensity={0.3} />
        </mesh>
        {/* RGB strip */}
        <mesh position={[0.62, 0, 0]}>
          <boxGeometry args={[0.02, 1.4, 0.02]} />
          <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={1} />
        </mesh>
      </group>
    );
  }

  if (type === 'laptop') {
    return (
      <group ref={groupRef}>
        {/* Base */}
        <mesh position={[0, -0.05, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[1.8, 0.06, 1.2]} />
          <meshStandardMaterial color="#c0c0c8" metalness={0.95} roughness={0.1} />
        </mesh>
        {/* Screen */}
        <mesh position={[0, 0.6, -0.55]} rotation={[-0.3, 0, 0]}>
          <boxGeometry args={[1.7, 1.1, 0.03]} />
          <meshStandardMaterial color="#2a2a3e" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Screen glow */}
        <mesh position={[0, 0.6, -0.53]} rotation={[-0.3, 0, 0]}>
          <planeGeometry args={[1.5, 0.9]} />
          <meshStandardMaterial color="#e0e0e0" emissive="#ffffff" emissiveIntensity={0.2} />
        </mesh>
      </group>
    );
  }

  if (type === 'monitor') {
    return (
      <group ref={groupRef}>
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[2.2, 0.9, 0.06]} />
          <meshStandardMaterial color="#1a1a2e" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.4, 0.035]}>
          <planeGeometry args={[2, 0.75]} />
          <meshStandardMaterial color="#111122" emissive="#3b82f6" emissiveIntensity={0.05} />
        </mesh>
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.5, 8]} />
          <meshStandardMaterial color="#2a2a3e" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.45, 0]}>
          <cylinderGeometry args={[0.4, 0.4, 0.04, 32]} />
          <meshStandardMaterial color="#2a2a3e" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>
    );
  }

  // speaker
  return (
    <group ref={groupRef}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.8, 1.2, 0.6]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.2, 0.31]}>
        <circleGeometry args={[0.25, 32]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.2, 0.31]}>
        <circleGeometry args={[0.15, 32]} />
        <meshStandardMaterial color="#d4a24e" metalness={0.9} roughness={0.1} />
      </mesh>
    </group>
  );
}

export function ProductScene({ type }: { type: 'desktop' | 'laptop' | 'monitor' | 'speaker' }) {
  return (
    <Canvas camera={{ position: [0, 0.5, 3.5], fov: 35 }} style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 3]} intensity={1} color="#d4a24e" />
      <pointLight position={[-3, 1, 2]} intensity={0.5} color="#3b82f6" />
      <Float speed={1.5} floatIntensity={0.5} rotationIntensity={0.1}>
        <ProductMesh type={type} />
      </Float>
      <Environment preset="night" />
    </Canvas>
  );
}
