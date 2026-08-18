# CLI Compatibility Policy

The Campus CLI is strictly coupled to the **Intermediate Architecture Model (IAM)**. 
It does not read Markdown files directly.

## Compatibility Matrix
- CLI v1.x produces domains compatible with SDK v1.x and Kernel v1.x.
- Running `campus doctor` verifies the exact versions of the CLI, SDK, and Kernel to ensure no matrix mismatch exists.

## Version Validation
If the CLI version significantly trails the SDK version defined in the `DomainManifest.json`, the CLI will aggressively prompt the developer to update via `campus upgrade`.
