# Registration Policies

## 1. Eligibility Policy
- **Financial Clearance**: Mahasiswa tidak dapat mendaftar (Status: `WaitingPayment`) jika terdapat tunggakan dari semester sebelumnya.
- **Academic Clearance**: Mahasiswa dengan status `DropOut` atau `Graduated` ditolak secara sistem.
- **Library Clearance**: Mahasiswa yang memiliki tunggakan buku perpustakaan dilarang melakukan registrasi hingga buku dikembalikan.
- **Discipline Clearance**: Mahasiswa berstatus `Suspended` tidak dapat melakukan registrasi aktif, namun tetap diwajibkan mendaftar sebagai status *Suspended* untuk keperluan administrasi PDDIKTI.

## 2. Late Registration Policy
- Registrasi yang dilakukan setelah `RegistrationPeriod.EndDate` namun sebelum `RegistrationPeriod.PaymentDeadline` dikenakan status `LateRegistration`.
- Denda (Late Fee) akan dikalkulasi oleh *Finance Platform* berdasarkan *Integration Event* `RegistrationSubmitted` dengan flag keterlambatan.

## 3. Auto-Cancellation Policy
- Jika `RegistrationPeriod` ditutup dan status registrasi masih `WaitingPayment`, sistem secara otomatis mengubah status menjadi `Cancelled`.
- Jika mahasiswa aktif gagal melakukan registrasi hingga masa registrasi ditutup (dan tidak mengajukan cuti), status akademik mahasiswa (`StudentAcademicStatus`) diubah menjadi `Inactive`.
