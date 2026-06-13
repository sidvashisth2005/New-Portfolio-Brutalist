import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Trophy, Medal, Star, Mic, BookOpen } from "lucide-react";

const EASE = [0.85, 0, 0.15, 1] as const;

const awards = [
  {
    n: "01",
    yr: "2025",
    title: "RANK 1 - HACKNITR 7.0 (INTERNATIONAL)",
    category: "GLOBAL HACKATHON",
    icon: <Trophy size={20} />,
    link: "https://www.linkedin.com/posts/siddhant-vashisth-04887b29b_from-juet-guna-to-the-global-stage-overwhelmed-activity-7430190952574730240-KED0",
    details: "Outperformed 6,200+ participants from 20+ countries at NIT Rourkela; pitched commercialisation strategy and product ROI case to global jury."
  },
  {
    n: "02",
    yr: "2025",
    title: "FIRST RUNNER-UP - HACKSAGON 2025 (NATIONAL)",
    category: "PRODUCT DESIGN",
    icon: <Medal size={20} />,
    link: "https://www.linkedin.com/posts/siddhant-vashisth-04887b29b_hacksagon-runnerup-hardwarehackathon-activity-7348814558116864000-NZFC",
    details: "Recognised for Product Thinking in AgriTech among 150+ teams; outlined go-to-market strategy and financial viability analysis to domain expert panel."
  },
  {
    n: "03",
    yr: "2024",
    title: "WINNER - UNIVERSITY IDEATHON 2024",
    category: "BUSINESS CASE",
    icon: <Star size={20} />,
    link: "https://www.linkedin.com/posts/rishabh-jain-264dz5_excited-to-announce-that-our-team-brahma-ugcPost-7315862371082678272-cwlp",
    details: "Secured 1st Place out of 30+ teams; successfully defended structured business case and product strategy."
  },
  {
    n: "04",
    yr: "2024",
    title: "BHOPAL VIGYAN MELA 2024",
    category: "NATIONAL EXHIBITION",
    icon: <Mic size={20} />,
    link: "https://www.linkedin.com/posts/siddhant-vashisth-04887b29b_bhopalvigyanmela-innovation-augmentedreality-activity-7323435480564281346-jfiL",
    details: "Served as Team Lead at 4-day national science exhibition; showcased 4 projects and built cross-industry professional networks."
  },
  {
    n: "05",
    yr: "2023",
    title: "PUBLISHED RESEARCH - JUET NATIONAL CONFERENCE",
    category: "ACADEMIC PUBLICATION",
    icon: <BookOpen size={20} />,
    link: "https://www.linkedin.com/posts/siddhant-vashisth-04887b29b_nationalconference-librarysciences-juet-activity-7323427654655725568-9mIq",
    details: "Authored paper on Social Sciences and Library Sciences; communicated research findings to 100+ attendees."
  }
];

export function Awards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="awards" className="relative bg-black text-white py-32 px-5 overflow-hidden border-t-2 border-white">
      <div className="grid grid-cols-12 gap-5 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="col-span-12 md:col-span-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 flex md:block items-center gap-3"
        >
          <span>(07)</span>
          <span className="h-px w-12 md:w-full md:mt-2 bg-white/30 inline-block" />
          <span className="md:block md:mt-2">WINS / RECOGNITION</span>
        </motion.div>

        <div className="col-span-12 md:col-span-9 overflow-hidden">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE }}
            className="font-display font-black tracking-[-0.04em] text-[9vw] sm:text-[8vw] md:text-[7vw] leading-[0.9] uppercase whitespace-normal break-words"
          >
            AWARDS&nbsp;&amp; HACKS
          </motion.h2>
        </div>
      </div>

      <ul className="border-t-2 border-white">
        {awards.map((a, i) => (
          <motion.li
            key={a.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: EASE }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="group relative border-b-2 border-white py-8 overflow-hidden cursor-pointer text-white hover:text-black transition-colors duration-300 px-2"
          >
            <div className="grid grid-cols-12 gap-5 items-center relative z-10">
              {/* Index & Year */}
              <div className="col-span-12 md:col-span-2 flex items-center gap-3">
                <span className="font-mono text-[10px] tracking-[0.2em] text-white/40 group-hover:text-black/40">({a.n})</span>
                <span className="font-mono text-xs font-bold uppercase tracking-[0.1em]">{a.yr}</span>
              </div>

              {/* Title & Category */}
              <div className="col-span-10 md:col-span-9 flex flex-col justify-center">
                <div className="flex items-center gap-2">
                  <span className="text-[#ffff00] group-hover:text-black">{a.icon}</span>
                  <span className="font-display font-black text-lg md:text-2xl tracking-tight uppercase leading-none">
                    {a.title}
                  </span>
                </div>
                <span className="font-mono text-[9px] tracking-[0.2em] text-white/50 group-hover:text-black/50 mt-1 uppercase pl-7">
                  // {a.category}
                </span>
              </div>

              {/* Link Icon */}
              <div className="col-span-2 md:col-span-1 text-right flex justify-end">
                <a
                  href={a.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 border border-white/20 group-hover:border-black rounded-none hover:bg-black hover:text-white transition-colors"
                >
                  <ExternalLink size={14} className="text-white/60 group-hover:text-black hover:text-white" />
                </a>
              </div>
            </div>

            {/* Expanding Details Drawer */}
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={hoveredIndex === i ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative z-10 overflow-hidden"
            >
              <div className="grid grid-cols-12 gap-5 mt-4">
                <div className="col-span-12 md:col-span-2" />
                <div className="col-span-12 md:col-span-10 text-xs md:text-sm font-mono uppercase tracking-[0.1em] leading-relaxed text-white/70 group-hover:text-black/80">
                  {a.details}
                </div>
              </div>
            </motion.div>

            {/* Yellow wipe background on hover */}
            <span className="absolute left-0 top-0 h-full w-0 bg-[#ffff00] z-0 group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.85,0,0.15,1)]" />
          </motion.li>
        ))}
      </ul>
    </section>
  );
}