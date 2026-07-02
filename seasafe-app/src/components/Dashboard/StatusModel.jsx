export default function StatusModal({
  open,
  onClose,
  marineData,
  locationName,
}) {
  if (!open) return null;

  const getFishingAdvice = (risk) => {
    if (risk === "🔴 DANGER") {
      return "🚫 Avoid fishing. High wave activity detected.";
    }
    if (risk === "🟡 CAUTION") {
      return "⚠️ Risky conditions. Only near shore fishing recommended.";
    }
    return "🟢 Safe for fishing operations.";
  };

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>🌊 Marine Intelligence Report</h2>

        <p><strong>Location:</strong> {locationName}</p>

        <p><strong>Wave Height:</strong> {marineData?.wave} m</p>

        <p><strong>Status:</strong> {marineData?.risk}</p>

        <p><strong>Latitude:</strong> {marineData?.lat}</p>
        <p><strong>Longitude:</strong> {marineData?.lon}</p>

        {/* 🧠 NEW INSIGHT */}
        <div style={{ marginTop: "10px" }}>
          <p><strong>Fishing Advisory:</strong></p>
          <p>{getFishingAdvice(marineData?.risk)}</p>
        </div>

        <button onClick={onClose} style={{ marginTop: "10px" }}>
          Close
        </button>
      </div>
    </div>
  );
}