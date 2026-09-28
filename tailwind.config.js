/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // These map straight to CSS variables in index.css so a future
        // light/dark theme toggle only has to flip the variables, not
        // every className in the app.
        bg: "var(--bg)",
        surface: "var(--surface)",
        surfaceLight: "var(--surface-light)",
        ink: "var(--text)",
        muted: "var(--text-muted)",
        accent: "var(--accent)",
        accentInk: "var(--accent-ink)",
        edge: "var(--border)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
