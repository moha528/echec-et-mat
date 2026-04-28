import { PieceBase, PieceMaterial, PIECE_BASE_TOP, type ChessPieceProps } from './PieceBase';

export const Bishop = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = '#f5e6c8',
  scale = 1,
}: ChessPieceProps) => {
  const stemH = 0.55;
  const stemY = PIECE_BASE_TOP + stemH / 2;
  const mitreH = 0.4;
  const mitreY = PIECE_BASE_TOP + stemH + mitreH / 2;
  const tipY = PIECE_BASE_TOP + stemH + mitreH + 0.06;
  const slitY = mitreY + mitreH * 0.18;

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <PieceBase color={color} />
      <mesh position={[0, stemY, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.18, stemH, 24]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Mitre */}
      <mesh position={[0, mitreY, 0]} castShadow>
        <coneGeometry args={[0.18, mitreH, 24]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Slit (subtle ink box cut) */}
      <mesh position={[0, slitY, 0.18]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.04, 0.08, 0.04]} />
        <meshStandardMaterial color="#0a0a0a" roughness={1} metalness={0} />
      </mesh>
      {/* Finial sphere */}
      <mesh position={[0, tipY, 0]} castShadow>
        <sphereGeometry args={[0.05, 14, 12]} />
        <PieceMaterial color={color} />
      </mesh>
    </group>
  );
};
