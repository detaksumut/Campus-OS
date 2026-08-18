# Domain Layer - Academic Master Data

## Architecture Rules
This folder contains the **Phase B - Domain Modeling** layer for Academic Master Data.

- **100% Pure Domain**: No ORM, No DB, No HTTP, No external dependencies.
- **Factory Instantiation**: Aggregates can only be created via their respective `Factory` classes.
- **Repository Interfaces Only**: Persistence logic is explicitly banned. Repositories must be purely interfaces (`I...Repository.ts`).
- **Rich Domain Models**: Entities contain logic (behavior first), properties are immutable or strictly controlled.
