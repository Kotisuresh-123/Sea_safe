export async function geoSearch(query) {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${query}&limit=8`
  );

  return await res.json();
}