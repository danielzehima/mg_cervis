import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Charte MG CERVIS : bleu marine + orange
        brand: {
          DEFAULT: "#f7941d", // orange MG
          dark: "#d97d0a",
          light: "#ffb44d",
        },
        navy: {
          DEFAULT: "#14305f", // bleu marine MG
          dark: "#0e2347",
          light: "#1d4380",
        },
        ink: {
          DEFAULT: "#1c1917", // stone-900 (texte)
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
