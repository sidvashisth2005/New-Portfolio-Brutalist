import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { GUILLOTINE, useReducedMotion } from "@/lib/anime-utils";
import { profile } from "@/lib/content";

export function Contact() {
  const isReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'success' | 'error' | ''>('');

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    setIsSubmitting(true);
    setStatus('');

    const formData = new FormData(formEl);
    formData.append("access_key", "34876f3a-ab36-4d99-86f5-edb5e82a016b");
    formData.append("replyto", formData.get("email") as string);
    formData.append("subject", `⚡ [PORTFOLIO ENQUIRY] — Connection Request from ${formData.get("name")}`);
    formData.append("from_name", "⚡ Portfolio Terminal");
    
    // Add telemetry metadata for a premium console vibe in the email layout
    formData.append("Telemetry Source", "PORTFOLIO // INTERACTION TERMINAL");
    formData.append("Timestamp (IST)", new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });
      
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        if (data.success) {
          setStatus('success');
          formEl.reset();
        } else {
          console.error("Web3Forms submission failed. Response:", data);
          setStatus('error');
        }
      } else {
        const text = await response.text();
        console.error(`Web3Forms returned non-JSON response (${response.status}):`, text);
        setStatus('error');
      }
    } catch (error) {
      console.error("Web3Forms network/CORS error:", error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <section
      id="contact"
      className="relative px-5 py-16 md:py-32 bg-black overflow-hidden"
    >
      {/* Step 1 — Section divider line sweep */}
      <div
        className="section-border-line absolute top-0 left-0 right-0 h-[1px] bg-[#E8FF00] origin-left"
        style={{ transform: isReduced ? "none" : "scaleX(0)" }}
      />

      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      <div className="relative grid grid-cols-12 gap-5 z-10" data-skew>
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
          {/* Heading with per-line word reveal */}
          <h2 className="section-title font-display font-black text-[9vw] sm:text-[8vw] md:text-[7vw] tracking-[-0.05em] leading-[0.9] uppercase text-white">
            <div className="overflow-hidden">
              <span className="word-reveal inline-block whitespace-nowrap">LET&rsquo;S</span>
            </div>
            <div className="overflow-hidden">
              <span className="word-reveal text-outline inline-block whitespace-nowrap">BUILD.</span>
            </div>
          </h2>

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
          <form onSubmit={handleSubmit} className="mt-8 md:mt-12 max-w-lg w-full">
            {/* Name Field */}
            <div
              className="contact-form-field reveal-block relative border-b-2 border-white/30 mb-8"
              style={{ opacity: isReduced ? 1 : 0 }}
            >
              <input
                id="form-name"
                name="name"
                type="text"
                placeholder="YOUR NAME"
                required
                onFocus={() => handleFocus("name")}
                onBlur={() => handleBlur("name")}
                className="bg-transparent w-full pb-3 pt-1 font-display text-[15px] text-white placeholder-white/20 uppercase outline-none border-none"
              />
              <div id="name-underline" className="absolute bottom-0 left-0 h-[2px] bg-[#ffff00] w-0" />
            </div>

            {/* Email Field */}
            <div
              className="contact-form-field reveal-block relative border-b-2 border-white/30 mb-8"
              style={{ opacity: isReduced ? 1 : 0 }}
            >
              <input
                id="form-email"
                name="email"
                type="email"
                placeholder="YOUR EMAIL"
                required
                onFocus={() => handleFocus("email")}
                onBlur={() => handleBlur("email")}
                className="bg-transparent w-full pb-3 pt-1 font-display text-[15px] text-white placeholder-white/20 uppercase outline-none border-none"
              />
              <div id="email-underline" className="absolute bottom-0 left-0 h-[2px] bg-[#ffff00] w-0" />
            </div>

            {/* Message Field */}
            <div
              className="contact-form-field reveal-block relative border-b-2 border-white/30 mb-8"
              style={{ opacity: isReduced ? 1 : 0 }}
            >
              <textarea
                id="form-message"
                name="message"
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
                disabled={isSubmitting}
                className="magnetic-btn group/btn relative border-2 border-white px-8 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white hover:text-black overflow-hidden cursor-pointer transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">{isSubmitting ? "SENDING..." : "SEND MESSAGE"}</span>
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

            {/* Status Messages */}
            {status === 'success' && (
              <div className="mt-6 font-mono text-[11px] text-[#ffff00] uppercase tracking-[0.2em]">
                // TRANSMISSION SUCCESSFUL. INBOX UPDATED.
              </div>
            )}
            {status === 'error' && (
              <div className="mt-6 font-mono text-[11px] text-[#ffff00] uppercase tracking-[0.2em]">
                // ERROR: TRANSMISSION FAILED. TRY AGAIN OR EMAIL DIRECTLY.
              </div>
            )}
          </form>

          {/* Directory Grid */}
          <div className="mt-12 md:mt-20 grid grid-cols-1 sm:grid-cols-2 border-t-2 border-white">
            {[
              ["EMAIL", profile.email, "#form-name"],
              ["LOCATION", profile.location, null],
              ["LINKEDIN", "CONNECT ON LINKEDIN", profile.linkedin],
              ["GITHUB", "FOLLOW ON GITHUB", profile.github],
            ].map(([label, val, href], idx) => {
              const borderClasses = `contact-dir-cell reveal-block p-5 md:p-8 border-b-2 border-white ${
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
                      onClick={(e) => {
                        if (label === "EMAIL") {
                          e.preventDefault();
                          const target = document.getElementById("form-name");
                          if (target) {
                            const lenis = (window as any).lenis;
                            if (lenis) {
                              lenis.scrollTo(target);
                            } else {
                              target.scrollIntoView({ behavior: "smooth" });
                            }
                            target.focus({ preventScroll: true });
                          }
                        }
                      }}
                      target={href.startsWith("http") ? "_blank" : undefined}
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
      <footer className="relative mt-16 md:mt-32 pt-8 border-t-2 border-white flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
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