---
id: EA-0108
title: Domain Service Architecture
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Domain Service Architecture

## Purpose
Defines the strict layering inside a Business Module, ensuring that core business rules remain pure, testable, and entirely decoupled from infrastructural concerns (databases, APIs, message queues).

## The Separation of Concerns

A Campus OS Business Module MUST adhere to Domain-Driven Design (DDD) layered architecture:

### 1. Domain Layer (The Core)
- Contains Entities, Value Objects, Aggregates, and **Domain Services**.
- **Rule**: Domain Services ONLY contain business logic (e.g., calculating GPA, determining if a prerequisite is met).
- **Rule**: Domain Services MUST NOT import infrastructural libraries, perform database queries, call external APIs, or publish network events. They are pure, deterministic functions/classes.

### 2. Application Layer (The Orchestrator)
- Contains **Application Services** (Use Cases).
- **Rule**: Application Services act as conductors. They fetch data from Repositories (Infrastructure), pass it to the Domain Service for business logic execution, and then save the results back to the Repository.
- **Rule**: Application Services orchestrate the generation of Business Events and pass them to the Infrastructure layer for publication.

### 3. Infrastructure Layer (The Adapters)
- Implements the interfaces defined by the Application Layer.
- **Rule**: Contains actual SQL queries (Repositories), HTTP clients (Runtime Contracts), and Event Publishers (Event Bus bindings).

## Why this is Mandatory
By keeping Domain Services pure, business logic can be tested instantly without mocking databases or spinning up containers. It also ensures that if Campus OS swaps its underlying database or event bus technology in the future, the core business rules remain completely untouched.
