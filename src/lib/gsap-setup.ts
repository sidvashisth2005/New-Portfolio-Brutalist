import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

export function initAnimationStack() {
  if (typeof window === "undefined") return;

  // Register all plugins
  gsap.registerPlugin(ScrollTrigger, SplitText);

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
  (window as any).SplitText = SplitText;
  (window as any).lenis = lenis;

  return { gsap, ScrollTrigger, SplitText, lenis };
}
