# Definition of Presentation Level 1: Plugin Certified

A bounded context is eligible to attain **Presentation Level 1: Plugin Certified** only when it satisfies all of the following metadata and architectural criteria. Note that this certification strictly evaluates the **ABI** (Application Binary Interface) and does not require a single React component to exist.

## 1. Metadata Integrity (The Manifests)
- [ ] **Manifest Valid**: `manifest.ts` correctly identifies the plugin, version, and dependencies.
- [ ] **Route Valid**: `routes.ts` declares virtual routes with associated Layouts, Grids, or Forms.
- [ ] **Capability Valid**: `capabilities.ts` correctly declares exported endpoints for inter-module use.
- [ ] **Permission Valid**: `permissions.ts` declares all RBAC claims required by the module.
- [ ] **Workbench Valid**: `workbench.ts` registers Layout types and explicitly defines Zones and Placements.
- [ ] **Action Manifest Valid**: `actions.manifest.ts` abstracts user actions into central events, eliminating hardcoded closures.
- [ ] **Widget, Form, Grid Manifests Valid**: All UI components are declared as metadata artifacts.

## 2. Infrastructure & Compilation
- [ ] **Plugin Loader Acceptance**: The Plugin successfully passes validation by the `@campus-os/presentation-kernel` Plugin Loader.
- [ ] **Presentation Compiler Acceptance**: The ABI compiles cleanly into a unified schema without syntax or type errors.
- [ ] **Registry Injection**: The compiled ABI successfully populates the 5 Presentation Registries (Navigation, Workbench, Zone, Widget, Action).

## 3. Boundary Discipline
- [ ] **Zero React Dependency**: The entire plugin directory (`presentation/plugin/`) contains absolutely no React component imports (`.tsx`), hooks, or DOM manipulations.
- [ ] **Strict Facade Routing**: Actions and endpoints strictly route to the `Application API`, never bypassing it.
