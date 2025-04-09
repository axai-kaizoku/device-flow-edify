import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        "inner-click": "3px 2px 22px 1px rgba(0, 0, 0, 0.24)",
      },
      scale: {
        "98": "0.98", // Slightly scale down on click
      },
      fontFamily: {
        gilroyRegular: ["var(--font-gilroy-regular)", "sans-serif"],
        gilroyMedium: ["var(--font-gilroy-medium)", "sans-serif"],
        gilroySemiBold: ["var(--font-gilroy-semibold)", "sans-serif"],
        gilroyBold: ["var(--font-gilroy-bold)", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        "caret-blink": {
          "0%,70%,100%": {
            opacity: "1",
          },
          "20%,50%": {
            opacity: "0",
          },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "tick-fall": {
          "0%": { transform: "translate(-50%, -50%) scale(0.5)" },
          "100%": { transform: "translate(0, 0) scale(1)" },
        },
        "pop-center": {
          "0%": { transform: "scale(0)", opacity: "0" },
          "25%": { transform: "scale(0.25)", opacity: "0.25" },
          "50%": { transform: "scale(0.5)", opacity: "0.5" },
          "75%": { transform: "scale(0.75)", opacity: "0.75" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "scale-up-center": {
          "0%": { transform: "scale(0)", opacity: "0" },
          "100%": { transform: "scale(2)", opacity: "1" },
        },
        "fall-fade-out": {
          "0%": { transform: "scale(2) translateY(0)", opacity: "1" },
          "100%": { transform: "scale(2) translateY(200px)", opacity: "0" },
        },
      },
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        "fade-in": "fade-in 1s ease-in-out",
        "tick-fall": "tick-fall 0.1s ease-out",
        "pop-center": "pop-center 1s ease-in",
        "scale-up-center": "scale-up-center 2s ease-in-out",
        "fall-fade-out": "fall-fade-out 2s ease-in-out forwards",
        marquee: "marquee 25s linear infinite",
        marquee2: "marquee2 25s linear infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        alert: {
          DEFAULT: "#F89500",
          foreground: "#FFE8D6",
        },
        info: {
          DEFAULT: "#6941C6",
          foreground: "#F4E7FF",
        },
        success: {
          DEFAULT: "#01D019",
          second: "#027A48",
          foreground: "#ECFDF3",
        },
        failure: {
          DEFAULT: "#FF0000",
          foreground: "#FED9D9",
        },
        outline: {
          button: "#6C6C6C",
          card: "#ECECEC",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "#000000",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#7F7F7F",
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
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
