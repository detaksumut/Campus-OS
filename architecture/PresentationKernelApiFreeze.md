# Presentation Kernel API Freeze (v1.0)

## Overview
This document defines the strict public boundary of the `@campus-os/presentation-core` package for version 1.0. 
Any APIs, classes, or types **not** listed in this document are considered internal implementation details and **must not** be imported by external domain plugins, React runtimes, or dev tools.

## Architectural Governance
- **Public API (`src/public`)**: Guaranteed stable. Breaking changes require a major version bump.
- **Internal API (`src/internal`)**: Subject to refactoring at any time without warning.
- **Enforcement**: CI pipelines and ESLint rules will block any external import pointing to `src/internal`.

## Frozen Public API

### 1. SDK (Manifest Authoring)
These functions are the official way for Bounded Contexts to declare UI components:
- `definePlugin(config)`
- `definePage(config)`
- `defineWidget(config)`
- `defineForm(config)`
- `defineNavigation(config)`

### 2. Presentation Services
These services are the only approved mechanism for the React Runtime to query the Presentation Registry:
- `PageService.findByRoute()`
- `WidgetService.resolve()`
- `NavigationService.getMenus()`
- `ThemeService.getActiveTheme()`

### 3. Contracts
These interfaces define the required behaviors that runtimes must implement:
- `INavigationRuntime`
- `IPageRuntime`
- `IWidgetRuntime`
- `IFormRuntime`

### 4. Bootloader
The entry point for application initialization:
- `PresentationBootloader(config: KernelConfig)`
- `PresentationBootloader.boot()`

## Deprecation Policy
If an API is added to this list, it cannot be removed until `v2.0`. Deprecated APIs will log warnings to the DevTools console.
