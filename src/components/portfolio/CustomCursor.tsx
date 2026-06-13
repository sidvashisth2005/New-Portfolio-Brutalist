import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/anime-utils";
import gsapCore from "gsap/dist/gsap";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isReduced = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined" || isReduced) return;

    // Add class to hide default cursor globally
    document.body.classList.add("has-custom-cursor");

    // Center the cursor elements initially
    gsapCore.set("#cursor-dot", { xPercent: -50, yPercent: -50 });
    gsapCore.set("#cursor-ring", { xPercent: -50, yPercent: -50 });

    // QuickTo for high-performance translation
    // Dot: fast tracking
    const dotXTo = gsapCore.quickTo("#cursor-dot", "x", { duration: 0.08, ease: "power3.out" });
    const dotYTo = gsapCore.quickTo("#cursor-dot", "y", { duration: 0.08, ease: "power3.out" });

    // Ring: smooth lagging follow
    const ringXTo = gsapCore.quickTo("#cursor-ring", "x", { duration: 0.3, ease: "power3.out" });
    const ringYTo = gsapCore.quickTo("#cursor-ring", "y", { duration: 0.3, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      dotXTo(e.clientX);
      dotYTo(e.clientY);
      ringXTo(e.clientX);
      ringYTo(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Mouse click compression scaling
    const handleMouseDown = () => {
      gsapCore.to("#cursor-ring", { scale: 0.5, duration: 0.15, ease: "power2.out" });
      gsapCore.to("#cursor-dot", { scale: 2.0, duration: 0.15, ease: "power2.out" });
    };

    const handleMouseUp = () => {
      gsapCore.to("#cursor-ring", { scale: 1, duration: 0.2, ease: "power2.out" });
      gsapCore.to("#cursor-dot", { scale: 1, duration: 0.2, ease: "power2.out" });
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Hover detection using event delegation
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactiveEl = target.closest("a, button, [role='button'], .project-card, .gallery-card, .ep-card, .clickable, .project-slide h3, .project-slide div");
      if (interactiveEl) {
        // Determine hover type
        const isProject = interactiveEl.closest("#projects");
        const isGallery = interactiveEl.closest("#gallery");
        const isPodcast = interactiveEl.closest("#podcast");

        let labelText = "";
        let width = 56;
        let height = 56;
        let ringBg = "#E8FF00";
        let ringBorder = "none";
        let mixBlend = "normal"; // normal blend to show yellow circle

        if (isProject) {
          labelText = "EXPLORE";
        } else if (isGallery) {
          labelText = "ZOOM";
        } else if (isPodcast) {
          labelText = "LISTEN";
        } else {
          // Standard interactive
          width = 36;
          height = 36;
          ringBg = "transparent";
          ringBorder = "2px solid #E8FF00";
          mixBlend = "difference";
        }

        // Hide dot
        gsapCore.to("#cursor-dot", { scale: 0, opacity: 0, duration: 0.2 });

        // Expand and color ring
        gsapCore.to("#cursor-ring", {
          width,
          height,
          backgroundColor: ringBg,
          border: ringBorder,
          mixBlendMode: mixBlend as any,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });

        // Show label inside ring
        const label = document.querySelector("#cursor-ring .cursor-label");
        if (label) {
          label.innerHTML = labelText;
          gsapCore.to(label, {
            opacity: labelText ? 1 : 0,
            scale: labelText ? 1 : 0.8,
            duration: 0.2,
            ease: "power2.out",
          });
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const relatedTarget = e.relatedTarget as HTMLElement;
      const currentEl = target.closest("a, button, [role='button'], .project-card, .gallery-card, .ep-card, .clickable, .project-slide h3, .project-slide div");
      const nextEl = relatedTarget ? relatedTarget.closest("a, button, [role='button'], .project-card, .gallery-card, .ep-card, .clickable, .project-slide h3, .project-slide div") : null;

      if (currentEl && currentEl !== nextEl) {
        // Restore dot
        gsapCore.to("#cursor-dot", { scale: 1, opacity: 1, duration: 0.2 });

        // Restore ring
        gsapCore.to("#cursor-ring", {
          width: 24,
          height: 24,
          backgroundColor: "transparent",
          border: "1.5px solid #E8FF00",
          mixBlendMode: "difference" as any,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });

        // Hide label
        const label = document.querySelector("#cursor-ring .cursor-label");
        if (label) {
          gsapCore.to(label, {
            opacity: 0,
            scale: 0.8,
            duration: 0.15,
            ease: "power2.out",
          });
        }
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    // Magnetic buttons logic (.magnetic-btn)
    const onMagneticMouseMove = (e: MouseEvent) => {
      const magneticBtns = document.querySelectorAll(".magnetic-btn");
      magneticBtns.forEach((btn) => {
        const rect = btn.getBoundingClientRect();
        const btnX = rect.left + rect.width / 2;
        const btnY = rect.top + rect.height / 2;
        const dx = e.clientX - btnX;
        const dy = e.clientY - btnY;
        const distance = Math.hypot(dx, dy);

        if (distance < 70) {
          gsapCore.to(btn, {
            x: dx * 0.2,
            y: dy * 0.2,
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
            ease: "elastic.out(1, 0.4)",
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

      const magneticBtns = document.querySelectorAll(".magnetic-btn");
      magneticBtns.forEach((btn) => {
        gsapCore.killTweensOf(btn);
        gsapCore.set(btn, { x: 0, y: 0 });
      });
    };
  }, [isReduced]);

  if (isReduced) return null;

  return (
    <>
      {/* Outer lagging ring */}
      <div
        id="cursor-ring"
        ref={ringRef}
        className="fixed top-0 left-0 w-6 h-6 border-[1.5px] border-[#E8FF00] rounded-full pointer-events-none z-[99999] mix-blend-difference flex items-center justify-center overflow-hidden"
      >
        <span className="cursor-label opacity-0 font-mono text-[8px] font-bold text-black select-none tracking-widest whitespace-nowrap">
          VIEW
        </span>
      </div>

      {/* Inner precise dot */}
      <div
        id="cursor-dot"
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#E8FF00] rounded-full pointer-events-none z-[99999] mix-blend-difference"
      />
    </>
  );
}
