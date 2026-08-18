# Certification Projection Catalog

**Version:** 1.0.0 | **Date:** 2026-07-20 | **Status:** FROZEN

Only projections listed here may be consumed by other bounded contexts.

---

## Registered Projections

### 1. `CertificateProjection`

| Field | Value |
|---|---|
| **Owner** | Certification |
| **Interface** | `CertificateProjection.project(certificateId)` |
| **Version** | 1.0 |
| **Status** | ✅ Stable |
| **Available To** | Awards, Membership, Portal, Directory |
| **Refresh** | EventBus (async, on `certification.certificate.issued` / `revoked`) |

**DTO shape:** `CertificateProjectionDto`
```typescript
{
  certificateId, certificateNumber, version,
  holder: { holderId, membershipId },
  scheme: { schemeId, schemeName },
  status,           // Valid | Expired | Revoked | Unknown
  issuedAt, expiresAt,
  verificationUrl,
  qrCodeData,
  verificationCode,
  badges: IssuedBadge[],
  metadata: { projectionVersion, generatedAt }
}
```

---

### 2. `ApplicationProjection` *(Internal — not cross-domain)*

| Field | Value |
|---|---|
| **Owner** | Certification |
| **Status** | 🔒 Internal Only |
| **Available To** | Internal Application Layer (Portal API) |

---

### 3. `VerificationProjection` *(Public API model)*

| Field | Value |
|---|---|
| **Owner** | Certification |
| **Interface** | `VerificationRuntime.verifyCertificate()` |
| **Version** | 1.0 |
| **Status** | ✅ Stable |
| **Available To** | Public (unauthenticated) |

---

## Projection Metadata Standard

All projections include:
```typescript
interface ProjectionMetadata {
  projectionVersion: string;
  generatedAt: number;
}
```

## Governance Rules
- A projection may only be added to this catalog via Architecture Review.
- All projections are **read-only**; consumers must never write to projection stores.
- Cross-domain projection consumption requires explicit listing in `SharedProjectionRegistry.md`.
