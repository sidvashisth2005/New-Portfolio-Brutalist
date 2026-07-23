import { useEffect, useState, useRef } from "react";

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll <= 0) return;
      const currentScroll = window.scrollY || document.documentElement.scrollTop;
      const pct = Math.min(Math.max(currentScroll / totalScroll, 0), 1);
      setProgress(pct);
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${pct})`;
      }
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });

    const lenis = (window as any).lenis;
    if (lenis) {
      lenis.on("scroll", updateScroll);
    }

    return () => {
      window.removeEventListener("scroll", updateScroll);
      if (lenis) {
        lenis.off("scroll", updateScroll);
      }
    };
  }, []);

  const pctText = `${Math.round(progress * 100).toString().padStart(2, "0")}%`;

  return (
    <>
      <div
        ref={barRef}
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#ffff00] z-[60] origin-left will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
      <div className="fixed bottom-5 right-5 z-[55] font-mono text-[10px] uppercase tracking-[0.2em] text-white mix-blend-difference flex items-center gap-2 pointer-events-none select-none">
        <span className="h-1.5 w-1.5 bg-[#ffff00]" />
        <span className="tabular-nums">{pctText}</span>
        <span>/ SCROLLED</span>
      </div>
    </>
  );
}