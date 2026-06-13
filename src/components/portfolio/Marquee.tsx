import { motion } from "framer-motion";

export function Marquee() {
  const items = [
    "HACKNITR 7.0 — RANK 01",
    "6,200+ PARTICIPANTS",
    "30% USER GROWTH",
    "65% COST REDUCTION",
    "JUET GUNA",
    "CSE / 2026",
    "AVAILABLE FOR HIRE",
  ];
  const row = [...items, ...items, ...items];
  return (
    <motion.section
      initial={{ clipPath: "inset(50% 0 50% 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0% 0)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, ease: [0.85, 0, 0.15, 1] }}
      className="relative border-y-2 border-white py-4 overflow-hidden bg-[#ffff00] text-black"
    >
      <div className="flex gap-8 whitespace-nowrap animate-marquee w-max">
        {row.map((it, i) => (
          <span key={i} className="font-display text-2xl md:text-4xl font-black tracking-tight flex items-center gap-8 uppercase">
            {it}
            <span className="inline-block w-3 h-3 bg-black" />
          </span>
        ))}
      </div>
    </motion.section>
  );
}