export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#3F4B3B',    // Feldgrau
          forest: '#44633F',  // Hunter Green
          sea: '#5A9367',     // Sea Green
          medium: '#5CAB7D',  // Mint
          light: '#4ADBC8',   // Turquoise
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      }
    },
  },
}
