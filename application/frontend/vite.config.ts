import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    host: true, // Listen on all interfaces (0.0.0.0)
    port: 5173,
    allowedHosts: ['crisisrelief.duckdns.org'], 

    cors: true,
  },
});