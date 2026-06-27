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
    // at 60 Hz and 120 Hz. Replaces the old linear clamp that was
    // twice as sluggish on high-refresh-rate displays.
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
    const s = target.current.scale * 0.3 * breathe; // Scale down significantly
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

function PillarSavoir() {
  const group = useRef();
  const { scene } = useGLTF("/3d/pillar-savoir.glb");
  const pillar = useMemo(() => scene.clone(), [scene]);
  const { sectionIndex } = useScrollState();
  const visible = sectionIndex === 1;

  useFrame((_, delta) => {
    if (!group.current) return;
    const targetScale = visible ? 0.08 : 0; // drastically reduced from 0.35
    group.current.scale.setScalar(
      THREE.MathUtils.lerp(
        group.current.scale.x,
        targetScale,
        Math.min(delta * 4, 1),
      ),
    );
    group.current.rotation.y += delta * 0.4;
  });

  return (
    <group ref={group} position={[-1.0, -0.5, -0.5]} scale={0}>
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
          <PillarSavoir />
        </Suspense>
      </Canvas>
    </div>
  );
}

useGLTF.preload("/3d/eagle.glb");
useGLTF.preload("/3d/pillar-savoir.glb");
