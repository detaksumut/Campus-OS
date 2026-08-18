# CLI Naming Conventions

All commands, flags, and generated artifacts must adhere to these rigid rules:

## Commands & Flags
- Commands are strictly lowercase: `campus new domain`
- Flags use kebab-case: `--force-override`, `--dry-run`

## Generated Output
- **Folders**: Must use `kebab-case` (e.g., `student-registration`).
- **Files**: Classes and Types use `PascalCase` (e.g., `StudentRegisteredEvent.ts`).
- **Interfaces**: Prefixed with `I` (e.g., `IRegistrationRepository.ts`).
- **Manifests**: JSON metadata files use PascalCase (e.g., `DomainManifest.json`).
