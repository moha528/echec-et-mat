import { useRef, useState, useMemo, useEffect } from 'react';
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
      {/* Frame */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[BOARD_HALF * 2 + 0.4, 0.1, BOARD_HALF * 2 + 0.4]} />
        <meshStandardMaterial color="#1f1d1a" roughness={0.6} metalness={0.2} />
      </mesh>
      {/* Bronze rim — top thin */}
      <mesh position={[0, 0.001, 0]} receiveShadow>
        <boxGeometry args={[BOARD_HALF * 2 + 0.18, 0.005, BOARD_HALF * 2 + 0.18]} />
        <meshStandardMaterial color="#c9a961" roughness={0.35} metalness={0.5} />
      </mesh>
      {/* Squares */}
      {squares.map((s) => (
        <mesh key={s.key} position={s.pos} receiveShadow>
          <boxGeometry args={[SQUARE * 0.99, 0.02, SQUARE * 0.99]} />
          <meshStandardMaterial
            color={s.light ? '#1f1d1a' : '#141312'}
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
    <ringGeometry args={[0.32, 0.46, 32]} />
    <meshBasicMaterial color="#c9a961" transparent opacity={0.22} />
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
  const lift = hovered || selected ? 0.32 : 0;

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
          scale={0.85}
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

const HOME_POS: [number, number, number] = [0, 8, 10];
const HOME_LOOK: [number, number, number] = [0, 0, 0];

const CameraDirector = ({ target, reduce }: CameraDirectorProps) => {
  const { camera } = useThree();
  const start = useRef(new THREE.Vector3(...HOME_POS));
  const look = useRef(new THREE.Vector3(...HOME_LOOK));

  useFrame(() => {
    const targetPos = target
      ? new THREE.Vector3(target[0] + 1.5, 2.2, target[2] + 2.4)
      : start.current;
    const targetLook = target ? new THREE.Vector3(...target) : look.current;
    const speed = reduce ? 1 : 0.06;
    camera.position.lerp(targetPos, speed);
    const cur = new THREE.Vector3();
    camera.getWorldDirection(cur);
    const desired = targetLook.clone().sub(camera.position).normalize();
    cur.lerp(desired, speed);
    camera.lookAt(camera.position.clone().add(cur));
  });

  return null;
};

type Props = {
  onSelect: (id: string) => void;
  selectedAxeId: string | null;
  externalHoverId?: string | null;
};

export const ChessboardScene = ({ onSelect, selectedAxeId, externalHoverId }: Props) => {
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
      camera={{ position: HOME_POS, fov: 35 }}
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
      <FadeOutOnSelect active={!!selectedAxeId} />
    </Canvas>
  );
};

const FadeOutOnSelect = ({ active }: { active: boolean }) => {
  const { gl } = useThree();
  const [opacity, setOpacity] = useState(0);

  useFrame(() => {
    setOpacity((o) => {
      const target = active ? 1 : 0;
      return THREE.MathUtils.lerp(o, target, 0.06);
    });
    gl.domElement.style.transition = 'opacity 200ms';
  });

  useEffect(() => {
    if (active) {
      gl.domElement.style.filter = `brightness(${1 - opacity * 0.4})`;
    } else {
      gl.domElement.style.filter = 'brightness(1)';
    }
  }, [active, opacity, gl]);

  return null;
};
