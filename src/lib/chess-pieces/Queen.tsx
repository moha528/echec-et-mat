import { PieceBase, PieceMaterial, PIECE_BASE_TOP, type ChessPieceProps } from './PieceBase';

export const Queen = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = '#f5e6c8',
  scale = 1,
}: ChessPieceProps) => {
  const stemH = 0.6;
  const stemY = PIECE_BASE_TOP + stemH / 2;
  const bellyR = 0.2;
  const bellyY = PIECE_BASE_TOP + stemH + bellyR * 0.6;
  const crownY = bellyY + bellyR * 0.7 + 0.04;
  const finialY = crownY + 0.1;

  const teeth = Array.from({ length: 8 }, (_, i) => {
    const a = (i / 8) * Math.PI * 2;
    const r = 0.2;
    return [Math.cos(a) * r, crownY, Math.sin(a) * r] as [number, number, number];
  });

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <PieceBase color={color} />
      <mesh position={[0, stemY, 0]} castShadow>
        <cylinderGeometry args={[0.11, 0.17, stemH, 24]} />
        <PieceMaterial color={color} />
      </mesh>
      <mesh position={[0, bellyY, 0]} castShadow>
        <sphereGeometry args={[bellyR, 20, 14]} />
        <PieceMaterial color={color} />
      </mesh>
      {/* Crown ring */}
      <mesh position={[0, crownY, 0]} castShadow>
        <torusGeometry args={[0.2, 0.025, 12, 24]} />
        <PieceMaterial color={color} />
      </mesh>
      {teeth.map((p, i) => (
        <mesh key={i} position={p} castShadow>
          <sphereGeometry args={[0.03, 10, 8]} />
          <PieceMaterial color={color} />
        </mesh>
      ))}
      {/* Finial */}
      <mesh position={[0, finialY, 0]} castShadow>
        <sphereGeometry args={[0.05, 12, 10]} />
        <PieceMaterial color={color} />
      </mesh>
    </group>
  );
};
