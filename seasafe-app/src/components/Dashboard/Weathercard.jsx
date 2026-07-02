import { useState } from "react";
import Card from "../common/Card";

export default function WeatherCard() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const oceanLocations = {
  "bay of bengal": { lat: 15.0, lon: 88.0 },
  "arabian sea": { lat: 15.0, lon: 65.0 },
  "indian ocean": { lat: -10.0, lon: 80.0 },
  "pacific ocean": { lat: 0.0, lon: -160.0 }
};

  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const getWeather = async () => {
  if (!city.trim()) return;

  setLoading(true);
  setError("");
  setWeather(null);

  try {
    let lat, lon, displayName;

    const key = city.toLowerCase().trim();

    // 🌊 STEP 1: Check ocean list first
    if (oceanLocations[key]) {
      lat = oceanLocations[key].lat;
      lon = oceanLocations[key].lon;
      displayName = city;
    } else {
      // 🌍 STEP 2: Normal city lookup
      const geoRes = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
      );

      const geoData = await geoRes.json();

      if (!geoData.length) {
        throw new Error("Location not found (try a city or supported sea)");
      }

      lat = geoData[0].lat;
      lon = geoData[0].lon;
      displayName = `${geoData[0].name}, ${geoData[0].country}`;
    }

    // 🌦️ STEP 3: Get weather using coordinates
    const weatherRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );

    const data = await weatherRes.json();

    if (data.cod !== 200) {
      throw new Error(data.message);
    }

    setWeather({
      ...data,
      searchName: displayName,
      lat,
      lon
    });

  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <Card title="🌦️ Weather Search">
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "15px",
        }}
      >
        <input
          type="text"
          placeholder="Enter location..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              getWeather();
            }
          }}
          style={{
            flex: 1,
            padding: "10px",
            borderRadius: "6px",
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={getWeather}
          style={{
            padding: "10px 15px",
            cursor: "pointer",
            borderRadius: "6px",
          }}
        >
          Search
        </button>
      </div>

      {loading && <p>⏳ Loading weather...</p>}

      {error && (
        <p style={{ color: "red" }}>
          ❌ {error}
        </p>
      )}

      {weather && (
        <div>
          <p>
            <strong>📍 Location:</strong> {weather.searchName}
          </p>

          <p>
            <strong>🌡 Temperature:</strong>{" "}
            {weather.main.temp} °C
          </p>

          <p>
            <strong>🤔 Feels Like:</strong>{" "}
            {weather.main.feels_like} °C
          </p>

          <p>
            <strong>💧 Humidity:</strong>{" "}
            {weather.main.humidity}%
          </p>

          <p>
            <strong>🌬 Wind Speed:</strong>{" "}
            {weather.wind.speed} m/s
          </p>

          <p>
            <strong>☁ Weather:</strong>{" "}
            {weather.weather[0].description}
          </p>

          <p>
            <strong>🌍 Latitude:</strong> {weather.lat}
          </p>

          <p>
            <strong>🌍 Longitude:</strong> {weather.lon}
          </p>
        </div>
      )}
    </Card>
  );
}