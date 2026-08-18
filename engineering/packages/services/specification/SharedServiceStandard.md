# Shared Service Standard

All Campus OS Shared Services must conform to the following architectural standard:

1. **Generation Requirement**: Services MUST be generated via `campus new service <Name>`. Manual creation is prohibited.
2. **Structure**: Must adhere to the 10-folder service blueprint (application, contracts, domain, infrastructure, runtime, tests, documentation, governance, manifest, artifacts).
3. **Isolation**: A Shared Service is domain-agnostic. It cannot import from or depend on any Bounded Context.
4. **Integration**: Interactions with a Shared Service must occur via the SDK Contract. Direct import of service implementation files is forbidden.
