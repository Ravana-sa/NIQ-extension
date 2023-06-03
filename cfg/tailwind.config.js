/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,html}"],
  darkMode: "media",
  theme: {
    extend: {
      transitionDuration: {
        2000: "2000ms"
      },
      scale: {
        "-100": "-1"
      }
    }
  }
}
