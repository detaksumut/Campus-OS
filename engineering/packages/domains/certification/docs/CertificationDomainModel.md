# Certification Domain Model

**Version:** 1.0.0 | **Date:** 2026-07-20 | **Status:** FROZEN

## Lifecycle Overview

```
CertificationScheme (Configuration Center)
          │
          │ (read by all Runtimes)
          ▼
    Application ──────────────────────────────────────────┐
          │                                               │
          │ EligibilityPolicy + PrerequisiteEngine        │
          ▼                                               │
   Eligible / Conditionally Eligible / Ineligible         │
          │                                               │
          ▼                                               │
     ┌────┴────┐                                          │
     │         │                                          │
    Exam   Interview   (↑ IAssessmentComponent)           │
     │         │                                          │
     └────┬────┘                                          │
          │                                               │
          ▼                                               │
      Assessment (Aggregator — facts only)                │
          │                                               │
          ▼                                               │
  CertificationDecision (Official Verdict)                │
          │                                               │
          ├── Failed / Deferred ──────────────────────────┘
          │
          ▼ (Certified only)
      Certificate (Pending → Generated → Signed → Issued)
       │       │
       │       └── Revoked (terminal)
       │
       └── Renewal ──────────────────────────────────────
                │  (PrerequisiteEngine reused)
                ▼
           Certificate v2 (new, preserves history)
```

---

## Aggregate Definitions

### CertificationScheme
The configuration center. Carries: `applicationPrerequisites` (rule tree), `assessmentComponents` (with weight, threshold, maxAttempts, gradingMethod), `renewalPolicy`. No other aggregate owns business rules.

### Application
Manages the applicant's journey through eligibility. Three-outcome eligibility: `Eligible`, `Conditionally Eligible`, `Ineligible`. Conditional requirements have `Pending → Fulfilled → Verified` lifecycle.

### Exam / Interview
Implements `IAssessmentComponent`. Exam supports multiple attempts (up to `maxAttempts` from Scheme). Interview carries structured evaluation with `Strengths`, `Weaknesses`, `Scores`, `Recommendation`.

### Assessment
Pure aggregator. Collects `AssessmentResult[]` from all components. Applies `AssessmentPolicy` weighted scoring. **Does not decide.**

### CertificationDecision
The sole decision authority. Produces `Certified | Failed | Deferred`. Only `Certified` decisions trigger `certification.certificate.issued` Integration Event.

### Certificate
Versioned immutable records. `previousCertificateId` forms a linked version chain. Format: `APS-CERT-{YEAR}-{SEQ}`.

### Renewal
Reuses `PrerequisiteEngine` for eligibility check. Creates a new Certificate version — never mutates the previous one.

### Badge
Domain-agnostic. Any domain (`Certification`, `Awards`, `Conference`) can issue badges via `BadgeRuntime`.

---

## Key Value Objects

| Value Object | Belongs To | Description |
|---|---|---|
| `PrerequisiteRule` | Scheme | Declarative rule tree (ALL/ANY/NOT) |
| `RuleEvidence` | EligibilityPolicy | Auditable result (status, evidence, source, sourceVersion, timestamp) |
| `ComponentScore` | Exam/Interview | `{raw, max, percentage, passed}` |
| `AssessmentResult` | Assessment | Typed component result per `IAssessmentComponent` |
| `ConditionalRequirement` | Application | Pending → Fulfilled → Verified requirement |
| `CertificateVerificationReport` | VerificationRuntime | Public verification response |
