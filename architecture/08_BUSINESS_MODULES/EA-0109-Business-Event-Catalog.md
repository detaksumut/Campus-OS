---
id: EA-0109
title: Business Event Catalog
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Business Event Catalog

## Purpose
Defines the conceptual registry of core Domain Events that dictate cross-module choreography. This catalog serves as the blueprint for the eventual technical AsyncAPI specifications.

## Event Structure Definition

Every official Business Event in Campus OS MUST document the following attributes:

| Attribute | Description |
|-----------|-------------|
| **Event Name** | PascalCase naming indicating a past occurrence (e.g., `AdmissionSubmitted`). |
| **Event ID** | Unique identifier string (e.g., `evt:academic:admission-submitted`). |
| **Description** | Business meaning of the event. |
| **Publisher** | The module responsible for emitting this event. |
| **Subscriber(s)** | Known modules that react to this event. |
| **Payload Model** | High-level fields included in the event (e.g., `applicationId`, `studentId`, `timestamp`). |
| **Version** | SemVer version of the event schema. |
| **Compatibility Policy** | Backward/Forward compatibility rules. |
| **Reliability Requirement** | e.g., At-least-once delivery, Exactly-once processing. |
| **Security Classification** | Data sensitivity (e.g., Internal, Confidential). |

## Core Event Catalog (Initial Draft)

### 1. `AdmissionSubmitted`
- **Publisher**: Admission Module
- **Subscribers**: Workflow Runtime, Notification Module
- **Payload Model**: `admissionId`, `applicantId`, `programCode`, `submissionDate`

### 2. `StudentRegistered`
- **Publisher**: Student Module
- **Subscribers**: Finance Module (Invoice Generation), Identity Module (Provisioning)
- **Payload Model**: `studentId`, `academicPeriod`, `registrationType`

### 3. `CourseCreated`
- **Publisher**: Curriculum Module
- **Subscribers**: Academic Operations, Enrollment Module
- **Payload Model**: `courseId`, `courseCode`, `credits`, `departmentId`

### 4. `ResearchApproved`
- **Publisher**: Research Module
- **Subscribers**: Finance Module (Grant Allocation)
- **Payload Model**: `proposalId`, `principalInvestigatorId`, `approvedBudget`

### 5. `ArticlePublished`
- **Publisher**: Publication Module
- **Subscribers**: Academic Profile, Community Module
- **Payload Model**: `articleId`, `authorIds`, `journalId`, `doi`

### 6. `CertificateIssued`
- **Publisher**: Credential Module
- **Subscribers**: Alumni Module, Digital Badge Module
- **Payload Model**: `certificateId`, `recipientId`, `programId`, `issueDate`

### 7. `ReviewerAssigned`
- **Publisher**: Journal/Research Module
- **Subscribers**: Notification Module
- **Payload Model**: `assignmentId`, `reviewerId`, `documentId`, `deadline`
