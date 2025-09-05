import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federationModule from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    react(),
    federationModule.default({
      name: 'documentTypes',
      filename: 'documentTypesEntry.js',
      exposes: {
        './DocumentTypeManagementPage': './src/microfrontends/document-types/infrastructure/ui/pages/DocumentTypeManagementPage.tsx',
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
    port: 5002, // Port for the document-types microfrontend
  },
});
