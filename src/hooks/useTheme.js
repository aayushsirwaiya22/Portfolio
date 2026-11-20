import { useEffect, useRef, useState } from "react";

// Reads any saved preference on first render, then keeps <html data-theme="...">
// and localStorage in sync whenever the person toggles it. The actual colors
// are defined once, as CSS variables, in src/index.css.
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("theme") || "dark";
  });
  const swapTimer = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    localStorage.setItem("theme", theme);

    // Colour transitions are enabled only for the length of the swap, so
    // hover states elsewhere on the page don't inherit a slow transition.
    root.classList.add("theme-switching");
    clearTimeout(swapTimer.current);
    swapTimer.current = setTimeout(() => {
      root.classList.remove("theme-switching");
    }, 360);

    return () => clearTimeout(swapTimer.current);
  }, [theme]);

  function toggleTheme() {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  }

  return { theme, toggleTheme };
}
