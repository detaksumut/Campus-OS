---
EA-ID: EA-0014
Title: Permission Matrix
Category: Matrix
Layer: Architecture
Version: 1.1
Maturity: Baseline
Baseline: PRE_FREEZE
Status: Approved
Owner: Enterprise Architecture Team
Depends-On: [EA-0013]
Referenced-By: []
Last-Updated: 2026-07-20
Review-Date: 2026-07-20
Approval: Approved
---

# Permission Matrix

This document defines the baseline Role-Based Access Control (RBAC) enforced by the Kernel's Authorization Runtime.

## Credential & Certification Roles
| Role | Scheme | Portfolio | Assessment | Registry |
| :--- | :--- | :--- | :--- | :--- |
| **Certification Candidate** | View | Create, Update | View Status | View, Share |
| **Assessor** | View | View (Assigned) | Score | N/A |
| **Lead Assessor** | View | View | Moderate | N/A |
| **Certification Committee**| View | View | Approve | N/A |
| **Certification Admin** | Create, Update| View | View | View |
| **Credential Auditor** | View | View | View | Audit, Verify |
