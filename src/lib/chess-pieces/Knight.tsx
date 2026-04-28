import { PieceBase, PieceMaterial, PIECE_BASE_TOP, type ChessPieceProps } from './PieceBase';

export const Knight = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = '#f5e6c8',
  scale = 1,
}: ChessPieceProps) => {
  const stemH = 0.42;
  const stemY = PIECE_BASE_TOP + stemH / 2;
  const neckY = PIECE_BASE_TOP + stemH + 0.05;

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <PieceBase color={color} />
      <mesh position={[0, stemY, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.18, stemH, 24]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Neck (angled forward) */}
      <mesh position={[0.06, neckY + 0.18, 0]} rotation={[0, 0, -0.35]} castShadow>
        <boxGeometry args={[0.18, 0.4, 0.22]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Head */}
      <mesh position={[0.18, neckY + 0.4, 0]} rotation={[0, 0, -0.5]} castShadow>
        <boxGeometry args={[0.32, 0.18, 0.2]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Snout */}
      <mesh position={[0.32, neckY + 0.34, 0]} rotation={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.18, 0.12, 0.16]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Mane */}
      <mesh position={[-0.05, neckY + 0.42, 0]} rotation={[0, 0, 0.3]} castShadow>
        <boxGeometry args={[0.12, 0.26, 0.18]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Eye */}
      <mesh position={[0.22, neckY + 0.42, 0.11]}>
        <sphereGeometry args={[0.018, 8, 8]} />
        <meshStandardMaterial color="#0a0a0a" roughness={1} />
      </mesh>
      <mesh position={[0.22, neckY + 0.42, -0.11]}>
        <sphereGeometry args={[0.018, 8, 8]} />
        <meshStandardMaterial color="#0a0a0a" roughness={1} />
      </mesh>
    </group>
  );
};
