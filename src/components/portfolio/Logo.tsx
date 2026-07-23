import { useState } from "react";

export function Logo({ onClick }: { onClick?: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href="#top"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group flex items-center gap-3 select-none"
      title="SIDDHANT VASHISTH — PORTFOLIO"
    >
      {/* Smart SV Monogram Icon Badge */}
      <div className="relative flex items-center justify-center w-8 h-8 bg-black border-2 border-white group-hover:border-[#E8FF00] group-hover:bg-[#E8FF00] transition-all duration-300 shadow-[2px_2px_0px_#FFFFFF] group-hover:shadow-[2px_2px_0px_#E8FF00] group-hover:-translate-y-0.5">
        <svg
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 transition-colors duration-300"
        >
          {/* S Geometric Path */}
          <path
            d="M 20 8 H 9 V 15 H 23 V 23 H 10"
            stroke={isHovered ? "#000000" : "#FFFFFF"}
            strokeWidth="2.8"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
          {/* V Accent Diagonal Stroke */}
          <path
            d="M 14 17 L 18 24 L 24 13"
            stroke={isHovered ? "#000000" : "#E8FF00"}
            strokeWidth="2.5"
            strokeLinecap="square"
          />
        </svg>

        {/* Live status dot */}
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#E8FF00] border border-black group-hover:bg-black group-hover:border-[#E8FF00] transition-colors" />
      </div>

      {/* Brand Name & Tagline */}
      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 font-mono text-xs font-black uppercase tracking-[0.18em] text-white group-hover:text-[#E8FF00] transition-colors leading-none">
          <span>SIDDHANT.V</span>
        </div>
        <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/40 group-hover:text-white/70 transition-colors mt-1 leading-none">
          BUILDER // STRATEGIST
        </div>
      </div>
    </a>
  );
}
