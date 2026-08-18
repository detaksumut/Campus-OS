# Service Compatibility & Versioning

Follows Strict SemVer 2.0.

- **MAJOR**: Breaking changes to the public SDK contract (e.g., removing a method from `IIdentityService`).
- **MINOR**: Adding new capabilities to the service without breaking existing contracts.
- **PATCH**: Internal bug fixes or performance improvements within the service infrastructure adapters.

A Service must declare its compatibility range with the SDK and Kernel in its `ServiceManifest.json`.
