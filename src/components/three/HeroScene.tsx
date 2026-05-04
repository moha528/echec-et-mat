import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei/core/ContactShadows.js';
import * as THREE from 'three';
import { GLBPiece } from '@/lib/chess-pieces/GLBPiece';
import { Lights } from './Lights';
import { prefersReducedMotion, isLowEndDevice } from '@/lib/theme';
import { useForceCanvasResize } from './useForceCanvasResize';

const ROTATION_PERIOD = 45; // seconds for full rotation — slower, more confident

const RotatingHero = ({ paused }: { paused: boolean }) => {
  useForceCanvasResize();
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (paused || !group.current) return;
    group.current.rotation.y += delta * (Math.PI * 2) / ROTATION_PERIOD;
  });
  return (
    <group ref={group} position={[0, 0, 0]}>
      <GLBPiece kind="knight" color="#f5e6c8" scale={1.6} />
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
      camera={{ position: [0.4, 3.2, 7.2], fov: 28 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
      onCreated={({ camera }) => camera.lookAt(0, 1.4, 0)}
    >
      <color attach="background" args={['#0a0a0a']} />
      <Lights lowEnd={lowEnd} shadows={!lowEnd} />
      <RotatingHero paused={reduce} />
      <ContactShadows
        position={[0, 0.001, 0]}
        opacity={0.6}
        scale={6}
        blur={2.6}
        far={5}
        color="#000000"
        resolution={lowEnd ? 256 : 512}
      />
    </Canvas>
  );
};
