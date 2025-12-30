/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "kh-gold": "#FFD700",
        "kh-dark": "#1b142f",
        "kh-purple": "#2d1b4e",
        "kh-purple-light": "#3d2b5e",
      },
      fontFamily: {
        nunito: ["Nunito Sans", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-cosmic":
          "linear-gradient(135deg, #1b142f 0%, #2d1b4e 50%, #1b142f 100%)",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        glow: "glow 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(255, 215, 0, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(255, 215, 0, 0.6)" },
        },
      },
    },
  },
  plugins: [],
};
