import type { Config } from "tailwindcss";
const config:Config = {
  theme: {
    extend: {
      fontFamily: {
        brandon: ["var(--font-brandon)", "sans-serif"],
        serif: ["var(--font-cormorant-garamond)", "serif"],
      },
    },
  },
};
export default config;