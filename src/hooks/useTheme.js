import { useEffect, useState } from "react";

// Reads any saved preference on first render, then keeps <html data-theme="...">
// and localStorage in sync whenever the person toggles it. The actual colors
// are defined once, as CSS variables, in src/index.css.
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }

  return { theme, toggleTheme };
}
