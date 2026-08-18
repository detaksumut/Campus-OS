---
id: EA-0128
title: Developer Onboarding
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Developer Onboarding

## Purpose
A rapid-start guide for newly hired engineers joining the Campus OS project. It bridges the gap between high-level architecture documents and the daily reality of writing code.

## The Onboarding Path

To become productive without violating the Enterprise Architecture, developers must absorb information in this specific sequence:

### Step 1: Understand the Enterprise Architecture
- Read `EA-0001` (Campus OS Manifesto) to understand the *Why*.
- Read `EA-0009` (Business Capability Map) to understand the scope of the University.
- Read `EA-0091` (Plugin Architecture) to understand how the platform scales.

### Step 2: Understand the Engineering Governance
- Read `EA-0074` (Code Architecture Standards) to understand the Hexagonal boundary rules.
- Read `EA-0080` (Quality Gates) to understand what will block your Pull Request.

### Step 3: Understand the Golden Reference
- Study the **Identity Module** source code (`EA-0121`). This is exactly how your code should look. Do not reinvent the directory structure or layering.

### Step 4: Local Setup
1. Clone the `campus-os-dev-env` repository.
2. Run `make up`. This uses Docker Compose to spin up local versions of:
   - PostgreSQL (Database)
   - Redis (Cache)
   - Kafka/RabbitMQ (Event Bus)
   - API Gateway (Traefik)
   - The compiled Identity Runtime (for Auth).
3. You now have a mini Campus OS cluster running locally.

### Step 5: Your First Task
- Your first task will always be to write a failing Unit Test in the `domain/` layer for a new business rule, then make it pass, adhering strictly to TDD (Test-Driven Development).
