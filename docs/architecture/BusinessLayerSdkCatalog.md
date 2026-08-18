# Business Layer SDK Catalog

**Version:** 1.0.0 | **Date:** 2026-07-20

## Registered SDK Interfaces

| Interface | Package | Version | Status | Consumers |
|---|---|---|---|---|
| `IMembershipLookup` | `@campus-os/membership` | 1.0.0 | ✅ Frozen | Publication, Certification |
| `IMembershipVerification` | `@campus-os/membership` | 1.0.0 | ✅ Frozen | Publication |
| `IMembershipTierLookup` | `@campus-os/membership` | 1.0.0 | ✅ Frozen | Certification |
| `IDirectoryQuery` | `@campus-os/membership` | 1.0.0 | ✅ Frozen | Publication (Reviewer search) |
| `IPublicationLookup` | `@campus-os/publication` | 1.0.0 | ✅ Frozen | Certification, Awards |
| `IPublicationSearch` | `@campus-os/publication` | 1.0.0 | ✅ Frozen | Awards, Research |
| `ICertificateRuntime` | `@campus-os/certification` | 1.0.0 | ✅ Frozen | Portal, Awards |
| `IVerificationRuntime` | `@campus-os/certification` | 1.0.0 | ✅ Frozen | Portal (Public API) |

## SDK Governance Rules

- SDK interfaces may only be consumed as listed in `BusinessLayerSdkMatrix.md`.
- No internal Runtime may be called cross-domain (only SDK interfaces).
- New SDK interfaces require Architecture Review before registration.
