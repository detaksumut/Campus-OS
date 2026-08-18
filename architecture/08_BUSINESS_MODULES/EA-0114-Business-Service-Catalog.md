---
id: EA-0114
title: Business Service Catalog
type: Architecture Document
status: APPROVED
version: 1.0.0
---

# Business Service Catalog

## Purpose
Provides a detailed inventory of the core Application Services exposed by the Business Modules. This catalog acts as the functional API menu for external systems, aggregators, and the Workflow Runtime.

## Catalog Definition
Every service must map directly to an Application Service within a Module, which in turn maps to a Business Capability.

| Domain | Module | Application Service | Exposes Contract | Capability Realized |
|--------|--------|---------------------|------------------|---------------------|
| Academic | Admission | `ApplicationSubmissionService` | `POST /admissions/apply` | Admission Application Management |
| Academic | Admission | `ApplicationReviewService` | `PUT /admissions/{id}/review` | Admission Assessment |
| Academic | Student | `StudentRegistrationService` | `POST /students/register` | Student Onboarding |
| Academic | Enrollment | `CourseRegistrationService` | `POST /enrollments` | Course Enrollment |
| Finance | Invoice | `TuitionBillingService` | `Event: StudentRegistered` | Student Billing |
| Research | Proposal | `ProposalSubmissionService` | `POST /research/proposals` | Grant Proposal Management |
| Certification | Credential | `CertificateIssuanceService` | `POST /credentials/issue` | Degree & Certificate Issuance |

*(Note: This table is an initial architectural reference. The live Service Catalog will be auto-generated from the Module Manifests in the production environment).*
