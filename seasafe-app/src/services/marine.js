export async function getMarineWeather(lat, lon) {
  const res = await fetch(
    `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&hourly=wave_height,wave_direction,wave_period`
  );

  const data = await res.json();

  const waves = data.hourly?.wave_height;

  const waveHeight =
    waves && waves.length > 0
      ? waves[waves.length - 1]
      : 0;

  return {
    waveHeight,
    raw: data
  };
}