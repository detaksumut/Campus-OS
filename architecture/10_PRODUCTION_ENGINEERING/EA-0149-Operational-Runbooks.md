---
id: EA-0149
title: Operational Runbooks
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Operational Runbooks

## Purpose
Defines the required documentation that must accompany every module into production. Runbooks provide actionable, step-by-step instructions for human operators to maintain, recover, and mitigate issues within the system.

## The Three Runbook Groups

Every Campus OS Module MUST provide runbooks covering the following three areas:

### 1. Operational Runbook
Standard Day-2 operations that keep the system running smoothly.
- **Startup**: The sequence to safely boot the module and its dependencies.
- **Shutdown**: How to gracefully drain traffic and terminate the module.
- **Scaling**: Indicators to watch for when horizontal/vertical scaling is needed.
- **Maintenance**: Routine tasks (e.g., rotating secrets, purging old data).

### 2. Recovery Runbook
Procedures for recovering from failures or data loss.
- **Backup**: How to manually trigger or verify the database backup.
- **Restore**: How to restore a database from a specific Point-in-Time Recovery (PITR) snapshot.
- **Rollback**: How to revert the Kubernetes deployment to a previous image tag via the CI/CD pipeline.
- **Failover**: How to force traffic to a secondary region or standby database instance.

### 3. Incident Runbook
Emergency procedures to follow during an active outage.
- **Detection**: Which PromQL alerts indicate this specific failure mode?
- **Escalation**: Who to contact (e.g., PagerDuty routing rules).
- **Mitigation**: Immediate steps to stop the bleeding (e.g., enabling a feature flag to disable a failing external integration).
- **Resolution**: Long-term fixes (usually requires code changes).
- **Post-Mortem**: The template for conducting a blameless post-incident review (`EA-0146`).
