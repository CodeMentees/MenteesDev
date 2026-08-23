import React, { useEffect, useRef, useState } from 'react';

const stats = [
  { value: "4.8", label: "Rating", suffix: "★" },
  { value: "4.7", label: "Satisfaction", suffix: "★" },
  { value: "100+", label: "Reviews", suffix: "" },
];

function RatingSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden" style={{ background: "rgb(4,4,8)" }}>
      {/* Large glowing orb behind */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.06) 0%, transparent 70%)" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px]"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Main CTA Block */}
        <div className="rounded-3xl p-10 md:p-14 relative overflow-hidden"
          style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(16px)" }}>
          {/* Orange top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.7), transparent)" }} />

          <div className="flex flex-col lg:flex-row lg:items-center gap-10">
            {/* Left: Copy */}
            <div className="flex-1">
              <p className="text-xs font-bold tracking-widest uppercase text-orange-400 mb-3">Free Consultation</p>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
                Talk to a Learning<br />Consultant Today
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: "rgba(255,255,255,0.45)" }}>
                Get a free counselling session from our experts. No commitments — just clarity on your learning path.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+918386963382"
                  className="inline-flex items-center gap-2 justify-center font-bold text-black rounded-full px-7 py-3.5 transition-all hover:scale-105"
                  style={{ background: "white", boxShadow: "0 0 28px rgba(255,255,255,0.15)" }}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z" />
                  </svg>
                  Call Us Now
                </a>
                <div className="flex flex-col justify-center">
                  <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>or reach us at</p>
                  <p className="text-lg font-bold text-white">+91 83869 63382</p>
                </div>
              </div>
            </div>

            {/* Right: Stats */}
            <div className="flex flex-col gap-4 lg:min-w-[220px]">
              <p className="text-xs font-bold tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.35)" }}>We love our students</p>
              {stats.map((s, i) => (
                <div key={i} className="flex items-center justify-between px-5 py-4 rounded-2xl"
                  style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <span className="text-sm font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>{s.label}</span>
                  <span className="text-2xl font-black" style={{ color: i === 2 ? "white" : "#fb923c" }}>
                    {s.value}{s.suffix}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RatingSection;
