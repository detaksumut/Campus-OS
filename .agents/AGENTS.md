# Campus OS - Enterprise PMO & Architecture Protocol

This file serves as the strict operating system for the Antigravity Engineering Execution Agent. All actions taken by the Agent MUST adhere to these laws.

## 1. The Golden Rule
> **"No artifact may be created unless its architectural dependency chain is complete and approved."**
> - No table without an Entity Catalog.
> - No Entity Catalog without a Business Domain.
> - No API without a Domain Contract.
> - No UI without a Workflow.
> - No implementation without a foundational architecture artifact.
> 
> **Golden Rule #16 (SDK Isolation)**: Domain packages MUST NOT import or reference any implementation detail from `@campus-os/kernel`. All interactions with platform services MUST occur exclusively through the public API exposed by `@campus-os/sdk`.

## 2. Kernel Runtime Rule
> **"A Runtime is an Operating System Contract, not a business service."**
> - The Runtime does not know business logic.
> - The Runtime only provides execution contracts.
> - Modules depend on the Runtime.
> - The Runtime NEVER depends on modules.


## 2. PMO Execution Protocol
For every task, the Agent MUST execute this loop in sequence:
1. **Read** `repository.yaml` (Check system baseline).
2. **Check Progress** (Assess current phase health).
3. **View** `task.md` (Align with active sprint).
4. **View Architecture Baseline** (Trace upstream EA dependencies).
5. **Determine next work** (Plan the exact output).
6. **Generate artifact** (Write code/markdown).
7. **Update** `task.md`.
8. **Update** `repository.yaml`.
9. **Git Commit** (Via Architecture Validation).

## 3. Architecture Traceability
Every artifact generated MUST trace its lineage clearly:
`Entity` ➔ `Business Domain` ➔ `Bounded Context` ➔ `Capability` ➔ `Vision` ➔ `EA-ID`

## 4. Engineering & Architecture Rules
- **Database Rules:** Never create a database table directly. It must spawn from an approved Entity Catalog markdown file.
- **Migration Rules:** All SQL migrations must use Flyway convention (`V1.0.0__name.sql`). Schema, Reference, MasterData, Seed, and Patch MUST be isolated files.
- **Coding Rules:** Never bypass the Campus Kernel Runtime. All cross-module communication is Event/API driven.
- **Review Rules:** No pull request is merged without 100% test coverage and EA compliance.

## 5. Git Branching Strategy
- `main` (Production Code)
- `develop` (Integration Branch)
- `architecture` (Master branch for all EAR assets. All Agent architectural work happens here).
- `kernel` (Campus Kernel Development)
- `feature/*` (Module Development)

*Commit Message Standard:*
- `EA: [Message]`
- `Kernel: [Message]`
- `Feature: [Message]`

## 6. Architecture Validation (Before Commit)
The Agent MUST validate:
- [ ] Entity Validation (Does it match the Catalog?)
- [ ] Migration Validation (Is it Flyway compliant?)
- [ ] Repository Validation (Is `repository.yaml` updated?)
If any validation fails, COMMIT IS BLOCKED.

## 7. Runtime Contract Rule
> **"The Runtime Contract is the single source of truth between architecture and implementation."**
> - All backend implementations must adhere to the Runtime Contract.
> - All frontends must consume the API according to the frozen OpenAPI specification.
> - All events must follow the Event Contract.
> - All contract changes must go through Architecture Review and produce an ADR.

## 8. Execution Architecture Principle
> **"Architecture specifies capabilities; Engineering selects technologies."**
> - Implementation follows Execution Architecture, never the reverse.
> - Architecture defines what the system must be able to do. Engineering determines how it is implemented using appropriate technology.
> - No bootstrap implementation before Kernel Execution Architecture is frozen.
> - No service container implementation before Dependency Injection specs are approved.
> - No event broker implementation before Event Bus specs are approved.
> - No technology decision can alter the architecture contract without an Architecture Decision Record (ADR).

## 9. Engineering Governance Principle
> **"Every engineering decision must be traceable to an architectural decision, and every implementation artifact must be traceable to an approved contract."**
> - Governance precedes implementation.
> - Every pull request must pass the Architecture Compliance Quality Gate.
> - No technical debt is acceptable without a formally logged Debt ID and Target Version.
> - All engineering metrics and code reviews must align with the Campus OS Governance policies.

## 10. Platform Foundation Principle
> **"The Platform owns the capabilities; modules compose the business."**
> - Every module is a platform extension, never a kernel modification.
> - The Kernel provides foundational capabilities (identity, workflow, observability, integration).
> - Business Modules construct workflows using these platform capabilities.
> - Modules must depend on the Platform Foundation, never directly on one another.

## 11. Business Realization Principle
> **"Every business module must be traceable from business capability to operational deployment through approved platform services, runtime contracts, and governance controls."**
> - Modularity is driven by Business Architecture, not just code structure.
> - Modules must realize explicit Business Capabilities.
> - The chain of traceability (Capability -> Module -> Service -> Contract -> Deployment) is mandatory.

## 12. Reference Implementation Principle
> **"Reference architectures establish the normative implementation model; production systems may optimize or extend that model, but shall preserve architectural intent, interoperability, governance, and end-to-end traceability."**
> - Reference implementations serve as the official blueprint for code structure, layering, and platform integration.
> - Production implementations must not violate the enterprise architecture or runtime contracts.
> - All variations in technology must be justified and strictly conform to the established quality gates and traceability matrices.

## 13. Production Engineering Principle
> **"Production engineering provides the operational capabilities required to deliver and sustain enterprise systems; implementation technologies may evolve, but operational governance, reliability, security, and traceability shall remain consistent with the approved enterprise architecture."**
> - The Engineering Platform is the factory; its operational standards dictate the quality of the software.
> - Automation and Infrastructure-as-Code are mandatory to ensure environment parity and repeatable provisioning.
> - SRE practices, incident management, and continuous improvement are core to the platform's lifecycle.

## 14. Continuous Enterprise Architecture Principle
> **"Enterprise architecture is a living system; every change shall strengthen alignment between business strategy, architecture, engineering, operations, and governance, ensuring that the enterprise continuously evolves while preserving architectural integrity, interoperability, traceability, and long-term sustainability."**
> - Enterprise operations treat the architecture baseline as the operational standard, not just a historical document.
> - Evolution must be tracked via formal changes (ADRs, RFCs) driving the updates in the baseline, ensuring operational changes never drift from architectural intent.
> - The Enterprise Maturity Roadmap acts as the strategic north star for continuous improvement.

## 15. The 6 Enterprise Rules of Campus OS
> **"These 6 pillars ensure Campus OS scales across decades and hundreds of modules."**
> 1. **No Business Code Outside Bounded Context**: All business logic and domain-specific adapters reside solely within their bounded context (e.g., `domains/registration`).
> 2. **Application API vs Presentation Plugin**: Presentation Plugins are not controllers. They call the `Application API` (internal facade), which orchestrates via `Application Service`.
> 3. **ORM-Agnostic Repository**: Repositories must never depend on ORM implementations (like Drizzle) directly; they use `IDatabaseExecutor` provided by the Database Platform.
> 4. **Generic Platform & Infrastructure**: Infrastructure and Platform packages only provide shared technology capabilities, remaining entirely blind to business domains.
> 5. **Dependency Direction Never Points Back to Business**: Dependencies flow strictly downwards: `Presentation` ➔ `Application API` ➔ `Application Service` ➔ `Domain Runtime` ➔ `Repository` ➔ `Platform Database`. General packages must never depend on business domains.
> 6. **Inherit Architecture Before Implementation**: Every new bounded context must first inherit the certified architecture (Structure ➔ Freeze Rules ➔ Folder Layout ➔ Dependency Rules ➔ Application API ➔ Repository) before implementing any business logic.

## 16. Definition of Backend Freeze
> **"A Bounded Context must pass these criteria to attain Backend Freeze status:"**
> 1. Entity & Aggregate completed.
> 2. Runtime & Domain Service completed.
> 3. Domain Events completed.
> 4. Policies & State Machine completed.
> 5. Commands, Queries, DTO, Mapper completed.
> 6. Repository & Transaction completed.
> 7. Application API completed.
> 8. Integration Test backend passed.
> 9. **Zero business logic leaks** outside the bounded context.
