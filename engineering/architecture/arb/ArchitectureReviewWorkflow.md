# Architecture Review Workflow

The Architecture Review Board (ARB) manages the formal lifecycle of architectural governance.

## 1. Triggers for an ARB Review
A review is automatically triggered when:
- A Domain requests **Enterprise Governance Certification (Gate E)**.
- A Domain requests an **Exception** to the Golden Rules.
- A Domain proposes a breaking change (Major Version bump).
- A cross-domain capability is modified affecting multiple consumers.

## 2. Review Phases

### Phase 1: Submission
The Domain Lead submits a formal PR targeting the `EnterpriseArchitectureManifest.json` or an ADR. The CI/CD pipeline runs all validations. If automated checks fail, the review is automatically rejected.

### Phase 2: Asynchronous Review
ARB members review the PR, the `ArchitectureScore.json`, and the aggregated evidence. Members use the `ReviewChecklist.md` to ensure compliance.

### Phase 3: Board Decision
The ARB convenes to issue a formal `ReviewDecision.md`. 
- **APPROVED**: The PR is merged, and the certificate is minted.
- **CONDITIONALLY APPROVED**: The PR is merged, but Tech Debt (`TechnicalDebtRegister.md`) or an Exception (`ArchitectureExceptions.md`) is logged.
- **REJECTED**: The PR is closed. The Domain Lead must remediate the findings.

## 4. Periodic Audits
The ARB will periodically run manual audits to ensure the `TechnicalDebtRegister` is being actively burned down and no `ArchitectureExceptions` have expired.
