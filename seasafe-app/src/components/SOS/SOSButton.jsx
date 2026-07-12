import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X, Send } from "lucide-react";
import { sosAPI } from "../../services/backend.js";
import { useAuth } from "../../context/AuthContext.jsx";

export default function SOSButton({ position }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();

  const handleSOS = async () => {
    if (!user) {
      setError("Please login to send SOS");
      return;
    }
    if (!position) {
      setError("Location not available. Wait for GPS.");
      return;
    }

    setSending(true);
    setError("");
    try {
      await sosAPI.create({
        latitude: position[0],
        longitude: position[1],
        message: `SOS from ${user.name}`,
      });
      setSent(true);
      setTimeout(() => {
        setSent(false);
        setShowConfirm(false);
      }, 3000);
    } catch (err) {
      setError(err.message || "Failed to send SOS");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          setError("");
          setShowConfirm(true);
        }}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-red-600 hover:bg-red-500 shadow-lg shadow-red-500/30 flex items-center justify-center transition-all hover:scale-110 active:scale-95"
      >
        <AlertCircle className="w-8 h-8 text-white" />
      </button>

      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            onClick={() => !sending && setShowConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm glass rounded-3xl p-8 shadow-glass text-center"
            >
              {sent ? (
                <>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/20 flex items-center justify-center">
                    <Send className="w-8 h-8 text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">SOS Sent!</h3>
                  <p className="text-white/60 text-sm">Help is on the way.</p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/20 flex items-center justify-center">
                    <AlertCircle className="w-8 h-8 text-red-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Send SOS Alert?</h3>
                  <p className="text-white/60 text-sm mb-6">
                    This will send your location to emergency responders and nearby users.
                  </p>

                  {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowConfirm(false)}
                      className="flex-1 py-3 rounded-xl border border-white/20 text-white/80 hover:bg-white/5 transition-colors text-sm font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSOS}
                      disabled={sending}
                      className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold transition-all disabled:opacity-50 text-sm"
                    >
                      {sending ? "Sending..." : "Send SOS"}
                    </button>
                  </div>
                </>
              )}

              <button
                onClick={() => setShowConfirm(false)}
                className="absolute top-4 right-4 text-white/40 hover:text-white/70"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
