import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from "react-router-dom";
import { useRef } from "react";
import heroPortal from '../assets/hero-portal.png';

const marqueeItems = [
    { icon: "🤖", title: "AI Onboarding Path", company: "Engineering", time: "New" },
    { icon: "🔐", title: "Security & Compliance", company: "HR", time: "Updated" },
    { icon: "💻", title: "Dev Environment Setup", company: "Platform", time: "New" },
    { icon: "📊", title: "Analytics Dashboard Tour", company: "Product", time: "2d ago" },
    { icon: "🏢", title: "Company Culture & Values", company: "People Ops", time: "New" },
    { icon: "🚀", title: "First 90 Days Roadmap", company: "Leadership", time: "1d ago" },
    { icon: "🛡️", title: "Data Privacy Basics", company: "Legal", time: "New" },
    { icon: "🔧", title: "Tools & Access Setup", company: "IT", time: "3d ago" },
];

const MarqueeCard = ({ icon, title, company, time }) => (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl shrink-0"
        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", minWidth: 220 }}>
        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-lg shrink-0"
            style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.2)" }}>
            {icon}
        </div>
        <div>
            <p className="text-sm font-semibold text-white leading-tight">{title}</p>
            <p className="text-xs mt-0.5" style={{ color: "rgb(100,100,100)" }}>{company} · {time}</p>
        </div>
    </div>
);

export default function HeroSection() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
    const imageY = useTransform(scrollYProgress, [0, 1], [0, 60]);
    const textY  = useTransform(scrollYProgress, [0, 1], [0, 30]);

    return (
        <section ref={ref} className="relative overflow-hidden" style={{ background: "rgb(0,0,0)" }}>
            {/* ── Cinematic split layout ── */}
            <div className="relative min-h-[88vh] flex items-center">

                {/* Right image — absolutely positioned, takes right 55% */}
                <motion.div
                    style={{ y: imageY }}
                    className="absolute right-0 top-0 bottom-0 w-full md:w-[58%] pointer-events-none"
                >
                    <img
                        src={heroPortal}
                        alt="AI Gateway"
                        className="w-full h-full object-cover object-center"
                        style={{ opacity: 0.85 }}
                    />
                    {/* Left fade so text is readable */}
                    <div className="absolute inset-0"
                        style={{ background: "linear-gradient(to right, rgb(0,0,0) 0%, rgba(0,0,0,0.85) 30%, rgba(0,0,0,0.3) 60%, transparent 100%)" }} />
                    {/* Bottom fade */}
                    <div className="absolute inset-x-0 bottom-0 h-40"
                        style={{ background: "linear-gradient(to top, rgb(0,0,0), transparent)" }} />
                </motion.div>

                {/* Left text content */}
                <motion.div
                    style={{ y: textY }}
                    className="relative max-w-7xl mx-auto px-6 md:px-10 w-full py-24"
                >
                    <div className="max-w-xl">
                        {/* Eyebrow */}
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-6"
                        >
                            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold"
                                style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.3)", color: "rgb(249,115,22)" }}>
                                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "rgb(249,115,22)" }} />
                                Powered by Gemini AI Agents
                            </span>
                        </motion.div>

                        {/* Giant headline — Protocol style, left-aligned */}
                        <motion.h1
                            initial={{ opacity: 0, y: 28 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.65, delay: 0.07, ease: [0.22, 1, 0.36, 1] }}
                            className="text-5xl md:text-6xl lg:text-7xl font-black leading-none mb-6"
                            style={{ letterSpacing: "-0.04em", color: "#ffffff" }}
                        >
                            The AI Platform
                            <br />
                            Built For New Hires,
                            <br />
                            <span style={{ color: "rgb(249,115,22)" }}>Not HR Software</span>
                        </motion.h1>

                        {/* Subtext */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.15 }}
                            className="text-base md:text-lg leading-relaxed mb-10"
                            style={{ color: "rgba(255,255,255,0.55)", maxWidth: "30rem" }}
                        >
                            OnboardAI uses AI agents to surface company knowledge, guide employees
                            through structured paths, and answer real questions — before the crowd arrives.
                        </motion.p>

                        {/* CTAs — exact Protocol style pills */}
                        <motion.div
                            initial={{ opacity: 0, y: 18 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55, delay: 0.22 }}
                            className="flex flex-wrap gap-4"
                        >
                            <Link to="/signup"
                                className="btn btn-primary relative overflow-hidden group px-7 py-3 text-[0.95rem]">
                                <span className="relative z-10 flex items-center gap-2">
                                    Explore Paths
                                    <motion.span
                                        animate={{ x: [0, 4, 0] }}
                                        transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
                                    >→</motion.span>
                                </span>
                                {/* Shimmer on hover */}
                                <span
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.18) 50%, transparent 60%)", animation: "none" }}
                                />
                            </Link>

                            <Link to="/courses"
                                className="btn btn-secondary px-7 py-3 text-[0.95rem]">
                                See How It Works →
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            {/* ── Scrolling ticker — Protocol's bottom job strip ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.6 }}
                className="relative border-t overflow-hidden"
                style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(6,6,6,0.95)", backdropFilter: "blur(10px)" }}
            >
                <div className="flex overflow-hidden py-3.5">
                    <div className="marquee-track">
                        {[...marqueeItems, ...marqueeItems].map((item, i) => (
                            <MarqueeCard key={i} {...item} />
                        ))}
                    </div>
                </div>

                {/* Fade edges */}
                <div className="absolute inset-y-0 left-0 w-28 pointer-events-none z-10"
                    style={{ background: "linear-gradient(to right, rgb(0,0,0), transparent)" }} />
                <div className="absolute inset-y-0 right-0 w-28 pointer-events-none z-10"
                    style={{ background: "linear-gradient(to left, rgb(0,0,0), transparent)" }} />
            </motion.div>
        </section>
    );
}