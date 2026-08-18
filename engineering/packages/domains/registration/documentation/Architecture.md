# Registration Domain Architecture

## 1. Domain Overview
Pendaftaran Mahasiswa Baru (PMB).

## 2. Component Diagram
- **Presentation**: `RegistrationPresentationPlugin`
- **Application**: `SubmitRegistrationUseCase`, `GetApplicantStatusQuery`
- **Domain**: `Applicant` (Root), `RegistrationPeriod`, `Document`
- **Infrastructure**: `IRegistrationRepository`

## 3. Boundary Integration
Menggunakan `DomainEvent` standar untuk integrasi ke *Workflow*, *Academic*, dan *Notification*. 
(Lihat `EventDependencyMatrix.json`).

## 4. Architectural Rules (Zero-Leak)
- DTO tidak boleh masuk ke Domain.
- ORM tidak boleh bocor ke Repository Interface.
- Tidak ada logika finansial (diatur via Event/ADR-001).
