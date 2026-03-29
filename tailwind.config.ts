import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#050508",
        surface: "#0D0D14",
        edge: "#1A1A2E",
        accent: {
          DEFAULT: "#2563EB",
          glow: "#3B82F6",
        },
        snow: "#F8F9FF",
        muted: "#6B7280",
        dim: "#374151",
      },
      fontFamily: {
        display: ["var(--font-instrument-serif)", "Georgia", "serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      maxWidth: {
        "8xl": "1280px",
      },
      letterSpacing: {
        tight: "-0.03em",
      },
      animation: {
        "mesh-1": "mesh1 14s ease-in-out infinite",
        "mesh-2": "mesh2 18s ease-in-out infinite",
        "mesh-3": "mesh3 22s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        shimmer: "shimmer 0.7s ease-out forwards",
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "line-expand": "lineExpand 0.3s ease-out forwards",
      },
      keyframes: {
        mesh1: {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)" },
          "33%": { transform: "translate(8%, -8%) scale(1.12)" },
          "66%": { transform: "translate(-4%, 6%) scale(0.93)" },
        },
        mesh2: {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)" },
          "33%": { transform: "translate(-6%, 10%) scale(1.08)" },
          "66%": { transform: "translate(10%, -4%) scale(0.96)" },
        },
        mesh3: {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)" },
          "50%": { transform: "translate(4%, 4%) scale(1.06)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          from: { backgroundPosition: "-200% 0" },
          to: { backgroundPosition: "200% 0" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        lineExpand: {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
