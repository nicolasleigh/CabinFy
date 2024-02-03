import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5000, // This is the port which we will use in docker
  },
  optimizeDeps: {
    exclude: ['js-big-decimal'],
  },
});
