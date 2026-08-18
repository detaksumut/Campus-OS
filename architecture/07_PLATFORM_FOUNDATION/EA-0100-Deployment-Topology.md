---
id: EA-0100
title: Deployment Topology
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Deployment Topology

## Purpose
Specifies the architectural models for deploying Campus OS across different physical and logical boundaries, ranging from a single campus server room to a massive multi-institutional cloud environment.

## Supported Topologies

### 1. Standalone Institution
- **Scope**: A single university or school.
- **Topology**: All Platform Kernels and Business Modules are deployed within a single network perimeter.
- **Multi-Tenancy**: Typically configured for a single tenant, though internal logical segregation (e.g., separate colleges) may use Multi-Tenancy Level 1.
- **Gateway**: Single API Gateway.

### 2. Multi-Campus
- **Scope**: A university system with distinct physical campuses (e.g., State University System).
- **Topology**: A central Kernel deployment manages global identity and reporting. Local edge nodes or distinct module deployments handle campus-specific workloads to reduce latency and maintain availability during WAN outages.
- **Multi-Tenancy**: Utilizes Multi-Tenancy Level 2 or 3 to strictly isolate data between campuses while maintaining central oversight.
- **Gateway**: Federated API Gateway.

### 3. Cloud Multi-Tenant
- **Scope**: A SaaS provider hosting Campus OS for hundreds of distinct, unaffiliated institutions.
- **Topology**: Massive horizontal scaling. The Platform Foundation is shared, but tenant data is highly isolated.
- **Multi-Tenancy**: Utilizes Multi-Tenancy Level 3 (Separate Database) or Level 4 (Dedicated Deployment) for premium tenants requiring strict compliance.
- **Gateway**: Service Mesh Gateway for zero-trust internal routing and granular rate limiting per tenant.

### 4. National / Consortium Platform
- **Scope**: A nationwide academic network connecting multiple independent universities (e.g., for cross-registration, transcript exchange, or centralized research grants).
- **Topology**: A highly distributed, decentralized model relying heavily on Identity Federation (`EA-0096`) and secure Event Busses crossing organizational boundaries.
