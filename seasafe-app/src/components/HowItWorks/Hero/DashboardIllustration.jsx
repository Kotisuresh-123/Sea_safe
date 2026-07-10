export default function DashboardIllustration() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      {/* sonar sweep rings — signature element */}
      <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-accent/30" aria-hidden="true" />
      <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-accent/40 animate-sonar" aria-hidden="true" />
      <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-accent/40 animate-sonar [animation-delay:1s]" aria-hidden="true" />
      <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full border border-accent/40 animate-sonar [animation-delay:2s]" aria-hidden="true" />

      <svg
        viewBox="0 0 400 400"
        className="relative w-72 h-72 sm:w-96 sm:h-96 animate-float-slow"
        role="img"
        aria-label="Illustration of an AI-calculated safe route from a satellite to a ship across the ocean map, with weather and emergency indicators"
      >
        <defs>
          <linearGradient id="oceanCircle" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#073B4C" />
            <stop offset="100%" stopColor="#0A66C2" />
          </linearGradient>
          <linearGradient id="routeLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4CC9F0" />
            <stop offset="100%" stopColor="#00B4D8" />
          </linearGradient>
        </defs>

        <circle cx="200" cy="200" r="150" fill="url(#oceanCircle)" opacity="0.9" />
        <circle cx="200" cy="200" r="150" fill="none" stroke="#4CC9F0" strokeOpacity="0.25" strokeWidth="1" />

        {/* lat/long grid */}
        {[110, 150, 200, 250, 290].map((y) => (
          <line key={`h-${y}`} x1="60" y1={y} x2="340" y2={y} stroke="#4CC9F0" strokeOpacity="0.08" />
        ))}
        {[110, 150, 200, 250, 290].map((x) => (
          <line key={`v-${x}`} y1="60" x1={x} y2="340" x2={x} stroke="#4CC9F0" strokeOpacity="0.08" />
        ))}

        {/* AI route path */}
        <path
          d="M110,290 C150,250 130,190 180,170 C220,155 240,110 290,95"
          fill="none"
          stroke="url(#routeLine)"
          strokeWidth="3"
          strokeDasharray="2 10"
          strokeLinecap="round"
        />

        {/* danger zone */}
        <circle cx="250" cy="230" r="26" fill="#F87171" fillOpacity="0.12" stroke="#F87171" strokeOpacity="0.4" strokeDasharray="4 4" />

        {/* satellite */}
        <g transform="translate(290,95)">
          <circle r="14" fill="#021526" stroke="#4CC9F0" strokeWidth="1.5" />
          <rect x="-24" y="-4" width="14" height="8" rx="1.5" fill="#4CC9F0" fillOpacity="0.7" />
          <rect x="10" y="-4" width="14" height="8" rx="1.5" fill="#4CC9F0" fillOpacity="0.7" />
        </g>

        {/* ship */}
        <g transform="translate(110,290)">
          <path d="M-16,0 L16,0 L11,12 L-11,12 Z" fill="#F8FBFF" />
          <rect x="-3" y="-16" width="6" height="16" fill="#F8FBFF" />
          <path d="M3,-16 L18,-8 L3,-2 Z" fill="#4CC9F0" />
        </g>

        {/* weather cloud */}
        <g transform="translate(180,170)" opacity="0.9">
          <circle cx="0" cy="0" r="9" fill="#F8FBFF" fillOpacity="0.85" />
          <circle cx="10" cy="3" r="7" fill="#F8FBFF" fillOpacity="0.85" />
          <circle cx="-9" cy="4" r="6" fill="#F8FBFF" fillOpacity="0.85" />
        </g>

        {/* emergency alert marker */}
        <g transform="translate(240,110)">
          <circle r="10" fill="#F8FBFF" fillOpacity="0.08" stroke="#4CC9F0" />
          <text x="0" y="4" textAnchor="middle" fontSize="12" fill="#4CC9F0" fontFamily="monospace">!</text>
        </g>
      </svg>
    </div>
  );
}
