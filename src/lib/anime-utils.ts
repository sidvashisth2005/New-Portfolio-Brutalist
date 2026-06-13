import { useState, useEffect } from "react";

export const GUILLOTINE = "cubicBezier(0.85, 0, 0.15, 1)";

export const GLYPHS = "█▓▒░│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌";

export function glitchText(
  element: HTMLElement,
  finalText: string,
  duration = 300
): void {
  const chars = finalText.split("");
  const startTime = performance.now();
  const interval = setInterval(() => {
    const elapsed = performance.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const resolvedCount = Math.floor(progress * chars.length);
    const display = chars
      .map((char, i) => {
        if (i < resolvedCount) return char;
        if (char === " ") return " ";
        return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      })
      .join("");
    element.textContent = display;
    if (progress >= 1) clearInterval(interval);
  }, 40);
}

export function useReducedMotion(): boolean {
  const [isReduced, setIsReduced] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Support query parameter override (?force-animate=true or ?animate=true)
    const params = new URLSearchParams(window.location.search);
    if (params.get("animate") === "true" || params.get("force") === "true") {
      setIsReduced(false);
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReduced(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setIsReduced(event.matches);
    };

    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return isReduced;
}
