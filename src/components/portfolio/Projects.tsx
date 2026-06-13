import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import anime from "animejs";
import { GUILLOTINE, useReducedMotion } from "@/lib/anime-utils";
import { projects } from "@/lib/content";
import { SliceHeading } from "./SliceHeading";
import { ExternalLink } from "lucide-react";

const EASE = [0.85, 0, 0.15, 1] as const;

export function Projects() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
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
              targets: ".project-row",
              clipPath: ["inset(100% 0 0 0)", "inset(0% 0 0 0)"],
              opacity: [0, 1],
              duration: 500,
              delay: anime.stagger(120),
              easing: GUILLOTINE,
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, [isReduced]);

  return (
    <section id="projects" ref={sectionRef} className="relative px-5 py-32 border-t-2 border-white">
      <SliceHeading index="(03)" label="PROJECTS">
        FEATURED <span className="text-outline">PROJECTS</span>
      </SliceHeading>

      <div className="border-t-2 border-white">
        {projects.map((p, i) => {
          const isHovered = hoveredIndex === i;
          return (
            <div
              key={p.index}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="project-row group relative block border-b-2 border-white py-6 overflow-hidden text-white hover:text-black transition-colors duration-300 cursor-pointer"
              style={{
                clipPath: isReduced ? "none" : "inset(100% 0 0 0)",
                opacity: isReduced ? 1 : 0,
              }}
            >
              <div className="grid grid-cols-12 gap-5 items-center relative z-10">
                {/* Index */}
                <span className="col-span-1 font-mono text-xs uppercase tracking-[0.2em] pl-2 text-[#ffff00] group-hover:text-black transition-colors duration-300">
                  ({p.index})
                </span>

                {/* Title and Awards */}
                <div className="col-span-5 md:col-span-4 flex flex-col justify-center gap-1">
                  {p.awards && p.awards.length > 0 && (
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#ffff00] group-hover:text-black transition-colors duration-300">
                      {p.awards.join(" / ")}
                    </span>
                  )}
                  <span className="font-display font-black text-xl md:text-3xl tracking-tight uppercase leading-none">
                    {p.title}
                  </span>
                </div>

                {/* Category */}
                <span className="col-span-3 hidden md:block font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 group-hover:text-black/60 transition-colors duration-300">
                  {p.category}
                </span>

                {/* Tags */}
                <div className="col-span-4 md:col-span-3 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[9px] uppercase tracking-[0.2em] border border-white/30 px-2 py-0.5 text-white/50 group-hover:border-black/30 group-hover:text-black/50 transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Github Link */}
                <span className="col-span-2 md:col-span-1 text-right font-mono text-xs uppercase tracking-[0.2em] pr-2 text-white/50 group-hover:text-black/50 flex items-center justify-end gap-2">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-block hover:scale-115 transition-transform"
                    >
                      <ExternalLink size={14} className="text-white/50 group-hover:text-black" />
                    </a>
                  )}
                </span>
              </div>

              {/* Expanding Details Drawer */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={isHovered ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="relative z-10 overflow-hidden"
              >
                <div className="grid grid-cols-12 gap-5 mt-4 px-2 text-white group-hover:text-black font-mono text-xs md:text-sm uppercase tracking-[0.05em] leading-relaxed">
                  <div className="col-span-1 md:col-span-1" />
                  <div className="col-span-11 md:col-span-11 space-y-2 pr-4">
                    {p.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex gap-2">
                        <span className="text-[#ffff00] group-hover:text-black">▸</span>
                        <span>{bullet}</span>
                      </div>
                    ))}
                    {p.github && (
                      <div className="pt-3 flex items-center">
                        <span className="text-[#ffff00] group-hover:text-black mr-2 select-none">▸</span>
                        <a
                          href={p.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 border border-white/20 group-hover:border-black/20 px-4 py-2 text-[10px] uppercase tracking-[0.15em] font-bold text-white/80 group-hover:text-black relative overflow-hidden group/btn ml-1"
                        >
                          {/* Sliding background layer */}
                          <span className="absolute inset-0 bg-white group-hover:bg-black translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.85,0,0.15,1)] z-0" />
                          
                          {/* Interactive Text & Icon */}
                          <span className="relative z-10 flex items-center gap-2 group-hover/btn:text-black group-hover:group-hover/btn:text-[#ffff00] transition-colors duration-300">
                            <svg
                              role="img"
                              viewBox="0 0 24 24"
                              className="h-3.5 w-3.5 fill-current"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                            </svg>
                            <span>View Code on GitHub</span>
                          </span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* physical wipe span on hover */}
              <span className="absolute left-0 top-0 h-full w-0 bg-[#ffff00] z-0 group-hover:w-full transition-all duration-500 ease-[cubic-bezier(0.85,0,0.15,1)]" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
