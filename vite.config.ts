import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { copyFileSync } from "node:fs";
import { resolve } from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "github-pages-fallback",
      apply: "build",
      closeBundle() {
        // GitHub Pages serves this shell for direct visits to existing blog URLs.
        copyFileSync(resolve("dist/index.html"), resolve("dist/404.html"));
      },
    },
  ],
  base: "/portfolio/",
});
