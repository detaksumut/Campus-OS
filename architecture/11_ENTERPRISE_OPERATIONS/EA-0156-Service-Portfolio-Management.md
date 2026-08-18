---
id: EA-0156
title: Service Portfolio Management
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Service Portfolio Management

## Purpose
Defines the authoritative catalog of all running services within Campus OS, tracking their state from inception to decommission. It ensures the enterprise always has a clear, real-time understanding of what systems exist and who owns them.

## Service Lifecycle Statuses

Every service in the portfolio MUST be tagged with one of the following official lifecycle statuses:

1. **Planned**: Approved by the Architecture Board, but engineering has not started.
2. **Design**: Active architectural and API contract design is underway.
3. **Development**: Code is actively being written; the service exists only in Local or Shared Dev environments.
4. **Testing**: The service is deployed to QA/UAT environments and is undergoing formal validation.
5. **Production**: The service is live, handling university traffic, and bound by active SLAs.
6. **Deprecated**: The service is still running in Production, but consumers have been warned to migrate to a newer version or replacement. No new features are added.
7. **Retired**: The service has been fully shut down and its data archived.

## Portfolio Metadata Requirements

For a service to be officially tracked in the portfolio, its manifest MUST contain the following metadata:

- **Owner**: The specific engineering squad or business unit responsible for the service.
- **Business Capability**: The direct mapping to the Enterprise Capability Map (`EA-0009`) this service fulfills.
- **Criticality**: The Tier (1, 2, or 3) indicating disaster recovery and incident response priority (`EA-0147`).
- **Dependencies**: Explicit lists of downstream services or datastores this service relies upon.
- **SLA Class**: The formal Service Level Agreement (e.g., 99.9% uptime).
- **Lifecycle Status**: The current state of the service as defined above.
