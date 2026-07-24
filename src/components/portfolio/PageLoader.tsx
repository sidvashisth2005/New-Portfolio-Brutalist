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
        const countEl = document.getElementById("page-loader-count");
        if (countEl) {
          countEl.textContent = String(Math.round(counterObj.value));
        }
      },
    });

    // 2. Counter & Logo fade out & halves slide apart
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

      {/* Center SV Monogram Logo & Counter */}
      <div
        ref={counterRef}
        className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none select-none z-10"
      >
        {/* Smart SV Monogram Icon Badge */}
        <div className="relative flex items-center justify-center w-14 h-14 bg-black border-2 border-[#E8FF00] shadow-[3px_3px_0px_#E8FF00]">
          <svg
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
          >
            {/* S Geometric Path */}
            <path
              d="M 20 8 H 9 V 15 H 23 V 23 H 10"
              stroke="#FFFFFF"
              strokeWidth="2.8"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
            {/* V Accent Diagonal Stroke */}
            <path
              d="M 14 17 L 18 24 L 24 13"
              stroke="#E8FF00"
              strokeWidth="2.5"
              strokeLinecap="square"
            />
          </svg>

          {/* Live telemetry dot */}
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#E8FF00] border border-black animate-pulse" />
        </div>

        {/* Brand Name */}
        <div className="font-mono text-xs font-black uppercase tracking-[0.25em] text-white mt-1">
          SIDDHANT<span className="text-[#E8FF00]">.V</span>
        </div>

        {/* Numeric Counter */}
        <div
          className="font-display font-bold text-[42px] text-[#E8FF00] leading-none"
          style={{ letterSpacing: "-0.04em", fontFamily: "Inter, sans-serif" }}
        >
          <span id="page-loader-count">0</span>
        </div>
      </div>
    </div>
  );
}
