import { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import SeaMap from "../components/Dashboard/SeaMap";
import Card from "../components/common/Card";
import StatusModal from "../components/Dashboard/StatusModel";
import { getMarineWeather } from "../services/marine";
import { geoShapes } from "../services/geoShapes";
import { getLocationName } from "../services/reverseGeocode";

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

  // 🌍 Auto location on load
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        await handleLocation(pos.coords.latitude, pos.coords.longitude);
        setLocationName("Current Location");
      },
      async () => {
        await handleLocation(15, 88);
        setLocationName("Bay of Bengal");
      }
    );
  }, []);

  // 🌊 Marine engine
const handleLocation = async (lat, lon) => {
  const newPos = [lat, lon];
  setPosition(newPos);

  // 🌍 GET ADDRESS (NEW FIX)
  const name = await getLocationName(lat, lon);
  setLocationName(name);

  try {
    const marine = await getMarineWeather(lat, lon);
    const wave = marine.waveHeight || 0;

    let risk = "🟢 SAFE";
    let riskLevel = "safe";

    if (wave > 1.5) {
      risk = "🟡 CAUTION";
      riskLevel = "caution";
    }

    if (wave > 2.5) {
      risk = "🔴 DANGER";
      riskLevel = "danger";
    }

    setMarineData({
      wave,
      risk,
      riskLevel,
      lat,
      lon,
    });

    setLoading(false);
  } catch (err) {
    console.error(err);
    setLoading(false);
  }
};

  // 🔍 SEARCH FUNCTION
  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=6`
      );

      const data = await res.json();

      if (!data.length) return alert("No location found");

      const best = data[0];

      setLocationName(best.display_name);

      await handleLocation(best.lat, best.lon);

      if (mapRef) {
        mapRef.flyTo([best.lat, best.lon], 7, {
          duration: 2.5,
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 🌍 LIVE AUTOCOMPLETE
  useEffect(() => {
    if (query.length < 3) {
      setSuggestions([]);
      return;
    }

    const delay = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=6`
        );

        const data = await res.json();
        setSuggestions(data);
      } catch (err) {
        console.error(err);
      }
    }, 350);

    return () => clearTimeout(delay);
  }, [query]);

  // 🌊 SHAPE LOGIC (FIXED - IMPORTANT)
  useEffect(() => {
    const name = query.toLowerCase();

    if (name.includes("bay")) {
      setShape(geoShapes.bay_of_bengal);
    } else if (name.includes("arabian")) {
      setShape(geoShapes.arabian_sea);
    } else if (name.includes("ganga")) {
      setShape(geoShapes.ganga_river);
    } else {
      setShape(null);
    }
  }, [query]);

  return (
    <div className="dashboard">
      <Header />

      {/* 🔍 SEARCH */}
      <Card title="🔍 Marine AI Search">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search ocean, river, sea..."
        />

        <button onClick={handleSearch}>Search</button>

        {/* 🌍 Suggestions */}
        {suggestions.length > 0 && (
          <div className="suggest-box show">
            {suggestions.map((item, i) => (
              <div
                key={i}
                className="suggest-item"
                onClick={() => {
                  setQuery(item.display_name);
                  setSuggestions([]);
                  setShape(null);
                  handleLocation(item.lat, item.lon);
                }}
              >
                📍 {item.display_name}
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* 🗺️ MAP */}
      <SeaMap
        position={position}
        setMapRef={setMapRef}
        riskLevel={marineData?.riskLevel}
        shape={shape}
        onPin={(lat, lon) => handleLocation(lat, lon)}
      />

      {/* ⏳ LOADING */}
      {loading && <p>⏳ Loading marine intelligence...</p>}

      {/* 🌊 STATUS */}
      {marineData && (
        <Card title="🌊 Live Marine Status">
          <p><b>Location:</b> {locationName}</p>
          <p><b>Status:</b> {marineData.risk}</p>
          <p><b>Wave:</b> {marineData.wave.toFixed(2)} m</p>
        </Card>
      )}

      {/* 🧠 MODAL */}
      <StatusModal
        open={showStatus}
        onClose={() => setShowStatus(false)}
        marineData={marineData}
        locationName={locationName}
      />
    </div>
  );
}