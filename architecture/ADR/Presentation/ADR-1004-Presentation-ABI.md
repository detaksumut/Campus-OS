# ADR-1004: Presentation ABI

## Status
Accepted

## Context
When domain plugins declare UI pages and widgets, passing these raw TypeScript objects directly to the Runtime (React) introduces fragility. A small change in the manifest schema would require rewriting the React code.

## Decision
We introduce the **Presentation ABI (Application Binary Interface)** as the official contract between the Compiler and the Runtime. 
The Compiler transforms human-authored `manifest.ts` into a strictly normalized, validated, and statically resolvable `CompiledPage` and `CompiledWidget` object. The React Runtime only ever consumes this ABI.

## Consequences
- **Positive**: ABI can be versioned (e.g., ABI v1.0). The Runtime can evolve completely independently of how Domain teams author their manifests.
- **Positive**: The ABI acts as a public SDK boundary.
- **Negative**: Adds a layer of indirection (Compilation) between authoring UI and rendering it.
