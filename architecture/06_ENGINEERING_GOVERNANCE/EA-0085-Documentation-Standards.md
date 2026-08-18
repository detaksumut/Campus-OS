---
id: EA-0085
title: Documentation Standards
type: Governance Document
status: APPROVED
version: 1.0.0
---

# Documentation Standards

## Purpose
Ensures that all code, architecture, and operational procedures are documented consistently. Documentation is treated as a first-class artifact, subject to the same Quality Gates as source code.

## Mandatory Documentation Artifacts

1. **Enterprise Architecture Repository (EAR)**
   - Must be written in Markdown.
   - Must include YAML frontmatter (ID, Title, Type, Status, Version).
   - Diagrams MUST be written in Mermaid.js format (e.g., StateDiagram-v2, C4, Sequence) to allow version control and text-based diffs. Image files should only be used when Mermaid is insufficient.

2. **Module README.md**
   - Every module repository MUST contain a `README.md` at the root.
   - Must include: Purpose, Architecture dependencies, Local setup instructions, Testing instructions, and Deployment variables.

3. **Runtime Contracts (OpenAPI & AsyncAPI)**
   - API endpoints MUST be documented using OpenAPI 3.1 YAML.
   - All fields MUST have clear descriptions and example values.
   - Event contracts MUST be documented using AsyncAPI (or structured Markdown during initial phases).

4. **Inline Code Documentation**
   - Code should be self-documenting (descriptive variable and method names).
   - Complex algorithms, non-obvious business rules, or "hacks" MUST have inline comments explaining the *Why*, not just the *What*.
   - Public interfaces/APIs MUST have standard docstrings (e.g., Javadoc, XML comments).

## Review and Maintenance
- Documentation is validated during the **Documentation Validation** Quality Gate.
- Pull Requests that alter functionality without updating the corresponding documentation MUST be rejected.
