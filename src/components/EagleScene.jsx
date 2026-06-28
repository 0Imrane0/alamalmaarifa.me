import { Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Float,
  useGLTF,
  Points,
  PointMaterial,
} from "@react-three/drei";
import * as THREE from "three";
import { useScrollState } from "../hooks/useScrollState";
import { PILLARS } from "../data/schoolFacts";

function randomInSphere(array, radius) {
  for (let i = 0; i < array.length; i += 3) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = Math.cbrt(Math.random()) * radius;
    const sinPhi = Math.sin(phi);
    array[i] = r * sinPhi * Math.cos(theta);
    array[i + 1] = r * sinPhi * Math.sin(theta);
    array[i + 2] = r * Math.cos(phi);
  }
  return array;
}

function EagleModel() {
  const group = useRef();
  const { scene } = useGLTF("/3d/eagle.glb");
  const eagle = useMemo(() => scene.clone(), [scene]);
  const { eagleAnchor } = useScrollState();
  const target = useRef({ x: 0, y: 0, z: 0, rotY: 0, scale: 1 });
  const time = useRef(0);

  useFrame((_, delta) => {
    if (!group.current) return;
    time.current += delta;

    target.current = eagleAnchor;
    // Frame-rate independent exponential decay — same visual smoothness
    // at 60 Hz and 120 Hz.
    const t = 1 - Math.exp(-3.0 * delta);

    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      target.current.x * 1.8,
      t,
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      target.current.y * 1.2,
      t,
    );
    group.current.position.z = THREE.MathUtils.lerp(
      group.current.position.z,
      target.current.z,
      t,
    );
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      target.current.rotY,
      t,
    );

    const breathe = 1 + Math.sin(time.current * 0.8) * 0.012;
    const s = target.current.scale * 0.3 * breathe;
    group.current.scale.setScalar(
      THREE.MathUtils.lerp(group.current.scale.x, s, t),
    );

    group.current.rotation.z = Math.sin(time.current * 0.5) * 0.025;
  });

  return (
    <group ref={group}>
      <primitive object={eagle} />
    </group>
  );
}

// Section-to-pillar layout: each pillar owns one narrative section.
// index 0 → Vision (section 1), 1 → Savoir (section 2), etc.
const PILLAR_LAYOUT = [
  { position: [-1.25, -0.25, -0.45], scale: 0.085, rotation: 0.35 },
  { position: [1.15, -0.35, -0.35], scale: 0.08, rotation: -0.25 },
  { position: [-1.05, -0.55, -0.55], scale: 0.09, rotation: 0.2 },
  { position: [1.25, -0.15, -0.65], scale: 0.082, rotation: -0.3 },
  { position: [0.0, -0.7, -0.25], scale: 0.095, rotation: 0.0 },
];

function PillarModel({ index, glb, position, baseScale, baseRotation }) {
  const group = useRef();
  const { scene } = useGLTF(`/3d/${glb}`);
  const pillar = useMemo(() => scene.clone(), [scene]);
  const { sectionIndex } = useScrollState();
  // Hero (0) and Footer (6) show no pillar; sections 1-5 map to pillars 0-4.
  const activeSection = index + 1;
  const isVisible = sectionIndex === activeSection;

  useFrame((_, delta) => {
    if (!group.current) return;

    const targetScale = isVisible ? baseScale : 0;
    const speed = isVisible ? 4 : 5;
    group.current.scale.setScalar(
      THREE.MathUtils.lerp(
        group.current.scale.x,
        targetScale,
        Math.min(delta * speed, 1),
      ),
    );

    // Slow continuous rotation only when visible.
    if (isVisible && group.current.scale.x > baseScale * 0.1) {
      group.current.rotation.y += delta * 0.35;
    }
  });

  return (
    <group ref={group} position={position} rotation={[0, baseRotation, 0]} scale={0}>
      <primitive object={pillar} />
    </group>
  );
}

function CinematicDust() {
  const [sphere] = useState(() => randomInSphere(new Float32Array(3000), 10));
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 30;
      ref.current.rotation.y -= delta / 40;
    }
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#C5A028"
          size={0.012}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.4}
        />
      </Points>
    </group>
  );
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.35} color="#FAF8F4" />
      <directionalLight
        position={[4, 6, 3]}
        intensity={1.4}
        color="#f0d875"
        castShadow
      />
      <directionalLight
        position={[-3, 2, -2]}
        intensity={0.5}
        color="#1B3A6B"
      />
      <pointLight
        position={[0, 1, 2]}
        intensity={0.6}
        color="#C5A028"
        distance={8}
      />
    </>
  );
}

function LoadingFallback() {
  return null;
}

export default function EagleScene() {
  return (
    <div className="eagle-canvas-wrap" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 32 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <SceneLights />
          <Environment preset="city" environmentIntensity={0.3} />
          <CinematicDust />
          <Float speed={1.0} rotationIntensity={0.06} floatIntensity={0.2}>
            <EagleModel />
          </Float>
          {PILLARS.map((pillar, i) => (
            <PillarModel
              key={pillar.key}
              index={i}
              glb={pillar.glb}
              {...PILLAR_LAYOUT[i]}
            />
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/3d/eagle.glb");
PILLARS.forEach(({ glb }) => useGLTF.preload(`/3d/${glb}`));
