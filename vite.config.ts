import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";
import { markdownPlugin } from "./build/markdown";
import { adminDevPlugin } from "./build/admin-dev";
import { adminPreviewPlugin } from "./build/admin-preview";

export default defineConfig({
  plugins: [markdownPlugin(), adminDevPlugin(), adminPreviewPlugin(), react(), tailwindcss()],
  base: "/",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    target: "es2022",
    cssTarget: "chrome111",
    // 1.4 MB of maps that no error reporter consumes and no browser fetches.
    // The repository is public, so they add nothing a debugger could not get.
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react-router")) return "router";
            if (id.includes("react-dom") || id.includes("/react/")) return "react";
            if (id.includes("lucide-react")) return "icons";
          }
          return undefined;
        },
      },
    },
  },
});
