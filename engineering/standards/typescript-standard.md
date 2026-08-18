# TypeScript Standard

## 1. Strict Mode
- `strict: true` must be enabled in all `tsconfig.json`.

## 2. Interfaces over Types
- Prefer `interface` over `type` for object definitions to allow declaration merging and better error messages.

## 3. No Any
- The use of `any` is strictly prohibited. Use `unknown` if the type is truly unknown.
