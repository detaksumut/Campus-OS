---
EA-ID: EA-0013
Title: Data Ownership Matrix
Category: Matrix
Layer: Architecture
Version: 1.1
Maturity: Baseline
Baseline: PRE_FREEZE
Status: Approved
Owner: Enterprise Architecture Team
Depends-On: [EA-0011, EA-0012]
Referenced-By: [EA-0014]
Last-Updated: 2026-07-20
Review-Date: 2026-07-20
Approval: Approved
---

# Data Ownership Matrix

This matrix strictly enforces which Bounded Context (BC) has the legal right to Create, Update, or Delete an entity.

| Entity / Aggregate | Owning Bounded Context (Master) | Read-Only Consumers |
| :--- | :--- | :--- |
| `AcademicIdentity` | **HR BC** | All BCs |
| `AcademicProfile` | **HR BC** | Academic, Credential, Research |
| `CompetencyFramework` | **Academic Credential BC** | HR, Learning |
| `CertificationScheme` | **Academic Credential BC** | All BCs |
| `CertificateRecord` | **Credential Registry BC** | HR, Credential, Public Viewers |
| `DigitalBadge` | **Credential Registry BC** | HR, LMS |
| `Manuscript` | **Publication BC** | Credential (for portfolio evidence) |
| `ResearchProject` | **Research BC** | Credential (for portfolio evidence) |

## Strict Rules
**Eventual Consistency:** When a Lecturer publishes a `Manuscript` (Publication BC), an event is fired. The `AcademicProfile` (HR BC) listens and updates the lecturer's Publication Profile, which is then used as evidence by the `Academic Credential BC`.
