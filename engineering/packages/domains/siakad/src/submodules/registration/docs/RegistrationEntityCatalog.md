# Registration (Registrasi Mahasiswa) Entity Catalog

## Bounded Context
**Academic Platform (SIAKAD)** -> **Submodule: Registration**

## 1. Aggregates

### Entity: `RegistrationPeriod` (Aggregate Root)
Mengelola siklus registrasi per semester (kapan mulai, ditutup, dan batas akhir pembayaran).
- `RegistrationPeriodID` (UUID) - Identifier
- `AcademicTermID` (UUID) - Misal: Semester Ganjil 2027/2028
- `StartDate` (Date)
- `EndDate` (Date)
- `PaymentDeadline` (Date)
- `Status` (Enum: Open, Closed, LateRegistration)

### Entity: `SemesterRegistration` (Aggregate Root)
Mewakili status registrasi seorang mahasiswa pada satu semester tertentu.
- `RegistrationID` (UUID) - Identifier
- `StudentID` (UUID) - Foreign Key ke Domain Mahasiswa
- `AcademicTermID` (UUID) - Foreign Key ke Master Akademik
- `RegistrationType` (Enum: NewStudent, ReRegistration, Transfer, Reactivation)
- `RegistrationStatus` (Enum: Draft, PendingPayment, PendingValidation, Registered, Cancelled)
- `StudentAcademicStatus` (Enum: Active, Leave, Suspended, DropOut, Graduated, Inactive)
- `RegistrationDate` (Date)
- `Remarks` (String)

### Entity: `StudentProvision` (Aggregate Root)
Bertanggung jawab atas proses pembentukan mahasiswa baru yang datanya ditarik secara _event-driven_ dari PMB, sebelum resmi diserahkan ke Domain Mahasiswa.
- `StudentProvisionID` (UUID) - Identifier
- `ApplicantID` (UUID) - Payload dari event \`ApplicantAccepted\`
- `GeneratedNIM` (String) - Dihasilkan oleh Domain Service
- `StudyProgramID` (UUID)
- `AdmissionGeneration` (String) - Misal: "2027"

---

## 2. Domain Services

### `RegistrationEligibilityService`
Berfungsi sebagai orkestrator kelayakan registrasi dengan menanyakan ke beberapa _Eligibility Providers_ sebelum mahasiswa diizinkan registrasi:
- `FinanceEligibilityProvider` (Apakah UKT sudah lunas?)
- `AcademicEligibilityProvider` (Apakah status akademik memungkinkan?)
- `DisciplineEligibilityProvider` (Apakah ada sanksi disiplin?)
- `LibraryEligibilityProvider` (Apakah ada pinjaman buku yang menunggak?)

### `StudentNumberGenerator`
Mengisolasi *Institution Policy* pembuatan NIM dari proses registrasi utama.
- `generateNIM(applicantData, studyProgramId, generation)` -> Mengembalikan NIM sesuai format universitas (e.g., IF-2027-00123).

---

## 3. Integration Events

**Inbound Events:**
- `ApplicantAccepted` (dari PMB) -> Memicu pembuatan `StudentProvision`.
- `RegistrationFeePaid` (dari Finance) -> Mengubah `RegistrationStatus` dari `PendingPayment` ke `Registered`.

**Outbound Events:**
- `StudentProvisioned` -> Dikirim agar Submodul Mahasiswa memproses pembuatan entitas Student penuh.
- `RegistrationSubmitted`
- `RegistrationCompleted`
- `RegistrationCancelled`
- `RegistrationReopened`
