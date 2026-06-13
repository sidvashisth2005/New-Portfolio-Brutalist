import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import anime from "animejs";
import { GUILLOTINE, useReducedMotion } from "@/lib/anime-utils";
import { profile } from "@/lib/content";
import { SigilModel } from "./SigilModel";
import { StarField } from "./StarField";

const EASE = [0.85, 0, 0.15, 1] as const;

export function Hero() {
  const coordsRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (isReduced) return;

    // 1. NAME LETTER REVEAL on mount
    anime({
      targets: ".hero-letter",
      translateY: ["110%", "0%"],
      scaleX: [0.5, 1],
      opacity: [0, 1],
      duration: 700,
      delay: anime.stagger(50, { start: 200 }),
      easing: GUILLOTINE,
    });

    // 2. TAGLINE CLIP-PATH WIPE on mount (after name, 600ms delay)
    anime({
      targets: ".hero-tagline",
      clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
      opacity: [0, 1],
      duration: 800,
      delay: 800,
      easing: GUILLOTINE,
    });

    // 3. META LINES (ROLE, INST, etc.) — slice-in from bottom
    anime({
      targets: ".hero-meta",
      translateY: ["20px", "0px"],
      opacity: [0, 1],
      duration: 500,
      delay: anime.stagger(80, { start: 1000 }),
      easing: GUILLOTINE,
    });
  }, [isReduced]);

  return (
    <section id="top" className="relative min-h-screen flex flex-col overflow-hidden bg-black">
      {/* Diagonal slice reveal */}
      {!isReduced && (
        <>
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: "-110%" }}
            transition={{ duration: 1.2, delay: 0.2, ease: EASE }}
            className="absolute inset-0 z-40 bg-[#ffff00]"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 15vw))" }}
          />
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: "110%" }}
            transition={{ duration: 1.2, delay: 0.4, ease: EASE }}
            className="absolute inset-0 z-30 bg-white"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 15vw))" }}
          />
        </>
      )}

      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Top Part: Contains Star background, top info, 3D model, name, and the divider line */}
      <div className="relative flex-1 flex flex-col justify-end overflow-hidden">
        {/* Star Field Canvas */}
        <div className="absolute inset-x-0 top-[54px] bottom-0 z-0 overflow-hidden">
          <StarField />
        </div>

        {/* 3D Model Floating Container */}
        <div className="absolute right-5 md:right-10 top-[calc(50%+27px)] -translate-y-1/2 w-[280px] h-[280px] md:w-[450px] md:h-[450px] z-20 pointer-events-auto">
          <SigilModel coordsRef={coordsRef} />
        </div>

        {/* Top crosshair info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="absolute top-20 left-5 right-5 grid grid-cols-12 gap-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 z-10"
        >
          <div className="col-span-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 bg-[#ffff00] animate-blink" />
            STATUS / ONLINE
          </div>
          <div ref={coordsRef} className="col-span-3 col-start-7 select-none">
            N {profile.coords.lat}° / E {profile.coords.lng}°
          </div>
          <div className="col-span-3 col-start-10 text-right">PORTFOLIO_V04 — 06.07.26</div>
        </motion.div>

        {/* Main Name + Divider Line */}
        <div className="relative z-10 px-5 w-full">
          <h1 className="font-display font-black leading-[0.82] tracking-[-0.06em] text-[13vw] uppercase">
            {profile.nameLines.map((line, lineIdx) => (
              <div key={lineIdx} className="overflow-hidden block whitespace-nowrap">
                {line.split("").map((letter, i) => (
                  <div key={i} className="inline-block overflow-hidden">
                    <span
                      className="hero-letter inline-block origin-left"
                      style={{
                        fontStretch: "100%",
                        transform: isReduced ? "none" : "translateY(110%) scaleX(0.5)",
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
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.4, duration: 0.8, ease: EASE }}
            className="origin-left h-[2px] bg-white mt-4"
          />
        </div>
      </div>

      {/* Bottom Part: Contains role/description and metrics */}
      <div className="relative z-10 px-5 pb-20 pt-6 grid grid-cols-12 gap-5 bg-black">
        <div className="col-span-12 md:col-span-5">
          <p
            className="hero-tagline font-display text-base md:text-lg font-bold leading-tight uppercase"
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
          ].map(([k, v], i) => (
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60 z-30"
      >
        SCROLL ─── 01/04
      </motion.div>
    </section>
  );
}