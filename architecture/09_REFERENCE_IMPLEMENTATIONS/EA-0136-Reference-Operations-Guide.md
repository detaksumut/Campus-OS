---
id: EA-0136
title: Reference Operations Guide
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Reference Operations Guide

## Purpose
Provides the normative procedures for Day-2 operations of Campus OS. It guarantees that the infrastructure and SRE teams have a standardized playbook for managing the lifecycle of the platform in production.

## Operational Procedures

### 1. Startup Sequence
Campus OS cannot boot arbitrarily. The dependency tree MUST be respected:
1. **Stateful Services**: Databases (PostgreSQL/MongoDB), Event Bus (Kafka), Caches (Redis). Wait for readiness probes.
2. **Kernel Runtimes**: Identity Runtime, Policy Runtime, Config Runtime.
3. **Platform Services**: API Gateway, Workflow Runtime.
4. **Business Modules**: Independent stateless pods (e.g., Admission, Identity, Finance). 

### 2. Shutdown Sequence
1. **Drain Gateway**: The API Gateway stops accepting new external connections, waiting for in-flight requests to complete.
2. **Drain Modules**: Modules receive `SIGTERM`, stop pulling new events from the Event Bus, complete active database transactions, and exit.
3. **Shutdown Runtimes & Stateful Services**.

### 3. Backup and Restore
- **Databases**: Volume snapshots are taken daily. Write-Ahead Logs (WAL) are shipped continuously (e.g., via WAL-G) to object storage to enable Point-In-Time-Recovery (PITR).
- **Events**: The Event Bus retains messages based on configured policies, but critical domain state must reside in the database, not indefinitely in the bus.

### 4. Zero-Downtime Upgrades
- Modules are upgraded using Kubernetes Rolling Updates or Blue/Green Deployments.
- Because database migrations (`EA-0125`) are strictly backward-compatible, v1.0 and v1.1 of a Module can run simultaneously during the rollout phase without corrupting data.

### 5. Rollback
- If the new Deployment fails its Readiness Probes, Kubernetes automatically halts the rollout.
- If a logical bug is found post-deployment, the CI/CD pipeline triggers a rollback to the previous image tag. The database is NOT rolled back (hence the requirement for backward-compatible schemas).

### 6. Incident Response
- All alerts trigger an incident in a centralized tracking system (e.g., PagerDuty/Jira).
- The On-Call engineer uses the `traceId` from the alert to query the distributed tracing backend (e.g., Jaeger) to pinpoint the exact Module and Application Service causing the failure.
