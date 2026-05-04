import { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import type { ChessPieceProps } from './PieceBase';

const MODEL_URLS = {
  king: '/models/king.glb',
  queen: '/models/queen.glb',
  bishop: '/models/bishop.glb',
  knight: '/models/knight.glb',
  rook: '/models/rook.glb',
  pawn: '/models/pawn.glb',
} as const;

export type GLBKind = keyof typeof MODEL_URLS;

// Multiplier to roughly equalize visual height when pieces are shown alone in
// a card / spotlight view. Real chess proportions (king tallest, pawn shortest)
// are preserved on the actual board — this is opt-in via `normalize`.
const DISPLAY_NORMALIZE: Record<GLBKind, number> = {
  king: 1.0,
  queen: 1.07,
  bishop: 1.18,
  knight: 1.25,
  rook: 1.45,
  pawn: 1.55,
};

type Props = ChessPieceProps & { kind: GLBKind; normalize?: boolean };

export const GLBPiece = ({
  kind,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = '#f5e6c8',
  scale = 1,
  normalize = false,
}: Props) => {
  const effectiveScale = normalize ? scale * DISPLAY_NORMALIZE[kind] : scale;
  const { scene } = useGLTF(MODEL_URLS[kind]);
  const geometry = useMemo(() => {
    let geom: THREE.BufferGeometry | null = null;
    scene.traverse((o) => {
      if (!geom && (o as THREE.Mesh).isMesh) {
        geom = (o as THREE.Mesh).geometry;
      }
    });
    return geom;
  }, [scene]);

  if (!geometry) return null;

  return (
    <mesh
      geometry={geometry}
      position={position}
      rotation={rotation}
      scale={effectiveScale}
      castShadow
      receiveShadow
    >
      <meshStandardMaterial color={color} roughness={0.42} metalness={0.06} />
    </mesh>
  );
};

Object.values(MODEL_URLS).forEach((url) => useGLTF.preload(url));
