import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Plus, Trash2, Navigation } from "lucide-react";
import { locationsAPI } from "../../services/backend.js";

export default function SavedLocations({ position, onNavigate }) {
  const [locations, setLocations] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("other");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLocations();
  }, []);

  const loadLocations = async () => {
    try {
      const data = await locationsAPI.getAll();
      setLocations(data.locations || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!name.trim() || !position) return;
    try {
      const loc = await locationsAPI.create({
        name: name.trim(),
        latitude: position[0],
        longitude: position[1],
        category,
      });
      setLocations([loc.location, ...locations]);
      setName("");
      setShowAdd(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await locationsAPI.remove(id);
      setLocations(locations.filter((l) => l._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const categoryColors = {
    port: "text-blue-400",
    harbor: "text-green-400",
    fishing: "text-yellow-400",
    emergency: "text-red-400",
    other: "text-white/60",
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold text-sm flex items-center gap-2">
          <MapPin className="w-4 h-4 text-accent" /> Saved Locations
        </h3>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="text-accent hover:text-white transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {showAdd && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="bg-white/5 rounded-xl p-3 space-y-2"
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Location name"
            className="w-full bg-white/10 border border-white/15 rounded-lg px-3 py-2 text-white text-sm placeholder-white/40 focus:outline-none"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-white/10 border border-white/15 rounded-lg px-3 py-2 text-white text-sm focus:outline-none"
          >
            <option value="port">Port</option>
            <option value="harbor">Harbor</option>
            <option value="fishing">Fishing</option>
            <option value="emergency">Emergency</option>
            <option value="other">Other</option>
          </select>
          <button
            onClick={handleAdd}
            className="w-full py-2 rounded-lg bg-accent/20 text-accent text-sm font-medium hover:bg-accent/30 transition-colors"
          >
            Save Current Location
          </button>
        </motion.div>
      )}

      {loading ? (
        <p className="text-white/40 text-xs">Loading...</p>
      ) : locations.length === 0 ? (
        <p className="text-white/40 text-xs">No saved locations yet</p>
      ) : (
        <div className="space-y-1.5 max-h-48 overflow-y-auto">
          {locations.map((loc) => (
            <div
              key={loc._id}
              className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2 group"
            >
              <div className="flex-1 min-w-0">
                <p className="text-white text-xs font-medium truncate">{loc.name}</p>
                <p className={`text-[10px] ${categoryColors[loc.category] || "text-white/40"}`}>
                  {loc.category}
                </p>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => onNavigate?.(loc.latitude, loc.longitude)}
                  className="p-1 text-accent hover:text-white"
                >
                  <Navigation className="w-3 h-3" />
                </button>
                <button
                  onClick={() => handleDelete(loc._id)}
                  className="p-1 text-red-400 hover:text-red-300"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
