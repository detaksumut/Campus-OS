# Bounded Context Bootstrap Standard

In accordance with **Enterprise Rule #6**, every new bounded context (e.g., Curriculum, Finance, Library) must inherit the certified Campus OS architecture *before* implementing any business logic.

## The Bootstrap Sequence

When initializing a new module, developers MUST execute this sequence:

### 1. Folder Layout Scaffolding
Create the standard 6-layer explicit directory structure:
\`\`\`
domains/[module-name]/
├── src/
│   ├── presentation/      # (Presentation Plugin, React Widgets, Application API)
│   ├── application/       # (Application Services, Commands, Queries, DTO, Mappers)
│   ├── domain/            # (Entities, Aggregates, Domain Runtimes, Policies, Events)
│   └── infrastructure/    # (ORM-Agnostic Repositories, Adapters)
└── tests/
\`\`\`

### 2. Dependency Rule Enforcement
Configure package boundaries (e.g., via ESLint or TSProject references) to strictly enforce the downward flow:
`Presentation ➔ Application API ➔ Application Service ➔ Domain Runtime ➔ Repository ➔ Platform Database`

### 3. Application API Foundation
Create the empty internal facade (`[Module]Api.ts`) to establish the entry point for the presentation layer early.

### 4. Repository Abstraction
Create the empty `[Module]Repository.ts` that relies solely on `IDatabaseExecutor`. Do not import ORM specifics.

### 5. Freeze Rules Alignment
Link the new module's `repository.yaml` or tracking document to the 5 Certification Levels.

### 6. Business Implementation (Final Step)
Only after Steps 1-5 are audited and committed, developers may begin mapping the Entity Catalog and implementing the actual domain logic.
