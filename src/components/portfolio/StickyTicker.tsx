export function StickyTicker() {
  const items = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="relative overflow-hidden border-y border-white/10 py-4 bg-black w-full select-none">
      <div className="flex gap-8 whitespace-nowrap animate-marquee-reverse w-max">
        {items.map((i) => (
          <span
            key={i}
            className="font-mono text-[13px] uppercase tracking-[0.15em] text-[#444444] select-none"
          >
            TECHNICAL & BUSINESS CORE ✶
          </span>
        ))}
      </div>
    </div>
  );
}