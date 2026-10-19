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
        // Primary Accent — Vibrant Orange
        accent: {
          DEFAULT: "#ff6207",
          hover: "#f94500",
          dark: "#ce3000",
          light: "#ff852f",
          lighter: "#ffb16b",
          muted: "#ffd2a4",
          wash: "#ffead2",
          "wash-subtle": "rgba(226, 107, 8, 0.1)",
        },
        // Warm Cream Background
        cream: {
          DEFAULT: "#f8f6f1",
          light: "#faeacd",
          gold: "#faaf01",
        },
        // Neutrals — Rich near-black to pure white
        neutral: {
          950: "#0a0a0a",
          900: "#0d0d0d",
          850: "#0f0f0f",
          800: "#171717",
          750: "#1e1e1e",
          700: "#212121",
          650: "#262626",
          600: "#404040",
          500: "#525252",
          400: "#737373",
          300: "#a1a1a1",
          200: "#d4d4d4",
          150: "#e5e5e5",
          100: "#f5f5f5",
          50: "#fafafa",
        },
        // Semantic
        success: "#22c55e",
        "success-dark": "#16a34a",
        "success-wash": "rgba(34, 197, 94, 0.1)",
        error: "#ef4444",
        warning: "#ca8a04",
        "warning-wash": "rgba(234, 179, 8, 0.1)",
        purple: "#9333ea",
        "purple-wash": "rgba(168, 85, 247, 0.1)",
        pink: "#db2777",
        "pink-wash": "rgba(236, 72, 153, 0.1)",
        // Deep tones
        maroon: "#330014",
        "brown-deep": "#442512",
        "brown-warm": "#2e1f16",
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
        body: [
          "Inter",
          "Switzer",
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
        subtle: "0 1px 3px 0 rgba(0, 0, 0, 0.08)",
        card: "0 4px 24px -4px rgba(0, 0, 0, 0.12)",
        float: "0 12px 40px -8px rgba(0, 0, 0, 0.16)",
        glow: "0 0 60px -12px rgba(255, 98, 7, 0.3)",
        "glow-sm": "0 0 30px -8px rgba(255, 98, 7, 0.2)",
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
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(24px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "marquee-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(1.4)", opacity: "0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in": "fade-in 0.5s ease forwards",
        "slide-in-right": "slide-in-right 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "scale-in": "scale-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        float: "float 6s ease-in-out infinite",
        "marquee-left": "marquee-left 40s linear infinite",
        shimmer: "shimmer 2s linear infinite",
        "pulse-ring": "pulse-ring 1.5s ease-out infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-accent":
          "linear-gradient(135deg, #ff6207 0%, #f94500 50%, #ce3000 100%)",
        "gradient-dark":
          "linear-gradient(180deg, #0a0a0a 0%, #171717 100%)",
        "gradient-card":
          "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
        "gradient-glow":
          "radial-gradient(ellipse at center, rgba(255, 98, 7, 0.15) 0%, transparent 70%)",
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
