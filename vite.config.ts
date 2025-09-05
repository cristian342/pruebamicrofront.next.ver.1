import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'host-app',
      remotes: {
        documents: 'http://localhost:5001/assets/documentsEntry.js', // Assuming documents microfrontend runs on port 5001
        documentTypes: 'http://localhost:5002/assets/documentTypesEntry.js', // Assuming documentTypes microfrontend runs on port 5002
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
  preview: {
    port: 3000, // Default preview port
  },
});
