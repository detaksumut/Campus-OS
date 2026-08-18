# Architecture Review Checklist

This checklist is used by the Architecture Review Board (ARB) to evaluate domain readiness for Enterprise Certification (Gate E).

## 1. Golden Rules Compliance
- [ ] No infrastructure, persistence, or UI libraries are imported into the Pure Domain layer.
- [ ] Contracts (Commands, Queries, Events) were certified BEFORE implementation started.
- [ ] Events are immutable; no retroactive state changes without compensatory events.

## 2. Dependency & Contract Verification
- [ ] `DependencyVerification.json` confirms dependencies flow strictly inwards.
- [ ] Cross-domain dependencies are declared and validated against the `CrossDomainDependencyGraph.json`.
- [ ] DTOs contain no framework-specific objects.

## 3. Operational Readiness
- [ ] Logs adhere to the Structured Logging standard with correlation IDs.
- [ ] Metrics and Tracing contracts are implemented.
- [ ] The `ArchitectureScore.json` is > 95/100.

## 4. Evidence Integrity
- [ ] 100% of required `*Validation.json` artifacts are present and read `PASS`.
- [ ] All CI/CD checks have cleared successfully.
