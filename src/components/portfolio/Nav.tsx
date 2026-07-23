import { useEffect, useState } from "react";
import { Logo } from "./Logo";

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
  const [activeSection, setActiveSection] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

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

  useEffect(() => {
    const sectionIds = links.map((l) => l.href.replace("#", ""));
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.25, rootMargin: "-54px 0px 0px 0px" }
      );
      observer.observe(el);
      return observer;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className="portfolio-nav fixed top-0 left-0 right-0 z-50 bg-black/80 border-b-2 border-white backdrop-blur-sm"
        style={{ transform: "translateY(-100%)" }}
      >
        <div className="flex items-center justify-between px-5 py-3.5">
          <Logo onClick={closeMenu} />

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-5 font-mono text-xs uppercase tracking-[0.15em] text-white">
            {links.map((l) => {
              const isActive = activeSection === l.href.replace("#", "");
              return (
                <a key={l.href} href={l.href} className="group flex items-baseline gap-1">
                  <span className={`transition-colors duration-200 ${isActive ? "text-[#ffff00]" : "text-white/30 group-hover:text-[#ffff00]"}`}>
                    {l.n}
                  </span>
                  <span className={`transition-colors duration-200 ${isActive ? "text-[#ffff00]" : "group-hover:text-[#ffff00]"}`}>
                    {l.label}
                  </span>
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block font-mono text-xs uppercase tracking-[0.15em] text-white tabular-nums" suppressHydrationWarning>
              IST {time}
            </div>

            {/* Hamburger button — mobile only */}
            <button
              onClick={() => setMenuOpen((prev) => !prev)}
              className="md:hidden flex flex-col justify-center items-center gap-[5px] w-8 h-8 cursor-pointer focus:outline-none"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <span
                className={`block h-[2px] bg-white transition-all duration-300 ${
                  menuOpen ? "w-6 rotate-45 translate-y-[7px]" : "w-6"
                }`}
              />
              <span
                className={`block h-[2px] bg-white transition-all duration-300 ${
                  menuOpen ? "w-0 opacity-0" : "w-4"
                }`}
              />
              <span
                className={`block h-[2px] bg-white transition-all duration-300 ${
                  menuOpen ? "w-6 -rotate-45 -translate-y-[7px]" : "w-6"
                }`}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black flex flex-col transition-all duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] md:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Top padding to clear the nav bar */}
        <div className="h-[54px] flex-shrink-0" />

        <nav className="flex-1 flex flex-col justify-center px-8 gap-1">
          {links.map((l, idx) => {
            const isActive = activeSection === l.href.replace("#", "");
            return (
              <a
                key={l.href}
                href={l.href}
                onClick={closeMenu}
                className={`group flex items-baseline gap-3 py-4 border-b border-white/10 transition-all duration-300 ${
                  menuOpen
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                }`}
                style={{
                  transitionDelay: menuOpen ? `${idx * 40 + 80}ms` : "0ms",
                }}
              >
                <span className={`font-mono text-xs ${isActive ? "text-[#ffff00]" : "text-white/30"}`}>
                  {l.n}
                </span>
                <span
                  className={`font-display font-black text-4xl uppercase tracking-[-0.04em] leading-none ${
                    isActive ? "text-[#ffff00]" : "text-white group-hover:text-[#ffff00]"
                  } transition-colors`}
                >
                  {l.label}
                </span>
              </a>
            );
          })}
        </nav>

        <div className="px-8 pb-10 font-mono text-[10px] uppercase tracking-[0.2em] text-white/30" suppressHydrationWarning>
          IST {time}
        </div>
      </div>
    </>
  );
}
