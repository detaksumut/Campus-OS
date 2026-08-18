---
id: EA-0142
title: Environment Strategy
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Environment Strategy

## Purpose
Defines the standard sequence of environments through which an artifact must progress. This 7-tier architecture ensures that code is thoroughly validated, integrated, and accepted by stakeholders before it ever touches live data.

## The 7-Tier Environment Architecture

### 1. Local Development
- **Purpose**: Rapid iteration and unit testing.
- **Scope**: Runs entirely on the developer's laptop (`EA-0138`).
- **Data**: Mock data or ephemeral Testcontainers.

### 2. Shared Development (Dev)
- **Purpose**: The first remote integration point for a single development squad.
- **Scope**: Deployed upon merging to the `develop` branch.
- **Data**: Seeded dummy data. Unstable.

### 3. Integration (Int)
- **Purpose**: Testing interactions between modules built by different squads.
- **Scope**: This is where Cross-Module Orchestration (`EA-0106`) is validated. E2E tests run here.
- **Data**: Automated test datasets.

### 4. Quality Assurance (QA)
- **Purpose**: Formal manual and automated QA verification.
- **Scope**: Performance and Security (DAST) scans occur here. Code is feature-frozen.
- **Data**: Sanitized, non-production data representing real-world complexity.

### 5. User Acceptance Testing (UAT)
- **Purpose**: Validation by the Business Owners and End Users.
- **Scope**: Final sign-off environment. No automated testing occurs here; purely manual acceptance.
- **Data**: Highly curated datasets matching production structures.

### 6. Pre-Production (Staging)
- **Purpose**: Exact infrastructure parity with Production to validate the deployment process itself.
- **Scope**: Validates the Helm charts, database migrations, and operational runbooks.
- **Data**: Sanitized clone of Production data.

### 7. Production (Prod) & Disaster Recovery (DR)
- **Purpose**: Live operations serving actual university traffic.
- **Scope**: Highly restricted access. Deployments are orchestrated via GitOps or automated Release Pipelines.
- **Data**: The authoritative source of truth. Replicated to the DR environment (`EA-0147`).

## Promotion Rules
- Artifacts MUST be promoted sequentially (e.g., QA ➔ UAT ➔ Pre-Prod ➔ Prod). Skipping environments (except for critical hotfixes) is an architectural violation.
