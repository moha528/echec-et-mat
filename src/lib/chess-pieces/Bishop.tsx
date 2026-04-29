import { PieceBase, PieceMaterial, PIECE_BASE_TOP, type ChessPieceProps } from './PieceBase';

export const Bishop = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = '#f5e6c8',
  scale = 1,
}: ChessPieceProps) => {
  const stemH = 0.55;
  const stemBase = PIECE_BASE_TOP;
  const stemTop = stemBase + stemH;
  // Bulb (collar bulb between stem and mitre)
  const bulbR = 0.16;
  const bulbY = stemTop + bulbR * 0.65;
  // Mitre
  const mitreH = 0.5;
  const mitreY = bulbY + bulbR * 0.65 + mitreH / 2;
  const tipY = bulbY + bulbR * 0.65 + mitreH + 0.04;
  const slitY = mitreY + mitreH * 0.2;

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <PieceBase color={color} />
      {/* Tapered stem */}
      <mesh position={[0, stemBase + stemH / 2, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.18, stemH, 28]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Lower ring */}
      <mesh position={[0, stemBase + 0.18, 0]} castShadow>
        <torusGeometry args={[0.14, 0.016, 10, 24]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Bulb */}
      <mesh position={[0, bulbY, 0]} castShadow>
        <sphereGeometry args={[bulbR, 24, 16]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Mitre */}
      <mesh position={[0, mitreY, 0]} castShadow>
        <coneGeometry args={[0.16, mitreH, 28]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Slit */}
      <mesh position={[0, slitY, 0.18]} castShadow>
        <boxGeometry args={[0.04, 0.12, 0.06]} />
        <meshStandardMaterial color="#0a0a0a" roughness={1} metalness={0} />
      </mesh>
      {/* Finial sphere */}
      <mesh position={[0, tipY, 0]} castShadow>
        <sphereGeometry args={[0.045, 14, 12]} />
        <PieceMaterial color={color} />
      </mesh>
    </group>
  );
};
