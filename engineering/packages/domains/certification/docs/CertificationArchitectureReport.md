# Certification Architecture Report

**Domain:** Certification
**Version:** 1.0.0
**Date:** 2026-07-20
**Status:** PENDING FREEZE

## Executive Summary

The Certification Bounded Context delivers a **Competency Assessment Platform** — not merely an exam system. It is governed entirely by `CertificationScheme` (Scheme-driven Architecture), enabling any number of certification types without changes to the runtime core.

---

## Aggregate Inventory

| Aggregate | Root | Lifecycle States |
|---|---|---|
| `CertificationScheme` | `SchemeRuntime` | Draft → Active → Deprecated |
| `Applicant` | `ApplicantRuntime` | Created → Active → Inactive → Archived |
| `Application` | `ApplicationRuntime` | Draft → Submitted → Under Review → Eligible/Conditionally Eligible/Ineligible → Withdrawn |
| `Exam` | `ExamRuntime` | Scheduled → In Progress → Completed → Graded (repeatable up to maxAttempts) |
| `Interview` | `InterviewRuntime` | Scheduled → Conducted → Evaluated |
| `Assessment` | `AssessmentRuntime` | In Progress → Completed |
| `CertificationDecision` | `CertificationDecisionRuntime` | (single issuance) Certified / Failed / Deferred |
| `Certificate` | `CertificateRuntime` | Pending → Generated → Signed → Issued → Revoked (versioned chain) |
| `Renewal` | `RenewalRuntime` | Eligible → Reminder Sent → Renewal Submitted → Renewal Review → Renewed / Lapsed |
| `Badge` | `BadgeRuntime` | Issued / Revoked (domain-agnostic) |

**Total Aggregates: 10**

---

## Runtime Inventory

| Runtime | File | Responsibility |
|---|---|---|
| `SchemeRuntime` | `SchemeRuntime.ts` | Scheme lifecycle management |
| `ApplicantRuntime` | `ApplicantRuntime.ts` | Maps membershipId → applicantId |
| `ApplicationRuntime` | `ApplicationRuntime.ts` | Application state machine |
| `ExamRuntime` | `ExamRuntime.ts` | Exam scheduling, attempt management, grading |
| `InterviewRuntime` | `InterviewRuntime.ts` | Interview scheduling and evaluation |
| `AssessmentRuntime` | `AssessmentRuntime.ts` | Aggregates component results, computes weighted score |
| `CertificationDecisionRuntime` | `CertificationDecisionRuntime.ts` | Issues official decision; controls integration event emission |
| `CertificateRuntime` | `CertificateRuntime.ts` | Certificate lifecycle with immutable versioning |
| `VerificationRuntime` | `VerificationRuntime.ts` | Public certificate verification (4 methods) |
| `RenewalRuntime` | `RenewalRuntime.ts` | Renewal workflow; creates new certificate version |
| `BadgeRuntime` | `BadgeRuntime.ts` | Domain-agnostic badge issuance |

**Total Runtimes: 11**

---

## Policy Inventory

| Policy | File | Responsibility |
|---|---|---|
| `EligibilityPolicy` | `EligibilityPolicy.ts` | Orchestrates `PrerequisiteEngine`; determines eligibility outcome |
| `AssessmentPolicy` | `AssessmentRuntime.ts` | Weighted score calculation; mandatory component enforcement |

**Total Policies: 2**

---

## Domain Services

| Service | File | Responsibility |
|---|---|---|
| `PrerequisiteEngine` | `PrerequisiteEngine.ts` | Declarative rule evaluation (ALL/ANY/NOT); reused by Application and Renewal |
| `SequentialCertificateNumberGenerator` | `CertificateNumberGenerator.ts` | Issues formatted certificate numbers (`APS-CERT-2026-XXXXXX`) |

**Total Services: 2**

---

## Rule Providers

| Provider | SDK Consumed | Metrics Supported |
|---|---|---|
| `MembershipRuleProvider` | `IMembershipLookup`, `IMembershipTierLookup` | `verificationStatus`, `tier` |
| `PublicationRuleProvider` | `IPublicationLookup` | `publicationCount` |
| `ConferenceRuleProvider` | `IConferenceLookup` (planned) | `conferenceAttendance` |

---

## Write Model Boundaries

All state changes are encapsulated within their owning Runtime. No Runtime calls another Runtime's methods directly. Cross-aggregate communication flows exclusively through:
1. **EventBus**: `EventEnvelope<T>` for asynchronous domain events
2. **SDK Interfaces**: `IMembershipLookup`, `IMembershipTierLookup` (read-only, cross-domain)

---

## SDK Consumed (External)

| SDK Interface | Provider Domain | Usage Point |
|---|---|---|
| `IMembershipLookup` | Membership | `ApplicantRuntime.createApplicant()`, `MembershipRuleProvider` |
| `IMembershipTierLookup` | Membership | `MembershipRuleProvider` |
| `IPublicationLookup` | Publication | `PublicationRuleProvider` |
