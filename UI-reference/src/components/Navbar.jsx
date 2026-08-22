import { Link } from "react-router-dom";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "../hooks/useTheme";
import { useAuth } from "../hooks/useAuth";
import ProfileDropdown from "./ProfileDropdown";

const MenuIcon = ({ open }) => (
  <div className="relative w-6 h-6">
    <span className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${open ? "rotate-45 top-3" : "top-1"}`} />
    <span className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${open ? "opacity-0 top-3" : "top-3"}`} />
    <span className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${open ? "-rotate-45 top-3" : "top-5"}`} />
  </div>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <>
      {/* Navbar — transparent on black, exactly like Protocol */}
      <nav className="sticky top-0 z-50"
        style={{ background: "rgba(0,0,0,0.75)", borderBottom: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(16px)" }}>
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-10 py-4">

          {/* Logo — white with P icon style */}
          <Link to="/" className="flex items-center gap-2 text-xl font-black tracking-tight text-white">
            <span className="w-7 h-7 rounded-md flex items-center justify-center text-black text-sm font-black"
              style={{ background: "rgb(249,115,22)" }}>
              O
            </span>
            OnboardAI
          </Link>

          {/* Desktop nav links — muted white like Protocol */}
          <div className="hidden md:flex gap-8 text-sm font-medium" style={{ color: "rgb(160,160,160)" }}>
            <Link className="hover:text-white transition-colors duration-200" to="/courses">Onboarding Paths</Link>
            <Link className="hover:text-white transition-colors duration-200" to="/about">About Us</Link>
            <Link className="hover:text-white transition-colors duration-200" to="/contact">Contact</Link>
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex gap-3 items-center">
            {/* Premium theme toggle pill */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="relative flex items-center gap-1 p-1 rounded-full transition-colors duration-300"
              style={{
                background: theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(249,115,22,0.12)',
                border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(249,115,22,0.3)',
                width: 64, height: 32,
              }}
            >
              {/* Sliding knob */}
              <motion.span
                layout
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute flex items-center justify-center w-6 h-6 rounded-full text-xs"
                style={{
                  background: theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgb(249,115,22)',
                  left: theme === 'dark' ? 4 : 36,
                  boxShadow: theme === 'dark' ? 'none' : '0 2px 8px rgba(249,115,22,0.45)',
                }}
              >
                {theme === 'dark' ? '🌙' : '☀️'}
              </motion.span>
            </button>

            {user ? (
              <>
                <Link to="/dashboard"
                  className="px-4 py-2 rounded-full text-sm font-semibold transition text-white"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                  Dashboard
                </Link>
                <ProfileDropdown user={user} logout={logout} />
              </>
            ) : (
              <>
                <Link to="/login"
                  className="text-sm font-medium transition hover:text-white"
                  style={{ color: "rgb(160,160,160)" }}>
                  Login
                </Link>
                {/* Orange pill CTA — exactly Protocol's "Explore Jobs" button */}
                <Link to="/signup" className="btn btn-primary text-sm py-2 px-5">
                  Explore Paths →
                </Link>
              </>
            )}
          </div>

          {/* Mobile burger */}
          <div className="md:hidden flex items-center gap-3">
            {user && (
              <Link to="/dashboard"
                className="px-3 py-1.5 rounded-full text-sm font-semibold text-white"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
                Dashboard
              </Link>
            )}
            <button onClick={() => setIsOpen(p => !p)} aria-label="Open Menu" className="text-white">
              <MenuIcon open={isOpen} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 z-40 md:hidden"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed top-[65px] right-0 h-[calc(100%-65px)] w-72 z-[60] md:hidden overflow-y-auto"
              style={{ background: "rgb(10,10,10)", borderLeft: "1px solid rgba(255,255,255,0.07)" }}
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ duration: 0.26, ease: "easeOut" }}
            >
              <div className="px-6 py-6 flex flex-col gap-5 text-sm font-medium" style={{ color: "rgb(150,150,150)" }}>
                {user && (
                  <div className="flex items-center gap-3 pb-4 border-b" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                    <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-base"
                      style={{ background: "rgb(249,115,22)" }}>
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-white">{user.name}</p>
                      <p className="text-xs opacity-50">{user.email}</p>
                    </div>
                  </div>
                )}

                {user && (
                  <>
                    <Link onClick={() => setIsOpen(false)} to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
                    {user.role === "mentor" && (
                      <Link onClick={() => setIsOpen(false)} to="/dashboard/mentor" className="hover:text-white transition-colors">Mentor Panel</Link>
                    )}
                    {user.role === "admin" && (
                      <Link onClick={() => setIsOpen(false)} to="/dashboard/admin" className="hover:text-white transition-colors">Admin Panel</Link>
                    )}
                  </>
                )}

                <Link onClick={() => setIsOpen(false)} to="/courses" className="hover:text-white transition-colors">Onboarding Paths</Link>
                <Link onClick={() => setIsOpen(false)} to="/about" className="hover:text-white transition-colors">About Us</Link>
                <Link onClick={() => setIsOpen(false)} to="/contact" className="hover:text-white transition-colors">Contact</Link>

                <div className="flex items-center justify-between">
                  <span className="text-sm" style={{ color: "rgb(150,150,150)" }}>Theme</span>
                  <button
                    onClick={toggleTheme}
                    aria-label="Toggle theme"
                    className="relative flex items-center p-1 rounded-full transition-colors duration-300"
                    style={{
                      background: theme === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(249,115,22,0.15)',
                      border: theme === 'dark' ? '1px solid rgba(255,255,255,0.12)' : '1px solid rgba(249,115,22,0.3)',
                      width: 64, height: 32,
                    }}
                  >
                    <motion.span
                      layout
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      className="absolute flex items-center justify-center w-6 h-6 rounded-full text-xs"
                      style={{
                        background: theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgb(249,115,22)',
                        left: theme === 'dark' ? 4 : 36,
                        boxShadow: theme === 'dark' ? 'none' : '0 2px 8px rgba(249,115,22,0.45)',
                      }}
                    >
                      {theme === 'dark' ? '🌙' : '☀️'}
                    </motion.span>
                  </button>
                </div>

                {user ? (
                  <button onClick={() => { logout(); setIsOpen(false); }}
                    className="btn btn-secondary w-full justify-center mt-2 text-sm">
                    Logout
                  </button>
                ) : (
                  <div className="pt-4 flex flex-col gap-3 border-t" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                    <Link onClick={() => setIsOpen(false)} to="/login" className="hover:text-white transition-colors">Login</Link>
                    <Link onClick={() => setIsOpen(false)} to="/signup" className="btn btn-primary text-center text-sm">
                      Explore Paths →
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
