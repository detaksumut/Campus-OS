---
id: EA-0099
title: Module Packaging
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Module Packaging

## Purpose
Defines the standard format for packaging and distributing a Business Module so that it can be easily installed into a Campus OS deployment by a system administrator or via an automated pipeline.

## Packaging Format
A Module is distributed as a bundled artifact containing everything necessary to run and configure the module.

1. **Manifest File**: The `manifest.yaml` (`EA-0089`) at the root of the package.
2. **Container Image**: The compiled application logic packaged as an OCI-compliant container image (e.g., Docker image) pushed to a trusted registry.
3. **Database Migrations**: The directory containing all Flyway SQL migrations required to initialize or upgrade the module's database schemas.
4. **Configuration Templates**: Default configuration files or environment variable templates required by the module.
5. **Contract Definitions**: The OpenAPI (`.yaml`) and AsyncAPI files representing the module's interfaces.

## Distribution
Modules should ideally be distributed via a private artifact repository (e.g., Helm Chart repository, OCI registry) where the Campus OS installation tooling can fetch, validate signatures, and deploy the package dynamically.
