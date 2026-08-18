# Event Lifecycle - Academic Master Data

## 1. Overview
Dokumen ini merumuskan kontrak *Publish-Subscribe* dari seluruh agregat di dalam Academic Master Data menuju domain eksternal.

## 2. Event Policies
- **Publisher**: `AcademicMasterRuntime`
- **Subscriber**: `CourseOffering`, `Registration`, `StudentLifecycle`
- **Ordering**: Event diterbitkan secara *Strongly Consistent* di dalam Unit of Work, kemudian di-*dispatch* ke Message Broker secara *Eventually Consistent*.
- **Idempotency**: Semua subscriber WAJIB mengimplementasikan Idempotency Key berdasarkan `eventId`.
- **Retry Policy**: Default *Exponential Backoff* (Max 5x Retry, lalu masuk ke Dead Letter Queue/DLQ).

## 3. Core Lifecycle Events
1. `FacultyCreatedEvent` (v1)
2. `FacultyUpdatedEvent` (v1)
3. `StudyProgramRegisteredEvent` (v1)
4. `StudyProgramAccreditationUpdatedEvent` (v1)
