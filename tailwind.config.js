/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        flash: {
          'from, 50%, to': { opacity: 1 },
          '25%, 75%': { opacity: 0 },
        },
        shakeY: {
          'from, to': { transform: 'translate3d(0, 0, 0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translate3d(0, -10px, 0)' },
          '20%, 40%, 60%, 80%': { transform: 'translate3d(0, 10px, 0)' },
        },
        swing: {
          '20%': {
            transform: 'rotate3d(0, 0, 1, 15deg)',
          },
          '40%': {
            transform: 'rotate3d(0, 0, 1, -10deg)',
          },
          '60%': {
            transform: 'rotate3d(0, 0, 1, 5deg)',
          },
          '80%': {
            transform: 'rotate3d(0, 0, 1, -5deg)',
          },
          'to': {
            transform: 'rotate3d(0, 0, 1, 0deg)',
          },
        },
      },
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/line-clamp')],
};
