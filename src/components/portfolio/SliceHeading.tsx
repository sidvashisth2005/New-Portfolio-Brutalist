import type { ReactNode } from "react";
import { useReducedMotion } from "@/lib/anime-utils";

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

  return (
    <div className="grid grid-cols-12 gap-5 mb-16">
      <div className="col-span-12 md:col-span-3">
        {/* Step 2 — Section number + label wrapper */}
        <div className="overflow-hidden">
          <div
            className="section-label"
            style={{ transform: isReduced ? "none" : "translateY(100%)" }}
          >
            <span className="section-label-index">{index}</span>
            <span className="section-label-text">{label}</span>
          </div>
        </div>
      </div>

      {/* Step 3 — Section heading */}
      <div className="col-span-12 md:col-span-9 overflow-hidden">
        <h2
          className="section-title font-display font-black tracking-[-0.05em] text-[9vw] sm:text-[8vw] md:text-[7vw] leading-[0.9] uppercase whitespace-normal break-words text-white"
        >
          {children}
        </h2>
      </div>
    </div>
  );
}