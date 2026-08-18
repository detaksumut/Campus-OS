---
EA-ID: EA-0015
Title: Workflow Catalog
Category: Catalog
Layer: Architecture
Version: 1.1
Maturity: Baseline
Baseline: PRE_FREEZE
Status: Approved
Owner: Enterprise Architecture Team
Depends-On: []
Referenced-By: [EA-0016]
Last-Updated: 2026-07-20
Review-Date: 2026-07-20
Approval: Approved
---

# Workflow Catalog

All multi-step approvals must be registered here and orchestrated by the Campus Kernel Workflow Runtime.

## WF-001: Enterprise Credential Certification
1. **Application:** Candidate applies for a Certification Scheme.
2. **Eligibility Validation:** System checks if `AcademicProfile` meets prerequisites.
3. **Portfolio Review:** Admin/Assessor reviews submitted evidence.
4. **Assessment Assignment:** System/Admin assigns Assessors.
5. **Online Examination:** Candidate completes CBT.
6. **Interview:** Assessor conducts live interview.
7. **Practical Assessment:** Assessor evaluates practical skills.
8. **Moderation:** Lead Assessor reviews disparate scores to ensure fairness.
9. **Certification Board Approval:** Final greenlight from the highest committee.
10. **Certificate Issued:** Digital Certificate & Badge generated.
11. **Registry Update:** Data pushed to Credential Registry for public verification.
12. **Renewal Reminder:** Scheduled task triggers CPD/renewal sequence prior to expiration.
