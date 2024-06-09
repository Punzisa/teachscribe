/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // blue primary
        primary: {
          100: '#E3F2FD',
          200: '#BBDEFB',
          300: '#90CAF9',
          400: '#64B5F6',
          500: '#42A5F5',
          600: '#2196F3',
          700: '#1E88E5',
          800: '#1976D2',
          900: '#1565C0',
        },
      },
      fontFamily: {
        poppinsThin: ['Poppins-Thin', 'sans-serif'],
        poppinsExtraLight: ['Poppins-ExtraLight', 'sans-serif'],
        poppinsLight: ['Poppins-Light', 'sans-serif'],
        poppinsRegular: ['Poppins-Regular', 'sans-serif'],
        poppinsMedium: ['Poppins-Medium', 'sans-serif'],
        poppinsSemiBold: ['Poppins-SemiBold', 'sans-serif'],
        poppinsBold: ['Poppins-Bold', 'sans-serif'],
        poppinsExtraBold: ['Poppins-ExtraBold', 'sans-serif'],
        poppinsBlack: ['Poppins-Black', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
