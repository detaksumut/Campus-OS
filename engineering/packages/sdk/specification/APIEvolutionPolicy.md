# SDK API Evolution Policy

This document defines the strict lifecycle of SDK API evolution to protect the stability of Campus OS bounded contexts.

## 1. Evolution Rules
1. **Breaking Changes**: Any modification to a `@stable` API's signature requires a **Major Version** bump of `@campus-os/sdk`.
2. **Deprecation**: A `@stable` API cannot be deleted immediately. It must first be marked as `@deprecated` with a migration path.
3. **Grace Period**: Deprecated APIs must remain functional for exactly **one major release cycle**. They will be hard-deleted in the subsequent major version.

## 2. When an API can change
- **`@experimental`**: Can be refactored, renamed, or deleted in any MINOR or PATCH release.
- **`@stable`**: Can only be appended to (e.g., adding optional parameters) in MINOR releases. Breaking signature changes trigger a MAJOR release.
- **`@internal`**: Should not be used by external domains, but changes should follow `@stable` rules to protect internal platform consumers.
