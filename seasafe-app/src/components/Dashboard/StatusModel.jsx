import { motion, AnimatePresence } from "framer-motion";
import { X, Waves, Navigation, Shield, AlertTriangle } from "lucide-react";

export default function StatusModal({ open, onClose, marineData, locationName }) {
  if (!open) return null;

  const getFishingAdvice = (risk) => {
    if (risk === "DANGER") return "Avoid fishing. High wave activity detected. Stay ashore.";
    if (risk === "CAUTION") return "Risky conditions. Only near-shore fishing recommended.";
    return "Safe for fishing operations. Monitor conditions regularly.";
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: "480px",
              background: "linear-gradient(135deg, #0d1425, #111b30)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "20px",
              padding: "28px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
              color: "white",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Shield className="w-5 h-5" style={{ color: "#4cc9f0" }} />
                <h2 style={{ margin: 0, fontFamily: "'Space Grotesk', sans-serif", fontSize: "18px", fontWeight: 700 }}>
                  Marine Intelligence Report
                </h2>
              </div>
              <button
                onClick={onClose}
                style={{
                  padding: "6px", borderRadius: "8px", border: "none",
                  background: "rgba(255,255,255,0.06)", color: "white", cursor: "pointer",
                }}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div style={{ display: "grid", gap: "10px" }}>
              <div style={{ padding: "14px", borderRadius: "12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ margin: 0, fontSize: "11px", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.05em" }}>Location</p>
                <p style={{ margin: "4px 0 0", fontSize: "14px", fontWeight: 600 }}>{locationName}</p>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                <div style={{ padding: "14px", borderRadius: "12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p style={{ margin: 0, fontSize: "11px", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", fontWeight: 600 }}>Wave Height</p>
                  <p style={{ margin: "4px 0 0", fontFamily: "'JetBrains Mono', monospace", fontSize: "18px", fontWeight: 700, color: "#38bdf8" }}>
                    {marineData?.wave?.toFixed(2)} m
                  </p>
                </div>
                <div style={{ padding: "14px", borderRadius: "12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <p style={{ margin: 0, fontSize: "11px", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", fontWeight: 600 }}>Status</p>
                  <p style={{ margin: "4px 0 0", fontSize: "14px", fontWeight: 700, color: marineData?.riskLevel === "safe" ? "#4ade80" : marineData?.riskLevel === "caution" ? "#fbbf24" : "#f87171" }}>
                    {marineData?.risk}
                  </p>
                </div>
              </div>

              <div style={{ padding: "14px", borderRadius: "12px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <p style={{ margin: 0, fontSize: "11px", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", fontWeight: 600 }}>Coordinates</p>
                <p style={{ margin: "4px 0 0", fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", fontWeight: 500 }}>
                  {marineData?.lat?.toFixed(6)}, {marineData?.lon?.toFixed(6)}
                </p>
              </div>

              <div style={{ padding: "14px", borderRadius: "12px", background: marineData?.riskLevel === "danger" ? "rgba(239,68,68,0.1)" : marineData?.riskLevel === "caution" ? "rgba(245,158,11,0.1)" : "rgba(34,197,94,0.1)", border: `1px solid ${marineData?.riskLevel === "danger" ? "rgba(239,68,68,0.2)" : marineData?.riskLevel === "caution" ? "rgba(245,158,11,0.2)" : "rgba(34,197,94,0.2)"}` }}>
                <p style={{ margin: 0, fontSize: "11px", color: "rgba(255,255,255,0.45)", textTransform: "uppercase", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}>
                  <AlertTriangle className="w-3 h-3" /> Fishing Advisory
                </p>
                <p style={{ margin: "6px 0 0", fontSize: "13px", color: "rgba(255,255,255,0.8)", lineHeight: 1.5 }}>
                  {getFishingAdvice(marineData?.risk)}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              style={{
                width: "100%", marginTop: "16px", padding: "12px",
                borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.06)", color: "white",
                fontSize: "14px", fontWeight: 600, cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.1)"}
              onMouseLeave={(e) => e.target.style.background = "rgba(255,255,255,0.06)"}
            >
              Close Report
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
