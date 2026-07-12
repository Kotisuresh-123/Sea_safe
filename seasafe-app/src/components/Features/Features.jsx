import { useNavigate } from "react-router-dom";
import {
  Route,
  CloudRain,
  AlertTriangle,
  Radar,
  MapPin,
  SatelliteDish,
  LifeBuoy,
  Users,
} from "lucide-react";
import Reveal from "../Reveal.jsx";

const FEATURES = [
  {
    icon: Route,
    title: "AI Route Optimization",
    desc: "Dynamic routing that recalculates the safest path as conditions change in real time.",
  },
  {
    icon: CloudRain,
    title: "Live Weather Monitoring",
    desc: "Continuous marine forecasts pulled from satellite and buoy data across your route.",
  },
  {
    icon: AlertTriangle,
    title: "Storm Alert System",
    desc: "Early warnings for cyclones and squalls, delivered before conditions turn dangerous.",
  },
  {
    icon: Radar,
    title: "Real-Time Hazard Detection",
    desc: "Reefs, debris, and traffic congestion flagged automatically along your course.",
  },
  {
    icon: MapPin,
    title: "GPS Navigation",
    desc: "Precision positioning with offline fallback for open-water reliability.",
  },
  {
    icon: SatelliteDish,
    title: "Satellite Tracking",
    desc: "Vessel positions synced across your fleet, visible from any connected device.",
  },
  {
    icon: LifeBuoy,
    title: "Emergency SOS",
    desc: "One-tap distress signal that reaches Coast Guard and nearby vessels instantly.",
  },
  {
    icon: Users,
    title: "Community Hazard Reports",
    desc: "Crowdsourced sightings from fellow sailors, verified and mapped in minutes.",
  },
];

export default function Features() {
  const navigate = useNavigate();

  return (
    <section id="features" className="py-24 bg-bglight relative">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="max-w-2xl mx-auto text-center mb-14">
          <p className="readout-label text-primary/70 justify-center flex">Capabilities</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-inktext">
            Everything a safe voyage needs
          </h2>
          <p className="mt-4 text-inktext/60 leading-relaxed">
            SeaSafe brings intelligence gathered from satellites, weather stations, and fellow
            sailors into one command center for every trip you take.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={(i % 4) * 0.08}>
              <div className="group relative h-full rounded-2xl p-[1px] bg-gradient-to-br from-slate-200 via-slate-200 to-slate-200 hover:from-secondary hover:via-accent hover:to-primary transition-all duration-500">
                <div
                  onClick={() => {
                    if (title === "GPS Navigation") {
                      navigate("/login");
                    }
                  }}
                  className="h-full rounded-2xl bg-white p-6 transition-transform duration-300 group-hover:-translate-y-1.5 cursor-pointer"
                >
                  <span className="grid place-items-center w-11 h-11 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/20 mb-5 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-primary" strokeWidth={1.8} />
                  </span>
                  <h3 className="font-semibold text-inktext mb-2">{title}</h3>
                  <p className="text-sm text-inktext/60 leading-relaxed">{desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
