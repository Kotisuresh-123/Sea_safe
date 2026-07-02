const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const CITY = "Adoni";
console.log(import.meta.env.VITE_WEATHER_API_KEY);
export async function getWeather() {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`
  );

  const data = await res.json();
  return data;
}