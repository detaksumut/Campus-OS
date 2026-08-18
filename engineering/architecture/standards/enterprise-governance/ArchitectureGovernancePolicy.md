# Campus OS Architecture Governance Policy

The absolute constitution for all bounded contexts within Campus OS.

## 1. Golden Rules
1. **Zero Domain Contamination**: The Pure Domain layer must never import infrastructure, persistence, or presentation libraries.
2. **Contract First**: No implementation begins before the Contract (API/Events) is certified by the Architecture Board.
3. **Event Immutability**: Domain Events are facts of the past. Once published, they cannot be modified.
4. **No Kernel Implementation Dependency**: Domain packages MUST NOT import or reference any implementation detail from `@campus-os/kernel`. All interactions with platform services MUST occur exclusively through the public API exposed by `@campus-os/sdk`.

## 2. Layer Rules
- `Domain` depends on nothing.
- `Application` depends on `Domain` and `Contracts`.
- `Infrastructure/Repository` depends on `Application Contracts`.
- `Presentation` depends on `Application API` and `View Models`.

## 3. Dependency Rules
Dependencies must only flow inwards towards the Domain. Cross-domain dependencies must route strictly through the `CapabilityRegistry`.

## 4. Naming Rules
- Aggregates are Singular Nouns (`Faculty`, not `Faculties`).
- Events are past tense verbs (`FacultyCreatedEvent`).
- Commands are imperative verbs (`CreateFacultyCommand`).

## 5. Contract Rules
All contracts (DTOs) must be primitive-only or composed of other contracts. No framework-specific objects (`Request`, `Response`).

## 6. Event Rules
Changes to an event payload must trigger a new version (`V2`) and dual-publishing.

## 7. Repository Rules
No ORM references in the Application Layer. Repositories must return Domain Aggregates, not database models.

## 8. Runtime Rules
Bounded Contexts must not spin up their own Express servers. They must register capabilities to the Campus OS Kernel Router.

## 9. Security Rules
Roles and Permissions must be abstracted. No hardcoded JWT validations inside the Domain.

## 10. Version Rules
All domains follow Semantic Versioning (SemVer 2.0).

## 11. Deprecation Rules
Deprecated APIs must remain available for exactly one major release cycle.

## 12. Compatibility Rules
Domains must pass the `CrossDomainCompatibility.json` check against consumers before release.

## 13. Certification Rules
No Domain can enter `Release Ready` without 100% of its required Evidence present in the `CertificationManifest.json`.

## 14. Release Rules
Releases must be orchestrated by the `EnterpriseReadinessDashboard.json` signals.

## 15. Exception Process
Any deviation from these rules requires an Architecture Decision Record (ADR) and explicit EAB Approval.
