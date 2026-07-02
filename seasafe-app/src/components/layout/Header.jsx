import { useEffect, useState } from "react";

export default function Header() {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="header">
      <div>
        <h1>🌊 SeaSafe</h1>
        <p>Marine Safety & Fisherman Assistance Platform</p>
      </div>

      <div>
        <strong>{time}</strong>
      </div>
    </header>
  );
}