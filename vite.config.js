import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/tech-in-my-style-lms/", // <-- ADD THIS (must match your repo name)
});
