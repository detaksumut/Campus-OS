---
id: EA-0067
title: Health Management
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Health Management Execution Architecture

## Purpose
Defines the standardized mechanisms through which a Runtime Instance communicates its operational status to the Execution Host (e.g., container orchestrator, load balancer). This prevents traffic from being routed to dead or unready instances.

## Standard Health Endpoints
Every Runtime Instance MUST expose the following HTTP endpoints unconditionally, bypassing standard authorization rules (internal network only):

- `/health` or `/live`: The **Liveness Probe**. Indicates if the process is running. If this fails, the Execution Host should kill and restart the instance.
- `/ready`: The **Readiness Probe**. Indicates if the instance is ready to accept traffic (e.g., DB connections are established, caches are warm). If this fails, the instance is temporarily removed from load balancer rotation but is NOT killed.
- `/startup`: The **Startup Probe**. Used for legacy or slow-starting runtimes. It gives the application time to initialize before liveness probes begin polling.
- `/version`: Returns the current deployed version, git commit hash, and build timestamp.
- `/metrics`: The endpoint scraped by telemetry systems (e.g., Prometheus) to gather performance data.

## Standard Status States
The `/health` and `/ready` endpoints MUST return a JSON payload with a standardized status string:

- `Healthy`: All subsystems and external dependencies are operating normally (HTTP 200).
- `Degraded`: The system is running but experiencing non-fatal issues (e.g., a secondary cache is down) (HTTP 200).
- `Unhealthy`: A critical dependency is unreachable or internal state is corrupted (HTTP 503).
- `Maintenance`: The instance is intentionally ignoring traffic for administrative reasons (HTTP 503).

## Kubernetes Mapping (Informative / Reference Implementation)
- `/live` maps directly to `livenessProbe`.
- `/ready` maps directly to `readinessProbe`.
- `/startup` maps directly to `startupProbe`.
