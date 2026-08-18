---
id: EA-0153
title: Operational Metrics
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Operational Metrics

## Purpose
Defines the high-level quantitative indicators used by leadership and SREs to evaluate the overall health, agility, and reliability of the Campus OS platform. 

## Key Operational Metrics

These metrics must be collected conceptually by the platform (e.g., via DORA metrics dashboards or Prometheus aggregations).

### 1. Reliability Metrics
- **Service Availability (Uptime)**: The percentage of time a service is fully operational.
- **Mean Time Between Failures (MTBF)**: The average time a service runs smoothly before encountering a failure.
- **Mean Time To Recovery (MTTR)**: The average time required to restore a service after a failure occurs. This is the primary metric for evaluating Incident Response efficiency.

### 2. Delivery Metrics (DORA)
- **Deployment Frequency**: How often the team deploys code to production. High frequency indicates a mature, automated pipeline.
- **Lead Time for Changes**: The time it takes for a commit to traverse the pipeline and successfully run in production.
- **Change Failure Rate**: The percentage of deployments causing a failure in production requiring a rollback or hotfix. Low failure rates indicate strong Quality Gates.

### 3. Efficiency Metrics
- **Resource Utilization**: CPU and Memory consumption relative to requested limits. Identifies over-provisioned or under-provisioned modules.
- **Error Budget Burn Rate**: How quickly a service is consuming its allowed error tolerance (`EA-0146`).

## Reporting
These metrics are not meant for micromanagement but for systemic improvement. If Deployment Frequency is low and Lead Time is high, it indicates friction in the `EA-0139` Build System. If MTTR is high, it indicates poor Observability (`EA-0135`) or inadequate Runbooks (`EA-0149`).
