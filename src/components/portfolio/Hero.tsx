import { useRef } from "react";
import { motion } from "framer-motion";
import { SigilModel } from "./SigilModel";
import { StarField } from "./StarField";

const name = "SIDDHANT";
const EASE = [0.85, 0, 0.15, 1] as const;

export function Hero() {
  const coordsRef = useRef<HTMLDivElement>(null);

  return (
    <section id="top" className="relative min-h-screen flex flex-col overflow-hidden bg-black">
      {/* Diagonal slice reveal */}
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

      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Top Part: Contains Star background, top info, 3D model, name, and the divider line */}
      <div className="relative flex-1 flex flex-col justify-end overflow-hidden">
        {/* Star Field Canvas - starts at 54px from the top (below fixed header border) and covers the whole top block */}
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
          <div ref={coordsRef} className="col-span-3 col-start-7 select-none">N 24.6471° / E 77.3119°</div>
          <div className="col-span-3 col-start-10 text-right">PORTFOLIO_V04 — 06.07.26</div>
        </motion.div>

        {/* Main Name + Divider Line */}
        <div className="relative z-10 px-5 w-full">
          <h1 className="font-display font-black leading-[0.82] tracking-[-0.06em] text-[13vw] uppercase whitespace-nowrap">
            {name.split("").map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: "110%", scaleX: 0.5, opacity: 0 }}
                animate={{ y: 0, scaleX: 1, opacity: 1 }}
                transition={{
                  delay: 0.9 + i * 0.05,
                  duration: 0.6,
                  ease: EASE,
                }}
                className="inline-block origin-left"
                style={{ fontStretch: "100%" }}
              >
                {letter}
              </motion.span>
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
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, ease: EASE }}
            className="font-display text-base md:text-lg font-bold leading-tight uppercase"
          >
            Siddhant Vashisth — Computer Science Engineer & Social Architect. <span className="text-[#ffff00]">Rank 1 of 6,200+</span> at HackNITR 7.0.
          </motion.p>
        </div>

        <div className="col-span-12 md:col-span-7 md:col-start-6 grid grid-cols-2 md:grid-cols-4 gap-5">
          {[
            ["ROLE", "CSE Student"],
            ["INST", "JUET Guna"],
            ["YEAR", "3rd / B.Tech"],
            ["RANK", "01 / 6,200+"],
          ].map(([k, v], i) => (
            <motion.div
              key={k}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 + i * 0.08, ease: EASE }}
              className="border-l-2 border-white pl-3"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">{k}</div>
              <div className="font-display font-black text-xl uppercase mt-1">{v}</div>
            </motion.div>
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