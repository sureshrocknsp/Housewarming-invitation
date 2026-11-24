import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 650,
    rollupOptions: {
      maxParallelFileOps: 2,
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          'pdf-engine': ['jspdf', 'html-to-image'],
          icons: ['lucide-react']
        }
      }
    }
  },
  esbuild: {
    legalComments: 'none',
  },
  server: {
    port: 3000,
    open: false,
  }
});
