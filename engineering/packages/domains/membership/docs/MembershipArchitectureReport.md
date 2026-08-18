# Membership Architecture Report

**Version:** 1.0.0
**Status:** Frozen

## Write Model (Authoritative State)
1. **Enrollment & Identity Binding**: Maps technical identity (`kernelIdentityId`) to business identity (`membershipId`).
2. **Verification Runtime**: State machine driven by `VerificationPolicy` (Pending, Submitted, UnderReview, Verified, Rejected, Suspended).
3. **Profile Runtime**: Segmented storage for Public, Private, Academic, and Preferences.
4. **Tier Runtime**: Defines membership levels (`TierDefinition`) and tracks member assignments (`TierAssignment`).

## Representation Layer
1. **Digital Card Runtime**: Aggregates Profile, Tier, and Verification data through Card Templates to generate secure QR Verification URLs. It holds no persistent state.

## Read Model (CQRS)
1. **Directory Runtime**: Listens asynchronously to `IEventBus` to project real-time member data into read-optimized `ProjectionStore`s. 
2. **Search Index & Query Engine**: Optimized specifically for `IDirectoryQuery` lookups.
