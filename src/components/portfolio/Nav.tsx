import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const EASE = [0.85, 0, 0.15, 1] as const;

const links = [
  { label: "About", href: "#about", n: "01" },
  { label: "Experience", href: "#experience", n: "02" },
  { label: "Projects", href: "#projects", n: "03" },
  { label: "Podcast", href: "#podcast", n: "04" },
  { label: "Gallery", href: "#gallery", n: "05" },
  { label: "Skills", href: "#skills", n: "06" },
  { label: "Awards", href: "#awards", n: "07" },
  { label: "Contact", href: "#contact", n: "08" },
];

export function Nav() {
  const [time, setTime] = useState("--:--:--");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-GB", {
          hour12: false,
          timeZone: "Asia/Kolkata",
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.1, duration: 0.8, ease: EASE }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 border-b-2 border-white"
    >
      <div className="flex items-center justify-between px-5 py-5">
        <a href="#top" className="font-mono text-[10px] uppercase tracking-[0.2em] text-white hover:text-[#ffff00] transition-colors">
          SIDDHANT.V
        </a>
        <nav className="hidden md:flex items-center gap-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="group flex items-baseline gap-1">
              <span className="text-white/30 group-hover:text-[#ffff00] transition-colors">{l.n}</span>
              <span className="group-hover:text-[#ffff00] transition-colors">{l.label}</span>
            </a>
          ))}
        </nav>
        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-white tabular-nums" suppressHydrationWarning>
          IST {time}
        </div>
      </div>
    </motion.header>
  );
}