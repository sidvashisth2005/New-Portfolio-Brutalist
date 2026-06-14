import { Suspense, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

/**
 * 3D Starfield Canvas Component
 * Throttled using IntersectionObserver to only render when visible in the viewport.
 */
export function StarField() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
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
    return <div className="w-full h-full pointer-events-none" />;
  }

  return (
    <div ref={containerRef} className="w-full h-full pointer-events-none relative">
      {isVisible ? (
        <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 1.2]}>
          <Suspense fallback={null}>
            <Stars 
              radius={100} 
              depth={50} 
              count={100} 
              factor={3} 
              saturation={0} 
              fade 
              speed={0.4} 
            />
          </Suspense>
        </Canvas>
      ) : (
        <div className="w-full h-full bg-transparent" />
      )}
    </div>
  );
}
