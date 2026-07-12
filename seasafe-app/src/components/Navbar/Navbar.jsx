import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Compass, Menu, X, LogOut, User, Shield } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Safety Dashboard", href: "#dashboard" },
  { label: "Weather", href: "#map" },
  { label: "Community", href: "#testimonials" },
  { label: "About", href: "#how-it-works" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "py-2" : "py-4"
      }`}
    >
      <nav
        className={`mx-auto flex items-center justify-between rounded-2xl px-5 transition-all duration-300 max-w-7xl ${
          scrolled
            ? "bg-bgdark/70 backdrop-blur-xl border border-white/10 shadow-glass py-2 mx-4"
            : "bg-transparent py-3 mx-4"
        }`}
      >
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-secondary to-accent shadow-card">
            <Compass className="w-5 h-5 text-bgdark" strokeWidth={2.5} />
          </span>
          <span className="font-display font-bold text-lg tracking-tight text-white">
            Sea<span className="text-accent">Safe</span>
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="px-3 py-2 text-sm text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
          {user && (
            <li>
              <Link
                to="/dashboard"
                className="px-3 py-2 text-sm text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                Dashboard
              </Link>
            </li>
          )}
          {user?.role === "admin" && (
            <li>
              <Link
                to="/admin"
                className="px-3 py-2 text-sm text-accent/80 hover:text-accent rounded-lg hover:bg-accent/5 transition-colors flex items-center gap-1"
              >
                <Shield className="w-3 h-3" /> Admin
              </Link>
            </li>
          )}
        </ul>

        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm text-white/60 flex items-center gap-1.5">
                <User className="w-4 h-4" /> {user.name}
              </span>
              <button
                onClick={handleLogout}
                className="text-sm font-medium text-white/80 hover:text-white px-4 py-2 rounded-lg border border-white/20 hover:bg-white/5 transition-colors flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-white/85 hover:text-white px-4 py-2 rounded-lg transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="btn-ripple text-sm font-semibold text-bgdark bg-gradient-to-r from-secondary to-accent px-5 py-2.5 rounded-lg shadow-card hover:brightness-110 transition-all"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        <button
          className="lg:hidden text-white p-2"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X className="w-6 h-6" />
              </motion.span>
            ) : (
              <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu className="w-6 h-6" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden mx-4 mt-2 rounded-2xl bg-bgdark/95 backdrop-blur-xl border border-white/10 shadow-glass"
          >
            <ul className="flex flex-col p-3">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 text-white/85 hover:text-white hover:bg-white/5 rounded-lg text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {user && (
                <li>
                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 text-white/85 hover:text-white hover:bg-white/5 rounded-lg text-sm"
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              {user?.role === "admin" && (
                <li>
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="block px-4 py-3 text-accent hover:text-white hover:bg-white/5 rounded-lg text-sm flex items-center gap-1"
                  >
                    <Shield className="w-3 h-3" /> Admin Dashboard
                  </Link>
                </li>
              )}
              <div className="flex flex-col gap-2 p-3 pt-2">
                {user ? (
                  <>
                    <span className="text-sm text-white/60 text-center">{user.name}</span>
                    <button
                      onClick={handleLogout}
                      className="w-full text-sm font-medium text-white border border-white/20 py-2.5 rounded-lg flex items-center justify-center gap-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setOpen(false)}
                      className="w-full text-sm font-medium text-white border border-white/20 py-2.5 rounded-lg text-center"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setOpen(false)}
                      className="w-full text-sm font-semibold text-bgdark bg-gradient-to-r from-secondary to-accent py-2.5 rounded-lg text-center"
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
