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
        background: "#0A0E0A",
        surface: "#050A05",
        primary: "#00CC33",
        "primary-bright": "#00FF41",
        "border-base": "#0F2A0F",
        "blue-accent": "#4499FF",
        "purple-accent": "#8844FF",
        "amber-accent": "#FFAA00",
        foreground: "#C8E6C8",
        "text-muted": "#3A6A3A",
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
        display: ['var(--font-space)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'glass-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)',
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'neon': '0 0 10px rgba(0, 255, 65, 0.3), 0 0 20px rgba(0, 255, 65, 0.1)',
      },
      backdropBlur: {
        'glass': '12px',
      },
      keyframes: {
        scan: {
          '0%, 100%': { transform: 'translateY(-100%)' },
          '50%': { transform: 'translateY(100vh)' }
        }
      },
      animation: {
        scan: 'scan 2s linear infinite'
      }
    },
  },
  plugins: [],
};
export default config;
