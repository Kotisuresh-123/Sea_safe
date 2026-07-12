import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X, Send, Phone, MapPin, CheckCircle, Loader } from "lucide-react";
import { sosAPI } from "../../services/backend.js";
import { useAuth } from "../../context/AuthContext.jsx";

const EMERGENCY_CONTACTS = [
  { name: "Coast Guard", number: "1554", icon: "🚨" },
  { name: "Police", number: "100", icon: "🚓" },
  { name: "Ambulance", number: "108", icon: "🚑" },
  { name: "Fire", number: "101", icon: "🔥" },
  { name: "Disaster", number: "1070", icon: "🌊" },
];

export default function SOSButton({ position }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [phase, setPhase] = useState("idle");
  const [error, setError] = useState("");
  const [coords, setCoords] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (position) {
      setCoords({ lat: position[0].toFixed(6), lon: position[1].toFixed(6) });
    }
  }, [position]);

  const handleSOS = async () => {
    if (!position) {
      setError("GPS location not available. Please wait for定位.");
      return;
    }

    setPhase("sending");
    setError("");

    try {
      await sosAPI.create({
        latitude: position[0],
        longitude: position[1],
        message: user ? `SOS from ${user.name}` : "SOS Emergency - Anonymous",
      });
      setPhase("sent");
    } catch (err) {
      setError(err.message || "Failed to send SOS. Try calling emergency numbers below.");
      setPhase("error");
    }
  };

  const reset = () => {
    setPhase("idle");
    setError("");
    setShowConfirm(false);
  };

  return (
    <>
      {/* SOS BUTTON */}
      <button
        onClick={() => { setError(""); setPhase("idle"); setShowConfirm(true); }}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-red-600 hover:bg-red-500 shadow-lg shadow-red-500/40 flex items-center justify-center transition-all hover:scale-110 active:scale-95 sos-pulse"
      >
        <AlertCircle className="w-8 h-8 text-white" />
      </button>

      {/* MODAL */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
            onClick={() => phase !== "sending" && reset()}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 22, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-3xl overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #1a0a0a, #2d0f0f, #1a0a0a)",
                border: "1px solid rgba(239, 68, 68, 0.3)",
                boxShadow: "0 25px 60px rgba(239, 68, 68, 0.15)",
              }}
            >
              {/* SENT SUCCESS */}
              {phase === "sent" && (
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="w-20 h-20 mx-auto mb-5 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center"
                  >
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">SOS Sent Successfully</h3>
                  <p className="text-white/60 text-sm mb-3">Your emergency alert has been broadcast.</p>
                  {coords && (
                    <p className="text-white/40 text-xs font-mono mb-6">
                      Location: {coords.lat}, {coords.lon}
                    </p>
                  )}

                  <div className="bg-white/5 rounded-2xl p-4 mb-6 border border-white/5">
                    <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-3">
                      Call Emergency Services Now
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {EMERGENCY_CONTACTS.map((c) => (
                        <a
                          key={c.number}
                          href={`tel:${c.number}`}
                          className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/15 hover:border-red-500/30 transition-all"
                        >
                          <span className="text-lg">{c.icon}</span>
                          <div className="text-left">
                            <p className="text-white text-xs font-semibold">{c.name}</p>
                            <p className="text-white/40 text-[10px]">{c.number}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={reset}
                    className="w-full py-3 rounded-xl bg-white/10 border border-white/10 text-white font-semibold text-sm hover:bg-white/15 transition-all"
                  >
                    Close
                  </button>
                </div>
              )}

              {/* SENDING */}
              {phase === "sending" && (
                <div className="p-8 text-center">
                  <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                    <Loader className="w-10 h-10 text-red-400 animate-spin" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Sending SOS...</h3>
                  <p className="text-white/60 text-sm">Broadcasting your emergency alert</p>
                </div>
              )}

              {/* CONFIRM / ERROR */}
              {(phase === "idle" || phase === "error") && (
                <div className="p-8">
                  <div className="text-center mb-6">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="w-20 h-20 mx-auto mb-5 rounded-full bg-red-500/20 border-2 border-red-500/40 flex items-center justify-center"
                    >
                      <AlertCircle className="w-10 h-10 text-red-400" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-2">Send SOS Alert?</h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      This will broadcast your location to emergency responders and all connected users.
                    </p>
                  </div>

                  {/* Location Preview */}
                  <div className="bg-white/5 rounded-xl p-3 mb-5 border border-white/5">
                    <div className="flex items-center gap-2 text-white/60 text-xs">
                      <MapPin className="w-3.5 h-3.5 text-red-400" />
                      {coords ? (
                        <span className="font-mono">{coords.lat}, {coords.lon}</span>
                      ) : (
                        <span className="text-yellow-400">Waiting for GPS...</span>
                      )}
                    </div>
                    {!user && (
                      <p className="text-white/40 text-[11px] mt-1.5">
                        Sending as anonymous (login for identified SOS)
                      </p>
                    )}
                  </div>

                  {error && (
                    <div className="bg-red-500/15 border border-red-500/25 rounded-xl px-4 py-3 mb-5 text-red-300 text-sm">
                      {error}
                    </div>
                  )}

                  <div className="flex gap-3 mb-5">
                    <button
                      onClick={reset}
                      className="flex-1 py-3.5 rounded-xl border border-white/15 text-white/70 hover:bg-white/5 transition-colors text-sm font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSOS}
                      className="flex-1 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-500/25"
                    >
                      <AlertCircle className="w-4 h-4" />
                      Send SOS
                    </button>
                  </div>

                  {/* Quick Call Emergency */}
                  <div className="border-t border-white/10 pt-4">
                    <p className="text-white/40 text-[11px] uppercase tracking-wider font-semibold mb-3 text-center">
                      Or call emergency directly
                    </p>
                    <div className="flex gap-2 justify-center flex-wrap">
                      {EMERGENCY_CONTACTS.map((c) => (
                        <a
                          key={c.number}
                          href={`tel:${c.number}`}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/8 hover:bg-red-500/15 hover:border-red-500/25 transition-all text-white/70 hover:text-white"
                        >
                          <Phone className="w-3 h-3" />
                          <span className="text-xs font-semibold">{c.icon} {c.number}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Close button */}
              {phase !== "sending" && (
                <button
                  onClick={reset}
                  className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
