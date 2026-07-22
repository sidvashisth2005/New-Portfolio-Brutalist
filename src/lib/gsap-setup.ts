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
    duration: 1.4,
    easing: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
    gestureOrientation: "vertical",
    normalizeWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.5,
  });

  // Velocity-based scroll skew with smooth decay — quickTo animates toward the target value
  // so the tilt breathes in and out instead of snapping
  const skewTo = gsap.quickTo("[data-skew]", "skewY", { duration: 0.8, ease: "power3.out" });
  const clamp = gsap.utils.clamp(-3.5, 3.5);
  lenis.on("scroll", (e: any) => {
    skewTo(clamp(e.velocity * -0.016));
  });

  // Sync Lenis with GSAP ticker
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // Enable lag smoothing to prevent sudden animation jumps during performance hiccups
  gsap.ticker.lagSmoothing(1000, 16);

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
      start: "top 80%",
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

  // Step 3: Section heading — per-line word-reveals if present, else single block
  const title = sectionEl.querySelector(".section-title");
  const wordReveals = sectionEl.querySelectorAll(".word-reveal");
  if (wordReveals.length > 0) {
    tl.fromTo(
      wordReveals,
      { y: "108%", skewY: 1.5 },
      {
        y: "0%",
        skewY: 0,
        duration: 1.0,
        stagger: 0.12,
        ease: "power4.out",
      },
      0.1
    );
  } else if (title) {
    tl.fromTo(
      title,
      { y: "110%" },
      { y: "0%", duration: 0.5, ease: "power3.out" },
      0.15
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
      { y: 24, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.07,
        duration: 0.6,
        ease: "power3.out",
      },
      startTime
    );
  }

  // Experience section custom animation for company characters
  if (sectionEl.id === "experience") {
    const entries = sectionEl.querySelectorAll(".experience-entry");
    entries.forEach((entry, entryIndex) => {
      const chars = entry.querySelectorAll(".company-char");
      if (chars.length > 0) {
        tl.fromTo(
          chars,
          { y: "110%", rotate: 2 },
          {
            y: "0%",
            rotate: 0,
            duration: 0.65,
            stagger: 0.012,
            ease: "power3.out",
          },
          0.35 + entryIndex * 0.1
        );
      }
      // Per-bullet slide from left
      const bullets = entry.querySelectorAll(".exp-bullet");
      if (bullets.length > 0) {
        tl.fromTo(
          bullets,
          { x: -20 },
          { x: 0, duration: 0.45, stagger: 0.05, ease: "power2.out" },
          0.7 + entryIndex * 0.1
        );
      }
    });
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

  // Awards section — per-row x-slide stagger (rows removed from reveal-block)
  if (sectionEl.id === "awards") {
    const rows = sectionEl.querySelectorAll(".award-row");
    if (rows.length > 0) {
      tl.fromTo(
        rows,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.65, stagger: 0.08, ease: "power3.out" },
        0.35
      );
    }
  }
}

