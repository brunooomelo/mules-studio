
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
   
    extend: {
       screens: {
        sm: '480px',
        md: '768px',
        lg: '976px',
        xl: '1440px',
      },
      colors: {
        'primary': '#0B1016',
        'secondary': '#14191F'
      },
    },
  },
  plugins: [],
}
