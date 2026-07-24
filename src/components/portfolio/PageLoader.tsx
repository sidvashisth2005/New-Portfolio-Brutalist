import { useEffect, useRef } from "react";
import gsap from "gsap/dist/gsap";

export function PageLoader({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const topHalfRef = useRef<HTMLDivElement>(null);
  const bottomHalfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const counterObj = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    // 1. Logo Badge & Brand Name entrance animation
    if (logoRef.current) {
      tl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.8, y: 15 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "power3.out" }
      );
    }

    // 2. Smooth counter rhythm 0 → 100 over 1.1 seconds
    tl.to(counterObj, {
      value: 100,
      duration: 1.1,
      ease: "power2.out",
      onUpdate: () => {
        const countEl = document.getElementById("page-loader-count");
        if (countEl) {
          countEl.textContent = String(Math.round(counterObj.value));
        }
      },
    }, "-=0.1");

    // 3. Pause briefly at 100 for visual satisfaction
    tl.to({}, { duration: 0.1 });

    // 4. Center badge & counter fade out gracefully
    tl.to(
      counterRef.current,
      {
        opacity: 0,
        scale: 0.95,
        duration: 0.25,
        ease: "power2.inOut",
      }
    );

    // 5. Curtains split open smoothly
    tl.to(
      topHalfRef.current,
      {
        yPercent: -100,
        duration: 0.65,
        ease: "power4.inOut",
      },
      "-=0.1"
    );

    tl.to(
      bottomHalfRef.current,
      {
        yPercent: 100,
        duration: 0.65,
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
      {/* Top half overlay curtain */}
      <div
        ref={topHalfRef}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#0A0A0A] pointer-events-auto border-b border-[#E8FF00]/30"
      />
      {/* Bottom half overlay curtain */}
      <div
        ref={bottomHalfRef}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#0A0A0A] pointer-events-auto border-t border-[#E8FF00]/30"
      />

      {/* Center SV Monogram Logo & Counter */}
      <div
        ref={counterRef}
        className="absolute inset-0 flex flex-col items-center justify-center gap-4 pointer-events-none select-none z-10"
      >
        {/* Smart SV Monogram Icon Badge & Brand Title */}
        <div ref={logoRef} className="flex flex-col items-center gap-3">
          <div className="relative flex items-center justify-center w-16 h-16 bg-black border-2 border-[#E8FF00] shadow-[4px_4px_0px_#E8FF00]">
            <svg
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-9 h-9"
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
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#E8FF00] border border-black animate-pulse" />
          </div>

          <div className="font-mono text-xs font-black uppercase tracking-[0.3em] text-white">
            SIDDHANT<span className="text-[#E8FF00]">.V</span>
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">
            SYSTEM // INITIALIZING
          </div>
        </div>

        {/* Numeric Progress Counter */}
        <div
          className="font-display font-bold text-[48px] text-[#E8FF00] leading-none mt-1"
          style={{ letterSpacing: "-0.04em", fontFamily: "Inter, sans-serif" }}
        >
          <span id="page-loader-count">0</span>
          <span className="text-xs font-mono text-white/60 ml-1">%</span>
        </div>
      </div>
    </div>
  );
}
