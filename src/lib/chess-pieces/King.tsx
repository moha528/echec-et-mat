import { PieceBase, PieceMaterial, PIECE_BASE_TOP, type ChessPieceProps } from './PieceBase';

export const King = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = '#f5e6c8',
  scale = 1,
}: ChessPieceProps) => {
  const stemH = 0.55;
  const stemY = PIECE_BASE_TOP + stemH / 2;
  const bellyR = 0.22;
  const bellyY = PIECE_BASE_TOP + stemH + bellyR * 0.7;
  const collarH = 0.04;
  const collarY = bellyY + bellyR * 0.7 + collarH / 2;
  const crossBaseY = collarY + collarH / 2 + 0.08;
  const crossArmY = crossBaseY + 0.13;

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <PieceBase color={color} />
      {/* Stem */}
      <mesh position={[0, stemY, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.18, stemH, 24]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Belly */}
      <mesh position={[0, bellyY, 0]} castShadow>
        <sphereGeometry args={[bellyR, 24, 16]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Top collar */}
      <mesh position={[0, collarY, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.18, collarH, 24]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Cross — vertical */}
      <mesh position={[0, crossBaseY, 0]} castShadow>
        <boxGeometry args={[0.06, 0.26, 0.06]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Cross — horizontal */}
      <mesh position={[0, crossArmY, 0]} castShadow>
        <boxGeometry args={[0.18, 0.06, 0.06]} />
        <PieceMaterial color={color} />
      </mesh>
    </group>
  );
};
