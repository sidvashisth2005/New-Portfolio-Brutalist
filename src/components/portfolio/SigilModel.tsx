import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, OrbitControls, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * 3D Sigil Inner Scene Component
 * Renders the interlocking metal lattice, crystal shards, and glowing core.
 */
const SigilScene = ({ coordsRef }: { coordsRef?: React.RefObject<HTMLDivElement | null> }) => {
  const parallaxGroupRef = useRef<THREE.Group>(null);
  const autoRotateGroupRef = useRef<THREE.Group>(null);
  
  // Set the theme accent color (yellow in this case)
  const accentColor = "#ffff00";

  // useFrame runs on every frame of the render loop (approx. 60fps)
  useFrame((state) => {
    // 1. Auto-rotation: slowly rotate the inner group over time
    if (autoRotateGroupRef.current) {
      autoRotateGroupRef.current.rotation.y += 0.0025; // very slow speed
    }

    // 2. Mouse Parallax: tilt the outer group based on mouse coordinates
    if (parallaxGroupRef.current) {
      const targetX = (state.pointer.x * Math.PI) / 12; // slightly more subtle mouse tilt
      const targetY = (state.pointer.y * Math.PI) / 12;
      parallaxGroupRef.current.rotation.y += (targetX - parallaxGroupRef.current.rotation.y) * 0.05;
      parallaxGroupRef.current.rotation.x += (targetY - parallaxGroupRef.current.rotation.x) * 0.05;
    }

    // 3. Dynamic coordinates update via DOM ref (no-rerender, 60fps safe)
    if (coordsRef && coordsRef.current) {
      const time = state.clock.getElapsedTime();
      const pointerX = state.pointer.x;
      const pointerY = state.pointer.y;
      
      // Calculate dynamic lat/lng variations based on mouse position, time, and camera angles
      const camAngle = Math.atan2(state.camera.position.z, state.camera.position.x);
      
      const lat = 24.6471 + (pointerY * 3.5) + Math.sin(time * 0.5) * 1.5 + (state.camera.position.y * 0.8);
      const lng = 77.3119 + (pointerX * 5.2) + Math.cos(time * 0.4) * 2.1 + (camAngle * 4.5);
      
      const latClamped = Math.max(-90, Math.min(90, lat));
      const lngClamped = Math.max(-180, Math.min(180, lng));
      
      const latDir = latClamped >= 0 ? "N" : "S";
      const lngDir = lngClamped >= 0 ? "E" : "W";
      
      const latVal = Math.abs(latClamped).toFixed(4);
      const lngVal = Math.abs(lngClamped).toFixed(4);
      
      coordsRef.current.innerText = `${latDir} ${latVal}° / ${lngDir} ${lngVal}°`;
    }
  });

  return (
    <group ref={parallaxGroupRef}>
      <group ref={autoRotateGroupRef}>
      {/* SECTION A: 5 Interlocking Metal Beams (The Lattice Frame) */}
      <group>
        {/* Beam 1 */}
        <mesh position={[0, 0, 0]} rotation={[0.5, 0.2, 0.1]}>
          <boxGeometry args={[0.12, 1.8, 0.12]} />
          <meshStandardMaterial metalness={1} roughness={0.32} color="#d8dde3" />
        </mesh>
        
        {/* Beam 2 */}
        <mesh position={[0.25, -0.1, 0.1]} rotation={[-0.3, 0.8, -0.4]}>
          <boxGeometry args={[0.12, 1.8, 0.12]} />
          <meshStandardMaterial metalness={1} roughness={0.32} color="#d8dde3" />
        </mesh>
        
        {/* Beam 3 */}
        <mesh position={[-0.2, 0.2, -0.15]} rotation={[0.1, -0.5, 0.9]}>
          <boxGeometry args={[0.12, 1.8, 0.12]} />
          <meshStandardMaterial metalness={1} roughness={0.32} color="#d8dde3" />
        </mesh>
        
        {/* Beam 4 */}
        <mesh position={[-0.1, -0.3, 0.2]} rotation={[0.9, 0.1, -0.2]}>
          <boxGeometry args={[0.12, 1.8, 0.12]} />
          <meshStandardMaterial metalness={1} roughness={0.32} color="#d8dde3" />
        </mesh>
        
        {/* Beam 5 */}
        <mesh position={[0.3, 0.1, -0.3]} rotation={[-0.6, -0.7, 0.3]}>
          <boxGeometry args={[0.12, 1.8, 0.12]} />
          <meshStandardMaterial metalness={1} roughness={0.32} color="#d8dde3" />
        </mesh>
      </group>

      {/* SECTION B: 6 Hexagonal Crystal Shards (The Refractive Elements) */}
      <group>
        {/* Shard 1 */}
        <mesh position={[0.4, 0.4, 0.4]} rotation={[0.2, 0.5, 0.8]} scale={[0.15, 0.6, 0.15]}>
          <cylinderGeometry args={[0.5, 0.5, 1, 6]} /> {/* 6 radial segments make it a hex cylinder */}
          <MeshTransmissionMaterial transmission={1} ior={1.45} chromaticAberration={0.06} color="#eaf2ff" thickness={0.5} roughness={0.1} />
        </mesh>
        
        {/* Shard 2 */}
        <mesh position={[-0.4, -0.4, -0.4]} rotation={[-0.5, 0.2, -0.3]} scale={[0.12, 0.5, 0.12]}>
          <cylinderGeometry args={[0.5, 0.5, 1, 6]} />
          <MeshTransmissionMaterial transmission={1} ior={1.45} chromaticAberration={0.06} color="#eaf2ff" thickness={0.5} roughness={0.1} />
        </mesh>
        
        {/* Shard 3 */}
        <mesh position={[0.5, -0.3, -0.3]} rotation={[0.8, -0.4, 0.2]} scale={[0.13, 0.55, 0.13]}>
          <cylinderGeometry args={[0.5, 0.5, 1, 6]} />
          <MeshTransmissionMaterial transmission={1} ior={1.45} chromaticAberration={0.06} color="#eaf2ff" thickness={0.5} roughness={0.1} />
        </mesh>
        
        {/* Shard 4 */}
        <mesh position={[-0.3, 0.4, 0.3]} rotation={[-0.2, 0.9, -0.6]} scale={[0.14, 0.6, 0.14]}>
          <cylinderGeometry args={[0.5, 0.5, 1, 6]} />
          <MeshTransmissionMaterial transmission={1} ior={1.45} chromaticAberration={0.06} color="#eaf2ff" thickness={0.5} roughness={0.1} />
        </mesh>
        
        {/* Shard 5 */}
        <mesh position={[0.1, -0.5, 0.5]} rotation={[0.4, -0.8, 0.3]} scale={[0.12, 0.5, 0.12]}>
          <cylinderGeometry args={[0.5, 0.5, 1, 6]} />
          <MeshTransmissionMaterial transmission={1} ior={1.45} chromaticAberration={0.06} color="#eaf2ff" thickness={0.5} roughness={0.1} />
        </mesh>
        
        {/* Shard 6 */}
        <mesh position={[-0.5, 0.1, -0.5]} rotation={[0.7, 0.3, -0.2]} scale={[0.13, 0.5, 0.13]}>
          <cylinderGeometry args={[0.5, 0.5, 1, 6]} />
          <MeshTransmissionMaterial transmission={1} ior={1.45} chromaticAberration={0.06} color="#eaf2ff" thickness={0.5} roughness={0.1} />
        </mesh>
      </group>

      {/* SECTION C: 1 Glowing Core Cube */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.35, 0.35, 0.35]} />
        <MeshTransmissionMaterial transmission={1} thickness={1.2} roughness={0} color={accentColor} />
      </mesh>

      {/* SECTION D: Core Light Source (Creates glow reflections on metal lattice) */}
      <pointLight position={[0, 0, 0]} intensity={2} color={accentColor} distance={3} />
      </group>
    </group>
  );
};

/**
 * 3D Sigil Canvas Wrapper Component
 * Sets up lights, environment presets, stars backdrop, floating motion, and drag controls.
 * Throttled using IntersectionObserver to only render when visible in the viewport.
 */
export function SigilModel({ coordsRef }: { coordsRef?: React.RefObject<HTMLDivElement | null> }) {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Defer WebGL Canvas mount slightly so hero text paints immediately
    const timer = setTimeout(() => {
      setMounted(true);
    }, 120);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null, // viewport
        rootMargin: "50px", // pre-render when 50px close to viewport
        threshold: 0.0,
      }
    );

    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-transparent flex items-center justify-center" />
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full relative">
      {isVisible ? (
        <Canvas
          camera={{ position: [0, 0, 3.0], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
        >
          {/* Basic WebGL Lighting */}
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <pointLight position={[-5, -5, -5]} intensity={0.5} />

          {/* Suspense is required for async environment loading */}
          <Suspense fallback={null}>
            {/* Float adds slow vertical floating movement */}
            <Float speed={1.7} rotationIntensity={0.28} floatIntensity={0.38}>
              <SigilScene coordsRef={coordsRef} />
            </Float>
            
            {/* Environment preset provides metal reflections */}
            <Environment preset="city" />
          </Suspense>

          {/* OrbitControls enables dragging & auto-rotation for smooth 3D experience */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={2.4}
            enableDamping={true}
            dampingFactor={0.06}
          />
        </Canvas>
      ) : (
        <div className="w-full h-full bg-transparent flex items-center justify-center" />
      )}
    </div>
  );
}
