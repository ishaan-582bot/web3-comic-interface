/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Comic Book Color Palette
        'bitcoin-orange': '#F7931A',
        'cyber-cyan': '#00F0FF',
        'neon-purple': '#B829DD',
        'neon-green': '#00FF88',
        'neon-pink': '#FF00AA',
        'parchment': '#F4E4C1',
        'dark-bg': '#0A0A0F',
        'dark-card': '#1A1A2E',
        'dark-border': '#2A2A3E',
      },
      fontFamily: {
        'comic': ['Bangers', 'cursive'],
        'mono': ['Space Mono', 'monospace'],
        'body': ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 8s linear infinite',
        'page-curl': 'pageCurl 0.6s ease-in-out',
        'shake': 'shake 0.5s ease-in-out',
        'glitch': 'glitch 1s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #00F0FF, 0 0 10px #00F0FF' },
          '100%': { boxShadow: '0 0 20px #00F0FF, 0 0 30px #00F0FF' },
        },
        pageCurl: {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(-15deg)' },
          '100%': { transform: 'rotateY(0deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '75%': { transform: 'translateX(5px)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
        },
      },
      backgroundImage: {
        'halftone': 'radial-gradient(circle, #000 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backgroundSize: {
        'halftone': '4px 4px',
      },
    },
  },
  plugins: [],
}
