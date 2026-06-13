import { useEffect, useRef } from "react";
import gsap from "gsap/dist/gsap";
import { useReducedMotion } from "@/lib/anime-utils";
import { profile } from "@/lib/content";
import { SigilModel } from "./SigilModel";
import { StarField } from "./StarField";

export function Hero({ start }: { start: boolean }) {
  const coordsRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (!start || isReduced) return;

    const tl = gsap.timeline();

    // Step 1 — "SIDDHANTVASHISTH" headline:
    // Wrap each CHARACTER in a span inside a parent with overflow: hidden
    // Each char: y: 110% → 0, duration: 0.9s, stagger: 0.025s, ease: "power3.out"
    tl.to(
      ".hero-letter",
      {
        y: "0%",
        opacity: 1,
        duration: 0.9,
        stagger: 0.025,
        ease: "power3.out",
      },
      0
    );

    // Step 2 — Subtitle line (Business strategist...):
    // Wrap in overflow: hidden parent
    // y: 100% → 0, opacity: 0 → 1, duration: 0.7s, delay: 0.4s
    tl.to(
      ".hero-tagline",
      {
        y: "0%",
        opacity: 1,
        duration: 0.7,
        ease: "power3.out",
      },
      0.4
    );

    // Step 3 — Meta grid (ROLE / INST / YEAR / RANK cards):
    // Each card: y: 20px → 0, opacity: 0 → 1, stagger: 0.08s, delay: 0.7s
    tl.to(
      ".hero-meta",
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
      },
      0.7
    );

    // Step 4 — Stat counters (6200+, 20, etc.):
    // Use gsap.to on a plain object { val: 0 } → { val: 6200 }
    // onUpdate: update the DOM text with Math.round(obj.val)
    // duration: 1.8s, ease: "power2.out", delay: 0.9s
    const statsElements = document.querySelectorAll(".stat-value");
    statsElements.forEach((el) => {
      const targetVal = parseInt(el.getAttribute("data-target") || "0", 10);
      const suffix = el.getAttribute("data-suffix") || "";
      const obj = { val: 0 };
      
      tl.to(
        obj,
        {
          val: targetVal,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toLocaleString() + suffix;
          },
        },
        0.9
      );
    });

    // Step 5 — Nav bar:
    // y: -100% → 0, duration: 0.6s, ease: "power2.out", delay: 0.2s
    tl.to(
      ".portfolio-nav",
      {
        y: "0%",
        duration: 0.6,
        ease: "power2.out",
      },
      0.2
    );

    // Additional animations for other elements on the Hero page
    tl.to(
      ".hero-divider",
      {
        scaleX: 1,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
      },
      0.5
    );

    tl.to(
      ".hero-info-row",
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.out",
      },
      0.6
    );

    tl.to(
      ".hero-model-container",
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
      },
      0.8
    );

    tl.to(
      ".hero-scroll-indicator",
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      1.2
    );

  }, [start, isReduced]);

  return (
    <section id="top" className="relative min-h-screen flex flex-col overflow-hidden bg-black">
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Top Part */}
      <div className="relative flex-1 flex flex-col justify-end overflow-hidden">
        {/* Star Field */}
        <div className="absolute inset-x-0 top-[54px] bottom-0 z-0 overflow-hidden">
          <StarField />
        </div>

        {/* 3D Model Container - separated into outer positioning and inner animation to prevent GSAP overrides */}
        <div className="absolute right-5 md:right-10 top-[calc(50%+27px)] -translate-y-1/2 w-[280px] h-[280px] md:w-[450px] md:h-[450px] z-20 pointer-events-auto">
          <div
            className="hero-model-container w-full h-full"
            style={{
              opacity: isReduced ? 1 : 0,
              transform: isReduced ? "none" : "scale(0.85)",
            }}
          >
            <SigilModel coordsRef={coordsRef} />
          </div>
        </div>

        {/* Top crosshair info */}
        <div className="absolute top-20 left-5 right-5 grid grid-cols-12 gap-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 z-10">
          <div
            className="hero-info-row col-span-3 flex items-center gap-2"
            style={{
              opacity: isReduced ? 1 : 0,
              transform: isReduced ? "none" : "translateY(-15px)",
            }}
          >
            <span className="h-1.5 w-1.5 bg-[#ffff00] animate-blink" />
            STATUS / ONLINE
          </div>
          <div
            ref={coordsRef}
            className="hero-info-row col-span-3 col-start-7 select-none"
            style={{
              opacity: isReduced ? 1 : 0,
              transform: isReduced ? "none" : "translateY(-15px)",
            }}
          >
            N {profile.coords.lat}° / E {profile.coords.lng}°
          </div>
          <div
            className="hero-info-row col-span-3 col-start-10 text-right"
            style={{
              opacity: isReduced ? 1 : 0,
              transform: isReduced ? "none" : "translateY(-15px)",
            }}
          >
            PORTFOLIO_V04 — 06.07.26
          </div>
        </div>

        {/* Main Name + Divider */}
        <div className="relative z-10 px-5 w-full">
          <h1
            className="font-display font-black leading-[0.82] tracking-[-0.06em] text-[13vw] uppercase"
          >
            {profile.nameLines.map((line, lineIdx) => {
              // We calculate a running character index offset
              let charOffset = 0;
              for (let j = 0; j < lineIdx; j++) {
                charOffset += profile.nameLines[j].length;
              }

              return (
                <div key={lineIdx} className="overflow-hidden block whitespace-nowrap">
                  {line.split("").map((letter, i) => {
                    return (
                      <div key={i} className="inline-block overflow-hidden">
                        <span
                          className="hero-letter inline-block origin-bottom"
                          style={{
                            fontStretch: "100%",
                            transform: isReduced ? "none" : "translateY(110%)",
                            opacity: isReduced ? 1 : 0,
                          }}
                        >
                          {letter}
                        </span>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </h1>
          <div
            className="hero-divider origin-left h-[2px] bg-white mt-4 w-full"
            style={{
              transform: isReduced ? "none" : "scaleX(0)",
              transformOrigin: "left center",
              opacity: isReduced ? 1 : 0,
            }}
          />
        </div>
      </div>

      {/* Bottom Part: role/description and metrics */}
      <div className="relative z-10 px-5 pb-20 pt-6 grid grid-cols-12 gap-5 bg-black">
        <div className="col-span-12 md:col-span-5 overflow-hidden">
          <p
            className="hero-tagline font-display text-base md:text-lg font-bold leading-tight uppercase text-white"
            style={{
              transform: isReduced ? "none" : "translateY(100%)",
              opacity: isReduced ? 1 : 0,
            }}
          >
            {profile.name} — {profile.tagline}{" "}
            <span className="text-[#ffff00]">Rank 1 of 6,200+</span> at HackNITR 7.0.
          </p>
        </div>

        <div className="col-span-12 md:col-span-7 md:col-start-6 grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            ["ROLE", "CSE Student"],
            ["INST", "JUET Guna"],
            ["YEAR", "3rd / B.Tech"],
            ["RANK", "01 / 6,200+"],
          ].map(([k, v]) => (
            <div
              key={k}
              className="hero-meta border-l-2 border-white pl-3"
              style={{
                transform: isReduced ? "none" : "translateY(20px)",
                opacity: isReduced ? 1 : 0,
              }}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">{k}</div>
              <div className="font-display font-black text-xl uppercase mt-1">{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="hero-scroll-indicator absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 z-30"
        style={{
          opacity: isReduced ? 1 : 0,
          transform: isReduced ? "none" : "translateY(10px)",
        }}
      >
        SCROLL ─── 01/04
      </div>
    </section>
  );
}