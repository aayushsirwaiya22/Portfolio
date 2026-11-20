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
        surfaceSunken: "var(--surface-sunken)",
        ink: "var(--text)",
        muted: "var(--text-muted)",
        accent: "var(--accent)",
        accentInk: "var(--accent-ink)",
        // Accent used as text, borders and hairlines — legible on light.
        accentText: "var(--accent-text)",
        accentWash: "var(--accent-wash)",
        edge: "var(--border)",
        edgeStrong: "var(--border-strong)",
        danger: "var(--error)",
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
