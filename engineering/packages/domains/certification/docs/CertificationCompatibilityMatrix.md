# Certification Compatibility Matrix

**Version:** 1.0.0 | **Date:** 2026-07-20

## SDK Compatibility

| Certification SDK | Compatible With | Notes |
|---|---|---|
| `@campus-os/certification` v1.0.0 | Membership v1.0.0 | Consumes Membership SDK — backward compat until v2.0 |
| `@campus-os/certification` v1.0.0 | Publication v1.0.0 | Consumes Publication SDK — backward compat until v2.0 |

## Consumer Readiness

| Consumer Domain | Status | Integration Events Consumed |
|---|---|---|
| Membership | ✅ Ready | `certification.certificate.issued`, `certification.certificate.revoked` |
| Awards | ✅ Ready | `certification.certificate.issued`, `certification.certificate.renewed` |
| Conference | 📋 Planned | — |
| Portal | ✅ Ready | `CertificateProjection`, `VerificationRuntime` (public API) |
| Directory | ✅ Ready | `certification.certificate.issued`, `certification.certificate.revoked` |
| Notification | ✅ Ready | All Integration Events |

## Versioning Policy

- **Patch** (`1.0.x`): Bug fixes only. No contract or event changes.
- **Minor** (`1.x.0`): Additive changes. New optional fields, new SDK methods (no removal).
- **Major** (`x.0.0`): Breaking changes. Requires `SdkCompatibilityReport`, `MigrationGuide`, `BreakingChangeCatalog`, Architecture Board review.
