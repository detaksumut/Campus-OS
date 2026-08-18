# ADR-1005: Router Agnostic Navigation

## Status
Accepted

## Context
React applications traditionally tightly couple their UI logic to libraries like `react-router` or `tanstack-router`. This violates the Kernel principle, as business domains should not know about HTTP browser history implementations.

## Decision
We define an `INavigationRuntime` interface inside `@campus-os/presentation-core` that exposes only primitive intents: `navigate(path)`, `replace()`, `back()`. 
Domain widgets interact exclusively with this interface. The actual router implementation (e.g., TanStack Router) is injected at the very outer edge of the `PresentationReact` layer.

## Consequences
- **Positive**: We can swap routing libraries (or move to a Native app framework like React Native) without modifying a single line of Domain UI code.
- **Positive**: Perfect alignment with the Ports and Adapters architecture.
