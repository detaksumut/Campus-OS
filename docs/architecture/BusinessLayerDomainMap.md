# Business Layer Domain Map

**Version:** 1.0.0 | **Date:** 2026-07-20

## Domain Responsibility Map

```
┌─────────────────────────────────────────────────────────────────────┐
│                      CAMPUS OS BUSINESS LAYER                       │
├─────────────────┬────────────────────┬──────────────────────────────┤
│  MEMBERSHIP     │   PUBLICATION      │    CERTIFICATION             │
│  v1.0 ❄️        │   v1.0 ❄️           │    v1.0 ❄️                    │
│                 │                    │                              │
│  "Who is this   │  "What knowledge   │  "What competency has been   │
│  person?"       │   did they         │   formally assessed?"        │
│                 │   contribute?"     │                              │
│  ─────────────  │  ──────────────    │  ─────────────────────────   │
│  Enrollment     │  Submission        │  Scheme (config center)      │
│  Identity       │  Assignment        │  Application                 │
│  Verification   │  Review            │  Eligibility (Engine)        │
│  Profile        │  Editorial         │  Exam                        │
│  Tier           │  Decision          │  Interview                   │
│  Digital Card   │  Production        │  Assessment                  │
│  Directory      │  Publication       │  Decision                    │
│                 │  DOI + Indexing    │  Certificate (versioned)     │
│                 │                    │  Verification                │
│                 │                    │  Renewal                     │
│                 │                    │  Badge (domain-agnostic)     │
└─────────────────┴────────────────────┴──────────────────────────────┘

Integration:
  Membership ──SDK──► Publication    (Reviewer eligibility)
  Membership ──SDK──► Certification  (Applicant validation)
  Publication ──SDK──► Certification (Publication prerequisites)
  Certification ──Event──► Membership (Certificate issued)
  Certification ──Event──► Awards    (Certificate issued/renewed)
```

## Planned Domains (Not Yet Built)

| Domain | Responsibility |
|---|---|
| Conference | Paper submission, presentation scheduling, proceedings |
| Awards | Recognition, badges, grant nominations |
| Research | Research project management, collaboration |
| Community | Forums, interest groups, peer connections |
