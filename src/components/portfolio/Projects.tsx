import { useEffect, useRef, useState } from "react";
import gsap from "gsap/dist/gsap";
import { useReducedMotion } from "@/lib/anime-utils";
import { projects } from "@/lib/content";

const PROJECT_CARD_IMAGES: Record<string, string[]> = {
  "01": [
    "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=600&auto=format&fit=crop&q=80", // farm/pasture
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80", // electronics
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=80", // dashboard
  ],
  "02": [
    "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=600&auto=format&fit=crop&q=80", // VR/AR headset/phone
    "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=600&auto=format&fit=crop&q=80", // travel
    "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=600&auto=format&fit=crop&q=80", // city map
  ],
  "03": [
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&auto=format&fit=crop&q=80", // travel concept
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&auto=format&fit=crop&q=80", // landscape
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80", // hotel
  ],
  "04": [
    "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80", // grocery store
    "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&auto=format&fit=crop&q=80", // consulting meeting
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80", // charts
  ],
};

const PROJECT_DETAILS: Record<
  string,
  {
    story: string[];
    linkedin: {
      postText: string;
      likes: number;
      comments: number;
      reposts: number;
    };
  }
> = {
  "01": {
    story: [
      "Livestock health monitoring in rural India is historically reactive, often leading to sudden economic devastation for farmers when a single animal falls sick undetected. To address this, we engineered a dual-component IoT solution: combining low-cost GPS/accelerometer collars on the animals with an autonomous NodeMCU search-and-rescue rover.",
      "By applying predictive health algorithms to continuously monitored data—such as body temperature, movement patterns, and heart rate—the system detects early onset disease indicators days before physical symptoms manifest.",
      "Beyond technical engineering, we developed a comprehensive business GTM strategy targeting rural cooperative banks and micro-insurance segments. By benchmarking global competitors, our solution reduces traditional monitoring costs by approximately 65% (from Rs. 2-3 Lakhs down to Rs. 60,000), presenting a compelling ROI case for farmers."
    ],
    linkedin: {
      postText: `🚀 Securing RANK 1 at HackNITR 7.0 was an incredible milestone, but the journey behind our Livestock Monitoring System (LMS) is what truly drove us.

Rural farmers often lose their entire livelihoods when cattle fall sick unexpectedly. We set out to build a hardware-plus-software product that solves this at its core.

💡 What we built:
• A multi-sensor IoT wearable tracking cattle temperature, activity, and vitals.
• An autonomous search-and-rescue Rover to locate lost or distressed livestock.
• A cloud-based dashboard with predictive health analytics for early disease detection.

📉 BizDev & Strategy:
Through rigorous market research, we designed a GTM strategy that benchmarked CAGR and competitor pricing, cutting traditional monitoring costs by 65% (down to Rs. 60,000 from Rs. 2-3 Lakhs).

Huge thanks to my team and the judges for validating our vision! 

#AgriTech #IoT #Innovation #HackNITR #ProductDesign #BusinessStrategy`,
      likes: 342,
      comments: 24,
      reposts: 8,
    },
  },
  "02": {
    story: [
      "Traditional tourism and social sharing lack spatial context—we capture photos, but they live isolated on screen. Around You bridges this gap by merging augmented reality with real-world locations, turning physical spaces into shared digital canvases.",
      "Using Google ARCore and Map Tiles API, the application enables users to drop persistent 3D anchors (memory cards, media notes, or visitor reviews) in precise geographic coordinates. Firebase handles real-time database synchronization so multiple users can interact with the same AR objects simultaneously.",
      "We analyzed user behavior data and mapped current social gaps to pitch the product's market viability, highlighting high-potential adoption loops for campus tours and historical heritage sites."
    ],
    linkedin: {
      postText: `Imagine walking through a historical monument and seeing digital notes, photos, and stories left behind by friends floating in mid-air. 🌍✨

I’m excited to share Around You—a next-gen AR social media and tourism application!

📲 Key Features:
• Persistent AR Anchors: Drop geo-tagged 3D memory cards in real-world spots using Google ARCore.
• Real-Time Database: Synced coordinates and media sharing powered by Firebase.
• Dynamic Map Navigation: Map Tiles API integration for exploring digital footprints.

By conducting competitive analysis and segment mapping, we identified a massive first-to-market gap in localized AR tourism, building a pitch centered around viral adoption loops.

Check out our repository below! 👇

#ARCore #AugmentedReality #Flutter #Firebase #TourismTech #SocialMedia`,
      likes: 218,
      comments: 15,
      reposts: 4,
    },
  },
  "03": {
    story: [
      "Planning a vacation is notorious for decision fatigue, requiring users to jump between dozens of tabs to compare reviews, itineraries, and budgets. TravelGo was designed to consolidate this fragmented process into a single, AI-driven experience.",
      "By integrating Hugging Face's language models, TravelGo accepts natural query commands (e.g., 'a relaxed 3-day family trip to Himachal within a 15k budget') and outputs a complete travel plan. We integrated TripAdvisor APIs to dynamically match user requests with real-time hotel ratings and local attractions.",
      "The result is a unified interface that balances budget constraints with travel preferences, transforming complex planning logic into a simple, single-click itinerary."
    ],
    linkedin: {
      postText: `Trip planning is broken. Between hotel bookings, restaurant reviews, and itinerary planning, we average 10+ tabs and hours of decision fatigue. 🤯

To solve this, I built TravelGo—an AI-powered Travel Strategy Platform that consolidates the entire workflow.

🤖 How it works:
• Natural Language Input: Tell the AI your budget, duration, and vibe.
• TripAdvisor API Integration: Instantly retrieves rated hotels, restaurants, and attractions.
• Hugging Face Model: Generates a custom, structured itinerary in seconds.

By focusing on a seamless user experience, we mapped the competitive landscape to build a unified planning engine.

#ArtificialIntelligence #HuggingFace #TripAdvisor #Python #TravelTech #ProductManagement`,
      likes: 198,
      comments: 9,
      reposts: 2,
    },
  },
  "04": {
    story: [
      "Faced with declining footfall and pressure from large retail chains, a local superstore was struggling to retain its core customer base. Rather than offering generic marketing advice, we undertook a data-driven business development audit.",
      "We analyzed transaction histories across three product categories and interviewed over 50 local shoppers to construct segment profile maps. The research revealed critical gaps in shelf organization, bundle packaging, and localized Google Maps listing accuracy.",
      "Our recommendations included high-margin product bundling (combos), targeted seasonal flyers, and local search optimization. The client implemented all suggested strategies, leading to a 25% increase in weekly footfall and a measurable sales lift."
    ],
    linkedin: {
      postText: `Can local brick-and-mortar stores compete with e-commerce giants? Yes—if they use data. 📊

I recently completed a growth consulting project for a local superstore facing low customer footfall and declining sales.

🔍 My Approach:
• Customer Segment Mapping: Interviewed local shoppers to identify shopping triggers.
• Sales Pattern Analysis: Audited transaction histories across 3+ product categories.
• Competitor Benchmarking: Mapped pricing and visual merchandising of local supermarkets.

💡 The Outcome:
Proposed three main recommendations: localized product bundling, optimized shelf placements, and a digital localization footprint. The client implemented these, resulting in a 25%+ increase in customer footfall and a dramatic revenue uplift!

#BusinessStrategy #ManagementConsulting #MarketResearch #RetailGrowth #DataAnalytics`,
      likes: 284,
      comments: 31,
      reposts: 12,
    },
  },
};

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [activeImageIdx, setActiveImageIdx] = useState<number>(0);

  const previewContainerRef = useRef<HTMLDivElement>(null);
  const lastWheelTimeRef = useRef<number>(0);

  useEffect(() => {
    const nav = document.querySelector(".portfolio-nav") as HTMLElement;

    if (selectedProject) {
      document.body.style.overflow = "hidden";
      if (nav) {
        nav.style.display = "none";
      }
    } else {
      document.body.style.overflow = "";
      if (nav) {
        nav.style.display = "";
      }
    }

    return () => {
      document.body.style.overflow = "";
      if (nav) {
        nav.style.display = "";
      }
    };
  }, [selectedProject]);

  useEffect(() => {
    const container = previewContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastWheelTimeRef.current < 250) {
        return;
      }
      if (Math.abs(e.deltaY) < 10) {
        return;
      }
      lastWheelTimeRef.current = now;

      if (e.deltaY > 0) {
        setActiveImageIdx((prev) => (prev === 2 ? 0 : prev + 1));
      } else if (e.deltaY < 0) {
        setActiveImageIdx((prev) => (prev === 0 ? 2 : prev - 1));
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      container.removeEventListener("wheel", handleWheel);
    };
  }, [selectedProject]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openProjectModal = (project: typeof projects[0], imgIdx: number) => {
    setSelectedProject(project);
    setActiveImageIdx(imgIdx);
  };

  useEffect(() => {
    if (typeof window === "undefined" || isReduced) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Horizontal scrolling timeline
      const horizontalTween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${track.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
        },
      });

      // Individual slide title entrances via containerAnimation
      const slides = track.querySelectorAll(".project-slide");
      slides.forEach((slide, idx) => {
        const title = slide.querySelector(".project-title");
        if (title) {
          if (idx === 0) {
            // For the first (intro) slide, animate immediately upon section reveal
            gsap.fromTo(
              title,
              { clipPath: "inset(0 100% 0 0)" },
              {
                clipPath: "inset(0 0% 0 0)",
                duration: 0.6,
                ease: "power3.out",
                delay: 0.2,
              }
            );
          } else {
            gsap.fromTo(
              title,
              { clipPath: "inset(0 100% 0 0)" },
              {
                clipPath: "inset(0 0% 0 0)",
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: slide,
                  containerAnimation: horizontalTween,
                  start: "left 85%",
                  toggleActions: "play none none none",
                },
              }
            );
          }
        }
      });
    }, section);

    return () => ctx.revert();
  }, [isReduced]);

  if (isReduced) {
    // Accessible fallback: stacked vertically
    return (
      <section id="projects" className="relative px-5 py-32 bg-black">
        <div className="section-border-line absolute top-0 left-0 right-0 h-[1px] bg-[#E8FF00]" />
        <div className="max-w-7xl mx-auto space-y-24">
          <div className="overflow-hidden mb-16">
            <h2 className="font-display font-black text-[9vw] sm:text-[8vw] md:text-[7vw] tracking-[-0.05em] leading-[0.9] uppercase text-white">
              FEATURED <br /> <span className="text-outline">PROJECTS</span>
            </h2>
          </div>
          
          <div className="space-y-16">
            {projects.map((p) => (
              <div
                key={p.index}
                className="grid grid-cols-12 gap-8 border-b border-white/10 pb-12 items-center"
              >
                <div className="col-span-12 md:col-span-6 md:col-start-2 flex flex-col gap-6">
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-xs text-[#E8FF00]">({p.index})</span>
                    <span className="font-mono text-xs text-white/50">{p.tags.join(" / ")}</span>
                  </div>
                  <h3
                    className="font-display font-bold text-3xl md:text-5xl uppercase text-white leading-none cursor-pointer hover:text-[#E8FF00] transition-colors"
                    onClick={() => openProjectModal(p, 0)}
                  >
                    {p.title}
                  </h3>
                  <ul className="space-y-3">
                    {p.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-[#E8FF00] mt-[8px] flex-shrink-0" />
                        <span className="font-display text-xs md:text-sm text-white/70 ml-3 uppercase font-bold">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap items-center gap-6 mt-4">
                    {p.github && (
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs uppercase tracking-wider text-[#E8FF00] hover:text-white transition-colors"
                      >
                        VIEW ON GITHUB &rarr;
                      </a>
                    )}
                    <button
                      onClick={() => openProjectModal(p, 0)}
                      className="font-mono text-xs uppercase tracking-wider text-white hover:text-[#E8FF00] transition-colors bg-transparent border-none outline-none cursor-pointer"
                    >
                      EXPLORE PROJECT &rarr;
                    </button>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-4 flex justify-center md:justify-center mt-8 md:mt-0">
                  <div className="w-[160px] h-[230px] sm:w-[190px] sm:h-[270px] md:w-[210px] md:h-[300px] relative group cursor-pointer">
                    {/* Card 1 (Bottom) */}
                    <div
                      onClick={() => openProjectModal(p, 0)}
                      className="absolute inset-0 bg-[#0A0A0A] border border-white sm:border-2 p-1 sm:p-1.5 shadow-2xl transition-all duration-500 ease-out origin-bottom rotate-[-12deg] -translate-x-4 sm:-translate-x-6 translate-y-1.5 sm:translate-y-2 z-10 group-hover:rotate-[-24deg] group-hover:-translate-x-8 sm:group-hover:-translate-x-12 group-hover:-translate-y-2 group-hover:border-[#E8FF00] overflow-hidden"
                    >
                      <img
                        src={PROJECT_CARD_IMAGES[p.index]?.[0]}
                        alt={`${p.title} preview 1`}
                        className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500"
                        loading="lazy"
                      />
                    </div>

                    {/* Card 2 (Middle) */}
                    <div
                      onClick={() => openProjectModal(p, 1)}
                      className="absolute inset-0 bg-[#0A0A0A] border border-white sm:border-2 p-1 sm:p-1.5 shadow-2xl transition-all duration-500 ease-out origin-bottom rotate-0 translate-y-0 z-20 group-hover:-translate-y-4 sm:group-hover:-translate-y-6 group-hover:scale-105 group-hover:border-[#E8FF00] overflow-hidden"
                    >
                      <img
                        src={PROJECT_CARD_IMAGES[p.index]?.[1]}
                        alt={`${p.title} preview 2`}
                        className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500"
                        loading="lazy"
                      />
                    </div>

                    {/* Card 3 (Top) */}
                    <div
                      onClick={() => openProjectModal(p, 2)}
                      className="absolute inset-0 bg-[#0A0A0A] border border-white sm:border-2 p-1 sm:p-1.5 shadow-2xl transition-all duration-500 ease-out origin-bottom rotate-[12deg] translate-x-4 sm:translate-x-6 translate-y-1.5 sm:translate-y-2 z-30 group-hover:rotate-[24deg] group-hover:translate-x-8 sm:group-hover:translate-x-12 group-hover:-translate-y-2 group-hover:border-[#E8FF00] overflow-hidden"
                    >
                      <img
                        src={PROJECT_CARD_IMAGES[p.index]?.[2]}
                        alt={`${p.title} preview 3`}
                        className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full h-screen bg-black overflow-hidden projects-section"
    >
      {/* Top Border Line Sweep */}
      <div
        className="section-border-line absolute top-0 left-0 right-0 h-[1px] bg-[#E8FF00] origin-left z-20"
        style={{ transform: "scaleX(0)" }}
      />

      <div
        ref={trackRef}
        className="projects-track reveal-block flex h-full items-center select-none"
        style={{ width: `${(projects.length + 1) * 100}vw`, opacity: 0 }}
      >
        {/* Intro Slide: Title & Section Label */}
        <div className="project-slide w-screen h-full flex-shrink-0 flex items-center justify-center relative px-6 md:px-24 bg-black border-r border-white/10">
          <div className="grid grid-cols-12 gap-5 w-full max-w-7xl mx-auto items-center">
            {/* Left Column */}
            <div className="col-span-12 md:col-span-3">
              <div className="section-label">
                <span className="section-label-index">(03)</span>
                <span className="section-label-text">VENTURES / PROJECTS</span>
              </div>
            </div>
            {/* Right Column */}
            <div className="col-span-12 md:col-span-9 overflow-hidden">
              <h2 className="section-title project-title font-display font-black text-[9vw] sm:text-[8vw] md:text-[7vw] tracking-[-0.05em] leading-[0.9] uppercase text-white">
                FEATURED <br />
                <span className="text-outline">PROJECTS</span>
              </h2>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#E8FF00] mt-8 flex items-center gap-2">
                <span>SCROLL TO EXPLORE</span>
                <span className="animate-pulse">→</span>
              </p>
            </div>
          </div>
        </div>

        {projects.map((p) => (
          <div
            key={p.index}
            className="project-slide project-card w-screen h-full flex-shrink-0 flex items-center justify-center relative px-6 md:px-24 bg-black border-r border-white/10"
          >
            {/* Top-Left Project Number */}
            <div className="absolute top-24 left-12 font-mono text-[14px] text-[#E8FF00] tracking-wider transition-all duration-300 hover:text-white hover:scale-105 origin-left inline-block cursor-pointer select-none">
              ({p.index})
            </div>

            {/* Top-Right Tech Stack Tags */}
            <div className="absolute top-24 right-12 font-mono text-xs text-white/50 tracking-wider select-none">
              {p.tags.join(" / ")}
            </div>

            {/* Content Container Grid */}
            <div className="grid grid-cols-12 gap-8 w-full max-w-7xl mx-auto items-center">
              {/* Left Half: Details */}
              <div className="col-span-12 md:col-span-6 md:col-start-2 flex flex-col justify-center gap-6 text-left pl-4 md:pl-0">
                <h3
                  className="project-title font-display font-bold text-[clamp(2.2rem,6.5vw,72px)] tracking-[-0.05em] uppercase text-white leading-[0.95] mb-2 select-none cursor-pointer hover:text-[#E8FF00] transition-colors"
                  style={{ clipPath: "inset(0 100% 0 0)" }}
                  onClick={() => openProjectModal(p, 0)}
                >
                  {p.title}
                </h3>
                <ul className="space-y-4 max-w-xl">
                  {p.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="w-1.5 h-1.5 bg-[#E8FF00] mt-[8px] flex-shrink-0" />
                      <span className="font-display text-[13px] md:text-[14px] text-white/70 leading-relaxed ml-4 uppercase">
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap items-center gap-6 mt-4">
                  {p.github ? (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[#E8FF00] select-none"
                    >
                      <span>VIEW ON GITHUB &rarr;</span>
                      <span className="absolute left-0 bottom-[-4px] h-[1.5px] w-full bg-[#E8FF00] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                    </a>
                  ) : (
                    <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/30 select-none">
                      PROPRIETARY PROJECT
                    </div>
                  )}
                  <button
                    onClick={() => openProjectModal(p, 0)}
                    className="group relative inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white hover:text-[#E8FF00] transition-colors select-none bg-transparent border-none outline-none cursor-pointer"
                  >
                    <span>EXPLORE PROJECT &rarr;</span>
                    <span className="absolute left-0 bottom-[-4px] h-[1.5px] w-full bg-[#E8FF00] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                  </button>
                </div>
              </div>

              <div className="col-span-12 md:col-span-4 flex justify-center md:justify-center mt-8 md:mt-0">
                <div className="w-[160px] h-[230px] sm:w-[190px] sm:h-[270px] md:w-[210px] md:h-[300px] relative group cursor-pointer">
                  {/* Card 1 (Bottom) */}
                  <div
                    onClick={() => openProjectModal(p, 0)}
                    className="absolute inset-0 bg-[#0A0A0A] border border-white sm:border-2 p-1 sm:p-1.5 shadow-2xl transition-all duration-500 ease-out origin-bottom rotate-[-12deg] -translate-x-4 sm:-translate-x-6 translate-y-1.5 sm:translate-y-2 z-10 group-hover:rotate-[-24deg] group-hover:-translate-x-8 sm:group-hover:-translate-x-12 group-hover:-translate-y-2 group-hover:border-[#E8FF00] overflow-hidden"
                  >
                    <img
                      src={PROJECT_CARD_IMAGES[p.index]?.[0]}
                      alt={`${p.title} preview 1`}
                      className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Card 2 (Middle) */}
                  <div
                    onClick={() => openProjectModal(p, 1)}
                    className="absolute inset-0 bg-[#0A0A0A] border border-white sm:border-2 p-1 sm:p-1.5 shadow-2xl transition-all duration-500 ease-out origin-bottom rotate-0 translate-y-0 z-20 group-hover:-translate-y-4 sm:group-hover:-translate-y-6 group-hover:scale-105 group-hover:border-[#E8FF00] overflow-hidden"
                  >
                    <img
                      src={PROJECT_CARD_IMAGES[p.index]?.[1]}
                      alt={`${p.title} preview 2`}
                      className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Card 3 (Top) */}
                  <div
                    onClick={() => openProjectModal(p, 2)}
                    className="absolute inset-0 bg-[#0A0A0A] border border-white sm:border-2 p-1 sm:p-1.5 shadow-2xl transition-all duration-500 ease-out origin-bottom rotate-[12deg] translate-x-4 sm:translate-x-6 translate-y-1.5 sm:translate-y-2 z-30 group-hover:rotate-[24deg] group-hover:translate-x-8 sm:group-hover:translate-x-12 group-hover:-translate-y-2 group-hover:border-[#E8FF00] overflow-hidden"
                  >
                    <img
                      src={PROJECT_CARD_IMAGES[p.index]?.[2]}
                      alt={`${p.title} preview 3`}
                      className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-500"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>      {/* Brutalist Detail Modal Overlay */}
      {selectedProject && (
        <div data-lenis-prevent className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 sm:p-6 md:p-10 backdrop-blur-md">
          <div className="relative w-full max-w-6xl bg-black border-4 border-white p-6 sm:p-8 md:p-10 flex flex-col md:grid md:grid-cols-12 gap-8 text-white max-h-[92vh] overflow-hidden shadow-[8px_8px_0px_#E8FF00]">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 border-2 border-white flex items-center justify-center font-mono font-bold bg-black text-[#E8FF00] hover:bg-[#E8FF00] hover:text-black transition-all cursor-pointer select-none"
            >
              ✕
            </button>

            {/* Left Column: Image Viewer */}
            <div className="col-span-12 md:col-span-6 flex flex-col gap-4 self-start">
              <div
                ref={previewContainerRef}
                className="relative aspect-[4/3] w-full border-2 border-white bg-[#0A0A0A] overflow-hidden flex items-center justify-center group"
              >
                <img
                  key={activeImageIdx}
                  src={PROJECT_CARD_IMAGES[selectedProject.index]?.[activeImageIdx]}
                  alt={`${selectedProject.title} screenshot detail`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 animate-swirl-in"
                />
                
                {/* Navigation Arrows */}
                <button
                  onClick={() => setActiveImageIdx((prev) => (prev === 0 ? 2 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 border-2 border-white bg-black/85 flex items-center justify-center font-mono text-xl text-white hover:bg-[#E8FF00] hover:text-black transition-all cursor-pointer select-none"
                >
                  ◀
                </button>
                <button
                  onClick={() => setActiveImageIdx((prev) => (prev === 2 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 border-2 border-white bg-black/85 flex items-center justify-center font-mono text-xl text-white hover:bg-[#E8FF00] hover:text-black transition-all cursor-pointer select-none"
                >
                  ▶
                </button>
              </div>

              {/* Thumbnails row */}
              <div className="flex justify-center gap-3 mt-2">
                {[0, 1, 2].map((idx) => {
                  const imgUrl = PROJECT_CARD_IMAGES[selectedProject.index]?.[idx];
                  const isActive = idx === activeImageIdx;
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`relative w-20 aspect-[4/3] border bg-[#0A0A0A] overflow-hidden cursor-pointer transition-all ${
                        isActive
                          ? "border-2 border-[#E8FF00] scale-105 opacity-100"
                          : "border-white/40 opacity-60 hover:opacity-100 hover:border-white"
                      }`}
                    >
                      <img src={imgUrl} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Case Details */}
            <div data-lenis-prevent className="col-span-12 md:col-span-6 flex flex-col gap-6 overflow-y-auto max-h-[78vh] pr-2 scrollbar-thin scrollbar-thumb-white/25">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="font-mono text-xs text-[#E8FF00]">
                    ({selectedProject.index}) // CASE STUDY
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-white/50 border border-white/20 px-2 py-0.5">
                    {selectedProject.category}
                  </span>
                </div>

                <h4 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-[-0.05em] text-white leading-tight">
                  {selectedProject.title}
                </h4>

                <div className="flex flex-wrap gap-2 pt-2 border-b-2 border-white/20 pb-4">
                  {selectedProject.tags.map((t) => (
                    <span key={t} className="font-mono text-[10px] uppercase tracking-wider bg-[#111] border border-white/10 px-2 py-1 text-white/60">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Narrative Story */}
                <div className="space-y-3 pt-2">
                  <h5 className="font-mono text-xs text-[#E8FF00] uppercase tracking-widest">// THE NARRATIVE</h5>
                  {PROJECT_DETAILS[selectedProject.index]?.story.map((para, idx) => (
                    <p key={idx} className="font-display text-xs sm:text-sm text-white/80 leading-relaxed uppercase">
                      {para}
                    </p>
                  ))}
                </div>

                {/* LinkedIn announcement card */}
                {PROJECT_DETAILS[selectedProject.index] && (
                  <div className="mt-8 border-2 border-white/20 bg-[#0B0B0C] p-4 sm:p-5 text-left text-white/90">
                    {/* Profile row */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 border border-white flex items-center justify-center font-mono font-bold bg-[#E8FF00] text-black text-xs select-none flex-shrink-0">
                        SV
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1">
                          <span className="font-sans font-bold text-sm text-white hover:text-[#E8FF00] cursor-pointer">
                            Siddhant Vashisth
                          </span>
                          <span className="font-sans text-xs text-white/40">• 1st</span>
                        </div>
                        <p className="font-sans text-[11px] text-white/60 truncate leading-tight">
                          BizDev & Product Leader | 2x Hackathon Winner | IoT AgriTech
                        </p>
                        <p className="font-sans text-[10px] text-white/40 flex items-center gap-1">
                          <span>1w • Edited</span>
                          <span>•</span>
                          <span>🌐</span>
                        </p>
                      </div>
                    </div>

                    {/* Post Content */}
                    <p className="font-sans text-[13px] text-white/90 whitespace-pre-line leading-relaxed mt-4">
                      {PROJECT_DETAILS[selectedProject.index].linkedin.postText}
                    </p>

                    {/* Footer engagement metrics */}
                    <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/40">
                      <span className="flex items-center gap-1 hover:text-[#E8FF00] cursor-pointer">
                        👍 💖 👏 {PROJECT_DETAILS[selectedProject.index].linkedin.likes}
                      </span>
                      <span>
                        {PROJECT_DETAILS[selectedProject.index].linkedin.comments} comments • {PROJECT_DETAILS[selectedProject.index].linkedin.reposts} reposts
                      </span>
                    </div>

                    {/* Quick Action row */}
                    <div className="mt-2 pt-2 border-t border-white/10 grid grid-cols-4 gap-1 text-center font-sans text-[11px] text-white/60 font-bold select-none">
                      <button className="py-2 hover:bg-white/5 hover:text-white rounded flex items-center justify-center gap-1.5 cursor-pointer">
                        <span>👍</span> <span>Like</span>
                      </button>
                      <button className="py-2 hover:bg-white/5 hover:text-white rounded flex items-center justify-center gap-1.5 cursor-pointer">
                        <span>💬</span> <span>Comment</span>
                      </button>
                      <button className="py-2 hover:bg-white/5 hover:text-white rounded flex items-center justify-center gap-1.5 cursor-pointer">
                        <span>🔁</span> <span>Repost</span>
                      </button>
                      <button className="py-2 hover:bg-white/5 hover:text-white rounded flex items-center justify-center gap-1.5 cursor-pointer">
                        <span>✉️</span> <span>Send</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Achievements bullets */}
                <div className="pt-6 space-y-3">
                  <h5 className="font-mono text-xs text-[#E8FF00] uppercase tracking-widest">// KEY ACHIEVEMENTS</h5>
                  <ul className="space-y-3">
                    {selectedProject.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-[#E8FF00] mt-[8px] flex-shrink-0" />
                        <span className="font-display text-[13px] text-white/70 leading-relaxed ml-4 uppercase">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-white/10 mt-auto">
                {selectedProject.github ? (
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 border-2 border-white px-5 py-3 bg-[#E8FF00] text-black font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-black hover:text-[#E8FF00] transition-colors cursor-pointer text-center font-bold"
                  >
                    VIEW CODE ON GITHUB &rarr;
                  </a>
                ) : (
                  <div className="flex-1 flex items-center justify-center border-2 border-white/20 px-5 py-3 bg-[#111]/30 text-white/30 font-mono text-[11px] uppercase tracking-widest text-center">
                    PROPRIETARY CASE DATA
                  </div>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="flex-1 border-2 border-white px-5 py-3 bg-black text-white font-mono text-[11px] font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors cursor-pointer text-center font-bold"
                >
                  CLOSE PREVIEW
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
