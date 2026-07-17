import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    build: {
      // Inline assets smaller than 4KB as base64 (default is 4096)
      assetsInlineLimit: 4096,
      // Ensure chunk size warnings are raised appropriately
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          // Ensure assets (images, fonts) are in the assets subfolder
          assetFileNames: 'assets/[name]-[hash][extname]',
          // Split vendor code for better caching
          manualChunks: {
            vendor: ['react', 'react-dom'],
            motion: ['motion/react'],
          },
        },
      },
    },
  };
});
