import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Marquee } from "@/components/portfolio/Marquee";
import { About } from "@/components/portfolio/About";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Podcast } from "@/components/portfolio/Podcast";
import { Gallery } from "@/components/portfolio/Gallery";
import { Skills } from "@/components/portfolio/Skills";
import { Awards } from "@/components/portfolio/Awards";
import { Contact } from "@/components/portfolio/Contact";
import { Divider } from "@/components/portfolio/Divider";
import { StickyTicker } from "@/components/portfolio/StickyTicker";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { PageLoader } from "@/components/portfolio/PageLoader";
import { revealSection } from "@/lib/gsap-setup";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SIDDHANT VASHISTH — PORTFOLIO" },
      { name: "description", content: "BD strategist, builder, and hackathon champion — Rank 1 of 6,200+ at HackNITR 7.0. AgriTech, AR, and AI." },
      { property: "og:title", content: "SIDDHANT VASHISTH — PORTFOLIO" },
      { property: "og:description", content: "BD strategist, builder, and hackathon champion — Rank 1 of 6,200+ at HackNITR 7.0. AgriTech, AR, and AI." },
    ],
  }),
  component: Index,
});

function Index() {
  const [loaderComplete, setLoaderComplete] = useState(false);

  useEffect(() => {
    if (!loaderComplete) return;

    const sections = ["about", "experience", "projects", "podcast", "gallery", "skills", "awards", "contact"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        revealSection(el);
      }
    });

    // Refresh ScrollTrigger to ensure all positions are calculated correctly
    ScrollTrigger.refresh();
  }, [loaderComplete]);


  return (
    <main className="bg-black text-white">
      {!loaderComplete && <PageLoader onComplete={() => setLoaderComplete(true)} />}
      <ScrollProgress />
      <Nav />
      <Hero start={loaderComplete} />
      <Marquee />

      {/* 01 About */}
      <About />
      <Divider label="// 01—02" />

      {/* 02 Experience */}
      <Experience />
      <Divider label="// 02—03" invert />

      {/* 03 Projects */}
      <Projects />
      <Divider label="// 03—04" />

      {/* 04 Podcast */}
      <Podcast />
      <Divider label="// 04—05" invert />

      {/* 05 Gallery */}
      <Gallery />
      <Divider label="// 05—06" />

      <StickyTicker text="TECHNICAL & BUSINESS CORE" />

      {/* 06 Skills */}
      <Skills />
      <Divider label="// 06—07" invert />

      {/* 07 Awards */}
      <Awards />
      <Divider label="// 07—08" />

      {/* 08 Contact */}
      <Contact />
    </main>
  );
}