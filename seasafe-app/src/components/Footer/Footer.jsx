import { Compass, Mail, Phone, PhoneCall } from "lucide-react";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
const QUICK_LINKS = ["Home", "Features", "Safety Dashboard", "Weather", "Community"];
const RESOURCES = ["Documentation", "API Access", "Safety Guides", "Blog", "Support Center"];

export default function Footer() {
  return (
    <footer id="footer" className="bg-bgdark text-white/70 pt-20 pb-8 relative overflow-hidden">
      <div className="absolute inset-0 grid-fade opacity-20" aria-hidden="true" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-white/10">
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-to-br from-secondary to-accent">
                <Compass className="w-5 h-5 text-bgdark" strokeWidth={2.5} />
              </span>
              <span className="font-display font-bold text-lg text-white">
                Sea<span className="text-accent">Safe</span>
              </span>
            </a>
            <p className="text-sm leading-relaxed max-w-xs">
              AI-powered maritime safety and navigation, built for fishermen, sailors, and
              authorities who trust the water to keep its promises.
            </p>
            <div className="flex gap-3 mt-6">
            {[FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
  <a
    key={i}
    href="#"
    aria-label="Social link"
    className="grid place-items-center w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 hover:text-accent transition-colors"
  >
    <Icon className="w-4 h-4" />
  </a>
))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {QUICK_LINKS.map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-accent transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Resources</h4>
            <ul className="space-y-2.5 text-sm">
              {RESOURCES.map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-accent transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Stay Informed</h4>
            <p className="text-sm mb-3">Weather advisories, sent to your inbox.</p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-lg bg-white/5 border border-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-secondary/60"
              />
              <button
                type="submit"
                className="shrink-0 rounded-lg bg-gradient-to-r from-secondary to-accent px-4 py-2.5 text-sm font-semibold text-bgdark hover:brightness-110 transition-all"
              >
                Join
              </button>
            </form>

            <div className="mt-6 space-y-2 text-sm">
              <a href="mailto:help@seasafe.app" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail className="w-4 h-4" /> help@seasafe.app
              </a>
              <a href="tel:+911234567890" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone className="w-4 h-4" /> +91 12345 67890
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} SeaSafe. All rights reserved.</p>
          <div className="flex items-center gap-2 text-xs text-red-300/90 bg-red-500/10 border border-red-400/20 rounded-full px-4 py-2">
            <PhoneCall className="w-3.5 h-3.5" />
            Marine Emergency: 1554 · Coast Guard: 1093
          </div>
        </div>
      </div>
    </footer>
  );
}
