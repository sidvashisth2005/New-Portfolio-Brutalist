import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { GUILLOTINE, useReducedMotion } from "@/lib/anime-utils";
import { galleryItems } from "@/lib/content";
import { X } from "lucide-react";

export function Gallery() {
  const [selectedItem, setSelectedItem] = useState<(typeof galleryItems)[0] | null>(null);
  const isReduced = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || isReduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Alternate direction stagger — odd from left, even from right
            galleryItems.forEach((_, i) => {
              const el = document.querySelector(`.gallery-card:nth-child(${i + 1})`);
              if (!el) return;
              anime({
                targets: el,
                translateX: [i % 2 === 0 ? -80 : 80, 0],
                translateY: [40, 0],
                scaleY: [0.85, 1],
                clipPath: ["inset(0 0 100% 0)", "inset(0 0 0% 0)"],
                opacity: [0, 1],
                duration: 900,
                delay: i * 130,
                easing: GUILLOTINE,
              });
            });

            observer.disconnect();
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [isReduced]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedItem]);

  const handleCardClick = (item: (typeof galleryItems)[0], elementId: string) => {
    const cardEl = document.getElementById(elementId);
    if (!cardEl) return;

    if (isReduced) {
      setSelectedItem(item);
      return;
    }

    // Flash + scale the card before opening
    anime({
      targets: cardEl,
      scale: [1, 1.03, 1],
      duration: 250,
      easing: "easeInOutSine",
    }).finished.then(() => {
      setSelectedItem(item);
      setTimeout(() => {
        if (overlayRef.current) {
          anime({
            targets: overlayRef.current,
            clipPath: ["inset(100% 0 0 0)", "inset(0% 0 0 0)"],
            opacity: [0, 1],
            duration: 600,
            easing: GUILLOTINE,
          });
        }
      }, 30);
    });
  };

  const closeModal = () => {
    if (!selectedItem) return;

    if (isReduced) {
      setSelectedItem(null);
      return;
    }

    if (overlayRef.current) {
      anime({
        targets: overlayRef.current,
        clipPath: ["inset(0% 0 0 0)", "inset(0% 0 100% 0)"],
        opacity: [1, 0],
        duration: 500,
        easing: GUILLOTINE,
        complete: () => setSelectedItem(null),
      });
    } else {
      setSelectedItem(null);
    }
  };

  return (
    <section id="gallery" ref={sectionRef} className="relative px-5 py-32 border-t-2 border-white bg-black">
      <div className="grid grid-cols-12 gap-5">
        {/* Left Column */}
        <div className="col-span-12 md:col-span-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ffff00] md:sticky md:top-20">
            (05) GALLERY / FIELD NOTES
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-12 md:col-span-9 space-y-0">
          {galleryItems.map((item, index) => {
            const elementId = `gallery-card-${item.id}`;
            const formattedIndex = String(item.id).padStart(2, "0");
            return (
              <div
                key={item.id}
                id={elementId}
                onClick={() => handleCardClick(item, elementId)}
                className="gallery-card group relative block border-2 border-white p-8 mb-0 -mt-[2px] first:mt-0 bg-black cursor-pointer overflow-hidden transition-all duration-300 hover:z-10"
                style={{
                  opacity: isReduced ? 1 : 0,
                  clipPath: isReduced ? "none" : "inset(0 0 100% 0)",
                }}
              >
                {/* Hover sliding bg */}
                <span className="absolute inset-0 bg-[#ffff00] translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] z-0 origin-left" />

                {/* Card Top Row */}
                <div className="relative z-10 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[#ffff00] group-hover:text-black transition-colors duration-300">
                  <span>({formattedIndex})</span>
                  <span className="text-white/40 group-hover:text-black/60">{item.meta}</span>
                </div>

                {/* Card Title */}
                <h3 className="relative z-10 font-display font-black text-2xl md:text-4xl tracking-[-0.06em] uppercase text-white group-hover:text-black transition-colors duration-300 mt-3 leading-none">
                  {item.title}
                </h3>

                {/* Expandable Description */}
                <div className="relative z-10 max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 transition-all duration-500 ease-[cubic-bezier(0.85,0,0.15,1)] overflow-hidden">
                  <p className="font-mono text-xs md:text-sm uppercase tracking-wide text-white/70 group-hover:text-black/80 mt-4 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox / Full-screen Overlay */}
      {selectedItem && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4 md:p-8"
          style={{ opacity: isReduced ? 1 : 0, clipPath: isReduced ? "none" : "inset(100% 0 0 0)" }}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-5 right-5 z-50 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-[#ffff00] transition-colors"
          >
            <X size={14} /> CLOSE (ESC)
          </button>

          {/* Modal Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full max-w-7xl max-h-[85vh] border-2 border-white bg-black relative">

            {/* Left Column */}
            <div className="p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-[-5vw] left-[-2vw] font-display font-black text-[20vw] tracking-[-0.06em] text-white/5 select-none leading-none z-0">
                {String(selectedItem.id).padStart(2, "0")}
              </div>

              <div className="relative z-10 flex flex-col gap-6 h-full justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ffff00]">
                    MOMENT DETAILS
                  </span>
                  <h2 className="font-display font-black text-3xl md:text-5xl tracking-[-0.06em] uppercase text-white mt-2 leading-none">
                    {selectedItem.title}
                  </h2>
                </div>

                {/* Showcase image */}
                <div className="relative border-2 border-white aspect-video flex items-center justify-center overflow-hidden bg-white/5 group">
                  {selectedItem.img ? (
                    <img
                      src={selectedItem.img}
                      alt={selectedItem.title}
                      className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  ) : (
                    <span className="font-mono text-[10px] text-white/30">[ PHOTO COMING SOON ]</span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="border-t-2 md:border-t-0 md:border-l-2 border-white p-8 md:p-12 flex flex-col justify-between bg-black">
              <div className="space-y-6">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ffff00]">SCOPE / CONTEXT</div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-white/50 mt-1">{selectedItem.meta}</div>
                </div>

                <div className="border-t border-white/20 pt-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ffff00] mb-3">MANIFEST</div>
                  <p className="font-display text-sm md:text-base text-white/70 leading-relaxed uppercase">
                    {selectedItem.description}
                  </p>
                </div>
              </div>

              {/* Carousel Placeholder */}
              <div className="border-t border-white/20 pt-6 mt-6">
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 mb-3">ADDITIONAL RECORDS</div>
                <div className="flex gap-4">
                  {[...Array(3)].map((_, idx) => (
                    <div key={idx} className="border border-white/20 w-24 h-16 flex items-center justify-center font-mono text-[8px] text-white/30 uppercase bg-white/5">
                      RECORD {idx + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
