import { getNearestPlace } from "./nearestPlace";

export async function getLocationName(lat, lon) {
  try {
    // 🌍 STEP 1: nearest land/port/coastal place (MOST IMPORTANT)
    const place = await getNearestPlace(lat, lon);

    // 🌍 STEP 2: reverse geocode (land fallback)
    const res = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10`
    );

    const data = await res.json();
    const addr = data.address || {};

    const landName =
      addr.city ||
      addr.town ||
      addr.village ||
      addr.suburb ||
      addr.state_district ||
      addr.county;

    // 🌊 CASE 1: nearest known place (BEST RESULT)
    if (place?.name) {
      return `${place.name} Coast 🌊`;
    }

    // 🌍 CASE 2: land fallback
    if (landName) {
      return landName;
    }

    // 🌊 CASE 3: ocean fallback
    return getOceanZone(lat, lon);
  } catch (err) {
    console.error("Location error:", err);
    return getOceanZone(lat, lon);
  }
}

/* 🌊 OCEAN CLASSIFICATION ENGINE */
function getOceanZone(lat, lon) {
  // 🌊 Bay of Bengal
  if (lat >= 5 && lat <= 22 && lon >= 80 && lon <= 100) {
    return "Bay of Bengal 🌊";
  }

  // 🌊 Arabian Sea
  if (lat >= 5 && lat <= 25 && lon >= 55 && lon <= 75) {
    return "Arabian Sea 🌊";
  }

  // 🌊 Indian Ocean
  if (lat < 5 || lon < 50 || lon > 100) {
    return "Indian Ocean 🌊";
  }

  return `Open Sea (${lat.toFixed(2)}, ${lon.toFixed(2)}) 🌊`;
}