/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purpleWhite: "#FAFAFF",
        lightWhite: "#FAFAFA",
        textGray: "#969696",
        textBlue : "#2C305E",
        lightGray : "#E5E5F0",
        borderGray : "#E9E9E9",
        grayishBlue : "#C1C2D8",
      }
    },
  },
  plugins: [],
}