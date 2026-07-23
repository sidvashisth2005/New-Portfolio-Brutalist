import { useEffect, useRef } from "react";
import gsap from "gsap/dist/gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
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

    // Step 1 — headline: character slide up
    tl.to(
      ".hero-letter",
      {
        y: "0%",
        duration: 0.6,
        stagger: 0.015,
        ease: "power3.out",
      },
      0
    );

    // Step 2 — Subtitle line
    tl.to(
      ".hero-tagline",
      {
        y: "0%",
        duration: 0.5,
        ease: "power3.out",
      },
      0.15
    );

    // Step 3 — Meta grid cards
    tl.to(
      ".hero-meta",
      {
        y: 0,
        duration: 0.5,
        stagger: 0.04,
        ease: "power3.out",
      },
      0.25
    );

    // Step 4 — Stat counters
    const statsElements = document.querySelectorAll(".stat-value");
    statsElements.forEach((el) => {
      const targetVal = parseInt(el.getAttribute("data-target") || "0", 10);
      const suffix = el.getAttribute("data-suffix") || "";
      const obj = { val: 0 };

      tl.to(
        obj,
        {
          val: targetVal,
          duration: 1.2,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toLocaleString() + suffix;
          },
        },
        0.3
      );
    });

    // Step 5 — Nav bar
    tl.to(
      ".portfolio-nav",
      {
        y: "0%",
        duration: 0.4,
        ease: "power2.out",
      },
      0.1
    );

    tl.to(
      ".hero-divider",
      {
        scaleX: 1,
        duration: 0.6,
        ease: "power3.out",
      },
      0.2
    );

    tl.to(
      ".hero-info-row",
      {
        y: 0,
        duration: 0.4,
        stagger: 0.03,
        ease: "power3.out",
      },
      0.25
    );

    tl.to(
      ".hero-model-container",
      {
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
      },
      0.3
    );

    tl.to(
      ".hero-scroll-indicator",
      {
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      },
      0.5
    );

    // Scroll-driven parallax
    gsap.to(".hero-name-wrapper", {
      y: -120,
      ease: "none",
      scrollTrigger: {
        trigger: "#top",
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    gsap.to(".hero-model-container", {
      y: -180,
      ease: "none",
      scrollTrigger: {
        trigger: "#top",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    gsap.to(".hero-bottom", {
      opacity: 0,
      y: -60,
      ease: "none",
      scrollTrigger: {
        trigger: "#top",
        start: "15% top",
        end: "65% top",
        scrub: 1,
      },
    });

    gsap.to(".hero-info-row", {
      opacity: 0,
      y: -30,
      ease: "none",
      scrollTrigger: {
        trigger: "#top",
        start: "5% top",
        end: "40% top",
        scrub: 1,
      },
    });

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

        {/* 3D Model — Centered on mobile, Right-aligned on desktop */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[32%] -translate-y-1/2 md:translate-y-0 md:top-auto md:translate-x-0 md:left-auto md:right-4 lg:right-8 xl:right-12 md:top-[calc(50%+15px)] md:-translate-y-1/2 w-[210px] h-[210px] xs:w-[240px] xs:h-[240px] sm:w-[280px] sm:h-[280px] md:w-[360px] md:h-[360px] lg:w-[420px] lg:h-[420px] z-10 pointer-events-auto">
          <div
            className="hero-model-container w-full h-full"
            style={{
              transform: isReduced ? "none" : "scale(0.85)",
            }}
          >
            <SigilModel coordsRef={coordsRef} />
          </div>
        </div>

        {/* Top crosshair info — simplified on mobile */}
        <div className="absolute top-20 left-5 right-5 z-10">
          {/* Mobile: single row with status only */}
          <div className="flex items-center justify-between md:hidden font-mono text-[9px] uppercase tracking-[0.2em] text-white/60">
            <div
              className="hero-info-row flex items-center gap-2"
              style={{
                transform: isReduced ? "none" : "translateY(-15px)",
              }}
            >
              <span className="h-1.5 w-1.5 bg-[#ffff00] animate-blink" />
              STATUS / ONLINE
            </div>
            <div
              className="hero-info-row"
              style={{
                transform: isReduced ? "none" : "translateY(-15px)",
              }}
            >
              PORTFOLIO_V04
            </div>
          </div>

          {/* Desktop: original 3-column grid */}
          <div className="hidden md:grid grid-cols-12 gap-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">
            <div
              className="hero-info-row col-span-3 flex items-center gap-2"
              style={{
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
                transform: isReduced ? "none" : "translateY(-15px)",
              }}
            >
              N {profile.coords.lat}° / E {profile.coords.lng}°
            </div>
            <div
              className="hero-info-row col-span-3 col-start-10 text-right"
              style={{
                transform: isReduced ? "none" : "translateY(-15px)",
              }}
            >
              PORTFOLIO_V04 — 06.07.26
            </div>
          </div>
        </div>

        {/* Main Name + Divider */}
        <div className="hero-name-wrapper relative z-20 px-5 w-full">
          <h1
            className="font-display font-black leading-[0.82] tracking-[-0.06em] text-[16vw] sm:text-[14vw] md:text-[13vw] uppercase"
          >
            {profile.nameLines.map((line, lineIdx) => {
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
            className="hero-divider origin-left h-[2px] bg-white mt-3 md:mt-4 w-full"
            style={{
              transform: isReduced ? "none" : "scaleX(0)",
              transformOrigin: "left center",
            }}
          />
        </div>
      </div>

      {/* Bottom Part: role/description and metrics */}
      <div className="hero-bottom relative z-10 px-5 pb-14 md:pb-20 pt-5 md:pt-6 grid grid-cols-12 gap-4 md:gap-5 bg-black">
        <div className="col-span-12 md:col-span-5 overflow-hidden">
          <p
            className="hero-tagline font-display text-sm md:text-base lg:text-lg font-bold leading-tight uppercase text-white"
            style={{
              transform: isReduced ? "none" : "translateY(100%)",
            }}
          >
            {profile.name} — {profile.tagline}{" "}
            <span className="text-[#ffff00]">Rank 1 of 6,200+</span> at HackNITR 7.0.
          </p>
        </div>

        <div className="col-span-12 md:col-span-7 md:col-start-6 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mt-4 md:mt-0">
          {[
            ["ROLE", "CSE Student"],
            ["INST", "JUET Guna"],
            ["YEAR", "3rd / B.Tech"],
            ["RANK", "01 / 6,200+"],
          ].map(([k, v]) => (
            <div
              key={k}
              className="hero-meta border-l-2 border-white pl-2 md:pl-3"
              style={{
                transform: isReduced ? "none" : "translateY(20px)",
              }}
            >
              <div className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/50">{k}</div>
              <div className="font-display font-black text-lg md:text-xl uppercase mt-0.5 md:mt-1">{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="hero-scroll-indicator absolute bottom-4 md:bottom-5 left-5 font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-white/60 z-30"
        style={{
          transform: isReduced ? "none" : "translateY(10px)",
        }}
      >
        SCROLL ─── 01/04
      </div>
    </section>
  );
}
