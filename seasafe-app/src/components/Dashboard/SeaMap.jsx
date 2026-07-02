import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  Polyline,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect } from "react";

function MapEngine({ position, setMapRef, riskLevel, shape, onPin }) {
  const map = useMap();

  useEffect(() => {
    if (setMapRef) setMapRef(map);
  }, [map]);

  useEffect(() => {
    if (position) {
      map.flyTo(position, 6, { duration: 2 });
    }
  }, [position]);

  // ✅ FORCE CLICK LISTENER
  useMapEvents({
    click(e) {
      const lat = e.latlng.lat;
      const lon = e.latlng.lng;

      console.log("🟢 MAP CLICK DETECTED:", lat, lon);

      if (onPin) onPin(lat, lon);
    },
  });

  let color = "#22c55e";
  if (riskLevel === "caution") color = "#f59e0b";
  if (riskLevel === "danger") color = "#ef4444";

  return (
    <>
      {position && (
        <>
          <Marker position={position} />

          <Circle
            center={position}
            radius={60000}
            pathOptions={{
              color,
              fillColor: color,
              fillOpacity: 0.25,
              weight: 2,
            }}
          />
        </>
      )}

      {shape && (
        <Polyline
          positions={shape}
          pathOptions={{
            color: "#38bdf8",
            weight: 4,
          }}
        />
      )}
    </>
  );
}

export default function SeaMap({
  position,
  setMapRef,
  riskLevel,
  shape,
  onPin,
}) {
  return (
    <div
      style={{
        height: "450px",
        width: "100%",
        position: "relative",
        zIndex: 1, // 🔥 IMPORTANT FIX
      }}
    >
      <MapContainer
        center={[15, 80]}
        zoom={4}
        style={{
          height: "100%",
          width: "100%",
          zIndex: 1,
        }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <MapEngine
          position={position}
          setMapRef={setMapRef}
          riskLevel={riskLevel}
          shape={shape}
          onPin={onPin}
        />
      </MapContainer>
    </div>
  );
}