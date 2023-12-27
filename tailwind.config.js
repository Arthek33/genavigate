/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
// const plugin = require("tailwindcss/plugin");
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern-hexagon": "url('./hexagon.svg')",
      },
      fontFamily: {
        sans: [
          "Inter var, sans-serif",
          {
            fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"',
            fontVariationSettings: "normal",
          },
        ],
      },
      height: {
        128: "32rem",
        136: "36rem",
        150: "40rem",
      },
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
      // backgroundImage: {
      //   genavigate-header: 'Overview'
      // }
    },
    patterns: {
      opacities: {
        100: "1",
        80: ".80",
        60: ".60",
        40: ".40",
        20: ".20",
        10: ".10",
        5: ".05",
      },
      sizes: {
        1: "0.25rem",
        2: "0.5rem",
        4: "1rem",
        6: "1.5rem",
        8: "2rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        32: "8rem",
      },
    },
  },
  plugins: [
    // require("tailwindcss-bg-patterns"),
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
