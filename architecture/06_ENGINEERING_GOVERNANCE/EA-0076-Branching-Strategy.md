---
id: EA-0076
title: Branching Strategy
type: Governance Document
status: APPROVED
version: 1.0.0
---

# Branching Strategy

## Purpose
Defines the strict branching model to ensure stable releases, isolated development, and clear separation between Architecture definitions and Implementation code.

## Core Branches

1. **`main`**
   - The production-ready state of the software.
   - **Merge Rules**: ONLY accepts merges from `release/*` or `hotfix/*` branches. Every merge to `main` MUST be tagged with a semantic version number. Direct commits are strictly forbidden.

2. **`develop`**
   - The integration branch for ongoing development.
   - **Merge Rules**: Accepts merges from `feature/*` and `hotfix/*`.

3. **`architecture`**
   - The authoritative branch for Enterprise Architecture Repository (EAR) assets (Campus OS root).
   - **Merge Rules**: Only used by PMO and Architecture teams. Code implementations are NOT allowed in this branch.

## Ephemeral Branches

1. **`feature/*`** (e.g., `feature/identity-login`)
   - Branched from `develop`.
   - Used for developing new features or non-critical bug fixes.
   - Must be merged back into `develop` via a Pull Request passing all Quality Gates.

2. **`release/*`** (e.g., `release/v1.2.0`)
   - Branched from `develop` when preparing for a production release.
   - Used only for stabilization (bug fixes, documentation, version bumping). No new features.
   - Must be merged into `main` (and tagged) AND merged back into `develop`.

3. **`hotfix/*`** (e.g., `hotfix/v1.2.1-db-lock`)
   - Branched directly from `main`.
   - Used strictly for critical production bug fixes.
   - Must be merged into `main` (and tagged) AND merged back into `develop`.

## Pull Request Requirements
All merges into `main`, `develop`, or `architecture` require a Pull Request. Force-pushing to these branches is disabled at the repository level.
