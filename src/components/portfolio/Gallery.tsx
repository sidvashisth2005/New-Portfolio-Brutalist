import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { useReducedMotion } from "@/lib/anime-utils";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Moment {
  id: number;
  category: string;
  caption: string;
  img: string;
}

const moments: Moment[] = [
  { id: 1, category: "HACKATHONS", caption: "My HackNITR trophy.", img: "https://images.unsplash.com/photo-1578269174936-2709b5a19083?w=800&auto=format&fit=crop&q=80" },
  { id: 2, category: "HACKATHONS", caption: "Discussing my project with the Vice Chancellor of my university.", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80" },
  { id: 3, category: "HACKATHONS", caption: "Facilitation ceremony of my HackNITR win.", img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80" },
  { id: 4, category: "HACKATHONS", caption: "My amazing teammates.", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80" },
  { id: 5, category: "HACKATHONS", caption: "Receiving the prize at NIT.", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80" },
  { id: 6, category: "HACKATHONS", caption: "Presenting my project at the NIT hackathon to the chairman.", img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80" },
  { id: 7, category: "HACKATHONS", caption: "Presenting my project at the NIT hackathon in front of the jury.", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80" },
  { id: 8, category: "HACKATHONS", caption: "Celebrating our win at NIT.", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80" },
  { id: 9, category: "HACKATHONS", caption: "Delivering a solo presentation at NIT.", img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80" },
  { id: 10, category: "HACKATHONS", caption: "My SIH team.", img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=80" },
  { id: 11, category: "HACKATHONS", caption: "SIH team group photo.", img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&auto=format&fit=crop&q=80" },
  { id: 12, category: "HACKATHONS", caption: "At Hacksagon IIITM.", img: "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?w=800&auto=format&fit=crop&q=80" },
  { id: 13, category: "HACKATHONS", caption: "Hacksagon IIITM experience.", img: "https://images.unsplash.com/photo-1552581230-c0152862c900?w=800&auto=format&fit=crop&q=80" },
  { id: 14, category: "CAMPUS & CONFERENCES", caption: "At JIIT Noida for a conference and counselling.", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80" },
  { id: 15, category: "FIELD TOURS", caption: "BIS tour to Guna, MP (1).", img: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&auto=format&fit=crop&q=80" },
  { id: 16, category: "FIELD TOURS", caption: "BIS tour to Guna, MP (2).", img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&auto=format&fit=crop&q=80" },
  { id: 17, category: "FIELD TOURS", caption: "BIS tour to Guna, MP (3).", img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80" },
  { id: 18, category: "FIELD TOURS", caption: "BIS tour to Guna, MP (4).", img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80" },
  { id: 19, category: "CAMPUS & CONFERENCES", caption: "My BVM experience.", img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop&q=80" },
  { id: 20, category: "CAMPUS & CONFERENCES", caption: "Receiving an award at the National Conference.", img: "https://images.unsplash.com/photo-1496469888073-80de7e9527c6?w=800&auto=format&fit=crop&q=80" },
  { id: 21, category: "CAMPUS & CONFERENCES", caption: "Meeting with other coordinators at the National Conference.", img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop&q=80" },
  { id: 22, category: "CAMPUS & CONFERENCES", caption: "Receiving my certificate in college.", img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80" },
  { id: 23, category: "CAMPUS & CONFERENCES", caption: "Me at Bhopal Vigyan Mela (BVM).", img: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=800&auto=format&fit=crop&q=80" },
  { id: 24, category: "CAMPUS & CONFERENCES", caption: "College ceremony in the auditorium.", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80" }
];

const categories = ["ALL", "HACKATHONS", "FIELD TOURS", "CAMPUS & CONFERENCES"];

export function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedMoment, setSelectedMoment] = useState<Moment | null>(null);
  const isReduced = useReducedMotion();

  // Filter moments
  const filteredMoments = moments.filter(
    (m) => selectedCategory === "ALL" || m.category === selectedCategory
  );

  // Stagger entry animation on active filter changes
  useEffect(() => {
    if (isReduced) return;
    anime({
      targets: ".gallery-card-wrap",
      opacity: [0, 1],
      scale: [0.96, 1],
      translateY: [15, 0],
      delay: anime.stagger(25, { start: 50 }),
      duration: 500,
      easing: "easeOutQuad",
    });
  }, [selectedCategory, isReduced]);

  // Body scroll lock on modal open
  useEffect(() => {
    if (selectedMoment) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedMoment]);

  // Keyboard navigation inside lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedMoment) return;
      if (e.key === "Escape") setSelectedMoment(null);
      if (e.key === "ArrowRight") navigateNext();
      if (e.key === "ArrowLeft") navigatePrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMoment, filteredMoments]);

  const navigatePrev = () => {
    if (!selectedMoment) return;
    const idx = filteredMoments.findIndex((m) => m.id === selectedMoment.id);
    const prevIdx = idx === 0 ? filteredMoments.length - 1 : idx - 1;
    setSelectedMoment(filteredMoments[prevIdx]);
  };

  const navigateNext = () => {
    if (!selectedMoment) return;
    const idx = filteredMoments.findIndex((m) => m.id === selectedMoment.id);
    const nextIdx = idx === filteredMoments.length - 1 ? 0 : idx + 1;
    setSelectedMoment(filteredMoments[nextIdx]);
  };

  // 3D Perspective Mouse-Tracking Tilt Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReduced) return;
    const card = e.currentTarget;
    card.classList.add("is-tilting");
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const xc = box.width / 2;
    const yc = box.height / 2;
    const dx = x - xc;
    const dy = y - yc;
    const rx = -(dy / yc) * 8; // Max 8 degrees X
    const ry = (dx / xc) * 8;  // Max 8 degrees Y
    card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReduced) return;
    const card = e.currentTarget;
    card.classList.remove("is-tilting");
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  };

  // Dynamic grid configuration for asymmetric editorial layout
  const getGridSpanClass = (index: number) => {
    const r = index % 6;
    if (r === 0) return "col-span-12 md:col-span-8 aspect-video"; // wide
    if (r === 2) return "col-span-12 sm:col-span-6 md:col-span-4 aspect-[3/4]"; // tall
    return "col-span-12 sm:col-span-6 md:col-span-4 aspect-square"; // normal square
  };

  return (
    <section id="gallery" className="relative px-5 py-32 bg-black">
      {/* Section divider line sweep */}
      <div
        className="section-border-line absolute top-0 left-0 right-0 h-[1px] bg-[#E8FF00] origin-left"
        style={{ transform: isReduced ? "none" : "scaleX(0)" }}
      />

      <div className="grid grid-cols-12 gap-5">
        {/* Left Column Label */}
        <div className="col-span-12 md:col-span-3">
          <div className="md:sticky md:top-24">
            <div className="section-label">
              <span className="section-label-index">(05)</span>
              <span className="section-label-text">ARCHIVES / GALLERY</span>
            </div>
          </div>
        </div>

        {/* Right Column Content */}
        <div className="col-span-12 md:col-span-9 space-y-8">
          <div>
            <h2 className="section-title font-display font-black text-[9vw] sm:text-[8vw] md:text-[7vw] tracking-[-0.05em] leading-[0.9] uppercase text-white">
              MOMENTS & <br />
              <span className="text-outline">ACHIEVEMENTS</span>
            </h2>
          </div>

          {/* Filter Tab buttons */}
          <div className="flex flex-wrap gap-2 py-4 font-mono text-[9px] sm:text-xs z-10 relative">
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedCategory(tab)}
                className={`px-4 py-2 border-2 border-white uppercase tracking-widest transition-all cursor-pointer rounded-none font-bold outline-none select-none ${
                  selectedCategory === tab
                    ? "bg-[#E8FF00] text-black border-[#E8FF00] translate-y-0.5 shadow-[2px_2px_0px_#fff]"
                    : "bg-black text-white hover:bg-white hover:text-black"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Asymmetric Collage Grid */}
          <div className="grid grid-cols-12 gap-5 pt-4">
            {filteredMoments.map((m, idx) => {
              const spanClass = getGridSpanClass(idx);
              return (
                <div
                  key={m.id}
                  className={`gallery-card-wrap ${spanClass} overflow-hidden`}
                  style={{ opacity: isReduced ? 1 : 0 }}
                >
                  <div
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => setSelectedMoment(m)}
                    className="w-full h-full border-2 border-white/10 hover:border-[#E8FF00] bg-[#0A0A0A] p-2 relative group cursor-pointer transition-all duration-300 ease-out origin-center flex flex-col justify-between overflow-hidden"
                  >
                    {/* Image Box */}
                    <div className="flex-grow w-full h-[80%] overflow-hidden relative border border-white/5">
                      <img
                        src={m.img}
                        alt={m.caption}
                        className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-[600ms] group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-[#E8FF00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>

                    {/* Bottom Label Badge */}
                    <div className="pt-3 flex justify-between items-center font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-white/50 group-hover:text-[#E8FF00] transition-colors select-none">
                      <span className="truncate pr-4 max-w-[70%]">
                        {m.caption}
                      </span>
                      <span className="text-[#E8FF00] font-bold">
                        [{String(m.id).padStart(2, "0")}]
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Lightbox Slide Modal Overlay */}
      {selectedMoment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-6 md:p-10 backdrop-blur-md">
          <div className="relative w-full max-w-5xl bg-black border-4 border-white p-6 sm:p-8 flex flex-col md:grid md:grid-cols-12 gap-8 text-white max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedMoment(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 border-2 border-white flex items-center justify-center font-mono font-bold bg-black text-[#E8FF00] hover:bg-[#E8FF00] hover:text-black transition-all cursor-pointer select-none"
            >
              ✕
            </button>

            {/* Left Column: Big Image & Arrows */}
            <div className="col-span-12 md:col-span-7 flex flex-col gap-4">
              <div className="relative aspect-video w-full border-2 border-white bg-[#0A0A0A] overflow-hidden flex items-center justify-center group">
                <img
                  src={selectedMoment.img}
                  alt={selectedMoment.caption}
                  className="w-full h-full object-cover transition-transform duration-500"
                />

                {/* Arrow buttons overlay */}
                <button
                  onClick={navigatePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 border-2 border-white bg-black/85 flex items-center justify-center font-mono text-xl text-white hover:bg-[#E8FF00] hover:text-black transition-all cursor-pointer select-none"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={navigateNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 border-2 border-white bg-black/85 flex items-center justify-center font-mono text-xl text-white hover:bg-[#E8FF00] hover:text-black transition-all cursor-pointer select-none"
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Thumbnails strip */}
              <div className="flex gap-2 overflow-x-auto py-2 border-t border-white/10 justify-center">
                {filteredMoments.map((m) => {
                  const isActive = m.id === selectedMoment.id;
                  return (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMoment(m)}
                      className={`w-16 h-12 flex-shrink-0 border bg-[#0A0A0A] overflow-hidden cursor-pointer transition-all ${
                        isActive
                          ? "border-2 border-[#E8FF00] scale-105 opacity-100"
                          : "border-white/30 opacity-50 hover:opacity-100 hover:border-white"
                      }`}
                    >
                      <img src={m.img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: details */}
            <div className="col-span-12 md:col-span-5 flex flex-col justify-between gap-6 relative overflow-hidden">
              <div className="space-y-4">
                {/* Huge backdrop index overlay */}
                <div className="absolute top-[-30px] right-[-10px] font-display font-black text-[10rem] tracking-tight text-white/[0.03] select-none leading-none z-0">
                  {String(selectedMoment.id).padStart(2, "0")}
                </div>

                <div className="relative z-10 space-y-4">
                  <div className="flex flex-wrap items-center gap-4">
                    <span className="font-mono text-xs text-[#E8FF00]">
                      ({String(selectedMoment.id).padStart(2, "0")}) // GALLERY RECORD
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-white/50 border border-white/20 px-2 py-0.5">
                      {selectedMoment.category}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-[-0.05em] text-white leading-tight border-b-2 border-white/20 pb-4">
                    MOMENT PROFILE
                  </h3>

                  <div className="font-mono pt-4 space-y-3">
                    <span className="text-[10px] uppercase text-[#E8FF00] tracking-widest block">
                      // RECORDED CAPTION
                    </span>
                    <p className="font-display text-sm sm:text-base text-white/80 leading-relaxed uppercase">
                      {selectedMoment.caption}
                    </p>
                  </div>
                </div>
              </div>

              {/* Close controls at bottom */}
              <button
                onClick={() => setSelectedMoment(null)}
                className="relative z-10 w-full border-2 border-white px-5 py-3 bg-[#E8FF00] text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-black hover:text-[#E8FF00] transition-colors cursor-pointer text-center"
              >
                CLOSE PREVIEW (ESC)
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
