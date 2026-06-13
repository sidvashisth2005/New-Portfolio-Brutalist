import { useEffect, useRef } from "react";
import anime from "animejs";
import { GUILLOTINE, useReducedMotion } from "@/lib/anime-utils";
import { experience } from "@/lib/content";

export function Experience() {
  const isReduced = useReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = wrapperRef.current;
    if (!section || isReduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: ".experience-entry",
              clipPath: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"],
              opacity: [0, 1],
              duration: 600,
              delay: anime.stagger(150),
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

  return (
    <section id="experience" ref={wrapperRef} className="relative px-5 py-32 border-t-2 border-white">
      <div className="grid grid-cols-12 gap-5">
        {/* Left column */}
        <div className="col-span-12 md:col-span-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ffff00] md:sticky md:top-20">
            (02) EXPERIENCE / TRAIL
          </div>
        </div>

        {/* Right column */}
        <div className="col-span-12 md:col-span-9 space-y-0">
          {experience.map((exp, i) => {
            const isTrustique = exp.company.includes("Trustique");
            return (
              <div
                key={exp.company + exp.role}
                className="experience-entry border-t border-white/20 pt-12 pb-12 first:border-t-2 first:border-white"
                style={{
                  clipPath: isReduced ? "none" : "inset(0 0 100% 0)",
                  opacity: isReduced ? 1 : 0,
                }}
              >
                {/* Period */}
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ffff00]">
                  {exp.period}
                </div>

                {/* Company Name */}
                <h3 className="font-display font-black text-3xl md:text-5xl tracking-[-0.06em] uppercase text-white mt-2 leading-none">
                  {exp.company}
                </h3>

                {/* Role & Location */}
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mt-1">
                  {exp.role} &middot; {exp.location}
                </div>

                {/* Bullets & Promo Callout */}
                <ul className="mt-6 space-y-4">
                  {exp.bullets.map((bullet, idx) => (
                    <div key={idx}>
                      <li className="flex items-start">
                        {/* 2px yellow square */}
                        <span className="w-1.5 h-1.5 bg-[#ffff00] mt-[6px] flex-shrink-0" />
                        <span className="font-display text-[14px] text-white/70 leading-relaxed ml-4 uppercase">
                          {bullet}
                        </span>
                      </li>

                      {/* Standalone promo callout for Trustique after bullet index 1 */}
                      {isTrustique && idx === 1 && (
                        <div className="my-5 ml-5.5 pl-4 border-l border-[#ffff00]/30 py-1">
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ffff00]">
                            &uarr; PROMOTED TO TEAM LEAD &mdash; MID INTERNSHIP
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}