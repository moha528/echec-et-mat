import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { PieceDispatcher } from './PieceDispatcher';
import { Lights } from './Lights';
import { axes, type Axe } from '@/data/axes';
import { prefersReducedMotion, isLowEndDevice } from '@/lib/theme';

const SQUARE = 1;
const BOARD_HALF = 4;

const fileRankToWorld = ([file, rank]: [number, number]): [number, number, number] => [
  file - 3.5,
  0,
  3.5 - rank,
];

const Board = () => {
  const squares = useMemo(() => {
    const list: { key: string; pos: [number, number, number]; light: boolean }[] = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        list.push({
          key: `${i}-${j}`,
          pos: [i - 3.5, 0, 3.5 - j],
          light: (i + j) % 2 === 0,
        });
      }
    }
    return list;
  }, []);

  return (
    <group>
      {/* Outer wood-like frame (deep) */}
      <mesh position={[0, -0.1, 0]} receiveShadow>
        <boxGeometry args={[BOARD_HALF * 2 + 1.2, 0.2, BOARD_HALF * 2 + 1.2]} />
        <meshStandardMaterial color="#0f0d0a" roughness={0.65} metalness={0.15} />
      </mesh>
      {/* Bronze inner frame */}
      <mesh position={[0, -0.005, 0]} receiveShadow>
        <boxGeometry args={[BOARD_HALF * 2 + 0.5, 0.04, BOARD_HALF * 2 + 0.5]} />
        <meshStandardMaterial color="#c9a961" roughness={0.4} metalness={0.55} />
      </mesh>
      {/* Inner ink rim */}
      <mesh position={[0, 0.018, 0]} receiveShadow>
        <boxGeometry args={[BOARD_HALF * 2 + 0.2, 0.005, BOARD_HALF * 2 + 0.2]} />
        <meshStandardMaterial color="#1a1815" roughness={0.6} metalness={0.1} />
      </mesh>
      {/* Squares */}
      {squares.map((s) => (
        <mesh key={s.key} position={s.pos} receiveShadow>
          <boxGeometry args={[SQUARE * 0.99, 0.02, SQUARE * 0.99]} />
          <meshStandardMaterial
            color={s.light ? '#231f1a' : '#141312'}
            roughness={0.75}
            metalness={0.08}
          />
        </mesh>
      ))}
    </group>
  );
};

const HoverDisc = ({ position }: { position: [number, number, number] }) => (
  <mesh position={[position[0], 0.025, position[2]]} rotation={[-Math.PI / 2, 0, 0]}>
    <ringGeometry args={[0.34, 0.5, 36]} />
    <meshBasicMaterial color="#c9a961" transparent opacity={0.3} />
  </mesh>
);

type BoardPieceProps = {
  axe: Axe;
  selected: boolean;
  hovered: boolean;
  onHover: (id: string | null) => void;
  onSelect: (id: string) => void;
  reduce: boolean;
};

const BoardPiece = ({ axe, selected, hovered, onHover, onSelect, reduce }: BoardPieceProps) => {
  const ref = useRef<THREE.Group>(null);
  const [worldX, , worldZ] = fileRankToWorld(axe.position);
  const lift = hovered || selected ? 0.34 : 0;

  useFrame(() => {
    if (!ref.current) return;
    if (reduce) {
      ref.current.position.y = lift;
      return;
    }
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, lift, 0.12);
  });

  return (
    <group>
      <group
        ref={ref}
        position={[worldX, 0, worldZ]}
        onPointerEnter={(e) => {
          e.stopPropagation();
          onHover(axe.id);
          document.body.style.cursor = 'pointer';
        }}
        onPointerLeave={() => {
          onHover(null);
          document.body.style.cursor = 'default';
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(axe.id);
        }}
      >
        <PieceDispatcher
          kind={axe.piece}
          color={axe.highlight ? '#c9a961' : '#f5e6c8'}
          scale={0.88}
        />
      </group>
      {(hovered || selected) && <HoverDisc position={[worldX, 0, worldZ]} />}
    </group>
  );
};

type CameraDirectorProps = {
  target: [number, number, number] | null;
  reduce: boolean;
};

// Slightly higher and closer for a more cinematic, enveloping framing.
const HOME_POS: [number, number, number] = [0, 7.2, 8.4];
const HOME_LOOK: [number, number, number] = [0, 0, 0];

const CameraDirector = ({ target, reduce }: CameraDirectorProps) => {
  const { camera } = useThree();
  const lookCurrent = useRef(new THREE.Vector3(...HOME_LOOK));
  const t = useRef(0);

  useFrame((_, delta) => {
    if (target) {
      // Approach target from the side, slightly elevated
      const targetPos = new THREE.Vector3(target[0] + 1.6, 2.4, target[2] + 2.6);
      const targetLook = new THREE.Vector3(...target);
      const speed = reduce ? 1 : 0.06;
      camera.position.lerp(targetPos, speed);
      lookCurrent.current.lerp(targetLook, speed);
      camera.lookAt(lookCurrent.current);
    } else {
      // Idle: very subtle orbit on a small radius
      t.current += reduce ? 0 : delta * 0.06;
      const idleX = Math.sin(t.current) * 0.5;
      const idleZ = HOME_POS[2] + Math.cos(t.current) * 0.25;
      const targetPos = new THREE.Vector3(idleX, HOME_POS[1], idleZ);
      camera.position.lerp(targetPos, 0.04);
      lookCurrent.current.lerp(new THREE.Vector3(...HOME_LOOK), 0.06);
      camera.lookAt(lookCurrent.current);
    }
  });

  return null;
};

type Props = {
  onSelect: (id: string) => void;
  selectedAxeId: string | null;
  externalHoverId?: string | null;
};

export const ChessboardScene = ({
  onSelect,
  selectedAxeId,
  externalHoverId,
}: Props) => {
  const [hoverId, setHoverId] = useState<string | null>(null);
  const reduce = prefersReducedMotion();
  const lowEnd = isLowEndDevice();

  const cameraTarget = useMemo<[number, number, number] | null>(() => {
    if (!selectedAxeId) return null;
    const a = axes.find((x) => x.id === selectedAxeId);
    if (!a) return null;
    return fileRankToWorld(a.position);
  }, [selectedAxeId]);

  const activeHover = externalHoverId ?? hoverId;

  return (
    <Canvas
      shadows={!lowEnd}
      dpr={[1, 1.5]}
      camera={{ position: HOME_POS, fov: 32 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <color attach="background" args={['#0a0a0a']} />
      <Lights lowEnd={lowEnd} shadows={!lowEnd} />
      <Board />
      {axes.map((a) => (
        <BoardPiece
          key={a.id}
          axe={a}
          selected={selectedAxeId === a.id}
          hovered={activeHover === a.id}
          onHover={setHoverId}
          onSelect={onSelect}
          reduce={reduce}
        />
      ))}
      <CameraDirector target={cameraTarget} reduce={reduce} />
    </Canvas>
  );
};
