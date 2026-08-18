---
id: EA-0167
title: Continuous Certification
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Continuous Certification

## Purpose
Establishes the governance mechanism to ensure that modules deployed to production do not experience architectural or security drift over time. Certification is not a one-time event; it is an ongoing process.

## Certification Triggers

A module must undergo re-certification under the following conditions:

### 1. Scheduled Review
- Every module must be re-certified annually to ensure it still meets modern compliance and architectural standards.

### 2. Event-Driven Review
- Triggered by significant external events, such as the discovery of a major zero-day vulnerability (e.g., Log4Shell) in a core dependency, requiring all modules to be audited and re-certified.

### 3. Major Release Review
- Triggered when a module undergoes a major version bump (e.g., v1.x to v2.0) that includes breaking contract changes or significant architectural refactoring.

## Review Domains

During re-certification, the PMO evaluates the module against:
- **Architecture Review**: Does it still align with the current `EA-0009` Capability Map?
- **Compliance Review**: Does it adhere to the latest data privacy laws (e.g., GDPR changes)?
- **Security Review**: Are dependencies up-to-date and free of known CVEs?
- **Operational Review**: Are the runbooks still accurate? Are the SLIs still being met?

If a module fails Continuous Certification, it is placed on a remediation plan; failure to remediate may result in forced retirement.
