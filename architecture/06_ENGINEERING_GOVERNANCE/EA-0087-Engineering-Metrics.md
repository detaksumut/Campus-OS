---
id: EA-0087
title: Engineering Metrics
type: Governance Document
status: APPROVED
version: 1.0.0
---

# Engineering Metrics

## Purpose
Defines the Key Performance Indicators (KPIs) used to objectively measure the health, velocity, and stability of the engineering organization and the software it produces (aligned with DORA metrics and Enterprise Architecture goals).

## Core Metrics

### 1. Delivery & Velocity Metrics
- **Deployment Frequency**: How often code is successfully deployed to production.
- **Lead Time for Change**: The amount of time it takes a commit to get into production.

### 2. Stability Metrics
- **Mean Time to Recovery (MTTR)**: How long it takes to restore service when a production failure occurs.
- **Change Failure Rate**: The percentage of deployments causing a failure in production requiring a hotfix, rollback, or patch.

### 3. Quality & Governance Metrics
- **Build Success Rate**: The percentage of CI pipeline runs that complete successfully without failing Quality Gates.
- **Test Coverage**: The percentage of source code executed during the automated test suite (Unit/Integration).
- **Contract Compliance**: The percentage of APIs and Events that pass automated contract validation tests without deviation.
- **Architecture Compliance**: The percentage of Pull Requests that pass automated architecture bounds checking (e.g., Dependency Matrix validation).
- **Technical Debt Ratio**: The volume of open technical debt tickets vs resolved tickets, categorized by severity (Critical, High, Medium, Low).

## Measurement and Reporting
- Metrics MUST be gathered automatically via CI/CD pipelines, issue trackers, and observability platforms.
- The PMO and Engineering Leadership will review these metrics during release readiness assessments. A severe degradation in Quality or Stability metrics may trigger a freeze on new feature development until the metrics recover.
