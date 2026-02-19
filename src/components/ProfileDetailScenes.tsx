import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ─── Particles Background ───────────────────────────────────
function Particles({ count = 200, color = '#d4a24e' }: { count?: number; color?: string }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color={color} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

// ─── Volumetric Light Rays ──────────────────────────────────
function LightRays({ color = '#d4a24e' }: { color?: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.05;
      (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.03 + Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });
  return (
    <mesh ref={ref} position={[0, 0, -5]}>
      <planeGeometry args={[30, 30]} />
      <meshBasicMaterial color={color} transparent opacity={0.04} side={THREE.DoubleSide} />
    </mesh>
  );
}

// ─── Animated Component Block ───────────────────────────────
function ComponentBlock({
  position,
  size,
  color,
  metalness = 0.8,
  roughness = 0.2,
  delay = 0,
  isActive = false,
  emissive,
  emissiveIntensity = 0,
  shape = 'box',
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
  metalness?: number;
  roughness?: number;
  delay?: number;
  isActive?: boolean;
  emissive?: string;
  emissiveIntensity?: number;
  shape?: 'box' | 'cylinder' | 'sphere';
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [visible, setVisible] = useState(false);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (t > delay && !visible) setVisible(true);

    if (meshRef.current && visible) {
      const scale = Math.min(1, (t - delay) * 2);
      meshRef.current.scale.setScalar(scale);

      if (isActive) {
        meshRef.current.rotation.y += 0.02;
        meshRef.current.scale.setScalar(scale * 1.1);
      } else {
        meshRef.current.rotation.y += 0.003;
      }

      meshRef.current.position.y = position[1] + Math.sin(t * 0.8 + delay) * 0.05;
    }
  });

  if (!visible) return null;

  return (
    <Float speed={1.2} floatIntensity={0.3} rotationIntensity={0.1}>
      <mesh ref={meshRef} position={position}>
        {shape === 'box' && <boxGeometry args={size} />}
        {shape === 'cylinder' && <cylinderGeometry args={[size[0] / 2, size[0] / 2, size[1], 16]} />}
        {shape === 'sphere' && <sphereGeometry args={[size[0] / 2, 32, 32]} />}
        <meshStandardMaterial
          color={color}
          metalness={metalness}
          roughness={roughness}
          emissive={emissive || color}
          emissiveIntensity={isActive ? 0.4 : emissiveIntensity}
        />
      </mesh>
    </Float>
  );
}

// ─── Sound Wave Ring (Marcell) ──────────────────────────────
function SoundWave({ radius = 2, color = '#a855f7' }: { radius?: number; color?: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.15;
      ref.current.scale.set(scale, scale, 1);
      (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.15 - Math.sin(state.clock.elapsedTime * 3) * 0.1;
    }
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
      <ringGeometry args={[radius - 0.02, radius, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.15} side={THREE.DoubleSide} />
    </mesh>
  );
}

// ─── MARIA SCENE ────────────────────────────────────────────
export function MariaDetailScene({ activeIndex }: { activeIndex: number }) {
  return (
    <Canvas camera={{ position: [0, 0.5, 6], fov: 40 }} style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#d4a24e" />
      <pointLight position={[-5, -2, 3]} intensity={0.6} color="#f59e0b" />
      <spotLight position={[0, 8, 4]} intensity={1} color="#d4a24e" angle={0.4} penumbra={0.8} />

      <Particles color="#d4a24e" count={150} />
      <LightRays color="#d4a24e" />

      {/* CPU */}
      <ComponentBlock position={[0, 0.8, 0]} size={[0.5, 0.08, 0.5]} color="#2a6e3f" metalness={0.6} roughness={0.4} delay={0.2} isActive={activeIndex === 0} emissive="#d4a24e" emissiveIntensity={0.1} />
      {/* RAM */}
      <ComponentBlock position={[-1.2, 0.4, 0.3]} size={[0.8, 0.06, 0.15]} color="#1a5c2e" metalness={0.7} roughness={0.3} delay={0.5} isActive={activeIndex === 1} />
      {/* SSD */}
      <ComponentBlock position={[1.2, 0.3, 0.2]} size={[0.6, 0.04, 0.25]} color="#1a1a2e" metalness={0.9} roughness={0.1} delay={0.8} isActive={activeIndex === 2} />
      {/* Placa base */}
      <ComponentBlock position={[0, -0.2, 0]} size={[1.4, 0.05, 1.2]} color="#1a4a2a" metalness={0.5} roughness={0.5} delay={1.1} isActive={activeIndex === 3} emissive="#2ecc71" emissiveIntensity={0.05} />
      {/* Fuente */}
      <ComponentBlock position={[-1.5, -0.8, -0.3]} size={[0.7, 0.35, 0.5]} color="#2a2a3e" metalness={0.8} roughness={0.3} delay={1.4} isActive={activeIndex === 4} />
      {/* Caja */}
      <ComponentBlock position={[0, -0.1, -0.5]} size={[1.8, 1.6, 0.04]} color="#3a3a4a" metalness={0.9} roughness={0.2} delay={1.7} isActive={activeIndex === 5} emissive="#d4a24e" emissiveIntensity={0.02} />
      {/* Webcam */}
      <ComponentBlock position={[1.5, 1.2, 0.5]} size={[0.2, 0.2, 0.2]} color="#1a1a1a" shape="cylinder" delay={2.0} isActive={activeIndex === 6} emissive="#3b82f6" emissiveIntensity={0.2} />
      {/* Teclado */}
      <ComponentBlock position={[-0.5, -1.3, 1]} size={[1.4, 0.06, 0.4]} color="#2a2a3e" metalness={0.7} roughness={0.3} delay={2.3} isActive={activeIndex === 7} />
      {/* Monitor */}
      <ComponentBlock position={[0, 0.5, -1.2]} size={[2, 1.1, 0.06]} color="#111122" metalness={0.8} roughness={0.2} delay={2.6} isActive={activeIndex === 8} emissive="#ffffff" emissiveIntensity={0.05} />

      <Environment preset="night" />
    </Canvas>
  );
}

// ─── DIEGO SCENE ────────────────────────────────────────────
function RGBStrip({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      const hue = (state.clock.elapsedTime * 0.1) % 1;
      (ref.current.material as THREE.MeshStandardMaterial).color.setHSL(hue, 1, 0.5);
      (ref.current.material as THREE.MeshStandardMaterial).emissive.setHSL(hue, 1, 0.5);
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={[0.03, 1.8, 0.03]} />
      <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={1.5} />
    </mesh>
  );
}

export function DiegoDetailScene({ activeIndex }: { activeIndex: number }) {
  return (
    <Canvas camera={{ position: [0, 0.5, 7], fov: 40 }} style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1.5} color="#3b82f6" />
      <pointLight position={[-5, -2, 3]} intensity={0.8} color="#8b5cf6" />
      <spotLight position={[0, 8, 4]} intensity={1.2} color="#3b82f6" angle={0.5} penumbra={0.7} />

      <Particles color="#3b82f6" count={250} />
      <LightRays color="#3b82f6" />

      {/* CPU */}
      <ComponentBlock position={[0, 1, 0]} size={[0.6, 0.1, 0.6]} color="#1a3a5e" metalness={0.9} roughness={0.1} delay={0.2} isActive={activeIndex === 0} emissive="#3b82f6" emissiveIntensity={0.15} />
      {/* GPU */}
      <ComponentBlock position={[-0.3, 0.4, 0.5]} size={[1.4, 0.08, 0.5]} color="#1a1a2e" metalness={0.9} roughness={0.1} delay={0.5} isActive={activeIndex === 1} emissive="#8b5cf6" emissiveIntensity={0.1} />
      {/* RAM */}
      <ComponentBlock position={[1.5, 0.6, 0.2]} size={[0.12, 0.6, 0.04]} color="#2a4a6e" metalness={0.85} roughness={0.2} delay={0.8} isActive={activeIndex === 2} />
      {/* SSDs */}
      <ComponentBlock position={[1.5, -0.1, 0.4]} size={[0.6, 0.04, 0.25]} color="#1a1a2e" metalness={0.95} roughness={0.1} delay={1.1} isActive={activeIndex === 3} />
      {/* Refrigeración */}
      <ComponentBlock position={[0, 1.3, -0.3]} size={[0.5, 0.5, 0.5]} color="#2a3a5e" shape="cylinder" metalness={0.9} roughness={0.15} delay={1.4} isActive={activeIndex === 4} emissive="#3b82f6" emissiveIntensity={0.2} />
      {/* Fuente */}
      <ComponentBlock position={[-1.5, -0.8, -0.2]} size={[0.8, 0.4, 0.6]} color="#1a1a2e" metalness={0.8} roughness={0.3} delay={1.7} isActive={activeIndex === 5} />
      {/* Caja */}
      <ComponentBlock position={[0, 0, -0.8]} size={[2, 2.2, 0.04]} color="#1a1a2e" metalness={0.9} roughness={0.2} delay={2.0} isActive={activeIndex === 6} />
      {/* Monitor OLED */}
      <ComponentBlock position={[0, 0.5, -1.5]} size={[2.5, 1, 0.05]} color="#0a0a15" metalness={0.8} roughness={0.2} delay={2.3} isActive={activeIndex === 7} emissive="#3b82f6" emissiveIntensity={0.03} />
      {/* StreamDeck */}
      <ComponentBlock position={[-1.8, -1.2, 0.8]} size={[0.5, 0.05, 0.35]} color="#1a1a2e" metalness={0.7} roughness={0.3} delay={2.6} isActive={activeIndex === 8} emissive="#8b5cf6" emissiveIntensity={0.15} />
      {/* RGB */}
      <RGBStrip position={[1.9, 0, -0.7]} />
      <RGBStrip position={[-1.9, 0, -0.7]} />
      {/* Audio */}
      <ComponentBlock position={[1.8, -1.2, 0.6]} size={[0.3, 0.3, 0.3]} color="#1a1a1a" shape="sphere" delay={3.2} isActive={activeIndex === 10} emissive="#3b82f6" emissiveIntensity={0.1} />

      <Environment preset="night" />
    </Canvas>
  );
}

// ─── CRISTINA SCENE (Apple Style) ───────────────────────────
function MacBookPro() {
  const groupRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.4;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Base */}
      <mesh position={[0, -0.05, 0]}>
        <boxGeometry args={[2.4, 0.06, 1.5]} />
        <meshStandardMaterial color="#c0c0c8" metalness={0.97} roughness={0.05} />
      </mesh>
      {/* Screen hinge area */}
      <mesh position={[0, 0.02, -0.73]}>
        <boxGeometry args={[2.3, 0.04, 0.04]} />
        <meshStandardMaterial color="#a0a0a8" metalness={0.95} roughness={0.1} />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0.85, -0.75]} rotation={[-0.15, 0, 0]}>
        <boxGeometry args={[2.3, 1.5, 0.03]} />
        <meshStandardMaterial color="#e0e0e8" metalness={0.95} roughness={0.05} />
      </mesh>
      {/* Screen display */}
      <mesh position={[0, 0.85, -0.73]} rotation={[-0.15, 0, 0]}>
        <planeGeometry args={[2.1, 1.35]} />
        <meshStandardMaterial color="#1a1a2e" emissive="#ffffff" emissiveIntensity={0.08} metalness={0.5} roughness={0.5} />
      </mesh>
      {/* Trackpad */}
      <mesh position={[0, -0.01, 0.2]}>
        <planeGeometry args={[0.9, 0.6]} />
        <meshStandardMaterial color="#b8b8c0" metalness={0.95} roughness={0.08} />
      </mesh>
      {/* Apple logo glow */}
      <mesh position={[0, 0.85, -0.77]} rotation={[-0.15, Math.PI, 0]}>
        <circleGeometry args={[0.12, 32]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

export function CristinaDetailScene({ activeIndex }: { activeIndex: number }) {
  return (
    <Canvas camera={{ position: [0, 1, 5], fov: 35 }} style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
      <pointLight position={[-5, 3, 3]} intensity={0.5} color="#e0e0e8" />
      <spotLight position={[0, 8, 4]} intensity={0.8} color="#ffffff" angle={0.3} penumbra={0.9} />

      <Particles color="#c0c0c8" count={80} />

      <Float speed={0.8} floatIntensity={0.4} rotationIntensity={0.05}>
        <MacBookPro />
      </Float>

      {/* Subtle glow spheres */}
      {activeIndex >= 0 && (
        <mesh position={[0, -1.5, 0]}>
          <circleGeometry args={[3, 64]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.02} />
        </mesh>
      )}

      <Environment preset="apartment" />
    </Canvas>
  );
}

// ─── MARCELL SCENE ──────────────────────────────────────────
export function MarcellDetailScene({ activeIndex }: { activeIndex: number }) {
  return (
    <Canvas camera={{ position: [0, 0.5, 7], fov: 40 }} style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#a855f7" />
      <pointLight position={[-5, -2, 3]} intensity={0.6} color="#7c3aed" />
      <spotLight position={[0, 8, 4]} intensity={1} color="#a855f7" angle={0.4} penumbra={0.8} />

      <Particles color="#a855f7" count={180} />
      <LightRays color="#7c3aed" />

      {/* Sound waves */}
      <SoundWave radius={1.5} color="#a855f7" />
      <SoundWave radius={2.5} color="#7c3aed" />
      <SoundWave radius={3.5} color="#a855f7" />

      {/* CPU */}
      <ComponentBlock position={[0, 0.8, 0]} size={[0.5, 0.08, 0.5]} color="#2a1a4e" metalness={0.9} roughness={0.15} delay={0.2} isActive={activeIndex === 0} emissive="#a855f7" emissiveIntensity={0.15} />
      {/* RAM */}
      <ComponentBlock position={[-1.3, 0.5, 0.3]} size={[0.12, 0.5, 0.04]} color="#3a2a5e" metalness={0.85} roughness={0.2} delay={0.5} isActive={activeIndex === 1} />
      {/* SSD RAID */}
      <ComponentBlock position={[1.3, 0.4, 0.2]} size={[0.6, 0.04, 0.25]} color="#1a1a2e" metalness={0.95} roughness={0.1} delay={0.8} isActive={activeIndex === 2} />
      {/* Interfaz audio */}
      <ComponentBlock position={[-1.5, -0.3, 0.8]} size={[0.8, 0.12, 0.4]} color="#2a2a3e" metalness={0.8} roughness={0.2} delay={1.1} isActive={activeIndex === 3} emissive="#a855f7" emissiveIntensity={0.1} />
      {/* Monitores estudio */}
      <ComponentBlock position={[-2, 0.8, -0.5]} size={[0.5, 0.7, 0.4]} color="#1a1a1a" metalness={0.6} roughness={0.4} delay={1.4} isActive={activeIndex === 4} />
      <ComponentBlock position={[2, 0.8, -0.5]} size={[0.5, 0.7, 0.4]} color="#1a1a1a" metalness={0.6} roughness={0.4} delay={1.5} isActive={activeIndex === 4} />
      {/* Auriculares */}
      <ComponentBlock position={[1.5, -0.5, 0.6]} size={[0.4, 0.4, 0.4]} color="#1a1a1a" shape="sphere" metalness={0.7} roughness={0.3} delay={1.8} isActive={activeIndex === 5} emissive="#a855f7" emissiveIntensity={0.05} />
      {/* Controladores */}
      <ComponentBlock position={[0, -1.2, 1]} size={[1.2, 0.06, 0.5]} color="#2a2a3e" metalness={0.7} roughness={0.3} delay={2.1} isActive={activeIndex === 6} emissive="#7c3aed" emissiveIntensity={0.08} />
      {/* Mesa sonido */}
      <ComponentBlock position={[0, -0.8, 0.5]} size={[1.8, 0.08, 0.8]} color="#1a1a2e" metalness={0.6} roughness={0.4} delay={2.4} isActive={activeIndex === 7} emissive="#a855f7" emissiveIntensity={0.03} />

      <Environment preset="night" />
    </Canvas>
  );
}
