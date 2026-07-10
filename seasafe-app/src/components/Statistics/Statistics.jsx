import useCountUp from "./useCountUp.js";
import Reveal from "../Reveal.jsx";

const STATS = [
  { target: 10000, suffix: "+", label: "Safe Journeys" },
  { target: 500, suffix: "+", label: "Emergency Alerts" },
  { target: 98, suffix: "%", label: "Navigation Accuracy" },
  { target: 24, suffix: "×7", label: "Monitoring" },
];

function Stat({ target, suffix, label }) {
  const { ref, value } = useCountUp(target);
  return (
    <div ref={ref} className="text-center">
      <p className="readout-value text-4xl sm:text-5xl text-white">
        {value.toLocaleString()}
        <span className="text-accent">{suffix}</span>
      </p>
      <p className="readout-label text-white/50 mt-3">{label}</p>
    </div>
  );
}

export default function Statistics() {
  return (
    <section className="py-20 bg-bgdark relative overflow-hidden">
      <div className="absolute inset-0 bg-glow-radial opacity-40" aria-hidden="true" />
      <div className="relative max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {STATS.map((stat) => (
              <Stat key={stat.label} {...stat} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
