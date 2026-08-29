import React, { useEffect, useState, useRef } from "react";

/**
 * SplashScreen — logo appears centre-screen, then animates to the top-left navbar position.
 * Runs once per hard page load (not on SPA route changes).
 * Stores a session flag so it only plays once per browser session.
 */
export default function SplashScreen({ onDone }) {
  const [phase, setPhase] = useState("center"); // center → move → done
  const logoRef = useRef(null);

  useEffect(() => {
    // Only show once per session
    if (sessionStorage.getItem("splashShown")) {
      onDone();
      return;
    }
    sessionStorage.setItem("splashShown", "1");

    // Phase 1: show logo centred for 900ms
    const t1 = setTimeout(() => setPhase("move"), 900);
    // Phase 2: after transition (600ms), notify parent
    const t2 = setTimeout(() => { setPhase("done"); onDone(); }, 1550);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ background: "#000005", pointerEvents: "none" }}
    >
      {/* Fade-out overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "#000005",
        opacity: phase === "move" ? 0 : 1,
        transition: "opacity 0.5s ease 0.3s",
      }} />

      {/* Logo mark */}
      <div
        ref={logoRef}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          position: "fixed",
          // Center phase
          top: phase === "center" ? "50%" : "14px",
          left: phase === "center" ? "50%" : "20px",
          transform: phase === "center" ? "translate(-50%, -50%) scale(2)" : "translate(0,0) scale(1)",
          transition: "top 0.55s cubic-bezier(0.4,0,0.2,1), left 0.55s cubic-bezier(0.4,0,0.2,1), transform 0.55s cubic-bezier(0.4,0,0.2,1)",
          zIndex: 10000,
        }}
      >
        <span style={{
          width: 28, height: 28,
          borderRadius: 8,
          background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "white", fontSize: 14, fontWeight: 900,
          boxShadow: "0 0 20px rgba(167,139,250,0.5)",
        }}>C</span>
        <span style={{
          fontFamily: "Playwrite IT Moderna, cursive",
          color: "#CD0094",
          fontSize: 20,
          fontWeight: 900,
          opacity: phase === "center" ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}>
          Codementees
        </span>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playwrite+IT+Moderna:wght@100..400&display=swap');
      `}</style>
    </div>
  );
}
