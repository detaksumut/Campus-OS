# Shared Service Structure Blueprint

This document defines the strict 10-folder structure for all Core Shared Services.

```campus-spec service-structure
version: 1.0.0
type: service
folders:
  - application
  - contracts
  - domain
  - infrastructure
  - runtime
  - tests
  - documentation
  - governance
  - manifest
  - artifacts
requiredFiles:
  - name: ServiceManifest.json
    type: metadata
  - name: README.md
    type: documentation
```
