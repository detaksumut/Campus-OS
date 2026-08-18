# Registration Entity & Aggregate Catalog

Dokumen ini mendefinisikan *Root Aggregates* dan *Entities* yang mengelola lifecycle di dalam Bounded Context `registration`.

## 1. Aggregate Root: `Applicant`
Entitas utama yang mewakili kandidat pendaftar.
- **Identity**: `applicantId` (UUID)
- **Attributes**:
  - `userId` (UUID, reference ke `kernel.identity`)
  - `registrationPeriodId` (UUID)
  - `admissionStatus` (Enum: DRAFT, SUBMITTED, UNDER_REVIEW, ACCEPTED, REJECTED)
  - `personalData` (ValueObject: PersonalData)
  - `academicRecord` (ValueObject: AcademicRecord)
- **Invariants**:
  - `applicantId` bersifat immutable setelah di-generate.
  - `userId` harus unik per `RegistrationPeriod`.
  - Transisi `admissionStatus` harus mengikuti state machine (DRAFT -> SUBMITTED -> UNDER_REVIEW -> ACCEPTED/REJECTED).
- **Domain Events**:
  - `ApplicantRegisteredEvent`
  - `ApplicantStatusChangedEvent`

## 2. Aggregate Root: `RegistrationPeriod`
Entitas yang mengatur gelombang dan jadwal pendaftaran.
- **Identity**: `periodId` (UUID)
- **Attributes**:
  - `name` (String, misal: "Gelombang 1 2026")
  - `startDate` (DateTime)
  - `endDate` (DateTime)
  - `quota` (Integer)
  - `isActive` (Boolean)
- **Invariants**:
  - `endDate` harus lebih besar dari `startDate`.
  - Hanya satu periode yang boleh `isActive` dalam satu rentang waktu (tergantung *Business Rule*).
- **Domain Events**:
  - `RegistrationPeriodOpenedEvent`
  - `RegistrationPeriodClosedEvent`

## 3. Entity: `Document`
Entitas *child* di bawah naungan Agregat `Applicant`, merepresentasikan berkas unggahan.
- **Identity**: `documentId` (UUID)
- **Attributes**:
  - `applicantId` (UUID)
  - `documentType` (Enum: KTP, IJAZAH, PASFOTO, TRANSKRIP)
  - `fileReferenceId` (UUID, reference ke `kernel.document`)
  - `verificationStatus` (Enum: PENDING, VERIFIED, REJECTED)
- **Invariants**:
  - `documentId` unik.
  - Tidak boleh ada duplikasi `documentType` untuk satu `Applicant`.
