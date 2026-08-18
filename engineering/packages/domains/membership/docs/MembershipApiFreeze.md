# Membership API Freeze Record

**Date:** [CURRENT DATE]
**Version:** 1.0.0
**Status:** Frozen

The internal bounded context API is hereby frozen.
Any modifications to `ProfileRuntime`, `VerificationRuntime`, `TierRuntime`, or `DigitalCardRuntime` MUST:
1. Provide backward-compatible data migrations.
2. Ensure no SDK contracts are broken.
3. Be documented in a new Architecture Decision Record (ADR).
4. Bump the `schemaVersion` in emitted `EventEnvelope<T>` messages.
