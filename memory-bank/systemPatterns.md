# System Patterns

This document describes the recurring design patterns and architectural styles used in the project to ensure consistency and maintainability.

## Domain-Driven Design (DDD)
The existing structure follows DDD principles, which we will maintain:
- **Domain**: Contains the core business logic and models (`Document`, `DocumentType`).
- **Application**: Orchestrates the domain logic through use cases.
- **Infrastructure**: Handles external concerns like data persistence (LocalStorage) and UI rendering.

## Micro-frontend Structure
Each micro-frontend will be structured as a miniature version of the main application, containing its own `domain`, `application`, and `infrastructure` layers where necessary.

## State Management
- **Local State**: Managed within each micro-frontend using React hooks (`useState`, `useReducer`).
- **Shared State**: Managed by the shell application and passed down to micro-frontends via props or a shared context.
