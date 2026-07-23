import { useEffect, useRef } from "react";
import gsap from "gsap/dist/gsap";

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

    // 1. Counter counts 0 → 100 in 0.4s
    tl.to(counterObj, {
      value: 100,
      duration: 0.4,
      ease: "power2.inOut",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.round(counterObj.value));
        }
      },
    });

    // 2. Counter fades out & halves slide apart
    tl.to(
      counterRef.current,
      {
        opacity: 0,
        duration: 0.15,
        ease: "power2.out",
      },
      "-=0.05"
    );

    tl.to(
      topHalfRef.current,
      {
        yPercent: -100,
        duration: 0.5,
        ease: "power4.inOut",
      },
      "<"
    );

    tl.to(
      bottomHalfRef.current,
      {
        yPercent: 100,
        duration: 0.5,
        ease: "power4.inOut",
      },
      "<"
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
      />
      {/* Bottom half overlay */}
      <div
        ref={bottomHalfRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#0A0A0A] pointer-events-auto"
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
