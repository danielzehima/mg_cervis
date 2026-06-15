import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette premium "bâtiment & décoration" : tons chauds + laiton
        brand: {
          DEFAULT: "#9a6a3c", // laiton / terre
          dark: "#7c5430",
          light: "#c79a6b",
        },
        ink: {
          DEFAULT: "#1c1917", // stone-900
          soft: "#44403c", // stone-700
        },
        cream: "#faf7f2",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
