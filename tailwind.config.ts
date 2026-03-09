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
          canvas: "#031C16", // Deep Forest Green (Hero, Identity)
          void: "#080808", // Almost Black (Footer)
          earth: "#3E2723", // Rich Espresso (Warm Brown)
          "earth-light": "#5D4037", // Warm Chestnut (Softer Brown)
          bark: "#2C1E17", // Dark Bark (Deep Brown, Sóbrio)
          honey: "#C69C6D", // Honey/Gold (High Contrast Accent)
          "honey-light": "#D8B289", // Brighter Gold/Honey for hovers
          cream: "#F5E6D0", // Warm Cream (Light text on brown)
          stone: "#1C1917", // Charcoal (Neutral Anchor)
          cladding: "#1A1C1B", // Dark Metal Cladding (From user image)
          "cladding-line": "rgba(255, 255, 255, 0.04)", // Subtle vertical line highlight
          surface: "#0A2922", // Lighter Green Surface
          accent: "#C69C6D", // Keeping for backward compatibility
          text: {
            heading: "#FFFFFF",
            body: "#E5E7EB", // Increased contrast (was #D1D5DB)
            muted: "#9CA3AF",
            dark: "#0F172A", // For use on Honey background
          },
        },
      },
      backgroundImage: {
        'gradient-spotlight': 'radial-gradient(circle at center, rgba(198, 156, 109, 0.15) 0%, rgba(5, 5, 5, 0) 70%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0) 100%)',
        'gold-metallic': 'linear-gradient(135deg, #C69C6D 0%, #D8B289 50%, #C69C6D 100%)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        heading: ['var(--font-poppins)', 'var(--font-geist-sans)', 'sans-serif'],
        outfit: ['var(--font-outfit)', 'sans-serif'],
        display: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
