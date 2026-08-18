# ADR-001: Registration Domain Boundary and Financial Isolation

## Status
Accepted

## Context
Modul PMB (Registration) bertugas menerima calon mahasiswa baru. Dalam proses ini, sering kali institusi mewajibkan pembayaran uang pangkal atau biaya pendaftaran (UKT). Pertanyaannya adalah, apakah logika pembayaran ini masuk ke dalam Domain PMB?

## Decision
Logika finansial (UKT, Billing, Invoice) **TIDAK** dimasukkan ke dalam modul `Registration`.
Modul Registration murni hanya menangani biodata, dokumen, dan status akademik. Modul ini akan menghasilkan event `ApplicantRegisteredEvent`. Modul `Finance` (yang akan dibangun terpisah) akan *subscribe* ke event ini dan menerbitkan tagihan.

## Consequences
- **Positive**: Modul Registration menjadi sangat bersih, *cohesive*, dan tidak memiliki kebocoran konteks finansial (Zero Business Leak).
- **Negative**: Transisi status kelulusan membutuhkan orkestrasi asinkron (event-driven) melalui `kernel.integration` antara domain `Registration` dan `Finance`.
