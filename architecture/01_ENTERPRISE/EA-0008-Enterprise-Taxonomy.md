---
EA-ID: EA-0008
Title: Enterprise Taxonomy
Category: Taxonomy
Layer: Enterprise
Version: 1.1
Maturity: Review
Baseline: PRE_FREEZE
Status: Approved with Revisions
Owner: Enterprise Architecture Team
Depends-On: []
Referenced-By: [EA-0009, EA-0010]
Last-Updated: 2026-07-20
Review-Date: 2026-07-20
Approval: Pending
---

# Enterprise Taxonomy

To ensure ubiquitous language across business, product, and engineering teams, the following taxonomy is strictly enforced:

- **Capability:** A high-level business function (e.g., "Student Management").
- **Domain:** A broad area of enterprise interest (e.g., "Academic Domain").
- **Subdomain:** A focused segment within a Domain (e.g., "Graduation").
- **Bounded Context:** A logical boundary where a specific domain model applies and is isolated from others.
- **Kernel:** The centralized, shared foundational infrastructure (Identity, Workflow, AI).
- **Module:** A deployable unit of business value that implements a Bounded Context, built on top of the Kernel.
- **Component:** A reusable UI or backend programmatic block.
- **Service:** A stateless logic orchestrator within a Module.
- **Entity:** A domain object with a unique identity that persists over time.
- **Aggregate:** A cluster of domain objects that can be treated as a single unit.
- **Workflow:** A sequence of automated steps or approvals.
- **Event:** A past occurrence within the system (e.g., `StudentRegistered`), broadcasted to the message broker.
- **Policy:** A business rule governing behavior (e.g., "Student cannot register if UKT is unpaid").
- **Standard:** Technical constraints that must be followed (e.g., REST API Standard).
- **Asset:** Any documented artifact within the Enterprise Architecture Repository.
