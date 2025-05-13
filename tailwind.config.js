/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/environments/**/*.{js,jsx}",
  ],
  safelist: [
    "bg-primary",
    "hover:bg-primary",
    "bg-secondary",
    "hover:bg-secondary",
    "bg-cancel",
    "hover:bg-cancel",
    "bg-want",
    "hover:bg-want",
    "text-primary",
    "text-secondary",
    "text-cancel",
    "text-want",
    "border-primary",
    "border-secondary",
    "border-cancel",
    "border-want",
    "hidden",
    "block",
    "md:inline",
    "text-orange-700",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      primary: "#009ddb",
      // "primary-hover": "03729e",
      secondary: "#d0637c",
      danger: "#d9512f",
      bgg: "#ff5100",
      bggback: "#59518b", //"#3f3a60",
      want: "#00b86b",
      success: "#06d6a0",
      warning: "#ffd166",
      stroke: "#bbc6ce",
      logo: "#28a1bc",
      cancel: "#999",
      colorMain: "#ebebeb",
      item: {
        50: "#faf7f2",
        100: "#f2eee2",
        200: "#e3d9c0",
        300: "#d3c29e",
        400: "#c1a576",
        500: "#b48f5b",
        600: "#a77d4f",
        700: "#8b6543",
        800: "#71533b",
        900: "#5c4532",
        950: "#312219",
      },
      //
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      red: colors.red,
      orange: colors.orange,
      lime: colors.lime,
      rose: colors.rose,
      //emerald: colors.emerald,
      purple: colors.purple,
      indigo: colors.indigo,
      sky: colors.sky,
      yellow: colors.yellow,
      teal: colors.teal,
    },

    extend: {
      borderRadius: {
        main: "16px",
      },
      spacing: {
        main: "24px",
      },
      boxShadow: {
        main: "0 2px 16px rgba(0, 0, 0, 0.15)",
      },
      keyframes: {
        fadein: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        fadedown: {
          "0%": { opacity: 0, transform: "translateY(-12px)" },
          "100%": { opacity: 1, transform: "translateY(0px)" },
        },
        fadeup: {
          "0%": { opacity: 0, transform: "translateY(8px)" },
          "100%": { opacity: 1, transform: "translateY(0px)" },
        },
        faderight: {
          "0%": { opacity: 0, transform: "translateX(20px)" },
          "100%": { opacity: 1, transform: "translateX(0px)" },
        },
        fadeleft: {
          "0%": { opacity: 0, transform: "translateX(-20px)" },
          "100%": { opacity: 1, transform: "translateX(0px)" },
        },
        "dialog-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "dialog-in-article": {
          "0%": { opacity: 0, transform: "translateY(30px)" },
          "100%": { opacity: 1, transform: "translateY(0px)" },
        },
        "item-grid-collapse": {
          "0%": { height: "0%" },
          "100%": { height: "100%" },
        },
      },
      animation: {
        fadein: "fadein 0.5s",
        fadedown: "fadedown 0.2s",
        fadeup: "fadeup 0.2s",
        faderight: "faderight 0.2s",
        fadeleft: "fadeleft 0.2s",
        "dialog-in": "dialog-in 0.2s",
        "dialog-in-article": "dialog-in-article 0.3s 0.1s ease-out backwards",
        "item-grid-collapse": "item-grid-collapse 0.25s linear forwards",
      },
    },
  },
  plugins: [],
};
