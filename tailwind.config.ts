import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Exact warm ivory/cream background from reference screenshots
        canvas: {
          DEFAULT: "#FAF8F5",
          cream: "#FAF8F5",
          subtle: "#F4F1EA",
          border: "#E7E5DF",
          divider: "#ECE8E1",
          dark: "#070A11",
          "dark-surface": "#0B0F19",
          "dark-card": "#111625",
          "dark-border": "#1E293B",
        },
        // TO DIRECT Electric Blue & Slate Signature
        brand: {
          blue: "#2563FF",
          "blue-deep": "#1748D8",
          "blue-soft": "#EAF0FF",
          "blue-pale": "#F4F7FF",
          cyan: "#0284C7",
          cream: "#FAF8F5",
          pure: "#FFFFFF",
          navy: "#0A1629",
          slate: "#475569",
          muted: "#64748B",
          border: "#E2E8F0",
        },
        slate: {
          950: "#070D1E",
          900: "#0A1629", // Exact dark midnight headline color
          850: "#141E33",
          800: "#1E293B",
          700: "#334155",
          600: "#475569", // Exact subtitle and body color
          500: "#64748B", // Muted metadata
          400: "#94A3B8",
          300: "#CBD5E1",
          200: "#E2E8F0",
          100: "#F1F5F9",
          50: "#F8FAFC",
        },
        accent: {
          purple: "#8B5CF6",
          amber: "#F59E0B",
          emerald: "#10B981",
          sky: "#38BDF8",
          rose: "#F43F5E",
        },
      },
      backgroundImage: {
        "mesh-sky": "linear-gradient(135deg, #74B9FF 0%, #A0C4FF 50%, #CADEFC 100%)",
        "mesh-aurora": "linear-gradient(135deg, #70C5E8 0%, #7ED8B6 60%, #E9E493 100%)",
        "mesh-lavender": "linear-gradient(135deg, #E0C3FC 0%, #8EC5FC 100%)",
        "mesh-twilight": "linear-gradient(135deg, #1E3A8A 0%, #3B82F6 50%, #818CF8 100%)",
        "mesh-ocean": "linear-gradient(135deg, #0284C7 0%, #38BDF8 60%, #BAE6FD 100%)",
      },
      fontFamily: {
        sans: [
          "Geist",
          "Plus Jakarta Sans",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        display: [
          "Geist",
          "Plus Jakarta Sans",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      boxShadow: {
        float: "0 18px 48px -12px rgba(11, 19, 43, 0.08)",
        card: "0 4px 20px -2px rgba(11, 19, 43, 0.05)",
        pill: "0 2px 8px -1px rgba(11, 19, 43, 0.08)",
      },
      borderRadius: {
        "3xl": "24px",
        "4xl": "32px",
        "5xl": "40px",
      },
    },
  },
  plugins: [],
};

export default config;
