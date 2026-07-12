import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import SeaMap from "../components/Dashboard/SeaMap";
import StatusModal from "../components/Dashboard/StatusModel";
import { getMarineWeather } from "../services/marine";
import { geoShapes } from "../services/geoShapes";
import { getLocationName } from "../services/reverseGeocode";
import { weatherAPI } from "../services/backend";
import SOSButton from "../components/SOS/SOSButton";
import SavedLocations from "../components/SavedLocations/SavedLocations";
import {
  Search, Waves, Wind, Thermometer, Shield, MapPin,
  Clock, ChevronRight, AlertTriangle, History, Navigation,
  Compass, Radio, Anchor, X, LogOut, User, Home, BarChart3,
  Menu
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { startLocationTracking } from "../utils/location";
import { searchMarine } from "../services/geoSearch";
import { rivers } from "../data/rivers";
import { findNearestRiver } from "../services/nearestFeature";
import "../styles/Dashboard.css";

function StatCard({ icon: Icon, label, value, color, unit }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="dash-stat-card-modern"
    >
      <div className="dash-stat-icon" style={{ background: `${color}20`, color }}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="dash-stat-label">{label}</p>
        <p className="dash-stat-value">
          {value}
          {unit && <span className="dash-stat-unit">{unit}</span>}
        </p>
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  const [query, setQuery] = useState("");
  const [shape, setShape] = useState(null);
  const [position, setPosition] = useState(null);
  const [marineData, setMarineData] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [showStatus, setShowStatus] = useState(false);
  const [mapRef, setMapRef] = useState(null);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [weatherHistory, setWeatherHistory] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("map");

  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    startLocationTracking((location) => {
      setUserLocation(location);
      handleLocation(location.lat, location.lon);
    });
  }, []);

  const handleLocation = async (lat, lon) => {
    const newPos = [lat, lon];
    setPosition(newPos);
    const name = await getLocationName(lat, lon);
    setLocationName(name);

    try {
      const marine = await getMarineWeather(lat, lon);
      const wave = marine.waveHeight || 0;
      let risk = "SAFE";
      let riskLevel = "safe";

      if (wave > 1.5) { risk = "CAUTION"; riskLevel = "caution"; }
      if (wave > 2.5) { risk = "DANGER"; riskLevel = "danger"; }

      setMarineData({ wave, risk, riskLevel, lat, lon });
      setLoading(false);

      try {
        await weatherAPI.save({
          latitude: lat, longitude: lon,
          locationName: name, waveHeight: wave, riskLevel,
        });
        const histData = await weatherAPI.getHistory(`lat=${lat}&lon=${lon}&limit=10`);
        setWeatherHistory(histData.records || []);
      } catch (e) {
        console.error("Weather history save failed:", e);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    const searchText = query.toLowerCase();

    if (searchText.includes("godavari") || searchText.includes("godavari river")) {
      if (!userLocation) { alert("Waiting for GPS location..."); return; }
      const river = rivers.godavari;
      const nearest = findNearestRiver(userLocation.lat, userLocation.lon, river);
      setPosition([nearest.lat, nearest.lon]);
      setDistance(nearest.distance.toFixed(2));
      setShape(river.polygon);
      if (mapRef) mapRef.flyTo([nearest.lat, nearest.lon], 17, { duration: 2 });
      await handleLocation(nearest.lat, nearest.lon);
      setLocationName("Godavari River");
      return;
    }

    const results = await searchMarine(query, userLocation);
    if (!results.length) return;
    const best = results[0];
    await handleLocation(best.lat, best.lon);
    if (mapRef) mapRef.flyTo([best.lat, best.lon], 17, { duration: 2 });
  };

  useEffect(() => {
    if (query.length < 3) { setSuggestions([]); return; }
    const delay = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=6`
        );
        const data = await res.json();
        setSuggestions(data);
      } catch (err) { console.error(err); }
    }, 350);
    return () => clearTimeout(delay);
  }, [query]);

  useEffect(() => {
    const name = query.toLowerCase();
    if (name.includes("bay")) setShape(geoShapes.bay_of_bengal);
    else if (name.includes("arabian")) setShape(geoShapes.arabian_sea);
    else if (name.includes("ganga")) setShape(geoShapes.ganga_river);
    else setShape(null);
  }, [query]);

  const navigateToLocation = (lat, lon) => {
    handleLocation(lat, lon);
    if (mapRef) mapRef.flyTo([lat, lon], 17, { duration: 2 });
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const riskColor = marineData?.riskLevel === "safe" ? "#22c55e" : marineData?.riskLevel === "caution" ? "#f59e0b" : "#ef4444";

  return (
    <div className="dash-root">
      {/* SIDEBAR */}
      <aside className={`dash-sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <div className="dash-sidebar-header">
          <div className="dash-logo">
            <Compass className="w-6 h-6" />
            <span className="dash-logo-text">SeaSafe</span>
          </div>
        </div>

        <nav className="dash-nav">
          <button className="dash-nav-item active">
            <Home className="w-4 h-4" />
            <span>Dashboard</span>
          </button>
          <button className="dash-nav-item" onClick={() => setActiveTab("map")}>
            <MapPin className="w-4 h-4" />
            <span>Map View</span>
          </button>
          <button className="dash-nav-item" onClick={() => setActiveTab("weather")}>
            <Waves className="w-4 h-4" />
            <span>Weather</span>
          </button>
          <button className="dash-nav-item" onClick={() => setActiveTab("history")}>
            <History className="w-4 h-4" />
            <span>History</span>
          </button>
          <button className="dash-nav-item" onClick={() => navigate("/")}>
            <BarChart3 className="w-4 h-4" />
            <span>Home</span>
          </button>
        </nav>

        <div className="dash-sidebar-bottom">
          <SavedLocations position={position} onNavigate={navigateToLocation} />
          <div className="dash-user-card">
            <div className="dash-user-avatar">
              <User className="w-4 h-4" />
            </div>
            <div className="dash-user-info">
              <span className="dash-user-name">{user?.name || "Guest"}</span>
              <span className="dash-user-role">{user?.role || "user"}</span>
            </div>
            <button onClick={handleLogout} className="dash-logout-btn" title="Logout">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="dash-main">
        {/* TOP BAR */}
        <header className="dash-topbar">
          <div className="dash-topbar-left">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="dash-menu-btn">
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="dash-topbar-title">Marine Dashboard</h1>
              <p className="dash-topbar-subtitle">
                <Radio className="w-3 h-3 inline text-green-400 animate-pulse" />
                Live monitoring active
              </p>
            </div>
          </div>

          <div className="dash-topbar-right">
            <div className="dash-clock">
              <Clock className="w-4 h-4" />
              <span>{currentTime.toLocaleTimeString()}</span>
            </div>
            <div className="dash-date">
              {currentTime.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
            </div>
          </div>
        </header>

        {/* STATS ROW */}
        <div className="dash-stats-row">
          <StatCard icon={Waves} label="Wave Height" value={marineData ? marineData.wave.toFixed(2) : "--"} color="#38bdf8" unit="m" />
          <StatCard icon={Wind} label="Risk Level" value={marineData?.risk || "Loading..."} color={riskColor} />
          <StatCard icon={Navigation} label="Latitude" value={position ? position[0].toFixed(4) : "--"} color="#a78bfa" unit="°" />
          <StatCard icon={MapPin} label="Longitude" value={position ? position[1].toFixed(4) : "--"} color="#f472b6" unit="°" />
          <StatCard icon={Anchor} label="Location" value={locationName || "Detecting..."} color="#34d399" />
        </div>

        {/* DANGER ALERT BANNER */}
        {marineData?.riskLevel === "danger" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="dash-danger-banner"
          >
            <AlertTriangle className="w-5 h-5" />
            <div>
              <p className="font-bold">HIGH WAVE ALERT</p>
              <p className="text-xs opacity-80">Fishing not recommended. Avoid open sea.</p>
            </div>
            <button onClick={() => setShowStatus(true)} className="dash-banner-btn">
              View Details <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}

        {marineData?.riskLevel === "caution" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="dash-caution-banner"
          >
            <AlertTriangle className="w-5 h-5" />
            <div>
              <p className="font-bold">CAUTION - Moderate Waves</p>
              <p className="text-xs opacity-80">Only near-shore fishing recommended.</p>
            </div>
          </motion.div>
        )}

        {/* SEARCH BAR */}
        <div className="dash-search-container">
          <div className="dash-search-bar">
            <Search className="w-5 h-5 text-white/40" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search ocean, river, port, city..."
              className="dash-search-input"
            />
            <button onClick={handleSearch} className="dash-search-btn">
              Search
            </button>
          </div>

          {suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="dash-suggestions"
            >
              {suggestions.map((item, i) => (
                <div
                  key={i}
                  className="dash-suggestion-item"
                  onClick={async () => {
                    setQuery(item.display_name);
                    setSuggestions([]);
                    const selectedName = item.display_name.toLowerCase();
                    if (selectedName.includes("godavari")) {
                      if (!userLocation) { alert("Waiting for GPS..."); return; }
                      const river = rivers.godavari;
                      const nearest = findNearestRiver(userLocation.lat, userLocation.lon, river);
                      setPosition([nearest.lat, nearest.lon]);
                      setDistance(nearest.distance.toFixed(2));
                      setShape(river.polygon);
                      await handleLocation(nearest.lat, nearest.lon);
                      setLocationName("Godavari River");
                      if (mapRef) mapRef.flyTo([nearest.lat, nearest.lon], 17, { duration: 2 });
                      return;
                    }
                    setShape(null);
                    await handleLocation(item.lat, item.lon);
                    if (mapRef) mapRef.flyTo([item.lat, item.lon], 17, { duration: 2 });
                  }}
                >
                  <MapPin className="w-4 h-4 text-accent shrink-0" />
                  <span className="truncate">{item.display_name}</span>
                </div>
              ))}
            </motion.div>
          )}
        </div>

        {/* MAP */}
        <div className="dash-map-wrapper">
          {loading && (
            <div className="dash-loading-overlay">
              <div className="dash-spinner" />
              <p>Loading marine intelligence...</p>
            </div>
          )}
          <SeaMap
            position={position}
            setMapRef={setMapRef}
            riskLevel={marineData?.riskLevel}
            shape={shape}
            onPin={(lat, lon) => handleLocation(lat, lon)}
          />
        </div>

        {/* BOTTOM CARDS */}
        <div className="dash-bottom-grid">
          {/* LIVE STATUS */}
          {marineData && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="dash-card-modern"
            >
              <div className="dash-card-header">
                <Shield className="w-5 h-5 text-accent" />
                <h3>Live Marine Status</h3>
                <button onClick={() => setShowStatus(true)} className="dash-card-action">
                  Details <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="dash-status-grid-modern">
                <div className="dash-status-cell">
                  <span className="dash-status-label">Status</span>
                  <span className={`dash-risk-badge dash-risk-${marineData.riskLevel}`}>
                    {marineData.risk}
                  </span>
                </div>
                <div className="dash-status-cell">
                  <span className="dash-status-label">Wave Height</span>
                  <span className="dash-status-value">{marineData.wave.toFixed(2)} m</span>
                </div>
                <div className="dash-status-cell">
                  <span className="dash-status-label">Coordinates</span>
                  <span className="dash-status-value">{marineData.lat.toFixed(4)}, {marineData.lon.toFixed(4)}</span>
                </div>
                {distance && (
                  <div className="dash-status-cell">
                    <span className="dash-status-label">Distance</span>
                    <span className="dash-status-value">{distance} km</span>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* WEATHER HISTORY */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="dash-card-modern"
          >
            <div className="dash-card-header">
              <History className="w-5 h-5 text-accent" />
              <h3>Recent Weather Data</h3>
            </div>
            {weatherHistory.length === 0 ? (
              <p className="dash-empty-state">No weather data yet. Click on the map to start tracking.</p>
            ) : (
              <div className="dash-history-list">
                {weatherHistory.map((record) => (
                  <div key={record._id} className="dash-history-item">
                    <div>
                      <p className="dash-history-name">{record.locationName || "Unknown"}</p>
                      <p className="dash-history-time">{new Date(record.createdAt).toLocaleString()}</p>
                    </div>
                    <div className="dash-history-right">
                      <span className="dash-history-wave">{record.waveHeight?.toFixed(2)} m</span>
                      <span className={`dash-risk-badge-sm dash-risk-${record.riskLevel}`}>
                        {record.riskLevel}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        <SOSButton position={position} />
      </main>

      <StatusModal
        open={showStatus}
        onClose={() => setShowStatus(false)}
        marineData={marineData}
        locationName={locationName}
      />
    </div>
  );
}
