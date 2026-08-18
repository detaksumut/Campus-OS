---
id: EA-0125
title: Reference Database Implementation
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Reference Database Implementation

## Purpose
Defines the normative standard for how Business Modules interact with persistence layers, ensuring data integrity, schema evolution, and strict Multi-Tenant isolation.

## Golden Reference Standards

### 1. Database per Module
Every module owns its own database (or logical schema) exclusively. No module may directly query another module's database.

### 2. Multi-Tenant Isolation (Level 3)
Campus OS defaults to a Shared Database, Separate Schema topology.
- Data for Tenant A lives in Schema `tenant_A`.
- Data for Tenant B lives in Schema `tenant_B`.
- The connection pool configuration must ensure that `SET search_path TO {tenantId}` is executed BEFORE any application query runs.

### 3. Schema Evolution (Flyway)
All database schema changes MUST be tracked in version control and executed via Flyway (or an equivalent migration engine).
- **Naming Convention**: `V{Major}.{Minor}.{Patch}__{Description}.sql`
- **Rule**: Migrations MUST be backward compatible. (e.g., Do not drop a column; instead, deprecate it, migrate data, and drop it in the next major release).

### 4. The Outbox Table
Every module's database MUST contain an `outbox_events` table. Application Services insert Domain Events into this table within the same ACID transaction as the business data change. A separate process (e.g., Debezium) relays these to the Event Bus.
