export default function Button({ label, onClick, type = "primary" }) {
  return (
    <button className={`btn ${type}`} onClick={onClick}>
      {label}
    </button>
  );
}