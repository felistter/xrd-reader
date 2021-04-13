module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        192: "48rem",
        144: "36rem",
      },
    },

    container: {
      center: true,
    },
  },
  variants: {
    extend: {},
    caretColor: ["dark", "active"],
  },
  plugins: [require("@graxmonzo/tailwind-caret-color")],
};
