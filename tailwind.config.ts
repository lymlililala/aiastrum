import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        cinzel: ["Cinzel", "serif"],
        crimson: ["Crimson Text", "serif"],
      },
      colors: {
        gold: {
          DEFAULT: "#c9a84c",
          light: "#e8d5a3",
          dark: "#8b6914",
          glow: "#f0e68c",
        },
        deep: {
          purple: "#15121D",   /* 深空灰紫，比纯黑更护眼 */
          midnight: "#1c1828",
          cosmic: "#2d1b69",
          mystic: "#4a2c8a",
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
        "float": "float 3s ease-in-out infinite",
        "spin-slow": "spin-slow 8s linear infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "twinkle": "twinkle 2s ease-in-out infinite",
        "shuffle": "shuffle 0.4s ease-in-out",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 15px rgba(201, 168, 76, 0.3)" },
          "50%": {
            boxShadow:
              "0 0 30px rgba(201, 168, 76, 0.6), 0 0 60px rgba(201, 168, 76, 0.2)",
          },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        shuffle: {
          "0%": { transform: "translateX(0) rotate(0deg)" },
          "25%": { transform: "translateX(-20px) rotate(-5deg)" },
          "75%": { transform: "translateX(20px) rotate(5deg)" },
          "100%": { transform: "translateX(0) rotate(0deg)" },
        },
      },
      backgroundImage: {
        "mystic-gradient":
          "linear-gradient(135deg, #15121D 0%, #2d1b69 50%, #15121D 100%)",
        "gold-gradient":
          "linear-gradient(135deg, #c9a84c 0%, #8b6914 50%, #c9a84c 100%)",
      },
      boxShadow: {
        gold: "0 0 20px rgba(201, 168, 76, 0.3)",
        "gold-lg": "0 0 40px rgba(201, 168, 76, 0.5)",
        mystic: "0 0 30px rgba(74, 44, 138, 0.4)",
      },
    },
  },
  plugins: [],
} satisfies Config;
