# Certification API Freeze

**Date:** 2026-07-20
**Version:** 1.0.0
**Status:** FROZEN

The Certification Bounded Context internal API is frozen at v1.0.0. Any modification to any Runtime, Policy, Contract, or SDK interface MUST:

1. Maintain backward-compatible event payloads (`schemaVersion` bump only for minor changes).
2. Never remove or rename fields from frozen SDK contracts.
3. Be documented in a new Architecture Decision Record (ADR).
4. Increment `version` in `certification.manifest.json`.

---

## Frozen Runtime Interfaces

| Interface | File | Status |
|---|---|---|
| `ISchemeRuntime` | `contracts/index.ts` | ✅ Frozen |
| `IApplicantRuntime` | `contracts/index.ts` | ✅ Frozen |
| `IApplicationRuntime` | `contracts/index.ts` | ✅ Frozen |
| `IExamRuntime` | `contracts/index.ts` | ✅ Frozen |
| `IInterviewRuntime` | `contracts/index.ts` | ✅ Frozen |
| `IAssessmentRuntime` | `contracts/index.ts` | ✅ Frozen |
| `ICertificationDecisionRuntime` | `contracts/index.ts` | ✅ Frozen |
| `ICertificateRuntime` | `runtime/CertificateRuntime.ts` | ✅ Frozen |
| `IVerificationRuntime` | `runtime/VerificationRuntime.ts` | ✅ Frozen |
| `IRenewalRuntime` | `runtime/RenewalRuntime.ts` | ✅ Frozen |
| `IBadgeRuntime` | `runtime/BadgeRuntime.ts` | ✅ Frozen |
| `ICertificateNumberGenerator` | `services/CertificateNumberGenerator.ts` | ✅ Frozen |

## Frozen DTO Types

`CertificationScheme`, `ApplicantDto`, `ApplicationDto`, `ExamDto`, `InterviewDto`, `AssessmentDto`, `CertificationDecisionDto`, `CertificateRecord`, `CertificateVerificationReport`, `RenewalRecord`, `BadgeDefinition`, `IssuedBadge`, `AssessmentResult`, `ComponentScore`, `RuleEvidence`, `RuleEvaluationResult`, `ConditionalRequirement`, `CertificateProjectionDto`

> **Once frozen, no DTO field may be removed or renamed without a Major version bump and Architecture Board approval.**
