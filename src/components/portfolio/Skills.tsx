import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SliceHeading } from "./SliceHeading";
import { Briefcase, Code, Database } from "lucide-react";

const EASE = [0.85, 0, 0.15, 1] as const;

interface SkillItem {
  name: string;
  desc: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Business & Strategy",
    icon: <Briefcase size={20} />,
    skills: [
      {
        name: "Business Development",
        desc: "Pitched commercialisation strategies at 6+ hackathons & drove 30% user growth for Trustique's B2B marketplace app."
      },
      {
        name: "Market Research",
        desc: "Benchmarked global competitors for Livestock Monitoring System & diagnosed local superstore footfall patterns."
      },
      {
        name: "ROI Analysis",
        desc: "Designed product launch strategy and ROI case for farmer and insurer segments at HackNITR 7.0."
      },
      {
        name: "Go-to-Market Strategy",
        desc: "Devised 3 actionable growth recommendations for a local superstore, achieving 25%+ increase in customer footfall."
      },
      {
        name: "Lead Generation",
        desc: "Sourced, screened, and onboarded 20+ interns across multiple colleges for Trustique assists."
      },
      {
        name: "Agile Methodology",
        desc: "Reduced code review cycles by 20% by shipping 3 modular components at Codesoft using Agile methodology."
      }
    ]
  },
  {
    title: "Technical",
    icon: <Code size={20} />,
    skills: [
      {
        name: "Flutter",
        desc: "Developed the ARound You app integrating Map Tiles API and Firebase database."
      },
      {
        name: "Python",
        desc: "Improved ML classification model accuracy by 15% through data cleaning and EDA in Jupyter notebooks."
      },
      {
        name: "IoT",
        desc: "Built dual-component hardware/software solution (microcontrollers + sensors) for real-time livestock health monitoring."
      },
      {
        name: "Git/GitHub",
        desc: "Maintained version control and repository architecture across all projects including full-stack TravelGo platform."
      },
      {
        name: "Android Studio",
        desc: "Primary IDE utilized for cross-platform Flutter and Android development."
      }
    ]
  },
  {
    title: "Data & Tools",
    icon: <Database size={20} />,
    skills: [
      {
        name: "SQL",
        desc: "Managed relational databases, schemas, and query optimization for university projects and coursework."
      },
      {
        name: "MS Excel",
        desc: "Used extensively for data cleaning, Exploratory Data Analysis (EDA), and financial viability analysis."
      },
      {
        name: "MS PowerPoint",
        desc: "Created award-winning pitch decks and slide presentations for national and international hackathons."
      },
      {
        name: "Machine Learning (EDA)",
        desc: "Certified by Skill Dzire; delivered 15% model classification accuracy improvement."
      },
      {
        name: "Google Cloud Platform",
        desc: "Certified in GCP; utilized cloud services for scalable app deployment and storage."
      }
    ]
  }
];

export function Skills() {
  const [activeSkill, setActiveSkill] = useState<SkillItem | null>(null);

  return (
    <section id="skills" className="relative px-5 py-32 border-t-2 border-white bg-black">
      <SliceHeading index="(06)" label="SKILLS">
        TECHNICAL & <span className="text-outline">BUSINESS SKILLS</span>
      </SliceHeading>

      <div className="grid grid-cols-12 gap-8 mt-10">
        {/* Left: Skill Categories and Items */}
        <div className="col-span-12 md:col-span-7 space-y-8">
          {skillCategories.map((cat, catIdx) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIdx * 0.1, ease: EASE }}
              className="border-2 border-white p-6 bg-black"
            >
              <h3 className="font-display font-black text-lg uppercase tracking-tight flex items-center gap-2 border-b border-white/20 pb-4 mb-4">
                <span className="text-[#ffff00]">{cat.icon}</span>
                {cat.title}
              </h3>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => {
                  const isHovered = activeSkill?.name === skill.name;
                  return (
                    <button
                      key={skill.name}
                      onMouseEnter={() => setActiveSkill(skill)}
                      onMouseLeave={() => setActiveSkill(null)}
                      className={`font-mono text-xs uppercase tracking-wider px-3 py-2 border transition-all duration-300 ${
                        isHovered
                          ? "bg-[#ffff00] text-black border-[#ffff00] scale-[1.03]"
                          : "bg-black text-white/80 border-white/20 hover:border-white hover:text-white"
                      }`}
                    >
                      {skill.name}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right: Sticky Detail Panel */}
        <div className="col-span-12 md:col-span-5">
          <div className="sticky top-28 border-2 border-white bg-black p-6 md:p-8 min-h-[300px] flex flex-col justify-between overflow-hidden relative">
            <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

            <AnimatePresence mode="wait">
              {activeSkill ? (
                <motion.div
                  key={activeSkill.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="relative z-10 flex flex-col justify-between h-full gap-4"
                >
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#ffff00]">
                      // INJECTED SKILL CONTEXT
                    </span>
                    <h4 className="font-display font-black text-2xl uppercase tracking-tight mt-2 border-b border-white/20 pb-4">
                      {activeSkill.name}
                    </h4>
                    <p className="font-mono text-sm uppercase tracking-wide leading-relaxed text-white/95 mt-6 flex gap-2">
                      <span className="text-[#ffff00] flex-shrink-0">▸</span>
                      <span>{activeSkill.desc}</span>
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative z-10 flex flex-col justify-center items-center h-full text-center py-12"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 animate-pulse">
                    [ HOVER A SKILL TO INSPECT OUTCOMES ]
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
