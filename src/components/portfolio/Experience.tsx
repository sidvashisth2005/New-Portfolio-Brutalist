import { motion } from "framer-motion";
import { SliceHeading } from "./SliceHeading";

const EASE = [0.85, 0, 0.15, 1] as const;

const rows = [
  {
    year: "JUNE 2025 - AUG 2025",
    role: "TALENT ACQUISITION & BD INTERN",
    company: "Trustique Assists Pvt. Ltd.",
    location: "Lucknow, UP",
    outcomes: [
      "Sourced, screened, and onboarded 20+ interns across multiple colleges; evaluated candidates on technical aptitude and behavioural fit.",
      "Promoted to Team Lead; directed 3 cross-functional teams (15–18 members), achieving 100% on-time delivery.",
      "Ran discovery sessions to define a B2B marketplace app; drove 30% platform user growth by applying market intelligence."
    ]
  },
  {
    year: "DEC 2024 - JAN 2025",
    role: "DATA ANALYTICS & ML INTERN",
    company: "Skill Dzire",
    location: "Remote",
    outcomes: [
      "Improved ML classification model accuracy by 15% through data cleaning and EDA in Python and MS Excel.",
      "Delivered all tasks with 100% on-time completion rate."
    ]
  },
  {
    year: "JUNE 2024 - JULY 2024",
    role: "SOFTWARE DEVELOPMENT INTERN",
    company: "Codesoft",
    location: "Remote",
    outcomes: [
      "Reduced code review cycles by 20% by shipping 3 modular components using Agile methodology.",
      "Improved overall team delivery speed through structured optimisation."
    ]
  }
];

export function Experience() {
  return (
    <section id="experience" className="relative px-5 py-32 border-t-2 border-white">
      <SliceHeading index="(02)" label="EXPERIENCE">
        WORK <span className="text-outline">EXPERIENCE</span>
      </SliceHeading>

      <ul className="border-t-2 border-white">
        {rows.map((r, i) => (
          <motion.li
            key={r.role + r.company}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: EASE }}
            className="grid grid-cols-12 gap-5 border-b-2 border-white py-8"
          >
            <span className="col-span-12 md:col-span-2 font-mono text-xs uppercase tracking-[0.2em] text-white/70">
              {r.year}
            </span>
            <div className="col-span-12 md:col-span-6">
              <h3 className="font-display font-black text-2xl md:text-3xl tracking-tight uppercase">
                {r.role}
              </h3>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ffff00] mt-2">
                @ {r.company} <span className="text-white/50">({r.location})</span>
              </div>
            </div>
            <ul className="col-span-12 md:col-span-4 space-y-2">
              {r.outcomes.map((o, idx) => (
                <li key={idx} className="font-mono text-xs uppercase tracking-wide text-white/80 flex gap-2 leading-relaxed">
                  <span className="text-[#ffff00] flex-shrink-0">▸</span> 
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}