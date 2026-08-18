---
id: EA-0097
title: Multi-Tenancy Architecture
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Multi-Tenancy Architecture

## Purpose
Establishes the structural design required to support multiple logical organizations (Tenants) within Campus OS, ensuring data isolation, configuration autonomy, and operational efficiency without requiring duplicate codebases.

## Architectural Requirement
Campus OS MUST be built with multi-tenancy in mind from Day 1. Every API request and database query MUST resolve to a specific `TenantContext`. Single-institution deployments are simply multi-tenant deployments containing only one tenant.

## Multi-Tenancy Models (Levels of Isolation)

The Platform Foundation supports four distinct models. Organizations select the model based on security, cost, and operational requirements.

| Level | Model | Isolation | Security | Cost | Scalability | Operational Complexity |
|-------|-------|-----------|----------|------|-------------|------------------------|
| **1** | Shared Database, Shared Schema | Logical (Row-level) | Lowest | Lowest | Highest | Low |
| **2** | Shared Database, Separate Schema | Logical (Schema-level) | Medium | Low | High | Medium |
| **3** | Separate Database | Physical (DB-level) | High | High | Medium | High |
| **4** | Dedicated Deployment | Physical (Infra-level) | Highest | Highest | Lowest | Highest |

## Core Multi-Tenant Capabilities

1. **Tenant Isolation**: Runtimes MUST guarantee that data from Tenant A cannot leak to Tenant B under any circumstances.
2. **Tenant Configuration**: Runtimes MUST support hierarchical configuration, allowing Tenant B to override global defaults (e.g., custom branding, custom password policies) without affecting Tenant A.
3. **Tenant Identity**: Users may belong to multiple tenants. The Identity Federation layer MUST resolve which tenant context the user is currently operating under.
4. **Tenant Lifecycle**: The Platform MUST support automated provisioning, suspension, and deletion of Tenants via the Configuration Runtime.
