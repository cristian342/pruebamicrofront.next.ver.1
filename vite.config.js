import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';
import path from 'path';

export default defineConfig({
  base: '/', // Explicitly set base to root
  plugins: [
    react(),
    federation({
      name: 'shell',
      remotes: {
      documents: 'http://localhost:3006/documents/remoteEntry.js',
      'document-types': 'http://localhost:3005/document-types/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom'],
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 3002, // Shell is now running on 3002
  },
});
