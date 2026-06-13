import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

export function StarField() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full pointer-events-none" />;
  }

  return (
    <div className="w-full h-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5] }} dpr={[1, 1.5]}>
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
    </div>
  );
}
