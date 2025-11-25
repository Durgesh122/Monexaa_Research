module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        'accent-start': '#198c7f',
        'accent-end': '#177b70',
      },
      fontFamily: {
        marcellus: ["Marcellus", 'serif'],
      },
      keyframes: {
        'fade-in-down': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        }
      },
      animation: {
        'fade-in-down': 'fade-in-down 0.2s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
      }
    },
  },
  plugins: [],
}
