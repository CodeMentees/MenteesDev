import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../../Slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";

/** Animated hamburger icon */
const MenuIcon = ({ open }) => (
  <div className="relative w-6 h-6">
    <span className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${open ? "rotate-45 top-3" : "top-1"}`} />
    <span className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${open ? "opacity-0 top-3" : "top-3"}`} />
    <span className={`absolute h-0.5 w-6 bg-current transition-all duration-300 ${open ? "-rotate-45 top-3" : "top-5"}`} />
  </div>
);

const menuItems = [
  { label: "All Courses", link: "/courses" },
  { label: "Blogs", link: "/blogs" },
  { label: "Live Courses", link: "/live" },
  { label: "School Coding", link: "/school-coding" },
  { label: "Placement Support", link: "/placement-support" },
];

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", { method: "POST" });
      if (response.ok) {
        dispatch(logout());
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      dispatch(logout());
    }
    setMenuOpen(false);
  };

  return (
    <>
      {/* ── Glassmorphism Navbar ── */}
      <header
        className="fixed top-0 z-50 w-full"
        style={{
          background: "rgba(2,21,38,0.85)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <nav className="px-4 lg:px-6 py-3">
          <div className="flex items-center justify-between mx-auto max-w-screen-xl">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 text-xl font-black tracking-tight">
              <span
                className="w-7 h-7 rounded-md flex items-center justify-center text-white text-sm font-black"
                style={{ background: "rgb(var(--accent))" }}
              >
                C
              </span>
              <span style={{ fontFamily: "Playwrite IT Moderna, cursive", color: "#CD0094" }}>
                Codementees
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex lg:items-center lg:gap-6">
              {menuItems.map((item) => (
                <Link
                  key={item.link}
                  to={item.link}
                  className="text-sm font-medium transition-colors duration-200"
                  style={{
                    color: isActive(item.link) ? "rgb(var(--accent))" : "rgb(160,160,160)",
                  }}
                  onMouseEnter={(e) => { if (!isActive(item.link)) e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { if (!isActive(item.link)) e.currentTarget.style.color = "rgb(160,160,160)"; }}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop auth buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {user?.isAdmin && (
                <Link
                  to="/admin"
                  className="px-4 py-2 rounded-full text-sm font-semibold transition text-white"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  Dashboard
                </Link>
              )}

              {isAuthenticated ? (
                <>
                  <div className="relative">
                    <FaUserCircle className="text-2xl cursor-pointer" style={{ color: "rgb(160,160,160)" }} />
                  </div>
                  <button
                    onClick={handleLogout}
                    className="btn btn-secondary text-sm py-2 px-5"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="text-sm font-medium transition-colors duration-200 hover:text-white"
                    style={{ color: "rgb(160,160,160)" }}
                  >
                    Log in
                  </Link>
                  <Link to="/register" className="btn btn-primary text-sm py-2 px-5">
                    Get Started →
                  </Link>
                </>
              )}
            </div>

            {/* Mobile burger */}
            <div className="lg:hidden flex items-center gap-3">
              {user?.isAdmin && (
                <Link
                  to="/admin"
                  className="px-3 py-1.5 rounded-full text-sm font-semibold text-white"
                  style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
                >
                  Dashboard
                </Link>
              )}
              <button
                type="button"
                onClick={() => setMenuOpen((p) => !p)}
                className="text-white p-1"
                aria-label="Toggle menu"
              >
                <MenuIcon open={menuOpen} />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* ── Mobile drawer ── */}
      {menuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setMenuOpen(false)}
          />
          {/* Drawer */}
          <div
            className="fixed top-[57px] right-0 h-[calc(100%-57px)] w-72 z-[60] lg:hidden overflow-y-auto animate-slideIn"
            style={{ background: "rgb(3,20,40)", borderLeft: "1px solid rgba(255,255,255,0.07)" }}
          >
            <div
              className="px-6 py-6 flex flex-col gap-4 text-sm font-medium"
              style={{ color: "rgb(150,150,150)" }}
            >
              {/* User info if logged in */}
              {isAuthenticated && user && (
                <div
                  className="flex items-center gap-3 pb-4 border-b"
                  style={{ borderColor: "rgba(255,255,255,0.07)" }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white text-base"
                    style={{ background: "rgb(var(--accent))" }}
                  >
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{user.name}</p>
                    <p className="text-xs opacity-50">{user.email}</p>
                  </div>
                </div>
              )}

              {/* Nav links */}
              {menuItems.map((item) => (
                <Link
                  key={item.link}
                  to={item.link}
                  onClick={() => setMenuOpen(false)}
                  className="hover:text-white transition-colors duration-200"
                  style={{ color: isActive(item.link) ? "rgb(var(--accent))" : "rgb(150,150,150)" }}
                >
                  {item.label}
                </Link>
              ))}

              {/* Auth */}
              <div
                className="pt-4 flex flex-col gap-3 border-t"
                style={{ borderColor: "rgba(255,255,255,0.07)" }}
              >
                {isAuthenticated ? (
                  <button
                    onClick={handleLogout}
                    className="btn btn-secondary w-full justify-center text-sm"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMenuOpen(false)}
                      className="hover:text-white transition-colors"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMenuOpen(false)}
                      className="btn btn-primary text-center text-sm"
                    >
                      Get Started →
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Header;