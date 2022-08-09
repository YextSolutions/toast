const { ComponentsContentPath } = require("@yext/search-ui-react");

module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./lib/**/*.{js,jsx}", ComponentsContentPath],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Sora"],
      },
      fontSize: {
        xxs: "0.625rem",
      },
      colors: {
        primary: "var(--primary-color, #2563eb)",
        "primary-light": "var(--primary-color-light, #dbeafe)",
        "primary-dark": "var(--primary-color-dark, #1e40af)",
        neutral: "var(--neutral-color, #4b5563)",
        "neutral-light": "var(--neutral-color-light, #9ca3af)",
        "neutral-dark": "var(--neutral-color-dark, #1f2937)",
        "toast-light-orange": "#FFEEDB",
        "toast-orange": "#FFB563",
        "toast-dark-orange": "#F85E00",
        "toast-red": "#A41632",
        "toast-blue": "#17AABE",
        "toast-gray": "#c4c4c442",
      },
      borderRadius: {
        cta: "var(--cta-border-radius, 1rem)",
      },
      transitionProperty: {
        "max-h": "max-height",
      },
      animation: {
        shaker: "shaker 0.4s infinite",
      },
      keyframes: {
        shaker: {
          "50%": {
            transform: "rotate(20deg)",
          },
          "100%": {
            transform: "rotate(-20deg)",
          },
        },
        rotate: {
          "100%": { transform: "rotate(360deg)" },
        },
        dash: {
          "0%": { transform: "rotate(0deg)", "stroke-dashoffset": 204 },
          "50%": { transform: "rotate(45deg)", "stroke-dashoffset": 52 },
          "100%": { transform: "rotate(360deg)", "stroke-dashoffset": 204 },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    require("@tailwindcss/line-clamp"),
  ],
};
