---
id: EA-0094
title: Integration Architecture
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Integration Architecture

## Purpose
Standardizes how Runtimes, Modules, and External Systems communicate with one another securely and reliably.

## Integration Principles
1. **No Backdoor Integrations**: All integration MUST flow through either the API Gateway (Synchronous) or the Event Bus (Asynchronous). Direct point-to-point database sharing or hardcoded IP access is strictly forbidden.
2. **Contract First**: Every integration point MUST be defined by an OpenAPI specification (for REST/RPC) or an AsyncAPI specification (for Events) prior to implementation.
3. **Always Authenticated**: Every integration request MUST carry a valid Identity Token (e.g., JWT) asserting the caller's identity (User or Service Identity).

## Supported Integration Patterns

### 1. Synchronous API (Runtime API)
- Used when a client requires an immediate response to proceed.
- Handled via HTTP/JSON (RESTful or RPC-style) or gRPC.
- MUST route through the API Gateway for rate limiting, auth, and observability tracing.

### 2. Asynchronous Events (Event Bus)
- Used for state changes that multiple downstream systems need to react to independently.
- Provides eventual consistency.
- Payloads MUST conform to the Event Contract and include standardized routing headers (Trace ID, Correlation ID).

## External Integration
When integrating with legacy systems (e.g., legacy ERP or Government Reporting Portals), an **Anti-Corruption Layer (ACL)** MUST be implemented. This ACL acts as a proxy module that translates legacy data formats into Campus OS Canonical Data Models, shielding the Kernel from external pollution.
