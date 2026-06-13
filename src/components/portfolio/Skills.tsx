import { useState, useEffect } from "react";
import anime from "animejs";
import { GUILLOTINE, useReducedMotion } from "@/lib/anime-utils";
import { skills, skillContributions } from "@/lib/content";
import { SliceHeading } from "./SliceHeading";

export function Skills() {
  const isReduced = useReducedMotion();

  // Start with the first skill of the first category
  const defaultCategory = skills[0].category;
  const defaultSkill = skills[0].items[0];

  const [activeSkillName, setActiveSkillName] = useState(defaultSkill);
  const [activeCategory, setActiveCategory] = useState(defaultCategory);

  // Animate initial entry of detail content
  useEffect(() => {
    if (isReduced) return;
    anime({
      targets: ".skill-detail-content",
      clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
      duration: 300,
      easing: GUILLOTINE,
    });
  }, [isReduced]);

  const changeSkill = (newSkill: string, categoryName: string) => {
    if (newSkill === activeSkillName) return;

    if (isReduced) {
      setActiveSkillName(newSkill);
      setActiveCategory(categoryName);
      return;
    }

    anime({
      targets: ".skill-detail-content",
      clipPath: ["inset(0 0% 0 0)", "inset(0 100% 0 0)"],
      duration: 180,
      easing: GUILLOTINE,
      complete: () => {
        setActiveSkillName(newSkill);
        setActiveCategory(categoryName);
        anime({
          targets: ".skill-detail-content",
          clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
          duration: 200,
          easing: GUILLOTINE,
        });
      },
    });
  };

  const activeContribution = skillContributions[activeSkillName] || "";

  return (
    <section id="skills" className="relative px-5 py-32 bg-black overflow-hidden">
      {/* Step 1 — Section divider line sweep */}
      <div
        className="section-border-line absolute top-0 left-0 right-0 h-[1px] bg-[#E8FF00] origin-left"
        style={{ transform: isReduced ? "none" : "scaleX(0)" }}
      />

      <SliceHeading index="(06)" label="STACK / CAPABILITIES">
        TECHNICAL & <span className="text-outline">BUSINESS CORE</span>
      </SliceHeading>

      <div
        className="reveal-block grid grid-cols-12 gap-5 mt-10 items-stretch"
        style={{ opacity: isReduced ? 1 : 0 }}
      >
        {/* Left Panel: Category Cards */}
        <div className="col-span-12 md:col-span-6 space-y-0">
          {skills.map((cat) => {
            const isCardActive = cat.category === activeCategory;
            return (
              <div
                key={cat.category}
                className={`border-2 border-white p-6 mb-0 -mt-[2px] first:mt-0 transition-colors duration-300 ${
                  isCardActive ? "bg-[#ffff00] text-black" : "bg-black text-white"
                }`}
              >
                {/* Category Number */}
                <div
                  className={`font-mono text-[10px] uppercase tracking-[0.2em] ${
                    isCardActive ? "text-black/60" : "text-[#ffff00]"
                  }`}
                >
                  ({cat.number})
                </div>

                {/* Category Name */}
                <h3
                  className={`font-display font-black text-2xl tracking-[-0.06em] uppercase mt-1 leading-none ${
                    isCardActive ? "text-black" : "text-white"
                  }`}
                >
                  {cat.category}
                </h3>

                {/* Skill Items List */}
                <ul className="mt-6 border-t border-current/25">
                  {cat.items.map((item) => {
                    const isItemActive = item === activeSkillName;
                    return (
                      <li
                        key={item}
                        onMouseEnter={() => changeSkill(item, cat.category)}
                        className={`group/skill relative flex items-center justify-between py-3 border-b border-current/10 cursor-pointer transition-colors duration-150 ${
                          isItemActive
                            ? isCardActive
                              ? "text-black font-bold"
                              : "text-[#ffff00]"
                            : isCardActive
                            ? "text-black/70 hover:text-black"
                            : "text-white/70 hover:text-[#ffff00]"
                        }`}
                      >
                        <span className="font-display text-[14px] uppercase tracking-wide">
                          {item}
                        </span>

                        {/* Yellow dot on right (visible on hover or active) */}
                        <span
                          className={`w-1.5 h-1.5 rounded-none flex-shrink-0 transition-opacity duration-150 ${
                            isCardActive ? "bg-black" : "bg-[#ffff00]"
                          } ${isItemActive ? "opacity-100" : "opacity-0 group-hover/skill:opacity-100"}`}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Right Panel: Detail View */}
        <div className="col-span-12 md:col-span-6 relative border-2 border-white -mt-[2px] md:-mt-0 md:ml-[-2px] bg-black">
          <div className="sticky top-20 p-8 h-full min-h-[350px] flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-15 pointer-events-none" />

            <div
              className="skill-detail-content relative z-10 flex flex-col justify-between h-full gap-8"
              style={{ clipPath: isReduced ? "none" : "inset(0 100% 0 0)" }}
            >
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#ffff00]">
                  // INJECTED SKILL CONTEXT
                </span>
                <h4 className="font-display font-black text-[clamp(2rem,4vw,3.5rem)] tracking-[-0.06em] uppercase text-white mt-4 border-b border-white/20 pb-4 leading-none">
                  {activeSkillName}
                </h4>
                <p className="font-mono text-sm uppercase tracking-wider leading-relaxed text-white/90 mt-8 flex gap-2">
                  <span className="text-[#ffff00] flex-shrink-0">▸</span>
                  <span>{activeContribution}</span>
                </p>
              </div>

              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ffff00]">
                  SCOPE: {activeCategory}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
