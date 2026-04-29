import { PieceBase, PieceMaterial, PIECE_BASE_TOP, type ChessPieceProps } from './PieceBase';

export const Knight = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = '#f5e6c8',
  scale = 1,
}: ChessPieceProps) => {
  const stemH = 0.38;
  const stemBase = PIECE_BASE_TOP;
  const stemTop = stemBase + stemH;
  const neckBaseY = stemTop + 0.05;

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <PieceBase color={color} />
      {/* Stem */}
      <mesh position={[0, stemBase + stemH / 2, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.18, stemH, 28]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Collar */}
      <mesh position={[0, stemTop, 0]} castShadow>
        <cylinderGeometry args={[0.2, 0.16, 0.06, 24]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Neck — angled forward (back arched) */}
      <mesh
        position={[0.04, neckBaseY + 0.22, 0]}
        rotation={[0, 0, -0.25]}
        castShadow
      >
        <boxGeometry args={[0.18, 0.5, 0.24]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Mane (triangular crest behind) */}
      <mesh
        position={[-0.08, neckBaseY + 0.46, 0]}
        rotation={[0, 0, 0.45]}
        castShadow
      >
        <boxGeometry args={[0.1, 0.32, 0.2]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Mane tip (small) */}
      <mesh
        position={[-0.13, neckBaseY + 0.58, 0]}
        rotation={[0, 0, 0.55]}
        castShadow
      >
        <boxGeometry args={[0.08, 0.18, 0.16]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Head */}
      <mesh
        position={[0.16, neckBaseY + 0.56, 0]}
        rotation={[0, 0, -0.35]}
        castShadow
      >
        <boxGeometry args={[0.34, 0.2, 0.22]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Snout */}
      <mesh
        position={[0.32, neckBaseY + 0.48, 0]}
        rotation={[0, 0, -0.2]}
        castShadow
      >
        <boxGeometry args={[0.18, 0.14, 0.18]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Ears (2 small triangles) */}
      <mesh position={[0.08, neckBaseY + 0.74, 0.07]} rotation={[0, 0, -0.3]} castShadow>
        <coneGeometry args={[0.04, 0.1, 4]} />
        <PieceMaterial color={color} />
      </mesh>
      <mesh position={[0.08, neckBaseY + 0.74, -0.07]} rotation={[0, 0, -0.3]} castShadow>
        <coneGeometry args={[0.04, 0.1, 4]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Eyes */}
      <mesh position={[0.24, neckBaseY + 0.56, 0.115]}>
        <sphereGeometry args={[0.018, 8, 8]} />
        <meshStandardMaterial color="#0a0a0a" roughness={1} />
      </mesh>
      <mesh position={[0.24, neckBaseY + 0.56, -0.115]}>
        <sphereGeometry args={[0.018, 8, 8]} />
        <meshStandardMaterial color="#0a0a0a" roughness={1} />
      </mesh>
    </group>
  );
};
