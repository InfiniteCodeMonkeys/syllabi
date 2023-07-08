/** @type {import("tailwindcss").Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  presets: [require("@acme/tailwind-config")],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Satoshi", ...defaultTheme.fontFamily.sans],
      },
      animation: {
        loader: "loader 0.6s infinite alternate",
      },
      keyframes: {
        loader: {
          to: {
            opacity: 0.1,
            transform: "translate3d(0, -1rem, 0)",
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/typography"),
  ],
};
