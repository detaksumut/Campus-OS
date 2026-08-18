# Service Naming Convention

- **Folders**: kebab-case (e.g., `identity`, `notification`).
- **Contracts**: PascalCase prefixed with 'I' (e.g., `IIdentityService.ts`).
- **Implementations**: PascalCase postfixed with 'Provider' or 'Manager' depending on role (e.g., `AuthenticationProvider.ts`).
- **Manifests**: PascalCase (e.g., `ServiceManifest.json`, `ServiceCertificate.json`).
