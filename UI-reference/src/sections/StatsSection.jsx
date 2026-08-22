import { motion } from "framer-motion";
import { BoltIcon, ShieldCheckIcon, ChartBarIcon, UserGroupIcon } from "@heroicons/react/24/outline";

const features = [
    {
        icon: BoltIcon,
        title: "Agentic AI Assistant",
        desc: "Gemini AI agents reason across real company data — not static FAQ docs. Ask anything, get a real answer.",
        accent: "rgba(249,115,22,1)",
        glow: "rgba(249,115,22,0.12)",
        border: "rgba(249,115,22,0.2)",
    },
    {
        icon: ShieldCheckIcon,
        title: "Role-Based Access",
        desc: "Admin, Manager, and Employee roles. HR always controls who sees what, secured with JWT.",
        accent: "rgba(34,211,153,1)",
        glow: "rgba(34,211,153,0.1)",
        border: "rgba(34,211,153,0.18)",
    },
    {
        icon: ChartBarIcon,
        title: "Progress Analytics",
        desc: "Track onboarding completion, due dates, and team-wide progress. Export full audit CSVs.",
        accent: "rgba(99,102,241,1)",
        glow: "rgba(99,102,241,0.1)",
        border: "rgba(99,102,241,0.18)",
    },
    {
        icon: UserGroupIcon,
        title: "HR Course Assignment",
        desc: "Assign specific onboarding paths to employees with deadlines — exactly like real enterprise HR workflows.",
        accent: "rgba(251,191,36,1)",
        glow: "rgba(251,191,36,0.1)",
        border: "rgba(251,191,36,0.18)",
    },
];

export default function StatsSection() {
    return (
        <section className="relative py-24" style={{ background: "rgb(var(--bg))" }}>
            {/* Top divider line */}
            <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(to right, transparent, rgba(249,115,22,0.3), transparent)" }} />

            <div className="max-w-7xl mx-auto px-6 md:px-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-5"
                        style={{ background: "rgba(249,115,22,0.1)", border: "1px solid rgba(249,115,22,0.25)", color: "rgb(249,115,22)" }}>
                        Why OnboardAI
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
                        Built for how real companies work
                    </h2>
                    <p className="max-w-xl text-base leading-relaxed" style={{ color: "rgb(140,140,140)" }}>
                        Not another generic LMS. OnboardAI is purpose-built for enterprise onboarding with AI that
                        actually understands your company's data and policies.
                    </p>
                </motion.div>

                {/* Feature grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {features.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: idx * 0.07 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                                className="p-6 rounded-2xl group cursor-default"
                                style={{ background: "var(--surface)", border: "1px solid rgba(var(--border))", transition: "border-color 0.25s" }}
                                onMouseEnter={e => e.currentTarget.style.borderColor = item.border}
                                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(var(--border))"}
                            >
                                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                                    style={{ background: item.glow, border: `1px solid ${item.border}` }}>
                                    <Icon className="w-5 h-5" style={{ color: item.accent }} />
                                </div>
                                <h3 className="font-bold text-base text-white mb-2">{item.title}</h3>
                                <p className="text-sm leading-relaxed" style={{ color: "rgb(130,130,130)" }}>
                                    {item.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
