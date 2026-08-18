---
id: EA-0088
title: Platform Composition
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Platform Composition

## Purpose
Defines the macro-architecture of Campus OS as an Enterprise Platform rather than a monolithic application or a loose collection of microservices.

## Core Philosophy
**"The Platform owns the capabilities; modules compose the business."**

The Campus Kernel provides a robust, generic foundation of capabilities (Identity, Workflow, Policy, Document Management, etc.). Business Modules (Academic, Finance, Admission) do not reinvent these wheels; instead, they *compose* these capabilities into specific business processes.

## Platform Layers

1. **Kernel (Platform Foundation)**
   - The immutable core. Provides execution environments, service discovery, identity federation, and global observability.
2. **Platform Services (Runtimes)**
   - The functional pillars provided by the Kernel (e.g., Policy Runtime, Workflow Runtime).
3. **Extension Framework (Plugin Architecture)**
   - The boundaries and interfaces allowing external modules to attach to the Platform without altering Kernel code.
4. **Business Modules**
   - The domain-specific plugins. Modules interact with the Platform, but never directly with each other.

## Dependency Inversion
Modules depend on the Platform Foundation. The Platform Foundation does NOT depend on any Module. If a capability is required by multiple modules, it MUST be promoted to a Platform Service (Runtime).
