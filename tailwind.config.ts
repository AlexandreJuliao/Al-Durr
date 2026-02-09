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
        aldurr: {
          canvas: "#031C16", // Deep Forest Green (Hero)
          void: "#080808", // Almost Black (Contrast)
          earth: "#3E2723", // Rich Espresso/Wood (Strong Brown Section)
          honey: "#C69C6D", // Honey/Gold (High Contrast)
          stone: "#1C1917", // Warm Grey (Engineering)
          surface: "#0A2922", // Lighter Green Surface
          accent: "#C69C6D", // Keeping for backward compatibility
          text: {
            heading: "#FFFFFF",
            body: "#D1D5DB",
            muted: "#9CA3AF",
            dark: "#0F172A", // For use on Honey background
          },
        },
      },
      backgroundImage: {
        'gradient-spotlight': 'radial-gradient(circle at center, rgba(198, 156, 109, 0.15) 0%, rgba(5, 5, 5, 0) 70%)',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
