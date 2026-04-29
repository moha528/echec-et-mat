import { PieceBase, PieceMaterial, PIECE_BASE_TOP, type ChessPieceProps } from './PieceBase';

export const King = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = '#f5e6c8',
  scale = 1,
}: ChessPieceProps) => {
  const stemH = 0.7;
  const stemBase = PIECE_BASE_TOP;
  const stemTop = stemBase + stemH;
  // Belly (orb) sits on stem
  const orbR = 0.2;
  const orbY = stemTop + orbR * 0.85;
  // Crown plate
  const plateY = orbY + orbR * 0.85 + 0.025;
  const crossBaseY = plateY + 0.05 + 0.13;
  const crossArmY = crossBaseY + 0.13;

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <PieceBase color={color} />
      {/* Tapered stem */}
      <mesh position={[0, stemBase + stemH / 2, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.18, stemH, 28]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Mid ring */}
      <mesh position={[0, stemBase + stemH * 0.55, 0]} castShadow>
        <torusGeometry args={[0.13, 0.018, 10, 28]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Orb (head) */}
      <mesh position={[0, orbY, 0]} castShadow>
        <sphereGeometry args={[orbR, 28, 20]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Plate base for cross */}
      <mesh position={[0, plateY, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.16, 0.05, 24]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Cross — vertical */}
      <mesh position={[0, crossBaseY, 0]} castShadow>
        <boxGeometry args={[0.05, 0.28, 0.05]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Cross — horizontal */}
      <mesh position={[0, crossArmY, 0]} castShadow>
        <boxGeometry args={[0.18, 0.05, 0.05]} />
        <PieceMaterial color={color} />
      </mesh>
    </group>
  );
};
