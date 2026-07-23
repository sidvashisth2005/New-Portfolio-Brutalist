import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, lazy, Suspense } from "react";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { Marquee } from "@/components/portfolio/Marquee";
import { Divider } from "@/components/portfolio/Divider";
import { StickyTicker } from "@/components/portfolio/StickyTicker";
import { ScrollProgress } from "@/components/portfolio/ScrollProgress";
import { PageLoader } from "@/components/portfolio/PageLoader";
import { revealSection } from "@/lib/gsap-setup";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

// Lazy-load below-the-fold sections so initial page paint is instant
const About = lazy(() => import("@/components/portfolio/About").then((m) => ({ default: m.About })));
const Experience = lazy(() => import("@/components/portfolio/Experience").then((m) => ({ default: m.Experience })));
const Projects = lazy(() => import("@/components/portfolio/Projects").then((m) => ({ default: m.Projects })));
const Podcast = lazy(() => import("@/components/portfolio/Podcast").then((m) => ({ default: m.Podcast })));
const Gallery = lazy(() => import("@/components/portfolio/Gallery").then((m) => ({ default: m.Gallery })));
const Skills = lazy(() => import("@/components/portfolio/Skills").then((m) => ({ default: m.Skills })));
const Awards = lazy(() => import("@/components/portfolio/Awards").then((m) => ({ default: m.Awards })));
const Contact = lazy(() => import("@/components/portfolio/Contact").then((m) => ({ default: m.Contact })));

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
  const [mountedBelowTheFold, setMountedBelowTheFold] = useState(false);

  useEffect(() => {
    // Background idle load for below-the-fold components
    const timer = window.setTimeout(() => {
      setMountedBelowTheFold(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaderComplete || !mountedBelowTheFold) return;

    // Allow Suspense components to render DOM nodes before GSAP attaches
    const timer = setTimeout(() => {
      const sections = ["about", "experience", "projects", "podcast", "gallery", "skills", "awards", "contact"];
      sections.forEach((id) => {
        const el = document.getElementById(id);
        if (el) {
          revealSection(el);
        }
      });

      ScrollTrigger.refresh();
    }, 100);

    return () => clearTimeout(timer);
  }, [loaderComplete, mountedBelowTheFold]);

  return (
    <main className="bg-black text-white">
      {!loaderComplete && <PageLoader onComplete={() => setLoaderComplete(true)} />}
      <ScrollProgress />
      <Nav />
      <Hero start={loaderComplete} />
      <Marquee />

      {mountedBelowTheFold && (
        <Suspense fallback={<div className="min-h-[200px] bg-black" />}>
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
        </Suspense>
      )}
    </main>
  );
}