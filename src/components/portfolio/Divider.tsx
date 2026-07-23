import { useEffect, useRef, useState } from "react";

export function Divider({ label = "//", invert = false }: { label?: string; invert?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative h-24 md:h-32 overflow-hidden border-y-2 border-white ${invert ? "bg-[#ffff00]" : "bg-black"}`}
    >
      {/* Sliding background block */}
      <div
        className={`absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          invert ? "bg-black" : "bg-[#ffff00]"
        }`}
        style={{ transform: inView ? "translateX(0)" : "translateX(-100%)" }}
      />

      {/* Text block with animated color matching the background transition */}
      <div
        className={`relative z-10 h-full flex items-center justify-between px-5 font-mono text-[10px] uppercase tracking-[0.2em] gap-6 transition-colors duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] ${
          inView
            ? invert
              ? "text-white"
              : "text-black"
            : invert
            ? "text-black"
            : "text-white"
        }`}
      >
        <span className="shrink-0">{label}</span>
        <span className="font-display font-black text-xl md:text-3xl tracking-tight truncate">
          SCROLL → SCROLL → SCROLL → SCROLL
        </span>
        <span className="shrink-0">{label}</span>
      </div>
    </div>
  );
}