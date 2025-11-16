/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'orbitron': ['Orbitron', 'sans-serif'],
        'space-mono': ['Space Mono', 'monospace'],
        'jetbrains': ['JetBrains Mono', 'monospace'],
      },
      colors: {
        'cyber-dark': '#0a0e27',
        'cyber-darker': '#050714',
        'neon-cyan': '#00fff5',
        'neon-purple': '#b026ff',
        'neon-pink': '#ff2e97',
      },
    },
  },
  plugins: [],
}
