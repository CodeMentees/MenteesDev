import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const tabs = [
  { label: "Referrals", key: "referrals" },
  { label: "Peer Group", key: "peer_group" },
  { label: "Interviews", key: "interviews" },
  { label: "Support", key: "support" },
];

const featuresData = {
  referrals: [
    { icon: "🤝", description: "Referrals for Placements and Internships" },
    { icon: "📋", description: "Continuous feedback & monitoring" },
  ],
  peer_group: [
    { icon: "👥", description: "Awesome peer group of driven learners" },
    { icon: "💻", description: "In-class hackathons & assignment sessions" },
  ],
  interviews: [
    { icon: "🎤", description: "Mock interviews with real feedback" },
    { icon: "✅", description: "100% course completion tracking" },
  ],
  support: [
    { icon: "❓", description: "Dedicated doubt support sessions" },
    { icon: "💼", description: "Dedicated placement support team" },
  ],
};

function Learning() {
  const [activeTab, setActiveTab] = useState(0);
  const currentFeatures = featuresData[tabs[activeTab].key];

  return (
    <section className="py-24 px-6 relative" style={{ background: "rgb(4,4,8)" }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-bold tracking-widest uppercase text-orange-400 mb-3">Learning Model</p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Choose how you learn
          </h2>
          <p className="text-base max-w-xl leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
            Each learner is different. We offer multiple learning styles — so your pace, your way.
          </p>
        </div>

        {/* Pill Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              style={{
                background: activeTab === index ? "rgba(249,115,22,0.15)" : "rgba(255,255,255,0.04)",
                border: activeTab === index ? "1px solid rgba(249,115,22,0.4)" : "1px solid rgba(255,255,255,0.08)",
                color: activeTab === index ? "#fb923c" : "rgba(255,255,255,0.5)",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
          {currentFeatures.map((feat, i) => (
            <div key={i}
              className="flex items-start gap-4 p-5 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <span className="text-2xl flex-shrink-0">{feat.icon}</span>
              <p className="text-sm leading-relaxed font-medium" style={{ color: "rgba(255,255,255,0.65)" }}>
                {feat.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link
          to="/courses"
          className="inline-flex items-center gap-2 text-sm font-bold text-white px-6 py-3 rounded-full transition-all hover:scale-105"
          style={{ background: "rgba(249,115,22,0.15)", border: "1px solid rgba(249,115,22,0.3)" }}
        >
          Explore All Programs →
        </Link>
      </div>
    </section>
  );
}

export default Learning;
