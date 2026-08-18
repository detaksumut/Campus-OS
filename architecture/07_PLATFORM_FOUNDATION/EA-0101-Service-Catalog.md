---
id: EA-0101
title: Service Catalog
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Service Catalog

## Purpose
Establishes the centralized definition of all available services (Runtimes and Modules) running within Campus OS. It provides an operational view of the platform components, distinguishing between Kernel services and Business extensions.

## Core Catalog Structure

The Service Catalog must maintain an active inventory of every service deployed, capturing:

- **Service Name**: The formal name of the service (e.g., `identity-runtime`, `academic-module`).
- **Service Type**: Classification (e.g., `Kernel Runtime`, `Platform Runtime`, `Business Module`, `Infrastructure Node`).
- **Owner**: The specific engineering team responsible for maintaining the service.
- **Repository**: The URL to the source code repository.
- **Deployment Topology**: Where this service runs (e.g., Global, Campus-specific).
- **SLA Tier**: The expected uptime and performance Service Level Agreement (e.g., Tier 1 - Mission Critical, Tier 2 - Business Critical, Tier 3 - Internal Utility).
- **Runbook Link**: A direct link to the operational runbook detailing how to troubleshoot the service.

## Relationship to Capability Registry
While the `Capability Registry` (`EA-0092`) lists *what* the system can do (e.g., "Authenticate User"), the `Service Catalog` lists *which applications* are running to provide those capabilities (e.g., "Identity Service v1.2 running on 3 pods").
