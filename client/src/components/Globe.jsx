import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

/**
 * InteractiveGlobe — a lightweight low-poly wireframe sphere with network nodes.
 * Represents systems, networks, and engineering.
 *
 * Features:
 * - Icosahedron wireframe with deduplicated vertex nodes
 * - Slow continuous rotation + gentle mouse parallax (lerp)
 * - Float wrapper for subtle vertical bobbing
 * - Outer glow shell for depth
 */
export default function Globe() {
  const groupRef = useRef();
  const { pointer } = useThree();

  /* ── geometry data (computed once) ── */
  const { nodePositions, linesGeometry } = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(1.95, 1);
    const posAttr = geo.getAttribute('position');

    // Deduplicate vertices
    const uniqueMap = new Map();
    const positions = [];

    for (let i = 0; i < posAttr.count; i++) {
      const x = +posAttr.getX(i).toFixed(4);
      const y = +posAttr.getY(i).toFixed(4);
      const z = +posAttr.getZ(i).toFixed(4);
      const key = `${x},${y},${z}`;
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, positions.length);
        positions.push(new THREE.Vector3(x, y, z));
      }
    }

    // Build edge pairs from triangles
    // Handle both indexed and non-indexed geometry
    const edgeSet = new Set();
    const linePoints = [];
    const triCount = posAttr.count / 3;

    for (let t = 0; t < triCount; t++) {
      const faceIndices = [];

      if (geo.index) {
        // Indexed geometry
        faceIndices.push(
          geo.index.getX(t * 3),
          geo.index.getX(t * 3 + 1),
          geo.index.getX(t * 3 + 2)
        );
      } else {
        // Non-indexed geometry — every 3 vertices form a face
        faceIndices.push(t * 3, t * 3 + 1, t * 3 + 2);
      }

      const mapped = faceIndices.map((fi) => {
        const x = +posAttr.getX(fi).toFixed(4);
        const y = +posAttr.getY(fi).toFixed(4);
        const z = +posAttr.getZ(fi).toFixed(4);
        return uniqueMap.get(`${x},${y},${z}`);
      });

      for (let j = 0; j < 3; j++) {
        const a = mapped[j];
        const b = mapped[(j + 1) % 3];
        const ek = `${Math.min(a, b)}-${Math.max(a, b)}`;
        if (!edgeSet.has(ek)) {
          edgeSet.add(ek);
          const pa = positions[a];
          const pb = positions[b];
          linePoints.push(pa.x, pa.y, pa.z, pb.x, pb.y, pb.z);
        }
      }
    }

    geo.dispose();

    const lGeo = new THREE.BufferGeometry();
    lGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePoints, 3));

    return { nodePositions: positions, linesGeometry: lGeo };
  }, []);

  /* ── per-frame animation ── */
  useFrame(() => {
    if (!groupRef.current) return;

    // Slow continuous rotation
    groupRef.current.rotation.y += 0.0008;

    // Subtle mouse parallax (low sensitivity, lerped)
    const targetX = -pointer.y * 0.12;
    const targetZ = pointer.x * 0.06;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetX,
      0.025
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetZ,
      0.025
    );
  });

  return (
    <Float speed={1.2} rotationIntensity={0} floatIntensity={0.35}>
      <group ref={groupRef}>
        {/* ── Edge network lines ── */}
        <lineSegments geometry={linesGeometry}>
          <lineBasicMaterial color="#2dd4bf" transparent opacity={0.25} />
        </lineSegments>

        {/* ── Vertex nodes ── */}
        {nodePositions.map((pos, i) => (
          <mesh key={i} position={pos}>
            <sphereGeometry args={[0.038, 8, 8]} />
            <meshStandardMaterial
              color="#99f6e4"
              emissive="#2dd4bf"
              emissiveIntensity={0.9}
            />
          </mesh>
        ))}

        {/* ── Inner wireframe shell (faint structural detail) ── */}
        <mesh>
          <icosahedronGeometry args={[1.93, 1]} />
          <meshStandardMaterial
            color="#0d9488"
            wireframe
            transparent
            opacity={0.05}
          />
        </mesh>

        {/* ── Outer glow shell ── */}
        <mesh>
          <sphereGeometry args={[2.07, 32, 32]} />
          <meshStandardMaterial
            color="#0d9488"
            transparent
            opacity={0.03}
          />
        </mesh>
      </group>
    </Float>
  );
}
