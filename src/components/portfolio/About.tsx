import { useReducedMotion } from "@/lib/anime-utils";
import { stats, education, certifications } from "@/lib/content";
import { FileText, Link as LinkIcon } from "lucide-react";

export function About() {
  const isReduced = useReducedMotion();

  return (
    <section
      id="about"
      className="relative px-5 py-32 bg-black"
    >
      {/* Step 1 — Section divider line sweep */}
      <div
        className="section-border-line absolute top-0 left-0 right-0 h-[1px] bg-[#E8FF00] origin-left"
        style={{ transform: isReduced ? "none" : "scaleX(0)" }}
      />

      <div className="grid grid-cols-12 gap-5">
        {/* Left column info */}
        <div className="col-span-12 md:col-span-3">
          {/* Step 2 — Section number + label (overflow: hidden parent) */}
          <div className="overflow-hidden md:sticky md:top-20">
            <div
              className="section-label"
              style={{ transform: isReduced ? "none" : "translateY(100%)" }}
            >
              <span className="section-label-index">(01)</span>
              <span className="section-label-text">IDENTITY / MANIFESTO</span>
            </div>
          </div>
        </div>

        {/* Right column content */}
        <div className="col-span-12 md:col-span-9">
          {/* Biography */}
          <div className="space-y-6 max-w-3xl">
            {/* Step 3 — Section heading */}
            <div className="overflow-hidden">
              <h2 className="section-title font-display font-black text-[8vw] sm:text-[7vw] md:text-[5.5vw] tracking-[-0.05em] leading-[0.9] uppercase text-white">
                <span className="inline-block whitespace-nowrap">PITCHER'S MIND.</span> <br />
                <span className="text-outline inline-block whitespace-nowrap">BUILDER'S HANDS.</span>
              </h2>
            </div>

            {/* Step 4 — Body content wrapper */}
            <div
              className="reveal-block font-display text-sm md:text-base text-white/70 leading-relaxed max-w-2xl"
              style={{ opacity: isReduced ? 1 : 0 }}
            >
              <p>
                Fresher with experience in BD, recruitment, and market research; international hackathon
                champion (<span className="text-[#E8FF00]">Rank 1 of 6,200+</span>) recognized for
                pitching product strategy across AgriTech, AR, and AI. Delivered real-world consulting
                outcomes across 6+ national and international competitions.
              </p>
            </div>
          </div>

          {/* Education & Certifications (reveal-block) */}
          <div
            className="reveal-block grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 border-t border-white/20 pt-10"
            style={{ opacity: isReduced ? 1 : 0 }}
          >
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E8FF00] mb-4">
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
              <p className="font-mono text-xs uppercase tracking-wider text-[#E8FF00] mt-2 font-bold">
                CGPA: {education.cgpa} / 10.0
              </p>
            </div>

            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E8FF00] mb-4">
                // CERTIFICATIONS
              </div>
              <ul className="space-y-2">
                {certifications.map((cert, i) => (
                  <li key={i} className="font-mono text-xs uppercase tracking-wider text-white/70 flex gap-2">
                    <span className="text-[#E8FF00]">▸</span>
                    <span>{cert}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Document Links (reveal-block) */}
          <div
            className="reveal-block mt-8 pt-6 border-t border-white/20 flex flex-wrap gap-4 font-mono text-[10px] uppercase tracking-[0.2em]"
            style={{ opacity: isReduced ? 1 : 0 }}
          >
            <a
              href="https://drive.google.com/file/d/1Du6QLPI58renRduOlaXqYmsCB6aXjen-/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-white px-4 py-2 hover:bg-[#E8FF00] hover:text-black transition-colors"
            >
              <FileText size={12} />
              View Certificates
            </a>
            <a
              href="https://drive.google.com/file/d/17h6O7igTIUcqdN9EDRrzjLlQS-GsbZVA/view?usp=drive_link"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-white px-4 py-2 hover:bg-[#E8FF00] hover:text-black transition-colors"
            >
              <LinkIcon size={12} />
              Supporting Documents
            </a>
          </div>

          {/* Metrics Grid (reveal-block) */}
          <div
            className="reveal-block mt-16 grid grid-cols-2 md:grid-cols-4 border-t-2 border-white"
            style={{ opacity: isReduced ? 1 : 0 }}
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={`stat-card p-6 md:p-8 hover:bg-[#E8FF00] hover:text-black transition-colors group ${
                  i < stats.length - 1 ? "border-r-2 border-white" : ""
                } border-b-2 border-white md:border-b-0`}
              >
                <div
                  className="stat-value font-display font-black text-3xl md:text-5xl tracking-[-0.06em] text-white group-hover:text-black leading-none"
                  data-target={stat.value}
                  data-suffix={stat.display.includes("+") ? "+" : stat.display.includes("%") ? "%" : ""}
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