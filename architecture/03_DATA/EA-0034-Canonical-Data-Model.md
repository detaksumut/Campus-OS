---
EA-ID: EA-0034
Title: Canonical Data Model
Category: Data Architecture
Layer: Architecture
Version: 1.0
Maturity: Baseline
Baseline: PRE_FREEZE
Status: Approved
Owner: Chief Enterprise Architect
Depends-On: [EA-0012, EA-0033]
Referenced-By: []
Last-Updated: 2026-07-20
Review-Date: 2026-07-20
Approval: Approved
---

# Canonical Data Model

The Canonical Data Model (CDM) provides a unified, technology-independent representation of business entities. It ensures that an `AcademicProfile` in the HR domain means the exact same thing as an `AcademicProfile` in the Credential Registry domain.

## Objectives
- Eliminate data silos.
- Standardize data formats (e.g., all monetary values are `numeric(19,4)`, all timestamps are `timestamptz`).
- Serve as the integration contract for the Event Bus (Integration Runtime).

When a module emits an event containing data, it MUST conform to the Canonical Data Model JSON schemas, not its internal, proprietary representation.
