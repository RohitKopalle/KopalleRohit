import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Globe from './Globe';

/**
 * HeroScene — wraps the 3D globe in a Canvas with proper lighting.
 * Falls back to a stylish animated CSS orb on mobile for performance.
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

export default function HeroScene({ isMobile }) {
  /* ── Mobile: lightweight CSS fallback ── */
  if (isMobile) {
    return (
      <div
        style={{
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle at 35% 35%, rgba(45, 212, 191, 0.18) 0%, rgba(13, 148, 136, 0.08) 50%, transparent 70%)',
          border: '1px solid rgba(45, 212, 191, 0.12)',
          boxShadow: '0 0 60px rgba(13, 148, 136, 0.08)',
          animation: 'float 6s ease-in-out infinite',
          margin: '0 auto',
        }}
      />
    );
  }

  /* ── Desktop: R3F Canvas with Globe ── */
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
