import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { ContactShadows } from '@react-three/drei/core/ContactShadows.js';
import { PieceDispatcher } from './PieceDispatcher';
import { Lights } from './Lights';
import { axes, type Axe } from '@/data/axes';
import { prefersReducedMotion, isLowEndDevice } from '@/lib/theme';
import { useForceCanvasResize } from './useForceCanvasResize';

const SQUARE = 1;
const BOARD_HALF = 4;
const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

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

  const lightMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#c0a47a',
        roughness: 0.55,
        metalness: 0.12,
      }),
    [],
  );
  const darkMat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#2a1f17',
        roughness: 0.7,
        metalness: 0.1,
      }),
    [],
  );

  return (
    <group>
      {/* Outer plinth — deep walnut, slight bevel */}
      <mesh position={[0, -0.18, 0]} receiveShadow castShadow>
        <boxGeometry args={[BOARD_HALF * 2 + 1.6, 0.36, BOARD_HALF * 2 + 1.6]} />
        <meshStandardMaterial color="#1a120c" roughness={0.55} metalness={0.18} />
      </mesh>
      {/* Bronze rail (raised lip around the squares) */}
      <mesh position={[0, 0.005, 0]} receiveShadow>
        <boxGeometry args={[BOARD_HALF * 2 + 0.7, 0.08, BOARD_HALF * 2 + 0.7]} />
        <meshStandardMaterial
          color="#c9a961"
          roughness={0.28}
          metalness={0.85}
        />
      </mesh>
      {/* Inner ink trough between bronze and squares */}
      <mesh position={[0, 0.022, 0]} receiveShadow>
        <boxGeometry args={[BOARD_HALF * 2 + 0.32, 0.012, BOARD_HALF * 2 + 0.32]} />
        <meshStandardMaterial color="#0d0a08" roughness={0.9} metalness={0.0} />
      </mesh>
      {/* Squares — slightly raised to catch light cleanly */}
      {squares.map((s) => (
        <mesh
          key={s.key}
          position={[s.pos[0], 0.034, s.pos[2]]}
          receiveShadow
          material={s.light ? lightMat : darkMat}
        >
          <boxGeometry args={[SQUARE * 0.985, 0.025, SQUARE * 0.985]} />
        </mesh>
      ))}
      {/* File labels (a–h) along the front edge */}
      {FILES.map((f, i) => (
        <FileMark key={`f-${f}`} x={i - 3.5} z={BOARD_HALF + 0.18} char={f} />
      ))}
      {/* Rank labels (1–8) along the right edge */}
      {Array.from({ length: 8 }).map((_, i) => (
        <RankMark
          key={`r-${i}`}
          x={BOARD_HALF + 0.18}
          z={3.5 - i}
          char={`${i + 1}`}
        />
      ))}
    </group>
  );
};

const FileMark = ({ x, z, char: _char }: { x: number; z: number; char: string }) => (
  <mesh position={[x, 0.05, z]} rotation={[-Math.PI / 2, 0, 0]}>
    <ringGeometry args={[0.04, 0.07, 16]} />
    <meshBasicMaterial color="#c9a961" />
  </mesh>
);

const RankMark = ({ x, z, char: _char }: { x: number; z: number; char: string }) => (
  <mesh position={[x, 0.05, z]} rotation={[-Math.PI / 2, 0, 0]}>
    <ringGeometry args={[0.04, 0.07, 16]} />
    <meshBasicMaterial color="#c9a961" />
  </mesh>
);

const HoverDisc = ({ position }: { position: [number, number, number] }) => (
  <mesh
    position={[position[0], 0.06, position[2]]}
    rotation={[-Math.PI / 2, 0, 0]}
  >
    <ringGeometry args={[0.34, 0.5, 36]} />
    <meshBasicMaterial color="#c9a961" transparent opacity={0.45} />
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
        position={[worldX, 0.05, worldZ]}
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
          scale={0.92}
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

const HOME_LOOK: [number, number, number] = [0, 0, 0];

const computeHomePos = (aspect: number): [number, number, number] => {
  // Slightly lower angle than before, more dramatic perspective.
  const k = Math.max(0.5, Math.min(1.6, aspect));
  const dist = 8.5 + (1.6 - k) * 5.5; // 8.5 wide → 14 narrow
  const height = 6.2 + (1.6 - k) * 3.5; // 6.2 wide → 10 narrow
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
      const dirX = Math.sign(target[0]) || 1;
      const dirZ = Math.sign(target[2]) || 1;
      const targetPos = new THREE.Vector3(
        target[0] + dirX * 2.5,
        4.2,
        target[2] + dirZ * 3.2,
      );
      const targetLook = new THREE.Vector3(target[0], 0.4, target[2]);
      const speed = reduce ? 1 : 0.05;
      camera.position.lerp(targetPos, speed);
      lookCurrent.current.lerp(targetLook, speed);
      camera.lookAt(lookCurrent.current);
    } else {
      t.current += reduce ? 0 : delta * 0.05;
      const idleX = Math.sin(t.current) * 0.5;
      const idleZ = homePos[2] + Math.cos(t.current) * 0.25;
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
      camera={{ position: [0, 8, 11], fov: 34 }}
      gl={{ antialias: true, powerPreference: 'high-performance' }}
      style={{ width: '100%', height: '100%' }}
    >
      <ResizeFix />
      <color attach="background" args={['#0a0a0a']} />
      <fog attach="fog" args={['#0a0a0a', 14, 28]} />
      <Lights lowEnd={lowEnd} shadows={!lowEnd} />
      {/* Subtle warm rim from below the bronze rail */}
      <pointLight position={[0, -0.5, 0]} intensity={0.18} color="#c9a961" distance={8} />
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
      <ContactShadows
        position={[0, 0.046, 0]}
        opacity={0.55}
        scale={BOARD_HALF * 2 + 1}
        blur={2.4}
        far={4}
        color="#000000"
        resolution={lowEnd ? 256 : 512}
      />
      <CameraDirector target={cameraTarget} reduce={reduce} />
    </Canvas>
  );
};
