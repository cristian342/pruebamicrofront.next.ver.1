# Micro-frontend Architecture with Vite and Module Federation

This document details the implementation of the micro-frontend architecture using Vite as the build tool and Module Federation for runtime module sharing.

## 1. Core Concepts

- **Shell (Host) Application**: The main container application that provides the core layout, navigation, and orchestrates the loading of micro-frontends.
- **Micro-frontends (Remotes)**: Independent applications that expose specific functionalities or components.
- **Module Federation**: A feature that allows a JavaScript application to dynamically load code from another application at runtime, facilitated by `@originjs/vite-plugin-federation`.

## 2. Styling Strategy

- **Engine**: TailwindCSS will be used across all micro-frontends and the shell application to ensure a consistent UI and developer experience.
- **Configuration**: Each application (shell and remotes) will have its own `tailwind.config.js` and a root `postcss.config.js` to process the CSS.

## 3. Vite Configuration

Each application will have its own `vite.config.ts` file with specific configurations for Module Federation:

### a. Shell (Host) Configuration

- **`name`**: `shell`
- **`ModuleFederation` plugin**:
  - **`remotes`**: An object listing the available micro-frontends and their entry points (e.g., `documents: 'documents@http://localhost:3001/remoteEntry.js'`).
  - **`shared`**: Defines shared dependencies (e.g., `react`, `react-dom`) to avoid duplication in the browser.

### b. Micro-frontend (Remote) Configuration

- **`name`**: The name of the micro-frontend (e.g., `documents`).
- **`ModuleFederation` plugin**:
  - **`exposes`**: An object mapping the components or modules that this micro-frontend will share (e.g., `'./DocumentsPage': './src/infrastructure/ui/pages/DocumentsPage.tsx'`).
  - **`filename`**: The name of the remote entry file (e.g., `remoteEntry.js`).
  - **`shared`**: Defines shared dependencies, which must be compatible with the shell.

## 4. Integration and Communication Flow

1.  The user navigates to the shell application's URL.
2.  The shell application loads its initial code and the `remoteEntry.js` files from the configured remotes.
3.  When a route corresponding to a micro-frontend is activated, the shell dynamically imports the exposed component from the remote.
4.  React's lazy loading and Suspense are used to handle the asynchronous loading of remote components, providing a smooth user experience.

## 5. Proof of Concept Plan

- **Exposing Micro-frontend**: The `documents` micro-frontend will expose its main `DocumentsPage` component.
- **Consuming Micro-frontend**: The `document-types` micro-frontend will expose its `DocumentTypeManagementPage`.
- **Shell Integration**: The shell application will be configured to consume both `DocumentsPage` and `DocumentTypeManagementPage` and render them based on the current route.
