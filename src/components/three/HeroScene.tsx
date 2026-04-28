import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei/core/ContactShadows.js';
import * as THREE from 'three';
import { King } from '@/lib/chess-pieces/King';
import { Lights } from './Lights';
import { prefersReducedMotion, isLowEndDevice } from '@/lib/theme';

const RotatingKing = ({ paused }: { paused: boolean }) => {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (paused || !group.current) return;
    group.current.rotation.y += delta * (Math.PI * 2) / 30;
  });
  return (
    <group ref={group} position={[0, 0, 0]}>
      <King color="#f5e6c8" scale={1.7} />
    </group>
  );
};

export const HeroScene = () => {
  const reduce = prefersReducedMotion();
  const lowEnd = isLowEndDevice();

  return (
    <Canvas
      shadows={!lowEnd}
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.6, 3.4], fov: 35 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <color attach="background" args={['#0a0a0a']} />
      <Lights lowEnd={lowEnd} shadows={!lowEnd} />
      <RotatingKing paused={reduce} />
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.55}
        scale={5}
        blur={2.4}
        far={4}
        color="#000000"
        resolution={lowEnd ? 256 : 512}
      />
    </Canvas>
  );
};
