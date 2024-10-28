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
        background: "var(--background)",
        foreground: "var(--foreground)",
        main: {
          primary: "#2c3e50",
          secondary: '#E67E22',
          "bright-blue":"#0096FF",
          accent: '#BDC3C7',
          highlight: '#27AE60',
          text: '#34495E',
          warningError: '#C0392B',
          "orange-50": '#fff2ed',
          "orange-100": '#ffe1d4',
          "orange-200": '#ffbfa8',
          "orange-300": '#ff9371',
          "orange-400": '#ff5733',
          "orange-500": '#fe3111',
          "orange-600": '#ef1707',
          "orange-700": '#c60b08',
          "orange-800": '#9d0f12',
          "orange-900": '#7e1012',
          "orange-950": '#44060a',
          "blue-50": "#edfcff",
          "blue-100": "#d6f6ff",
          "blue-200": "#b5f2ff",
          "blue-300": "#83ecff",
          "blue-400": "#48dfff",
          "blue-500": "#1ec4ff",
          "blue-600": "#06a9ff",
          "blue-700": "#0096ff",
          "blue-800": "#0872c5",
          "blue-900": "#0d609b",
          "blue-950": "#0e3a5d",
          "gray-50": "#f6f7f8",
          "gray-100": "#ebecee",
          "gray-200": "#dcdfe1",
          "gray-300": "#bdc3c7",
          "gray-400": "#a6aeb4",
          "gray-500": "#9199a0",
          "gray-600": "#808790",
          "gray-700": "#737982",
          "gray-800": "#60656d",
          "gray-900": "#4f5359",
          "gray-950": "#333538",
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        fadeOut: 'fadeOut 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
