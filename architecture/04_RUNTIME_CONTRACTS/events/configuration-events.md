# Configuration Runtime Events

This document outlines the foundational events for the Event-Driven Architecture within the Configuration Runtime. This will be transitioned to an `AsyncAPI` specification in Phase 4.

## Event Definitions

### `ConfigurationChanged`
Published when a configuration value is modified.
**Payload:**
- `key` (String)
- `scope` (String)
- `timestamp` (ISO-8601)

### `FeatureFlagToggled`
Published when a feature flag state changes.
**Payload:**
- `flag` (String)
- `enabled` (Boolean)
- `timestamp` (ISO-8601)
