/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
        orbitron: ["Orbitron", "sans-serif"],
		mono: ['Ubuntu Mono', 'monospace'],
		dangrek: ['Dangrek', 'sans-serif'],
		josefin: ['Josefin Sans', 'sans-serif'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
