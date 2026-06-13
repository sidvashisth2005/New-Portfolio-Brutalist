import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function PageLoader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const counterObj = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // 1. Counter counts 0 → 100 in 1.4s
    tl.to(counterObj, {
      value: 100,
      duration: 1.4,
      ease: "power1.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.round(counterObj.value));
        }
      },
    });

    // 2. Counter fades out
    tl.to(counterRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.out",
    });

    // 3. When counter hits 100: clip-path on the overlay splits into two halves
    // top half: clip-path animates from "inset(0 0 0 0)" to "inset(0 0 100% 0)"
    // bottom half: clip-path animates from "inset(0 0 0 0)" to "inset(100% 0 0 0)"
    // duration: 0.8s, ease: "power4.inOut"
    tl.to(
      topHalfRef.current,
      {
        clipPath: "inset(0% 0% 100% 0%)",
        duration: 0.8,
        ease: "power4.inOut",
      },
      "-=0.1"
    );

    tl.to(
      bottomHalfRef.current,
      {
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 0.8,
        ease: "power4.inOut",
      },
      "<" // Start at the same time as top half
    );

  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] pointer-events-none w-screen h-screen overflow-hidden"
    >
      {/* Top half overlay */}
      <div
        ref={topHalfRef}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#0A0A0A] pointer-events-auto"
        style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      />
      {/* Bottom half overlay */}
      <div
        ref={bottomHalfRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#0A0A0A] pointer-events-auto"
        style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      />

      {/* Center counter */}
      <div
        ref={counterRef}
        className="absolute inset-0 flex items-center justify-center font-display font-bold text-[48px] text-[#E8FF00] pointer-events-none select-none"
        style={{ letterSpacing: "-0.04em", fontFamily: "Inter, sans-serif" }}
      >
        0
      </div>
    </div>
  );
}
