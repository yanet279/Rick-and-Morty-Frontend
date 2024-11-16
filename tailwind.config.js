/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js}",'./src/**/*.{js,ts,jsx,tsx}',],
  theme: {
    extend: {
      screens: {
        'lx': '1090px',
      },
      colors: {
        colorBorderForm: "#adff2f",
        colorButtonLogin: "#ffa500",
        colorButtonCancel: "#d2691e",
        colorButtonFavorite: "#0fbf0f",
        colorButtonTitle: "#9acd32",
        colorWhite: "#fff",
        colorBlack: "#000",
        customDarkBlue: "rgb(25, 38, 63)",
      },
    },
  },
  plugins: [
    require("tailwindcss-textshadow"),
  ],
}

