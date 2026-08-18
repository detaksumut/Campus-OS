# ADR-1001: Presentation Kernel

## Status
Accepted

## Context
Campus OS needs a scalable UI architecture to support dozens of bounded contexts (Membership, Publication, Certification) without turning the frontend into an unmaintainable monolith. Traditional SPA frameworks (React/Vue) tightly couple UI logic with domain logic, leading to massive refactorings when the system grows.

## Decision
We will treat the Presentation Layer as an Operating System Kernel. 
Instead of building a React Application, we build a **Presentation Kernel** composed of a Compiler Pipeline, Bootloader, Registry, and SDK. 
UI Manifests are authored as pure TypeScript by domain plugins, which the Compiler transforms into an immutable Registry. The React Runtime merely acts as an adapter rendering the Registry.

## Consequences
- **Positive**: Complete decoupling between Domain UI definitions and React.
- **Positive**: UI plugins can be built and tested completely independent of the DOM.
- **Negative**: Steeper learning curve for frontend engineers accustomed to writing React directly.
