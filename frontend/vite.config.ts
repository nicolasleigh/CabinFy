import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import { compression } from "vite-plugin-compression2";

export default defineConfig({
  plugins: [react(), compression()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true,
    port: 5173, // This is the port which we will use in docker
    hmr: {
      overlay: false, // This is to disable the overlay error message
    },
    allowedHosts: ["cabin.linze.pro"],
  },
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
});
