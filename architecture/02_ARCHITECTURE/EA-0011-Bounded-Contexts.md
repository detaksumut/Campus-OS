---
EA-ID: EA-0011
Title: Bounded Contexts
Category: Context
Layer: Architecture
Version: 1.1
Maturity: Baseline
Baseline: PRE_FREEZE
Status: Approved
Owner: Enterprise Architecture Team
Depends-On: [EA-0010]
Referenced-By: [EA-0012, EA-0013]
Last-Updated: 2026-07-20
Review-Date: 2026-07-20
Approval: Approved
---

# Bounded Contexts

Each Business Domain is implemented via one or more strict Bounded Contexts (BC). A BC has its own domain model and ubiquitous language.

## 1. Academic BC
- **Core Focus:** Managing the student's academic journey.
- **Key Aggregates:** `Student`, `Curriculum`, `Course`, `ClassSchedule`, `StudyPlan (KRS)`, `Transcript`.

## 2. Academic Credential BC
- **Core Focus:** Managing the lifecycle of competency frameworks, certification schemes, and assessments.
- **Key Aggregates:** `CompetencyFramework`, `CertificationScheme`, `Candidate`, `Assessor`, `Assessment`, `Portfolio`.

## 3. Credential Registry BC
- **Core Focus:** The immutable, verifiable ledger of issued credentials.
- **Key Aggregates:** `DigitalBadge`, `CertificateRecord`, `VerificationLog`, `DigitalSignature`.

## 4. Human Capital (HR) BC
- **Core Focus:** Managing employee profiles, specifically the unified Academic Identity.
- **Key Aggregates:** `AcademicIdentity`, `Lecturer`, `Employee`, `Workload (BKD)`.

## 5. Research & Publication BC
- **Core Focus:** Managing research projects and journal articles (evidence for credentials).
- **Key Aggregates:** `GrantProposal`, `ResearchProject`, `Manuscript`, `PeerReview`.

*(Other core BCs include Finance, Admission, Learning, Asset, and Library).*
