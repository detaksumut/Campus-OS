# Domain Structure Blueprint

This document defines the strict 16-folder structure for all Bounded Contexts within Campus OS. No domain may deviate from this structure without an explicit Architecture Decision Record (ADR).

## Required Folders

The following specification block is consumed by the Architecture Compiler to generate the Campus CLI template.

```campus-spec domain-structure
version: 1.0.0
type: domain
folders:
  - contracts
  - application
  - domain
  - infrastructure
  - presentation
  - runtime
  - events
  - repositories
  - dto
  - tests
  - documentation
  - governance
  - certification
  - manifest
  - artifacts
requiredFiles:
  - name: DomainManifest.json
    type: metadata
  - name: README.md
    type: documentation
```

### Explanation of Folders
- **contracts**: Contains public API interfaces and DTOs.
- **application**: Application services and use cases.
- **domain**: Pure domain aggregates, entities, and value objects.
- **infrastructure**: Adapters for databases and external services.
- **presentation**: Controllers, plugins, or UI widgets.
...
