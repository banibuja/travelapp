/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
      extend: {
        aspectRatio: {
          '7/4': '7 / 4',
        },},
  },
  plugins: [],
};
