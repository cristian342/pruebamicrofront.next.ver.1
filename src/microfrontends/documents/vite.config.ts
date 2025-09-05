import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federation.default({
      name: 'documents',
      filename: 'documentsEntry.js',
      exposes: {
        './DocumentsPage': './src/microfrontends/documents/infrastructure/ui/pages/DocumentsPage.tsx',
      },
      shared: ['react', 'react-dom', '@mui/material', '@emotion/react', '@emotion/styled'],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 5001, // Port for the documents microfrontend
  },
});
