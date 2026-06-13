import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.85, 0, 0.15, 1] as const;

export function SliceHeading({
  index,
  label,
  children,
}: {
  index: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="grid grid-cols-12 gap-5 mb-16">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE }}
        className="col-span-12 md:col-span-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 flex md:block items-center gap-3"
      >
        <span>{index}</span>
        <span className="h-px w-12 md:w-full md:mt-2 bg-white/30 inline-block" />
        <span className="md:block md:mt-2">{label}</span>
      </motion.div>

      <div className="col-span-12 md:col-span-9 overflow-hidden">
        <motion.h2
          initial={{ y: "100%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE }}
          className="font-display font-black tracking-[-0.05em] text-[9vw] sm:text-[8vw] md:text-[7vw] leading-[0.9] uppercase whitespace-normal break-words"
        >
          {children}
        </motion.h2>
      </div>
    </div>
  );
}