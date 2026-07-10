import { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import SeaMap from "../components/Dashboard/SeaMap";
import Card from "../components/common/Card";
import StatusModal from "../components/Dashboard/StatusModel";
import { getMarineWeather } from "../services/marine";
import { geoShapes } from "../services/geoShapes";
import { getLocationName } from "../services/reverseGeocode";
import "../styles/Dashboard.css";

import {
startLocationTracking
}
from "../utils/location";


import {
searchMarine
}
from "../services/geoSearch";


import {
rivers
}
from "../data/rivers";


import {
findNearestRiver
}
from "../services/nearestFeature";


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

  const [userLocation,setUserLocation]=useState(null);

const [distance,setDistance]=useState(null);

// const [shape,setShape]=useState(null);

  // 🌍 Auto location on load
useEffect(()=>{


startLocationTracking(
(location)=>{


setUserLocation(location);


handleLocation(
location.lat,
location.lon
);


}
);


},[]);

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


  const searchText = query.toLowerCase();



  // ===============================
  // SPECIAL MARINE FEATURES FIRST
  // ===============================

  if (
    searchText.includes("godavari") ||
    searchText.includes("godavari river")
  ) {


    if(!userLocation){
      alert("Waiting for GPS location...");
      return;
    }


    const river = rivers.godavari;


    const nearest = findNearestRiver(
      userLocation.lat,
      userLocation.lon,
      river
    );



    // move marker directly
    setPosition([
      nearest.lat,
      nearest.lon
    ]);



    // distance
    setDistance(
      nearest.distance.toFixed(2)
    );



    // highlight river
    setShape(
      river.polygon
    );



    // fly directly
    if(mapRef){

      mapRef.flyTo(
        [
          nearest.lat,
          nearest.lon
        ],
        17,
        {
          duration:2
        }
      );

    }



    // update marine data
    await handleLocation(
      nearest.lat,
      nearest.lon
    );



    setLocationName(
      "Godavari River"
    );


    return;   // IMPORTANT
  }





  // ===============================
  // NORMAL SEARCH
  // ===============================


  const results =
  await searchMarine(
    query,
    userLocation
  );


  if(!results.length)
  return;



  const best =
  results[0];


  await handleLocation(
    best.lat,
    best.lon
  );


  if(mapRef){

    mapRef.flyTo(
      [
        best.lat,
        best.lon
      ],
      17,
      {
        duration:2
      }
    );

  }


};

  // 🌍 LIVE AUTOCOMPLETE
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


    } catch(err) {

      console.error(err);

    }


  },350);


  return () => clearTimeout(delay);


},[query]);

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
    <div className="dash-dashboard">
      <Header />

      {/* 🔍 SEARCH */}
      <Card title="🔍 Marine AI Search">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search ocean, river, sea..."
        />

        <button className="dash-button" onClick={handleSearch}>Search</button>

        {/* 🌍 Suggestions */}
        {suggestions.length > 0 && (
          <div className="dash-suggest-box show">
            {suggestions.map((item, i) => (
              <div
                key={i}
                className="dash-suggest-item"
               onClick={async () => {

  setQuery(item.display_name);
  setSuggestions([]);


  const selectedName = item.display_name.toLowerCase();



  // ==============================
  // GODAVARI SPECIAL HANDLING
  // ==============================

  if (selectedName.includes("godavari")) {


    if (!userLocation) {
      alert("Waiting for GPS location...");
      return;
    }


    const river = rivers.godavari;



    // Find nearest point of Godavari
    const nearest = findNearestRiver(
      userLocation.lat,
      userLocation.lon,
      river
    );



    // Move ship marker
    setPosition([
      nearest.lat,
      nearest.lon
    ]);



    // Calculate distance
    setDistance(
      nearest.distance.toFixed(2)
    );



    // Highlight full river
    setShape(
      river.polygon
    );



    // Update marine data
    await handleLocation(
      nearest.lat,
      nearest.lon
    );



    // Set correct name
    setLocationName(
      "Godavari River"
    );



    // Fly map to nearest river point
    if (mapRef) {

      mapRef.flyTo(
        [
          nearest.lat,
          nearest.lon
        ],
        17,
        {
          duration: 2
        }
      );

    }


    return;

  }



  // ==============================
  // NORMAL LOCATION SEARCH
  // ==============================


  setShape(null);


  await handleLocation(
    item.lat,
    item.lon
  );


  if (mapRef) {

    mapRef.flyTo(
      [
        item.lat,
        item.lon
      ],
      17,
      {
        duration: 2
      }
    );

  }


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
  <div className="dash-marine-status">

    <div className="dash-status-item">
      <span className="dash-label">📍 Location</span>
      <span className="dash-value">{locationName}</span>
    </div>

    <div className="dash-status-item">
      <span className="dash-label">⚠ Status</span>

      <span
        className={`dash-status-badge ${
          marineData.riskLevel === "safe"
            ? "dash-safe"
            : marineData.riskLevel === "caution"
            ? "dash-caution"
            : "dash-danger"
        }`}
      >
        {marineData.risk}
      </span>
    </div>

    <div className="dash-status-item">
      <span className="dash-label">🌊 Wave Height</span>
      <span className="dash-wave">
        {marineData.wave.toFixed(2)} m
      </span>
    </div>

  </div>
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