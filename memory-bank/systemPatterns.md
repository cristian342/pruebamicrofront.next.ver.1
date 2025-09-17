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

## Module Federation Communication
- **Exposed Modules**: Each micro-frontend will define which of its components, pages, or services are available for consumption by others. This is configured in the `rspack.config.js` file under the `exposes` property.
- **Remote Modules**: The shell application and other micro-frontends will define the remote entry points for each micro-frontend they need to consume. This is configured in the `remotes` property.
- **Dynamic Loading**: Remote modules are loaded at runtime, allowing for independent deployments and updates of each micro-frontend.
