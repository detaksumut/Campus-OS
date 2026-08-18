# PMB (Penerimaan Mahasiswa Baru) Entity Catalog

## Bounded Context
**Academic Platform (SIAKAD)** -> **Submodule: PMB**

## 1. Aggregate: Admission
Mewakili pengaturan gelombang dan jalur penerimaan yang dibuka oleh universitas.

### Entity: `AdmissionPeriod` (Aggregate Root)
- `PeriodID` (UUID) - Identifier
- `Name` (String) - e.g., "Penerimaan Mahasiswa Baru 2027/2028"
- `StartDate` (Date)
- `EndDate` (Date)
- `IsActive` (Boolean)

### Entity: `AdmissionPath`
- `PathID` (UUID) - Identifier
- `PeriodID` (UUID) - Foreign Key to AdmissionPeriod
- `Code` (String) - e.g., "SNBT"
- `Name` (String) - e.g., "Seleksi Nasional Berdasarkan Tes"
- `SelectionType` (Enum: Test, Prestasi, Mandiri)
- `Requirements` (String[])
- `Quota` (Number)
- `FeeEstimation` (Number) - Informasi biaya (Invoice asli ada di Finance)
- `IsActive` (Boolean)

---

## 2. Aggregate: Application
Mewakili satu proses pendaftaran dari seorang calon mahasiswa.

### Entity: `AdmissionApplication` (Aggregate Root)
- `ApplicationID` (UUID) - Identifier
- `ApplicantID` (UUID)
- `PathID` (UUID) - Foreign Key to AdmissionPath
- `RegistrationDate` (Date)
- `Status` (Enum: Draft, Submitted, Reviewed, Finalized)
- `PaymentStatus` (Enum: Pending, Paid, Expired, Waived) - Diperbarui via Integration Event dari Finance Platform

### Entity: `Applicant`
- `ApplicantID` (UUID) - Identifier (bisa dikaitkan ke Global Identity nanti)
- `NationalID` (String) - NIK
- `FullName` (String)
- `Email` (String)
- `Phone` (String)
- `DateOfBirth` (Date)
- `PreviousSchool` (String)

### Entity: `StudyProgramChoice`
- `ChoiceID` (UUID) - Identifier
- `ApplicationID` (UUID) - Foreign Key
- `StudyProgramID` (UUID) - Foreign Key ke Master Program Studi
- `Priority` (Number) - 1 untuk pilihan pertama, 2 untuk kedua
- `Status` (Enum: Pending, Evaluated)

### Entity: `AdmissionDocument`
- `DocumentID` (UUID) - Identifier
- `ApplicationID` (UUID) - Foreign Key
- `DocumentType` (Enum: Ijazah, KTP, Pasfoto, Rapor)
- `FileURL` (String) - Blob storage reference
- `ValidationStatus` (Enum: Pending, Valid, Invalid)

### Entity: `AdmissionSelection`
- `SelectionID` (UUID) - Identifier
- `ApplicationID` (UUID) - Foreign Key
- `SelectionMethod` (Enum: CBT, Wawancara, Portofolio, Prestasi)
- `Committee` (String)
- `Score` (Number)
- `Rank` (Number)
- `Status` (Enum: InProgress, Completed)
- `SelectionDate` (Date)

### Entity: `AdmissionResult`
- `ResultID` (UUID) - Identifier
- `SelectionID` (UUID) - Foreign Key ke AdmissionSelection
- `Decision` (Enum: Accepted, Rejected, Waitlisted)
- `AcceptedStudyProgramID` (UUID | Null)
- `DecisionDate` (Date)
- `Remarks` (String)

---

## 3. Domain Services

### `AdmissionEligibilityService`
Domain Service yang bertugas memeriksa aturan bisnis lintas entitas sebelum aplikasi masuk ke tahap seleksi:
- Memeriksa kelengkapan dokumen (`AdmissionDocument`).
- Memeriksa apakah `AdmissionPeriod` masih aktif.
- Memeriksa syarat khusus jalur (`AdmissionPath`).
- Memeriksa status pembayaran dari Finance (`PaymentStatus`).
- Memutuskan kelayakan (Eligible/Not Eligible) untuk diproses ke `AdmissionSelection`.

---

## Integration Events
**Outbound (to Finance Platform):**
- `AdmissionApplicationSubmitted` -> Memicu pembuatan Invoice pendaftaran.

**Inbound (from Finance Platform):**
- `RegistrationFeePaid` -> Mengubah `PaymentStatus` pada `AdmissionApplication` menjadi `Paid`.
