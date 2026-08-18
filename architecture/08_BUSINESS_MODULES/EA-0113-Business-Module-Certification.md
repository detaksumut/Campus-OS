---
id: EA-0113
title: Business Module Certification
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Business Module Certification

## Purpose
Defines the final Quality Gate that a Business Module must pass before it is officially recognized as a "Campus OS Certified Module" and allowed to deploy into a production environment.

## Certification Checklist

Before a Module is promoted to Production, the PMO and Architecture Review Board MUST validate the following:

- [ ] **Architecture Compliance**: The module follows the layered Domain Service Architecture (`EA-0108`). No business logic exists in the infrastructure or controller layers.
- [ ] **Business Capability Traceability**: Every Application Service exposed by the module maps directly to an approved Enterprise Business Capability.
- [ ] **Runtime Compliance**: The module uses the official Campus OS Identity, Observability, and Policy Runtimes. No rogue internal libraries are used for these functions.
- [ ] **Contract Compliance**: The OpenAPI spec is valid, Lint-free, and adheres to the Campus OS REST/RPC guidelines.
- [ ] **Event Compatibility Validation**: The AsyncAPI schemas for published events do not introduce breaking changes without a major version bump.
- [ ] **Workflow Validation**: The module correctly delegates stateful, multi-step orchestration to the Workflow Runtime rather than managing cross-module state internally.
- [ ] **Platform Dependency Validation**: The module does NOT directly call the API or database of another module.
- [ ] **Multi-Tenant Readiness**: Every database query and API response is scoped by a `TenantContext`. The module is verified to run safely in a Level 3 (Shared DB) multi-tenant topology.
- [ ] **Security Compliance**: SAST/DAST scans pass with zero High/Critical vulnerabilities. ABAC/RBAC scopes are properly enforced.
- [ ] **Performance Compliance**: API endpoints meet the required p95 latency SLAs under load.
- [ ] **Documentation Compliance**: The `EA-0112` Reference Template is fully populated and up to date.
- [ ] **Test Coverage**: Minimum 85% branch coverage in Unit and Integration tests.
- [ ] **Deployment Validation**: Helm charts / Kubernetes manifests are valid and pass security linting (e.g., non-root user enforcement).
