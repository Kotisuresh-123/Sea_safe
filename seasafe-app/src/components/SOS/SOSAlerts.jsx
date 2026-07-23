import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, MapPin, Clock, User, Phone, Radio, X, Navigation } from "lucide-react";
import { sosAPI } from "../../services/backend.js";
import { getSocket } from "../../utils/socket.js";

export default function SOSAlerts({ onNavigate }) {
  const [sosList, setSosList] = useState([]);
  const [newAlert, setNewAlert] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActive = async () => {
      try {
        const data = await sosAPI.getActive();
        setSosList(data.sos || []);
      } catch (err) {
        console.error("Failed to load SOS alerts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchActive();
  }, []);

  useEffect(() => {
    const socket = getSocket();

    socket.on("sos-alert", (sos) => {
      setSosList((prev) => {
        if (prev.some((s) => s._id === sos._id)) return prev;
        return [sos, ...prev];
      });
      setNewAlert(sos);
      setTimeout(() => setNewAlert(null), 5000);
    });

    socket.on("sos-resolved", (sos) => {
      setSosList((prev) => prev.filter((s) => s._id !== sos._id));
    });

    return () => {
      socket.off("sos-alert");
      socket.off("sos-resolved");
    };
  }, []);

  const handleDismiss = (id) => {
    setSosList((prev) => prev.filter((s) => s._id !== id));
  };

  const formatTime = (date) => {
    const d = new Date(date);
    const now = new Date();
    const diffMs = now - d;
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h ago`;
    return d.toLocaleDateString();
  };

  return (
    <>
      {/* NEW SOS POPUP NOTIFICATION */}
      <AnimatePresence>
        {newAlert && (
          <motion.div
            initial={{ opacity: 0, y: -30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[60] w-full max-w-sm px-4"
          >
            <div className="rounded-2xl p-4 border border-red-500/40 bg-gradient-to-r from-red-900/80 to-red-800/60 backdrop-blur-xl shadow-2xl shadow-red-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-red-500/30 flex items-center justify-center shrink-0 animate-pulse">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm">SOS EMERGENCY RECEIVED</p>
                  <p className="text-red-200/70 text-xs mt-0.5 truncate">
                    {newAlert.user ? newAlert.user.name : "Anonymous"} — {newAlert.message}
                  </p>
                </div>
                <button
                  onClick={() => setNewAlert(null)}
                  className="text-white/40 hover:text-white shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SOS ALERTS CARD */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="dash-card-modern"
        style={{ border: sosList.length > 0 ? "1px solid rgba(239, 68, 68, 0.2)" : undefined }}
      >
        <div className="dash-card-header">
          <Radio className="w-5 h-5 text-red-400" />
          <h3>SOS Alerts</h3>
          {sosList.length > 0 && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
              {sosList.length} Active
            </span>
          )}
        </div>

        {loading ? (
          <p className="dash-empty-state">Loading SOS alerts...</p>
        ) : sosList.length === 0 ? (
          <div className="dash-empty-state">
            <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-white/15" />
            <p>No active SOS alerts</p>
          </div>
        ) : (
          <div className="dash-history-list" style={{ maxHeight: 300 }}>
            {sosList.map((sos) => (
              <motion.div
                key={sos._id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="dash-history-item"
                style={{ border: "1px solid rgba(239, 68, 68, 0.15)", background: "rgba(239, 68, 68, 0.04)" }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                    <span className="dash-history-name" style={{ color: "#fca5a5" }}>
                      {sos.user ? sos.user.name : "Anonymous"}
                    </span>
                  </div>
                  <p className="dash-history-time">{sos.message}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                    <span className="dash-history-time" style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <MapPin className="w-3 h-3" />
                      {sos.latitude.toFixed(4)}, {sos.longitude.toFixed(4)}
                    </span>
                    <span className="dash-history-time" style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <Clock className="w-3 h-3" />
                      {formatTime(sos.createdAt)}
                    </span>
                  </div>
                </div>
                <div className="dash-history-right" style={{ flexDirection: "column", gap: 6 }}>
                  {onNavigate && (
                    <button
                      onClick={() => onNavigate(sos.latitude, sos.longitude)}
                      className="dash-card-action"
                      title="View on map"
                      style={{ padding: "4px 8px", fontSize: 11 }}
                    >
                      <Navigation className="w-3 h-3" /> Map
                    </button>
                  )}
                  <button
                    onClick={() => handleDismiss(sos._id)}
                    className="dash-card-action"
                    title="Dismiss"
                    style={{ padding: "4px 8px", fontSize: 11, color: "rgba(255,255,255,0.4)" }}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </>
  );
}
