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
        // Noto Sans Devanagari sits last in the stack: Inter and Space
        // Grotesk carry no Devanagari glyphs, so the browser falls through
        // to it for the Hindi greeting in the boot loader.
        sans: ["Inter", "Noto Sans Devanagari", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "Noto Sans Devanagari", "system-ui", "sans-serif"],
        // Caveat carries the greeting in the intro loader. Noto Sans
        // Devanagari sits behind it because Caveat has no Devanagari glyphs.
        script: ["Caveat", "Noto Sans Devanagari", "cursive"],
        mono: ["ui-monospace", "Menlo", "monospace"],
      },
    },
  },
  plugins: [],
};
