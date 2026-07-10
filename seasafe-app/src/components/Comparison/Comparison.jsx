import { Check, X } from "lucide-react";
import Reveal from "../Reveal.jsx";

const SEASAFE = ["AI Prediction", "Live Weather", "SOS Alerts", "Hazard Detection", "Smart Routing"];
const TRADITIONAL = ["Static Maps", "Manual Decisions", "No AI", "Limited Alerts"];

export default function Comparison() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <Reveal className="max-w-2xl mx-auto text-center mb-14">
          <p className="readout-label text-primary/70 justify-center flex">The Difference</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-inktext">Why choose SeaSafe</h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-6">
          <Reveal>
            <div className="h-full rounded-2xl bg-gradient-to-br from-primary to-secondary p-[1.5px] shadow-card">
              <div className="h-full rounded-2xl bg-bgdark p-8">
                <h3 className="text-white font-display font-semibold text-lg mb-6">SeaSafe</h3>
                <ul className="space-y-4">
                  {SEASAFE.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-white/85">
                      <span className="grid place-items-center w-6 h-6 rounded-full bg-secondary/20">
                        <Check className="w-3.5 h-3.5 text-secondary" />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="h-full rounded-2xl border border-slate-200 p-8 bg-slate-50">
              <h3 className="text-inktext/70 font-display font-semibold text-lg mb-6">
                Traditional Navigation
              </h3>
              <ul className="space-y-4">
                {TRADITIONAL.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-inktext/50">
                    <span className="grid place-items-center w-6 h-6 rounded-full bg-slate-200">
                      <X className="w-3.5 h-3.5 text-slate-500" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
