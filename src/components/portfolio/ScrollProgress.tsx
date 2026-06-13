import { motion, useScroll, useSpring, useTransform } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  const pct = useTransform(scrollYProgress, (v) =>
    `${Math.round(v * 100).toString().padStart(2, "0")}%`
  );

  return (
    <>
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-[#ffff00] z-[60] origin-left"
      />
      <motion.div className="fixed bottom-5 right-5 z-[55] font-mono text-[10px] uppercase tracking-[0.2em] text-white mix-blend-difference flex items-center gap-2 pointer-events-none">
        <span className="h-1.5 w-1.5 bg-[#ffff00]" />
        <motion.span className="tabular-nums">{pct}</motion.span>
        <span>/ SCROLLED</span>
      </motion.div>
    </>
  );
}