import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * RouteProgressBar — slim top-of-page progress bar.
 * Only appears if the route takes > 300ms to settle (prevents flash on fast loads).
 * Inspired by YouTube / GitHub's progress bar style.
 */
export default function RouteProgressBar() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);
  const showTimer = useRef(null);
  const growTimer = useRef(null);
  const hideTimer = useRef(null);

  useEffect(() => {
    // Reset any previous timers
    clearTimeout(showTimer.current);
    clearTimeout(growTimer.current);
    clearTimeout(hideTimer.current);

    // Start progress immediately (width 0 → 15%)
    setWidth(0);
    setVisible(false);

    // Phase 1: show bar after 300ms delay (only for slow loads)
    showTimer.current = setTimeout(() => {
      setVisible(true);
      setWidth(15);

      // Phase 2: grow to ~80% naturally over time
      growTimer.current = setTimeout(() => setWidth(60), 200);
      growTimer.current = setTimeout(() => setWidth(80), 600);
    }, 300);

    // Phase 3: complete & hide after route settles
    hideTimer.current = setTimeout(() => {
      setWidth(100);
      setTimeout(() => setVisible(false), 300);
      setTimeout(() => setWidth(0), 600);
    }, 700);

    return () => {
      clearTimeout(showTimer.current);
      clearTimeout(growTimer.current);
      clearTimeout(hideTimer.current);
    };
  }, [location.pathname]);

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] h-[2.5px] pointer-events-none"
      style={{ background: "rgba(0,0,0,0)" }}
    >
      {/* Progress bar */}
      <div
        style={{
          height: "100%",
          width: `${width}%`,
          background: "linear-gradient(90deg, #7c3aed, #a78bfa, #c084fc, #e879f9)",
          transition: width === 100
            ? "width 0.25s ease-out"
            : "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: "0 0 12px rgba(167,139,250,0.8), 0 0 4px rgba(232,121,249,0.6)",
          borderRadius: "0 2px 2px 0",
        }}
      />
      {/* Glowing dot at the tip */}
      <div
        style={{
          position: "absolute",
          top: "-3px",
          left: `${width}%`,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          background: "#e879f9",
          boxShadow: "0 0 10px 3px rgba(232,121,249,0.7)",
          transform: "translateX(-50%)",
          transition: "left 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
          opacity: width > 5 && width < 100 ? 1 : 0,
        }}
      />
    </div>
  );
}
