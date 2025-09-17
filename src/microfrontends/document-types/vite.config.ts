import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';


export default defineConfig({
  base: '/document-types/', // Explicitly set base to root
  plugins: [
    react(),
    (() => {
      const federationPlugin = federation as any;
      return federationPlugin({
        name: 'document-types',
        filename: 'remoteEntry.js',
        exposes: {
          './DocumentTypeManagementPage': './src/infrastructure/ui/pages/DocumentTypeManagementPage.tsx',
          './context/DocumentTypeContext': './src/microfrontends/document-types/infrastructure/ui/context/DocumentTypeContext.tsx',
        },
        shared: ['react', 'react-dom', 'react-router-dom'],
      });
    })(),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    port: 3005, // Document-types microfrontend is now running on 3005
  },
});
