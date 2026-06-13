import { useReducedMotion, glitchText } from "@/lib/anime-utils";
import { awards } from "@/lib/content";

export function Awards() {
  const isReduced = useReducedMotion();

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
    <section id="awards" className="relative px-5 py-32 bg-black overflow-hidden">
      {/* Step 1 — Section divider line sweep */}
      <div
        className="section-border-line absolute top-0 left-0 right-0 h-[1px] bg-[#E8FF00] origin-left"
        style={{ transform: isReduced ? "none" : "scaleX(0)" }}
      />

      <div className="grid grid-cols-12 gap-5">
        {/* Left Column */}
        <div className="col-span-12 md:col-span-3">
          <div className="overflow-hidden md:sticky md:top-20">
            <div
              className="section-label font-mono text-[10px] uppercase tracking-[0.2em] text-[#E8FF00]"
              style={{ transform: isReduced ? "none" : "translateY(100%)" }}
            >
              <span>(07) </span>
              <span>RECOGNITIONS / AWARDS</span>
            </div>
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
                className={`award-row reveal-block ${isHackNITR ? "is-hero" : ""} group relative grid grid-cols-12 gap-5 items-start py-8 px-4 border-b-2 border-white cursor-default overflow-hidden ${
                  isHackNITR ? "border-l-4 border-[#ffff00]" : ""
                }`}
                style={{
                  opacity: isReduced ? 1 : 0,
                }}
              >
                {/* Yellow Hover Wipe panel */}
                <span className="absolute inset-0 bg-[#ffff00] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] z-0" />

                {/* Flash overlay for first award */}
                {isHackNITR && (
                  <span className="award-hero-flash absolute inset-0 bg-[#ffff00] pointer-events-none z-20 opacity-0" />
                )}

                {/* Index */}
                <div
                  id={`${rowId}-index`}
                  className="col-span-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#ffff00] group-hover:text-black transition-colors duration-300 relative z-10"
                >
                  {formattedIndex}
                </div>

                {/* Scope Badge */}
                <div className="col-span-12 md:col-span-2 relative z-10">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/30 border border-white/20 px-2 py-1 inline-block group-hover:border-black/20 group-hover:text-black/40 transition-colors duration-300">
                    {award.scope}
                  </span>
                </div>

                {/* Title */}
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

                {/* Description */}
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