---
id: EA-0070
title: Runtime State Machine
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Runtime State Machine

## Purpose
Provides the formal visual representation of the Runtime Lifecycle defined in `EA-0061`. This state machine dictates the allowed transitions for any Runtime Instance executing within Campus OS.

## State Diagram

```mermaid
stateDiagram-v2
    [*] --> Designed : Architecture Phase
    Designed --> Registered : DI Configuration
    Registered --> Created : Memory Allocated
    Created --> Configured : Settings Injected
    Configured --> Initialized : Subsystems Ready
    
    Initialized --> Starting : Bind to Port
    Starting --> Running : Health Checks Pass
    
    Running --> Degraded : Partial Failure
    Degraded --> Running : Self-Healed
    
    Running --> Paused : Admin Action / Circuit Breaker
    Paused --> Running : Resumed
    
    Running --> Stopping : SIGTERM Received
    Degraded --> Stopping : Fatal Threshold Reached
    Paused --> Stopping : Shutdown Commanded
    
    Stopping --> Stopped : Connections Drained
    Stopped --> Disposed : Resources Freed
    Disposed --> Archived : Logs Flushed
    Archived --> [*]
```

## Transition Rules
- **Forward Progress Only (Startup)**: An instance cannot transition from `Configured` back to `Created`. If setup fails, it must transition directly to `Stopping` -> `Stopped`.
- **Halt on Failure**: Any failure during the `Initialized` or `Starting` phase MUST prevent transition to `Running`.
- **Graceful Degradation**: Transitioning to `Degraded` indicates a failure that does not prevent core functionality (e.g., failure to connect to a secondary cache). Liveness checks still pass.
