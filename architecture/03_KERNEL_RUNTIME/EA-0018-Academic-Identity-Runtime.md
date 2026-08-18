---
EA-ID: EA-0018
Title: Academic Identity Runtime
Category: Operating Runtime
Layer: Architecture
Version: 2.0
Maturity: Baseline
Baseline: PRE_FREEZE
Status: Approved
Owner: Chief Enterprise Architect
Depends-On: [EA-0017]
Referenced-By: [PHASE-3-CERTIFICATION]
Last-Updated: 2026-07-20
---

# Academic Identity Runtime

## 1. Purpose
The Academic Identity Runtime acts as the root identity authority for Campus OS. It provides a unified identity contract, resolving basic authentication into rich, multi-faceted academic profiles across the entire operating system.

## 2. Responsibilities
- Centralized Identity Management (IAM).
- Resolving the 7 Core Academic Profiles.
- Identity Lifecycle Management (Onboarding, Suspension, Offboarding).
- Session and Token Issuance.

## 3. Public Contracts (API)
- `POST /runtime/identity/authenticate` - Issues secure token based on credentials.
- `GET /runtime/identity/resolve` - Resolves identity into authorized profiles.
- `GET /runtime/identity/profiles/{id}` - Retrieves specific profile contracts.

## 4. The 7 Core Profiles
The runtime expands a single Identity into multiple domain contexts:
1. **Academic Profile**: Core academic data (NIDN/NIM, homebase).
2. **Employment Profile**: HR context, payroll, rank.
3. **Research Profile**: Grants, citations, labs.
4. **Publication Profile**: Journals, books, articles.
5. **Credential Profile**: Digital badges, certifications.
6. **Teaching Profile**: Course load, student evaluations.
7. **Competency Profile**: Skill matrix, assessments.

## 5. Published Events
- `identity.created`
- `identity.suspended`
- `profile.academic.updated`
- `profile.credential.awarded`

## 6. Consumed Events
- None. (Root Authority)

## 7. Configuration
- `Identity.Token.TTL`
- `Identity.Password.Policy`
- `Identity.MFA.Required`

## 8. Security Policies
- Zero-trust default. All modules MUST pass a valid identity token to invoke other Runtimes.
- Profiles can only be mutated by authorized Runtimes (e.g., HR module through API).

## 9. Dependencies
- None. (Root Authority).

## 10. Observability
- Logs all failed authentication attempts.
- Traces profile resolution latency.

## 11. Failure Handling
- If Identity DB is unreachable, issues cached transient tokens for emergency operations.
- Circuit breaker for external SSO providers.

## 12. Version
- Contract Version: `v1`
- Engine Version: `1.0.0`

## Certification Checklist
- [x] Public Contracts defined
- [x] Events documented
- [x] No circular dependency
- [x] Independent of business logic
- [x] Security policies defined
- [x] Observability strategy defined
- [x] Failure handling defined
