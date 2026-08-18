# Campus OS SDK - Public API Specification

## API Stability Index
All APIs exposed by `@campus-os/sdk` are categorized into one of the following stability indices. This index is strictly enforced via JSDoc annotations.

- **`@stable`**: Guaranteed not to break within the current major version. Safe for production use in Bounded Contexts.
- **`@experimental`**: Under active development. May change or be removed at any time without a major version bump. Use with caution.
- **`@deprecated`**: Slated for removal. Will be maintained for at least one major release cycle. Consumers must migrate to recommended alternatives.
- **`@internal`**: For framework/platform use only. Bounded Contexts MUST NOT call these APIs.

## Supported Façades

| Façade | Description | Status |
| :--- | :--- | :--- |
| `Workflow` | Orchestrates multi-step Sagas and transactions. | `@stable` |
| `Identity` | Authenticates users and manages sessions. | `@stable` |
| `Security` | Manages authorization and permissions. | `@stable` |
| `Capability` | Resolves cross-domain capabilities dynamically. | `@stable` |
| `Validation` | Validates payloads and domain contracts. | `@stable` |
| `Configuration` | Fetches environment config safely. | `@stable` |
| `Logger` | Emits structured observability events. | `@stable` |
| `Plugin` | Injects UI/Presentation components dynamically. | `@stable` |
| `Events` | Publishes domain events to the Event Bus. | `@stable` |
| `Health` | Exposes system readiness and liveness. | `@stable` |
| `Version` | Exposes compatibility info between SDK and Kernel. | `@stable` |
| `Lifecycle` | Manages Application Runtime states. | `@stable` |
| `Storage` | (Phase F Stub) Object storage facade. | `@experimental` |
| `Document` | (Phase F Stub) Document generation facade. | `@experimental` |
| `Notification` | (Phase F Stub) Push/Email facade. | `@experimental` |
