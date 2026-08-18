# Membership Events Catalog (Enterprise View)

The following events are exposed by the Membership domain. All payloads are wrapped in the Kernel `EventEnvelope<T>`.

| Event | Schema Version | Payload Summary |
|-------|----------------|-----------------|
| `MembershipProfileEvents.ProfileUpdated` | 1.0 | `membershipId` |
| `MembershipProfileEvents.AcademicProfileUpdated` | 1.0 | `membershipId` |
| `MembershipWorkflowEvents.Verified` | 1.0 | `membershipId`, `verificationLevel` |
