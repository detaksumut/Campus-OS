# Architecture Standard

This document outlines the architectural principles for Campus OS / IAEP Enterprise Platform.

## Rule 1 — Kernel First
Semua bounded context dilarang mengakses implementasi runtime secara langsung. Hanya boleh melalui SDK.
`(Domain Module -> Domain SDK Interface -> Platform Runtime SDK -> Platform Runtime)`

## Rule 2 — No Cross Domain Dependency
Antar domain tidak boleh saling mengimpor (e.g., Publication tidak boleh mengimpor Membership). Komunikasi dilakukan melalui Event Runtime atau Platform SDK.

## Rule 3 — Registry is the Source of Truth
Semua komponen UI wajib didaftarkan (Menu, Route, Widget, Command, Action, Dialog, Form, Dashboard, Workspace). Tidak boleh ada komponen yang muncul tanpa registrasi.

## Rule 4 — Everything Contract First
Urutan pengembangan harus selalu: `Contract -> SDK -> Runtime -> UI -> Feature`.

## Rule 5 — Runtime API Freeze
Setelah Kernel Certification selesai, public API Runtime dibekukan (API Freeze). Perubahan besar hanya melalui versi baru (v2, v3).

## Rule 6 — Dependency Direction
Aturan dependensi eksplisit: `apps -> domains -> platform -> foundation`.
Lapisan bawah tidak boleh bergantung pada lapisan di atasnya. Lapisan pada level yang sama (e.g., domains) tidak boleh saling bergantung.

## Rule 7 — Event Driven
Modul bereaksi terhadap perubahan melalui Event Runtime (e.g., `Membership Activated -> Event Runtime -> Publication`).

## Rule 8 — Runtime Interfaces
Setiap runtime minimal memiliki struktur konsisten: `runtime/`, `contracts/`, `types/`, `services/`, `adapters/`, `registry/`, `tests/`, `index.ts`.

## Rule 9 — SDK Design
SDK hanya berisi: `interfaces`, `contracts`, `DTO`, `client`, `helper`. SDK tidak boleh memuat business logic.

## Rule 10 — Certification Gate
CI menolak merge apabila salah satu gagal: Build, Lint, Type Check, Unit Test, Contract Validation, Registry Validation, Workspace Validation.
