import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { GUILLOTINE, useReducedMotion } from "@/lib/anime-utils";
import { profile } from "@/lib/content";
import { SigilModel } from "./SigilModel";
import { StarField } from "./StarField";

export function Hero() {
  const coordsRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const isReduced = useReducedMotion();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isReduced) {
      setLoaded(true);
      return;
    }

    // --- PHASE 1: Scanline sweep across the hero ---
    anime({
      targets: ".hero-scanline",
      translateY: ["-100%", "120%"],
      opacity: [0, 0.7, 0],
      duration: 800,
      delay: 150,
      easing: "easeInOutQuart",
    });

    // --- PHASE 2: Overlay SLAM wipes (yellow from top, white from bottom) ---
    anime({
      targets: ".hero-overlay-yellow",
      translateY: ["0%", "-110%"],
      duration: 1100,
      delay: 200,
      easing: GUILLOTINE,
    });
    anime({
      targets: ".hero-overlay-white",
      translateY: ["0%", "110%"],
      duration: 1100,
      delay: 350,
      easing: GUILLOTINE,
      complete: () => setLoaded(true),
    });

    // --- PHASE 3: NAME — massive letter throw from below + skew ---
    anime({
      targets: ".hero-letter",
      translateY: ["200%", "0%"],
      rotateZ: [-8, 0],
      scaleY: [1.4, 1],
      opacity: [0, 1],
      duration: 900,
      delay: anime.stagger(40, { start: 700 }),
      easing: GUILLOTINE,
    });

    // --- PHASE 4: Tagline clip-path wipe from left ---
    anime({
      targets: ".hero-tagline",
      clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
      opacity: [0, 1],
      duration: 1000,
      delay: 1400,
      easing: GUILLOTINE,
    });

    // --- PHASE 6: Meta cards slam up with stagger ---
    anime({
      targets: ".hero-meta",
      translateY: ["80px", "0px"],
      scaleX: [0.8, 1],
      skewX: [10, 0],
      opacity: [0, 1],
      duration: 700,
      delay: anime.stagger(100, { start: 1500 }),
      easing: GUILLOTINE,
    });

    // --- PHASE 7: Divider line grows from left ---
    anime({
      targets: ".hero-divider",
      scaleX: [0, 1],
      duration: 1200,
      delay: 1600,
      easing: GUILLOTINE,
      transformOrigin: "left center",
    });

    // --- PHASE 8: Top info row fades in ---
    anime({
      targets: ".hero-info-row",
      opacity: [0, 1],
      translateY: [-15, 0],
      duration: 600,
      delay: anime.stagger(80, { start: 800 }),
      easing: GUILLOTINE,
    });
  }, [isReduced]);

  return (
    <section id="top" className="relative min-h-screen flex flex-col overflow-hidden bg-black">

      {/* Scanline sweep — dramatic cinematic flash */}
      {!isReduced && (
        <div
          className="hero-scanline absolute inset-x-0 h-[3px] bg-[#ffff00] z-50 pointer-events-none opacity-0"
          style={{ top: 0 }}
        />
      )}

      {/* Overlay panels — split curtain */}
      {!isReduced && (
        <>
          <div
            className="hero-overlay-yellow absolute inset-0 z-40 bg-[#ffff00]"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 15vw))",
            }}
          />
          <div
            className="hero-overlay-white absolute inset-0 z-30 bg-white"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 15vw))",
            }}
          />
        </>
      )}

      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Top Part */}
      <div className="relative flex-1 flex flex-col justify-end overflow-hidden">
        {/* Star Field */}
        <div className="absolute inset-x-0 top-[54px] bottom-0 z-0 overflow-hidden">
          <StarField />
        </div>

        {/* 3D Model */}
        <div className="absolute right-5 md:right-10 top-[calc(50%+27px)] -translate-y-1/2 w-[280px] h-[280px] md:w-[450px] md:h-[450px] z-20 pointer-events-auto">
          <SigilModel coordsRef={coordsRef} />
        </div>

        {/* Top crosshair info */}
        <div className="absolute top-20 left-5 right-5 grid grid-cols-12 gap-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 z-10">
          <div className="hero-info-row col-span-3 flex items-center gap-2" style={{ opacity: isReduced ? 1 : 0 }}>
            <span className="h-1.5 w-1.5 bg-[#ffff00] animate-blink" />
            STATUS / ONLINE
          </div>
          <div
            ref={coordsRef}
            className="hero-info-row col-span-3 col-start-7 select-none"
            style={{ opacity: isReduced ? 1 : 0 }}
          >
            N {profile.coords.lat}° / E {profile.coords.lng}°
          </div>
          <div
            className="hero-info-row col-span-3 col-start-10 text-right"
            style={{ opacity: isReduced ? 1 : 0 }}
          >
            PORTFOLIO_V04 — 06.07.26
          </div>
        </div>

        {/* Main Name + Divider */}
        <div className="relative z-10 px-5 w-full">
          <h1
            ref={nameRef}
            className="font-display font-black leading-[0.82] tracking-[-0.06em] text-[13vw] uppercase"
          >
            {profile.nameLines.map((line, lineIdx) => (
              <div key={lineIdx} className="overflow-hidden block whitespace-nowrap">
                {line.split("").map((letter, i) => (
                  <div key={i} className="inline-block overflow-hidden">
                    <span
                      className="hero-letter inline-block origin-bottom"
                      style={{
                        fontStretch: "100%",
                        transform: isReduced ? "none" : "translateY(200%) rotateZ(-8deg)",
                        opacity: isReduced ? 1 : 0,
                      }}
                    >
                      {letter}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </h1>
          <div
            className="hero-divider origin-left h-[2px] bg-white mt-4 w-full"
            style={{ transform: isReduced ? "none" : "scaleX(0)" }}
          />
        </div>
      </div>

      {/* Bottom Part: role/description and metrics */}
      <div className="relative z-10 px-5 pb-20 pt-6 grid grid-cols-12 gap-5 bg-black">
        <div className="col-span-12 md:col-span-5">
          <p
            className="hero-tagline font-display text-base md:text-lg font-bold leading-tight uppercase text-white"
            style={{
              clipPath: isReduced ? "none" : "inset(0 100% 0 0)",
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
                transform: isReduced ? "none" : "translateY(80px) scaleX(0.8) skewX(10deg)",
                opacity: isReduced ? 1 : 0,
              }}
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">{k}</div>
              <div className="font-display font-black text-xl uppercase mt-1">{v}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 z-30">
        SCROLL ─── 01/04
      </div>
    </section>
  );
}