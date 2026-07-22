import { useReducedMotion } from "@/lib/anime-utils";
import { experience } from "@/lib/content";
import { SliceHeading } from "./SliceHeading";

export function Experience() {
  const isReduced = useReducedMotion();

  return (
    <section
      id="experience"
      className="relative px-5 py-16 md:py-32 bg-black overflow-hidden"
    >
      {/* Step 1 — Section divider line sweep */}
      <div
        className="section-border-line absolute top-0 left-0 right-0 h-[1px] bg-[#E8FF00] origin-left"
        style={{ transform: isReduced ? "none" : "scaleX(0)" }}
      />

      <SliceHeading index="(02)" label="CHRONICLE / EXPERIENCE">
        <div className="overflow-hidden">
          <span className="word-reveal inline-block">WORK</span>
        </div>
        <div className="overflow-hidden">
          <span className="word-reveal text-outline inline-block">EXPERIENCE</span>
        </div>
      </SliceHeading>

      <div className="grid grid-cols-12 gap-5" data-skew>
        {/* Spacer for left column */}
        <div className="col-span-12 md:col-span-3" />

        {/* Right column */}
        <div className="col-span-12 md:col-span-9 space-y-0">
          {experience.map((exp, i) => {
            const isTrustique = exp.company.includes("Trustique");
            return (
              <div
                key={exp.company + exp.role}
                className="experience-entry reveal-block border-t border-white/20 pt-8 pb-8 md:pt-12 md:pb-12 first:border-t-2 first:border-white"
                style={{ opacity: isReduced ? 1 : 0 }}
              >
                {/* Period */}
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E8FF00]">
                  {exp.period}
                </div>

                {/* Company Name */}
                <h3 className="font-display font-black text-2xl sm:text-3xl md:text-5xl tracking-[-0.06em] uppercase text-white mt-2 leading-none overflow-hidden block py-1">
                  {exp.company.split("").map((char, idx) => (
                    <span
                      key={idx}
                      className="company-char inline-block origin-bottom-left"
                      style={{ display: char === " " ? "inline" : "inline-block" }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  ))}
                </h3>

                {/* Role & Location */}
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 mt-1">
                  {exp.role} &middot; {exp.location}
                </div>

                {/* Bullets */}
                <ul className="mt-6 space-y-4">
                  {exp.bullets.map((bullet, idx) => (
                    <div key={idx} className="exp-bullet">
                      <li className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-[#E8FF00] mt-[6px] flex-shrink-0" />
                        <span className="font-display text-[14px] text-white/70 leading-relaxed ml-4 uppercase">
                          {bullet}
                        </span>
                      </li>

                      {/* Promo callout */}
                      {isTrustique && idx === 1 && (
                        <div className="my-5 ml-5.5 pl-4 border-l border-[#E8FF00]/30 py-1">
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E8FF00]">
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