import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // TO DIRECT Electric Blue Signature
        brand: {
          blue: "#2563FF",
          "blue-deep": "#1748D8",
          "blue-soft": "#EAF0FF",
          "blue-pale": "#F4F7FF",
          cream: "#FFFDF7",
          "cream-warm": "#F8F5EC",
          pure: "#FFFFFF",
          navy: "#172033",
          slate: "#596579",
          muted: "#7A8496",
          border: "#E6E8EF",
          divider: "#ECEEF3",
          lime: "#D9F99D",
          "lime-text": "#1A380A",
        },
        // Accretion Accent (Mapped to Electric Blue for TO DIRECT identity)
        accent: {
          DEFAULT: "#2563FF",
          hover: "#1748D8",
          dark: "#0F36B3",
          light: "#5285FF",
          lighter: "#94B4FF",
          muted: "#D4E2FF",
          wash: "#EAF0FF",
          "wash-subtle": "rgba(37, 99, 255, 0.1)",
        },
        // Warm Cream Background & surfaces
        cream: {
          DEFAULT: "#F8F6F1",
          light: "#FFFDF7",
          gold: "#F59E0B",
          card: "#FFFFFF",
        },
        // Deep Editorial Dark for High-Contrast Accretion-style cards & sections
        neutral: {
          950: "#090D16",
          900: "#0D1322",
          850: "#111A2E",
          800: "#172033",
          750: "#1C273E",
          700: "#24324F",
          650: "#2E3F63",
          600: "#41537A",
          500: "#596579",
          400: "#7A8496",
          300: "#A2ABC0",
          200: "#D3D9E6",
          150: "#E6E8EF",
          100: "#F1F3F9",
          50: "#F8F9FD",
        },
        // Semantics
        success: {
          DEFAULT: "#16856B",
          dark: "#116753",
          wash: "rgba(22, 133, 107, 0.12)",
        },
        warning: {
          DEFAULT: "#B7791F",
          wash: "rgba(183, 121, 31, 0.12)",
        },
        error: {
          DEFAULT: "#C43C4E",
          wash: "rgba(196, 60, 78, 0.12)",
        },
        purple: {
          DEFAULT: "#7C3AED",
          wash: "rgba(124, 58, 237, 0.12)",
        },
        pink: {
          DEFAULT: "#DB2777",
          wash: "rgba(219, 39, 119, 0.12)",
        },
      },
      fontFamily: {
        sans: [
          "Switzer",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        display: [
          "Switzer",
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "20px",
        "4xl": "24px",
        "5xl": "32px",
      },
      boxShadow: {
        subtle: "0 1px 3px 0 rgba(17, 26, 46, 0.05)",
        card: "0 4px 24px -4px rgba(17, 26, 46, 0.08)",
        float: "0 12px 40px -8px rgba(17, 26, 46, 0.12)",
        glow: "0 0 50px -10px rgba(37, 99, 255, 0.35)",
        "glow-sm": "0 0 25px -6px rgba(37, 99, 255, 0.25)",
        dark: "0 4px 24px -4px rgba(0, 0, 0, 0.4)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "marquee-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in": "fade-in 0.5s ease forwards",
        float: "float 6s ease-in-out infinite",
        "marquee-left": "marquee-left 35s linear infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      maxWidth: {
        container: "1280px",
        "container-lg": "1520px",
      },
    },
  },
  plugins: [],
};

export default config;
