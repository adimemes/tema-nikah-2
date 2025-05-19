/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["index.html", "node_modules/preline/dist/*.js"],
  theme: {
    backgroundSize: {
      auto: "auto",
      cover: "cover",
      contain: "contain",
      "50%": "50%",
      16: "4rem",
    },
    extend: {
      colors: {
        emas: "#ECC17B",
      },
      fontFamily: {
        "great-vibes": ["'Great Vibes'", "cursive"],
        kalnia: ["'Kalnia'", "sans-serif"],
        bonheur: ["'Bonheur Royale'", "cursive"],
        kablammo: ["'Kablammo'", "cursive"],
        montserrat: ["'Montserrat'", "sans-serif"],
        nerko: ["'Nerko One'", "cursive"],
        quicksand: ["'Quicksand'", "sans-serif"],
        ubuntu: ["'Ubuntu'", "sans-serif"],
        yeseva: ["'Yeseva One'", "cursive"],
      },
    },
  },
};
