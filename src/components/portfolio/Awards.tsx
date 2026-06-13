import { useEffect, useRef } from "react";
import anime from "animejs";
import { GUILLOTINE, useReducedMotion, glitchText } from "@/lib/anime-utils";
import { awards } from "@/lib/content";

export function Awards() {
  const isReduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || isReduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: ".award-row",
              translateX: ["-24px", "0px"],
              opacity: [0, 1],
              duration: 500,
              delay: anime.stagger(100),
              easing: GUILLOTINE,
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [isReduced]);

  const handleMouseEnter = (rowId: string, idxText: string, titleText: string) => {
    if (isReduced) return;
    const idxEl = document.getElementById(`${rowId}-index`);
    const titleEl = document.getElementById(`${rowId}-title`);
    if (idxEl) glitchText(idxEl, idxText, 250);
    if (titleEl) glitchText(titleEl, titleText, 300);
  };

  const handleMouseLeave = (rowId: string, idxText: string, titleText: string) => {
    if (isReduced) return;
    const idxEl = document.getElementById(`${rowId}-index`);
    const titleEl = document.getElementById(`${rowId}-title`);
    if (idxEl) glitchText(idxEl, idxText, 150);
    if (titleEl) glitchText(titleEl, titleText, 150);
  };

  return (
    <section id="awards" ref={sectionRef} className="relative px-5 py-32 border-t-2 border-white bg-black">
      <div className="grid grid-cols-12 gap-5">
        {/* Left Column */}
        <div className="col-span-12 md:col-span-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ffff00] md:sticky md:top-20">
            (07) AWARDS / RECEIPTS
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-12 md:col-span-9 space-y-0 border-t-2 border-white">
          {awards.map((award) => {
            const rowId = `award-${award.index}`;
            const formattedIndex = `(${award.index})`;
            const isHackNITR = award.index === "01";

            return (
              <div
                key={award.index}
                id={rowId}
                onMouseEnter={() => handleMouseEnter(rowId, formattedIndex, award.title)}
                onMouseLeave={() => handleMouseLeave(rowId, formattedIndex, award.title)}
                className={`award-row group relative grid grid-cols-12 gap-5 items-start py-8 px-4 border-b-2 border-white cursor-default overflow-hidden ${
                  isHackNITR ? "border-l-4 border-[#ffff00]" : ""
                }`}
                style={{
                  transform: isReduced ? "none" : "translateX(-24px)",
                  opacity: isReduced ? 1 : 0,
                }}
              >
                {/* Yellow Hover Wipe panel */}
                <span className="absolute inset-0 bg-[#ffff00] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] z-0" />

                {/* Index (Col 1) */}
                <div
                  id={`${rowId}-index`}
                  className="col-span-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#ffff00] group-hover:text-black transition-colors duration-300 relative z-10"
                >
                  {formattedIndex}
                </div>

                {/* Scope Badge (Col 2) */}
                <div className="col-span-12 md:col-span-2 relative z-10">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30 border border-white/20 px-2 py-1 inline-block group-hover:border-black/20 group-hover:text-black/40 transition-colors duration-300">
                    {award.scope}
                  </span>
                </div>

                {/* Title (Col 6) */}
                <div className="col-span-12 md:col-span-6 relative z-10">
                  <h3
                    id={`${rowId}-title`}
                    className={`font-display font-black tracking-[-0.06em] uppercase text-white group-hover:text-black transition-colors duration-300 leading-none ${
                      isHackNITR ? "text-[clamp(1.8rem,3.5vw,2.8rem)]" : "text-[clamp(1.2rem,2.5vw,2rem)]"
                    }`}
                  >
                    {award.title}
                  </h3>
                </div>

                {/* Description (Col 3) */}
                <div className="col-span-12 md:col-span-3 font-display text-[12px] text-white/50 leading-relaxed uppercase group-hover:text-black/60 transition-colors duration-300 relative z-10">
                  {award.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}