import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

export default function ProfileDropdown({ user, logout }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    // Close on outside click
    useEffect(() => {
        if (!open) return;
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        };
        const t = setTimeout(() => document.addEventListener("mousedown", handler), 50);
        return () => { clearTimeout(t); document.removeEventListener("mousedown", handler); };
    }, [open]);

    const initial = user.name.charAt(0).toUpperCase();

    return (
        <div className="relative" ref={ref}>
            {/* Avatar — always orange bg + white letter, visible on any Navbar bg */}
            <button
                onClick={() => setOpen(prev => !prev)}
                className="w-9 h-9 rounded-full flex items-center justify-center font-black text-sm text-white transition-transform hover:scale-105 active:scale-95"
                style={{
                    background: "linear-gradient(135deg, rgb(249,115,22), rgb(234,88,12))",
                    boxShadow: "0 2px 10px rgba(249,115,22,0.4)",
                }}
                aria-label="Open profile menu"
            >
                {initial}
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.97 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 rounded-xl shadow-2xl z-50 overflow-hidden"
                        style={{
                            background: "rgb(12,12,12)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
                        }}
                    >
                        {/* User info */}
                        <div className="px-4 py-3 flex items-center gap-3"
                            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                            <div className="w-9 h-9 rounded-full shrink-0 flex items-center justify-center font-black text-sm text-white"
                                style={{ background: "linear-gradient(135deg, rgb(249,115,22), rgb(234,88,12))" }}>
                                {initial}
                            </div>
                            <div className="min-w-0">
                                <p className="font-bold text-sm text-white truncate">{user.name}</p>
                                <p className="text-[11px] truncate" style={{ color: "rgb(120,120,120)" }}>{user.email}</p>
                            </div>
                        </div>

                        {/* Role badge */}
                        <div className="px-4 py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
                            <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                                style={{ background: "rgba(249,115,22,0.15)", color: "rgb(249,115,22)", border: "1px solid rgba(249,115,22,0.25)" }}>
                                {user.role || "employee"}
                            </span>
                        </div>

                        {/* Links */}
                        <div className="p-1.5 space-y-0.5">
                            <Link
                                to="/dashboard"
                                onClick={() => setOpen(false)}
                                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors"
                                style={{ color: "rgb(180,180,180)" }}
                                onMouseEnter={e => e.currentTarget.style.background = "rgba(249,115,22,0.08)"}
                                onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                            >
                                <span>🏠</span> Dashboard
                            </Link>

                            {user.role === "mentor" && (
                                <Link
                                    to="/dashboard/mentor"
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors"
                                    style={{ color: "rgb(180,180,180)" }}
                                    onMouseEnter={e => e.currentTarget.style.background = "rgba(249,115,22,0.08)"}
                                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                                >
                                    <span>🎓</span> Mentor Panel
                                </Link>
                            )}

                            {user.role === "admin" && (
                                <Link
                                    to="/dashboard/admin"
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors"
                                    style={{ color: "rgb(180,180,180)" }}
                                    onMouseEnter={e => e.currentTarget.style.background = "rgba(249,115,22,0.08)"}
                                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                                >
                                    <span>⚙️</span> Admin Panel
                                </Link>
                            )}

                            <div className="pt-1" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                                <button
                                    onClick={() => { logout(); setOpen(false); }}
                                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left"
                                    style={{ color: "rgb(220,80,60)" }}
                                    onMouseEnter={e => e.currentTarget.style.background = "rgba(220,80,60,0.08)"}
                                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                                >
                                    <span>🚪</span> Logout
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}