# ADR-1002: Registry Snapshot

## Status
Accepted

## Context
In a dynamic plugin ecosystem, plugins could maliciously or accidentally overwrite other plugins' registered UI components at runtime. A mutable global registry leads to unpredictable state changes and extremely difficult debugging.

## Decision
We implement an **Immutable Registry Snapshot**. 
The `PresentationRegistry` only allows modifications through explicit `RegistryTransaction` instances during the build phase. Once the Bootloader completes plugin loading and compilation, it invokes `registry.freeze()`. The Runtime and Services only ever receive this frozen, read-only Snapshot.

## Consequences
- **Positive**: Guarantees deterministic rendering at runtime. No side effects can alter the UI layout after boot.
- **Positive**: Runtime errors related to missing widgets or modified pages are eliminated.
- **Negative**: Dynamic injection of UI components after boot requires a complete Kernel reboot (Cache invalidation).
