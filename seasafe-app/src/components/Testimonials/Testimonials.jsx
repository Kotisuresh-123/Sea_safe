import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "../Reveal.jsx";

const TESTIMONIALS = [
  {
    name: "Ravi Kumar",
    role: "Fishing Vessel Captain, Kakinada",
    rating: 5,
    quote:
      "SeaSafe's storm alerts gave our crew nearly two hours of warning before a squall hit. We were back at the harbor before it broke.",
    initials: "RK",
  },
  {
    name: "Lt. Cmdr. Anita Verma",
    role: "Coast Guard Liaison",
    rating: 5,
    quote:
      "Coordinating search and rescue used to mean piecing together radio calls. Now every vessel's position is on one shared map.",
    initials: "AV",
  },
  {
    name: "Dr. Samuel Rego",
    role: "Marine Research Fellow",
    rating: 4,
    quote:
      "The hazard reporting layer has become a genuine research tool. We're seeing patterns in the community data we hadn't noticed before.",
    initials: "SR",
  },
  {
    name: "Priya Nair",
    role: "Independent Sailor",
    rating: 5,
    quote:
      "I plan every solo trip around the AI route suggestions now. It reads conditions faster than I ever could on my own.",
    initials: "PN",
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % TESTIMONIALS.length), 6000);
    return () => clearInterval(id);
  }, []);

  const t = TESTIMONIALS[index];

  return (
    <section id="testimonials" className="py-24 bg-bglight">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal className="text-center mb-14">
          <p className="readout-label text-primary/70 justify-center flex">Voices from the Water</p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-inktext">
            Trusted by people who sail for a living
          </h2>
        </Reveal>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4 }}
              className="rounded-2xl bg-white border border-slate-200 shadow-card p-8 sm:p-10 text-center"
            >
              <div className="flex justify-center gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < t.rating ? "fill-secondary text-secondary" : "text-slate-200"}`}
                  />
                ))}
              </div>
              <p className="text-lg text-inktext/80 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div className="mt-7 flex flex-col items-center gap-1">
                <span className="grid place-items-center w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary text-white font-semibold text-sm mb-1">
                  {t.initials}
                </span>
                <p className="font-semibold text-inktext">{t.name}</p>
                <p className="text-sm text-inktext/50">{t.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={() => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
            aria-label="Previous testimonial"
            className="absolute top-1/2 -left-4 sm:-left-14 -translate-y-1/2 grid place-items-center w-10 h-10 rounded-full bg-white border border-slate-200 shadow-glass hover:bg-slate-50 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-inktext/70" />
          </button>
          <button
            onClick={() => setIndex((i) => (i + 1) % TESTIMONIALS.length)}
            aria-label="Next testimonial"
            className="absolute top-1/2 -right-4 sm:-right-14 -translate-y-1/2 grid place-items-center w-10 h-10 rounded-full bg-white border border-slate-200 shadow-glass hover:bg-slate-50 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-inktext/70" />
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-secondary" : "w-1.5 bg-slate-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
