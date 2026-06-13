import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/anime-utils";
import gsapCore from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined" || isReduced) return;

    // Dynamically add class to hide default cursor when custom cursor is active
    document.body.classList.add("has-custom-cursor");

    // Center the cursor initially using GSAP percent translations
    gsapCore.set("#cursor", { xPercent: -50, yPercent: -50 });

    // Setup high-performance mouse tracking using quickTo
    const xTo = gsapCore.quickTo("#cursor", "x", { duration: 0.35, ease: "power3" });
    const yTo = gsapCore.quickTo("#cursor", "y", { duration: 0.35, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // MouseDown / MouseUp scale animations
    const handleMouseDown = () => {
      gsapCore.to("#cursor", { scale: 0.8, duration: 0.1 });
    };

    const handleMouseUp = () => {
      gsapCore.to("#cursor", { scale: 1, duration: 0.1 });
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Event delegation for hover states (links, buttons, project-cards)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactiveEl = target.closest("a, button, [role='button'], .project-card");
      if (interactiveEl) {
        const isProjectCard = interactiveEl.classList.contains("project-card");

        gsapCore.to("#cursor", {
          width: 48,
          height: 48,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });

        if (isProjectCard) {
          gsapCore.to("#cursor .cursor-label", {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const relatedTarget = e.relatedTarget as HTMLElement;
      const currentEl = target.closest("a, button, [role='button'], .project-card");
      const nextEl = relatedTarget ? relatedTarget.closest("a, button, [role='button'], .project-card") : null;

      // Only shrink if we are moving out of the interactive element bounds entirely
      if (currentEl && currentEl !== nextEl) {
        gsapCore.to("#cursor", {
          width: 10,
          height: 10,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto",
        });

        gsapCore.to("#cursor .cursor-label", {
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    // Magnetic button effects on elements matching .magnetic-btn class
    const onMagneticMouseMove = (e: MouseEvent) => {
      const magneticBtns = document.querySelectorAll(".magnetic-btn");
      magneticBtns.forEach((btn) => {
        const rect = btn.getBoundingClientRect();
        const btnX = rect.left + rect.width / 2;
        const btnY = rect.top + rect.height / 2;
        const dx = e.clientX - btnX;
        const dy = e.clientY - btnY;
        const distance = Math.hypot(dx, dy);

        if (distance < 80) {
          gsapCore.to(btn, {
            x: dx * 0.25,
            y: dy * 0.25,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto",
          });
          (btn as any)._isMagnetized = true;
        } else if ((btn as any)._isMagnetized) {
          gsapCore.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)",
            overwrite: "auto",
          });
          (btn as any)._isMagnetized = false;
        }
      });
    };

    window.addEventListener("mousemove", onMagneticMouseMove);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("mousemove", onMagneticMouseMove);
      
      // Reset any active magnetic buttons
      const magneticBtns = document.querySelectorAll(".magnetic-btn");
      magneticBtns.forEach((btn) => {
        gsapCore.killTweensOf(btn);
        gsapCore.set(btn, { x: 0, y: 0 });
      });
    };
  }, [isReduced]);

  if (isReduced) return null;

  return (
    <div
      id="cursor"
      ref={cursorRef}
      className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#E8FF00] rounded-full pointer-events-none z-[9999] mix-blend-exclusion flex items-center justify-center overflow-hidden"
    >
      <span className="cursor-label opacity-0 font-mono text-[9px] font-semibold text-[#0A0A0A] select-none whitespace-nowrap">
        VIEW &rarr;
      </span>
    </div>
  );
}
