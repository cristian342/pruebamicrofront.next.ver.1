# Refactoring Plan: Migrate from Rspack to Vite

This plan outlines the steps to migrate the project's build system from Rspack to Vite, including updating dependencies, configuration files, and project scripts.

## Pending Tasks:

- [x] 1. **Document the migration plan**: Create or update relevant documentation in `functionalities/` to reflect the change from Rspack to Vite for module federation.
- [x] 2. **Remove Rspack dependencies**: Uninstall Rspack-related packages from `package.json`.
- [x] 3. **Install Vite dependencies**: Ensure necessary Vite and module federation plugins are installed.
- [x] 4. **Migrate shell configuration**: Convert `rspack.config.cjs` to `vite.config.ts` for the main shell application.
- [x] 5. **Migrate documents microfrontend configuration**: Convert `src/microfrontends/documents/rspack.config.cjs` to `src/microfrontends/documents/vite.config.ts`.
- [x] 6. **Migrate document-types microfrontend configuration**: Convert `src/microfrontends/document-types/rspack.config.cjs` to `src/microfrontends/document-types/vite.config.ts`.
- [x] 7. **Update `package.json` scripts**: Modify `start`, `build`, and `lint` scripts to use Vite commands.
- [x] 8. **Clean up Rspack configuration files**: Delete all `rspack.config.cjs` files.
- [ ] 9. **Verify application functionality**: Start the application and ensure all microfrontends load and function correctly.
