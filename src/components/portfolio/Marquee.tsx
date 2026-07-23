import { useEffect, useRef } from "react";
import gsap from "gsap/dist/gsap";

export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = [
    "HACKNITR 7.0 — RANK 01",
    "6,200+ COMPETITORS",
    "30% USER GROWTH",
    "65% COST REDUCTION",
    "JUET GUNA",
    "B.TECH / GRADUATING 2027",
    "OPEN TO OPPORTUNITIES",
  ];
  const row = [...items, ...items, ...items];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const track = trackRef.current;
    if (!track) return;

    // Set initial position
    gsap.set(track, { x: "0%" });

    // Loop from 0% to -33.3333%
    const loop = gsap.to(track, {
      x: "-33.3333%",
      ease: "none",
      duration: 25,
      repeat: -1,
    });

    const lenis = (window as any).lenis;
    if (!lenis) return;

    const handleScroll = (inst: any) => {
      const velocity = inst.velocity || 0;
      const speedMultiplier = 1 + Math.min(4, Math.abs(velocity) * 0.4);
      const direction = velocity < 0 ? -1 : 1;
      
      gsap.to(loop, {
        timeScale: speedMultiplier * direction,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    lenis.on("scroll", handleScroll);
    return () => {
      lenis.off("scroll", handleScroll);
      loop.kill();
    };
  }, []);

  return (
    <section className="relative border-y-2 border-white py-4 overflow-hidden bg-[#E8FF00] text-black transition-all duration-700 ease-[cubic-bezier(0.85,0,0.15,1)]">
      <div
        ref={trackRef}
        className="marquee-track flex gap-8 whitespace-nowrap w-max"
      >
        {row.map((it, i) => (
          <span
            key={i}
            className="font-display text-2xl md:text-4xl font-black tracking-tight flex items-center gap-8 uppercase select-none"
          >
            {it}
            <span className="inline-block w-3 h-3 bg-black" />
          </span>
        ))}
      </div>
    </section>
  );
}