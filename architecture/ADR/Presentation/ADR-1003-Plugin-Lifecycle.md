# ADR-1003: Plugin Lifecycle

## Status
Accepted

## Context
Plugins require various steps of initialization before they are ready to serve UI traffic (loading metadata, checking capabilities, linking routes). A unified lifecycle intertwines the compilation/build processes with the runtime execution, making it impossible to cache the built UI efficiently.

## Decision
We split the Plugin Lifecycle into two distinct phases:
1. **Build Lifecycle**: `discover`, `load`, `compile`, `link`, `cache`.
2. **Runtime Lifecycle**: `restore`, `initialize`, `activate`, `deactivate`, `dispose`.

## Consequences
- **Positive**: High performance startup. In production, we can skip the entire Build Lifecycle if a valid cache exists, moving directly to `restore` and `activate`.
- **Positive**: Strict separation of concerns between compilation errors and runtime execution errors.
