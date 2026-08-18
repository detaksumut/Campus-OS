# Membership Event Catalog

| Event Name | Producer | Consumers | Version | Idempotency Notes |
|------------|----------|-----------|---------|-------------------|
| `MembershipProfileEvents.ProfileUpdated` | `ProfileRuntime` | `DirectoryRuntime` | 1.0 | Use `generatedFromEventId` |
| `MembershipProfileEvents.AcademicProfileUpdated` | `ProfileRuntime` | `DirectoryRuntime` | 1.0 | Use `generatedFromEventId` |
| `MembershipWorkflowEvents.Verified` | `VerificationRuntime` | `DirectoryRuntime` | 1.0 | Use `generatedFromEventId` |

*Note: All events are wrapped in Kernel `EventEnvelope<T>`.*
