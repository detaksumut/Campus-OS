---
EA-ID: EA-0012
Title: Domain Model
Category: Domain
Layer: Architecture
Version: 1.1
Maturity: Baseline
Baseline: PRE_FREEZE
Status: Approved
Owner: Enterprise Architecture Team
Depends-On: [EA-0011]
Referenced-By: [EA-0013]
Last-Updated: 2026-07-20
Review-Date: 2026-07-20
Approval: Approved
---

# Domain Model

This document catalogs the core Aggregate Roots and Entities across all Bounded Contexts.

## Human Capital (HR) BC
- **Aggregate Root:** `AcademicIdentity`
  - Entities: `PersonalProfile`, `AcademicProfile`, `ResearchProfile`, `PublicationProfile`, `CertificationProfile`, `AchievementProfile`, `CompetencyProfile`
- **Aggregate Root:** `Employee`
  - Entities: `Lecturer`, `Workload (BKD)`

## Academic Credential BC
- **Aggregate Root:** `CompetencyFramework`
  - Entities: `TeachingCompetency`, `ResearchCompetency`, `LeadershipCompetency`, `DigitalSkills`
- **Aggregate Root:** `CertificationScheme`
  - Entities: `Requirement`, `AssessmentCriteria`, `ContinuingProfessionalDevelopment (CPD)`
- **Aggregate Root:** `Candidate`
  - Entities: `AcademicPortfolio`, `ApplicationForm`
- **Aggregate Root:** `Assessment`
  - Entities: `OnlineExamination`, `Interview`, `PracticalAssessment`, `ModerationReport`

## Credential Registry BC
- **Aggregate Root:** `CertificateRecord`
  - Entities: `DigitalBadge`, `MicroCredential`, `CompetencyPassport`
- **Aggregate Root:** `VerificationRegistry`
  - Entities: `QRSignature`, `VerificationLog`

## Research & Publication BC
- **Aggregate Root:** `ResearchProject`
- **Aggregate Root:** `Manuscript`
