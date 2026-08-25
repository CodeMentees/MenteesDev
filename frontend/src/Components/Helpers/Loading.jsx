import React from "react";

/** Premium full-page loader — shown while lazy chunks are downloading */
function Loading({ message = "Loading..." }) {
  return (
    <div
      className="fixed inset-0 z-[9990] flex flex-col items-center justify-center"
      style={{ background: "#000005" }}
    >
      {/* Background haze */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div style={{
          position: "absolute",
          top: "20%", left: "30%",
          width: "40%", height: "40%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "loaderPulse 3s ease-in-out infinite",
        }} />
        <div style={{
          position: "absolute",
          bottom: "20%", right: "25%",
          width: "30%", height: "30%",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,121,249,0.12) 0%, transparent 70%)",
          filter: "blur(50px)",
          animation: "loaderPulse 4s ease-in-out infinite reverse",
        }} />
      </div>

      {/* Spinner rings */}
      <div className="relative flex items-center justify-center mb-6" style={{ width: 72, height: 72 }}>
        {/* Outer slow ring */}
        <div style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          border: "2px solid transparent",
          borderTopColor: "#7c3aed",
          borderRightColor: "rgba(124,58,237,0.3)",
          animation: "spin 1.4s linear infinite",
        }} />
        {/* Inner fast ring */}
        <div style={{
          position: "absolute",
          inset: 10,
          borderRadius: "50%",
          border: "2px solid transparent",
          borderTopColor: "#e879f9",
          borderLeftColor: "rgba(232,121,249,0.3)",
          animation: "spin 0.9s linear infinite reverse",
        }} />
        {/* Center dot */}
        <div style={{
          width: 10, height: 10,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #7c3aed, #e879f9)",
          boxShadow: "0 0 12px rgba(167,139,250,0.8)",
          animation: "loaderPulse 1.4s ease-in-out infinite",
        }} />
      </div>

      {/* Brand mark */}
      <div className="flex items-center gap-2 mb-3">
        <span className="w-6 h-6 rounded-md flex items-center justify-center text-white text-xs font-black"
          style={{ background: "linear-gradient(135deg, #7c3aed, #a78bfa)" }}>C</span>
        <span className="text-white font-bold text-sm tracking-wide">CodeMentees</span>
      </div>

      <p className="text-xs font-medium tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.3)" }}>
        {message}
      </p>

      <style>{`
        @keyframes loaderPulse { 0%,100%{opacity:0.7;transform:scale(1)} 50%{opacity:1;transform:scale(1.08)} }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}

export default Loading;
