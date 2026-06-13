import gsap from "gsap/dist/gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Lenis from "lenis";

export function initAnimationStack() {
  if (typeof window === "undefined") return;

  // Register all plugins
  gsap.registerPlugin(ScrollTrigger);

  // Configure ScrollTrigger defaults
  ScrollTrigger.defaults({
    scroller: document.body,
  });

  // Initialize Lenis smooth scroll
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  // Sync Lenis with GSAP ticker
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  // Expose them globally if needed for debugging or direct use
  (window as any).gsap = gsap;
  (window as any).ScrollTrigger = ScrollTrigger;
  (window as any).lenis = lenis;

  return { gsap, ScrollTrigger, lenis };
}

export function revealSection(sectionEl: HTMLElement) {
  if (typeof window === "undefined") return;

  // Reduced motion check (respect standard and URL param bypass)
  const params = new URLSearchParams(window.location.search);
  const forceAnimate = params.get("animate") === "true" || params.get("force") === "true";
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced && !forceAnimate) {
    return;
  }

  // Create timeline for this section
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionEl,
      start: "top 90%", // Trigger earlier when section is 10% inside the viewport
      toggleActions: "play none none none",
      once: true,
    },
  });

  // Step 1: Section divider line sweep
  const line = sectionEl.querySelector(".section-border-line");
  if (line) {
    tl.fromTo(
      line,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.4,
        ease: "power2.inOut",
        transformOrigin: "left center",
      },
      0
    );
  }

  // Step 2: Section number + label
  const label = sectionEl.querySelector(".section-label");
  if (label) {
    tl.fromTo(
      label,
      { y: "100%" },
      {
        y: "0%",
        duration: 0.4,
        ease: "power3.out",
      },
      0.05 // Starts 0.05s after Step 1 starts
    );
  }

  // Step 3: Section heading (single block coming from bottom, no SplitText)
  const title = sectionEl.querySelector(".section-title");
  if (title) {
    tl.fromTo(
      title,
      { y: "110%" },
      {
        y: "0%",
        duration: 0.5,
        ease: "power3.out",
      },
      0.15 // Starts 0.1s after section number/label starts (0.05s + 0.1s = 0.15s)
    );
  }

  // Step 4: Body content (reveal-blocks or custom podcast halves)
  const revealBlocks = sectionEl.querySelectorAll(".reveal-block");
  const podcastLeft = sectionEl.querySelector(".podcast-left");
  const podcastRight = sectionEl.querySelector(".podcast-right");

  if (podcastLeft && podcastRight) {
    // Left & Right halves enter simultaneously
    tl.fromTo(
      podcastLeft,
      { x: -40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out"
      },
      0.35
    );
    tl.fromTo(
      podcastRight,
      { x: 40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.7,
        ease: "power3.out"
      },
      0.35 // simultaneous start
    );
  } else if (revealBlocks.length > 0) {
    // If there is no section title heading, start Step 4 immediately at 0.15s instead of waiting
    const startTime = title ? 0.35 : 0.15;
    tl.fromTo(
      revealBlocks,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.03, // Snappier stagger (0.03s instead of 0.05s)
        duration: 0.5,
        ease: "power2.out",
      },
      startTime
    );
  }

  // Counter animations if present in this section
  const statsElements = sectionEl.querySelectorAll(".stat-value");
  if (statsElements.length > 0) {
    statsElements.forEach((el) => {
      const targetVal = parseInt(el.getAttribute("data-target") || "0", 10);
      const suffix = el.getAttribute("data-suffix") || "";
      const obj = { val: 0 };
      const startTime = title ? 0.35 : 0.15;
      tl.fromTo(
        obj,
        { val: 0 },
        {
          val: targetVal,
          duration: 1.5,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = Math.round(obj.val).toLocaleString() + suffix;
          },
        },
        startTime
      );
    });
  }

  // Award hero flash if present in this section
  const heroFlash = sectionEl.querySelector(".award-hero-flash");
  if (heroFlash) {
    tl.fromTo(
      heroFlash,
      { opacity: 0.6 },
      {
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      },
      title ? 0.6 : 0.4
    );
  }
}

