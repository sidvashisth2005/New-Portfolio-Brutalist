import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { GUILLOTINE, useReducedMotion } from "@/lib/anime-utils";
import { X } from "lucide-react";

const moments = [
  { id: 1, caption: "My HackNITR trophy.", img: "https://images.unsplash.com/photo-1578269174936-2709b5a19083?w=800&auto=format&fit=crop&q=80" },
  { id: 2, caption: "Discussing my project with the Vice Chancellor of my university.", img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80" },
  { id: 3, caption: "Facilitation ceremony of my HackNITR win.", img: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80" },
  { id: 4, caption: "My amazing teammates.", img: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80" },
  { id: 5, caption: "Receiving the prize at NIT.", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=80" },
  { id: 6, caption: "Presenting my project at the NIT hackathon to the chairman.", img: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80" },
  { id: 7, caption: "Presenting my project at the NIT hackathon in front of the jury.", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80" },
  { id: 8, caption: "Celebrating our win at NIT.", img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80" },
  { id: 9, caption: "Delivering a solo presentation at NIT.", img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80" },
  { id: 10, caption: "My SIH team.", img: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=80" },
  { id: 11, caption: "SIH team group photo.", img: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=800&auto=format&fit=crop&q=80" },
  { id: 12, caption: "At Hacksagon IIITM.", img: "https://images.unsplash.com/photo-1531497865144-0464ef8fb9a9?w=800&auto=format&fit=crop&q=80" },
  { id: 13, caption: "Hacksagon IIITM experience.", img: "https://images.unsplash.com/photo-1552581230-c0152862c900?w=800&auto=format&fit=crop&q=80" },
  { id: 14, caption: "At JIIT Noida for a conference and counselling.", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80" },
  { id: 15, caption: "BIS tour to Guna, MP (1).", img: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&auto=format&fit=crop&q=80" },
  { id: 16, caption: "BIS tour to Guna, MP (2).", img: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&auto=format&fit=crop&q=80" },
  { id: 17, caption: "BIS tour to Guna, MP (3).", img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&auto=format&fit=crop&q=80" },
  { id: 18, caption: "BIS tour to Guna, MP (4).", img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&auto=format&fit=crop&q=80" },
  { id: 19, caption: "My BVM experience.", img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop&q=80" },
  { id: 20, caption: "Receiving an award at the National Conference.", img: "https://images.unsplash.com/photo-1496469888073-80de7e9527c6?w=800&auto=format&fit=crop&q=80" },
  { id: 21, caption: "Meeting with other coordinators at the National Conference.", img: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&auto=format&fit=crop&q=80" },
  { id: 22, caption: "Receiving my certificate in college.", img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&auto=format&fit=crop&q=80" },
  { id: 23, caption: "Me at Bhopal Vigyan Mela (BVM).", img: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=800&auto=format&fit=crop&q=80" },
  { id: 24, caption: "College ceremony in the auditorium.", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80" }
];

export function Gallery() {
  const [selectedMoment, setSelectedMoment] = useState<typeof moments[0] | null>(null);
  const isReduced = useReducedMotion();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedMoment]);

  const handlePhotoClick = (item: typeof moments[0]) => {
    if (isReduced) {
      setSelectedMoment(item);
      return;
    }

    setSelectedMoment(item);
    setTimeout(() => {
      if (overlayRef.current) {
        anime({
          targets: overlayRef.current,
          clipPath: ["inset(100% 0 0 0)", "inset(0% 0 0 0)"],
          opacity: [0, 1],
          duration: 500,
          easing: GUILLOTINE,
        });
      }
    }, 30);
  };

  const closeModal = () => {
    if (!selectedMoment) return;

    if (isReduced) {
      setSelectedMoment(null);
      return;
    }

    if (overlayRef.current) {
      anime({
        targets: overlayRef.current,
        clipPath: ["inset(0% 0 0 0)", "inset(0% 0 100% 0)"],
        opacity: [1, 0],
        duration: 400,
        easing: GUILLOTINE,
        complete: () => setSelectedMoment(null),
      });
    } else {
      setSelectedMoment(null);
    }
  };

  // We duplicate the array to create a seamless infinite scroll loop
  const duplicateMoments = [...moments, ...moments];

  // Get 3 other unique random moments for the "Additional Records" section in the modal
  const additionalMoments = selectedMoment
    ? moments.filter((m) => m.id !== selectedMoment.id).slice(0, 3)
    : [];

  return (
    <section id="gallery" className="relative px-5 py-32 bg-black overflow-hidden">
      {/* Step 1 — Section divider line sweep */}
      <div
        className="section-border-line absolute top-0 left-0 right-0 h-[1px] bg-[#E8FF00] origin-left"
        style={{ transform: isReduced ? "none" : "scaleX(0)" }}
      />

      <div className="grid grid-cols-12 gap-5">
        {/* Left Column */}
        <div className="col-span-12 md:col-span-3">
          <div className="overflow-hidden md:sticky md:top-20">
            <div
              className="section-label font-mono text-[10px] uppercase tracking-[0.2em] text-[#E8FF00]"
              style={{ transform: isReduced ? "none" : "translateY(100%)" }}
            >
              <span>(05) </span>
              <span>GALLERY / FIELD NOTES</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-12 md:col-span-9 space-y-8">
          <div className="overflow-hidden">
            <h2 className="section-title font-display font-black text-[9vw] sm:text-[8vw] md:text-[4vw] tracking-[-0.06em] uppercase leading-none text-white">
              MOMENTS & <br />
              <span className="text-outline">ACHIEVEMENTS</span>
            </h2>
          </div>

          {/* Infinite Horizontal Marquee Track */}
          <div
            className="reveal-block relative w-full overflow-hidden py-4 border-y-2 border-white bg-black select-none"
            style={{ opacity: isReduced ? 1 : 0 }}
          >
            <div
              className={`flex gap-6 w-max whitespace-nowrap ${isReduced ? "" : "animate-marquee hover:[animation-play-state:paused]"}`}
              style={{ animationDuration: "90s" }}
            >
              {duplicateMoments.map((m, idx) => (
                <div
                  key={idx}
                  onClick={() => handlePhotoClick(m)}
                  className="inline-block w-[300px] border-2 border-white bg-black flex-shrink-0 cursor-pointer group hover:border-[#E8FF00] transition-colors duration-300"
                >
                  {/* Photo Area */}
                  <div className="h-[220px] w-full border-b-2 border-white overflow-hidden bg-white/5 relative">
                    <img
                      src={m.img}
                      alt={m.caption}
                      className="h-full w-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                      loading="eager"
                    />
                    {/* Hover tint overlay */}
                    <div className="absolute inset-0 bg-[#E8FF00]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </div>

                  {/* Caption Area */}
                  <div className="p-4 h-[90px] flex flex-col justify-between font-mono text-[9px] uppercase tracking-wider text-white group-hover:text-[#E8FF00] transition-colors duration-300 select-none whitespace-normal leading-relaxed">
                    <div>
                      <span className="text-[#E8FF00] mr-1 group-hover:text-white transition-colors">
                        [{m.id.toString().padStart(2, "0")}]
                      </span>
                      {m.caption}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Full-screen Overlay */}
      {selectedMoment && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-50 bg-black flex items-center justify-center p-4 md:p-8"
          style={{ opacity: isReduced ? 1 : 0, clipPath: isReduced ? "none" : "inset(100% 0 0 0)" }}
        >
          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-5 right-5 z-50 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-white/50 hover:text-[#E8FF00] transition-colors"
          >
            <X size={14} /> CLOSE (ESC)
          </button>

          {/* Modal Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 w-full h-full max-w-7xl max-h-[85vh] border-2 border-white bg-black relative">
            {/* Left Column: Title & Image Frame */}
            <div className="p-8 md:p-12 flex flex-col justify-between relative overflow-hidden">
              {/* Giant absolute index backdrop */}
              <div className="absolute top-[-5vw] left-[-2vw] font-display font-black text-[20vw] tracking-[-0.06em] text-white/5 select-none leading-none z-0">
                {String(selectedMoment.id).padStart(2, "0")}
              </div>

              <div className="relative z-10 flex flex-col gap-6 h-full justify-between">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E8FF00]">
                    MOMENT DETAILS
                  </span>
                  <h2 className="font-display font-black text-3xl md:text-5xl tracking-[-0.06em] uppercase text-white mt-2 leading-none">
                    MOMENT #{selectedMoment.id.toString().padStart(2, "0")}
                  </h2>
                </div>

                {/* Showcase image */}
                <div className="relative border-2 border-white aspect-video flex items-center justify-center overflow-hidden bg-white/5 group">
                  <img
                    src={selectedMoment.img}
                    alt={selectedMoment.caption}
                    className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Full Info */}
            <div className="border-t-2 md:border-t-0 md:border-l-2 border-white p-8 md:p-12 flex flex-col justify-between bg-black">
              <div className="space-y-6">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E8FF00]">
                    SCOPE / CONTEXT
                  </div>
                  <div className="font-mono text-[11px] uppercase tracking-wider text-white/50 mt-1">
                    RECORD / GALLERY
                  </div>
                </div>

                <div className="border-t border-white/20 pt-6">
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E8FF00] mb-3">
                    MANIFEST
                  </div>
                  <p className="font-display text-sm md:text-base text-white/70 leading-relaxed uppercase">
                    {selectedMoment.caption}
                  </p>
                </div>
              </div>

              {/* Carousel Additional Records */}
              <div className="border-t border-white/20 pt-6 mt-6">
                <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 mb-3">
                  ADDITIONAL RECORDS
                </div>
                <div className="flex gap-4">
                  {additionalMoments.map((m) => (
                    <div
                      key={m.id}
                      onClick={() => setSelectedMoment(m)}
                      className="border border-white/20 hover:border-[#E8FF00] w-24 h-16 flex items-center justify-center overflow-hidden bg-white/5 cursor-pointer transition-colors duration-300"
                      title={m.caption}
                    >
                      <img
                        src={m.img}
                        alt={m.caption}
                        className="w-full h-full object-cover filter grayscale hover:grayscale-0"
                      />
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
