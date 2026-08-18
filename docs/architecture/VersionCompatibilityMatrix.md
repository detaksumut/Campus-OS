# Version Compatibility Matrix

**Version:** 1.0
**Purpose:** Tracks which versions of each Bounded Context SDK are compatible with which consumers.

This matrix must be updated whenever a bounded context releases a new version.

## Current Frozen Versions

| Domain | Current Version | Status |
|--------|----------------|--------|
| Kernel | 1.0.0 | ✅ Frozen |
| Membership | 1.0.0 | ✅ Frozen |
| Publication | 1.0.0 | ✅ Frozen |
| Certification | — | 🔄 In Development |
| Conference | — | 📋 Planned |
| Awards | — | 📋 Planned |

## SDK Compatibility Table

| Provider SDK | Version | Compatible With | Breaking Change Policy |
|---|---|---|---|
| `@campus-os/membership` | `1.0.0` | Publication `1.0.0` | Backward compat until `2.0.0` |
| `@campus-os/membership` | `1.0.0` | Certification `1.x` (TBD) | Backward compat until `2.0.0` |
| `@campus-os/publication` | `1.0.0` | Awards `1.x` (TBD) | Backward compat until `2.0.0` |

## Versioning Policy

- **Patch** (`1.0.x`): Bug fixes only. No contract changes.
- **Minor** (`1.x.0`): Additive changes (new fields, new optional SDK methods). Backward compatible.
- **Major** (`x.0.0`): Breaking changes. Requires ADR, migration guide, and consumer notification.

> All Major version bumps must go through the Architecture Review Board before implementation begins.

## Major Version Release Artifacts (Mandatory)

When any frozen domain releases a Major version bump (e.g., `Membership v2.0.0`), the following artifacts **must** be produced before the version is declared stable:

| Artifact | Purpose |
|---|---|
| `SdkCompatibilityReport-vX.md` | Documents which consumer domains are affected and which SDK methods changed |
| `MigrationGuide-vX.md` | Step-by-step guide for consumer domains to upgrade |
| `BreakingChangeCatalog-vX.md` | Complete list of removed, renamed, or semantically altered contracts |

These artifacts must be reviewed by the Architecture Board and shared with all consumer domain teams before the major release is merged to `main`.
