/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: {
          brown: '#3E2723',       // Marrón oscuro (Texto principal, botones primarios)
          light: '#6D4C41',       // Marrón medio (Hover, bordes)
          orange: '#E67E22',      // Naranja/Caramelo (Acentos, alertas, iconos)
          beige: '#EFEBE9',       // Beige (Fondos secundarios, tarjetas)
          cream: '#FDFBF7',       // Blanco crema (Fondo principal)
          white: '#FFFFFF',       // Blanco puro
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}