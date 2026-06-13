import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function StickyTicker({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["30%", "-130%"]);
  const items = Array.from({ length: 4 }, (_, i) => i);

  return (
    <div ref={ref} className="relative overflow-hidden border-y-2 border-white py-10 md:py-16 bg-black">
      <motion.div style={{ x }} className="flex gap-12 whitespace-nowrap will-change-transform">
        {items.map((i) => (
          <span
            key={i}
            className="font-display font-black uppercase tracking-[-0.04em] text-[12vw] leading-none flex items-center gap-12"
          >
            <span className={i % 2 === 0 ? "text-outline" : "text-white"}>{text}</span>
            <span className="text-[#ffff00]">✶</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}