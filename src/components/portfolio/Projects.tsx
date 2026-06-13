import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useReducedMotion } from "@/lib/anime-utils";
import { projects } from "@/lib/content";

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined" || isReduced) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Horizontal scrolling timeline
      const horizontalTween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
        },
      });

      // Individual slide title entrances via containerAnimation
      const slides = track.querySelectorAll(".project-slide");
      slides.forEach((slide) => {
        const title = slide.querySelector(".project-title");
        if (title) {
          gsap.fromTo(
            title,
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              duration: 0.6,
              ease: "power3.out",
              scrollTrigger: {
                trigger: slide,
                containerAnimation: horizontalTween,
                start: "left 75%", // start animation when slide is 75% into viewport from the right
                toggleActions: "play none none none",
              },
            }
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, [isReduced]);

  if (isReduced) {
    // Accessible fallback: stacked vertically
    return (
      <section id="projects" className="relative px-5 py-32 bg-black">
        <div className="section-border-line absolute top-0 left-0 right-0 h-[1px] bg-[#E8FF00]" />
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="overflow-hidden mb-16">
            <h2 className="font-display font-black text-[9vw] sm:text-[8vw] md:text-[4vw] tracking-[-0.06em] uppercase leading-none text-white">
              FEATURED <span className="text-outline">PROJECTS</span>
            </h2>
          </div>
          
          <div className="space-y-16">
            {projects.map((p) => (
              <div
                key={p.index}
                className="grid grid-cols-12 gap-8 border-b border-white/10 pb-12 items-center"
              >
                <div className="col-span-12 md:col-span-7 flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-[#E8FF00]">({p.index})</span>
                    <span className="font-mono text-xs text-white/50">{p.tags.join(" / ")}</span>
                  </div>
                  <h3 className="font-display font-bold text-3xl md:text-5xl uppercase text-white leading-none">
                    {p.title}
                  </h3>
                  <ul className="space-y-3">
                    {p.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-[#E8FF00] mt-[8px] flex-shrink-0" />
                        <span className="font-display text-xs md:text-sm text-white/70 ml-3 uppercase font-bold">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {p.github && (
                    <div className="mt-2">
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs uppercase tracking-wider text-[#E8FF00] hover:text-white transition-colors"
                      >
                        VIEW ON GITHUB &rarr;
                      </a>
                    </div>
                  )}
                </div>
                <div className="col-span-12 md:col-span-5 flex justify-center md:justify-end">
                  <div className="w-[200px] h-[300px] border border-[#333] bg-[#0A0A0A] flex items-center justify-center relative">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#333]">
                      IMAGE COMING SOON
                    </span>
                    <div className="absolute inset-2 border border-dashed border-[#1a1a1a]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full h-screen bg-black overflow-hidden projects-section"
    >
      {/* Top Border Line Sweep */}
      <div
        className="section-border-line absolute top-0 left-0 right-0 h-[1px] bg-[#E8FF00] origin-left z-20"
        style={{ transform: "scaleX(0)" }}
      />

      <div
        ref={trackRef}
        className="projects-track reveal-block flex h-full items-center select-none"
        style={{ width: `${projects.length * 100}vw`, opacity: 0 }}
      >
        {projects.map((p) => (
          <div
            key={p.index}
            className="project-slide project-card w-screen h-full flex-shrink-0 flex items-center justify-center relative px-6 md:px-24 bg-black border-r border-white/10"
          >
            {/* Top-Left Project Number */}
            <div className="absolute top-12 left-12 font-mono text-[14px] text-[#E8FF00] tracking-wider transition-all duration-300 hover:text-white hover:scale-105 origin-left inline-block cursor-pointer select-none">
              ({p.index})
            </div>

            {/* Top-Right Tech Stack Tags */}
            <div className="absolute top-12 right-12 font-mono text-xs text-white/50 tracking-wider select-none">
              {p.tags.join(" / ")}
            </div>

            {/* Content Container Grid */}
            <div className="grid grid-cols-12 gap-8 w-full max-w-7xl mx-auto items-center">
              {/* Left Half: Details */}
              <div className="col-span-12 md:col-span-7 flex flex-col justify-center gap-6 text-left pl-4 md:pl-0">
                <h3
                  className="project-title font-display font-bold text-[clamp(2.2rem,6.5vw,72px)] tracking-[-0.05em] uppercase text-white leading-[0.95] mb-2 select-none"
                  style={{ clipPath: "inset(0 100% 0 0)" }}
                >
                  {p.title}
                </h3>
                <ul className="space-y-4 max-w-xl">
                  {p.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-[#E8FF00] mt-[8px] flex-shrink-0" />
                      <span className="font-display text-[13px] md:text-[14px] text-white/70 leading-relaxed ml-4 uppercase">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>

                {p.github ? (
                  <div className="mt-4">
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#E8FF00] select-none"
                    >
                      <span>VIEW ON GITHUB &rarr;</span>
                      <span className="absolute left-0 bottom-[-4px] h-[1.5px] w-full bg-[#E8FF00] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                    </a>
                  </div>
                ) : (
                  <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/30 select-none">
                    PROPRIETARY PROJECT
                  </div>
                )}
              </div>

              {/* Right Half: Screenshot Box */}
              <div className="col-span-12 md:col-span-5 flex justify-center md:justify-end pr-4 md:pr-0">
                <div className="w-[200px] h-[300px] border border-[#333] bg-[#0A0A0A] flex items-center justify-center relative group">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#333] group-hover:text-white/60 transition-colors duration-300 select-none">
                    IMAGE COMING SOON
                  </span>
                  <div className="absolute inset-2 border border-dashed border-[#1a1a1a] pointer-events-none group-hover:border-[#333] transition-colors duration-300" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
