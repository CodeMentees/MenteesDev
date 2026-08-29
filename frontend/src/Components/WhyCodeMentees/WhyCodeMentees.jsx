import React, { useEffect, useRef } from "react";

const features = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422A12.083 12.083 0 0112 21.5a12.083 12.083 0 01-6.16-10.922L12 14z" />
      </svg>
    ),
    title: "Elite Mentors",
    description: "Learn from engineers who've worked at JPMorgan, Freecharge, and top product companies. Real experience, not just theory.",
    accent: "rgba(139,92,246,0.6)",
    glow: "rgba(139,92,246,0.12)",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: "Industry Curriculum",
    description: "Content aligned with what top tech companies actually look for — DSA, system design, web dev, and more.",
    accent: "rgba(59,130,246,0.6)",
    glow: "rgba(59,130,246,0.12)",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    title: "Project-Based Learning",
    description: "Hands-on learning with live projects that go on your portfolio. Build real apps, not just tutorials.",
    accent: "rgba(16,185,129,0.6)",
    glow: "rgba(16,185,129,0.12)",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    title: "Placement Support",
    description: "Referrals, mock interviews, resume reviews, and dedicated placement support — until you land the job.",
    accent: "rgba(249,115,22,0.6)",
    glow: "rgba(249,115,22,0.12)",
  },
];

function FeatureCard({ icon, title, description, accent, glow, delay }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }
    }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="group relative p-6 rounded-2xl transition-all duration-500 cursor-default"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        backdropFilter: "blur(12px)",
        opacity: 0,
        transform: "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms, box-shadow 0.3s ease, border-color 0.3s ease`,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = accent;
        e.currentTarget.style.boxShadow = `0 0 32px ${glow}, 0 8px 32px rgba(0,0,0,0.3)`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
        style={{ background: glow, color: accent.replace("0.6)", "1)") }}>
        {icon}
      </div>
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
      <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{description}</p>
    </div>
  );
}

function WhyCodeMentees() {
  return (
    <section className="py-24 px-6 relative overflow-hidden" style={{ background: "rgb(4, 4, 8)" }}>
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px]"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-6 mb-16">
          <div className="flex-1">
            <p className="text-xs font-bold tracking-widest uppercase text-orange-400 mb-3">Why CodeMentees</p>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
              Built for developers<br />
              <span style={{ color: "rgba(255,255,255,0.4)" }}>who mean business.</span>
            </h2>
          </div>
          <div className="lg:max-w-sm">
            <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
              Whether you're a beginner or a working professional, our platform provides expert guidance, structured paths, and a community that accelerates your growth.
            </p>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} delay={i * 100} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default WhyCodeMentees;
