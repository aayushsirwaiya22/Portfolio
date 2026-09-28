import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Standard Vite + React setup. Nothing project-specific lives here yet.
export default defineConfig({
  plugins: [react()],
});
