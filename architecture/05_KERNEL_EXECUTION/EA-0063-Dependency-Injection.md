---
id: EA-0063
title: Dependency Injection
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Dependency Injection

## Purpose
Defines the Inversion of Control (IoC) mechanics for object creation, assembly, and destruction within a Runtime Instance. This ensures loose coupling, testability, and technology independence.

## Abstract Lifetimes
All object registrations in the Dependency Injection (DI) container MUST specify one of the following lifetimes:

1. **Singleton**: A single instance is created and shared across the entire lifecycle of the Runtime Instance.
2. **Scoped**: A new instance is created once per logical context (e.g., once per HTTP Request, or once per Event consumption).
3. **Transient**: A new instance is created every single time it is requested.
4. **Factory**: The container invokes a custom delegate/function to dynamically resolve the dependency at runtime.
5. **Lazy**: Resolution is deferred until the exact moment the object's methods are invoked.
6. **Proxy**: An interceptor instance that wraps the real dependency to inject cross-cutting concerns (e.g., logging, security).
7. **Decorator**: A structural pattern where multiple implementations of the same interface wrap each other.

## Resolution Rules
- **No Captive Dependencies**: A `Singleton` object MUST NOT depend on a `Scoped` or `Transient` object. This causes the shorter-lived dependency to become "captive" and live forever, causing memory leaks or state corruption.
- **Fail-Fast on Startup**: The DI Container MUST validate the dependency graph during the `Initialized` lifecycle state. If a required dependency is missing, or a captive dependency is detected, the runtime MUST abort startup (enter `Stopped` state).

## Circular Dependency Prevention
- True circular dependencies (A depends on B, B depends on A) are architectural flaws. The DI Container MUST throw an exception on startup.
- If a circular flow is logically required, it MUST be broken using a `Lazy` wrapper or an Event-driven approach (Event Bus).

## Disposal Rules
- The DI Container is solely responsible for disposing of the objects it creates.
- `Transient` and `Scoped` objects MUST be disposed at the end of their scope.
- `Singleton` objects MUST be disposed during the `Disposed` lifecycle state of the Runtime Instance.

## Thread Safety
- `Singleton` instances MUST be completely thread-safe and ideally stateless. If state is required, thread synchronization mechanisms must be employed.
- `Scoped` and `Transient` instances do not require strict thread safety, provided they are not artificially shared across threads.

## Reference Implementation Examples (Informative)
- **.NET**: `Microsoft.Extensions.DependencyInjection` (IServiceCollection).
- **Java**: Spring IoC Container / CDI.
- **Node.js**: NestJS DI / InversifyJS.
- **Go**: Wire (Compile-time DI) or Fx (Runtime DI).
