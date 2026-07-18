import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Compass, User, Phone } from "lucide-react";
import { useAuth } from "../../context/AuthContext.jsx";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // await register(name, email, password, phone);
      // navigate("/dashboard");
      await register(name, email, password, phone);
      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ocean-gradient px-4 py-12">
      <div className="absolute inset-0 grid-fade opacity-40" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md glass rounded-3xl p-8 shadow-glass"
      >
        <div className="flex items-center justify-center gap-2 mb-8">
          <span className="grid place-items-center w-10 h-10 rounded-xl bg-gradient-to-br from-secondary to-accent shadow-card">
            <Compass className="w-5 h-5 text-bgdark" strokeWidth={2.5} />
          </span>
          <span className="font-display font-bold text-xl text-white">
            Sea<span className="text-accent">Safe</span>
          </span>
        </div>

        <h2 className="text-2xl font-bold text-white text-center mb-2">Create Account</h2>
        <p className="text-white/60 text-center text-sm mb-6">Join the marine safety community</p>

        {error && (
          <div className="bg-red-500/20 border border-red-500/30 rounded-xl px-4 py-3 mb-4 text-red-300 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-white/10 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-white/10 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="tel"
              placeholder="Phone number (optional)"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full bg-white/10 border border-white/15 rounded-xl pl-10 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password (min 6 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-white/10 border border-white/15 rounded-xl pl-10 pr-12 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-ripple bg-gradient-to-r from-secondary to-accent text-bgdark font-semibold py-3.5 rounded-xl shadow-card hover:brightness-110 transition-all disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-white/50 text-sm text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-accent hover:text-white transition-colors">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
