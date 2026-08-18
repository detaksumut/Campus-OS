# Certification Dependency Report

**Version:** 1.0.0 | **Date:** 2026-07-20

## Dependency Direction

```
Kernel
  └── Certification  ←  depends on ──►  Membership SDK (IMembershipLookup, IMembershipTierLookup)
                                        Publication SDK (IPublicationLookup)

Membership  ──►  DOES NOT KNOW about Certification
Publication  ──►  DOES NOT KNOW about Certification
```

**No reverse dependency exists.** This is validated by `DomainDependencyRules.md` rules `DEP-01`, `DEP-03`.

---

## External SDK Dependencies

| SDK Interface | Provider | Usage | Tier |
|---|---|---|---|
| `IMembershipLookup` | Membership | `ApplicantRuntime.createApplicant()`, `MembershipRuleProvider` | Mandatory |
| `IMembershipTierLookup` | Membership | `MembershipRuleProvider.evaluate()` | Mandatory |
| `IPublicationLookup` | Publication | `PublicationRuleProvider.evaluate()` | Optional (scheme-dependent) |

---

## Internal Module Dependencies

```
contracts/index.ts
    │
    ├── policies/PrerequisiteEngine.ts
    │       └── policies/RuleProviders.ts (MembershipRuleProvider, PublicationRuleProvider)
    │
    ├── policies/EligibilityPolicy.ts
    │       └── policies/PrerequisiteEngine.ts
    │
    ├── runtime/SchemeRuntime.ts (no internal deps)
    ├── runtime/ApplicantRuntime.ts → IMembershipLookup
    ├── runtime/ApplicationRuntime.ts → EligibilityPolicy
    ├── runtime/ExamRuntime.ts → SchemeRuntime
    ├── runtime/InterviewRuntime.ts → SchemeRuntime
    ├── runtime/AssessmentRuntime.ts → SchemeRuntime, AssessmentPolicy
    ├── runtime/CertificationDecisionRuntime.ts → AssessmentRuntime, ApplicationRuntime
    ├── runtime/CertificateRuntime.ts → ICertificateNumberGenerator
    ├── runtime/VerificationRuntime.ts → ICertificateRuntime
    ├── runtime/RenewalRuntime.ts → ICertificateRuntime, ISchemeRuntime, PrerequisiteEngine
    ├── runtime/BadgeRuntime.ts (no external deps — domain-agnostic)
    │
    ├── services/CertificateNumberGenerator.ts (no deps)
    └── projections/CertificateProjection.ts → CertificateRuntime, VerificationRuntime, SchemeRuntime, BadgeRuntime
```

---

## Forbidden Dependency Compliance

| Rule | Check | Status |
|---|---|---|
| DEP-01: Membership ↛ Certification | Membership has no `certification` imports | ✅ PASS |
| DEP-02: Publication ↛ Certification | Publication has no `certification` imports | ✅ PASS |
| DEP-04: No domain → another domain's Runtime | Certification uses Membership SDK only, not Runtime | ✅ PASS |
| DEP-06: Kernel ↛ Business Domain | Kernel has no business domain imports | ✅ PASS |
