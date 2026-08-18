# Campus CLI Commands

The `campus` CLI is the official automation entrypoint for the Campus Developer Platform.

## Core Commands
- `campus new domain <Name>`: Generates a fully compliant Bounded Context structure.
- `campus new service <Name>`: Generates a Shared Service skeleton.
- `campus new plugin <Name>`: Generates a Presentation Plugin.
- `campus new workflow <Name>`: Generates a Workflow Saga skeleton.
- `campus new capability <Name>`: Generates a Cross-Domain Capability.
- `campus new event <Name>`: Generates a strictly versioned Domain Event.
- `campus new dto <Name>`: Generates a primitive-only Contract DTO.
- `campus new repository <Name>`: Generates an ORM-agnostic Repository.

## Architecture & Governance Commands
- `campus architecture validate`: Validates all Markdown Blueprints for spec correctness.
- `campus architecture compile`: Compiles Blueprints -> IAM -> CLI Templates.
- `campus validate`: Validates a given domain against the Golden Rules.
- `campus sync`: Updates an existing domain with the latest template changes.
- `campus upgrade`: Migrates a domain when SDK/Kernel receives a major version bump.
- `campus certify`: Generates the `RuntimeReadyCertificate` and runs all EA Quality Gates.
- `campus doctor`: Audits the developer environment and Campus OS baseline health.
- `campus graph`: Produces the `CrossDomainDependencyGraph.json`.
- `campus readiness`: Produces the `EnterpriseReadinessDashboard.json`.
- `campus audit`: Produces `ArchitectureKPIs.json`.
