import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Wind, Waves, Satellite, ShieldAlert, CloudSun, Navigation2 } from "lucide-react";
import DashboardIllustration from "./DashboardIllustration.jsx";

const chips = [
  { icon: Wind, label: "Wind Speed", value: "14 kt", top: "6%", left: "-6%", delay: 0 },
  { icon: Waves, label: "Wave Height", value: "1.2 m", top: "58%", left: "-10%", delay: 0.4 },
  { icon: Navigation2, label: "GPS Accuracy", value: "±0.8 m", top: "2%", left: "62%", delay: 0.8 },
  { icon: ShieldAlert, label: "Safe Route", value: "Active", top: "78%", left: "68%", delay: 1.2 },
  { icon: CloudSun, label: "Weather", value: "Clear", top: "38%", left: "82%", delay: 1.6 },
  { icon: Satellite, label: "Risk Level", value: "Low", top: "88%", left: "20%", delay: 2 },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden bg-ocean-gradient pt-28 pb-16"
    >
      {/* animated background layers */}
      <div className="absolute inset-0 grid-fade opacity-40" aria-hidden="true" />
      <div className="absolute -top-40 -left-40 w-[32rem] h-[32rem] bg-glow-radial animate-pulse-slow" aria-hidden="true" />
      <div className="absolute -bottom-40 -right-20 w-[36rem] h-[36rem] bg-glow-radial animate-pulse-slow" aria-hidden="true" />

      <div className="absolute bottom-0 left-0 right-0 overflow-hidden opacity-30" aria-hidden="true">
        <svg className="w-[200%] h-24 animate-wave" viewBox="0 0 2400 120" preserveAspectRatio="none">
          <path
            d="M0,60 C150,110 450,10 600,60 C750,110 1050,10 1200,60 C1350,110 1650,10 1800,60 C1950,110 2250,10 2400,60 L2400,120 L0,120 Z"
            fill="#4CC9F0"
          />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse-slow" />
            <span className="readout-label text-white/90">Live AI monitoring · 24×7</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] text-white"
          >
            Navigate the Sea with{" "}
            <span className="shimmer-text">AI-Powered Intelligence</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-6 text-base sm:text-lg text-white/70 max-w-xl leading-relaxed"
          >
            SeaSafe combines artificial intelligence, real-time weather intelligence, satellite
            insights, and emergency response tools to help fishermen, sailors, and maritime
            authorities navigate safely.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button className="btn-ripple group inline-flex items-center gap-2 bg-gradient-to-r from-secondary to-accent text-bgdark font-semibold px-6 py-3.5 rounded-xl shadow-card hover:brightness-110 transition-all">
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="inline-flex items-center gap-2 text-white font-medium px-6 py-3.5 rounded-xl border border-white/20 hover:bg-white/5 transition-colors">
              <PlayCircle className="w-5 h-5" />
              Watch Demo
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="mt-12 flex items-center gap-8"
          >
            {[
              ["10K+", "Safe Journeys"],
              ["98%", "Route Accuracy"],
              ["24×7", "Monitoring"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="readout-value text-2xl text-white">{value}</p>
                <p className="readout-label text-white/50 mt-1">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: dashboard illustration */}
        <div className="relative h-[420px] sm:h-[480px] lg:h-[560px]">
          <DashboardIllustration />

          {chips.map(({ icon: Icon, label, value, top, left, delay }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 + delay * 0.15 }}
              className="hidden sm:flex absolute animate-float items-center gap-2.5 glass rounded-xl px-3.5 py-2.5 shadow-glass"
              style={{ top, left, animationDelay: `${delay}s` }}
            >
              <span className="grid place-items-center w-8 h-8 rounded-lg bg-white/10">
                <Icon className="w-4 h-4 text-accent" strokeWidth={2} />
              </span>
              <span>
                <span className="block readout-label text-white/60">{label}</span>
                <span className="block readout-value text-sm text-white">{value}</span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
