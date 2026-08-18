---
id: EA-0090
title: Module Lifecycle
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Module Lifecycle

## Purpose
Defines the distinct lifecycle states of a Business Module within the Campus OS ecosystem. This is distinct from the low-level Runtime Lifecycle (`EA-0061`).

## The Lifecycle Stages

A Module progresses through the following administrative states:

1. **Discovered**: The Kernel locates the Module Manifest (`manifest.yaml`) in the plugin directory or network store.
2. **Validated**: The Kernel verifies the manifest schema, checks that all `dependencies` (Runtimes) are available, and validates `compatibility` constraints.
3. **Installed**: The Kernel allocates persistent storage (Database schemas) and registers the Module in the Capability Registry.
4. **Configured**: Tenant-specific or environment-specific configurations are injected into the Module context.
5. **Enabled**: The Kernel activates the Module's API routes in the API Gateway and binds its Event subscribers.
6. **Running**: The Module is actively processing business logic and serving user traffic.
7. **Disabled**: The Kernel pauses routing traffic to the Module (API Gateway returns 503 Service Unavailable for its routes). Used for maintenance.
8. **Upgraded**: A new version of the manifest is detected. Database migrations are applied.
9. **Removed**: The Module is uninstalled. Routes are deleted, capabilities unregistered. (Data retention policies apply).

## Constraints
- A Module CANNOT transition to `Enabled` if its `Validated` step fails (e.g., missing Kernel version).
- Modules MUST support graceful transitions between `Enabled` and `Disabled` states without data loss.
