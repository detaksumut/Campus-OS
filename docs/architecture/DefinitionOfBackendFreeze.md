# Definition of Backend Freeze (Platform Certification)

Sebuah modul backend Campus OS (misalnya *Registrasi Mahasiswa*) dinyatakan lulus **Backend Freeze** apabila mematuhi protokol arsitektural yang tertulis di bawah ini. Dokumen ini menjadi referensi wajib untuk seluruh Bounded Context di masa depan (PMB, Registrasi, Akademik, LMS, Keuangan, dll.).

## Kriteria Sertifikasi Backend Freeze

1. **Strict Dependency Flow**
   Semua dependensi modul bisnis **harus** mengarah ke bawah, tanpa lompatan:
   `Presentation Plugin` ➔ `Application API` ➔ `Application Facade` ➔ `Command/Query Bus` ➔ `Application Service` ➔ `Domain Runtime` ➔ `Repository` ➔ `Platform Database`.

2. **Application API sebagai Pintu Masuk Tunggal**
   *REST Controller, GraphQL Resolver, CLI,* maupun *Presentation Plugin (React)* dilarang menyentuh *Command Bus* atau *Repository* secara langsung. Semua komunikasi luar ke dalam *Bounded Context* wajib melewati `[Domain]Api.ts` (contoh: `RegistrationApi.ts`) yang bertindak sebagai *Anti-Corruption Layer*.

3. **CQRS Mandatory**
   Seluruh operasi mutasi bisnis dalam *Application Layer* wajib dienkapsulasi menggunakan *Command*.
   Seluruh operasi pembacaan wajib dienkapsulasi menggunakan *Query*.
   *Application Facade* mendelegasikan perintah-perintah ini ke dalam *CommandBus / QueryBus* di `application-kernel`.

4. **ORM-Independence (Repository Agnosticism)**
   Lapisan repositori dalam *Bounded Context* **dilarang keras** meng-*import* framework *Database / ORM* (seperti Drizzle, Prisma, TypeORM, mongoose). Repositori murni hanya boleh bergantung pada antarmuka `IDatabaseExecutor` dari `platforms/database`.

5. **Cross-Aggregate Consistency via Transaction Manager**
   Operasi multikomponen yang mengubah state lebih dari satu *Aggregate* (misal: mempublikasikan *Event* sekaligus menyimpan ke *Database*) **harus** dikendalikan melalui mekanisme `ITransactionManager` dari platform, bukan membuat koneksi *database* *raw* sendiri.

6. **No Framework Leakage in Domain**
   Lapisan *Domain* tidak mengetahui keberadaan:
   - Drizzle / Prisma
   - Express / Fastify / HTTP
   - React / TanStack
   *Business logic* murni TS/JS.

7. **Generic Platforms Isolation**
   Semua platform teknologi bersama seperti `database`, `messaging`, `storage`, `security`, dll., harus dideklarasikan secara global di `packages/platforms/` dan **tidak boleh** memiliki pengetahuan apapun mengenai aturan bisnis (PMB, Registrasi, dsb).

*Status: Aktif*  
*Pembuat Keputusan: Enterprise Architecture Board*
