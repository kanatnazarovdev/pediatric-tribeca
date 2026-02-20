// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Apa Aesthetic Palette
        background: "#FFFFFF",
        foreground: "#1A1A1A", // Soft black, not harsh
        luxury: {
          gold: "#D4AF37",    // Subtle gold for small accents
          cream: "#F9F8F6",   // Background for alternate sections
          slate: "#2C2C2C",   // For dark-mode sections
        },
      },
      fontFamily: {
        // High-end Serif and Clean Sans
        serif: ["var(--font-cormorant-garamond)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      letterSpacing: {
        'ultra-wide': '0.3em', // Signature luxury look
      }
    },
  },
  plugins: [],
};
export default config;