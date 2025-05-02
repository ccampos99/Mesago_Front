/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2962FF",
        secondary: "#FFD580",
        success: "#4CAF50",
        warning: "#FF9800",
        danger: "#FF3D00",
      },
    },
  },
  plugins: [],
}
