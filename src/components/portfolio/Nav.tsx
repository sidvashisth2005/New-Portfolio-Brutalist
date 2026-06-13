import { useEffect, useState } from "react";

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
    <header
      className="portfolio-nav fixed top-0 left-0 right-0 z-50 bg-black/80 border-b-2 border-white"
      style={{ transform: "translateY(-100%)" }}
    >
      <div className="flex items-center justify-between px-5 py-4">
        <a href="#top" className="font-mono text-xs uppercase tracking-[0.15em] text-white hover:text-[#ffff00] transition-colors">
          SIDDHANT.V
        </a>
        <nav className="hidden md:flex items-center gap-5 font-mono text-xs uppercase tracking-[0.15em] text-white">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="group flex items-baseline gap-1">
              <span className="text-white/30 group-hover:text-[#ffff00] transition-colors">{l.n}</span>
              <span className="group-hover:text-[#ffff00] transition-colors">{l.label}</span>
            </a>
          ))}
        </nav>
        <div className="font-mono text-xs uppercase tracking-[0.15em] text-white tabular-nums" suppressHydrationWarning>
          IST {time}
        </div>
      </div>
    </header>
  );
}