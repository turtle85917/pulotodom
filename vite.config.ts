import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src" },
      { find: "@pages", replacement: "/src/pages" },
      { find: "@styles", replacement: "/src/styles" },
      { find: "@components", replacement: "/src/components" },
      { find: "@Layout", replacement: "/src/components/Layout" },
    ]
  }
});
