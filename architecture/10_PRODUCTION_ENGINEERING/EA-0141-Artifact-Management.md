---
id: EA-0141
title: Artifact Management
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Artifact Management

## Purpose
Defines how compiled code and operational artifacts are stored, versioned, and scanned, ensuring a trusted supply chain before deployment into Campus OS environments.

## The Artifact Registry
The platform MUST provide a centralized Artifact Registry (e.g., Nexus, Artifactory, Harbor, or Cloud-native registries).

### 1. Types of Artifacts Managed
- **Container Images**: The OCI-compliant runtime executables.
- **Helm Charts**: The deployment descriptors.
- **Language Packages**: Private libraries (e.g., internal NPM or Go packages) shared across modules.
- **SBOMs**: Software Bills of Material validating dependency trees.

### 2. Versioning and Tagging
- Images MUST be tagged with immutable identifiers. Semantic Versioning (`1.0.0`) or Git Commit SHAs (`abcdef12`) are acceptable.
- The `latest` tag MUST NOT be used in Staging or Production environments as it violates immutability and reproducibility.

### 3. Supply Chain Security
- **Image Scanning**: The Artifact Registry MUST automatically scan all pushed container images for known CVEs. 
- **Signatures**: Production-bound artifacts SHOULD be cryptographically signed by the CI system. The Kubernetes admission controller will verify this signature, rejecting any unauthorized or tampered images from starting.
