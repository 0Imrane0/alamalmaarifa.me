import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [react(), cloudflare()],
  publicDir: "assets",
  server: { port: 5174 },
  build: {
    outDir: "dist",
    assetsInlineLimit: 4096,
  },
});