# ADR-1006: Bootloader and Kernel Modes

## Status
Accepted

## Context
As the Presentation Kernel assumes more responsibilities (Caching, Compiling, Event Bus setup, Diagnostics), scattering this initialization logic across multiple entry files creates a fragile startup sequence.

## Decision
We introduce a central `PresentationBootloader` that governs the exact startup sequence. It accepts a `KernelMode` configuration (`development`, `production`, `test`, `diagnostics`).
The Bootloader orchestrates Cache retrieval, Compiler execution, Registry freezing, and handover to the React runtime based on the active Mode.

## Consequences
- **Positive**: Deterministic startup sequence.
- **Positive**: Development mode can enable hot-reloading and diagnostics, while Production mode can securely lock down the registry and bypass the compiler for maximum performance.
