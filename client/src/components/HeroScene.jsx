import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Globe from './Globe';

/**
 * HeroScene — wraps the 3D globe in a Canvas with proper lighting.
 * Only rendered on large screens (1024px+) via parent component logic.
 */

function Lights() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={0.7} color="#ffffff" />
      <pointLight position={[-3, 2, 4]} intensity={0.2} color="#ff2d55" />
    </>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 40 }}
      dpr={[1, 1.5]}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <Lights />
      <Suspense fallback={null}>
        <group position={[0.15, 0, 0]}>
          <Globe />
        </group>
      </Suspense>
    </Canvas>
  );
}
