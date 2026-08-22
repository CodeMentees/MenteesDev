import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getEnrolledCourses } from "../../services/courseService";
import { motion } from "framer-motion";

const StatCard = ({ label, value, icon, color, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay }}
        className="stat-card"
    >
        <div className="flex items-center justify-between mb-3">
            <span className="text-2xl">{icon}</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: `${color}18`, color }}>
                Live
            </span>
        </div>
        <p className="stat-number">{value}</p>
        <p className="text-sm mt-1" style={{ color: "rgb(var(--dash-muted))" }}>{label}</p>
    </motion.div>
);

const QuickLink = ({ to, icon, label, desc }) => (
    <Link to={to}
        className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group"
        style={{ border: "1px solid rgba(var(--dash-border))", background: "rgb(var(--dash-panel))" }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(249,115,22,0.3)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(var(--dash-border))"; e.currentTarget.style.transform = "translateY(0)"; }}
    >
        <span className="text-2xl">{icon}</span>
        <div>
            <p className="font-bold text-sm" style={{ color: "rgb(var(--dash-ink))" }}>{label}</p>
            <p className="text-xs mt-0.5" style={{ color: "rgb(var(--dash-muted))" }}>{desc}</p>
        </div>
        <span className="ml-auto opacity-40 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200"
            style={{ color: "rgb(249,115,22)" }}>→</span>
    </Link>
);

export default function DashboardHome() {
    const { user } = useAuth();
    const [enrollments, setEnrollments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user?.role === "user") {
            setLoading(true);
            getEnrolledCourses()
                .then(d => setEnrollments(d.enrollments || []))
                .catch(() => {})
                .finally(() => setLoading(false));
        }
    }, [user]);

    const completedCount = enrollments.filter(e => {
        const course = e.course;
        if (!course) return false;
        const total = (course.syllabus?.length || 0) + (course.content?.length || 0);
        if (total === 0) return false;
        const key = `onboardai_progress_${user?._id || user?.id}_${course._id}`;
        try {
            const ids = JSON.parse(localStorage.getItem(key) || "[]");
            return ids.length >= total;
        } catch { return false; }
    }).length;

    const roleLinks = {
        user: [
            { to: "/dashboard/student", icon: "📚", label: "My Training", desc: "View your assigned onboarding paths" },
            { to: "/courses", icon: "🔍", label: "Browse Paths", desc: "Explore all available onboarding modules" },
        ],
        mentor: [
            { to: "/dashboard/mentor", icon: "🎓", label: "Manage Paths", desc: "Create and manage onboarding content" },
            { to: "/dashboard/knowledge", icon: "🧠", label: "Knowledge Base", desc: "Upload policies and company documents" },
        ],
        admin: [
            { to: "/dashboard/admin", icon: "⚙️", label: "Operations Hub", desc: "Assign paths, manage users and courses" },
            { to: "/dashboard/analytics", icon: "📊", label: "Analytics", desc: "Track onboarding completion across teams" },
            { to: "/dashboard/knowledge", icon: "🧠", label: "Knowledge Base", desc: "Upload and manage company documents" },
            { to: "/dashboard/mentor", icon: "🎓", label: "Manage Paths", desc: "Create and review onboarding content" },
        ],
    };

    const links = roleLinks[user?.role] || roleLinks.user;

    return (
        <div className="space-y-8 fade-in">
            {/* Greeting banner */}
            <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-2xl p-6 relative overflow-hidden"
                style={{ background: "linear-gradient(135deg, rgba(249,115,22,0.12) 0%, rgba(249,115,22,0.04) 100%)", border: "1px solid rgba(249,115,22,0.2)" }}
            >
                <div className="absolute right-4 top-4 text-5xl opacity-20 select-none">🚀</div>
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "rgb(249,115,22)" }}>
                    Dashboard Overview
                </p>
                <h2 className="text-2xl font-black mb-1" style={{ color: "rgb(var(--dash-ink))" }}>
                    Good to see you, {user?.name?.split(" ")[0]}!
                </h2>
                <p className="text-sm" style={{ color: "rgb(var(--dash-muted))" }}>
                    {user?.role === "user"
                        ? `You have ${enrollments.length} onboarding path${enrollments.length !== 1 ? "s" : ""} assigned.`
                        : user?.role === "admin"
                            ? "Manage your team's onboarding from here."
                            : "Create and manage onboarding content for your team."}
                </p>
            </motion.div>

            {/* Stats — only for employees */}
            {user?.role === "user" && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <StatCard label="Assigned Paths" value={loading ? "—" : enrollments.length} icon="📋" color="rgb(249,115,22)" delay={0.05} />
                    <StatCard label="Completed" value={loading ? "—" : completedCount} icon="✅" color="rgb(34,197,94)" delay={0.1} />
                    <StatCard label="In Progress" value={loading ? "—" : enrollments.length - completedCount} icon="⚡" color="rgb(99,102,241)" delay={0.15} />
                </div>
            )}

            {/* Quick navigation */}
            <div>
                <h3 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: "rgb(var(--dash-muted))" }}>
                    Quick Access
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                    {links.map((l, i) => (
                        <motion.div
                            key={l.to}
                            initial={{ opacity: 0, x: -12 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.35, delay: 0.1 + i * 0.06 }}
                        >
                            <QuickLink {...l} />
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Recent enrollments preview — employee only */}
            {user?.role === "user" && !loading && enrollments.length > 0 && (
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest" style={{ color: "rgb(var(--dash-muted))" }}>
                            Active Paths
                        </h3>
                        <Link to="/dashboard/student" className="text-xs font-bold transition-colors"
                            style={{ color: "rgb(249,115,22)" }}>
                            View all →
                        </Link>
                    </div>
                    <div className="space-y-3">
                        {enrollments.slice(0, 3).map((e, i) => {
                            const course = e.course;
                            if (!course) return null;
                            const total = (course.syllabus?.length || 0) + (course.content?.length || 0);
                            const key = `onboardai_progress_${user?._id || user?.id}_${course._id}`;
                            let pct = 0;
                            try {
                                const ids = JSON.parse(localStorage.getItem(key) || "[]");
                                pct = total > 0 ? Math.round((ids.length / total) * 100) : 0;
                            } catch { }

                            return (
                                <motion.div key={e._id}
                                    initial={{ opacity: 0, y: 8 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.05 }}
                                    className="flex items-center gap-4 p-4 rounded-xl"
                                    style={{ background: "rgb(var(--dash-panel))", border: "1px solid rgba(var(--dash-border))" }}
                                >
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-sm truncate" style={{ color: "rgb(var(--dash-ink))" }}>{course.title}</p>
                                        <div className="flex items-center gap-3 mt-1.5">
                                            <div className="flex-1 h-1.5 rounded-full" style={{ background: "rgba(var(--dash-border))" }}>
                                                <div className="h-1.5 rounded-full transition-all"
                                                    style={{ width: `${pct}%`, background: pct === 100 ? "rgb(34,197,94)" : "rgb(249,115,22)" }} />
                                            </div>
                                            <span className="text-xs font-bold shrink-0"
                                                style={{ color: pct === 100 ? "rgb(34,197,94)" : "rgb(249,115,22)" }}>
                                                {pct}%
                                            </span>
                                        </div>
                                    </div>
                                    <Link to={`/dashboard/student/course/${course._id}`}
                                        className="text-xs font-bold px-3 py-1.5 rounded-full shrink-0 transition-all"
                                        style={{ background: "rgba(249,115,22,0.1)", color: "rgb(249,115,22)", border: "1px solid rgba(249,115,22,0.2)" }}>
                                        {pct === 100 ? "Review" : "Continue"}
                                    </Link>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}