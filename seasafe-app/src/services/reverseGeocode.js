import { getNearestPlace } from "./nearestPlace";

// 🌍 Main function
export async function getLocationName(lat, lon) {
  try {
    // STEP 1 - Reverse Geocoding
    const reverseRes = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1&namedetails=1&accept-language=en`,
      {
        headers: {
          "User-Agent": "SeaSafe Marine Intelligence",
        },
      }
    );

    const reverse = await reverseRes.json();

    const address = reverse.address || {};

    const landName =
      address.city ||
      address.town ||
      address.village ||
      address.hamlet ||
      address.suburb ||
      address.neighbourhood ||
      address.county ||
      address.state_district;

    // ===========================
    // 🌊 DECISION LOGIC STARTS HERE
    // ===========================

    // If clicked on sea/ocean/bay
    if (
      address.sea ||
      address.ocean ||
      reverse.type === "water"
    ) {
      // Search nearest coastal place
      const nearest = await getNearestPlace(lat, lon);

      if (nearest) {
        // If coast is within 300 meters
        if (nearest.distance <= 300) {
          return `${nearest.name} Coast 🌊`;
        }

        // Between 300m and 5km
        if (nearest.distance <= 5000) {
          return `Near ${nearest.name} Coast 🌊`;
        }
      }

      // No nearby coast → show sea/ocean
      return (
        address.sea ||
        address.ocean ||
        getOceanZone(lat, lon)
      );
    }

    // ===========================
    // LAND AREA
    // ===========================

    if (landName) {
      return landName;
    }

    // Final fallback
    return getOceanZone(lat, lon);
  } catch (err) {
    console.error(err);
    return getOceanZone(lat, lon);
  }
}

/* ======================================================
   OCEAN REGION CLASSIFIER
====================================================== */

function getOceanZone(lat, lon) {
  // Bay of Bengal
  if (lat >= 5 && lat <= 22 && lon >= 80 && lon <= 100)
    return "Bay of Bengal 🌊";

  // Arabian Sea
  if (lat >= 5 && lat <= 25 && lon >= 55 && lon <= 75)
    return "Arabian Sea 🌊";

  // Indian Ocean
  if (lat < 5 || lon < 50 || lon > 100)
    return "Indian Ocean 🌊";

  return `Open Sea (${lat.toFixed(3)}, ${lon.toFixed(3)}) 🌊`;
}