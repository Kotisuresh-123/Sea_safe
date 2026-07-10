import { Anchor, Shield, Microscope, Siren, Compass } from "lucide-react";
import Reveal from "../Reveal.jsx";

const ORGS = [
  {
    icon: Anchor,
    label: "Fishing Communities",
    phone: "+919876543210",
  },
  {
    icon: Shield,
    label: "Coast Guard",
    phone: "+911234567890",
  },
  {
    icon: Microscope,
    label: "Marine Research",
    phone: "+919999999999",
  },
  {
    icon: Siren,
    label: "Emergency Services",
    phone: "112",
  },
  {
    icon: Compass,
    label: "Navigation Experts",
    phone: "+918888888888",
  },
];

export default function TrustedBy() {
  return (
    <section className="py-16 bg-bglight">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <p className="text-center readout-label text-primary/70 mb-8">
            Trusted across the maritime community
          </p>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
  {ORGS.map(({ icon: Icon, label, phone }, i) => (
    <Reveal key={label} delay={i * 0.08}>
      <a
        href={`tel:${phone}`}
        className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-7 text-center transition-all duration-300 hover:-translate-y-1.5 hover:border-secondary/40 hover:shadow-card"
      >
        <span className="grid place-items-center w-12 h-12 rounded-xl bg-gradient-to-br from-primary/10 to-accent/20 group-hover:from-primary/20 group-hover:to-accent/30 transition-colors">
          <Icon className="w-5 h-5 text-primary" strokeWidth={1.8} />
        </span>

        <span className="text-sm font-medium text-inktext/80">
          {label}
        </span>

        {/* <span className="text-xs text-primary">
          {phone}
        </span> */}
      </a>
    </Reveal>
  ))}
</div>
      </div>
    </section>
  );
}
