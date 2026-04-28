type Props = {
  lowEnd?: boolean;
  shadows?: boolean;
};

export const Lights = ({ lowEnd = false, shadows = true }: Props) => {
  const mapSize = lowEnd ? 512 : 1024;
  const dirIntensity = lowEnd ? 0.95 : 1.1;
  const ambient = lowEnd ? 0.3 : 0.25;

  return (
    <>
      <ambientLight intensity={ambient} color="#f5e6c8" />
      <directionalLight
        position={[5, 8, 5]}
        intensity={dirIntensity}
        color="#ffffff"
        castShadow={shadows}
        shadow-mapSize={[mapSize, mapSize]}
        shadow-camera-far={20}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-bias={-0.0005}
      />
      <directionalLight position={[-3, 2, -2]} intensity={0.35} color="#c9a961" />
    </>
  );
};
