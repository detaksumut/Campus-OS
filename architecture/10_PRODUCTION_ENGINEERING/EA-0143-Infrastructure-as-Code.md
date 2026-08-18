---
id: EA-0143
title: Infrastructure as Code (IaC)
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Infrastructure as Code (IaC)

## Purpose
Defines the architectural requirements for provisioning and managing cloud resources and platform infrastructure, strictly outlawing manual "ClickOps" in the Campus OS environment.

## IaC Core Principles

To ensure that infrastructure is treated with the same rigor as application code, the following principles MUST be adhered to, regardless of the underlying tool (e.g., Terraform, Pulumi, Crossplane).

### 1. Declarative Infrastructure
Engineers define *what* the end state should be (e.g., "I need a PostgreSQL database with 100GB of storage"), not *how* to achieve it via imperative scripts. The IaC engine determines the provisioning steps.

### 2. Immutable Infrastructure
Once a server or cluster node is provisioned, its configuration is never changed in place (no SSH access for manual tweaks). If a change is needed, the IaC definition is updated, the old resource is destroyed, and a new one is provisioned.

### 3. Version Controlled
All infrastructure definitions live in a Git repository. Changes to infrastructure require a Pull Request, enabling peer review and static analysis (e.g., checking for open firewall ports) before the infrastructure is modified.

### 4. Repeatable Provisioning & Environment Parity
The exact same IaC templates used to build Production MUST be used to build Staging, QA, and Integration. This guarantees Environment Parity and prevents "it works in Staging but fails in Prod" scenarios.

### 5. Auditability
Because all changes go through Git, the platform inherently provides a complete, timestamped audit log of who changed the infrastructure, when, and why.
