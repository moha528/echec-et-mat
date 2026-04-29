import { PieceBase, PieceMaterial, PIECE_BASE_TOP, type ChessPieceProps } from './PieceBase';

export const Queen = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = '#f5e6c8',
  scale = 1,
}: ChessPieceProps) => {
  const stemH = 0.72;
  const stemBase = PIECE_BASE_TOP;
  const stemTop = stemBase + stemH;
  const orbR = 0.18;
  const orbY = stemTop + orbR * 0.85;
  const crownPlateY = orbY + orbR * 0.85 + 0.02;
  const teethY = crownPlateY + 0.06;

  const teethCount = 9;
  const teeth = Array.from({ length: teethCount }, (_, i) => {
    const a = (i / teethCount) * Math.PI * 2;
    const r = 0.18;
    return [Math.cos(a) * r, teethY, Math.sin(a) * r] as [number, number, number];
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <PieceBase color={color} />
      {/* Tapered stem */}
      <mesh position={[0, stemBase + stemH / 2, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.17, stemH, 28]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Lower ring */}
      <mesh position={[0, stemBase + 0.18, 0]} castShadow>
        <torusGeometry args={[0.14, 0.018, 10, 28]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Upper ring */}
      <mesh position={[0, stemTop - 0.05, 0]} castShadow>
        <torusGeometry args={[0.105, 0.018, 10, 28]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Orb */}
      <mesh position={[0, orbY, 0]} castShadow>
        <sphereGeometry args={[orbR, 28, 20]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Crown plate */}
      <mesh position={[0, crownPlateY, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.15, 0.04, 28]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Tiara teeth */}
      {teeth.map((p, i) => (
        <mesh key={i} position={p} castShadow>
          <coneGeometry args={[0.025, 0.08, 6]} />
          <PieceMaterial color={color} />
        </mesh>
      ))}
      {/* Apex */}
      <mesh position={[0, teethY + 0.02, 0]} castShadow>
        <sphereGeometry args={[0.04, 14, 10]} />
        <PieceMaterial color={color} />
      </mesh>
    </group>
  );
};
