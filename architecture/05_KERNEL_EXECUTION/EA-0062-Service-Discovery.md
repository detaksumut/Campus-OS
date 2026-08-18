---
id: EA-0062
title: Service Discovery
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Service Discovery

## Purpose
Defines the abstract mechanism through which Runtime Instances and Modules locate and communicate with one another dynamically, without hardcoded IP addresses or static endpoints.

## Core Concepts
- **Service Registry**: An abstract ledger maintaining the current location (network address) and health status of all active Runtime Instances.
- **Service Provider (Producer)**: A Runtime Instance that registers its availability upon entering the `Running` state.
- **Service Consumer (Client)**: A Runtime Instance that queries the registry to resolve the address of a required service.

## Resolution Strategies
The Architecture supports two conceptual resolution patterns:

1. **Client-Side Discovery**: The Consumer queries the Service Registry directly and selects a Provider instance (often using client-side load balancing).
2. **Server-Side Discovery (Gateway/Proxy)**: The Consumer sends a request to a well-known router/proxy, which queries the Registry and forwards the request. Campus OS prefers this pattern for inter-module communication to reduce client complexity.

## Lifecycle Contract
- **Registration**: Occurs during the transition from `Starting` to `Running`.
- **Deregistration**: Occurs during the transition from `Running` to `Stopping`, or automatically if the health check (`/live`) fails.

## Kubernetes Mapping (Informative / Reference Implementation)
- **Service Registry**: `etcd` / Kubernetes API Server.
- **Server-Side Discovery**: Kubernetes `Service` (ClusterIP). DNS resolution (CoreDNS) handles mapping logical names (e.g., `identity-runtime.campus-os.svc.cluster.local`) to dynamic endpoints.
- **Registration/Deregistration**: Handled implicitly by Kubelet based on Readiness Probes.
