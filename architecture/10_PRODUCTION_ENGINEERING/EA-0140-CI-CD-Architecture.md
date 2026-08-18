---
id: EA-0140
title: CI/CD Architecture
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# CI/CD Architecture

## Purpose
Defines the permitted models for deploying artifacts into environments. Campus OS supports both Traditional Push CI/CD and Pull-based GitOps, allowing teams to mature from the former to the latter.

## Supported Deployment Models

### Model A: Traditional CI/CD (Push)
The CI server is actively responsible for updating the cluster.
- **Flow**: `Repository` ➔ `Build Pipeline` ➔ `Artifact Registry` ➔ `Deployment Pipeline (Push via kubectl/helm)` ➔ `Cluster`.
- **Pros**: Simpler to set up initially; familiar to most developers.
- **Cons**: The CI server requires high-level administrative credentials to the cluster, expanding the attack surface.

### Model B: GitOps (Pull)
The Cluster actively synchronizes itself against a declarative Git repository.
- **Flow**: 
  1. `Repository` ➔ `Build Pipeline` ➔ `Artifact Registry`.
  2. `Build Pipeline` ➔ `Updates Manifests in GitOps Repository`.
  3. `Cluster Controller (e.g., ArgoCD/Flux)` ➔ `Pulls from GitOps Repository` ➔ `Applies to Cluster`.
- **Pros**: The cluster pulls configurations, eliminating the need to expose cluster credentials to the CI server. The Git repository becomes the absolute single source of truth for infrastructure state.
- **Cons**: Higher initial learning curve.

## Architectural Mandates
Regardless of the model chosen, the following rules apply:
1. **Separation of Build and Deploy**: The pipeline that compiles the code (Continuous Integration) MUST be separate from the mechanism that deploys the code (Continuous Deployment).
2. **Immutability**: A deployment pipeline MUST deploy a pre-compiled, tagged artifact. It MUST NOT recompile the source code during the deployment phase.
