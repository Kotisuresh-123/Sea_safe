export default function WaveDivider({ flip = false, className = "", fill = "#F8FBFF" }) {
  return (
    <div
      className={`wave-divider overflow-hidden leading-none ${flip ? "rotate-180" : ""} ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-[200%] h-[60px] animate-wave-slow"
        viewBox="0 0 2400 120"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,60 C150,110 450,10 600,60 C750,110 1050,10 1200,60 C1350,110 1650,10 1800,60 C1950,110 2250,10 2400,60 L2400,120 L0,120 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}
