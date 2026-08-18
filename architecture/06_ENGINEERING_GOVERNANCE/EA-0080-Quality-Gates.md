---
id: EA-0080
title: Quality Gates
type: Governance Document
status: APPROVED
version: 1.0.0
---

# Quality Gates

## Purpose
Defines the mandatory, automated pipeline stages that an artifact must successfully pass before it is eligible for merge or deployment.

## Pipeline Sequence

The pipeline MUST execute strictly in the following order. If one stage fails, the pipeline aborts, and the artifact is rejected.

1. **Architecture Validation**: Ensures structural constraints are met (e.g., verifying `repository.yaml` health or checking bounded context isolation).
2. **Contract Validation**: Validates that OpenAPI and AsyncAPI schemas are syntactically correct and semantically compliant with Enterprise models.
3. **Database Validation**: Executes Flyway migrations against an ephemeral database to ensure schema scripts run without errors.
4. **Static Analysis**: Uses an abstract *Static Analysis Engine* to scan code for code smells, vulnerabilities, and technical debt.
5. **Unit Test**: Runs the unit test suite. MUST enforce a minimum test coverage threshold (e.g., 85%) via a *Test Coverage Engine*.
6. **Integration Test**: Runs tests requiring external dependencies (via TestContainers or mocks).
7. **Contract Compatibility Test**: Validates that the producer payload matches the consumer expectation (e.g., using Pact).
8. **Performance Validation**: Runs load tests against key endpoints to ensure SLAs are met.
9. **Security Validation**: Runs a *Security Analysis Engine* (SAST/DAST) and *Dependency Analysis Engine* (SCA) to detect known CVEs.
10. **Documentation Validation**: Verifies that required Markdown documents (ADRs, Readmes) are present and properly formatted.
11. **Release Approval**: The artifact enters the final manual/automated gate before promotion to production (See `EA-0081`).

## Hard Failures
Quality Gates are not advisory. A failed static analysis check or security scan is a hard failure, resulting in an immediate rejection of the Pull Request.
