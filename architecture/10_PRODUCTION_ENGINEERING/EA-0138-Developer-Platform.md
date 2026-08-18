---
id: EA-0138
title: Developer Platform
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Developer Platform

## Purpose
Defines the Internal Developer Platform (IDP) concepts. The IDP abstracts operational complexities so developers can focus purely on writing Business Modules that fulfill the Enterprise Architecture.

## Core Capabilities

### 1. Scaffolding & Templating
- Developers MUST be able to scaffold a new Module from the **Golden Reference Module** (`EA-0121`) via an automated template generator (e.g., Backstage templates, Cookiecutter).
- Scaffolding MUST automatically configure the correct directory structure (`EA-0120`) and wire up the basic CI/CD pipeline definitions.

### 2. Local Environment Parity
- Developers MUST be able to run a localized, miniaturized version of the Campus OS Platform Foundation on their workstations (e.g., via Docker Compose or Minikube).
- This local environment MUST include the essential Kernel Runtimes (Identity, Workflow, Event Bus) and standard stateful services (Database, Cache).

### 3. Developer Portal (Service Catalog)
- An internal portal (e.g., Backstage) MUST exist to provide a single pane of glass.
- It MUST aggregate information from the Module Manifests (`EA-0089`), providing a live view of the Business Service Catalog (`EA-0114`), API documentation (Swagger/Redoc), and ownership metadata.

### 4. Sandbox Ephemeral Environments
- Developers MUST be able to spin up short-lived "Sandbox" environments in the cloud to test complex cross-module integrations that are too heavy for a local workstation.
