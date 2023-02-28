import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mdx({
    providerImportSource: "@mdx-js/react"
  })],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@global", replacement: "/src/global" },
      { find: "@languages", replacement: "/src/languages" },
      { find: "@components", replacement: "/src/components" },
      { find: "@data", replacement: "/src/data" },
      { find: "@lib", replacement: "/src/lib" },
    ]
  }
});
