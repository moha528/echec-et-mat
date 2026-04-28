import { PieceBase, PieceMaterial, PIECE_BASE_TOP, type ChessPieceProps } from './PieceBase';

export const Rook = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = '#f5e6c8',
  scale = 1,
}: ChessPieceProps) => {
  const stemH = 0.55;
  const stemY = PIECE_BASE_TOP + stemH / 2;
  const towerH = 0.28;
  const towerY = PIECE_BASE_TOP + stemH + towerH / 2;
  const towerTop = PIECE_BASE_TOP + stemH + towerH;
  const battlement = 0.08;

  const merlons = [
    [-0.15, 0],
    [0.15, 0],
    [0, -0.15],
    [0, 0.15],
  ] as const;

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <PieceBase color={color} />
      <mesh position={[0, stemY, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.18, stemH, 24]} />
        <PieceMaterial color={color} />
      </mesh>
      <mesh position={[0, towerY, 0]} castShadow>
        <boxGeometry args={[0.42, towerH, 0.42]} />
        <PieceMaterial color={color} />
      </mesh>
      {merlons.map(([x, z], i) => (
        <mesh key={i} position={[x, towerTop + battlement / 2, z]} castShadow>
          <boxGeometry args={[0.1, battlement, 0.1]} />
          <PieceMaterial color={color} />
        </mesh>
      ))}
    </group>
  );
};
