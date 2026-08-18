# Membership CQRS Projections (Enterprise View)

The Membership domain provides the following Read-Models.

- `PublicDirectoryEntryDto`: Safe for general public consumption.
- `ReviewerDirectoryEntryDto`: Contains Academic and Institutional data; strictly for `Publication` and `Certification` context assignments.

All Projections contain a standard `ProjectionMetadata` object containing `projectionVersion`, `schemaVersion`, `generatedAt`, `generatedFromEventId`, and `sourceAggregateVersion`.
