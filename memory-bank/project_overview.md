# Project Overview

This project is a modular front-end application designed for managing documents and their corresponding types. The primary goal is to refactor the existing monolith into a micro-frontend architecture to improve scalability, maintainability, and team autonomy.

## Key Objectives
- **Decouple Features**: Isolate `Documents` and `Document Types` into independent micro-frontends.
- **Maintain a Central Shell**: Use a container application to host and orchestrate the micro-frontends.
- **Preserve Existing Logic**: Reuse the existing business logic (use cases, repositories) where possible.
