# Membership Projection Catalog

| Projection | Owner | Refresh Mechanism | Source Events |
|------------|-------|-------------------|---------------|
| `PublicDirectoryEntryDto` | DirectoryRuntime | Asynchronous EventBus | `ProfileUpdated`, `Verified` |
| `ReviewerDirectoryEntryDto` | DirectoryRuntime | Asynchronous EventBus | `AcademicProfileUpdated`, `Verified` |

## Rebuild Strategy
Projections are entirely ephemeral. They can be safely deleted and completely rebuilt by replaying the source events from the `EventBus` journal into the `DirectoryRuntime.rebuildIndex()` function.
