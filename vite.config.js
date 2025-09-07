import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  base: '/AI-Travel-Planner/',
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',  // Explicitly set the output directory
    emptyOutDir: true, // Ensures the 'dist' directory is emptied before a new build
  }
});
