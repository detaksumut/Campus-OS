---
id: EA-0098
title: Extension Framework
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Extension Framework

## Purpose
Defines the specific hook points (Extension Points) where Business Modules can inject logic into the Platform Kernel or other modules, enabling deep customization without modifying source code.

## Core Extension Points

The Campus OS Platform Foundation MUST natively support the following Extension Points:

1. **UI Extension**: Allows modules to inject frontend components (e.g., Micro-Frontends) into the global navigation shell or specific dashboards.
2. **API Extension**: Allows modules to extend the data models returned by Kernel APIs (e.g., adding custom fields to a `User` profile).
3. **Workflow Extension**: Allows modules to inject custom tasks or approval steps into standard Kernel workflows (e.g., injecting an "Academic Status Check" step into an admission workflow).
4. **Event Extension**: Allows modules to enrich outgoing Domain Events with additional contextual metadata before they are published.
5. **AI Extension**: Allows modules to register custom prompts, RAG data sources, or specific ML models into the AI Runtime for domain-specific inference.
6. **Report Extension**: Allows modules to provide domain-specific data sources to the central reporting and BI capability.
7. **Authentication Extension**: Allows modules to register custom multi-factor authentication (MFA) providers or identity hooks.
8. **Notification Extension**: Allows modules to register custom notification delivery channels (e.g., a localized SMS provider) into the Notification Runtime.
