import type { ReactNode } from 'react';

export type PieceColor = '#f5e6c8' | '#c9a961' | string;

export type ChessPieceProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: PieceColor;
  scale?: number;
  children?: ReactNode;
};

const BASE_RADIUS_BOTTOM = 0.34;
const BASE_RADIUS_TOP = 0.32;
const BASE_HEIGHT = 0.1;
const COLLAR_HEIGHT = 0.04;
const COLLAR_RADIUS = 0.28;

export const PieceMaterial = ({ color }: { color: string }) => (
  <meshStandardMaterial color={color} roughness={0.45} metalness={0.06} />
);

export const PieceBase = ({ color }: { color: string }) => (
  <group>
    <mesh position={[0, BASE_HEIGHT / 2, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[BASE_RADIUS_TOP, BASE_RADIUS_BOTTOM, BASE_HEIGHT, 32]} />
      <PieceMaterial color={color} />
    </mesh>
    <mesh position={[0, BASE_HEIGHT + COLLAR_HEIGHT / 2, 0]} castShadow>
      <cylinderGeometry args={[COLLAR_RADIUS, BASE_RADIUS_TOP - 0.01, COLLAR_HEIGHT, 32]} />
      <PieceMaterial color={color} />
    </mesh>
  </group>
);

export const PIECE_BASE_TOP = BASE_HEIGHT + COLLAR_HEIGHT;
