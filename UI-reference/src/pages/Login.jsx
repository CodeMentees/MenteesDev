import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService.js";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";

const Field = ({ label, id, ...props }) => (
    <div>
        <label htmlFor={id} className="text-xs font-bold uppercase tracking-widest block mb-2"
            style={{ color: "rgb(100,100,100)" }}>
            {label}
        </label>
        <input id={id} {...props}
            style={{ background: "rgb(16,16,16)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", borderRadius: "0.625rem", padding: "0.7rem 0.875rem", width: "100%", fontSize: "0.9rem", outline: "none" }}
            onFocus={e => e.target.style.borderColor = "rgb(249,115,22)"}
            onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
        />
    </div>
);

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const data = await loginUser({ email: form.email, password: form.password });
            if (data?.token) {
                login(data.user, data.token);
                navigate("/dashboard");
            } else {
                setError(data?.message || "Login failed");
            }
        } catch (err) {
            setError(err.message || "Something went wrong");
        }
        setLoading(false);
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
            style={{ background: "rgb(0,0,0)" }}>
            {/* Orange glow behind form */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full pointer-events-none"
                style={{ background: "radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)", filter: "blur(60px)" }} />

            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10 w-full max-w-md"
            >
                {/* Card */}
                <div className="rounded-2xl p-8"
                    style={{ background: "rgb(10,10,10)", border: "1px solid rgba(255,255,255,0.09)" }}>

                    {/* Logo mark */}
                    <div className="flex items-center gap-2 mb-8">
                        <span className="w-8 h-8 rounded-lg flex items-center justify-center text-black font-black text-sm"
                            style={{ background: "rgb(249,115,22)" }}>O</span>
                        <span className="font-black text-lg text-white tracking-tight">OnboardAI</span>
                    </div>

                    <h2 className="text-2xl font-black text-white mb-1">Welcome back</h2>
                    <p className="text-sm mb-8" style={{ color: "rgb(110,110,110)" }}>
                        Sign in to your account to continue
                    </p>

                    {error && (
                        <div className="mb-5 px-4 py-3 rounded-xl text-sm font-medium"
                            style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", color: "rgb(252,129,129)" }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Field label="Email address" id="email" type="email" name="email"
                            required value={form.email} onChange={handleChange}
                            placeholder="you@company.com" />
                        <Field label="Password" id="password" type="password" name="password"
                            required value={form.password} onChange={handleChange}
                            placeholder="••••••••" />

                        <button type="submit" disabled={loading}
                            className="btn btn-primary w-full justify-center mt-2 text-sm py-3"
                            style={{ borderRadius: "0.625rem", marginTop: "1.5rem" }}>
                            {loading ? "Signing in..." : "Sign In →"}
                        </button>
                    </form>

                    <p className="text-sm text-center mt-6" style={{ color: "rgb(90,90,90)" }}>
                        No account yet?{" "}
                        <Link to="/signup" className="font-semibold transition-colors"
                            style={{ color: "rgb(249,115,22)" }}
                            onMouseEnter={e => e.currentTarget.style.color = "rgb(234,88,12)"}
                            onMouseLeave={e => e.currentTarget.style.color = "rgb(249,115,22)"}>
                            Create one free
                        </Link>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}