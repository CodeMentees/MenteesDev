import React, { useEffect, useState, useRef } from "react";
import { fetchSiteData } from "../../api/siteDataApi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// Each word has its own gradient that transitions as text is typed
const TYPEWRITER_WORDS = [
  {
    text: "Master Coding",
    gradient: "linear-gradient(135deg, #a78bfa 0%, #818cf8 50%, #38bdf8 100%)",
  },
  {
    text: "Build Real Apps",
    gradient: "linear-gradient(135deg, #f472b6 0%, #e879f9 50%, #a78bfa 100%)",
  },
  {
    text: "Land Dream Jobs",
    gradient: "linear-gradient(135deg, #34d399 0%, #22d3ee 50%, #60a5fa 100%)",
  },
  {
    text: "Level Up Skills",
    gradient: "linear-gradient(135deg, #fb923c 0%, #f472b6 50%, #c084fc 100%)",
  },
];

function useTypewriter(words, typingSpeed = 85, deletingSpeed = 50, pauseAfter = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState("typing");
  const timeout = useRef(null);

  useEffect(() => {
    const word = words[wordIndex].text;
    if (phase === "typing") {
      if (displayed.length < word.length) {
        timeout.current = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), typingSpeed);
      } else {
        timeout.current = setTimeout(() => setPhase("deleting"), pauseAfter);
      }
    } else {
      if (displayed.length > 0) {
        timeout.current = setTimeout(() => setDisplayed(displayed.slice(0, -1)), deletingSpeed);
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(timeout.current);
  }, [displayed, phase, wordIndex]);

  return { displayed, wordIndex, isDeleting: phase === "deleting" };
}

function StatCounter({ target, label }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const observed = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !observed.current) {
        observed.current = true;
        const num = parseInt(target.replace(/\D/g, ""));
        const steps = 55;
        const increment = num / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= num) { setCount(num); clearInterval(timer); }
          else setCount(Math.floor(current));
        }, 1800 / steps);
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  const suffix = target.replace(/[\d,]/g, "");
  return (
    <div ref={ref} className="px-4 text-center">
      <p className="text-3xl md:text-4xl font-black text-white mb-1">{count}{suffix}</p>
      <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.4)" }}>{label}</p>
    </div>
  );
}

function Carousel() {
  const [siteLoaded, setSiteLoaded] = useState(false);
  const { displayed, wordIndex, isDeleting } = useTypewriter(TYPEWRITER_WORDS);
  const currentGradient = TYPEWRITER_WORDS[wordIndex].gradient;
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    fetchSiteData().catch(() => {}).finally(() => setSiteLoaded(true));
  }, []);

  return (
    <div className="relative min-h-[96vh] flex items-center justify-center overflow-hidden" style={{ background: "#000005" }}>

      {/* ── Layered animated background orbs ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Primary large purple haze */}
        <div style={{
          position: "absolute",
          top: "-20%", left: "-15%",
          width: "70%", height: "80%",
          borderRadius: "50%",
          background: "radial-gradient(circle at center, rgba(124,58,237,0.28) 0%, rgba(109,40,217,0.12) 40%, transparent 70%)",
          animation: "hazeBreath 8s ease-in-out infinite",
          filter: "blur(40px)",
        }} />
        {/* Secondary purple orb */}
        <div style={{
          position: "absolute",
          top: "10%", right: "-10%",
          width: "50%", height: "60%",
          borderRadius: "50%",
          background: "radial-gradient(circle at center, rgba(167,139,250,0.18) 0%, rgba(139,92,246,0.08) 50%, transparent 70%)",
          animation: "hazeDrift 12s ease-in-out infinite alternate",
          filter: "blur(60px)",
        }} />
        {/* Blue accent bottom-center */}
        <div style={{
          position: "absolute",
          bottom: "-10%", left: "25%",
          width: "50%", height: "40%",
          borderRadius: "50%",
          background: "radial-gradient(circle at center, rgba(59,130,246,0.14) 0%, transparent 70%)",
          animation: "hazeBreath 10s ease-in-out infinite reverse",
          filter: "blur(50px)",
        }} />
        {/* Pink flicker top-right */}
        <div style={{
          position: "absolute",
          top: "5%", right: "20%",
          width: "25%", height: "30%",
          borderRadius: "50%",
          background: "radial-gradient(circle at center, rgba(236,72,153,0.12) 0%, transparent 70%)",
          animation: "hazeDrift 7s ease-in-out infinite",
          filter: "blur(35px)",
        }} />

        {/* Fine grid overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.018) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.018) 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
          maskImage: "radial-gradient(ellipse 75% 65% at 50% 40%, #000 10%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 65% at 50% 40%, #000 10%, transparent 100%)",
        }} />

        {/* Bottom fade to next section color */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "200px",
          background: "linear-gradient(to bottom, transparent, #000005)",
        }} />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-24 flex flex-col items-center text-center">

        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2.5 px-5 py-2 rounded-full fade-in"
          style={{
            background: "rgba(124,58,237,0.12)",
            border: "1px solid rgba(167,139,250,0.25)",
            backdropFilter: "blur(12px)",
            boxShadow: "0 0 30px rgba(124,58,237,0.15)",
          }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#a78bfa" }} />
          <span className="text-sm font-semibold tracking-widest uppercase" style={{ color: "rgba(196,181,253,0.9)" }}>
            1:1 Live Mentorship
          </span>
        </div>

        {/* Hero heading with gradient typewriter */}
        <h1 className="font-black tracking-tight leading-[1.05] mb-3 fade-in"
          style={{ fontSize: "clamp(2.8rem, 8vw, 5.5rem)" }}>
          {/* Gradient typewriter line */}
          <span
            className="inline"
            style={{
              backgroundImage: currentGradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              transition: "background-image 0.4s ease",
              minWidth: "2ch",
              display: "inline",
            }}
          >
            {displayed || "\u00a0"}
          </span>
          {/* Blinking cursor matches gradient color */}
          <span
            style={{
              display: "inline-block",
              width: "3px",
              height: "0.75em",
              marginLeft: "4px",
              borderRadius: "2px",
              verticalAlign: "middle",
              background: "#a78bfa",
              animation: "blink 1s step-end infinite",
              opacity: isDeleting ? 0.6 : 1,
            }}
          />
          {/* Static second line */}
          <br />
          <span style={{
            backgroundImage: "linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0.75) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            With Ease.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-xl text-lg md:text-xl font-light leading-relaxed mb-12 fade-in stagger"
          style={{ color: "rgba(255,255,255,0.42)" }}>
          Expert-led mentorship, real-world projects, and guided coding paths to sharpen your skills and launch your career.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-24 fade-in stagger">
          <Link
            to={isAuthenticated ? "/dashboard" : "/register"}
            className="group relative inline-flex items-center justify-center px-9 py-4 font-bold text-black rounded-full overflow-hidden transition-all duration-300 hover:scale-105 active:scale-100"
            style={{ background: "white", boxShadow: "0 0 50px rgba(255,255,255,0.2), 0 4px 20px rgba(0,0,0,0.5)" }}
          >
            <span className="relative z-10 flex items-center gap-2">
            {isAuthenticated ? "Go to Dashboard" : "Start Your Journey"}
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </Link>

          <a
            href="tel:+918386963382"
            className="inline-flex items-center gap-2 justify-center px-9 py-4 font-bold text-white rounded-full transition-all duration-300 hover:scale-105"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(12px)",
            }}
          >
            <svg className="w-4 h-4 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z" />
            </svg>
            Book a Free Call
          </a>
        </div>

        {/* Stats bar */}
        <div className="w-full max-w-2xl rounded-3xl p-6 fade-in stagger"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            backdropFilter: "blur(24px)",
            boxShadow: "0 4px 40px rgba(124,58,237,0.08), inset 0 1px 0 rgba(255,255,255,0.06)",
          }}>
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/[0.07]">
            <StatCounter target="500+" label="Students" />
            <StatCounter target="50+" label="Partners" />
            <StatCounter target="11+" label="Tracks" />
            <StatCounter target="100%" label="Remote" />
          </div>
        </div>
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes hazeBreath {
          0%,100% { transform: translate(0,0) scale(1); opacity: 0.8; }
          50% { transform: translate(20px,-30px) scale(1.08); opacity: 1; }
        }
        @keyframes hazeDrift {
          0% { transform: translate(0,0) scale(1) rotate(0deg); }
          100% { transform: translate(-40px,25px) scale(1.1) rotate(5deg); }
        }
      `}</style>
    </div>
  );
}

export default Carousel;
