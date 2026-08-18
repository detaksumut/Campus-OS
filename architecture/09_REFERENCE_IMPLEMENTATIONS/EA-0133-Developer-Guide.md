---
id: EA-0133
title: Developer Guide
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Developer Guide

## Purpose
The definitive curriculum for onboarding a new engineer to the Campus OS project. It enforces a strict sequence of understanding to ensure that developers do not write code without grasping the overarching architectural vision.

## The Onboarding Sequence

### 1. Memahami Enterprise Architecture
Before touching an IDE, the developer MUST understand what Campus OS is.
- Read `EA-0001` to `EA-0009` (Manifesto, Constitution, Capability Map).
- Understand that every line of code traces back to a Business Capability.

### 2. Memahami Runtime
Understand that the OS handles heavy lifting.
- Read `EA-0060` (Kernel Execution Architecture).
- You do not write authentication logic; you use the Identity Runtime. You do not write metric exporters from scratch; you use the Observability standard.

### 3. Memahami Contracts
Understand the boundaries.
- Read `EA-0050` (Runtime Contracts) and `EA-0123` (API Implementation).
- A module is defined entirely by the APIs it exposes and the Events it publishes.

### 4. Memahami Platform
Understand how modules interact.
- Read `EA-0091` (Plugin Architecture) and `EA-0106` (Cross-Module Orchestration).
- Modules never call each other directly. Everything flows through the Gateway or Event Bus.

### 5. Memahami Module Template
- Study `EA-0112` (Reference Module Template) and `EA-0121` (Identity Module). This is the exact folder structure and layer separation you must use.

### 6. Mengembangkan Modul Baru
- Clone the repository layout (`EA-0120`).
- Write Domain logic first. TDD is highly encouraged. Keep Domain Services pure (`EA-0108`).
- Implement the Infrastructure adapters.

### 7. Menjalankan Quality Gates
- Run local linters, unit tests, and integration tests (Testcontainers) as defined in `EA-0080`.
- Verify your OpenAPI specs.

### 8. Mengajukan Architecture Review
- Submit a Pull Request.
- The PMO evaluates your PR against the 4 Conformance levels (`EA-0132`).
- Ensure the `EA-0130` Traceability Matrix is updated.

### 9. Mempersiapkan Release
- Ensure Semantic Versioning is correct (`EA-0077`).
- Ensure Database Migrations (`EA-0125`) are backward compatible.
- Wait for the pipeline to deploy to Staging.
