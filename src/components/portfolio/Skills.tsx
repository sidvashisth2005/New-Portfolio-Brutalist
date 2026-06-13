import { useState, useEffect } from "react";
import anime from "animejs";
import { useReducedMotion } from "@/lib/anime-utils";
import { skills } from "@/lib/content";
import { SliceHeading } from "./SliceHeading";

const skillMeta: Record<string, { abbr: string; rating: number; desc: string }> = {
  "Business Development": { abbr: "BD", rating: 95, desc: "Led BD at Trustique Assists; drove 30% user growth through market intelligence and partner discovery sessions." },
  "Market Research": { abbr: "MR", rating: 90, desc: "Benchmarked global competitors and CAGR data for Livestock Monitoring System at HackNITR 7.0." },
  "ROI Analysis": { abbr: "ROI", rating: 85, desc: "Built ROI case for farmer and insurer segments; presented to global jury at HackNITR 7.0." },
  "Go-to-Market Strategy": { abbr: "GTM", rating: 88, desc: "Designed product launch strategy for IoT AgriTech product; outlined GTM at HACKSAGON 2025." },
  "Lead Generation": { abbr: "LG", rating: 85, desc: "Sourced and onboarded 20+ interns across multiple colleges at Trustique Assists." },
  "Flutter": { abbr: "FL", rating: 92, desc: "Developed cross-platform ARound You app integrating Map Tiles API and Firebase database." },
  "Python": { abbr: "PY", rating: 90, desc: "Improved ML classification accuracy by 15% at Skill Dzire through Python-based EDA." },
  "IoT": { abbr: "IOT", rating: 85, desc: "Engineered IoT hardware component — Land Rover rover + multi-sensor wearable — for livestock health monitoring." },
  "Git/GitHub": { abbr: "GIT", rating: 92, desc: "Version control across all 4 shipped projects; collaborative workflows at Trustique Assists." },
  "Android Studio": { abbr: "ASD", rating: 88, desc: "Primary IDE utilized for cross-platform Flutter and Android development." },
  "SQL": { abbr: "SQL", rating: 82, desc: "Managed relational databases, schemas, and query optimization for university projects and coursework." },
  "MS Excel": { abbr: "XLS", rating: 88, desc: "Data cleaning and EDA for ML model at Skill Dzire; sales pattern analysis for Superstore consultancy." },
  "MS PowerPoint": { abbr: "PPT", rating: 95, desc: "Created award-winning pitch decks and slide presentations for national and international hackathons." },
  "Agile Methodology": { abbr: "AGL", rating: 90, desc: "Directed 3 cross-functional teams (15–18 members each) using Agile practices at Trustique Assists." },
  "Machine Learning (EDA)": { abbr: "ML", rating: 85, desc: "Certified by Skill Dzire; delivered 15% model classification accuracy improvement." },
  "Google Cloud Platform": { abbr: "GCP", rating: 80, desc: "Certified in GCP; utilized cloud services for scalable app deployment and storage." },
};

export function Skills() {
  const isReduced = useReducedMotion();

  // Active skill states
  const defaultCategory = skills[0].category;
  const defaultSkill = skills[0].items[0];

  const [activeSkillName, setActiveSkillName] = useState(defaultSkill);
  const [activeCategory, setActiveCategory] = useState(defaultCategory);

  // Flatten the skills for grid indexing
  const flatSkills = skills.flatMap((cat, catIdx) =>
    cat.items.map((item) => ({
      name: item,
      category: cat.category,
      number: cat.number,
      catIndex: catIdx + 1,
    }))
  );

  // Trigger anime stagger entrance once when section is visible
  useEffect(() => {
    if (isReduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          anime({
            targets: ".skill-pill",
            opacity: [0, 1],
            scale: [0.9, 1],
            translateY: [15, 0],
            delay: anime.stagger(40, { start: 100 }),
            duration: 650,
            easing: "easeOutBack",
          });
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );

    const section = document.getElementById("skills");
    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, [isReduced]);

  const changeSkill = (newSkill: string, categoryName: string) => {
    if (newSkill === activeSkillName) return;
    setActiveSkillName(newSkill);
    setActiveCategory(categoryName);
  };

  // Anime.js hover ripple wave
  const handleMouseEnter = (flatIdx: number) => {
    if (isReduced) return;
    anime({
      targets: ".skill-pill",
      scale: (el, i) => {
        if (i === flatIdx) return 1.06;
        const dist = Math.abs(i - flatIdx);
        if (dist === 1) return 1.01;
        if (dist === 2) return 0.99;
        return 0.96;
      },
      translateY: (el, i) => {
        if (i === flatIdx) return -3;
        const dist = Math.abs(i - flatIdx);
        if (dist === 1) return -1;
        return 0;
      },
      duration: 350,
      easing: "easeOutQuad",
    });
  };

  const handleMouseLeave = () => {
    if (isReduced) return;
    anime({
      targets: ".skill-pill",
      scale: 1,
      translateY: 0,
      duration: 300,
      easing: "easeOutQuad",
    });
  };

  const activeMeta = skillMeta[activeSkillName] || { abbr: "SK", rating: 80, desc: "" };

  return (
    <section id="skills" className="relative px-5 py-32 bg-black">
      {/* Step 1 — Section divider line sweep */}
      <div
        className="section-border-line absolute top-0 left-0 right-0 h-[1px] bg-[#E8FF00] origin-left"
        style={{ transform: isReduced ? "none" : "scaleX(0)" }}
      />

      <SliceHeading index="(06)" label="STACK / CAPABILITIES">
        TECHNICAL & <br /> <span className="text-outline">BUSINESS CORE</span>
      </SliceHeading>

      <div
        className="reveal-block grid grid-cols-12 gap-8 mt-10 items-stretch"
        style={{ opacity: isReduced ? 1 : 0 }}
      >
        {/* Left Column: All Skills Grid (Categorized) */}
        <div className="col-span-12 lg:col-span-8 space-y-10">
          {skills.map((cat, catIdx) => (
            <div key={cat.category} className="space-y-4">
              <h3 className="font-mono text-xs text-[#E8FF00] tracking-widest uppercase flex items-center gap-2 select-none">
                <span>// 0{catIdx + 1} &middot; {cat.category}</span>
                <span className="h-[1px] bg-white/20 flex-grow" />
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {cat.items.map((item) => {
                  const flatIdx = flatSkills.findIndex((fs) => fs.name === item);
                  const isSkillActive = item === activeSkillName;
                  const meta = skillMeta[item] || { rating: 80 };
                  
                  // Category-specific indicator dot colors
                  let dotColor = "bg-[#E8FF00]"; // business: yellow
                  if (cat.category === "TECHNICAL") dotColor = "bg-[#00E5FF]"; // technical: cyan
                  if (cat.category === "DATA & TOOLS") dotColor = "bg-[#FF00E5]"; // tools: magenta

                  return (
                    <div
                      key={item}
                      onMouseEnter={() => {
                        changeSkill(item, cat.category);
                        handleMouseEnter(flatIdx);
                      }}
                      onMouseLeave={handleMouseLeave}
                      onClick={() => changeSkill(item, cat.category)}
                      className={`skill-pill px-5 py-4 border-2 flex justify-between items-center transition-colors duration-300 rounded-none select-none cursor-pointer ${
                        isSkillActive
                          ? "bg-[#E8FF00] text-black border-[#E8FF00] shadow-[0_0_15px_rgba(232,255,0,0.2)]"
                          : "bg-[#0A0A0A] text-white border-white/10 hover:border-white hover:bg-[#111]"
                      }`}
                      style={{ opacity: isReduced ? 1 : 0 }} // Starts hidden for stagger entrance
                    >
                      <span className="font-display text-sm font-bold uppercase tracking-tight truncate pr-4">
                        {item}
                      </span>
                      <span className="flex items-center gap-2 font-mono text-[10px] flex-shrink-0">
                        <span className={`w-1.5 h-1.5 rounded-none ${isSkillActive ? "bg-black" : dotColor}`} />
                        <span className={isSkillActive ? "text-black/80 font-bold" : "text-white/40"}>
                          {meta.rating}%
                        </span>
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column: Sticky Clean Info Card */}
        <div className="col-span-12 lg:col-span-4">
          <div className="lg:sticky lg:top-24 border-4 border-white bg-[#0A0A0A] p-6 sm:p-8 flex flex-col justify-between min-h-[380px] shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-scanlines pointer-events-none opacity-20 z-10" />
            <div className="absolute inset-x-0 h-[2px] bg-[#E8FF00]/10 pointer-events-none animate-scan z-10" />
            <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
            
            <div className="relative z-10 font-mono text-[9px] uppercase tracking-widest text-white/30 border-b border-white/10 pb-3 select-none flex justify-between">
              <span>// ACTIVE_SKILL_LOG</span>
              <span className="text-[#E8FF00] flex items-center gap-1">
                <span className="w-1 h-1 bg-[#E8FF00] rounded-full animate-ping" />
                READY
              </span>
            </div>

            <div key={activeSkillName} className="animate-skill-reveal relative z-10 flex flex-col gap-6 my-6 flex-grow justify-center">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#E8FF00]">
                  {activeCategory}
                </span>
                <h4 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-white mt-1 border-b border-white/10 pb-3 leading-tight">
                  {activeSkillName}
                </h4>
              </div>

              {/* Progress bar */}
              <div className="font-mono space-y-1.5">
                <div className="flex justify-between text-[9px] text-white/50 tracking-wider">
                  <span>METRIC RATIO</span>
                  <span className="text-[#E8FF00] font-bold">{activeMeta.rating}%</span>
                </div>
                <div className="h-5 w-full bg-black border border-white/20 p-0.5 flex items-center">
                  <div
                    className="h-full bg-[#E8FF00] transition-all duration-[600ms] ease-out"
                    style={{ width: `${activeMeta.rating}%` }}
                  />
                </div>
              </div>

              {/* Contribution context */}
              <div className="font-mono text-xs text-white/80 leading-relaxed pt-2 flex gap-2">
                <span className="text-[#E8FF00] flex-shrink-0 animate-pulse font-bold">▸</span>
                <p className="uppercase">{activeMeta.desc}</p>
              </div>
            </div>

            <div className="relative z-10 font-mono text-[9px] text-white/20 border-t border-white/10 pt-3 select-none">
              SYSTEM STATUS: ONLINE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
