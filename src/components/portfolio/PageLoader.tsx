import { useEffect, useRef, useState } from "react";
import anime from "animejs";

export function PageLoader({ onComplete }: { onComplete: () => void }) {
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Animate counter 0 → 100
    const obj = { val: 0 };
    const counterAnim = anime({
      targets: obj,
      val: 100,
      duration: 1400,
      easing: "easeInOutExpo",
      update: () => {
        if (counterRef.current) {
          counterRef.current.textContent = String(Math.round(obj.val)).padStart(3, "0");
        }
      },
    });

    // After counter done: slam panels out
    counterAnim.finished.then(() => {
      // Animate top panel up
      anime({
        targets: ".loader-panel-top",
        translateY: [0, "-100%"],
        duration: 900,
        easing: "cubicBezier(0.85, 0, 0.15, 1)",
        delay: 100,
      });
      // Animate bottom panel down
      anime({
        targets: ".loader-panel-bottom",
        translateY: [0, "100%"],
        duration: 900,
        easing: "cubicBezier(0.85, 0, 0.15, 1)",
        delay: 100,
        complete: () => {
          setVisible(false);
          onComplete();
        },
      });
    });
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[9999] pointer-events-none"
    >
      {/* Top panel - black */}
      <div
        className="loader-panel-top absolute top-0 left-0 right-0 h-1/2 bg-black flex items-end justify-start px-8 pb-4"
        style={{ borderBottom: "2px solid #ffff00" }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#ffff00]">
          LOADING PORTFOLIO
        </span>
      </div>

      {/* Bottom panel - yellow */}
      <div className="loader-panel-bottom absolute bottom-0 left-0 right-0 h-1/2 bg-[#ffff00] flex items-start justify-end px-8 pt-4">
        <span
          ref={counterRef}
          className="font-display font-black text-[20vw] leading-none tracking-[-0.06em] text-black select-none"
          style={{ lineHeight: 1 }}
        >
          000
        </span>
      </div>
    </div>
  );
}
