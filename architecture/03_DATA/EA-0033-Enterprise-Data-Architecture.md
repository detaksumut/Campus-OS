---
EA-ID: EA-0033
Title: Enterprise Data Architecture
Category: Data Architecture
Layer: Architecture
Version: 1.0
Maturity: Baseline
Baseline: PRE_FREEZE
Status: Approved
Owner: Chief Enterprise Architect
Depends-On: [EA-0012, EA-0013]
Referenced-By: [EA-0034]
Last-Updated: 2026-07-20
Review-Date: 2026-07-20
Approval: Approved
---

# Enterprise Data Architecture

The Enterprise Data Architecture (EDA) defines how data is structured, stored, and integrated across Campus OS. It guarantees that the database is an Enterprise Architecture Asset, not a byproduct of application code.

## Core Principles
1. **No Dummy Data:** The foundational databases (`init`, `reference`, `master`) are seeded exclusively with absolute truths (e.g., actual countries, actual faculties). Application development MUST build upon real Master Data, avoiding "test" schemas that corrupt integrity.
2. **Database Engine:** PostgreSQL is the official RDBMS of Campus OS, chosen for its ACID compliance, JSONB capabilities, and extensibility.
3. **Data Independence:** The data model is canonical. It does not map 1:1 to ORM objects (like Prisma or TypeORM) unless those ORMs adhere strictly to the Canonical Data Model. The Architecture dictates the schema.
4. **Logical Separation:** While physical databases may be consolidated (for cost/performance), data must be logically separated (schemas or prefixed tables) according to the Bounded Contexts.
