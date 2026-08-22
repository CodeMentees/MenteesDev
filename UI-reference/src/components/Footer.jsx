import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer style={{ background: "rgb(var(--bg))", borderTop: "1px solid rgba(var(--border))" }}>
            <div className="max-w-7xl mx-auto px-6 md:px-10 py-14 grid gap-10 md:grid-cols-4">
                {/* Brand */}
                <div className="md:col-span-1">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-7 h-7 rounded-md flex items-center justify-center text-black text-sm font-black"
                            style={{ background: "rgb(249,115,22)" }}>O</span>
                        <span className="text-xl font-black text-white tracking-tight">OnboardAI</span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "rgb(100,100,100)" }}>
                        AI-powered corporate onboarding. Ramp up new hires faster with structured paths and intelligent AI assistance.
                    </p>
                </div>

                {/* Platform */}
                <div>
                    <h3 className="text-sm font-bold text-white mb-4">Platform</h3>
                    <ul className="space-y-3 text-sm" style={{ color: "rgb(100,100,100)" }}>
                        <li><Link to="/courses" className="hover:text-white transition-colors">Onboarding Paths</Link></li>
                        <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                        <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                        <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                    </ul>
                </div>

                {/* Paths */}
                <div>
                    <h3 className="text-sm font-bold text-white mb-4">Onboarding Areas</h3>
                    <ul className="space-y-3 text-sm" style={{ color: "rgb(100,100,100)" }}>
                        <li>Technical Setup</li>
                        <li>HR &amp; Compliance</li>
                        <li>Security Practices</li>
                        <li>Company Culture</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-sm font-bold text-white mb-4">Get Started</h3>
                    <ul className="space-y-3 text-sm" style={{ color: "rgb(100,100,100)" }}>
                        <li>support@onboardai.com</li>
                        <li>India</li>
                        <li className="pt-2">
                            <Link to="/signup" className="btn btn-primary text-sm py-2 px-5 inline-flex">
                                Explore Paths →
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom bar */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                <div className="max-w-7xl mx-auto px-6 md:px-10 py-4 flex flex-col md:flex-row justify-between items-center gap-2">
                    <p className="text-xs" style={{ color: "rgb(70,70,70)" }}>
                        © {new Date().getFullYear()} OnboardAI. All rights reserved.
                    </p>
                    <div className="flex gap-5 text-xs" style={{ color: "rgb(70,70,70)" }}>
                        <Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}