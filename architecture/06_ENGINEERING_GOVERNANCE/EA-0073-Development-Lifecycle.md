---
id: EA-0073
title: Development Lifecycle
type: Governance Document
status: APPROVED
version: 1.0.0
---

# Development Lifecycle

## Purpose
Defines the standard Software Development Life Cycle (SDLC) that every feature or bug fix must undergo before reaching production. 

## The Lifecycle Phases

1. **Architecture & Contract Review (Design Phase)**
   - No code is written until the Runtime Contract (OpenAPI, Event Schema) and the relevant Architecture models (EA-IDs) are approved and frozen for the sprint.
2. **Implementation (Development Phase)**
   - Engineers check out feature branches from `develop`.
   - Local development must pass local Quality Gates (linting, local unit tests).
3. **Integration (Continuous Integration Phase)**
   - Code is pushed to the central repository.
   - The CI Pipeline automatically executes the mandatory Quality Gates (See `EA-0080`).
4. **Code Review (Peer Review Phase)**
   - Pull Requests are reviewed against strict architecture compliance checklists (See `EA-0079`).
5. **Testing & QA (Staging Phase)**
   - Merged code in `develop` or `release/*` is deployed to staging environments.
   - End-to-end integration, performance, and security testing are conducted.
6. **Release Governance (Approval Phase)**
   - Formal sign-offs are collected from Engineering, Security, Architecture, and PMO (See `EA-0081`).
7. **Deployment & Operations (Production Phase)**
   - Code is deployed to production via automated Continuous Deployment (CD).
   - Observability metrics are actively monitored.
