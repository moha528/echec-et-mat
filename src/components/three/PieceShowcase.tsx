import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows } from '@react-three/drei/core/ContactShadows.js';
import * as THREE from 'three';
import { PieceDispatcher } from './PieceDispatcher';
import { Lights } from './Lights';
import { prefersReducedMotion, isLowEndDevice } from '@/lib/theme';
import type { PieceKind } from '@/data/axes';

const StaticPiece = ({
  kind,
  highlight,
  paused,
}: {
  kind: PieceKind;
  highlight: boolean;
  paused: boolean;
}) => {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (paused || !group.current) return;
    group.current.rotation.y += delta * (Math.PI * 2) / 60;
  });
  return (
    <group ref={group} position={[0, 0, 0]} rotation={[0, -0.4, 0]}>
      <PieceDispatcher
        kind={kind}
        scale={2}
        color={highlight ? '#c9a961' : '#f5e6c8'}
      />
    </group>
  );
};

export const PieceShowcase = ({
  kind,
  highlight = false,
}: {
  kind: PieceKind;
  highlight?: boolean;
}) => {
  const reduce = prefersReducedMotion();
  const lowEnd = isLowEndDevice();

  return (
    <Canvas
      shadows={!lowEnd}
      dpr={[1, 1.5]}
      camera={{ position: [1, 2.2, 4], fov: 32 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <Lights lowEnd={lowEnd} shadows={!lowEnd} />
      <StaticPiece kind={kind} highlight={highlight} paused={reduce} />
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.5}
        scale={4}
        blur={2.6}
        far={4}
        color="#000000"
        resolution={lowEnd ? 256 : 512}
      />
    </Canvas>
  );
};
