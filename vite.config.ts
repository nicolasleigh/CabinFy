import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 8081, // This is the port which we will use in docker
    // hmr: {
    //   clientPort: 443,
    // },
  },
  optimizeDeps: {
    exclude: ['js-big-decimal'],
  },
});
