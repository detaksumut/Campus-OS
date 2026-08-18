# Domain Evolution Policy

## 1. Aggregate Evolution
- **Additive Changes**: Adding new properties or behaviors to an Aggregate is permitted without breaking downstream systems.
- **Destructive Changes**: Removing or renaming properties requires a major version bump.

## 2. Event Evolution
- Events are **IMMUTABLE**.
- If an event payload must change, a new event version MUST be published (e.g., `FacultyCreatedEventV2`).
- The domain must support **Dual-Publishing** for at least 1 major version cycle to allow subscribers to migrate.

## 3. Capability Evolution
- New capabilities can be added to the `CapabilityRegistry`.
- Existing capabilities cannot have their method signatures altered. Instead, a new capability must be registered.

## 4. Contract Evolution
- DTOs and Contracts are strictly versioned.
- Breaking changes require a formal Architecture Decision Record (ADR) and EAB approval.

## 5. Deprecation & Backward Compatibility
- Any deprecated capability or event MUST remain functional for exactly **one major release cycle** before being physically removed from the Runtime.
- Deprecation must be broadcasted via `DeprecationManifest.json`.
