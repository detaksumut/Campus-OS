---
id: EA-0086
title: Decision Governance
type: Governance Document
status: APPROVED
version: 1.0.0
---

# Decision Governance

## Purpose
Establishes the formal process for making, recording, and altering significant technical decisions within Campus OS. This prevents architectural drift and ensures historical context is preserved.

## Architecture Decision Records (ADRs)

An ADR is the immutable ledger of a technical decision. 

### When an ADR is Required
An ADR MUST be created when a decision:
- Introduces or removes a new technology or framework (e.g., adopting a new database type).
- Alters an established Enterprise Architecture or Execution Architecture pattern.
- Introduces a breaking change (MAJOR version bump) to a Runtime Contract.
- Accepts a Critical or High-severity technical debt that cannot be resolved within the SLA.

### Approval Authority
- ADRs MUST be reviewed and approved by the **Enterprise Architecture Board** (or designated Lead Architect).
- PMO sign-off may be required if the decision significantly impacts project timelines or budget.

### ADR Lifecycle
1. **Proposed**: The ADR is drafted and under discussion.
2. **Accepted**: The decision is approved and becomes binding architecture.
3. **Deprecated**: The decision is no longer valid, but has not yet been fully removed from the system.
4. **Superseded**: The decision has been entirely replaced by a newer ADR (The old ADR must link to the new one).

### Immutability
Once an ADR is `Accepted`, its core decision and rationale CANNOT be modified. If the architecture needs to change, a **new** ADR must be created that explicitly supersedes the old one. Typo fixes are permitted without a new ADR.
