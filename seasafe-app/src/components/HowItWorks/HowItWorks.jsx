import { LogIn, MapPinned, BrainCircuit, Navigation } from "lucide-react";
import Reveal from "../Reveal.jsx";

const STEPS = [
  { icon: LogIn, title: "Log In", desc: "Access your vessel profile and saved routes securely." },
  { icon: MapPinned, title: "Choose Destination", desc: "Set your port of call and departure window." },
  { icon: BrainCircuit, title: "AI Calculates Safest Route", desc: "Weather, hazards, and traffic are weighed in seconds." },
  { icon: Navigation, title: "Navigate Securely", desc: "Follow live guidance with alerts along the way." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="max-w-2xl mx-auto text-center mb-16">
          <p className="readout-label text-primary/70 justify-center flex">Process</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-inktext">How SeaSafe works</h2>
        </Reveal>

        <div className="relative grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
          <div
            className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-[2px] bg-gradient-to-r from-primary via-secondary to-accent"
            aria-hidden="true"
          />
          {STEPS.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.15} y={20}>
              <div className="relative flex flex-col items-center text-center">
                <div className="relative z-10 grid place-items-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary shadow-card mb-5">
                  <Icon className="w-7 h-7 text-white" strokeWidth={1.8} />
                  <span className="absolute -top-2 -right-2 grid place-items-center w-6 h-6 rounded-full bg-bgdark text-white text-[11px] font-mono font-semibold">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold text-inktext mb-1.5">{title}</h3>
                <p className="text-sm text-inktext/60 max-w-[220px] leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
