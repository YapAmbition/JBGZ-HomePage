import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        nook: ["Nunito, 'Noto Sans SC', 'Zen Maru Gothic'", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        parchment: "hsl(var(--parchment))",
        brown: {
          warm: "hsl(var(--brown-warm))",
          body: "hsl(var(--brown-body))",
          light: "hsl(var(--brown-light))",
        },
        mint: {
          DEFAULT: "hsl(var(--mint))",
          light: "hsl(var(--mint-light))",
          dark: "hsl(var(--mint-dark))",
        },
        sunny: {
          DEFAULT: "hsl(var(--sunny))",
          light: "hsl(var(--sunny-light))",
        },
        nook: {
          cream: "hsl(var(--nook-cream))",
          shell: "hsl(var(--nook-shell))",
        },
      },
      borderRadius: {
        pill: "50px",
        organic: "40px 35px 45px 38px",
        soft: "24px",
        gentle: "16px",
      },
      boxShadow: {
        '3d': "0 5px 0 0 hsl(var(--brown-light))",
        '3d-pressed': "0 1px 0 0 hsl(var(--brown-light))",
        '3d-teal': "0 5px 0 0 hsl(var(--mint-dark))",
        '3d-sunny': "0 5px 0 0 hsl(var(--sunny) / 0.6)",
        'float': "0 8px 24px -8px hsl(var(--mint) / 0.2)",
        'card-hover': "0 12px 32px -8px hsl(var(--mint) / 0.3)",
        'warm': "0 4px 16px -4px hsl(var(--brown-warm) / 0.15)",
      },
      keyframes: {
        "float-up": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-3deg)" },
          "75%": { transform: "rotate(3deg)" },
        },
        "bounce-in": {
          "0%": { transform: "scale(0.8)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "fade-in-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "leaf-sway": {
          "0%, 100%": { transform: "rotate(-5deg)" },
          "50%": { transform: "rotate(5deg)" },
        },
      },
      animation: {
        "float-up": "float-up 3s ease-in-out infinite",
        "wiggle": "wiggle 2s ease-in-out infinite",
        "bounce-in": "bounce-in 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "leaf-sway": "leaf-sway 4s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config