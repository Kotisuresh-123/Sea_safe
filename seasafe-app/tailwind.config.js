/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#0A66C2",
        secondary: "#00B4D8",
        accent: "#4CC9F0",
        bglight: "#F8FBFF",
        bgdark: "#021526",
        inktext: "#0F172A",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "ocean-gradient":
          "linear-gradient(135deg, #021526 0%, #073B4C 35%, #0A66C2 70%, #00B4D8 100%)",
        "glow-radial":
          "radial-gradient(circle at 50% 50%, rgba(76,201,240,0.35) 0%, rgba(76,201,240,0) 70%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(2, 21, 38, 0.25)",
        card: "0 10px 40px -12px rgba(10, 102, 194, 0.35)",
      },
      keyframes: {
        wave: {
          "0%": { transform: "translateX(0) translateZ(0)" },
          "100%": { transform: "translateX(-50%) translateZ(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(1.5deg)" },
        },
        sonar: {
          "0%": { transform: "scale(0.3)", opacity: "0.7" },
          "100%": { transform: "scale(1)", opacity: "0" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        wave: "wave 18s linear infinite",
        "wave-slow": "wave 30s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        sonar: "sonar 3s cubic-bezier(0,0,0.2,1) infinite",
        "pulse-slow": "pulse-slow 3.5s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};
