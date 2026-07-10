import { motion } from "framer-motion";
import { CloudSun, Waves, Wind, Eye, Ship, Gauge, Siren, Route } from "lucide-react";
import Reveal from "../Reveal.jsx";

const swellData = [40, 55, 35, 70, 50, 65, 45, 60, 38, 72, 55, 48];

function ProgressRing({ value, size = 64, stroke = 6, color = "#00B4D8" }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} stroke="#E2E8F0" strokeWidth={stroke} fill="none" />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={color}
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        whileInView={{ strokeDashoffset: c - (value / 100) * c }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />
    </svg>
  );
}

export default function DashboardPreview() {
  return (
    <section id="dashboard" className="py-24 bg-gradient-to-b from-bgdark to-[#062338] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="max-w-2xl mx-auto text-center mb-14">
          <p className="readout-label justify-center flex">Command Center</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold">Live dashboard preview</h2>
          <p className="mt-4 text-white/60 leading-relaxed">
            Every reading your crew needs, in one glanceable instrument panel. Sample data shown.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: CloudSun, label: "Current Weather", value: "Partly Cloudy", sub: "28°C · Light breeze" },
            { icon: Waves, label: "Wave Height", value: "1.4 m", sub: "Moderate swell" },
            { icon: Wind, label: "Wind Speed", value: "16 kt", sub: "From the SW" },
            { icon: Eye, label: "Visibility", value: "9.2 km", sub: "Clear conditions" },
          ].map(({ icon: Icon, label, value, sub }, i) => (
            <Reveal key={label} delay={i * 0.08}>
              <div className="glass rounded-2xl p-5 h-full">
                <div className="flex items-center justify-between mb-4">
                  <span className="readout-label text-white/50">{label}</span>
                  <Icon className="w-4 h-4 text-accent" />
                </div>
                <p className="readout-value text-2xl">{value}</p>
                <p className="text-xs text-white/45 mt-1.5">{sub}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-5 mt-5">
          <Reveal className="lg:col-span-2">
            <div className="glass rounded-2xl p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <span className="readout-label text-white/50">Swell Trend · Last 12 hrs</span>
                <Ship className="w-4 h-4 text-accent" />
              </div>
              <div className="flex items-end gap-2 h-32">
                {swellData.map((v, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${v}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.05, ease: "easeOut" }}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-primary to-accent"
                  />
                ))}
              </div>
              <div className="flex justify-between mt-3 text-[10px] text-white/35 font-mono">
                <span>-12h</span>
                <span>-6h</span>
                <span>now</span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass rounded-2xl p-6 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="readout-label text-white/50">AI Risk Score</span>
                <Gauge className="w-4 h-4 text-accent" />
              </div>
              <div className="flex items-center gap-4 mt-2">
                <div className="relative">
                  <ProgressRing value={22} color="#4CC9F0" />
                  <span className="absolute inset-0 grid place-items-center readout-value text-sm">22</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-secondary">Low Risk</p>
                  <p className="text-xs text-white/45 mt-1">Conditions favorable for departure</p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 mt-5">
          <Reveal>
            <div className="glass rounded-2xl p-5 flex items-center gap-4">
              <span className="grid place-items-center w-11 h-11 rounded-xl bg-white/10">
                <Ship className="w-5 h-5 text-accent" />
              </span>
              <div>
                <p className="readout-value text-xl">6</p>
                <p className="readout-label text-white/50">Nearby Ships</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="glass rounded-2xl p-5 flex items-center gap-4">
              <span className="grid place-items-center w-11 h-11 rounded-xl bg-white/10">
                <Siren className="w-5 h-5 text-amber-300" />
              </span>
              <div>
                <p className="readout-value text-xl">0</p>
                <p className="readout-label text-white/50">Emergency Alerts</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.16}>
            <div className="glass rounded-2xl p-5 flex items-center gap-4">
              <span className="grid place-items-center w-11 h-11 rounded-xl bg-white/10">
                <Route className="w-5 h-5 text-secondary" />
              </span>
              <div>
                <p className="readout-value text-xl">On Track</p>
                <p className="readout-label text-white/50">Route Status</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
