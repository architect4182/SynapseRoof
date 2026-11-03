/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0b1426",
        foreground: "#f3f5f9",
        synapse: {
          dark: "#0b1426",
          navy: "#14202f",
          card: "rgba(20, 32, 47, 0.7)",
          border: "rgba(255, 255, 255, 0.08)",
          lime: "#d8ee8e",
          olive: "#6d8f2a",
          amber: "#e68a35",
        },
      },
      fontFamily: {
        sans: ['"Instrument Sans"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
