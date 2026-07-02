export async function getNearestPlace(lat, lon) {
  try {
    // 🌍 search nearby coastal/land places within 1km
    const query = `
      [out:json];
      (
        node(around:1000,${lat},${lon})["place"];
        way(around:1000,${lat},${lon})["place"];
      );
      out center;
    `;

    const res = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: query,
    });

    const data = await res.json();

    if (!data.elements || data.elements.length === 0) {
      return null;
    }

    // pick closest place
    const place = data.elements[0];

    return {
      name: place.tags?.name || "Nearby Place",
      lat: place.lat || place.center?.lat,
      lon: place.lon || place.center?.lon,
    };
  } catch (err) {
    console.error(err);
    return null;
  }
}