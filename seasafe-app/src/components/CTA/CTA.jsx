import { ArrowRight, MessageCircle } from "lucide-react";
import Reveal from "../Reveal.jsx";

export default function CTA() {
  return (
    <section className="relative py-28 overflow-hidden bg-ocean-gradient">
      <div className="absolute inset-0 bg-glow-radial opacity-60" aria-hidden="true" />
      <div className="absolute -top-24 left-1/4 w-72 h-72 bg-glow-radial animate-pulse-slow" aria-hidden="true" />
      <div className="absolute -bottom-24 right-1/4 w-72 h-72 bg-glow-radial animate-pulse-slow" aria-hidden="true" />

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <Reveal>
          <h2 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
            Ready to navigate smarter?
          </h2>
          <p className="mt-5 text-white/70 max-w-xl mx-auto leading-relaxed">
            Join thousands of sailors, fishermen, and coast authorities who trust SeaSafe with
            every voyage.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <button className="btn-ripple group inline-flex items-center gap-2 bg-gradient-to-r from-secondary to-accent text-bgdark font-semibold px-7 py-3.5 rounded-xl shadow-card hover:brightness-110 transition-all">
              Start Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="inline-flex items-center gap-2 text-white font-medium px-7 py-3.5 rounded-xl border border-white/20 hover:bg-white/5 transition-colors">
              <MessageCircle className="w-4 h-4" />
              Contact Us
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
