import { useEffect, useRef } from "react";
import anime from "animejs";
import { GUILLOTINE, useReducedMotion } from "@/lib/anime-utils";
import { profile } from "@/lib/content";

export function Contact() {
  const isReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const handleFocus = (fieldId: string) => {
    if (isReduced) return;
    anime({
      targets: `#${fieldId}-underline`,
      width: "100%",
      duration: 300,
      easing: GUILLOTINE,
    });
  };

  const handleBlur = (fieldId: string) => {
    if (isReduced) return;
    anime({
      targets: `#${fieldId}-underline`,
      width: "0%",
      duration: 200,
      easing: GUILLOTINE,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nameVal = (document.getElementById("form-name") as HTMLInputElement)?.value || "";
    const msgVal = (document.getElementById("form-message") as HTMLTextAreaElement)?.value || "";
    const subject = encodeURIComponent(`Message from ${nameVal} (Portfolio)`);
    const body = encodeURIComponent(msgVal);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };



  return (
    <section
      id="contact"
      className="relative px-5 py-32 bg-black overflow-hidden"
    >
      {/* Step 1 — Section divider line sweep */}
      <div
        className="section-border-line absolute top-0 left-0 right-0 h-[1px] bg-[#E8FF00] origin-left"
        style={{ transform: isReduced ? "none" : "scaleX(0)" }}
      />

      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative grid grid-cols-12 gap-5 z-10">
        {/* Left Column */}
        <div className="col-span-12 md:col-span-3">
          <div className="overflow-hidden md:sticky md:top-20">
            <div
              className="section-label"
              style={{ transform: isReduced ? "none" : "translateY(100%)" }}
            >
              <span className="section-label-index">(08)</span>
              <span className="section-label-text">COMMS / CONTACT</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-12 md:col-span-9">
          {/* Heading with per-word overflow clip */}
          <div className="overflow-hidden">
            <h2 className="section-title font-display font-black text-[9vw] sm:text-[8vw] md:text-[7vw] tracking-[-0.05em] leading-[0.9] uppercase text-white">
              LET&rsquo;S <br />
              <span className="text-outline">BUILD.</span>
            </h2>
          </div>

          <p
            className="contact-subtext reveal-block font-display text-[15px] text-white/60 max-w-lg leading-relaxed mt-6 uppercase"
            style={{
              opacity: isReduced ? 1 : 0,
            }}
          >
            If you&rsquo;re hiring for business development, growth strategy, or product thinking &mdash;
            or you just want to talk about what&rsquo;s broken in AgriTech &mdash; the inbox is open.
          </p>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="mt-12 max-w-lg">
            {/* Name Field */}
            <div
              className="contact-form-field reveal-block relative border-b-2 border-white/30 mb-8"
              style={{ opacity: isReduced ? 1 : 0 }}
            >
              <input
                id="form-name"
                type="text"
                placeholder="YOUR NAME"
                required
                onFocus={() => handleFocus("name")}
                onBlur={() => handleBlur("name")}
                className="bg-transparent w-full pb-3 pt-1 font-display text-[15px] text-white placeholder-white/20 uppercase outline-none border-none"
              />
              <div id="name-underline" className="absolute bottom-0 left-0 h-[2px] bg-[#ffff00] w-0" />
            </div>

            {/* Message Field */}
            <div
              className="contact-form-field reveal-block relative border-b-2 border-white/30 mb-8"
              style={{ opacity: isReduced ? 1 : 0 }}
            >
              <textarea
                id="form-message"
                placeholder="YOUR MESSAGE"
                rows={4}
                required
                onFocus={() => handleFocus("message")}
                onBlur={() => handleBlur("message")}
                className="bg-transparent w-full pb-3 pt-1 font-display text-[15px] text-white placeholder-white/20 uppercase outline-none border-none resize-none"
              />
              <div id="message-underline" className="absolute bottom-0 left-0 h-[2px] bg-[#ffff00] w-0" />
            </div>

            {/* Buttons Row */}
            <div
              className="contact-form-field reveal-block flex flex-col sm:flex-row gap-4 mt-8"
              style={{ opacity: isReduced ? 1 : 0 }}
            >
              <button
                type="submit"
                className="magnetic-btn group/btn relative border-2 border-white px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white hover:text-black overflow-hidden cursor-pointer transition-colors duration-300"
              >
                <span className="relative z-10">SEND TRANSMISSION</span>
                <span className="absolute inset-0 bg-[#ffff00] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.85,0,0.15,1)] z-0" />
              </button>

              <a
                href="/Siddhant's Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="magnetic-btn group/btn relative border-2 border-white/30 px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/70 hover:text-black hover:border-white overflow-hidden cursor-pointer text-center transition-colors duration-300"
              >
                <span className="relative z-10">DOWNLOAD RESUME &rarr;</span>
                <span className="absolute inset-0 bg-[#ffff00] translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.85,0,0.15,1)] z-0" />
              </a>
            </div>
          </form>

          {/* Directory Grid */}
          <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 border-t-2 border-white">
            {[
              ["EMAIL", profile.email, `mailto:${profile.email}`],
              ["LOCATION", profile.location, null],
              ["LINKEDIN", "CONNECT ON LINKEDIN", profile.linkedin],
              ["GITHUB", "FOLLOW ON GITHUB", profile.github],
            ].map(([label, val, href], idx) => {
              const borderClasses = `contact-dir-cell reveal-block p-8 border-b-2 border-white ${
                idx % 2 === 0 ? "sm:border-r-2 border-white" : ""
              }`;
              return (
                <div
                  key={label}
                  className={borderClasses}
                  style={{ opacity: isReduced ? 1 : 0 }}
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">
                    {label}
                  </div>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("mailto:") ? undefined : "_blank"}
                      rel="noopener noreferrer"
                      className="font-display text-[14px] text-white hover:text-[#ffff00] transition-colors uppercase font-black tracking-wide"
                    >
                      {val}
                    </a>
                  ) : (
                    <span className="font-display text-[14px] text-white uppercase font-black tracking-wide">
                      {val}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative mt-32 pt-8 border-t-2 border-white flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 leading-relaxed">
          &copy; MMXXVI &middot; {profile.name} <br />
          COMPOSED IN GUNA, INDIA
        </div>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/20 text-left sm:text-right leading-relaxed">
          DIGITAL BRUTALISM &middot; V0.4 <br />
          ENGINEERED, NOT DECORATED.
        </div>
      </footer>
    </section>
  );
}