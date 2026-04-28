import { PieceBase, PieceMaterial, PIECE_BASE_TOP, type ChessPieceProps } from './PieceBase';

export const Sigma = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = '#f5e6c8',
  scale = 1,
}: ChessPieceProps) => {
  const stemH = 0.32;
  const stemY = PIECE_BASE_TOP + stemH / 2;
  const prismH = 0.7;
  const prismY = PIECE_BASE_TOP + stemH + prismH / 2;
  const prismR = 0.22;

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <PieceBase color={color} />
      <mesh position={[0, stemY, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.18, stemH, 24]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Triangular prism — vertical, 3 sides */}
      <mesh position={[0, prismY, 0]} rotation={[0, Math.PI / 6, 0]} castShadow>
        <cylinderGeometry args={[prismR, prismR, prismH, 3]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Apex finial */}
      <mesh position={[0, prismY + prismH / 2 + 0.04, 0]} castShadow>
        <octahedronGeometry args={[0.06, 0]} />
        <PieceMaterial color={color} />
      </mesh>
    </group>
  );
};
