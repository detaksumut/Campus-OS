# Domain Template Package (CLI Specification)

The Campus OS Domain Template Package provides scaffolding for new domains ensuring identical foundations.

## Command
`campus generate domain <DomainName>`

## What it generates
1. **Directories**:
   - `src/aggregates/`
   - `src/contracts/`
   - `src/runtime/`
   - `src/events/`
   - `src/repositories/`
   - `src/application/`
   - `src/presentation/`
   - `src/security/`
   - `documentation/`
2. **Governance Artifacts**:
   - `task.md` (Pre-filled with Phases A - U checklist).
   - `BusinessScope.md` (Stub).
   - `EntityCatalog.md` (Stub).
   - All `*Validation.json` templates (Set to `PENDING`).
   - `ArchitectureScore.json` (Initialized to 0).
3. **CI/CD**:
   - Symlinks or copies the `.github/workflows/architecture-certification.yml` for the new domain.

## Benefits
Every new bounded context begins with 100% compliance to the `ArchitectureGovernancePolicy.md` structural requirements. Developers only need to fill in the business logic while the Governance lifecycle runs on autopilot.
