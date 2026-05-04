import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { PieceDispatcher } from './PieceDispatcher';
import { Lights } from './Lights';
import { prefersReducedMotion, isLowEndDevice } from '@/lib/theme';
import type { PieceKind } from '@/data/axes';
import { useForceCanvasResize } from './useForceCanvasResize';

const Spinner = ({
  kind,
  highlight,
  spinning,
  reduce,
}: {
  kind: PieceKind;
  highlight: boolean;
  spinning: boolean;
  reduce: boolean;
}) => {
  useForceCanvasResize();
  const group = useRef<THREE.Group>(null);
  const targetSpeed = useRef(0);

  useFrame((_, delta) => {
    if (!group.current) return;
    const desired = reduce ? 0 : spinning ? (Math.PI * 2) / 12 : (Math.PI * 2) / 90;
    targetSpeed.current = THREE.MathUtils.lerp(targetSpeed.current, desired, 0.06);
    group.current.rotation.y += delta * targetSpeed.current;
  });

  return (
    <group ref={group} rotation={[0, -0.4, 0]}>
      <PieceDispatcher
        kind={kind}
        normalize
        scale={1.25}
        color={highlight ? '#c9a961' : '#f5e6c8'}
      />
    </group>
  );
};

export const PieceMini = ({
  kind,
  highlight = false,
  spinning = false,
}: {
  kind: PieceKind;
  highlight?: boolean;
  spinning?: boolean;
}) => {
  const reduce = prefersReducedMotion();
  const lowEnd = isLowEndDevice();

  return (
    <Canvas
      shadows={false}
      dpr={[1, 1.4]}
      camera={{ position: [0.6, 1.6, 3.6], fov: 28 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
      onCreated={({ camera }) => camera.lookAt(0, 1.2, 0)}
    >
      <Lights lowEnd={lowEnd} shadows={false} />
      <Spinner
        kind={kind}
        highlight={highlight}
        spinning={spinning}
        reduce={reduce}
      />
    </Canvas>
  );
};
