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

    // Center the cursor elements initially and make them invisible until first movement
    gsapCore.set("#cursor-dot", { xPercent: -50, yPercent: -50, opacity: 0 });
    gsapCore.set("#cursor-ring", { xPercent: -50, yPercent: -50, opacity: 0 });

    // QuickTo for high-performance translation
    // Dot: fast tracking
    const dotXTo = gsapCore.quickTo("#cursor-dot", "x", { duration: 0.05, ease: "power3.out" });
    const dotYTo = gsapCore.quickTo("#cursor-dot", "y", { duration: 0.05, ease: "power3.out" });

    // Ring: smooth lagging follow
    const ringXTo = gsapCore.quickTo("#cursor-ring", "x", { duration: 0.25, ease: "power3.out" });
    const ringYTo = gsapCore.quickTo("#cursor-ring", "y", { duration: 0.25, ease: "power3.out" });

    // QuickTo for stretching (squash and stretch based on speed)
    const ringScaleXTo = gsapCore.quickTo("#cursor-ring .cursor-ring-bg", "scaleX", { duration: 0.15, ease: "power2.out" });
    const ringScaleYTo = gsapCore.quickTo("#cursor-ring .cursor-ring-bg", "scaleY", { duration: 0.15, ease: "power2.out" });
    const ringRotationTo = gsapCore.quickTo("#cursor-ring .cursor-ring-bg", "rotation", { duration: 0.15, ease: "power2.out" });

    let lastX = 0;
    let lastY = 0;
    let hasMoved = false;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;

      if (!hasMoved) {
        gsapCore.to(["#cursor-dot", "#cursor-ring"], { opacity: 1, duration: 0.3 });
        hasMoved = true;
        lastX = x;
        lastY = y;
      }

      dotXTo(x);
      dotYTo(y);
      ringXTo(x);
      ringYTo(y);

      // Calculate velocity and angle for organic squash-and-stretch
      const dx = x - lastX;
      const dy = y - lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);

      // Max stretch at velocity = 120
      const velocity = Math.min(120, distance);
      const stretch = (velocity / 120) * 0.45; // max 45% stretch

      // If we are currently hovering over an interactive element, we lock scale/rotation for readability
      if (!(window as any)._isCursorHovering) {
        ringScaleXTo(1 + stretch);
        ringScaleYTo(1 - stretch * 0.5);
        ringRotationTo(angle);
      } else {
        ringRotationTo(0);
      }

      lastX = x;
      lastY = y;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Mouse click compression scaling (GPU transform-only)
    const handleMouseDown = () => {
      if ((window as any)._isCursorHovering) return;
      gsapCore.to("#cursor-ring .cursor-ring-bg", { scaleX: 0.6, scaleY: 0.6, duration: 0.15, ease: "power2.out" });
      gsapCore.to("#cursor-dot", { scale: 1.8, duration: 0.15, ease: "power2.out" });
    };

    const handleMouseUp = () => {
      if ((window as any)._isCursorHovering) return;
      gsapCore.to("#cursor-ring .cursor-ring-bg", { scaleX: 1, scaleY: 1, duration: 0.2, ease: "power2.out" });
      gsapCore.to("#cursor-dot", { scale: 1, duration: 0.2, ease: "power2.out" });
    };

    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Hover detection using event delegation + computed cursor check
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Match elements that are links, buttons, form controls, have cursor-pointer class, OR have computed pointer style
      const interactiveEl = target.closest("a, button, [role='button'], .project-card, .moment-card, .clickable, .cursor-pointer, input, textarea, select") as HTMLElement;
      const isPointer = window.getComputedStyle(target).cursor === "pointer";
      const el = interactiveEl || (isPointer ? target : null);

      if (el) {
        (window as any)._isCursorHovering = true;

        // Determine context labels and custom scaling
        const isProject = el.closest("#projects");
        const isGallery = el.closest("#gallery");
        const isPodcast = el.closest("#podcast");
        const isInput = el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.tagName === "SELECT";

        let labelText = "";
        let scale = 1.6; // default hover size (1.6 * 32px = 51.2px)
        let ringBg = "transparent";
        let ringBorder = "1.5px solid #E8FF00";
        let mixBlend = "difference";
        let borderRadius = "50%";

        if (isProject) {
          scale = 2.2;
          ringBg = "#E8FF00";
          ringBorder = "none";
          mixBlend = "normal";
          labelText = "EXPLORE";
        } else if (isGallery) {
          scale = 2.2;
          ringBg = "#E8FF00";
          ringBorder = "none";
          mixBlend = "normal";
          labelText = "ZOOM";
        } else if (isPodcast) {
          scale = 2.2;
          ringBg = "#E8FF00";
          ringBorder = "none";
          mixBlend = "normal";
          
          // Check if hovering near a play trigger (like an SVG or thumbnail)
          const isPlay = el.closest("[onClick*='loadYT']") || el.closest(".group\\/yt") || el.tagName === "svg" || el.closest("svg") || el.classList.contains("cursor-pointer");
          labelText = isPlay ? "PLAY" : "LISTEN";
        } else if (isInput) {
          scale = 0.5;
          ringBg = "transparent";
          ringBorder = "1px solid rgba(232, 255, 0, 0.4)";
          borderRadius = "4px"; // morph into capsule/rect for text fields
        } else {
          // General button/link
          scale = 1.5;
          ringBg = "rgba(232, 255, 0, 0.12)";
          ringBorder = "1.5px solid #E8FF00";
        }

        // Hide dot (except inside input fields where it acts as a precise focus point)
        if (isInput) {
          gsapCore.to("#cursor-dot", { scale: 1.2, opacity: 0.7, backgroundColor: "#E8FF00", duration: 0.2 });
        } else {
          gsapCore.to("#cursor-dot", { scale: 0, opacity: 0, duration: 0.2 });
        }

        // Style the outer ring
        gsapCore.to("#cursor-ring .cursor-ring-bg", {
          scaleX: scale,
          scaleY: scale,
          backgroundColor: ringBg,
          border: ringBorder,
          mixBlendMode: mixBlend as any,
          borderRadius: borderRadius,
          duration: 0.25,
          ease: "power2.out",
          overwrite: "auto",
        });

        // Transition the text label
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
      
      const currentEl = target.closest("a, button, [role='button'], .project-card, .moment-card, .clickable, .cursor-pointer, input, textarea, select") || (window.getComputedStyle(target).cursor === "pointer" ? target : null);
      const nextEl = relatedTarget ? (relatedTarget.closest("a, button, [role='button'], .project-card, .moment-card, .clickable, .cursor-pointer, input, textarea, select") || (window.getComputedStyle(relatedTarget).cursor === "pointer" ? relatedTarget : null)) : null;

      if (currentEl && currentEl !== nextEl) {
        (window as any)._isCursorHovering = false;

        // Restore dot
        gsapCore.to("#cursor-dot", { scale: 1, opacity: 1, backgroundColor: "#E8FF00", duration: 0.2 });

        // Restore ring circle
        gsapCore.to("#cursor-ring .cursor-ring-bg", {
          scaleX: 1,
          scaleY: 1,
          backgroundColor: "transparent",
          border: "1.5px solid #E8FF00",
          mixBlendMode: "difference" as any,
          borderRadius: "50%",
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

    // Hide custom cursor elements when the mouse leaves the browser window
    const handleMouseLeaveWindow = () => {
      gsapCore.to(["#cursor-dot", "#cursor-ring"], { opacity: 0, duration: 0.2 });
    };

    const handleMouseEnterWindow = () => {
      gsapCore.to(["#cursor-dot", "#cursor-ring"], { opacity: 1, duration: 0.2 });
    };

    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    // Magnetic buttons logic
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
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
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
      {/* Outer lagging ring wrapper */}
      <div
        id="cursor-ring"
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[99999] flex items-center justify-center overflow-visible"
      >
        {/* Actual scaling background circle */}
        <div className="cursor-ring-bg w-full h-full border-[1.5px] border-[#E8FF00] rounded-full mix-blend-difference" />
        
        {/* Label centered overlay (stops text from scaling/blurring) */}
        <span className="cursor-label absolute font-mono text-[8px] font-bold text-black select-none tracking-widest opacity-0">
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
