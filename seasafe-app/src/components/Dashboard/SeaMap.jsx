import {
  MapContainer,
  TileLayer,
  Marker,
  Circle,
  Polyline,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useMemo } from "react";
import L from "leaflet";

function createColoredIcon(color) {
  return L.divIcon({
    className: "",
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -42],
    html: `
      <div style="position:relative;width:30px;height:42px;">
        <svg viewBox="0 0 30 42" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 0C6.716 0 0 6.716 0 15c0 11.25 15 27 15 27s15-15.75 15-27C30 6.716 23.284 0 15 0z" fill="${color}" stroke="white" stroke-width="2"/>
          <circle cx="15" cy="15" r="7" fill="white" opacity="0.9"/>
        </svg>
      </div>
    `,
  });
}

function MapEngine({ position, setMapRef, riskLevel, shape, onPin }) {
  const map = useMap();

  useEffect(() => {
    if (setMapRef) setMapRef(map);
  }, [map]);

  useEffect(() => {
    if (position) {
      map.flyTo(position, 14, { duration: 2 });
    }
  }, [position]);

  useMapEvents({
    click(e) {
      if (onPin) onPin(e.latlng.lat, e.latlng.lng);
    },
  });

  const colorMap = {
    safe: "#22c55e",
    caution: "#f59e0b",
    danger: "#ef4444",
  };

  const color = colorMap[riskLevel] || "#22c55e";
  const markerIcon = useMemo(() => createColoredIcon(color), [color]);

  return (
    <>
      {position && (
        <>
          <Marker position={position} icon={markerIcon} />
          <Circle
            center={position}
            radius={60000}
            pathOptions={{
              color,
              fillColor: color,
              fillOpacity: 0.15,
              weight: 2,
              dashArray: riskLevel === "caution" ? "8, 6" : undefined,
            }}
          />
          <Circle
            center={position}
            radius={25000}
            pathOptions={{
              color,
              fillColor: color,
              fillOpacity: 0.1,
              weight: 1,
              opacity: 0.5,
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

export default function SeaMap({ position, setMapRef, riskLevel, shape, onPin }) {
  const colorMap = {
    safe: "#22c55e",
    caution: "#f59e0b",
    danger: "#ef4444",
  };
  const color = colorMap[riskLevel] || "#22c55e";

  return (
    <div style={{ height: "450px", width: "100%", position: "relative", zIndex: 1 }}>
      <MapContainer
        center={[16.5, 82.2]}
        zoom={8}
        maxZoom={20}
        minZoom={5}
        zoomControl={true}
        style={{ height: "100%", width: "100%", zIndex: 1 }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution="&copy; CARTO &copy; OpenStreetMap"
        />
        <MapEngine
          position={position}
          setMapRef={setMapRef}
          riskLevel={riskLevel}
          shape={shape}
          onPin={onPin}
        />
      </MapContainer>

      {riskLevel && (
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            zIndex: 500,
            background: "rgba(10,15,30,0.85)",
            backdropFilter: "blur(10px)",
            border: `1px solid ${color}40`,
            borderRadius: 12,
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "white",
            fontSize: 13,
            fontWeight: 600,
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: color,
              boxShadow: `0 0 8px ${color}80`,
              animation: "sos-ring 2s ease-out infinite",
            }}
          />
          {riskLevel === "safe" && "SAFE ZONE"}
          {riskLevel === "caution" && "CAUTION ZONE"}
          {riskLevel === "danger" && "DANGER ZONE"}
        </div>
      )}

      <div
        style={{
          position: "absolute",
          bottom: 12,
          left: 12,
          zIndex: 500,
          background: "rgba(10,15,30,0.85)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 10,
          padding: "8px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 4,
          color: "white",
          fontSize: 11,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }} />
          <span style={{ opacity: 0.7 }}>Safe</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#f59e0b" }} />
          <span style={{ opacity: 0.7 }}>Caution</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#ef4444" }} />
          <span style={{ opacity: 0.7 }}>Danger</span>
        </div>
      </div>
    </div>
  );
}
