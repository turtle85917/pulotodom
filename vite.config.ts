import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@global", replacement: "/src/global" },
      { find: "@languages", replacement: "/src/languages" },
      { find: "@components", replacement: "/src/components" },
    ]
  }
});
