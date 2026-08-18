# Domain Interaction Matrix

**Version:** 1.0.1

This matrix tracks how Bounded Contexts within Campus OS interact with one another. To prevent tight coupling, integrations are strictly audited.

| Provider Domain | Consumer Domain | Mechanism | Direction | Notes |
|-----------------|-----------------|-----------|-----------|-------|
| Kernel | Membership | Core/Identity | Read | `kernelIdentityId` is mapped to `membershipId` |
| Membership | Publication | SDK | Read | Publication relies on `IMembershipLookup` to verify authors/reviewers |
| Membership | Publication | Event | Async | Publication listens to Directory indexing updates |
| Publication | Membership | None | Forbidden | Membership MUST NOT depend on Publication |
| Membership | Certification | SDK | Read | Certification checks `IMembershipTier` |
| Membership | Certification | Event | Async | Certification listens to Profile changes |
| Certification | Publication | None | Forbidden | Certification MUST NOT read Publication directly |

## Interaction Rules
1. **SDK (Sync):** Used for point-in-time checks (e.g., "Is this user verified right now?")
2. **Events (Async):** Used to trigger workflows across domains (e.g., "Article Published -> Trigger Award Logic")
3. **Projections (CQRS):** Used for large-scale searching or listing without querying the authoritative database.
