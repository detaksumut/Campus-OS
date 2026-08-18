---
id: EA-0135
title: Reference Observability Architecture
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Reference Observability Architecture

## Purpose
Defines the normative blueprint for monitoring, tracing, and alerting within Campus OS, ensuring that when incidents occur in a distributed, multi-module architecture, the root cause can be identified instantly.

## The Three Pillars of Observability

### 1. Logging
- **Format**: All logs MUST be structured as JSON. Plaintext console logging is forbidden in production as it breaks indexing.
- **Aggregation**: Logs are streamed from stdout/stderr by a daemon (e.g., Fluent Bit) and forwarded to a central aggregator (e.g., Elasticsearch, Loki, or Datadog).
- **Context**: Every log entry MUST include the `traceId`, `tenantId`, and `module_name`.

### 2. Metrics
- **Format**: All modules MUST expose a `/metrics` endpoint serving Prometheus-formatted metrics.
- **Golden Signals**: Modules MUST track the Four Golden Signals:
  1. **Latency**: The time it takes to service a request (e.g., HTTP request duration).
  2. **Traffic**: A measure of demand (e.g., HTTP requests per second).
  3. **Errors**: The rate of requests that fail (e.g., HTTP 5xx responses).
  4. **Saturation**: How "full" the service is (e.g., CPU, Memory, DB connection pool limits).

### 3. Distributed Tracing
- **Format**: OpenTelemetry (OTel) is the mandated standard for distributed tracing.
- **Propagation**: Every incoming request at the API Gateway generates a unique `traceId` (e.g., W3C Trace Context). This ID MUST be passed downstream in HTTP headers to every subsequent Module and Runtime.
- **Events**: Trace IDs MUST be included in the CloudEvents payload published to the Event Bus, allowing traces to bridge asynchronous boundaries.

## Health Probes
- Every module exposes `/health/liveness` (returns 200 OK if the binary is running) and `/health/readiness` (returns 200 OK only if the database and cache connections are active).

## Alerting
- Alerts are configured in Prometheus Alertmanager.
- **Actionable Alerts Only**: Alerts are only fired for conditions affecting the user experience (e.g., "Admission API Error Rate > 5% for 5 minutes"). CPU spikes that do not impact latency or error rates should not wake up on-call engineers.
