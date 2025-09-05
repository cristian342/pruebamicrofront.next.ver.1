# Documents Micro-frontend

This document details the structure and responsibilities of the Documents micro-frontend.

## Responsibilities
- Display a list of documents.
- Provide functionality to create, edit, delete, and reactivate documents.
- Encapsulate all UI components, hooks, and logic related to document management.

## Exposed Components
- `DocumentsPage`: The main entry point and routing component for this micro-frontend.

## Consumed State/Services
- **Document Types**: Will need access to the list of available document types, likely provided by the shell or a shared context.
- **Notifications**: Will use a shared notification service to display success or error messages.

## File Structure
The micro-frontend will live in `src/microfrontends/documents` and will contain its own `application`, `domain`, and `infrastructure` directories, mirroring the project's DDD structure.
