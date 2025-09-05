# Document Types Micro-frontend

This document details the structure and responsibilities of the Document Types micro-frontend.

## Responsibilities
- Display a list of document types.
- Provide functionality to create, edit, and manage document types.
- Encapsulate all UI components, hooks, and logic related to document type management.

## Exposed Components
- `DocumentTypeManagementPage`: The main entry point and routing component for this micro-frontend.

## Consumed State/Services
- **Notifications**: Will use a shared notification service to display success or error messages.

## File Structure
The micro-frontend will live in `src/microfrontends/document-types` and will contain its own `application`, `domain`, and `infrastructure` directories, mirroring the project's DDD structure.
