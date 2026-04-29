import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { PieceDispatcher } from './PieceDispatcher';
import { Lights } from './Lights';
import { axes, type Axe } from '@/data/axes';
import { prefersReducedMotion, isLowEndDevice } from '@/lib/theme';
import { useForceCanvasResize } from './useForceCanvasResize';

const SQUARE = 1;
const BOARD_HALF = 4;

const fileRankToWorld = ([file, rank]: [number, number]): [number, number, number] => [
  file - 3.5,
  0,
  3.5 - rank,
];

const ResizeFix = () => {
  useForceCanvasResize();
  return null;
};

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

// Camera height/distance scale with aspect — keeps the whole board visible
// at any viewport (avoids top-of-board truncation on narrow / portrait canvas).
const HOME_LOOK: [number, number, number] = [0, 0, 0];

const computeHomePos = (aspect: number): [number, number, number] => {
  // narrower viewport => pull camera back & up to keep board visible
  const k = Math.max(0.5, Math.min(1.6, aspect));
  const dist = 9 + (1.6 - k) * 5; // 9 wide, up to 14.5 narrow
  const height = 7 + (1.6 - k) * 3.5; // 7 wide, up to 10.85 narrow
  return [0, height, dist];
};

const CameraDirector = ({ target, reduce }: CameraDirectorProps) => {
  const { camera, size } = useThree();
  const lookCurrent = useRef(new THREE.Vector3(...HOME_LOOK));
  const t = useRef(0);
  const aspect = size.width / Math.max(1, size.height);
  const homePos = useMemo(() => computeHomePos(aspect), [aspect]);

  useFrame((_, delta) => {
    if (target) {
      // Keep enough context: pull camera back, raise it, move toward the
      // selected piece without losing the rest of the board.
      const dirX = Math.sign(target[0]) || 1;
      const dirZ = Math.sign(target[2]) || 1;
      const targetPos = new THREE.Vector3(
        target[0] + dirX * 2.5,
        4.2,
        target[2] + dirZ * 3.2,
      );
      // Look slightly above board level so piece stays mid-frame
      const targetLook = new THREE.Vector3(target[0], 0.4, target[2]);
      const speed = reduce ? 1 : 0.05;
      camera.position.lerp(targetPos, speed);
      lookCurrent.current.lerp(targetLook, speed);
      camera.lookAt(lookCurrent.current);
    } else {
      t.current += reduce ? 0 : delta * 0.05;
      const idleX = Math.sin(t.current) * 0.4;
      const idleZ = homePos[2] + Math.cos(t.current) * 0.2;
      const targetPos = new THREE.Vector3(idleX, homePos[1], idleZ);
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
      camera={{ position: [0, 9, 11], fov: 36 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <ResizeFix />
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
