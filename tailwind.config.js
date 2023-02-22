module.exports = {
  theme: {
    extend: {
      colors: {
        "bv-dark-gray": "#1e1e1e",
        "dark-gray-plus1": "#282828",
        "dark-gray-plus2": "#323232",
        "dark-gray-plus3": "#3c3c3c",
        "dark-gray-plus4": "#4b4b4b",
        "bv-text-color": "#eeeeee",
        "bv-green": "#79fe9d",
        "bv-green-hover-bg": "#313833",
        "bv-blue": "#1d43c6",
        "bv-hover-blue": "#3b61e2",
        "bv-orange": "#f9a86f",
        "bv-dark-orange": "#e09763",
        "bv-citrine-white": "#f9ead4",
        "bv-text-color-dark": "#11133c",
        "bv-light-bg": "#fcf8f3",
      },
      fontFamily: {
        JetBrainsMono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
