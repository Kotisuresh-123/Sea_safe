import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, X, Info, ShieldAlert } from "lucide-react";
import { alertsAPI } from "../../services/backend.js";

const severityConfig = {
  info: { icon: Info, color: "text-blue-400", bg: "bg-blue-500/20", border: "border-blue-500/30" },
  warning: { icon: AlertTriangle, color: "text-yellow-400", bg: "bg-yellow-500/20", border: "border-yellow-500/30" },
  danger: { icon: ShieldAlert, color: "text-red-400", bg: "bg-red-500/20", border: "border-red-500/30" },
};

export default function AlertBanner() {
  const [alerts, setAlerts] = useState([]);
  const [dismissed, setDismissed] = useState(new Set());

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const data = await alertsAPI.getAll();
        setAlerts(data.alerts || []);
      } catch (err) {
        console.error("Failed to fetch alerts:", err);
      }
    };
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 60000);
    return () => clearInterval(interval);
  }, []);

  const visibleAlerts = alerts.filter((a) => !dismissed.has(a._id));

  if (visibleAlerts.length === 0) return null;

  return (
    <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 space-y-2">
      <AnimatePresence>
        {visibleAlerts.map((alert) => {
          const config = severityConfig[alert.severity] || severityConfig.info;
          const Icon = config.icon;
          return (
            <motion.div
              key={alert._id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className={`${config.bg} ${config.border} border rounded-xl p-4 backdrop-blur-xl flex items-start gap-3`}
            >
              <Icon className={`w-5 h-5 ${config.color} mt-0.5 shrink-0`} />
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold text-sm">{alert.title}</p>
                <p className="text-white/70 text-xs mt-0.5">{alert.message}</p>
              </div>
              <button
                onClick={() => setDismissed((prev) => new Set([...prev, alert._id]))}
                className="text-white/40 hover:text-white/70 shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
