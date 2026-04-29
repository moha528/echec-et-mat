import { PieceBase, PieceMaterial, PIECE_BASE_TOP, type ChessPieceProps } from './PieceBase';

export const Sigma = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = '#f5e6c8',
  scale = 1,
}: ChessPieceProps) => {
  const stemH = 0.32;
  const stemBase = PIECE_BASE_TOP;
  const stemTop = stemBase + stemH;
  const prismH = 0.78;
  const prismY = stemTop + prismH / 2 + 0.02;
  const prismR = 0.24;

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <PieceBase color={color} />
      {/* Stem */}
      <mesh position={[0, stemBase + stemH / 2, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.18, stemH, 28]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Collar */}
      <mesh position={[0, stemTop + 0.01, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.13, 0.04, 28]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Triangular prism — vertical, 3 sides */}
      <mesh
        position={[0, prismY, 0]}
        rotation={[0, Math.PI / 6, 0]}
        castShadow
      >
        <cylinderGeometry args={[prismR, prismR * 0.92, prismH, 3]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Apex finial */}
      <mesh
        position={[0, prismY + prismH / 2 + 0.05, 0]}
        rotation={[0, 0, Math.PI / 4]}
        castShadow
      >
        <octahedronGeometry args={[0.07, 0]} />
        <PieceMaterial color={color} />
      </mesh>
    </group>
  );
};
