---
id: EA-0129
title: Implementation Playbook
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Implementation Playbook

## Purpose
A step-by-step guide for a development squad assigned to build a brand new Business Module from scratch.

## The Playbook

### Phase 1: Architecture Alignment (Week 1)
1. **Identify the Capability**: Find your assigned module in the `EA-0009` Business Capability Map.
2. **Draft the Manifest**: Create the `module-manifest.yaml` (`EA-0089`) defining your Module ID, exposed APIs, and Events.
3. **Architecture Review**: Present your Manifest and Domain Model to the Architecture Board. Get approval.

### Phase 2: Domain Implementation (Week 2)
1. **Scaffold**: Copy the folder structure from the Golden Reference Module (`EA-0120`).
2. **Write Domain Logic**: Implement the core business rules in the `domain/` and `service/` folders.
3. **Unit Tests**: Achieve >90% coverage on the domain logic. No databases allowed yet.

### Phase 3: Infrastructure & Contracts (Week 3)
1. **API Contracts**: Write the OpenAPI spec for your REST/gRPC endpoints.
2. **Event Contracts**: Register your AsyncAPI payloads in the Schema Registry.
3. **Database**: Write the Flyway migration scripts (`EA-0125`) for your module's exclusive database schema.
4. **Integration**: Implement the Repositories and Application Services. Write Integration Tests using Testcontainers.

### Phase 4: Delivery (Week 4)
1. **Deployment Descriptor**: Write the Helm chart (`EA-0127`).
2. **CI/CD**: Push code. The pipeline will automatically run Linters, SAST scanners, and tests.
3. **Conformance**: The PMO runs the Implementation Conformance checks (`EA-0132`).
4. **Merge**: If passed, the PR is merged into `main` and auto-deployed to the Staging Environment.
