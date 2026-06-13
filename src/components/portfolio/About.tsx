import { useEffect, useRef } from "react";
import anime from "animejs";
import { GUILLOTINE, useReducedMotion } from "@/lib/anime-utils";
import { stats, education, certifications, profile } from "@/lib/content";
import { FileText, Link as LinkIcon } from "lucide-react";

export function About() {
  const isReduced = useReducedMotion();
  const statsRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-reveal for the whole section
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || isReduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // HEADING: dramatic slam with clip-path
            anime({
              targets: ".about-heading-word",
              clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
              translateX: [-40, 0],
              opacity: [0, 1],
              duration: 900,
              delay: anime.stagger(120, { start: 100 }),
              easing: GUILLOTINE,
            });

            // PARAGRAPH: word-by-word reveal
            anime({
              targets: ".about-paragraph",
              clipPath: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"],
              translateY: [20, 0],
              opacity: [0, 1],
              duration: 700,
              delay: 450,
              easing: GUILLOTINE,
            });

            // EDUCATION/CERT blocks: stagger slide up
            anime({
              targets: ".about-detail-block",
              translateY: [60, 0],
              opacity: [0, 1],
              duration: 700,
              delay: anime.stagger(160, { start: 600 }),
              easing: GUILLOTINE,
            });

            // BUTTONS: skew-slide in
            anime({
              targets: ".about-doc-btn",
              skewX: [-20, 0],
              translateX: [-50, 0],
              opacity: [0, 1],
              duration: 600,
              delay: anime.stagger(120, { start: 900 }),
              easing: GUILLOTINE,
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [isReduced]);

  // Stats counter animation on scroll
  useEffect(() => {
    const section = statsRef.current;
    if (!section || isReduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Slam the whole stats bar in
            anime({
              targets: ".stat-card",
              clipPath: ["inset(100% 0 0 0)", "inset(0% 0 0 0)"],
              translateY: [40, 0],
              opacity: [0, 1],
              duration: 600,
              delay: anime.stagger(100, { start: 0 }),
              easing: GUILLOTINE,
            });

            // Count up numbers
            stats.forEach((stat, i) => {
              const elements = document.querySelectorAll(".stat-value");
              const el = elements[i];
              if (!el) return;
              const target = stat.value;
              anime({
                targets: { value: 0 },
                value: target,
                duration: 1600,
                delay: i * 120 + 300,
                easing: "easeOutExpo",
                round: 1,
                update: function (anim) {
                  const val = Math.round(anim.animations[0].currentValue);
                  const suffix = stat.display.includes("+")
                    ? "+"
                    : stat.display.includes("%")
                    ? "%"
                    : "";
                  el.textContent = val.toLocaleString() + suffix;
                },
              });
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [isReduced]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative px-5 py-32 border-t-2 border-white bg-black"
    >
      <div className="grid grid-cols-12 gap-5">
        {/* Left column info */}
        <div className="col-span-12 md:col-span-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ffff00] md:sticky md:top-20">
            (01) ABOUT / MANIFESTO
          </div>
        </div>

        {/* Right column content */}
        <div className="col-span-12 md:col-span-9">
          {/* Biography */}
          <div className="space-y-6 max-w-3xl">
            {/* Heading - each word split for slam animation */}
            <h2 className="font-display font-black text-[9vw] sm:text-[8vw] md:text-[4vw] tracking-[-0.06em] uppercase leading-none text-white overflow-hidden">
              <span
                className="about-heading-word inline-block mr-4"
                style={{ opacity: isReduced ? 1 : 0, clipPath: isReduced ? "none" : "inset(0 100% 0 0)" }}
              >
                PITCHER&rsquo;S
              </span>
              <span
                className="about-heading-word inline-block mr-4"
                style={{ opacity: isReduced ? 1 : 0, clipPath: isReduced ? "none" : "inset(0 100% 0 0)" }}
              >
                MIND.
              </span>
              <br />
              <span
                className="about-heading-word text-outline inline-block mr-4"
                style={{ opacity: isReduced ? 1 : 0, clipPath: isReduced ? "none" : "inset(0 100% 0 0)" }}
              >
                BUILDER&rsquo;S
              </span>
              <span
                className="about-heading-word text-outline inline-block"
                style={{ opacity: isReduced ? 1 : 0, clipPath: isReduced ? "none" : "inset(0 100% 0 0)" }}
              >
                HANDS.
              </span>
            </h2>

            <p
              className="about-paragraph font-display text-sm md:text-base text-white/70 leading-relaxed max-w-2xl"
              style={{ opacity: isReduced ? 1 : 0, clipPath: isReduced ? "none" : "inset(0 0 100% 0)" }}
            >
              Fresher with experience in BD, recruitment, and market research; international hackathon
              champion (<span className="text-[#ffff00]">Rank 1 of 6,200+</span>) recognized for
              pitching product strategy across AgriTech, AR, and AI. Delivered real-world consulting
              outcomes across 6+ national and international competitions.
            </p>
          </div>

          {/* Education & Certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 border-t border-white/20 pt-10">
            <div
              className="about-detail-block"
              style={{ opacity: isReduced ? 1 : 0 }}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ffff00] mb-4">
                // EDUCATION
              </div>
              <h3 className="font-display font-black text-lg md:text-xl uppercase tracking-tight text-white">
                {education.institution}
              </h3>
              <p className="font-mono text-xs uppercase tracking-wider text-white/50 mt-1">
                {education.degree}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-white/40 mt-1">
                {education.period}
              </p>
              <p className="font-mono text-xs uppercase tracking-wider text-[#ffff00] mt-2 font-bold">
                CGPA: {education.cgpa} / 10.0
              </p>
            </div>

            <div
              className="about-detail-block"
              style={{ opacity: isReduced ? 1 : 0 }}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ffff00] mb-4">
                // CERTIFICATIONS
              </div>
              <ul className="space-y-2">
                {certifications.map((cert, i) => (
                  <li key={i} className="font-mono text-xs uppercase tracking-wider text-white/70 flex gap-2">
                    <span className="text-[#ffff00]">▸</span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Document Links */}
          <div className="mt-8 pt-6 border-t border-white/20 flex flex-wrap gap-4 font-mono text-[10px] uppercase tracking-[0.2em]">
            <a
              href="https://drive.google.com/file/d/1Du6QLPI58renRduOlaXqYmsCB6aXjen-/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="about-doc-btn flex items-center gap-2 border border-white px-4 py-2 hover:bg-[#ffff00] hover:text-black transition-colors"
              style={{ opacity: isReduced ? 1 : 0 }}
            >
              <FileText size={12} />
              View Certificates
            </a>
            <a
              href="https://drive.google.com/file/d/17h6O7igTIUcqdN9EDRrzjLlQS-GsbZVA/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="about-doc-btn flex items-center gap-2 border border-white px-4 py-2 hover:bg-[#ffff00] hover:text-black transition-colors"
              style={{ opacity: isReduced ? 1 : 0 }}
            >
              <LinkIcon size={12} />
              Supporting Documents
            </a>
          </div>

          {/* Metrics Grid */}
          <div ref={statsRef} className="mt-16 grid grid-cols-2 md:grid-cols-4 border-t-2 border-white">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`stat-card p-6 md:p-8 hover:bg-[#ffff00] hover:text-black transition-colors group ${
                  i < stats.length - 1 ? "border-r-2 border-white" : ""
                } border-b-2 border-white md:border-b-0`}
                style={{ opacity: isReduced ? 1 : 0, clipPath: isReduced ? "none" : "inset(100% 0 0 0)" }}
              >
                <div
                  className="stat-value font-display font-black text-3xl md:text-5xl tracking-[-0.06em] text-white group-hover:text-black leading-none"
                  data-target={stat.value}
                >
                  {isReduced ? stat.display : "0"}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 group-hover:text-black/70 mt-2">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}