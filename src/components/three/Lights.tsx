type Props = {
  lowEnd?: boolean;
  shadows?: boolean;
};

export const Lights = ({ lowEnd = false, shadows = true }: Props) => {
  const mapSize = lowEnd ? 512 : 1024;
  const keyIntensity = lowEnd ? 1.0 : 1.2;
  const ambient = lowEnd ? 0.32 : 0.28;

  return (
    <>
      <ambientLight intensity={ambient} color="#f5e6c8" />
      {/* Key (warm white from upper right) */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={keyIntensity}
        color="#fff5dc"
        castShadow={shadows}
        shadow-mapSize={[mapSize, mapSize]}
        shadow-camera-far={20}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0005}
      />
      {/* Rim (bronze, opposite side) */}
      <directionalLight position={[-4, 3, -3]} intensity={0.5} color="#c9a961" />
      {/* Fill (very soft, from front) */}
      <directionalLight position={[0, 2, 6]} intensity={0.15} color="#d9c9a8" />
    </>
  );
};
