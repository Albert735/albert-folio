"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Adinkrahene, "chief of adinkra symbols": concentric circles for greatness
 * and leadership. Three gold rings fly in and lock into the flat symbol,
 * then drift apart like a gyroscope as you move the pointer and scroll.
 */

const RINGS = [
  { r: 1.0, tube: 0.085, speed: 0.9 },
  { r: 1.75, tube: 0.1, speed: 0.6 },
  { r: 2.5, tube: 0.115, speed: 0.4 },
];

function easeOutExpo(t: number) {
  return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function Rings({ reduced }: { reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  const start = useRef<number | null>(null);
  const viewport = useThree((st) => st.viewport);
  // Fit the symbol to narrow screens and lift it above the name on portrait layouts
  const portrait = viewport.width < viewport.height;
  const fit = Math.min(1, viewport.width / 6.2);
  const lift = portrait ? viewport.height * 0.2 : 0;

  // Each ring starts flung out on its own axis, then settles flat
  const from = useMemo(
    () => [
      new THREE.Euler(Math.PI * 1.4, -Math.PI * 0.9, 0.6),
      new THREE.Euler(-Math.PI * 1.1, Math.PI * 1.3, -0.4),
      new THREE.Euler(Math.PI * 0.8, Math.PI * 0.6, 1.1),
    ],
    []
  );

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#f2b33d"),
        metalness: 1,
        roughness: 0.22,
        emissive: new THREE.Color("#5a3a06"),
        emissiveIntensity: 0.35,
      }),
    []
  );

  useFrame((state, delta) => {
    if (start.current === null) start.current = state.clock.elapsedTime;
    const t = state.clock.elapsedTime;
    const intro = reduced ? 1 : easeOutExpo(Math.min((t - start.current - 0.2) / 2.2, 1));
    const p = state.pointer;
    const scroll =
      typeof window !== "undefined" ? Math.min(window.scrollY / window.innerHeight, 1.5) : 0;

    refs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const ring = RINGS[i];
      const wobble = reduced ? 0 : Math.sin(t * ring.speed + i) * 0.06;
      // After the intro, pointer and scroll pull each ring off-axis by a different amount
      const spread = (i + 1) * (0.18 + scroll * 0.55);
      const tx = -p.y * spread + wobble + scroll * (i - 1) * 0.9;
      const ty = p.x * spread + wobble * 0.5 + scroll * (i % 2 ? -1 : 1) * 0.7;
      const tz = reduced ? 0 : t * 0.05 * (i % 2 ? -1 : 1);

      const k = 1 - intro;
      const targetX = from[i].x * k + tx * intro;
      const targetY = from[i].y * k + ty * intro;
      mesh.rotation.x = THREE.MathUtils.damp(mesh.rotation.x, targetX, 6, delta);
      mesh.rotation.y = THREE.MathUtils.damp(mesh.rotation.y, targetY, 6, delta);
      mesh.rotation.z = tz;
      const s = 0.4 + 0.6 * intro;
      mesh.scale.setScalar(s);
    });

    if (group.current) {
      group.current.position.y = lift + (reduced ? 0 : Math.sin(t * 0.6) * 0.08);
      group.current.scale.setScalar(fit);
    }
  });

  return (
    <group ref={group}>
      {RINGS.map((ring, i) => (
        <mesh
          key={i}
          ref={(m) => {
            refs.current[i] = m;
          }}
          material={material}
        >
          <torusGeometry args={[ring.r, ring.tube, 48, 220]} />
        </mesh>
      ))}
      {/* the centre point of the symbol */}
      <mesh material={material}>
        <sphereGeometry args={[0.22, 48, 48]} />
      </mesh>
    </group>
  );
}

export default function AdinkraScene({ reduced = false }: { reduced?: boolean }) {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 7.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      aria-hidden
    >
      <ambientLight intensity={0.25} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} color="#ffe3a6" />
      <pointLight position={[-4, -2, 3]} intensity={18} color="#d7362b" distance={12} />
      <pointLight position={[4, -3, 2]} intensity={12} color="#1e8f5a" distance={12} />
      <Rings reduced={reduced} />
      <Sparkles count={120} scale={[11, 7, 4]} size={2.6} speed={reduced ? 0 : 0.35} color="#f2b33d" opacity={0.7} />
      <Environment resolution={256}>
        <Lightformer form="ring" intensity={3} color="#fff1cf" position={[0, 3, -4]} scale={4} />
        <Lightformer form="rect" intensity={2} color="#f2b33d" position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={1.5} color="#5a5a5a" position={[5, 1, 1]} rotation-y={-Math.PI / 2} scale={[8, 3, 1]} />
        <Lightformer form="rect" intensity={1} color="#d7362b" position={[0, -4, 2]} rotation-x={-Math.PI / 2} scale={[8, 2, 1]} />
      </Environment>
    </Canvas>
  );
}
