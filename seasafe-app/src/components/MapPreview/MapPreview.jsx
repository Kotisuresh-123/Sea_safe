import { motion } from "framer-motion";
import { Ship, AlertTriangle, CloudRain, Satellite } from "lucide-react";
import Reveal from "../Reveal.jsx";

const SHIPS = [
  { top: "28%", left: "22%" },
  { top: "55%", left: "40%" },
  { top: "40%", left: "68%" },
  { top: "70%", left: "76%" },
];

export default function MapPreview() {
  return (
    <section id="map" className="py-24 bg-bglight">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="max-w-2xl mx-auto text-center mb-14">
          <p className="readout-label text-primary/70 justify-center flex">Live Chart</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-inktext">
            See the water before you sail into it
          </h2>
          <p className="mt-4 text-inktext/60 leading-relaxed">
            A preview of the maritime map — routes, hazards, weather overlays, and vessel
            positions, all in one view. Interface preview only.
          </p>
        </Reveal>

        <Reveal>
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-card bg-[#04283d] aspect-[16/9]">
            <div className="absolute inset-0 grid-fade opacity-60" aria-hidden="true" />

            {/* safe route */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 56" preserveAspectRatio="none">
              <path
                d="M10,42 C25,30 30,20 48,18 C62,16 70,30 88,14"
                fill="none"
                stroke="#4CC9F0"
                strokeWidth="0.6"
                strokeDasharray="1 2.5"
              />
              <circle cx="58" cy="34" r="6" fill="#F87171" fillOpacity="0.15" stroke="#F87171" strokeOpacity="0.5" strokeWidth="0.4" strokeDasharray="1 1" />
            </svg>

            {SHIPS.map((pos, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={pos}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="grid place-items-center w-8 h-8 rounded-full bg-primary/20 border border-secondary/50">
                  <Ship className="w-4 h-4 text-accent" />
                </span>
              </motion.div>
            ))}

            <div className="absolute" style={{ top: "38%", left: "56%" }}>
              <span className="grid place-items-center w-10 h-10 rounded-full bg-red-500/15 border border-red-400/50 animate-pulse-slow">
                <AlertTriangle className="w-4 h-4 text-red-300" />
              </span>
            </div>

            <div className="absolute" style={{ top: "18%", left: "72%" }}>
              <span className="grid place-items-center w-9 h-9 rounded-full bg-white/10 border border-white/20">
                <CloudRain className="w-4 h-4 text-white/80" />
              </span>
            </div>

            <div className="absolute" style={{ top: "12%", left: "12%" }}>
              <span className="grid place-items-center w-9 h-9 rounded-full bg-white/10 border border-white/20">
                <Satellite className="w-4 h-4 text-accent" />
              </span>
            </div>

            <div className="absolute top-4 left-4 glass rounded-lg px-3 py-2 text-white flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
              <span className="readout-label text-white/80">GPS tracking active</span>
            </div>

            <div className="absolute bottom-4 right-4 flex gap-2">
              {["Routes", "Hazards", "Weather"].map((tag) => (
                <span key={tag} className="glass rounded-full px-3 py-1.5 text-xs text-white/80">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
