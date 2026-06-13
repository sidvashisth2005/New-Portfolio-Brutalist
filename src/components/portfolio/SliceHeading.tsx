import { useEffect, useRef } from "react";
import anime from "animejs";
import type { ReactNode } from "react";
import { useReducedMotion } from "@/lib/anime-utils";

const GUILLOTINE = "cubicBezier(0.85, 0, 0.15, 1)";

export function SliceHeading({
  index,
  label,
  children,
}: {
  index: string;
  label: string;
  children: ReactNode;
}) {
  const isReduced = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || isReduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !triggered.current) {
            triggered.current = true;

            // Left label: slash wipe from left
            anime({
              targets: el.querySelector(".sh-label"),
              clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
              translateX: [-20, 0],
              opacity: [0, 1],
              duration: 700,
              easing: GUILLOTINE,
            });

            // Heading: massive vertical slam from below
            anime({
              targets: el.querySelector(".sh-heading"),
              translateY: ["120%", "0%"],
              skewY: [-4, 0],
              opacity: [0, 1],
              duration: 1000,
              delay: 100,
              easing: GUILLOTINE,
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isReduced]);

  return (
    <div ref={wrapperRef} className="grid grid-cols-12 gap-5 mb-16">
      <div
        className="sh-label col-span-12 md:col-span-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 flex md:block items-center gap-3"
        style={{ opacity: isReduced ? 1 : 0, clipPath: isReduced ? "none" : "inset(0 100% 0 0)" }}
      >
        <span>{index}</span>
        <span className="h-px w-12 md:w-full md:mt-2 bg-white/30 inline-block" />
        <span className="md:block md:mt-2">{label}</span>
      </div>

      <div className="col-span-12 md:col-span-9 overflow-hidden">
        <h2
          className="sh-heading font-display font-black tracking-[-0.05em] text-[9vw] sm:text-[8vw] md:text-[7vw] leading-[0.9] uppercase whitespace-normal break-words"
          style={{ opacity: isReduced ? 1 : 0, transform: isReduced ? "none" : "translateY(120%)" }}
        >
          {children}
        </h2>
      </div>
    </div>
  );
}