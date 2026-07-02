export async function getNearestCoast(lat, lon) {
  try {
    const query = `
      [out:json];
      (
        way["natural"="coastline"](around:300,${lat},${lon});
      );
      out center;
    `;

    const url = "https://overpass-api.de/api/interpreter";

    const res = await fetch(url, {
      method: "POST",
      body: query,
    });

    const data = await res.json();

    if (data.elements && data.elements.length > 0) {
      return {
        nearCoast: true,
        type: "coast",
      };
    }

    return {
      nearCoast: false,
    };
  } catch (err) {
    console.error("Coast check failed:", err);
    return { nearCoast: false };
  }
}