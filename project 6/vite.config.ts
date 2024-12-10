import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['@libsql/client'],
  },
  server: {
    fs: {
      strict: false
    }
  }
});