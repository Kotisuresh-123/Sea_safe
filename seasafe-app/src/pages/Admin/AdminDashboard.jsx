import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, Users, AlertTriangle, MapPin, CloudSun, Shield, Activity, CheckCircle, XCircle } from "lucide-react";
import { adminAPI } from "../../services/backend.js";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsData, usersData] = await Promise.all([
        adminAPI.getStats(),
        adminAPI.getUsers(),
      ]);
      setStats(statsData.stats);
      setUsers(usersData.users || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeactivate = async (userId) => {
    if (!confirm("Deactivate this user?")) return;
    try {
      await adminAPI.deactivateUser(userId);
      setUsers(users.map((u) => (u._id === userId ? { ...u, isActive: false } : u)));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bgdark">
        <div className="text-white text-lg animate-pulse">Loading admin data...</div>
      </div>
    );
  }

  const statCards = [
    { icon: Users, label: "Total Users", value: stats?.users || 0, color: "text-blue-400" },
    { icon: AlertTriangle, label: "Active Alerts", value: stats?.alerts || 0, color: "text-yellow-400" },
    { icon: Shield, label: "Active SOS", value: stats?.activeSOS || 0, color: "text-red-400" },
    { icon: MapPin, label: "Saved Locations", value: stats?.locations || 0, color: "text-green-400" },
    { icon: CloudSun, label: "Weather Records", value: stats?.weatherRecords || 0, color: "text-cyan-400" },
  ];

  return (
    <div className="min-h-screen bg-bgdark p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <BarChart3 className="w-8 h-8 text-accent" />
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {statCards.map(({ icon: Icon, label, value, color }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass rounded-2xl p-5"
            >
              <Icon className={`w-6 h-6 ${color} mb-3`} />
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-white/50 text-xs mt-1">{label}</p>
            </motion.div>
          ))}
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-accent" />
            <h2 className="text-xl font-bold text-white">Users</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="pb-3 text-white/50 text-xs font-medium">Name</th>
                  <th className="pb-3 text-white/50 text-xs font-medium">Email</th>
                  <th className="pb-3 text-white/50 text-xs font-medium">Role</th>
                  <th className="pb-3 text-white/50 text-xs font-medium">Status</th>
                  <th className="pb-3 text-white/50 text-xs font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b border-white/5">
                    <td className="py-3 text-white text-sm">{user.name}</td>
                    <td className="py-3 text-white/70 text-sm">{user.email}</td>
                    <td className="py-3">
                      <span className={`text-xs px-2 py-1 rounded-full ${user.role === "admin" ? "bg-accent/20 text-accent" : "bg-white/10 text-white/60"}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="py-3">
                      {user.isActive ? (
                        <span className="flex items-center gap-1 text-green-400 text-xs">
                          <CheckCircle className="w-3 h-3" /> Active
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-400 text-xs">
                          <XCircle className="w-3 h-3" /> Inactive
                        </span>
                      )}
                    </td>
                    <td className="py-3">
                      {user.isActive && user.role !== "admin" && (
                        <button
                          onClick={() => handleDeactivate(user._id)}
                          className="text-xs text-red-400 hover:text-red-300 transition-colors"
                        >
                          Deactivate
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
