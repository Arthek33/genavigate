/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
// const plugin = require("tailwindcss/plugin");
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // fontFamily: {
      //   sans: [
      //     "Inter",
      //     ...defaultTheme.fontFamily.sans,
      //     // {
      //     //   fontFeatureSettings: '"cv11", "ss01"',
      //     //   fontVariationSettings: '"opsz" 32',
      //     // },
      //   ],
      // },
      fontFamily: {
        sans: [
          "Inter var, sans-serif",
          {
            // fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
            fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
            fontVariationSettings: "normal",
            // fontFeatureSettings: '"cv11", "ss01"',
            // fontVariationSettings: '"opsz" 32',
          },
          // ...defaultTheme.fontFamily.sans,
        ],
      },
      height: {
        128: "32rem",
        136: "36rem",
        150: "40rem",
      },
      // animationDelay: {
      //   "100ms": "100ms",
      //   "200ms": "200ms",
      //   "300ms": "300ms",
      //   "400ms": "400ms",
      //   "500ms": "500ms",
      //   "600ms": "600ms",
      //   "700ms": "700ms",
      //   "800ms": "800ms",
      //   "900ms": "900ms",
      //   "1000ms": "1000ms",
      //   "1100ms": "1100ms",
      // Add more as needed
      // },
      keyframes: {
        fadeinupa: {
          "0%": {
            opacity: "0",
            transform: "translateY(30%)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeindowna: {
          "0%": {
            opacity: "0",
            transform: "translate(-50%,-30%)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(-50%,0)",
          },
        },
      },
      animation: {
        "fade-in-up": "fadeinupa .6s ease-out",
        "fade-in-down": "fadeindowna .6s ease-out",
      },
    },
  },
  plugins: [
    // plugin(function ({ matchUtilities, theme }) {
    //   matchUtilities({
    //     "animation-delay": (value) => {
    //       return {
    //         "animation-delay": value,
    //       };
    //     },
    //   });
    // }),
    // plugin(({ addUtilities, theme }) => {
    //   const animationDelays = theme("animationDelay");
    //   const newUtilities = {};
    //   Object.keys(animationDelays).forEach((key) => {
    //     const value = animationDelays[key];
    //     newUtilities[`.animation-delay-${key}`] = { "animation-delay": value };
    //   });
    //   addUtilities(newUtilities);
    // }),
  ],
};
