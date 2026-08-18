---
EA-ID: EA-0037
Title: Reference Data
Category: Data Architecture
Layer: Architecture
Version: 1.0
Maturity: Baseline
Baseline: PRE_FREEZE
Status: Approved
Owner: Chief Enterprise Architect
Depends-On: [EA-0033]
Referenced-By: []
Last-Updated: 2026-07-20
Review-Date: 2026-07-20
Approval: Approved
---

# Reference Data

Reference Data consists of static or semi-static lists that categorize other data. Unlike Master Data, Reference Data rarely changes.

## Global Reference Sets
- `Countries`, `Provinces`, `Cities` (Based on ISO and National Standards)
- `Academic Ranks` (Asisten Ahli, Lektor, Lektor Kepala, Guru Besar)
- `Employee Types` (PNS, Tetap Yayasan, Kontrak)
- `Religions`, `Genders`, `Blood Types`

## Golden Rule
Reference data is seeded exactly ONCE at the birth of the system (`0001-reference-data.sql`). There is no "dummy" reference data.
