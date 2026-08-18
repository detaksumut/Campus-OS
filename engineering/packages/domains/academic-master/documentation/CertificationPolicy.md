# Certification Policy

## 1. Minimum Thresholds
- **Gate A (Domain Foundation)**: 90
- **Gate B (Runtime Ready)**: 90
- **Gate C (Quality Ready)**: 95
- **Gate D (Release Ready)**: 95
- **Gate E (Enterprise Governance)**: 95

## 2. Mandatory Evidence
Each certificate MUST be accompanied by its respective `*Validation.json` or `*Manifest.json` as mapped in `EvidenceCompleteness.json`. A certificate generated without 100% required evidence is considered **INVALID**.

## 3. Failure Conditions
Certification immediately FAILS if:
- Any `Validation.json` returns `status: "FAIL"`.
- Circular dependencies are detected.
- Framework/ORM leaks into the Pure Domain Layer.
- Architecture Score falls below the Minimum Threshold.

## 4. Recertification Procedure
If a domain undergoes structural changes (e.g., adding an Aggregate) after Gate B is certified:
1. The domain status drops back to Gate A.
2. The `DomainLifecycleManifest.json` is reset.
3. The pipeline must re-evaluate all validations.

## 5. Versioning
Certificates are strictly tied to Semantic Versioning (SemVer) of the Domain. A version bump requires recertification.
