---
id: EA-0079
title: Code Review Policy
type: Governance Document
status: APPROVED
version: 1.0.0
---

# Code Review Policy

## Purpose
Establishes the human verification layer of the Development Lifecycle. While pipelines catch syntax and contract violations, Code Review guarantees that the architectural intent is preserved.

## Mandatory PR Checklist
Every Pull Request (PR) MUST explicitly answer and pass the following checklist before it can be approved by a reviewer:

- [ ] **Enterprise Architecture**: Does this code align with the defined Business Domains and Bounded Contexts?
- [ ] **Runtime Contract**: Does the implementation strictly adhere to the frozen OpenAPI/Event contracts?
- [ ] **Execution Architecture**: Are dependency lifetimes (Singleton, Transient) correctly defined without captive dependencies? Are events published with trace IDs?
- [ ] **Breaking Changes**: Does this introduce a breaking change to an API or Event schema? (If yes, is it accompanied by a MAJOR version bump and an ADR?)
- [ ] **Database Migration**: Are Flyway migration scripts idempotent, safe, and following the naming standard?
- [ ] **OpenAPI / AsyncAPI**: Are the contract definition files updated if new non-breaking features are added?
- [ ] **Documentation**: Have `README.md` and inline architectural comments been updated?
- [ ] **Testing**: Are there sufficient Unit and Integration tests for this change? Do all tests pass?

## Approval Requirements
- Minimum of **two** approvals from peer engineers.
- Changes affecting Contracts or Migrations require an approval from a designated **Architecture Reviewer**.
- Code owners MUST NOT approve their own PRs.
