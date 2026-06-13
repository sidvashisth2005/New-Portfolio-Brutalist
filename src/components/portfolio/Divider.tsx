import { motion } from "framer-motion";

const EASE = [0.85, 0, 0.15, 1] as const;

export function Divider({ label = "//", invert = false }: { label?: string; invert?: boolean }) {
  return (
    <div className={`relative h-24 md:h-32 overflow-hidden border-y-2 border-white ${invert ? "bg-[#ffff00]" : "bg-black"}`}>
      {/* Sliding background block - covers 100% width to prevent contrast edge bugs */}
      <motion.div
        initial={{ x: "-100%" }}
        whileInView={{ x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: EASE }}
        className={`absolute inset-0 ${invert ? "bg-black" : "bg-[#ffff00]"}`}
      />
      
      {/* Text block with animated color matching the background transition */}
      <motion.div
        initial={{ color: invert ? "#000000" : "#ffffff" }}
        whileInView={{ color: invert ? "#ffffff" : "#000000" }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: EASE }}
        className={`relative z-10 h-full flex items-center justify-between px-5 font-mono text-[10px] uppercase tracking-[0.2em] gap-6 ${invert ? "text-black" : "text-white"}`}
      >
        <span className="shrink-0">{label}</span>
        <span className="font-display font-black text-xl md:text-3xl tracking-tight truncate">
          SCROLL → SCROLL → SCROLL → SCROLL
        </span>
        <span className="shrink-0">{label}</span>
      </motion.div>
    </div>
  );
}