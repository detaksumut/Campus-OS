---
id: EA-0158
title: Enterprise Release Governance
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Enterprise Release Governance

## Purpose
Defines the authoritative controls that dictate how and when software artifacts are permitted to transition into production, ensuring that all releases align with business timing, compliance requirements, and operational capacity.

## Release Governance Framework

### 1. Release Windows & Blackouts
- **Release Windows**: Pre-approved times when deployments are encouraged (e.g., Tuesday-Thursday, 10 AM - 4 PM) to ensure maximum engineering support is available if issues arise.
- **Blackout Periods**: Specific periods (e.g., Final Exams week, Enrollment week) where all non-emergency deployments are strictly prohibited to protect the institution's most critical operations.

### 2. Separation of Duties
- The engineer who authored the code CANNOT be the sole approver of the release into production.
- Approval requires independent validation from an automated QA pipeline and a secondary human sign-off (e.g., Tech Lead or Product Owner) via the Change Advisory Board (CAB) process for major releases (`EA-0151`).

### 3. Emergency Fixes (Hotfixes)
- Hotfixes may bypass standard release windows and CAB approval layers to address critical production outages or severe security vulnerabilities (CVSS > 9.0).
- However, hotfixes MUST still pass automated testing and be retroactively documented via an incident Post-Mortem (`EA-0146`) within 48 hours.

### 4. Release Cadence Strategy
- The enterprise aims for a high deployment frequency (Continuous Deployment) for low-risk microservices, while enforcing strict release trains (batched deployments) for monolithic legacy systems or high-risk financial modules.
