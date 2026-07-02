export default function AlertBanner({ marineData }) {
  if (!marineData) return null;

  if (marineData.wave < 2.5) return null;

  return (
    <div className="alert-banner">
      ⚠️ HIGH WAVE ALERT — Fishing Not Recommended
    </div>
  );
}