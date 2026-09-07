import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../api/api";
import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook, FaYoutube, FaDiscord, FaGithub } from "react-icons/fa";

// Map platform key → icon component
const SOCIAL_ICON_MAP = {
  instagram: FaInstagram,
  linkedin:  FaLinkedin,
  twitter:   FaTwitter,
  facebook:  FaFacebook,
  youtube:   FaYoutube,
  discord:   FaDiscord,
  github:    FaGithub,
};

// Hover color per platform
const SOCIAL_HOVER_COLOR = {
  instagram: "#E1306C",
  linkedin:  "#0A66C2",
  twitter:   "#1DA1F2",
  facebook:  "#1877F2",
  youtube:   "#FF0000",
  discord:   "#5865F2",
  github:    "#ffffff",
};

const SOCIAL_LABEL = {
  instagram: "Instagram",
  linkedin:  "LinkedIn",
  twitter:   "Twitter / X",
  facebook:  "Facebook",
  youtube:   "YouTube",
  discord:   "Discord",
  github:    "GitHub",
};

const FooterLink = ({ to, href, children }) =>
  to ? (
    <Link to={to} className="hover:text-white transition-colors duration-200">{children}</Link>
  ) : (
    <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
      {children}
    </a>
  );

function Footer() {
  const [stats, setStats] = useState({ todayVisitors: 0, totalVisitors: 0 });
  const [socialLinks, setSocialLinks] = useState({});
  const [hoveredSocial, setHoveredSocial] = useState(null);

  useEffect(() => {
    const fetchStats = () => {
      api.get("/visitors/stats")
        .then(res => {
          if (res.data?.success) setStats(res.data.data);
        })
        .catch(() => {});
    };

    // Fetch social links from backend
    api.get("/site-settings")
      .then(res => {
        if (res.data?.data?.socialLinks) {
          setSocialLinks(res.data.data.socialLinks);
        }
      })
      .catch(() => {});

    fetchStats();
    window.addEventListener("visitorTracked", fetchStats);
    return () => window.removeEventListener("visitorTracked", fetchStats);
  }, []);

  // Only render platforms that have a non-empty URL
  const activeSocials = Object.entries(socialLinks).filter(([, url]) => url && url.trim() !== "");

  // Build social links list for the Help Center column
  const activeSocialList = activeSocials.map(([key, url]) => ({ key, url, label: SOCIAL_LABEL[key] }));

  return (
    <footer
      className="border-t"
      style={{
        background: "rgba(0,0,0,0.6)",
        borderColor: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="mx-auto w-full max-w-screen-xl">
        {/* Main grid */}
        <div className="grid grid-cols-2 gap-8 px-8 py-14 md:grid-cols-5">

          {/* Brand Column */}
          <div className="col-span-2 md:col-span-2 pr-4">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <span className="text-xl font-black tracking-tight">
                <span className="text-white">Code</span>
                <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">Mentees</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "rgba(156,163,175,0.8)" }}>
              Connecting self-taught developers with experienced mentors to build real, hireable skills — not just certificates.
            </p>
            {/* Social Icons */}
            {activeSocials.length > 0 && (
              <div className="flex items-center gap-3 flex-wrap">
                {activeSocials.map(([key, url]) => {
                  const Icon = SOCIAL_ICON_MAP[key];
                  if (!Icon) return null;
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={SOCIAL_LABEL[key]}
                      onMouseEnter={() => setHoveredSocial(key)}
                      onMouseLeave={() => setHoveredSocial(null)}
                      className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        color: hoveredSocial === key ? SOCIAL_HOVER_COLOR[key] : "rgba(156,163,175,0.7)",
                        transform: hoveredSocial === key ? "translateY(-2px)" : "none",
                        borderColor: hoveredSocial === key ? `${SOCIAL_HOVER_COLOR[key]}40` : "rgba(255,255,255,0.08)",
                      }}
                    >
                      <Icon className="w-4 h-4" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Company Column */}
          <div>
            <h3 className="mb-5 text-xs font-bold tracking-widest uppercase text-white">Company</h3>
            <ul className="space-y-3 text-sm" style={{ color: "rgba(156,163,175,0.8)" }}>
              <li><FooterLink to="/about">About Us</FooterLink></li>
              <li><FooterLink to="/internships">Careers</FooterLink></li>
              <li><FooterLink to="/events">Events</FooterLink></li>
              <li><FooterLink to="/blogs">Blog</FooterLink></li>
            </ul>
          </div>

          {/* Connect Column (dynamic social links) */}
          <div>
            <h3 className="mb-5 text-xs font-bold tracking-widest uppercase text-white">Connect</h3>
            <ul className="space-y-3 text-sm" style={{ color: "rgba(156,163,175,0.8)" }}>
              {activeSocialList.length > 0 ? (
                activeSocialList.map(({ key, url, label }) => (
                  <li key={key}>
                    <FooterLink href={url}>{label}</FooterLink>
                  </li>
                ))
              ) : (
                <li className="text-gray-600 italic text-xs">Coming soon</li>
              )}
              <li><FooterLink to="/contact">Contact Us</FooterLink></li>
              <li><FooterLink to="/faq">FAQ & Support</FooterLink></li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="mb-5 text-xs font-bold tracking-widest uppercase text-white">Legal</h3>
            <ul className="space-y-3 text-sm" style={{ color: "rgba(156,163,175,0.8)" }}>
              <li><FooterLink to="/privacy-policy">Privacy Policy</FooterLink></li>
              <li><FooterLink to="/terms">Terms & Conditions</FooterLink></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="text-sm" style={{ color: "rgba(156,163,175,0.6)" }}>
              © {new Date().getFullYear()}{" "}
              <Link to="/" className="hover:text-white transition-colors">CodeMentees</Link>
              . All rights reserved.
            </span>
            <div
              className="flex flex-col sm:flex-row gap-1 sm:gap-3 text-xs text-center"
              style={{ color: "rgba(107,114,128,0.7)" }}
            >
              <span>👁 Today: {stats.todayVisitors.toLocaleString()}</span>
              <span className="hidden sm:inline">·</span>
              <span>🌐 Total: {stats.totalVisitors.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs" style={{ color: "rgba(107,114,128,0.7)" }}>
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <span>·</span>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;