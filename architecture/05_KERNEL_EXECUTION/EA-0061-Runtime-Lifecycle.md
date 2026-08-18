---
id: EA-0061
title: Runtime Lifecycle
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Runtime Lifecycle

## Purpose
Defines the strict progression of states a Runtime instance undergoes within the Execution Host. This guarantees deterministic startup, execution, and graceful shutdown, enabling high observability and robust operability.

## Terminology (Abstract)
- **Execution Host**: The abstract environment executing the runtime (e.g., Process, Container, Pod).
- **Runtime Instance**: A concrete activation of a specific Runtime Contract.

## The Lifecycle States

A Runtime Instance MUST transition through the following states sequentially:

1. **Designed**: The contract exists in architecture (Compile-time/Design-time).
2. **Registered**: The runtime is mapped in the Service Registry/DI Container.
3. **Created**: Memory is allocated; the instance is instantiated.
4. **Configured**: Settings and environment variables are injected.
5. **Initialized**: Internal state is set up; external dependencies are verified.
6. **Starting**: Binding to network ports; preparing to accept traffic/events.
7. **Running**: Fully operational; processing workloads.
8. **Degraded**: Experiencing partial failures (e.g., dependency timeout) but still alive.
9. **Paused**: Temporarily suspended (e.g., circuit breaker tripped or manual intervention).
10. **Stopping**: Graceful shutdown initiated; draining active requests.
11. **Stopped**: All processes halted; network unbound.
12. **Disposed**: Resources (memory, handles) are released back to the Host.
13. **Archived**: Log and audit trails finalized for post-mortem/observability.

## State Transitions
Transitions between states emit lifecycle events to the Observability subsystem. No runtime can move from `Created` to `Running` without passing through `Configured` and `Initialized`.

*(See `EA-0070-Runtime-State-Machine.md` for the formal state diagram).*

## Health Mapping
The lifecycle directly maps to Health Management (`EA-0067`):
- `Initialized` -> Ready for `/startup` probe.
- `Running` -> Passing `/live` and `/ready` probes.
- `Degraded` -> Failing `/ready` but passing `/live`.

## Kubernetes Mapping (Informative / Reference Implementation)
- **Execution Host**: Kubernetes Pod
- **Initialized**: Init Containers completed successfully.
- **Running**: Pod phase `Running`, Liveness/Readiness probes returning 200.
- **Stopping**: Receiving `SIGTERM`, executing `preStop` hooks.
- **Disposed**: Container terminated, Pod deleted.
