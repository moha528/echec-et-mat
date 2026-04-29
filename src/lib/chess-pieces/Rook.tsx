import { PieceBase, PieceMaterial, PIECE_BASE_TOP, type ChessPieceProps } from './PieceBase';

export const Rook = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = '#f5e6c8',
  scale = 1,
}: ChessPieceProps) => {
  const stemH = 0.5;
  const stemBase = PIECE_BASE_TOP;
  const stemTop = stemBase + stemH;
  const towerW = 0.42;
  const towerH = 0.32;
  const towerY = stemTop + towerH / 2;
  const towerTopY = stemTop + towerH;
  const battlement = 0.1;

  const merlons = [
    [-0.16, -0.16],
    [0.16, -0.16],
    [-0.16, 0.16],
    [0.16, 0.16],
  ] as const;

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <PieceBase color={color} />
      {/* Cylindrical stem */}
      <mesh position={[0, stemBase + stemH / 2, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.18, stemH, 28]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Top ring before tower */}
      <mesh position={[0, stemTop - 0.02, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.18, 0.04, 28]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Square tower */}
      <mesh position={[0, towerY, 0]} castShadow>
        <boxGeometry args={[towerW, towerH, towerW]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Cap ring */}
      <mesh position={[0, towerTopY + 0.015, 0]} castShadow>
        <boxGeometry args={[towerW + 0.04, 0.03, towerW + 0.04]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Battlements (4 corners) */}
      {merlons.map(([x, z], i) => (
        <mesh
          key={i}
          position={[x, towerTopY + battlement / 2 + 0.03, z]}
          castShadow
        >
          <boxGeometry args={[0.1, battlement, 0.1]} />
          <PieceMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
};
