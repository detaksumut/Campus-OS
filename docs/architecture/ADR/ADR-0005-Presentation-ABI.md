# ADR-0005: Registry-Driven Presentation (ABI)

**Status**: Accepted
**Context**: Hardcoded React routes and tight UI coupling prevent the dynamic loading and scaling of enterprise modules.
**Decision**: No React Component may be registered outside the Presentation ABI. Every UI element (Widget, Form, Grid, Layout) must be defined as metadata (Manifest) and loaded dynamically through a centralized Plugin Registry.
**Consequences**: High initial complexity to build the Plugin Loader and Runtimes, but unmatched flexibility for long-term multi-tenant UI composition.
