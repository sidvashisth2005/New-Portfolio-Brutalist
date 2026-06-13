import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";

export function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null);
  const items = [
    "HACKNITR 7.0 — RANK 01",
    "6,200+ PARTICIPANTS",
    "30% USER GROWTH",
    "65% COST REDUCTION",
    "JUET GUNA",
    "CSE / 2026",
    "AVAILABLE FOR HIRE",
  ];
  const row = [...items, ...items, ...items];

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Retrieve global Lenis instance configured in gsap-setup.ts
    const lenis = (window as any).lenis;
    if (!lenis) return;

    const handleScroll = (inst: any) => {
      const velocity = inst.velocity || 0;
      const track = trackRef.current;
      if (!track) return;

      // Animate animationDuration and scaleX direction
      gsap.to(track, {
        animationDuration: `${Math.max(4, 20 - Math.abs(velocity) * 8)}s`,
        scaleX: velocity < 0 ? -1 : 1, // scaleX: -1 reverses the CSS marquee direction
        duration: 0.4,
        ease: "power1.out",
      });
    };

    lenis.on("scroll", handleScroll);
    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.section
      initial={{ clipPath: "inset(50% 0 50% 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0% 0)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.85, 0, 0.15, 1] }}
      className="relative border-y-2 border-white py-4 overflow-hidden bg-[#E8FF00] text-black"
    >
      <div
        ref={trackRef}
        className="marquee-track flex gap-8 whitespace-nowrap animate-marquee w-max"
        style={{ animationDuration: "20s" }}
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
    </motion.section>
  );
}