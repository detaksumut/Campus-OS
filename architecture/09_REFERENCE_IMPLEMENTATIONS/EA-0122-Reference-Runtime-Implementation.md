---
id: EA-0122
title: Reference Runtime Implementation
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Reference Runtime Implementation

## Purpose
Establishes the **Identity Runtime** as the Golden Reference Runtime. While Business Modules contain the core institutional logic, Runtimes provide the foundational capabilities required by all modules.

## The Golden Reference: Identity Runtime

The Identity Runtime was selected because it touches all platform mechanics (AuthN, AuthZ, Configuration, Health, Metrics).

### 1. The Runtime Contract
The Identity Runtime exposes an immutable, versioned gRPC/REST contract (e.g., `VerifyToken`, `CheckPermission`). All Business Modules depend on this contract, NEVER on the runtime's internal database.

### 2. Runtime Lifecycle
- **Initialization**: Loads OIDC configurations, public keys, and tenant policies from the central Config Map.
- **Ready State**: Connects to Redis (for token caching) and PostgreSQL (for policy storage).
- **Graceful Shutdown**: Stops accepting new token verifications, flushes audit logs to the Event Bus, and terminates.

### 3. Observability
- Emits standard Prometheus metrics (`auth_attempts_total`, `auth_latency_seconds`).
- Integrates OpenTelemetry spans into every verification request, allowing tracing across the entire Campus OS request lifecycle.

### 4. Sidecar Pattern
The Identity Runtime is often deployed as a sidecar proxy (or via an Envoy filter) ensuring that authorization checks happen *before* traffic reaches the Business Module's application logic.
