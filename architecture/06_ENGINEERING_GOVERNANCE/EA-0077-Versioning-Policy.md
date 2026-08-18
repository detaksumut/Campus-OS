---
id: EA-0077
title: Versioning Policy
type: Governance Document
status: APPROVED
version: 1.0.0
---

# Versioning Policy

## Purpose
Defines the strict versioning semantics for all Campus OS artifacts, including APIs, Events, Source Code releases, and Architecture Documents.

## Semantic Versioning Standard
All version numbers MUST adhere to the official [Semantic Versioning (SemVer) 2.0.0](https://semver.org/) specification: `MAJOR.MINOR.PATCH`.

1. **MAJOR version**: Incompatible API/Contract changes (Breaking Changes).
2. **MINOR version**: Functionality added in a backward-compatible manner.
3. **PATCH version**: Backward-compatible bug fixes.

*Example*: `1.0.0`, `1.1.0`, `1.1.1`, `2.0.0`

## Pre-Release standard
Pre-release versions MUST use standard SemVer hyphenated suffixes. Custom or internal formats are forbidden.

Valid formats:
- `1.0.0-alpha.1` (Internal testing)
- `1.0.0-beta.1`  (External/broader testing)
- `1.0.0-rc.1`    (Release Candidate)

## API and Contract Versioning
- **URL Versioning**: Major versions MUST be included in the API route (e.g., `/api/v1/identity`). Minor/Patch versions are not included in the URL.
- **Event Versioning**: Event names MUST include the major version (e.g., `IdentityCreated.v1`).

## Architecture Artifact Versioning
Documents in the Enterprise Architecture Repository (EAR) also follow SemVer.
- **MAJOR**: Fundamental architecture shift (Requires ADR).
- **MINOR**: Addition of new domains or capabilities.
- **PATCH**: Typo fixes or clarifying documentation.
