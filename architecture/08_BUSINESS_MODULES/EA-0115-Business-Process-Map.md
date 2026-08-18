---
id: EA-0115
title: Business Process Map
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Business Process Map

## Purpose
Bridges the gap between the high-level Business Capabilities and the low-level Platform Runtimes by mapping exactly how a concrete Business Process traverses the system.

## Traceability Mapping Example: Admission to Enrollment

This mapping demonstrates how a single business process is realized across multiple architectural layers without direct module coupling.

### 1. The Business Process
**Process Name**: New Student Admission and Enrollment
**Trigger**: Prospective student submits an application.
**Outcome**: Student is officially enrolled in courses and billed.

### 2. The Traceability Flow

| Step | Business Process Action | Realized By Capability | Executing Module | Workflow / Event Trigger | Platform Runtime Dependency |
|------|-------------------------|------------------------|------------------|--------------------------|-----------------------------|
| 1 | Applicant submits form | Admission Application | `Admission` | API Gateway (`POST`) | Identity (AuthN) |
| 2 | Officer reviews app | Admission Assessment | `Admission` | API Gateway (`PUT`) | Policy (AuthZ) |
| 3 | Application is Approved | Admission Decision | `Admission` | **Emits**: `AdmissionApproved` | Event Bus |
| 4 | Orchestrate Onboarding | Student Onboarding | `Kernel` | **Workflow**: Onboarding Saga | Workflow Runtime |
| 5 | Generate Student ID | Identity Provisioning | `Identity` | Workflow API Call | Identity Runtime |
| 6 | Create Academic Profile | Academic Profile Mgmt | `Student` | Workflow API Call | Database Runtime |
| 7 | Register for Courses | Course Enrollment | `Enrollment` | Workflow API Call | Transaction Runtime |
| 8 | Enrollment Finished | Enrollment Confirmation | `Enrollment` | **Emits**: `StudentEnrolled` | Event Bus |
| 9 | Generate Tuition Bill | Student Billing | `Finance` | **Subscribes**: `StudentEnrolled` | Notification Runtime |

## Governance Value
By documenting processes in this format, architects can instantly identify if a module is taking on responsibilities outside its domain, or if a direct HTTP call is being used where an Event or Workflow is mandated.
