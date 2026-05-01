/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#081120",
        panel: "rgba(8, 17, 32, 0.7)",
        accent: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
        },
      },
      boxShadow: {
        glow: "0 20px 80px rgba(34, 211, 238, 0.18)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(34,211,238,0.18), transparent 34%), radial-gradient(circle at top right, rgba(16,185,129,0.16), transparent 28%), linear-gradient(135deg, rgba(8,17,32,0.98), rgba(12,20,38,0.92))",
      },
    },
  },
  plugins: [],
};
