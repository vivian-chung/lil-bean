import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F1E9D2",
        creamSoft: "#EDE3C5",
        forest: "#1F4030",
        forestDark: "#142A20",
        olive: "#B8C49E",
        ink: "#1A1A1A",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
        serif: ["var(--font-lora)", "ui-serif", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
