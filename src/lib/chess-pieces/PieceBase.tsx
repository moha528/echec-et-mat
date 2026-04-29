import type { ReactNode } from 'react';

export type PieceColor = '#f5e6c8' | '#c9a961' | string;

export type ChessPieceProps = {
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: PieceColor;
  scale?: number;
  children?: ReactNode;
};

const BASE_R_BOTTOM = 0.36;
const BASE_R_TOP = 0.32;
const BASE_H = 0.08;
const PLATE_H = 0.04;
const PLATE_R = 0.3;
const COLLAR_H = 0.05;
const COLLAR_R = 0.22;

export const PieceMaterial = ({ color }: { color: string }) => (
  <meshStandardMaterial color={color} roughness={0.35} metalness={0.08} />
);

export const PieceBase = ({ color }: { color: string }) => (
  <group>
    {/* Foot */}
    <mesh position={[0, BASE_H / 2, 0]} castShadow receiveShadow>
      <cylinderGeometry args={[BASE_R_TOP, BASE_R_BOTTOM, BASE_H, 36]} />
      <PieceMaterial color={color} />
    </mesh>
    {/* Plate */}
    <mesh position={[0, BASE_H + PLATE_H / 2, 0]} castShadow>
      <cylinderGeometry args={[PLATE_R, BASE_R_TOP, PLATE_H, 36]} />
      <PieceMaterial color={color} />
    </mesh>
    {/* Collar (ring shoulder) */}
    <mesh position={[0, BASE_H + PLATE_H + COLLAR_H / 2, 0]} castShadow>
      <cylinderGeometry args={[COLLAR_R, PLATE_R - 0.02, COLLAR_H, 36]} />
      <PieceMaterial color={color} />
    </mesh>
  </group>
);

export const PIECE_BASE_TOP = BASE_H + PLATE_H + COLLAR_H;
